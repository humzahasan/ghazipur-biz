import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Humza Hasan, frontend engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0b0d10",
          color: "#e8eaed",
          backgroundImage: "radial-gradient(circle at 85% 10%, rgba(198,244,50,0.18), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#c6f432", letterSpacing: 2 }}>
          {site.url.replace("https://", "").toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -4 }}>{site.name}</div>
          <div style={{ fontSize: 40, color: "#9aa4b0", marginTop: 16 }}>{site.positioning}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9aa4b0" }}>
          {`${site.jobTitle} · ${site.employer.name} · ${site.location}`}
        </div>
      </div>
    ),
    size,
  );
}
