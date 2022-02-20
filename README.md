# Palettey

Package to generate a 10-color palette based on a given color hex.
Useful to generate Tailwind CSS palettes.
## Usage

```js
    // Generate a luminance palette
    createPalleteFromColor("primary", "#7953e0", {
      useLightness: false,
    })
    
    // Generate a lightness palette
    createPalleteFromColor("primary", "#7953e0", {})
```

Check out [Palette Generator](https://tailwind.simeongriggs.dev) to try the generator online.

## Credits
Based on [tailwind-css-palette-generator](https://github.com/SimeonGriggs/tailwind-css-palette-generator) created by [Simeon Griggs](https://simeongriggs.dev/)
