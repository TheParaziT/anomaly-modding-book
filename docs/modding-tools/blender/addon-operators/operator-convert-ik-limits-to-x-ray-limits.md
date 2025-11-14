---
title: Convert IK Limits to X-Ray Limits Operator
draft: false
---

# Convert IK Limits to X-Ray Limits Operator

___

## About

Converts `IK` limit values from the standard [Properties > Bone > Inverse Kinematics](https://docs.blender.org/manual/en/3.6/animation/armatures/bones/properties/inverse_kinematics.html) panel to the addon's `X-Ray` limits, which are located in the [X-Ray Engine: Bone](../addon-panels/panel-bone.md) panel. The values of `Limit X: Min/Max`, `Limit Y: Min/Max`, `Limit Z: Min/Max` from the `Inverse Kinematics` panel are converted for the `X-Ray` coordinate system and fit into the `Limit X: Min/Max`, `Limit Y: Min/Max`, `Limit Z: Min/Max` parameters from the `X-Ray Engine: Bone` panel. The values are converted for all bones of the active object. This operator is used for obsolete `blend` files that are saved using an addon version earlier than [v0.7.0](https://github.com/PavelBlend/blender-xray/releases/tag/v0.7.0). The operator is required to convert obsolete values. For more information about limits with `IK` and `X-Ray types`, see here: [Use Limits](../addon-panels/panel-armature.md).

___

## Sources

[Blender X-Ray Addon Wiki on GitHub](https://github.com/PavelBlend/blender-xray/wiki/Operator-IK-Limits#%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80-convert-ik-limits-to-x-ray-limits)
