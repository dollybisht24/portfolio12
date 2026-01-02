const sharp = require('sharp');
const input = 'src/assets/certificates/iayp.jpg';
const output = 'src/assets/certificates/iayp-logo.png';

sharp(input)
  .resize(96, 96, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toFile(output)
  .then(()=> console.log('Created', output))
  .catch(err=> { console.error(err); process.exit(1); });
