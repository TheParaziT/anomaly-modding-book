---
description: Documentation for DM file format
---

# *.dm

___

## About

Effect of a dynamic weather environment (e.g., rain or lightning)

___

## Technical information

It works like this: UV descends down the Y coordinates to the texture

![example](assets/gifs/dm.gif)

### Format limitations

- Must have one material
- Does not support smoothing
- Stores only one mesh
- Mesh can have only one UV map
- Number of vertices in mesh must be no more than 65,536

### General structure

| Data |
|---|
| [shader name](#shader-name) |
| [texture name](#texture-name) |
| [flags](#flags) |
| [minimum size](#minimum-size) |
| [maximum size](#maximum-size) |
| [number of vertices](#number-of-vertices) |
| [number of indexes](#number-of-indexes) |
| [vertices](#vertices) |
| [indexes](#indexes) |

### Structure description

#### Shader name

| Data | Type | Description | Example |
|---|---|---|---|
| shader name | s | The line that specifies the name of the shader from the shaders.xr file | effects\lightning0x00 |

#### Texture name

| Data | Type | Description | Example |
|---|---|---|---|
| texture name | s | A string that specifies the path and the name of the texture | fx\fx_rainsplash10x00 |

#### Flags

| Data | Type | Description | Example |
|---|---|---|---|
| flags | I | These are options. Used in the file level.details | If 0x0, the vegetation swings in the wind (bushes), and if 0x1, it is stationary (leaves) |

#### Minimum size

| Data | Type | Description | Example |
|---|---|---|---|
| minimum size | f | The minimum size of the model. These values are used in the level.details files | - |

#### Maximum size

| Data | Type | Description | Example |
|---|---|---|---|
| maximum size | f | Maximum model size. These values are used in the level.details files | - |

#### Number of vertices

| Data | Type | Description | Example |
|---|---|---|---|
| number of vertices | I | Number of vertices in a mesh | - |

#### Number of indexes

| Data | Type | Description | Example |
|---|---|---|---|
| number of indexes | I | Number of indexes by which triangles are built | - |

#### Vertices

The vertices are stored sequentially.

The structure of a single vertex:

| Data | Type |
|---|---|
| 3D coordinate x | f |
| 3D coordinate y | f |
| 3D coordinate z | f |
| texture coordinate u | f |
| texture coordinate v | f |

Restrictions are imposed on the vertices:

1. one vertex may have only one texture coordinate. When saving the model in *.dm, a vertex that has two (or more) texture coordinates is converted into two (or more) vertices.
2. Their number should not be more than 65536, because their triangle indices are stored in 2 bytes.

#### Indexes

The indices of the vertices by which triangles are formed.

The indexes are stored sequentially.

The index structure:

| Data | Type |
|---|---|
| vertex index | H |

___

## Programs editing this file

- [Blender (X-Ray Addon)](../../../modding-tools/blender/README.mdx)
- [X-Ray Export Tool (Object Tool)](../../../modding-tools/models/xray-export-tool.md)
- [SDK](../../../modding-tools/sdk/README.md)

___

## Sources

[Source 1 (Wayback Machine)](https://web.archive.org/web/20200918231136/http://stalkerin.gameru.net/wiki/index.php?title=%D0%A4%D0%BE%D1%80%D0%BC%D0%B0%D1%82_%D1%84%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2_*.dm)
[Source 2](https://github.com/PavelBlend/blender-xray/wiki/Formats#dm)
