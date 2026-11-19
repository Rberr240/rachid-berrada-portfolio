import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          border: "1.5px solid #c9a96a",
          borderRadius: 7,
          color: "#c9a96a",
          fontSize: 15,
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: -0.5,
        }}
      >
        RB
      </div>
    ),
    { ...size },
  );
}
