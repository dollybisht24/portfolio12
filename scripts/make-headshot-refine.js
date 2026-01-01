#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function refineHeadshot(inputPath, outputPath) {
  if (!fs.existsSync(inputPath)) throw new Error('Input not found: ' + inputPath);
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Target high-resolution output
  const TARGET_W = 1200, TARGET_H = 1500;
  const IMG_PADDING = 40; // padding between subject layer and edges for blending

  const src = sharp(inputPath);
  const meta = await src.metadata();
  const iw = meta.width, ih = meta.height;

  // Heuristic: assume subject centered horizontally and face around upper third
  const cx = Math.round(iw / 2);
  const cy = Math.round(ih * 0.36);

  // Want mid-chest up: take ~70% of image height centered near upper third
  let cropH = Math.min(ih, Math.round(ih * 0.7));
  let cropW = Math.round(cropH * (TARGET_W / TARGET_H));
  if (cropW > iw) { cropW = iw; cropH = Math.round(cropW * (TARGET_H / TARGET_W)); }

  let left = Math.max(0, Math.min(iw - cropW, cx - Math.round(cropW / 2)));
  let top = Math.max(0, Math.min(ih - cropH, cy - Math.round(cropH / 2)));

  // Extract the crop at good resolution
  const crop = await src.extract({ left, top, width: cropW, height: cropH }).toBuffer();

  // Create background: neutral soft grey
  const bg = sharp({
    create: {
      width: TARGET_W,
      height: TARGET_H,
      channels: 3,
      background: '#e6e6e6'
    }
  }).png();

  // Prepare blurred/desaturated backdrop derived from the crop
  const backdrop = await sharp(crop)
    .resize(TARGET_W, TARGET_H, { fit: 'cover' })
    .modulate({ brightness: 0.95, saturation: 0.6 })
    .blur(30)
    .toBuffer();

  // Prepare foreground (subject): resize to slightly smaller than canvas and enhance
  const fgWidth = TARGET_W - IMG_PADDING * 2;
  const fgHeight = Math.round(fgWidth * (cropH / cropW));
  const fg = await sharp(crop)
    .resize(fgWidth, Math.min(fgHeight, TARGET_H - IMG_PADDING * 2), { fit: 'cover' })
    .sharpen(1)
    .modulate({ brightness: 1.08, saturation: 1.06 })
    .toBuffer();

  const fgMeta = await sharp(fg).metadata();
  const fgW = fgMeta.width, fgH = fgMeta.height;

  // Create a soft mask to blend foreground edges into backdrop (vertical rounded rectangle mask)
  const maskSvg = `<svg width="${fgW}" height="${fgH}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="f" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="18"/></filter>
    </defs>
    <rect x="0" y="0" width="${fgW}" height="${fgH}" rx="${Math.round(Math.min(fgW, fgH)*0.04)}" fill="#fff" filter="url(#f)" />
  </svg>`;

  const maskBuffer = Buffer.from(maskSvg);

  // Compose: start with neutral bg, overlay blurred backdrop with low opacity, then overlay sharp subject using mask
  const canvas = await bg
    .composite([
      { input: backdrop, blend: 'over', opacity: 1 },
      { input: fg, left: Math.round((TARGET_W - fgW) / 2), top: Math.round((TARGET_H - fgH) / 2.2), blend: 'over', mask: { create: true, input: maskBuffer } }
    ])
    .jpeg({ quality: 94 })
    .toBuffer();

  // Final local adjustments: slight global contrast boost
  await sharp(canvas)
    .modulate({ brightness: 1.02, saturation: 1.03 })
    .linear(1.03, -6) // small contrast
    .toFile(outputPath);

  const final = await sharp(outputPath).metadata();
  console.log('Wrote', outputPath, `${final.width}x${final.height}`);
}

const input = process.argv[2] || 'public/images/Dolly.jpg';
const output = process.argv[3] || 'public/profile-highres.jpg';

refineHeadshot(input, output).catch(err => { console.error(err); process.exit(1); });
