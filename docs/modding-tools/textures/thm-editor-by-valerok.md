---
title: Modified THM Editor by ValeroK
tags:
  - Texture
  - Modding Tool
preview: /docs/modding-tools/textures/assets/images/thm-editor-by-valerok.png
---

# Modified THM Editor by ValeroK

___

## Info

<table>
  <tbody>
    <tr>
      <td>Program Developer</td>
      <td><Authors
          authors={['i_love_kfc','vaierok']}
          size="small"
          showTitle={false}
        /></td>
    </tr>
    <tr>
      <td>Described Version</td>
      <td>[1.1](https://github.com/VaIeroK/THM-Editor/releases/tag/1.1)</td>
    </tr>
    <tr>
      <td>Discussion Forum</td>
      <td>
        [Ap-pro forum topic](https://ap-pro.ru/forums/topic/3551-thm-editor-v10)
      </td>
    </tr>
  </tbody>
</table>

___

## About

The [THM Editor](thm-editor-by-i-love-kfc.md) from i-love-kfc was taken as the basis, finalized and fixed. Allows you to work with [.thm](../../references/file-formats/textures/thm.md) files.

![thm-editor-by-valerok centered](assets/images/thm-editor-by-valerok.png)

## Features

- Supports 99% of thm parameters

## Functionality

### Hotkeys

- `F4` - Open file
- `F5` or `Ctrl+S` - Save file
- `F6` - Save as

### Buttons

- #### File Button

| Button | Description |
|---|---|
| Load | Loads the selected .thm |
| Save | Save .thm |
| Save As | Save as .thm |
| Exit | Exit |

- #### Tools Button

| Button | Description |
|---|---|
| Import DDS Params | Adjust .thm to the texture format (texture format can be set incorrectly, so sometimes it is worth adjusting it manually) |
| Generate THM for texture | When you select a basic texture, the program creates a thm with basic properties for it (if a texture with the prefix _bump is found, the thm will set all the necessary flags for using bumps) |

### Edit flags

| Checkbox | Description | Extra |
|---|---|---|
| Generate Mip Maps | Enables [MIP-map](https://en.wikipedia.org/wiki/Mipmap) generation |  |
| Has Alpha | Takes into account the alpha channel of the map |  |
| Binary Alpha | Alpha map will use 1 bit |  |
| Alpha Border |  |  |
| Color Border | In this mode, a color arbitrarily specified by the user is used for the area outside the texture coordinate range |  |
| Fade To Color | Fade to choosed color |  |
| Fade To Alpha | Fade to alpha |  |
| Dither Color | Enables [Dither](https://en.wikipedia.org/wiki/Dither) Coloring |  |
| Dither Each MIP Level | Enables [Dither](https://en.wikipedia.org/wiki/Dither) Coloring on each MIP level |  |
| Diffuse Detail | [Detail Map](../../references/file-formats/textures/detail-map.md) texture will be used |  |
| Implicit Lighted |  |  |
| Detail Bump | [Detail Map](../../references/file-formats/textures/detail-map.md) will use its own [Bump Map](../../references/file-formats/textures/bump.md) |  |

### Texture type

| Field | Description |
|---|---|
| Image | [2D texture](https://learn.microsoft.com/en-us/windows/win32/direct3d10/d3d10-graphics-programming-guide-resources-types#2d-texture-and-2d-texture-array) |
| [Cube Map](https://en.wikipedia.org/wiki/Cube_mapping) | Is a method of environment mapping that uses the six faces of a cube as the map shape |
| Bump Map | [Bump](https://en.wikipedia.org/wiki/Bump_mapping) Map |
| [Normal Map](https://en.wikipedia.org/wiki/Normal_mapping) | Normal Map |
| Terrain | Terrain Map |

### Texture compression formats

| Field | Description |
|---|---|
| [DXT1](https://www.fsdeveloper.com/wiki/index.php?title=DXT_compression_explained#DXT1) | Compression without alpha channel support |
| [ADXT1](https://www.fsdeveloper.com/wiki/index.php?title=DXT_compression_explained#DXT1_with_alpha) | Compression with alpha channel support |
| DXT3 |  |
| [DXT5](https://www.fsdeveloper.com/wiki/index.php?title=DXT_compression_explained#DXT5) | Compression with alpha channel support |
| [4444](https://docs.unity3d.com/ScriptReference/TextureFormat.RGBA4444.html) | aka `D3DFMT_A4R4G4B4` Color and alpha texture format, 4 bit per channel |
| 1555 | aka `D3DFMT_A1R5G5B5`A pixel occupies 16 bits (2 bytes) and contains color and transparency information in the following format: 5 bits for the red channel (R) 5 bits for the green channel (G) 5 bits for the blue channel (B) 1 bit for the alpha channel (A) |
| 565 | aka `D3DFMT_R5G6B5` Each pixel occupies 16 bits (or 2 bytes) and contains color information in the following distribution: 5 bits for the red channel (R) 6 bits for the green channel (G) 5 bits for the blue channel (B) |
| RGB | Compression without alpha channel support |
| RGBA | Compression with alpha channel support |
| NVHS | NVIDIA High Compression (NVidia Texture Format (GEForce 3)) |
| NVHU | NVIDIA High-Quality Texture Compression (NVidia Texture Format)|
| [A8](https://learn.microsoft.com/en-us/windows/win32/direct3d9/d3dformat) | 8-bit alpha only DirectX Format |
| [L8](https://learn.microsoft.com/en-us/windows/win32/direct3d9/d3dformat) | 8-bit luminance only DirectX Format |
| [A8L8](https://learn.microsoft.com/en-us/windows/win32/direct3d9/d3dformat) | 16-bit using 8 bits each for alpha and luminance DirectX Format |

### Bump Mode

| Field | Description |
|---|---|
| None | None |
| Use | Use [Bump](https://en.wikipedia.org/wiki/Bump_mapping) mapping method |
| Use Parallax | Use [Parallax](https://en.wikipedia.org/wiki/Parallax_mapping) mapping method |

### MIP Filter

| Field | Description | Preview |
|---|---|---|
| Box | Simplest MIP-map generation algorithm. However, the box filter has a number of limitations that can be quite noticeable with certain textures. For example, if a texture contains very narrow features (e.g., lines), then aliasing artifacts may be very pronounced |  |
| Cubic | Generation with weighted sum of eight pixels. The advantage of the cubic filter over the box is that it can have negative side lobes (weights) which help maintain sharpness while reducing the image. This can help reduce some of the blurring effect of filtering with mipmaps |  |
| Point | (aka Nearest-neighbor interpolation) Uses only one pixel from the mipmap This is a simple and fast texture filtering method that works well in some cases, but can create visual artifacts and reduce image quality in more complex scenes. |  |
| Triangle |  |  |
| Quadratic | This method offers a balance between quality and performance It uses an interpolation method that is based on quadratic equations. Instead of just selecting one pixel (as in Point), this method considers three pixels - one from the selected mipmap level and the two closest to it - to greatly improve the smoothness of the transition of color values. |  |
| Advanced |  |  |
| Catrom |  |  |
| Mitchell |  |  |
| Gaussian |  |  |
| Sinc |  |  |
| Bessel |  |  |
| Hanning |  |  |
| Hamming |  |  |
| Blackman |  |  |
| Kaiser | Increase readability of textures by increasing sharpness and contrast |  |

### Material

:::info
Different shading algorithms
:::

| Field | Description |
|---|---|
| OrenNayar Blin | `Oren-Nayar shading` is a lighting model used in computer graphics to render matte (rough) surfaces with respect to their micro geometry. `Blinn shading` uses a combination of diffuse and specular light reflection to achieve a more realistic image of shiny objects. |
| Blinn Phong | `Blinn shading` uses a combination of diffuse and specular light reflection to achieve a more realistic image of shiny objects. `Phong shading` model can achieve good visual results, making objects appear more three-dimensional and realistic, but at the same time it cannot always accurately reproduce lighting effects on more complex or uneven surfaces. |
| Phong Metal | `Phong shading` model can achieve good visual results, making objects appear more three-dimensional and realistic, but at the same time it cannot always accurately reproduce lighting effects on more complex or uneven surfaces. `Metal shading` is focuses on the realization of materials imitating metallic surfaces. |
| Metal OrenNayar | `Metal shading` is focuses on the realization of materials imitating metallic surfaces. `Oren-Nayar shading` is a lighting model used in computer graphics to render matte (rough) surfaces with respect to their micro geometry. |

### Checkboxes

- [ ] SOC format - SoC format of *.thm

### Fields

| Field | Description |
|---|---|
| Border Color |  |
| Fade Color |  |
| Fade Amount |  |
| Material Weight | Shading model weight (0.0 - 1.0) |
| Detail Scale | [Detail Map](../../references/file-formats/textures/detail-map.md) Scale |
| Texture Width | Texture Width |
| Texture Height | Texture Height |
| Fade Delay |  |
| Bump Height | [Bump Map](../../references/file-formats/textures/bump.md) Height |
| Detail name | Path to [Detail Map](../../references/file-formats/textures/detail-map.md) |
| Bump name | Path to [Bump Map](../../references/file-formats/textures/bump.md) |
| Normal Map name | Path to Normal Map |

___

## Sources

[Source Code of Original THM Editor by i-love-kfc](https://gitlab.com/i-love-kfc/thm-editor/)

[Source Code of Modified THM Editor by ValeroK](https://github.com/VaIeroK/THM-Editor)
