---
title: "*.ogf"
---

# *.ogf

___

## About

Compiled 3D models for the game

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

## Programs

<CardGrid
  columns={4}
  items={[
    {
      title: "Blender X-Ray Addon",
      content: "Blender X-Ray is an addon for the Blender that is designed to import/export 3D models and animations from S.T.A.L.K.E.R. (X-Ray Engine).",
      link: "../../../modding-tools/blender",
      internal: true
    },
    {
      title: "IX-Ray SDK",
      content: "SDK or Software Development Kit helped the developers of the original trilogy and the modders to develop the game itself.",
      link: "../../../modding-tools/sdk",
      internal: true
    },
    {
      title: "X-Ray Export Tool (Object Tool)",
      content: "Tool for fast editing and exporting raw S.T.A.L.K.E.R. formats.",
      link: "../../../modding-tools/models/xray-export-tool",
      internal: true
    },
    {
      title: "Ogf Editor by ValeroK",
      content: "Tool for working with *.ogf and \*.dm format.",
      link: "../../../modding-tools/models/ogf-editor-by-valerok",
      internal: true
    },
  ]}
/>

___

## Sources

[Source](https://github.com/PavelBlend/blender-xray/wiki/Formats#ogf)
