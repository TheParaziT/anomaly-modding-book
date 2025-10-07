---
title: Setup Dynamic Object in Blender
tags: [Blender, 3D Model]
---

# Setup Dynamic Object in Blender

___

## Need to know {#need-to-know}

- How to work in Blender
- How to work with Blender [X-Ray Addon](../../modding-tools/blender/README.mdx)
- Familiarize yourself with the limitations and capabilities of the format [*.object](../../references/file-formats/models/object.md) (because you may export to it more often than to [*.ogf](../../references/file-formats/models/ogf.md)) to avoid errors
- Familiarize yourself with [Dynamic Object](../../../../glossary#dynamic-object) model type

## About

If you want your model to interact with the world and be subject to game physics, Dynamic Objects are just right for the task.

## Start

You must have a model downloaded or created by you.

You must have one UV map per mesh.

For my example, I'll have a model with this UV map.

Сreate an armature (`Shift + A` > `Armature`).

:::tip
When you create an armature, you may not see the created bone as it is rendered behind the object. To see the bone, go to `Object Data Properties`![Object Data Properties svg-icon](../../../static/icons/blender/armature-data.svg) and in `Viewport Display` -> click the `In Front` checkbox.
:::

:::note
It is important to remember that in X-Ray, the bones act as a place to anchor the collision shape.
:::

Go to `Edit Mode` and name the bone as you wish.

![Creating Armature centered](assets/gifs/setup-dynamic-object-armature-creation.gif)

## Binding

Next, we need to bind our model to the bone we created.

With the Shift key held down, select the model and then the armature.

Press `CTRL + P` -> `With Automatic Weights`.

![Model Binding centered](assets/gifs/setup-dynamic-object-binding.gif)

:::tip
In Blender, there are several choices of binding methods. In this case (where there is a single bone), the method via `With Automatic Weights` is appropriate. For cases where there are more bones, you will most likely need manual binding via `Weight Paint` or other methods.
:::

## Bone

Select the bone and go to the `Bone Properties`![Bone Properties svg-icon](../../../static/icons/blender/bone.svg) tab.

We see the [X-Ray Engine: Bone](../../modding-tools/blender/addon-panels/panel-bone.md) section.

![X-Ray Engine: Bone centered](assets/images/x-ray-bone.png)

The desired field is `Shape Type` (where you choose the type of shape (for collision)).

From the whole list, our object is more suitable for the `Cylinder` type. Let's choose it.

Next, click the `Edit Shape` button to check and edit the Shape itself.

:::tip
To see `Bone Shapes`, go to `Object Data Properties`![Object Data Properties svg-icon](../../../static/icons/blender/armature-data.svg). In [X-Ray Engine: Armature](../../modding-tools/blender/addon-panels/panel-armature.md) -> `Display Bone Shapes`.
:::

My model fits quite nicely into the Bone Shape.

![Model Bone Shape centered](assets/images/setup-dynamic-object-bone-shape.png)

Next, choose [Rigid](../../../../glossary#rigid-joint) in `Joint Type`.

## Surface

Navigate to `Material Properties`![Material Properties svg-icon](../../../static/icons/blender/material.svg).

In [X-Ray Engine: Material](../../modding-tools/blender/addon-panels/panel-material.md) you need to choose:

### Engine

Choose Engine Shader for Dynamic Object

### Compiler

### Material

Choose Game Material for Dynamic Object

:::note
Since the object is dynamic, you need to choose the right Engine Shader and [Game Material](../../references/materials/materials-list.md) for Dynamic Objects!
:::

## Finish

Go to `Object Properties`![Object Properties svg-icon](../../../static/icons/blender/object-data.svg).

In [X-Ray Engine: Object](../../modding-tools/blender/addon-panels/panel-object.md) select `Dynamic` or `Progressive Dynamic` in the `Type` list.

This completes the setup of the Dynamic Object. You can safely export it in the model format you need.
