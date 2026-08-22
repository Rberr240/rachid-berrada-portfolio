import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/profile";

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
          background:
            "radial-gradient(circle at 85% 10%, rgba(61,99,255,0.28) 0%, rgba(5,6,10,0) 55%), linear-gradient(160deg, #0a1024 0%, #05060a 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 76,
            height: 76,
            borderRadius: 16,
            border: "2px solid rgba(255,255,255,0.16)",
            color: "#f5f7fb",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          {siteConfig.monogram}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 60, fontWeight: 700, color: "#f5f7fb", letterSpacing: -1.5 }}>
            {siteConfig.name}
          </div>
          <div style={{ marginTop: 14, fontSize: 30, color: "#6f8dff", fontWeight: 600 }}>
            {siteConfig.title}
          </div>
          <div style={{ marginTop: 24, fontSize: 24, color: "#9aa4b6", letterSpacing: 2 }}>
            {siteConfig.tagline.toUpperCase()}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
