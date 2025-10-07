---
title: Creating Game Material in SDK
tags: [SDK, Game Material, Shader]
description: Tutorial for creating game materials in SDK
---

# Creating Game Material in SDK

___

## About

The Game Material defines the physical features of the surface. All material parameters can be viewed in [SDK Shader Editor](../../modding-tools/sdk/shader-editor/README.md). For example, let's create three different materials.

## Creating Static Object material

For this example, I'll create the material of a thick concrete wall.

Go into the Shader Editor.

Click `Create` -> Select `Static`. This will create a new material for the [Static Object](../../../../glossary#static-object).

Now we can rename the material. Right click on the material -> `Rename`.

Next, we need to determine the material parameters we need. I chose these ([parameter values in the Shader Editor](../../modding-tools/sdk/shader-editor/se-item-properties.md)):

- Dynamic - False
- Passable - False
- Bounceable - False
- Skidmark - False
- Bloodmark - True
- Climable - False
- Liquid - False
- Suppress Shadows - False
- Suppress Wallmarks - False
- Actor Obstacle - True
- Bullet No Ricoshet - False
- Friction - 1.000
- Damping - 1.000
- Spring - 1.000
- Bounce start vel - 0.00
- Bouncing - 0.100
- Bounce Damage - 1.0
- Injurius - 0.00
- Shooting - 0.00
- Shooting MP - 0.00
- Transparency - 0.00
- Sound occlusion - 0.00
- Flotation - 1.00
- Density Factor - 0.00

## Creating breakable material

A breakable material must be created for a [Dynamic Object](../../../../glossary#dynamic-object). To create a Breakable object, see this tutorial.

Click `Create` -> Select `Dynamic`.

To create a breakable material, you only need to enable one `Breakable` flag:

- Dynamic - True
- Breakable - True
- Passable - False
- Bounceable - False
- Skidmark - False
- Bloodmark - True
- Climable - False
- Liquid - False
- Suppress Shadows - False
- Suppress Wallmarks - False
- Actor Obstacle - False
- Bullet No Ricoshet - False
- Friction - 1.000
- Damping - 1.000
- Spring - 1.000
- Bounce start vel - 0.00
- Bouncing - 0.100
- Bounce Damage - 1.0
- Injurius - 0.00
- Shooting - 0.00
- Shooting MP - 0.00
- Transparency - 0.00
- Sound occlusion - 0.00
- Flotation - 1.00
- Density Factor - 0.00

## Creating climbable material

To create a climbable material, you only need to enable one `Climable` flag.

- Dynamic - False
- Passable - False
- Bounceable - False
- Skidmark - False
- Bloodmark - True
- Climable - True
- Liquid - False
- Suppress Shadows - False
- Suppress Wallmarks - False
- Actor Obstacle - False
- Bullet No Ricoshet - False
- Friction - 1.000
- Damping - 1.000
- Spring - 1.000
- Bounce start vel - 0.00
- Bouncing - 0.100
- Bounce Damage - 1.0
- Injurius - 0.00
- Shooting - 0.00
- Shooting MP - 0.00
- Transparency - 0.00
- Sound occlusion - 0.00
- Flotation - 1.00
- Density Factor - 0.00
