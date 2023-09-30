# Palettey [![GitHub license](https://img.shields.io/github/license/bartbergmans/Palettey)](https://github.com/bartbergmans/Palettey/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/palettey)](https://www.npmjs.com/package/palettey) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/bartbergmans/palettey/CodeQL)](https://github.com/bartbergmans/Palettey/actions)

Package to generate a 10-color palette based on a given color hex.
Useful to generate Tailwind CSS palettes.

## Install
```
npm install --save palettey
```

## Usage

```js
import { createPaletteFromColor } from "palettey";

// Generate a luminance palette
createPaletteFromColor("primary", "#7953e0", {
  useLightness: false,
})
    
// Generate a lightness palette
createPaletteFromColor("primary", "#7953e0", {})
```

To create css variables for the generated palette you can use:

```js
const palette = createPaletteFromColor("primary", "D20000", {});
Object.entries(palette.test).forEach((entry) => {
  const [step, color] = entry;
  document.documentElement.style.setProperty(
    `--color-primary-${step}`,
    color
  );
});
```

Check out [Palette Generator](https://tailwind.simeongriggs.dev) to try the generator online.

## Credits
Based on [tailwind-css-palette-generator](https://github.com/SimeonGriggs/tailwind-css-palette-generator) created by [Simeon Griggs](https://simeongriggs.dev/)
Contribution by [George Ciesinski](https://github.com/GeorgeCiesinski)
