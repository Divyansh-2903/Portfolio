/**
 * GradualBlur — a self-contained fixed viewport-edge blur overlay.
 *
 * Each layer is an `absolute inset-0` div with:
 *   • backdrop-filter: blur(Xpx)   — blurs page content behind it
 *   • mask-image: linear-gradient  — confines its blur to a horizontal band
 *
 * The parent itself is a plain <div> (no transform / will-change / opacity < 1)
 * so it never creates a new compositing layer that would break backdrop-filter.
 */

import React from 'react';

interface GradualBlurProps {
  /** Which edge of the viewport to attach to */
  position?: 'top' | 'bottom';
  /** CSS height of the overlay (e.g. "10rem") */
  height?: string;
  /** Maximum blur in pixels at the strongest edge */
  strength?: number;
  /** Number of stacked blur layers */
  layers?: number;
  /** z-index of the overlay container */
  zIndex?: number;
}

export default function GradualBlur({
  position = 'bottom',
  height = '10rem',
  strength = 12,
  layers = 9,
  zIndex = 40,
}: GradualBlurProps) {
  const pct = (v: number) => `${Math.round(Math.max(0, Math.min(1, v)) * 100)}%`;

  return (
    <div
      className="fixed inset-x-0 pointer-events-none"
      style={{ [position]: 0, height, zIndex }}
    >
      {Array.from({ length: layers }, (_, i) => {
        // progress: 0 (top of container = weakest) → 1 (bottom = strongest)
        const t        = (i + 1) / layers;
        const blurPx   = (Math.pow(t, 1.7) * strength).toFixed(1);

        // Band boundaries (fraction of container height, top→bottom)
        const bandStart = i / layers;
        const bandEnd   = (i + 1) / layers;
        const slop      = 0.8 / layers; // feather width

        const mask = [
          `transparent ${pct(bandStart - slop)}`,
          `black ${pct(bandStart)}`,
          `black ${pct(bandEnd)}`,
          `transparent ${pct(bandEnd + slop)}`,
        ].join(', ');

        return (
          <div
            key={i}
            style={{
              position:              'absolute',
              inset:                 0,
              backdropFilter:        `blur(${blurPx}px)`,
              WebkitBackdropFilter:  `blur(${blurPx}px)`,
              maskImage:             `linear-gradient(to bottom, ${mask})`,
              WebkitMaskImage:       `linear-gradient(to bottom, ${mask})`,
            }}
          />
        );
      })}
    </div>
  );
}
