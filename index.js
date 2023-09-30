const { nanoid } = require("nanoid");

const {
  createHueScale,
  createSaturationScale,
  createDistributionValues,
} = require("./lib/scales.js");
const {
  hexToHSL,
  HSLToHex,
  luminanceFromHex,
  lightnessFromHSLum,
  isValidName,
  isHex,
  output,
} = require("./lib/helpers.js");

const { DEFAULT_PALETTE_CONFIG } = require("./lib/constants.js");

const createPaletteFromColor = (name, baseColor, config) => {
  if (!name || !isValidName(name) || !baseColor || !isHex(baseColor)) {
    return null;
  }

  const nameValue = {
    ...DEFAULT_PALETTE_CONFIG,
    id: nanoid(),
    name,
    value: baseColor.toUpperCase(),
    swatches: [],
    ...config,
  };

  return output([
    {
      ...nameValue,
      swatches: createSwatches(nameValue),
    },
  ]);
};

const createSwatches = (palette) => {
  const { value } = palette;

  const useLightness =
    palette.useLightness ?? DEFAULT_PALETTE_CONFIG.useLightness;
  const h = palette.h ?? DEFAULT_PALETTE_CONFIG.h;
  const s = palette.s ?? DEFAULT_PALETTE_CONFIG.s;
  const lMin = palette.lMin ?? DEFAULT_PALETTE_CONFIG.lMin;
  const lMax = palette.lMax ?? DEFAULT_PALETTE_CONFIG.lMax;

  const hueScale = createHueScale(h);
  const saturationScale = createSaturationScale(s);

  const { h: valueH, s: valueS, l: valueL } = hexToHSL(value);

  const lightnessValue = useLightness ? valueL : luminanceFromHex(value);
  const distributionScale = createDistributionValues(
    lMin,
    lMax,
    lightnessValue
  );

  const swatches = hueScale.map(({ key }, i) => {
    let newH = valueH + hueScale[i].tweak;
    newH = newH < 0 ? 360 + newH - 1 : newH;
    newH = newH > 720 ? newH - 360 : newH;
    newH = newH > 360 ? newH - 360 : newH;

    let newS = valueS + saturationScale[i].tweak;
    newS = newS > 100 ? 100 : newS;

    const newL = useLightness
      ? distributionScale[i].tweak
      : lightnessFromHSLum(newH, newS, distributionScale[i].tweak);

    const newHex = HSLToHex(newH, newS, newL);
    const paletteI = key;

    return {
      stop: paletteI,
      hex:
        paletteI === 500
          ? `${palette.value.toUpperCase()}`
          : newHex.toUpperCase(),
      h: newH,
      hScale: hueScale[i].tweak,
      s: newS,
      sScale: saturationScale[i].tweak,
      l: newL,
    };
  });

  return swatches;
};

module.exports = { createPaletteFromColor };
