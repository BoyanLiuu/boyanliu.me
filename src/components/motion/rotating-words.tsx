import type { CSSProperties } from "react";

const SLOT_SECONDS = 3;
const LETTER_STAGGER_MS = 28;

/**
 * Keyframes for one word's turn in a cycle of `count` words. Each word owns 1/count of the cycle:
 * hidden → letters blur-fade in → hold → fade out, then hidden until its next turn.
 */
const keyframes = (count: number) => {
  const at = (fraction: number) => `${+((fraction * 100) / count).toFixed(3)}%`;
  const hidden = "opacity:0;filter:blur(.08em);transform:translateY(.18em)";
  const shown = "opacity:1;filter:blur(0);transform:translateY(0)";
  const gone = "opacity:0;filter:blur(.08em);transform:translateY(-.06em)";
  return `@keyframes rotator-${count}{0%,${at(0.12)}{${hidden}}${at(0.36)},${at(0.64)}{${shown}}${at(0.92)},100%{${gone}}}`;
};

/**
 * The cycling accent phrase in the hero headline (CSS-only).
 * Screen readers get the first phrase; the animated copy is aria-hidden.
 * Phones fade whole words, and reduced motion shows only the first phrase (globals.css).
 */
export const RotatingWords = ({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) => {
  if (words.length < 2) return <span className={className}>{words[0]}</span>;
  const count = words.length;
  return (
    <span className={className}>
      <style href={`rotator-${count}`} precedence="default">
        {keyframes(count)}
      </style>
      <span className="sr-only">{words[0]}</span>
      <span
        aria-hidden
        className="rotator"
        style={
          {
            "--slot": `${SLOT_SECONDS}s`,
            "--count": count,
            "--rotator-name": `rotator-${count}`,
          } as CSSProperties
        }
      >
        {words.map((word, wordIndex) => (
          <span
            key={word}
            className="rotator__word"
            style={{ "--word-index": wordIndex } as CSSProperties}
          >
            {[...word].map((character, index) => (
              <span
                key={index}
                className="rotator__letter"
                data-space={character === " " ? "" : undefined}
                style={
                  {
                    "--letter-delay": `${index * LETTER_STAGGER_MS}ms`,
                  } as CSSProperties
                }
              >
                {character}
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
};
