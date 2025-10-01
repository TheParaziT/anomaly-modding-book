---
description: Documentation for ERR file format
---

# *.err

___

## About

Contains information about geometry errors during level compilation with xrLC.exe

___

## Technical information

It consists of three blocks:

| Block ID | Size (bytes) | Description |
|---|---|---|
| 0x0 | [number of vertices](#block-0x0-vertices) * 12 + 4 | vertices |
| 0x1 | [number of edges](#block-0x1-edges) * 24 + 4 | edges |
| 0x2 | [number of triangles](#block-0x2-triangles) * 36 + 4 | triangles |

### Blocks

All vertices in the file are stored in the following structure:

| Type | Description |
|---|---|
| f | 3D coordinate X |
| f | 3D coordinate Y |
| f | 3D coordinate Z |

#### Block 0x0 (vertices)

Contains vertices that were glued during compilation.

Block structure:

| Type | Description |
|---|---|
| I | number of vertices |
|  | vertices |

#### Block 0x1 (edges)

Contains edges that were deleted during compilation.

Block structure:

| Type | Description |
|---|---|
| I | number of edges |
|  | edges |

##### Structure of a single edge

| Type | Description |
|---|---|
|  | first vertex |
|  | second vertex |

#### Block 0x2 (triangles)

Contains broken triangles (the area of which is close to 0.0).

Block structure:

| Type | Description |
|---|---|
| I | number of triangles |
|  | triangles |

##### Structure of a single triangle

| Type | Description |
|---|---|
|  | first vertex |
|  | second vertex |
|  | third vertex |

___

## Programs editing this file

- [Blender (X-Ray Addon)](../../../modding-tools/blender/README.mdx)
- [SDK](../../../modding-tools/sdk/README.md)

___

## Sources

[Source (Wayback Machine)](https://web.archive.org/web/20200918235831/http://stalkerin.gameru.net/wiki/index.php?title=%D0%A4%D0%BE%D1%80%D0%BC%D0%B0%D1%82_%D1%84%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2_*.err)
