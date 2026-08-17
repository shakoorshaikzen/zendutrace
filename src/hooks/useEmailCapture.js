import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Form relay endpoint (Formspree/Basin/serverless function). Set
// VITE_CAPTURE_ENDPOINT in .env before launch; without it, submits fall back
// to the "failed" state which offers a direct sales@ mailto instead.
const CAPTURE_ENDPOINT = import.meta.env.VITE_CAPTURE_ENDPOINT || '';

export function useEmailCapture(request) {
  const [email, setEmail] = useState('');
  const [honey, setHoney] = useState('');
  const [status, setStatus] = useState('idle'); // idle | error | sending | done | failed

  const fallbackHref = `mailto:sales@zenduit.com?subject=${encodeURIComponent(request)}&body=${encodeURIComponent(`Work email: ${email.trim()}\n\nRequest: ${request}`)}`;

  const submit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(CAPTURE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        // _honey: FormSubmit silently discards submissions where this is non-empty;
        // real users never see the offscreen input, bots that autofill it get filtered.
        body: JSON.stringify({ email: value, request, page: window.location.href, at: new Date().toISOString(), _subject: `XenTag lead: ${request}`, _honey: honey }),
      });
      if (!res.ok) throw new Error(`capture endpoint responded ${res.status}`);
      // FormSubmit reports rejections (e.g. unactivated form) as 200 + {success:"false"}
      const body = await res.json().catch(() => null);
      if (body && String(body.success) === 'false') throw new Error(body.message || 'capture endpoint rejected the submission');
      try {
        const leads = JSON.parse(localStorage.getItem('xt-leads') || '[]');
        leads.push({ email: value, request, at: new Date().toISOString() });
        localStorage.setItem('xt-leads', JSON.stringify(leads));
      } catch {
        // storage unavailable — the endpoint already has the lead
      }
      setStatus('done');
    } catch {
      setStatus('failed');
    }
  };

  const onChange = (e) => {
    setEmail(e.target.value);
    if (status === 'error' || status === 'failed') setStatus('idle');
  };

  const reset = () => setStatus('idle');

  // Spread onto a visually hidden text input inside the form (spam trap).
  const honeypotProps = {
    name: '_honey',
    value: honey,
    onChange: (e) => setHoney(e.target.value),
    tabIndex: -1,
    autoComplete: 'off',
    'aria-hidden': true,
    style: { position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0, pointerEvents: 'none' },
  };

  return { email, status, submit, onChange, reset, fallbackHref, honeypotProps };
}
