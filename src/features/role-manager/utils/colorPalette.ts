export const PREMIUM_PALETTES = [
  // 0. Slate Blue
  ["#D9E5F9", "#C7D8F5", "#B4CBF2", "#A1BEEF", "#84A1D1", "#6783B3", "#496695", "#3B5786", "#2C4877", "#1E3A68", "#0F2B59"],
  // 1. Plum Pink
  ["#F2D4E4", "#ECBED6", "#E5A9C9", "#DF93BB", "#BE799D", "#9D5F7F", "#7B4562", "#6B3853", "#5A2B44", "#4A1E35", "#391126"],
  // 2. Olive Green
  ["#E2EED0", "#D3E5B8", "#C5DDA1", "#B6D489", "#97B170", "#798F58", "#5A6C3F", "#4B5B33", "#3C4A27", "#2C381A", "#1D270E"],
  // 3. Violet Purple
  ["#E4DAF9", "#D6C8F6", "#C9B5F3", "#BBA3F0", "#9D85D2", "#8068B5", "#624A97", "#533B88", "#452D7A", "#361E6B", "#270F5C"],
  // 4. Gold Orange
  ["#FCE3CA", "#FBD6AF", "#F9C895", "#F8BA7A", "#D49C62", "#B17F4B", "#8D6133", "#7B5227", "#6A441C", "#583510", "#462604"],
  // 5. Lime Green
  ["#EAECC6", "#DFE2AA", "#D5D98D", "#CACF71", "#A5A95C", "#808346", "#5B5E31", "#494B26", "#36381B", "#242511", "#111206"],
  // 6. Terracotta
  ["#FDCFC2", "#FDB8A4", "#FCA085", "#FB8867", "#D47053", "#AD573E", "#873F2A", "#733320", "#602615", "#4C1A0B", "#390E01"]
];

/** Dynamic string hashing to map any region ID or name consistently to a palette index (0 - 6) */
export function getPaletteIndex(id: number | string): number {
  const str = String(id);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % PREMIUM_PALETTES.length;
}

/** Consistently get outline/fill base colors for a specific region */
export function getRegionColors(regionId: number | string) {
  const paletteIdx = getPaletteIndex(regionId);
  const palette = PREMIUM_PALETTES[paletteIdx];
  return {
    fill: palette[3],    // Shade 5
    border: palette[6],  // Shade 8
  };
}

/** Consistently get unique area colors (shades) from its region's palette */
export function getAreaColors(regionId: number | string, areaIndex: number) {
  const paletteIdx = getPaletteIndex(regionId);
  const palette = PREMIUM_PALETTES[paletteIdx];
  // Select different contrasting shades (e.g. 3, 4, 6, 7, 8.5, 9, 9.5) to avoid adjacent area clashes
  const shadeIndices = [1, 2, 4, 5, 7, 8, 9];
  const selectedShade = shadeIndices[Math.abs(areaIndex) % shadeIndices.length];
  return palette[selectedShade];
}
