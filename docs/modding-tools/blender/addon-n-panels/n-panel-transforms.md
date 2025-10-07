---
title: Transforms
preview: /docs/modding-tools/blender/addon-n-panels/assets/images/n-panel-transforms.png
---

# Transforms

___

![Alt text centered](assets/images/n-panel-transforms.png)

## About

This panel contains parameters and operators, which are necessary to customize the position and rotation of [*_hud models](../../../../glossary#hud) of weapons in the game. It is also possible to customize the position and rotation for aiming. To properly customize the transformations, you need to use the `X-Ray` Camera, which can be added using the [Add X-Ray Camera](../addon-operators/operator-add-x-ray-camera.md) operator. To customize the weapon transformations, you need to move and rotate the `root` object of the weapon `hud`-model, and to customize the transformations for aiming, you need to add a parent object to the `root` object of the `hud`-model, and move and rotate this object (the weapon will have a double displacement and rotation due to its transformations and transformations of the parent)

## Position Parameter

Position of the object in `X-Ray` engine format, which is used for `hud`-models of weapons. When copying positions from configs, it is necessary not to change the order of axes and not to change the sign of values (write the same as in the weapon config in the [hud-section](../../../references/configs/items/weapons/weapon-hud.md))

## Orientation Parameter

Similar to the previous parameter, but for rotation

## Operators

- [Update Blender Transforms](../addon-operators/operator-update-x-ray-transforms.md)
- [Update X-Ray Transforms](../addon-operators/operator-update-x-ray-transforms.md)
- [Copy X-Ray Transforms](../addon-operators/operator-copy-x-ray-transforms.md)

___

## Sources

[Blender X-Ray Addon Wiki on GitHub](https://github.com/PavelBlend/blender-xray/wiki/Panel-Transforms)
