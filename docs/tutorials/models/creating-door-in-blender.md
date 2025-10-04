---
title: Creating Door in Blender
tags: [Blender, 3D Model]
description: Tutorial for creating doors in Blender for the game
---

# Creating Door in Blender

___

:::warning
This article is under construction
:::

## Need to know {#need-to-know}

- How to work in Blender
- How to work with Blender [X-Ray Addon](../../modding-tools/blender/README.mdx)
- What is a [Dynamic Object](../../glossary/glossary.html#dynamic-object)

## About

Creating a functional door in Blender.

## Start

### Example 1

First, we need a door model.

![alt text centered](assets/images/creating-door-in-blender-model-example.png)

Create 2 bones.

The first bone is needed for fixation (could be any name (original developers named it `link`)).
The second bone must be named `door`.

![alt text centered](assets/images/creating-door-in-blender-bones-example.png)

#### Bone

We need to set up a `door` and fixation bone.

Go to `Bone Properties`![Bone Properties](../../../static/icons/blender/bone.svg) tab.

<img src="/icons/blender/bone.svg" alt="Bone Properties" class="theme-aware-svg" />

For `door` bone:

In [X-Ray Engine: Bone](../../modding-tools/blender/addon-panels/panel-bone.md), be sure to select `Box` in Shape Type

![alt text centered](assets/images/creating-door-in-blender-bone-shape.png)

For Joint Type, you can select `Joint` or `Slider`

- `Joint` is required for doors opening in two directions on one axis.
- `Slider` for slider type doors.

For bone, you must configure the maximum bone limits.

Example for door with type `Joint`

Limit Y:

- Min - 0 --- Minimum Y-axis door limit
- Max - 90d --- Maximum Y-axis door limit

For fixation bone:

- Shape Type - None
- Joint Type - Rigid

### Example 2 - Slide Door

:::tip
This type of door can also be suitable for sliding drawers
:::

Just like in the previous example, we need to create two bones

But this time, for the `door` bone select `Slider` in `Joint Type`.

## Finish

Go to `Object Properties`![Object Properties svg-icon](../../../static/icons/blender/object-data.svg).

In [X-Ray Engine: Object](../../modding-tools/blender/addon-panels/panel-object.md) select `Dynamic` or `Progressive Dynamic` in the `Type` list.

Next you need to set up the logic and config of your door.
