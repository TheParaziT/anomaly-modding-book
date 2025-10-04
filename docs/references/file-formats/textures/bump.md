---
title: "*_bump.dds"
---

# *_bump.dds

___

## About

The bump map is a regular normal map in A(BGR) format (typical for DXT5_nm compression format). The developers used this order for a very simple reason - DXT compression "spoils" the texture much less, since the alpha channel is not subjected to compression and remains almost in its original form.

## Technical information

### Format

- R - Glossiness (Glossiness, aka inverted roughness. It works best in S.T.A.L.K.E.R., and allows for using better [BRDF](https://en.wikipedia.org/wiki/Bidirectional_reflectance_distribution_function))
- G - Normal Z (Unused)
- B - Normal Y (DirectX format)
- A - Normal X

### Supported texture compression formats

- DXT1
- ADXT1
- DXT5
- 4444 (RGBA4444)
- 1555 (RGBA1555)
- 565 (RGB565)
- RGB
- RGBA
- BC7 (DX11)
- A8
- L8
- A8L8

## Programs

<CardGrid
  columns={2}
  items={[
    {
      title: "Bump Generator",
      content: "Blender X-Ray is an addon for the Blender that is designed to import/export 3D models and animations from S.T.A.L.K.E.R. (X-Ray Engine).",
      link: "../../../modding-tools/textures/bump-generator",
      internal: true
    },
    {
      title: "IX-Ray SDK",
      content: "SDK or Software Development Kit helped the developers of the original trilogy and the modders to develop the game itself.",
      link: "../../../modding-tools/sdk",
      internal: true
    },
  ]}
/>
