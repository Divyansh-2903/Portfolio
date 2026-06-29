import { useEffect, useMemo, useState } from 'react';

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
};

function matches(query: string) {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(query).matches;
}

function readProfile() {
  const nav = navigator as NavigatorWithHints;
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const saveData = Boolean(nav.connection?.saveData);
  const slowNetwork = /(^|-)2g$/.test(nav.connection?.effectiveType ?? '');

  const reducedMotion = matches('(prefers-reduced-motion: reduce)');
  const coarsePointer = matches('(hover: none), (pointer: coarse)');
  const smallScreen = matches('(max-width: 767px)');
  const lowPowerHardware = cores <= 4 || memory <= 4 || saveData || slowNetwork;

  return {
    reducedMotion,
    coarsePointer,
    smallScreen,
    lowPowerHardware,
    enableHeavyVisuals: !reducedMotion && !smallScreen && !lowPowerHardware,
    enableHoverEffects: !reducedMotion && !coarsePointer,
    enableSmoothScroll: !reducedMotion && !coarsePointer && !lowPowerHardware,
  };
}

export type PerformanceProfile = ReturnType<typeof readProfile>;

export function getPerformanceProfile(): PerformanceProfile {
  if (typeof navigator === 'undefined') {
    return {
      reducedMotion: false,
      coarsePointer: false,
      smallScreen: false,
      lowPowerHardware: false,
      enableHeavyVisuals: true,
      enableHoverEffects: true,
      enableSmoothScroll: true,
    };
  }

  return readProfile();
}

export function usePerformanceProfile() {
  const [profile, setProfile] = useState(getPerformanceProfile);

  useEffect(() => {
    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(hover: none), (pointer: coarse)'),
      window.matchMedia('(max-width: 767px)'),
    ];

    const update = () => setProfile(getPerformanceProfile());
    mediaQueries.forEach((mq) => mq.addEventListener('change', update));
    window.addEventListener('resize', update, { passive: true });

    return () => {
      mediaQueries.forEach((mq) => mq.removeEventListener('change', update));
      window.removeEventListener('resize', update);
    };
  }, []);

  return useMemo(() => profile, [profile]);
}
