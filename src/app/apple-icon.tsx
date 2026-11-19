import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f1115",
          color: "#c9a96a",
          fontSize: 76,
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: -2,
        }}
      >
        RB
      </div>
    ),
    { ...size },
  );
}
