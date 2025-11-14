---
title: Smoothing
draft: false
---

# Smoothing

___

<Authors
  authors={["pavel_blend"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## About

This page describes smoothing for mesh objects in the X-Ray engine

### Smoothing types

There are three types of smoothing in the X-Ray engine:

- Smoothing implemented at the triangle level (Smooth Groups). Analog of smoothing groups in 3DS Max
- Smoothing implemented at the edge level (Sharp Edges/Smooth Edges). Analog of Sharp Edges/Smooth Edges in Blender and Maya
- Smoothing realized at the expense of vertex normals (Vertex Normals). Analog of Split Normals in Blender

### Smoothing formats

There are four smoothing formats in the X-Ray engine:

1. Max format for [*.object](../file-formats/models/object.md) files for X-Ray SDK 0.4. It is of type Smooth Groups and is implemented as a 32-bit mask. Each bit indicates one smoothing group. Each smoothing group can occupy only one bit of the mask, which makes the maximum number of groups 32. No possibility to set non-closed smoothing boundaries. Подробнее: Параметр Smoothing Groups Mask, Не поддерживается Max-формат сглаживания.

2. Maya format for [*.object](../file-formats/models/object.md) files for X-Ray SDK 0.4. It is of type Smooth Groups and is implemented as 32-bit group indexes. КEach group has a unique number. The number of groups is unlimited. Neither does the Max format have the ability to save non-closed smoothing boundaries.

3. Clear Sky/Call of Pripyat format for X-Ray SDK 0.5, 0.6, 0.7. Has a Sharp Edges type. Smoothing boundaries are specified using edges. It is possible to specify non-closed smoothing boundaries, unlike Max/Maya smoothing which has closed boundaries.

4. In-game smoothing format for [*.ogf](../file-formats/models/ogf.md) and in-game compiled levels. Has the type Vertex Normals. When creating [*.ogf](../file-formats/models/ogf.md) or game levels, vertices are saved so that each vertex has only one normal. Smoothing boundaries are specified using the direction of normals. If the normals of the vertices of an edge are directed in one direction, the boundary between the polygons of the edge will be smoothed out. This format allows you to save not only the smoothing boundaries but also the direction of normals, which gives you more control over smoothing.

### Unofficial smoothing formats

The addon has an option to save Vertex Normals to [*.object](../file-formats/models/object.md) format. The official X-Ray SDK does not support storing such smoothing in [*.object](../file-formats/models/object.md). To keep this smoothing when exporting [*.object](../file-formats/models/object.md) to [*.ogf](../file-formats/models/ogf.md) you need to use unofficial programs (e.g. [Object Editor](../../modding-tools/models/xray-export-tool.md)).

### File formats

File formats support these smoothing formats:

- [*.object](../file-formats/models/object.md) - 1, 2, 3 and unofficial Vertex Normals
- [*.ogf](../file-formats/models/ogf.md) - 4
- [level](../file-formats/game-levels/level.md)/level[*.geom](../file-formats/game-levels/geom.md) - 4
- [*.dm](../file-formats/models/dm.md) - does not support smoothing
- [*.details](../file-formats/game-levels/details.md) - does not support smoothing
