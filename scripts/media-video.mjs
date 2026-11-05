#!/usr/bin/env node
/**
 * Convert a screen recording into web-friendly loops for MediaFrame.
 *
 *   pnpm media:video <input.mov|mp4> public/projects/<slug>/<name>
 *
 * Writes <name>.mp4 (H.264), <name>.webm (VP9) and <name>-poster.jpg, 1600px wide, no audio.
 * Requires ffmpeg (macOS: `brew install ffmpeg`).
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";

const [input, outBase] = process.argv.slice(2);
if (!input || !outBase) {
  console.error(
    "Usage: pnpm media:video <input> public/projects/<slug>/<name>",
  );
  process.exit(1);
}
const publicDir = resolve("public") + sep;
const out = resolve(outBase);
if (!out.startsWith(publicDir)) {
  console.error("Output must be inside public/.");
  process.exit(1);
}
if (!existsSync(input)) {
  console.error(`Input not found: ${input}`);
  process.exit(1);
}
if (spawnSync("ffmpeg", ["-version"]).status !== 0) {
  console.error("ffmpeg is not installed. On macOS: brew install ffmpeg");
  process.exit(1);
}
mkdirSync(dirname(out), { recursive: true });

const scale = "scale=1600:-2:flags=lanczos";
const run = (args) => {
  const result = spawnSync("ffmpeg", ["-y", "-loglevel", "error", ...args], {
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run([
  "-i",
  input,
  "-an",
  "-vf",
  scale,
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "26",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  `${out}.mp4`,
]);
run([
  "-i",
  input,
  "-an",
  "-vf",
  scale,
  "-c:v",
  "libvpx-vp9",
  "-crf",
  "36",
  "-b:v",
  "0",
  `${out}.webm`,
]);
run([
  "-i",
  input,
  "-vf",
  scale,
  "-frames:v",
  "1",
  "-q:v",
  "3",
  `${out}-poster.jpg`,
]);
console.log(`Wrote ${outBase}.mp4, ${outBase}.webm and ${outBase}-poster.jpg`);
