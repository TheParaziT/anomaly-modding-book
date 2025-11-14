---
title: Convert Limits to Constraints Operator
draft: false
---

# Convert Limits to Constraints Operator

___

## About

For bones with `Joint`, `Wheel`, `Slider` types it creates `Limit Rotations` constraints with the name `!-XRAY-JOINT-LIMITS`, the limits of which coincide with `X-Ray` limits of bones. No Constraints are created for bones with types `None`, `Rigid`, `Cloth`, `Custom`. This operator takes into account the [Use Limits](../addon-panels/panel-armature.md) parameter of the armature.

### Mode Parameter

Specifies which bones to remove the constraints from

- `Active Bone` - At Active Bone
- `Selected Bones` - At Selected Bones
- `All Bones` - All Bones has an Armature

___

## Sources

[Blender X-Ray Addon Wiki on GitHub](https://github.com/PavelBlend/blender-xray/wiki/Operator-Convert-Limits-to-Constraints#%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80-Convert-Limits-to-Constraints)
