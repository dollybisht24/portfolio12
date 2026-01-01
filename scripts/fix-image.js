#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function fixImage(inputPath, outputPath) {
  if (!fs.existsSync(inputPath)) throw new Error('Input not found: ' + inputPath);
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const img = sharp(inputPath);
  const meta = await img.metadata();

  // Apply global adjustments without cropping
  await img
    .modulate({ brightness: 1.06, saturation: 1.08 })
    .linear(1.04, -6) // slight contrast
    .sharpen(1)
    .jpeg({ quality: 94 })
    .toFile(outputPath);

  const outMeta = await sharp(outputPath).metadata();
  console.log('Wrote', outputPath, `${outMeta.width}x${outMeta.height}`);
}

const input = process.argv[2] || 'public/images/Dolly1.jpg';
const output = process.argv[3] || 'public/images/Dolly1-fixed.jpg';

fixImage(input, output).catch(err => { console.error(err); process.exit(1); });
