# *.ogf

___

## About

Compiled 3D models for the game

___

## Technical information

- Storage of meshes without skeleton and with skeleton is supported
- Only one skeleton
- Number of bones from 1 and not more than 64
- Bones have game parameters and collision shapes
- Models with skeleton can have animations or references to external [*.omf](../animations/omf.md) files with animations (Motion References)
- The number of bones that can influence a vertex can be within these limits: SoC format - 1, 2, CS/CoP - 1, 2, 3, 4 (when exporting the extra ones are discarded and only those weights that have the biggest influence are stored)
- A file can store many materials
  - A material can have only one texture
- The number of vertices on which the triangles of one partitioned mesh are built (see previous point) cannot be more than 65,536 (since vertex numbers are stored in 2 bytes). In practice, when creating objects in blender, you should make sure that the number of triangles of one material is not greater than 65,536
- Smoothing is stored as vertex normals. Due to this, during export to *.ogf, not only the boundaries of smoothing groups, but also the direction of normals are stored
- A mesh can have only one UV map
- Support for storing information about geometry simplification in the form of Slide Window Items

___

## Programs editing this file

- [Blender (X-Ray Addon)](../../../modding-tools/blender/README.mdx)
- [Ogf Editor by ValeroK](../../../modding-tools/models/ogf-editor-by-valerok.md)
- [SDK](../../../modding-tools/sdk/README.md)

___

## Sources

[Source](https://github.com/PavelBlend/blender-xray/wiki/Formats#ogf)
