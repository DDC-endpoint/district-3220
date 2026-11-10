'use client';

import { useEnterOnce } from '@/components/motion/reveal';

/**
 * Odometer roll (lab.damiandc.com/odometer-roll).
 *
 * Each digit is a 0-9 strip inside a one-line-tall clipped box; rolling means
 * translating the strip by -Ndigit em. Non-digits (the comma, the "+", the
 * "km") are rendered as plain text and never move.
 *
 * Rendered from a string rather than a number so "10,000+", "5 km" and "1964"
 * all go through the same component and the grouping is decided by the caller,
 * not inferred. 1964 is a year and must never gain a thousands separator.
 */
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function Odometer({ value, className = '' }: { value: string; className?: string }) {
  const { ref, shown } = useEnterOnce<HTMLSpanElement>();
  let digitIndex = -1;

  return (
    <span ref={ref} className={`inline-flex items-end whitespace-nowrap tabular-nums ${className}`}>
      {/* The real value for assistive tech. aria-label on a plain span is
          prohibited ARIA and ignored by screen readers, which left every
          figure reading as empty, since the digit strips are aria-hidden. */}
      <span className="sr-only">{value}</span>
      {value.split('').map((char, i) => {
        const isDigit = char >= '0' && char <= '9';
        if (!isDigit) {
          return (
            <span key={i} aria-hidden="true">
              {char === ' ' ? ' ' : char}
            </span>
          );
        }
        digitIndex += 1;
        const delay = digitIndex * 70;
        return (
          // The box is as wide as the widest glyph in the 0-9 strip, so narrow
          // digits are centred rather than left-hanging in a wider slot.
          <span
            key={i}
            aria-hidden="true"
            className="inline-block h-[1em] overflow-hidden text-center leading-none"
          >
            <span
              // Reduced motion: the roll snaps, so the digits fade in at their
              // final value instead of jumping from zero.
              className={`block transition-transform duration-[1150ms] ease-out-expo ${shown ? '' : 'motion-reduce:opacity-0'}`}
              style={{
                transform: shown ? `translateY(-${Number(char)}em)` : 'translateY(0em)',
                transitionDelay: `${delay}ms`,
              }}
            >
              {DIGITS.map((d) => (
                <span key={d} className="block h-[1em] leading-none">
                  {d}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
