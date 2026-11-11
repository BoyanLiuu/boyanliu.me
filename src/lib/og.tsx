import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { initials } from "@/lib/initials";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = join(process.cwd(), "src/assets/fonts");
const fonts = Promise.all([
  readFile(join(fontDir, "InterTight-700.woff")),
  readFile(join(fontDir, "InterTight-500.woff")),
]);

/** Title size that keeps up to ~4 lines inside the card. */
export const ogTitleSize = (title: string): number => {
  if (title.length <= 24) return 120;
  if (title.length <= 48) return 92;
  if (title.length <= 80) return 72;
  return 58;
};

/** Swiss share card: top bar, giant title with the red square, footer line. Rendered at build time. */
export const ogImage = async ({
  kicker,
  title,
  footer,
}: {
  kicker: string;
  title: string;
  footer?: string;
}) => {
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
        color: "#171310",
        padding: "56px 64px",
        fontFamily: "Inter Tight",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          borderBottom: "2px solid #e6e3dd",
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
              borderRadius: 999,
              background: siteConfig.theme.accent,
              marginLeft: 3,
            }}
          />
        </div>
        <div
          style={{
            fontWeight: 500,
            color: "#6f6c69",
            fontSize: 26,
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
          letterSpacing: "-0.03em",
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
                  borderRadius: 999,
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
};

/**
 * Site icon: the author's initials in white on the accent colour. `circle` for browser tabs
 * (transparent corners); `square` for iOS home screens, which round the corners themselves.
 */
export const monogram = async ({
  size,
  shape,
}: {
  size: number;
  shape: "circle" | "square";
}) => {
  const [bold] = await fonts;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: shape === "circle" ? "50%" : 0,
        background: siteConfig.theme.accent,
        color: "#ffffff",
        fontFamily: "Inter Tight",
        fontWeight: 700,
        fontSize: Math.round(size * (shape === "circle" ? 0.47 : 0.42)),
        letterSpacing: "-0.04em",
      }}
    >
      {initials(siteConfig.author.name)}
    </div>,
    {
      width: size,
      height: size,
      fonts: [
        { name: "Inter Tight", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
};
