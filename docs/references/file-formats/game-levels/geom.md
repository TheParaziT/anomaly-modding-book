---
description: Documentation for GEOM file format
title: "*.geom"
draft: false
---

# *.geom

___

> The format was disassembled by Haper (not completely disassembled, adjustments are needed)

## About

Contains all visible map geometry. It contains all vertices with normals and coordinates for textures and indexes for building geometry, as well as synchronization.

## Technical information

## The file consists of the following blocks

|  | Block code |
|---|---|
| [Map compiler version](#map-compiler-version-the-block-is-the-same-for-all-maps) | 1 |
| [Vertex description](#vertex-description) | 9 |
| [Indexes description](#indexes-description) | 10 |
| [Synchronization description](#synchronization-description) | 11 |

### Types of variables

| Type code | Value |
|---|---|
| 1 | DWord(4) + DWord(4) |
| 4 | Byte(1) + Byte(1) + Byte(1) + Byte(1) |
| 6 | Word(2)/32768 + Word(2)/32768 |
| 7 | (Byte(1)-128)/128 + (Byte(1)-128)/128 + (Byte(1)-128)/128 + (Byte(1)-128)/128 |

### Map compiler version (the block is the same for all maps)

|  | Value | Size |
|---|---|---|
| Block code | 1 | Word(2) |
| Data compression (0 - no, 32768 - yes) | 0 | Word(2) |
| Block size (bytes) | 4 | DWord(4) |
| Version number (same for all) | 13 | DWord(4) |

### Vertex description

|  | Value | Size |
|---|---|---|
| Block code | 9 | Word(2) |
| Data compression (0 - no, 32768 - yes) | 0 | Word(2) |
| Block size (bytes) | 4 | DWord(4) |
| Number of vertex description blocks | - | DWord(4) |
| Vertex description block | - | - |

#### Vertex description block

|  | Value | Size |
|---|---|---|
| Beginning of a new block | 0 | DWord(4) |
| Beginning of the vertex format description | 2 | DWord(4) |
| Vertex format | - | - |
| End of vertex format description | 255 | DWord(4) |
| Beginning of the vertex description | 17 | DWord(4) |
| Number of vertices | - | DWord(4) |
| Vertexes | - | - |

:::note[A few words about the vertex format]
As you already know, there are several vertex description blocks in the file. Not all objects in the game are the same: you have to specify coordinates of lightmaps for brushes, and coordinates of textures for trees can be simplified. Therefore, vertices specified in different blocks may be different. The vertex format is specified using several structures - this is the standard D3D vertex buffer format. That is, the file contains ready assembled vertex buffers for D3D:
:::

|  | Value | Size |
|---|---|---|
| ???(always zero) | 0 | Word(2) |
| Offset | - | Word(2) |
| Type of variables | - | Word(2) |
| What the variables describe | - | Word(2) |

> At the very beginning of any vertex are the coordinates of its placement, so the vertex format does not include a description of the coordinates. There are only three vertex formats in the 2215 maps:

#### Vegetation

|  | Value | Size |
|---|---|---|
| zero | 0 | Word(2) |
| Offset | 12 | Word(2) |
| Type of variables | 4 | Word(2) |
| Normals | 3 | Word(2) |
| Light factor(?) | ? | Word(2) |
| Offset | 16 | Word(2) |
| Type of variables | 4 | Word(2) |
| Tangents | 6 | Word(2) |
| Texture corrector X coordinate | 0/1 | Word(2) |
| Offset | 20 | Word(2) |
| Type of variables | 4 | Word(2) |
| Bi-Tangents | 7 | Word(2) |
| Texture corrector Y coordinate | 0/1 | Word(2) |
| Offset | 24 | Word(2) |
| Type of variables | 7 | Word(2) |
| Texture coordinates | 5 | Word(2) |

> Thus, the total length of one vegetation vertex equals 32 bytes.

#### Brush

|  | Value | Size |
|---|---|---|
| zero | 0 | Word(2) |
| Offset | 12 | Word(2) |
| Type of variables | 4 | Word(2) |
| Normals | 3 | Word(2) |
| Light factor(?) | ? | Word(2) |
| Offset | 16 | Word(2) |
| Type of variables | 4 | Word(2) |
| Tangents | 6 | Word(2) |
| Texture corrector X coordinate | 0/1 | Word(2) |
| Offset | 20 | Word(2) |
| Type of variables | 4 | Word(2) |
| Bi-Tangents | 7 | Word(2) |
| Texture corrector Y coordinate | 0/1 | Word(2) |
| Offset | 24 | Word(2) |
| Type of variables | 1 | Word(2) |
| Texture coordinates | 5 | Word(2) |
| zero | 0 | Word(2) |
| Offset | 32 | Word(2) |
| Type of variables | 6 | Word(2) |
| Lightmap coordinates | 261 | Word(2) |

> The total length of one brash vertex is 36 bytes.

#### Entity

|  | Value | Size |
|---|---|---|
| zero | 0 | Word(2) |
| Offset | 12 | Word(2) |
| Type of variables | 4 | Word(2) |
| Normals | 3 | Word(2) |
| Light factor(?) | ? | Word(2) |
| Offset | 16 | Word(2) |
| Type of variables | 4 | Word(2) |
| Tangents | 6 | Word(2) |
| Texture corrector X coordinate | 0/1 | Word(2) |
| Offset | 20 | Word(2) |
| Type of variables | 4 | Word(2) |
| Bi-Tangents | 7 | Word(2) |
| Texture corrector Y coordinate | 0/1 | Word(2) |
| Offset | 24 | Word(2) |
| Type of variables | 4 | Word(2) |
| ??? | 10 | Word(2) |
| zero | 0 | Word(2) |
| Offset | 28 | Word(2) |
| Type of variables | 1 | Word(2) |
| Texture coordinates | 5 | Word(2) |

> The total length of one vertex of an entity is 36 bytes.
> Based on this, we get, for example, this view of the vertex:

#### Brush

|  | Value | Offset | Size |
|---|---|---|---|
| Coordinate X | 30.76 | 0 | DWord(4) |
| Coordinate Z | 0.2 | 4 | DWord(4) |
| Coordinate Y | 51.4 | 8 | DWord(4) |
| Normal at X | 127 | 12 | Byte(1) |
| Normal at Z | 255 | 13 | Byte(1) |
| Normal at Y | 127 | 14 | Byte(1) |
| Light factor(?) | 1 | 15 | Byte(1) |
| Tangent at X | 127 | 16 | Byte(1) |
| Tangent at Z | 255 | 17 | Byte(1) |
| Tangent at Y | 255 | 18 | Byte(1) |
| Texture corrector X coordinate | 0 | 19 | Byte(1) |
| Bi-Tangent at X | 0 | 20 | Byte(1) |
| Bi-Tangent at Z | 127 | 21 | Byte(1) |
| Bi-Tangent at Y | 127 | 22 | Byte(1) |
| Texture corrector Y coordinate | 0 | 23 | Byte(1) |
| Texture coordinate X | 3.1802 | 24 | Single(4) |
| Texture coordinate Y | 2.2143 | 28 | Single(4) |
| Lightmap coordinate X | 0.4023 | 32 | ShortSingle(2) |
| Lightmap coordinate Y | 0.000097 | 34 | ShortSingle(2) |

### Indexes description

|  | Value | Size |
|---|---|---|
| Block code | 10 | Word(2) |
| Data compression (0 - no, 32768 - yes) |  | Word(2) |
| Block size (bytes) | - | DWord(4) |
| Number of index description blocks | - | DWord(4) |
| Index description block | - | - |

#### Index description block

|  | Value | Size |
|---|---|---|
| Number of indexes in a block | - | DWord(4) |
| Indexes | - | DWord(4) |

> Index: Word(2)
> The number of indexes must always be a multiple of three, because triangles are constructed using indexes.

### Synchronization description

> (what they synchronize is still a mystery to scientists)

|  | Value | Size |
|---|---|---|
| Block code | 11 | Word(2) |
| Data compression (0 - no, 32768 - yes) | 0 | Word(2) |
| Block size (bytes) | - | DWord(4) |
| Number of synchronization units | - | DWord(4) |
| Synchronization units | - | - |

#### Synchronization block

|  | Value | Size |
|---|---|---|
| ??? | 0 | DWord(4) |
| ??? | 0 | DWord(4) |
| ??? | 0 | DWord(4) |
| ??? | 0 | DWord(4) |
| Number of synchronization units | - | DWord(4) |
| Synchronization units | - | - |

##### Synchronization unit

|  | Value | Size |
|---|---|---|
| ??? |  | DWord(4) |
| ??? |  | Word(2) |
| ??? |  | Word(2) |

___

## Sources

[gameru (Wayback Machine)](https://web.archive.org/web/20200919002943/http://stalkerin.gameru.net/wiki/index.php?title=Level.geom)
