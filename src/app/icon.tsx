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
          background: "#05060a",
          border: "1.5px solid #3d63ff",
          borderRadius: 7,
          color: "#f5f7fb",
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
