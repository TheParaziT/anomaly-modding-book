---
title: Creating Ladder in Blender
tags:
  - 3D Model
  - Blender
  - Game Material
keywords:
  - Blender
  - Ladder
  - Game Material
draft: false
---

# Creating Ladder in Blender

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
- What is a <GlossaryTerm termId="static-object">Static Object</GlossaryTerm>
- What is a <GlossaryTerm termId="game-material">Game Material</GlossaryTerm>

## About

Creating a ladder with climbing ability in Blender.

## Start

### Example 1

Let's create a ladder that can only be climbed from one side.

Here is an example of my ladder model.

![alt text centered](assets/images/creating-ladder-in-blender-model-example-1.png)

All we need to do is add a plane to the entire area where the climbing possibility will be available.

![alt text centered](assets/images/creating-ladder-in-blender-plane.png)

:::note
Green color is the plane on which the player can climb.

Red - ladder model
:::

### Surface

Go to `Material Properties`![Material Properties svg-icon](../../../static/icons/blender/material.svg).

Create a separate material for our plane.

![alt text centered](assets/images/creating-ladder-in-blender-material.png)

In [X-Ray Engine: Material](../../modding-tools/blender/addon-panels/panel-material.md) for plane (fake ladder) choose:

#### Shader

Choose any <GlossaryTerm termId="engine-shader">Engine Shader</GlossaryTerm> for Static Object. ([list of all Engine Shaders](../../references/shaders/engine-shaders-list.md))

#### Compiler

Any <GlossaryTerm termId="compile-shader">Compile Shader</GlossaryTerm>. ([list of all Compile Shaders](../../references/shaders/compiler-shaders-list.md))

#### Material

Select a suitable <GlossaryTerm termId="game-material">Game Material</GlossaryTerm> that has the `Climable` flag checked. Example `materials/fake_ladder`. ([list of all Game Materials](../../references/materials/materials-list.md))

### Example 2

If your ladder doesn't have a border where you can climb. For example, a ladder like this.

![alt text centered](assets/images/creating-ladder-in-blender-example-2.png)

Then assign to ladder material the Game Material where the `Climable` flag is enabled (`materials/fake_ladder` as example).

## Finish

Go to `Object Properties`![Object Properties svg-icon](../../../static/icons/blender/object-data.svg).

In [X-Ray Engine: Object](../../modding-tools/blender/addon-panels/panel-object.md) select `Static` in the `Type` list.
