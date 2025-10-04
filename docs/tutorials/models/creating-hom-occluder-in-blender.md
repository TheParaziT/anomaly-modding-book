---
title: Creating HOM Occluder in Blender
tags: [Blender, 3D Model]
---

# Creating HOM Occluder in Blender

___

<Authors
  authors={["theparazit"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## Need to know {#need-to-know}

- How to work in Blender
- How to work with Blender [X-Ray Addon](../../modding-tools/blender/README.mdx)
- What is a [Static Object](../../glossary/glossary.html#static-object)
- What is a [Hierarchical Occluder Mesh](../../glossary/glossary.html#hierarchical-occluder-mesh)

## About

HOM occluders are essential for optimizing levels. They remove the geometry in the occluder.

## Start

For the tutorial, the creation will be for Static Object, but HOM occluders can also be used for other purposes (e.g. for tall view bounders, hills, etc.). Let's take this as an example:

![Model Example centered](assets/images/creating-hom-occluder-in-blender-my-model.png)

All we need to do is create a mesh that simplistically represents our model:

![Model Result centered](assets/images/creating-hom-occluder-in-blender-result.png)

:::tip
You can simply duplicate your model, but remember that the fewer polygons and the better HOM Occluder represents your model, the better.
:::

## Surface

Go to `Material Properties`![Material Properties svg-icon](../../../static/icons/blender/material.svg).

Create a separate material for our HOM occluder.

In [X-Ray Engine: Material](../../modding-tools/blender/addon-panels/panel-material.md) choose:

### Shader

Any [Engine Shader](../../glossary/glossary.html#engine-shader) for Static Object ([list of all Engine Shaders](../../references/shaders/engine-shaders-list.md))

### Compiler

Any [Compiler Shader](../../glossary/glossary.html#compiler-shader) ([list of all Compiler Shaders](../../references/shaders/compiler-shaders-list.md))

### Material

Any [Game Material](../../glossary/glossary.html#game-material) (Example `materials/occ` - This material does not include rendering parameters that are unnecessary for the calculation) ([list of all Game Materials](../../references/materials/materials-list.md))

## Finish

Go to `Object Properties`![Object Properties svg-icon](../../../static/icons/blender/object-data.svg).

In [X-Ray Engine: Object](../../modding-tools/blender/addon-panels/panel-object.md) select `HOM` in the `Type` list.

This completes the setup of the HOM Occluder. You can safely export it in the model format you need.
