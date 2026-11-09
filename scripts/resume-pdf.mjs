#!/usr/bin/env node
/**
 * Print /resume to public/resume.pdf (A4, print stylesheet).
 * Run after `pnpm build`:  pnpm resume:pdf --force
 * public/resume.pdf is normally your own uploaded résumé, so this refuses to overwrite it without --force.
 * The production server is started on 127.0.0.1 only and stopped afterwards.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";
import { chromium } from "@playwright/test";

if (existsSync("public/resume.pdf") && !process.argv.includes("--force")) {
  console.error(
    "public/resume.pdf already exists (your uploaded résumé). Re-run with --force to replace it with a printout of /resume.",
  );
  process.exit(1);
}

const PORT = 3400;
const base = `http://127.0.0.1:${PORT}`;
const server = spawn(
  "node_modules/.bin/next",
  ["start", "-H", "127.0.0.1", "-p", String(PORT)],
  { stdio: "ignore" },
);

try {
  let ready = false;
  for (let i = 0; i < 60 && !ready; i++) {
    try {
      ready = (await fetch(`${base}/resume`)).ok;
    } catch {
      await sleep(500);
    }
  }
  if (!ready)
    throw new Error("Server did not start. Did you run `pnpm build`?");

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print", colorScheme: "light" });
  await page.goto(`${base}/resume`, { waitUntil: "load" });
  await page.pdf({
    path: "public/resume.pdf",
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  await browser.close();
  console.log("Wrote public/resume.pdf");
} finally {
  server.kill("SIGTERM");
}
