---
tags:
    - Console Commands
description: R1 Render Console Commands
title: R1 Render
preview: /docs/references/engine/console-commands/assets/images/console-commands-preview.png
---

# R1 Render

___

:::note
DirectX 9.0 (Shader Model 2.0)
:::

## Release build

| Command | Command description | Command's argument | Note |
|---|---|---|---|
| r1_detail_textures | Detailed textures on static lighting | 'on/off' or '1/0' | - |
| r1_dlights | Dynamic light sources on static lighting | 'on/off' or '1/0' | - |
| r1_dlights_clip | Sets the display radius (visibility range) of dynamic light sources | 10.000 - 150.000 | - |
| r1_fog_luminance | Fog brightness | 0.2 - 5.0 | - |
| r1_glows_per_frame | Controls the maximum number of light sources | 2 - 32 | - |
| r1_lmodel_lerp | Controls Linear Lighting Interpolation | 0.000 - 0.333 | - |
| r1_pps_u | Controls Per Pixel Shader value | -1.000 - 1.000 | - |
| r1_pps_v | Controls Per Pixel Shader value | -1.000 - 1.000 | - |
| r1_software_skinning | Software Skinning | 0 - 2 | 0 - disabled (renderer can override) 1 - enabled  2 - forced hardware skinning (renderer can not override) |
| r1_ssa_lod_a | Controls the level of detail (LOD) in the game world | 16.000 - 96.000 | - |
| r1_ssa_lod_b | Controls the level of detail (LOD) in the game world | 16.000 - 64.000 | - |
