---
title: "*.object"
draft: false
---

# *.object

___

## About

These files are intended for the X-Ray SDK to store 3D content in its original, uncompressed, lossless form. They are source files that store information before compilation into other game compressed formats.

## Technical information

### The format can store the following basic data (the list is not complete)

- Meshes
- Materials
- Bones
- Skeleton animations

### Possibilities and limitations of the *.object format

One *.object file can store:

- one or more meshes if it has no skeleton and only one meshes if it has a skeleton
- one or more materials
- a skeleton can be absent, or it can hold at least one
- a skeleton can store a minimum of 1, a maximum of 64 bones (for X-Ray SDK 0.4)
- skeleton animations may not be present, or one or more animations may be stored
- skeleton animations do not support Scale keys
- each mesh can have one or more materials
- each mesh must have one UV map
- each material can store only one texture

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

[Blender X-Ray Wiki](https://github.com/PavelBlend/blender-xray/wiki/Formats#object)
