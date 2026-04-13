import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
  type MotionStyle,
} from 'framer-motion';

/* ─── Config ───────────────────────────────────────────────── */
const STEP_VH = 200;
const TAIL_VH = 160;

/* ─── Copy ─────────────────────────────────────────────────── */
type Segment = { text: string; accent?: boolean; italic?: boolean };

const steps: {
  num: string;
  tag: string;
  segments: Segment[];
  accentColor: string;
}[] = [
  {
    num: '01', tag: 'The Shift', accentColor: 'oklch(0.75 0.18 280)',
    segments: [
      { text: 'Most developers write code.' },
      { text: ' I engineer ' },
      { text: 'the feeling', accent: true, italic: true },
      { text: ' your users get when they open your app.' },
    ],
  },
  {
    num: '02', tag: 'The Edge', accentColor: '#818cf8',
    segments: [
      { text: 'Your competitors have websites.' },
      { text: ' Yours will have ' },
      { text: 'a presence that moves.', accent: true, italic: true },
    ],
  },
  {
    num: '03', tag: 'The Weapon', accentColor: '#c084fc',
    segments: [
      { text: 'Fullstack is the stage.' },
      { text: ' Motion graphics is ' },
      { text: 'the performance.', accent: true, italic: true },
      { text: ' I do both.' },
    ],
  },
  {
    num: '04', tag: 'The Truth', accentColor: '#a78bfa',
    segments: [
      { text: "Your brand isn't forgettable because the idea is weak —" },
      { text: " it's forgettable because " },
      { text: 'nothing in it moves them.', accent: true, italic: true },
    ],
  },
  {
    num: '05', tag: 'The Result', accentColor: '#e879f9',
    segments: [
      { text: "When the build ships and the reel plays, clients don't just see your brand." },
      { text: ' They ' },
      { text: 'believe', accent: true, italic: true },
      { text: ' in it.' },
    ],
  },
];

/* ─── Word tokeniser ────────────────────────────────────────── */
type Word = { text: string; accent?: boolean; italic?: boolean };

function buildWords(segments: Segment[]): Word[] {
  const words: Word[] = [];
  for (const seg of segments) {
    const tokens = seg.text.split(/(\s+)/);
    for (const token of tokens) {
      if (token === '') continue;
      words.push({ text: token, accent: seg.accent, italic: seg.italic });
    }
  }
  return words;
}

/* ─── ScrollWord ─────────────────────────────────────────────
   Each word is its own component — hooks are called at the
   top level of this component, never inside a loop or .map().   */
function ScrollWord({
  word,
  progress,
  revealStart,
  revealEnd,
  accentGradient,
}: {
  word: Word;
  progress: MotionValue<number>;
  revealStart: number;
  revealEnd: number;
  accentGradient: React.CSSProperties;
  key?: React.Key;
}) {
  const opacity = useTransform(progress, [revealStart, revealEnd], [0, 1], { clamp: true });
  const yVal    = useTransform(progress, [revealStart, revealEnd], [14, 0], { clamp: true });

  const isSpace = /^\s+$/.test(word.text);
  if (isSpace) return <span>&nbsp;</span>;

  const style: MotionStyle = { display: 'inline-block', opacity, y: yVal };

  return (
    <motion.span style={style}>
      {/*
        Inner span is display:inline (no tight bounding box), preventing
        WebkitBackgroundClip from cutting off italic glyph overhangs.
        paddingInlineEnd gives breathing room for the italic lean.
      */}
      <span
        style={{
          display: 'inline',
          fontStyle: word.italic ? 'italic' : 'normal',
          paddingInlineEnd: word.italic ? '0.12em' : undefined,
          ...(word.accent ? accentGradient : { color: 'white' }),
        }}
      >
        {word.text}
      </span>
    </motion.span>
  );
}

