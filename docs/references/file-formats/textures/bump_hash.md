---
title: "*_bump#.dds"
---

# *_bump#.dds

___

## About

Corrects DXT compression errors in [*_bump.dds](bump.md)

## Technical information

### Format

- RGB - Error correction for normal map [*_bump.dds](bump.md) - Not necessary if you're using good quality normal map. It's generated with SDK
- A - Height map (Used for parallax normal mapping)

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
