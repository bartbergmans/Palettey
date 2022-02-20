export interface SwatchValue {
  hex?: string;
  stop?: number;
  h?: number;
  hScale?: number;
  s?: number;
  sScale?: number;
  l?: number;
}

export interface PaletteConfig {
  id?: string;
  name?: string;
  value?: string;
  swatches?: SwatchValue[];
  useLightness?: boolean;
  h?: number;
  s?: number;
  lMin?: number;
  lMax?: number;
}

export interface Palette {
  key: string;
  value: string;
}

export interface PaletteOutput {
  [key: string]: Palette;
}

export function createPalleteFromColor(
  name: string,
  baseColor: string,
  config: PaletteConfig
): PaletteOutput;
