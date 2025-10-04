---
title: Creating Hanging Object in Blender
tags: [Blender, 3D Model]
description: Guide for creating hanging objects in Blender
---

# Creating Hanging Object in Blender

___

:::warning
This article is under construction
:::

## About

Hanging objects (lamps or signs) such objects have special bones that allow them to imitate ropes or any other kind of rope.

## Start

We're gonna need a model. Like a model of a sign on ropes.

![alt text centered](assets/images/creating-hanging-object-in-blender-model-example.png)

Create several bones.

- One for the collision of the sign itself
- Two (or more) bones for the ropes.
- One main (root) bone

![alt text centered](assets/images/creating-hanging-object-in-blender-bones-example.png)

## Bone

Let's set up bones

Go to Bone Properties and in X-Ray Engine: Bone, choose:

- For rope bones, select `Cloth` in Joint Type and needed `Bone Shape`.
- For sign bone select `Joint` and needed `Bone Shape`.
- For root bone, select `Rigid`. `Bone Shape` - `None`.

![alt text centered](assets/images/creating-hanging-object-in-blender-bone-shapes.png)

:::tip
Also for more accurate weight you can adjust the mass and center of mass for the bones
:::

## Finish

:::tip
If you plan to place the object on the ceiling, it is better to flip the object to the intended attachment point on top and apply all transformations to the armature and model. This will allow you to easily fix the object in the SDK at the desired angle.
:::

Go to `Object Properties`![Object Properties svg-icon](../../../static/icons/blender/object-data.svg).

In [X-Ray Engine: Object](../../modding-tools/blender/addon-panels/panel-object.md) select `Dynamic` or `Progressive Dynamic` in the `Type` list.
