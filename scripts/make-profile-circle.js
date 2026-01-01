#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function makeCircle(inputPath, outputPath, size = 400) {
  if (!fs.existsSync(inputPath)) throw new Error('Input not found: ' + inputPath);
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const src = sharp(inputPath);
  const meta = await src.metadata();
  const iw = meta.width, ih = meta.height;

  const cx = Math.round(iw / 2);
  const cy = Math.round(ih * 0.36);

  // mid-chest up crop
  let cropH = Math.min(ih, Math.round(ih * 0.68));
  let cropW = Math.round(cropH * (size / size));
  if (cropW > iw) { cropW = iw; cropH = Math.round(cropW * (size / size)); }

  let left = Math.max(0, Math.min(iw - cropW, cx - Math.round(cropW / 2)));
  let top = Math.max(0, Math.min(ih - cropH, cy - Math.round(cropH / 2)));

  // Build blurred backdrop from crop
  const cropBuf = await src.extract({ left, top, width: cropW, height: cropH }).toBuffer();
  const backdrop = await sharp(cropBuf)
    .resize(size, size, { fit: 'cover' })
    .modulate({ brightness: 0.98, saturation: 0.85 })
    .blur(18)
    .toBuffer();

  // Foreground subject: sharpen and resize slightly smaller than canvas
  const fg = await sharp(cropBuf)
    .resize(Math.round(size * 0.86), Math.round(size * 0.86), { fit: 'cover' })
    .sharpen(0.8)
    .modulate({ brightness: 1.06, saturation: 1.04 })
    .toBuffer();

  const fgMeta = await sharp(fg).metadata();
  const fgW = fgMeta.width, fgH = fgMeta.height;
  const leftOffset = Math.round((size - fgW) / 2);
  const topOffset = Math.round((size - fgH) / 2.2);

  // Create circular mask SVG
  const maskSvg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#000" />
    <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 1}" fill="#fff" />
  </svg>`;

  // Compose backdrop + fg
  const composed = await sharp(backdrop)
    .composite([
      { input: fg, left: leftOffset, top: topOffset }
    ])
    .png()
    .toBuffer();

  // Apply circular mask to make transparent corners
  await sharp(composed)
    .composite([{ input: Buffer.from(maskSvg), blend: 'dest-in' }])
    .png({ quality: 100 })
    .toFile(outputPath);

  const metaOut = await sharp(outputPath).metadata();
  console.log('Wrote', outputPath, `${metaOut.width}x${metaOut.height}`);
}

const input = process.argv[2] || 'public/images/Dolly.jpg';
const output = process.argv[3] || 'public/profile-circle.png';
const size = parseInt(process.argv[4], 10) || 400;

makeCircle(input, output, size).catch(err => { console.error(err); process.exit(1); });
