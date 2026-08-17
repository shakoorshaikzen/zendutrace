import React from 'react';
import {Composition} from 'remotion';
import Film, {FILM_DUR} from './Film.jsx';
import HeroLoop, {HERO_LOOP_DUR} from './HeroLoop.jsx';
import HeroPreview from './HeroPreview.jsx';
import Main, {TOTAL_DUR} from './Main.jsx';

export default function RemotionRoot() {
  return (
    <>
      <Composition
        id="XenTagDemo"
        component={Main}
        durationInFrames={TOTAL_DUR}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="XenTagFilm"
        component={Film}
        durationInFrames={FILM_DUR}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="XenTagHeroLoop"
        component={HeroLoop}
        durationInFrames={HERO_LOOP_DUR}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="XenTagHeroPreview"
        component={HeroPreview}
        durationInFrames={HERO_LOOP_DUR}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
}
