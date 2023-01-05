const palettey = require("../index.js");

it("generates a palette based on a color", () => {
  expect(
    palettey.createPaletteFromColor("primary", "#7953e0", {})
  ).toMatchObject({
    primary: {
      50: "#F1EEFC",
      100: "#E4DCF9",
      200: "#C9BAF3",
      300: "#AE97EC",
      400: "#9375E6",
      500: "##7953E0",
      600: "#5325CF",
      700: "#3E1C9C",
      800: "#291368",
      900: "#150934",
    },
  });
});

it("generates a luminance palette based on a color", () => {
  expect(
    palettey.createPaletteFromColor("primary", "#7953e0", {
      useLightness: false,
    })
  ).toMatchObject({
    primary: {
      50: "#F8F6FD",
      100: "#EEE9FB",
      200: "#DACFF6",
      300: "#C2B1F1",
      400: "#A78FEB",
      500: "##7953E0",
      600: "#6E45DE",
      700: "#5A2BD9",
      800: "#4A21BA",
      900: "#341782",
    },
  });
});
