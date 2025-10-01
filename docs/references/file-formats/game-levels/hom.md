# *.hom (Hierarchical Occlusion Mapping)

___

## About

HOM is a geometry cutter, which is a mesh and is needed to increase performance. This file is created during level compilation.

___

## Technical information

### Blocks

Consists of two blocks:

| Block ID | Size (bytes) | Description |
|---|---|---|
| 0x0 | 4 | header (contains information about the format version) |
| 0x1 | number of polygons * 40 | vertex coordinates and polygon properties |

### Block description

#### Block 0x0 (header)

| Type | Description |
|---|---|
| I | format version |

#### Block 0x1 (mesh data)

Contains the data of the triangles, which are written one by one.

The data is for one triangle:

| Type | Description |
|---|---|
| fff | 3D coordinates of the first vertex of the triangle |
| fff | 3D coordinates of the second vertex of the triangle |
| fff | 3D coordinates of the third vertex of the triangle |
| I | two sided option |

Possible values of the "two sided" option: 0x0, 0x1

The polygon indices are not saved, but they can easily be generated, since all vertices are saved so that the polygon indices are in ascending order.

The first triangle will be: 0, 1, 2, second: 3, 4, 5, third: 6, 7, 8, etc.

___

## Programs editing this file

- [Blender (X-Ray Addon)](../../../modding-tools/blender/README.mdx)
- [SDK](../../../modding-tools/sdk/README.md)

___

## Sources

[Source (Wayback Machine)](https://web.archive.org/web/20200918231330/http://stalkerin.gameru.net/wiki/index.php?title=Level.hom)
