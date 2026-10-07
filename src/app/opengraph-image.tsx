import { ImageResponse } from "next/og";

export const alt = "Phinehas Adams — AI, websites and business automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#0032a0", color: "white", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", fontSize: 28 }}>AI, websites &amp; business automation</div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 150, fontWeight: 700, lineHeight: 0.95, letterSpacing: "-7px" }}>
        <span>Phinehas</span><span>Adams.</span>
      </div>
      <div style={{ display: "flex", fontSize: 28 }}>I build with AI. I automate the repetitive parts.</div>
    </div>,
    size,
  );
}
