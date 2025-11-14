---
title: Compile Shaders List
description: List and description of Compile Shaders in shaders_xrlc.xr file.
keywords:
  - Compile
  - SDK
  - Shaders
  - List
tags:
  - SDK
  - Shaders
draft: false
---

# Compile Shaders List

___

## About

This section contains a list and description of the shaders that are available in the `shaders_xrlc.xr` file. This file contains descriptions of the settings that are used by the Level Compiler.

import ExpandableDataTable from '@site/src/components/DynamicTableLoader/ExpandableDataTable';

<ExpandableDataTable 
  basePath="/data/tables/shaders/compiler/"
  items={[
    {
      id: "def-ghost-vertex",
      fileName: "def-ghost-vertex.json",
      title: "def-ghost-vertex",
      description: "Semi-transparent Vertex shader without collision, with rendering, UV optimization, shadow casting",
    },
    {
      id: "def-ghost",
      fileName: "def-ghost.json",
      title: "def-ghost",
      description: "Semi-transparent Ligthmap shader without collision, with rendering, UV optimization, shadow casting",
    },
    {
      id: "def-kolizion-lm",
      fileName: "def-kolizion-lm.json",
      title: "def-kolizion-lm",
      description: "Fully transparent Lightmap shader with collision, without rendering, UV optimization, shadow casting",
    },
    {
      id: "def-kolizion-vertex",
      fileName: "def-kolizion-vertex.json",
      title: "def-kolizion-vertex",
      description: "Fully transparent Vertex shader with collision, without rendering, UV optimization, shadow casting",
    },
    {
      id: "def-kolizion",
      fileName: "def-kolizion.json",
      title: "def-kolizion",
      description: "",
    },
    {
      id: "def-normals",
      fileName: "def-normals.json",
      title: "def-normals",
      description: "",
    },
    {
      id: "def-noshadow-pol",
      fileName: "def-noshadow-pol.json",
      title: "def-noshadow-pol",
      description: "Transparent (70%) Lightmap shader with collision, rendering, UV optimization, without shadow casting",
    },
    {
      id: "def-noshadow",
      fileName: "def-noshadow.json",
      title: "def-noshadow",
      description: "Semi-transparent Lightmap shader with collision, rendering, UV optimization, without shadow casting",
    },
    {
      id: "def-object-lod-collision",
      fileName: "def-object-lod-collision.json",
      title: "def-object-lod-collision",
      description: "Vertex shader with collision, shadow casting, without rendering, UV optimization",
    },
    {
      id: "def-object-lod-visual",
      fileName: "def-object-lod-visual.json",
      title: "def-object-lod-visual",
      description: "Vertex shader without collision, with rendering, UV optimization, shadow casting",
    },
    {
      id: "def-object-lod",
      fileName: "def-object-lod.json",
      title: "def-object-lod",
      description: "Vertex shader with collision, rendering, UV optimization, shadow casting",
    },
    {
      id: "def-selflight",
      fileName: "def-selflight.json",
      title: "def-selflight",
      description: "",
    },
    {
      id: "def-translucensy",
      fileName: "def-translucensy.json",
      title: "def-translucensy",
      description: "Transparent (30%) Lightmap shader (density 0.50) with collision, rendering, UV optimization, shadow casting",
    },
    {
      id: "def-vertex-ghost-no-shadow",
      fileName: "def-vertex-ghost-no-shadow.json",
      title: "def-vertex-ghost-no-shadow",
      description: "Semi-transparent Vertex shader without collision, shadow casting, with UV optimization, rendering",
    },
    {
      id: "def-vertex-ghost",
      fileName: "def-vertex-ghost.json",
      title: "def-vertex-ghost",
      description: "Semi-transparent Vertex shader without collision, with UV optimization, shadow casting, rendering",
    },
    {
      id: "def-vertex-invinsible-castshadow",
      fileName: "def-vertex-invinsible-castshadow.json",
      title: "def-vertex-invinsible-castshadow",
      description: "Semi-transparent Vertex shader with collision, UV optimization, without shadow casting, rendering",
    },
    {
      id: "def-vertex-no-shadow",
      fileName: "def-vertex-no-shadow.json",
      title: "def-vertex-no-shadow",
      description: "Semi-transparent Vertex shader with collision, rendering, UV optimization, without shadow casting",
    },
    {
      id: "def-vertex",
      fileName: "def-vertex.json",
      title: "def-vertex",
      description: "Semi-transparent Vertex shader with collision, rendering, UV optimization, shadow casting",
    },
    {
      id: "default-lm-hq",
      fileName: "default-lm-hq.json",
      title: "default-lm-hq",
      description: "High quality Lightmap shader (density 2.00) with collision, rendering, UV optimization, shadow casting",
    },
    {
      id: "default-lm01-ghost",
      fileName: "default-lm01-ghost.json",
      title: "default-lm01-ghost",
      description: "Lightmap shader (density 0.10) without collision, with rendering, UV optimization, shadow casting",
    },
    {
      id: "default-lm01",
      fileName: "default-lm01.json",
      title: "default-lm01",
      description: "Lightmap shader (density 0.10) with collision, rendering, UV optimization, shadow casting",
    },
    {
      id: "default-lm03-ghost",
      fileName: "default-lm03-ghost.json",
      title: "default-lm03-ghost",
      description: "Lightmap shader (density 0.30) without collision, with rendering, UV optimization, shadow casting",
    },
    {
      id: "default-lm03-smooth",
      fileName: "default-lm03-smooth.json",
      title: "default-lm03-smooth",
      description: "",
    },
    {
      id: "default-lm03",
      fileName: "default-lm03.json",
      title: "default-lm03",
      description: "Lightmap shader (density 0.30) with collision, rendering, UV optimization, shadow casting",
    },
    {
      id: "default-lm05-ghost",
      fileName: "default-lm05-ghost.json",
      title: "default-lm05-ghost",
      description: "Lightmap shader (density 0.50) without collision, with rendering, UV optimization, shadow casting",
    },
    {
      id: "default-lm05",
      fileName: "default-lm05.json",
      title: "default-lm05",
      description: "Lightmap shader (density 0.50) with collision, rendering, UV optimization, shadow casting",
    },
    {
      id: "default-smooth",
      fileName: "default-smooth.json",
      title: "default-smooth",
      description: "Lightmap shader with collision, rendering, UV optimization, shadow casting",
    },
    {
      id: "default",
      fileName: "default.json",
      title: "default",
      description: "Lightmap shader with collision, rendering, UV optimization, shadow casting",
    },
  ]}
  columns={{ showCategory: false, showPreview: false }}
/>
