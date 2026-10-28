// Generates public/humza-hasan.jpg as a stand-in until a real photo is added.
import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
  <defs>
    <radialGradient id="g" cx="70%" cy="20%" r="90%">
      <stop offset="0" stop-color="#2a3a12"/><stop offset="1" stop-color="#12161b"/>
    </radialGradient>
  </defs>
  <rect width="800" height="800" fill="url(#g)"/>
  <text x="400" y="460" font-family="DejaVu Sans, sans-serif" font-size="260" font-weight="700"
    fill="#c6f432" text-anchor="middle" letter-spacing="-10">HH</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile("public/humza-hasan.jpg");
