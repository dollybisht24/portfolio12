#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const faceapi = require('@vladmandic/face-api');

async function ensureModels(modelsUrl) {
  try {
    await faceapi.nets.ssdMobilenetv1.loadFromUri(modelsUrl);
    await faceapi.nets.faceLandmark68Net.loadFromUri(modelsUrl);
    return true;
  } catch (err) {
    console.warn('Model load from URI failed:', err.message || err);
    return false;
  }
}

async function detectFaceBox(imgBuffer) {
  const img = await faceapi.bufferToImage(imgBuffer);
  const res = await faceapi.detectSingleFace(img).withFaceLandmarks();
  if (!res) return null;
  const box = res.detection.box || res.detection.relativeBox || res.detection;
  // Normalize properties to x,y,width,height
  let x = box.x !== undefined ? box.x : box.left || 0;
  let y = box.y !== undefined ? box.y : box.top || 0;
  let width = box.width !== undefined ? box.width : (box.right - box.left) || 0;
  let height = box.height !== undefined ? box.height : (box.bottom - box.top) || 0;
  return { x: Math.round(x), y: Math.round(y), width: Math.round(width), height: Math.round(height) };
}

async function createHeadshot(inputPath, outputPath, size = 1200) {
  if (!fs.existsSync(inputPath)) throw new Error('input not found: ' + inputPath);
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const imgBuf = fs.readFileSync(inputPath);
  const meta = await sharp(imgBuf).metadata();
  const iw = meta.width, ih = meta.height;

  // Try to load remote models (vladmandic hosted weights)
  const modelsUrl = 'https://raw.githubusercontent.com/vladmandic/face-api/master/modelweights';
  const modelsLoaded = await ensureModels(modelsUrl);

  let crop;
  if (modelsLoaded) {
    try {
      const faceBox = await detectFaceBox(imgBuf);
      if (faceBox) {
        // Expand box to include shoulders and chest: expand width by 1.6x, height by 2.2x, and shift upward slightly
        const exW = Math.round(faceBox.width * 1.6);
        const exH = Math.round(faceBox.height * 2.2);
        const cx = Math.round(faceBox.x + faceBox.width / 2);
        const cy = Math.round(faceBox.y + faceBox.height / 2);
        let left = Math.max(0, cx - Math.round(exW / 2));
        let top = Math.max(0, cy - Math.round(exH / 2) - Math.round(faceBox.height * 0.15));
        if (left + exW > iw) left = Math.max(0, iw - exW);
        if (top + exH > ih) top = Math.max(0, ih - exH);
        crop = { left, top, width: Math.min(exW, iw), height: Math.min(exH, ih) };
      }
    } catch (err) {
      console.warn('Face detection failed, falling back to heuristic:', err.message || err);
    }
  }

  // Fallback heuristic if detection not available
  if (!crop) {
    const cx = Math.round(iw / 2);
    const cy = Math.round(ih * 0.36);
    let cropH = Math.min(ih, Math.round(ih * 0.7));
    let cropW = Math.round(cropH * (size / size));
    if (cropW > iw) { cropW = iw; cropH = Math.round(cropW * (size / size)); }
    let left = Math.max(0, Math.min(iw - cropW, cx - Math.round(cropW / 2)));
    let top = Math.max(0, Math.min(ih - cropH, cy - Math.round(cropH / 2)));
    crop = { left, top, width: cropW, height: cropH };
  }

  // Create blurred office-like backdrop: use original crop, resize+blur
  const cropBuf = await sharp(imgBuf).extract(crop).toBuffer();
  const backdrop = await sharp(cropBuf)
    .resize(size, size, { fit: 'cover' })
    .modulate({ brightness: 0.98, saturation: 0.85 })
    .blur(24)
    .toBuffer();

  // Foreground subject: sharpen and slightly brighter
  const fg = await sharp(cropBuf)
    .resize(Math.round(size * 0.86), Math.round(size * 0.86), { fit: 'cover' })
    .sharpen(1)
    .modulate({ brightness: 1.08, saturation: 1.06 })
    .toBuffer();

  const fgMeta = await sharp(fg).metadata();
  const fgW = fgMeta.width, fgH = fgMeta.height;
  const leftOffset = Math.round((size - fgW) / 2);
  const topOffset = Math.round((size - fgH) / 2.2);

  // Composite and apply circular mask
  const circleSvg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="#fff"/></svg>`;

  const composed = await sharp(backdrop)
    .composite([{ input: fg, left: leftOffset, top: topOffset }])
    .png()
    .toBuffer();

  await sharp(composed)
    .composite([{ input: Buffer.from(circleSvg), blend: 'dest-in' }])
    .png({ quality: 100 })
    .toFile(outputPath);

  console.log('Wrote', outputPath);
}

const input = process.argv[2] || 'public/images/Dolly.jpg';
const output = process.argv[3] || 'public/profile-faceapi-1200.png';

createHeadshot(input, output).catch(err => { console.error(err); process.exit(1); });
