---
title: Preparing Building in Blender
tags:
    - Blender
    - 3D Model
preview: /docs/tutorials/models/assets/images/creating-building-in-blender-result.png
draft: false
---

# Preparing Building in Blender

___

## Need to know {#need-to-know}

- How to work in Blender
- How to work with Blender [X-Ray Addon](../../modding-tools/blender/README.mdx)
- What is a <GlossaryTerm termId="static-object">Static Object</GlossaryTerm>
- What is a <GlossaryTerm termId="portal">Portal</GlossaryTerm> and <GlossaryTerm termId="sector">Sector</GlossaryTerm>

## About

Buildings should be created according to a special pipeline. This is necessary for future creation of `Sectors` and `Portals` for optimization.

## Start

![alt text centered](assets/images/creating-building-in-blender-example.png)

The idea is to separate the inside and outside of the building.

![alt text centered](assets/images/creating-building-in-blender-result.png)

:::note
Orange indicates the outer side.

Blue indicates the inner side.
:::

## Finish

Go to `Object Properties`![Object Properties svg-icon](../../../static/icons/blender/object-data.svg).

In [X-Ray Engine: Object](../../modding-tools/blender/addon-panels/panel-object.md) select `Static` in the `Type` list.
