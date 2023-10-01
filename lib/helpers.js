const round = (value, precision) => {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
};

const hexToHSL = (H) => {
  if (H.length === 6 && !H.startsWith(`#`)) {
    H = `#${H}`;
  }

  // Convert hex to RGB first
  let { r, g, b } = hexToRGB(H);
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
};

const hexToRGB = (H) => {
  if (H.length === 6 && !H.startsWith(`#`)) {
    H = `#${H}`;
  }

  let r = `0`;
  let g = `0`;
  let b = `0`;
  if (H.length === 4) {
    r = `0x${H[1]}${H[1]}`;
    g = `0x${H[2]}${H[2]}`;
    b = `0x${H[3]}${H[3]}`;
  } else if (H.length === 7) {
    r = `0x${H[1]}${H[2]}`;
    g = `0x${H[3]}${H[4]}`;
    b = `0x${H[5]}${H[6]}`;
  }

  return { r, g, b };
};

const HSLToHex = (h, s, l) => {
  let { r, g, b } = HSLtoRGB(h, s, l);

  // Having obtained RGB, convert channels to hex
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  // Prepend 0s, if necessary
  if (r.length === 1) r = `0${r}`;
  if (g.length === 1) g = `0${g}`;
  if (b.length === 1) b = `0${b}`;

  return `#${r}${g}${b}`;
};

const HSLtoRGB = (h, s, l) => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};

const luminanceFromRGB = (r, g, b) => {
  // Formula from WCAG 2.0
  const [R, G, B] = [r, g, b].map(function (c) {
    c /= 255; // to 0-1 range
    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 21.26 * R + 71.52 * G + 7.22 * B;
};

const luminanceFromHex = (H) => {
  return round(luminanceFromRGB(...Object.values(hexToRGB(H))), 2);
};

// TODO: Even out this function, luminance values aren't linear/good
const lightnessFromHSLum = (H, S, Lum) => {
  const vals = {};
  for (let L = 99; L >= 0; L--) {
    vals[L] = Math.abs(
      Lum - luminanceFromRGB(...Object.values(HSLtoRGB(H, S, L)))
    );
  }

  // Run through all these and find the closest to 0
  let lowestDiff = 100;
  let newL = 100;
  for (let i = Object.keys(vals).length - 1; i >= 0; i--) {
    if (vals[i] < lowestDiff) {
      newL = i;
      lowestDiff = vals[i];
    }
  }

  return newL;
};

const isValidName = (name) => {
  const re = new RegExp(/^[A-Za-z]{3,24}$/i);

  return re.test(name);
};

// Checks if value starts with hash - adds hash if missing
const checkHash = (value) => {
  const valueHex = !value.startsWith(`#`) ? `#${value}` : value;
  return valueHex;
}

const isHex = (value) => {
  const valueHex = checkHash(value);

  const re = new RegExp(/^#[0-9A-F]{6}$/i);

  return re.test(valueHex.toUpperCase());
};

const output = (palettes) => {
  const shaped = {};

  palettes.forEach((palette) => {
    const swatches = {};
    palette.swatches
      .filter((swatch) => ![0, 1000].includes(swatch.stop))
      .forEach((swatch) =>
        Object.assign(swatches, { [swatch.stop]: swatch.hex.toUpperCase() })
      );

    Object.assign(shaped, { [palette.name]: swatches });
  });

  return shaped;
};

module.exports = {
  round,
  hexToHSL,
  hexToRGB,
  HSLToHex,
  luminanceFromRGB,
  luminanceFromHex,
  lightnessFromHSLum,
  isValidName,
  checkHash,
  isHex,
  output,
};
