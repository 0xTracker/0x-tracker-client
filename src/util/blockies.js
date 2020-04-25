// The random number is a js implementation of the Xorshift PRNG
const randseed = new Array(4); // Xorshift: [x, y, z, w] 32 bit values

function seedrand(seed) {
  randseed.fill(0);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < seed.length; i++) {
    randseed[i % 4] =
      (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i); // eslint-disable-line no-bitwise
  }
}

function rand() {
  // based on Java's String.hashCode(), expanded to 4 32bit values
  // eslint-disable-next-line no-bitwise
  const t = randseed[0] ^ (randseed[0] << 11);

  randseed[0] = randseed[1]; // eslint-disable-line prefer-destructuring
  randseed[1] = randseed[2]; // eslint-disable-line prefer-destructuring
  randseed[2] = randseed[3]; // eslint-disable-line prefer-destructuring
  randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8); // eslint-disable-line no-bitwise

  return (randseed[3] >>> 0) / ((1 << 31) >>> 0); // eslint-disable-line no-bitwise
}

function createColor() {
  const h = Math.floor(rand() * 360);
  const s = rand() * 60 + 40 + '%'; // eslint-disable-line prefer-template
  const l = (rand() + rand() + rand() + rand()) * 25 + '%'; // eslint-disable-line prefer-template

  return 'hsl(' + h + ',' + s + ',' + l + ')'; // eslint-disable-line prefer-template
}

function createImageData(size) {
  const width = size; // Only support square icons for now
  const height = size;

  const dataWidth = Math.ceil(width / 2);
  const mirrorWidth = width - dataWidth;

  const data = [];
  // eslint-disable-next-line no-plusplus
  for (let y = 0; y < height; y++) {
    let row = [];
    // eslint-disable-next-line no-plusplus
    for (let x = 0; x < dataWidth; x++) {
      // this makes foreground and background color to have a 43% (1/2.3) probability
      // spot color has 13% chance
      row[x] = Math.floor(rand() * 2.3);
    }
    const r = row.slice(0, mirrorWidth);
    r.reverse();
    row = row.concat(r);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < row.length; i++) {
      data.push(row[i]);
    }
  }

  return data;
}

function buildOpts(opts) {
  const newOpts = {};

  newOpts.seed =
    opts.seed || Math.floor(Math.random() * Math.pow(10, 16)).toString(16); // eslint-disable-line no-restricted-properties

  seedrand(newOpts.seed);

  newOpts.size = opts.size || 8;
  newOpts.scale = opts.scale || 4;
  newOpts.color = opts.color || createColor();
  newOpts.bgcolor = opts.bgcolor || createColor();
  newOpts.spotcolor = opts.spotcolor || createColor();

  return newOpts;
}

function renderBlockie(options, canvas) {
  const opts = buildOpts(options || {});
  const imageData = createImageData(opts.size);
  const width = Math.sqrt(imageData.length);

  // eslint-disable-next-line no-param-reassign
  canvas.height = opts.size * opts.scale;

  // eslint-disable-next-line no-param-reassign
  canvas.width = canvas.height;

  const cc = canvas.getContext('2d');
  cc.fillStyle = opts.bgcolor;
  cc.fillRect(0, 0, canvas.width, canvas.height);
  cc.fillStyle = opts.color;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < imageData.length; i++) {
    // if data is 0, leave the background
    if (imageData[i]) {
      const row = Math.floor(i / width);
      const col = i % width;

      // if data is 2, choose spot color, if 1 choose foreground
      cc.fillStyle = imageData[i] === 1 ? opts.color : opts.spotcolor;

      cc.fillRect(col * opts.scale, row * opts.scale, opts.scale, opts.scale);
    }
  }

  return canvas;
}

export { renderBlockie };