/* ─── Panel ── Each panel is its own component so hooks are legal ── */
function Panel({
  step,
  smoothProgress,
  rawProgress,
  index,
  total,
  totalVh,
}: {
  step: (typeof steps)[0];
  smoothProgress: MotionValue<number>;
  rawProgress: MotionValue<number>;
  index: number;
  total: number;
  totalVh: number;
  key?: React.Key;
}) {
  const isLast = index === total - 1;
  const start  = (index * STEP_VH) / totalVh;
  const end    = ((index + 1) * STEP_VH) / totalVh;
  const mid    = (start + end) / 2;

  /* Panel-level spring opacity/y/scale */
  const opacityMV = useTransform(
    smoothProgress,
    isLast ? [start, start + 0.03, 1.0] : [start, start + 0.03, end - 0.03, end],
    isLast ? [0, 1, 1]                  : [0, 1, 1, 0],
  );
  const yMV = useTransform(
    smoothProgress,
    isLast ? [start, start + 0.06, 1.0] : [start, start + 0.06, end],
    isLast ? [40, 0, 0]                 : [40, 0, -40],
  );
  const scaleMV = useTransform(
    smoothProgress,
    isLast ? [start, mid, 1.0] : [start, mid, end],
    isLast ? [0.95, 1, 1]      : [0.95, 1, 0.97],
  );

  const springY  = useSpring(yMV,       { stiffness: 50, damping: 18 });
  const springOp = useSpring(opacityMV, { stiffness: 50, damping: 18 });

  const numOpacity = useTransform(smoothProgress, [start, mid - 0.04], [0, 1], { clamp: true });
  const numY       = useTransform(smoothProgress, [start, mid - 0.06], [20, 0], { clamp: true });

  /* Word-level reveal thresholds — RAW progress for immediate scroll response */
  const words = buildWords(step.segments);
  const revealWindow  = mid - start;
  const nonSpaceCount = words.filter((w) => !/^\s+$/.test(w.text)).length;
  const totalNS       = Math.max(nonSpaceCount - 1, 1);
  let wIdx = 0;

  const wordReveal = words.map((w) => {
    if (/^\s+$/.test(w.text)) return { revealStart: start, revealEnd: start };
    const t           = wIdx++ / totalNS;
    // Push the reveal start forward slightly so panel finishes fading in before words reveal
    const revealStart = start + 0.02 + t * (revealWindow - 0.02) * 0.85;
    const revealEnd   = revealStart + (revealWindow - 0.02) * 0.15;
    return { revealStart, revealEnd };
  });

  const accentGradient: React.CSSProperties = {
    WebkitTextFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    backgroundImage: `linear-gradient(105deg, ${step.accentColor} 0%, #c8aaff 55%, #c084fc 100%)`,
    filter: `drop-shadow(0 0 18px ${step.accentColor}90)`,
  };

  const panelStyle: MotionStyle = { opacity: springOp, y: springY, scale: scaleMV };
  const labelStyle: MotionStyle = { opacity: numOpacity, y: numY };
  const counterStyle: MotionStyle = { opacity: numOpacity };

  return (
    <motion.div
      style={panelStyle}
      className="absolute inset-0 flex items-center justify-center px-6 md:px-20 lg:px-28"
    >
      <div className="w-full max-w-5xl mx-auto text-center">

        {/* Step label */}
        <motion.div
          style={labelStyle}
          className="flex items-center justify-center gap-3 mb-10 md:mb-14"
        >
          <div className="h-px w-10"
            style={{ background: `linear-gradient(to right, transparent, ${step.accentColor})` }} />
          <span className="font-mono text-[11px] tracking-[0.35em] uppercase" style={{ color: step.accentColor }}>
            {step.num}
          </span>
          <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-white/20">
            {step.tag}
          </span>
          <div className="h-px w-10"
            style={{ background: `linear-gradient(to left, transparent, ${step.accentColor})` }} />
        </motion.div>

        {/* Sentence — each word drives its own opacity via scroll */}
        <p
          className="font-display uppercase leading-[1.15] tracking-[0.04em]"
          style={{ fontSize: 'clamp(2rem, 4.8vw, 5rem)' }}
        >
          {words.map((word, i) => {
            if (/^\s+$/.test(word.text)) return <span key={i}>&nbsp;</span>;
            return (
              <ScrollWord
                key={i}
                word={word}
                progress={smoothProgress}
                revealStart={wordReveal[i].revealStart}
                revealEnd={wordReveal[i].revealEnd}
                accentGradient={accentGradient}
              />
            );
          })}
        </p>

        {/* Slide counter */}
        <motion.div
          style={counterStyle}
          className="mt-10 md:mt-14 font-mono text-[10px] text-white/15 tracking-[0.45em] uppercase"
        >
          {step.num} — {String(total).padStart(2, '0')}
        </motion.div>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 55% 55% at 50% 55%, ${step.accentColor}12 0%, transparent 70%)` }}
      />
    </motion.div>
  );
}

/* ─── Progress bar ─────────────────────────────────────────── */
function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useSpring(progress, { stiffness: 50, damping: 18 });
  const style: MotionStyle = { scaleX, background: 'linear-gradient(90deg, oklch(0.75 0.18 280), #e879f9)' };
  return (
    <div className="absolute bottom-0 inset-x-0 h-[1px] bg-white/5 z-20">
      <motion.div className="h-full origin-left" style={style} />
    </div>
  );
}

/* ─── Ghost number ─────────────────────────────────────────── */
function GhostNumber({ progress, totalVh }: { progress: MotionValue<number>; totalVh: number }) {
  const stepsEnd = (steps.length * STEP_VH) / totalVh;
  const x = useTransform(progress, [0, stepsEnd], ['0%', `${-(steps.length - 1) * 100}%`]);
  return (
    <motion.div
      className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full"
      aria-hidden
    >
      <motion.div style={{ x }} className="flex">
        {steps.map((s) => (
          <span
            key={s.num}
            className="font-display text-[40vw] leading-none flex-shrink-0 w-full text-center"
            style={{ color: `${s.accentColor}07` }}
          >
            {s.num}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─── ProgressDot — extracted so useTransform is at component top-level ── */
function ProgressDot({
  i, total, progress, totalVh,
}: {
  i: number; total: number; progress: MotionValue<number>; totalVh: number;
  key?: React.Key;
}) {
  const s  = (i * STEP_VH) / totalVh;
  const e  = ((i + 1) * STEP_VH) / totalVh;
  const isL = i === total - 1;
  const op = useTransform(
    progress,
    [s, s + 0.01, isL ? 1.0 : e - 0.01, isL ? 1.0 : e],
    [0, 1, 1, isL ? 1 : 0],
    { clamp: true },
  );
  const style: MotionStyle = { opacity: op, scale: op };
  return (
    <div className="relative w-1.5 h-1.5">
      <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
      <motion.div className="absolute inset-0 rounded-full bg-primary" style={style} />
    </div>
  );
}

/* ─── ProgressDots wrapper ─────────────────────────────────── */
function ProgressDots({
  total, progress, totalVh,
}: {
  total: number; progress: MotionValue<number>; totalVh: number;
}) {
  return (
    <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
      {Array.from({ length: total }).map((_, i) => (
        <ProgressDot key={i} i={i} total={total} progress={progress} totalVh={totalVh} />
      ))}
    </div>
  );
}

/* ─── ScrollHint — extracted so useTransform is at top-level ── */
function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.04], [1, 0], { clamp: true });
  const style: MotionStyle = { opacity };
  return (
    <motion.div
      style={style}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
    >
      <span className="font-mono text-[10px] text-white/25 tracking-[0.4em] uppercase">Scroll</span>
      <div className="w-px h-7 bg-gradient-to-b from-white/25 to-transparent animate-pulse" />
    </motion.div>
  );
}

/* ─── Export ────────────────────────────────────────────────── */
export default function Story() {
  const container = useRef<HTMLDivElement>(null);
  const totalVh = steps.length * STEP_VH + TAIL_VH;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section id="process" className="relative bg-bg">

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-16">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">
            [ The Process ]
          </span>
          <div className="h-px bg-white/10 flex-1" />
        </div>
        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] uppercase tracking-[0.02em] text-white leading-[0.9]">
          HOW I{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-300 to-indigo-300">
            WORK
          </span>
        </h2>
      </div>

      {/* Scroll track */}
      <div ref={container} className="relative" style={{ height: `${totalVh}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">

          <GhostNumber progress={smoothProgress} totalVh={totalVh} />

          {steps.map((step, i) => (
            <Panel
              key={i}
              step={step}
              smoothProgress={smoothProgress}
              rawProgress={scrollYProgress}
              index={i}
              total={steps.length}
              totalVh={totalVh}
            />
          ))}

          <ProgressDots total={steps.length} progress={smoothProgress} totalVh={totalVh} />
          <ProgressBar progress={smoothProgress} />
          <ScrollHint progress={smoothProgress} />
        </div>
      </div>
    </section>
  );
}
