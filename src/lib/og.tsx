import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = join(process.cwd(), "src/assets/fonts");
const fonts = Promise.all([
  readFile(join(fontDir, "InterTight-700.woff")),
  readFile(join(fontDir, "InterTight-500.woff")),
]);

/** Title size that keeps up to ~4 lines inside the card. */
export function ogTitleSize(title: string): number {
  if (title.length <= 24) return 120;
  if (title.length <= 48) return 92;
  if (title.length <= 80) return 72;
  return 58;
}

/** Swiss share card: top bar, giant title with the red square, footer line. Rendered at build time. */
export async function ogImage({
  kicker,
  title,
  footer,
}: {
  kicker: string;
  title: string;
  footer?: string;
}) {
  const [bold, medium] = await fonts;
  const text = title.length > 110 ? `${title.slice(0, 107)}…` : title;
  const size = ogTitleSize(text);
  // Each word is its own flex item, so the red square stays attached to the last word when the title wraps.
  const words = text.split(/\s+/);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
        color: "#000000",
        padding: "56px 64px",
        fontFamily: "Inter Tight",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          borderBottom: "4px solid #000",
          paddingBottom: 18,
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          {siteConfig.author.name}
          <div
            style={{
              width: 11,
              height: 11,
              background: siteConfig.theme.accent,
              marginLeft: 2,
            }}
          />
        </div>
        <div
          style={{
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: 2,
            fontSize: 24,
          }}
        >
          {kicker}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          fontSize: size,
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: "-0.045em",
        }}
      >
        {words.map((word, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "baseline",
              marginRight: i === words.length - 1 ? 0 : size * 0.22,
            }}
          >
            {word}
            {i === words.length - 1 && (
              <div
                style={{
                  width: size * 0.16,
                  height: size * 0.16,
                  background: siteConfig.theme.accent,
                  marginLeft: 3,
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 26,
          fontWeight: 500,
        }}
      >
        <div>{footer ?? siteConfig.author.jobTitle}</div>
        <div>{new URL(siteConfig.url).host}</div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Inter Tight", data: bold, weight: 700, style: "normal" },
        { name: "Inter Tight", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
