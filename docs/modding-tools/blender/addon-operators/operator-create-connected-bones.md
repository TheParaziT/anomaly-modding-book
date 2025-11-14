---
title: Create Connected Bones Operator
draft: false
---

# Create Connected Bones Operator

___

## About

This operator is creating two new armatures:

### Connected Armature

Based on the active armature, creates a new armature with bones connected in a chain. The head of the bone remains at the original position, while the tail is moved to the beginning of the child bone (if there is only one child bone) or to the geometric center of all child bones (if there are many). The parent bone relationship is set to `Keep Offset`, instead of `Connected`, even though the tail of the bone matches the head of the daughter bone. The created armature object has the suffix `connected`. The number and hierarchy of bones is different from the original armature. All bones are stored on the first and last layers. The first layer is used for animation. The bones of the original armature are bound to the created armature using the `Copy Transforms` constraints, which is similar to binding bones using the Link Bones operator. They can be unlinked using the Unlink Bones operator. Or you can bind them again using Link Bones. The created armature is used to create animations, as chained bones are easier to customize and animate. The source armature needs to be used for export. To do this, you need to add all animations from the `connected` armature to the `Motions` list and specify the `connected` armature in the Dependency parameter. During export, you should select the source armature. `Connected`-armature does not need to be selected, because it is auxiliary and is used only inside the blender to create animations.

### Weight Armature

In addition to the `connected` armature, a `weight` armature is created, which has the same names, number and hierarchy of bones as the original one. This armature can be used in `Weight Paint` mode to change the weights of vertices. And automatic snapping works better for this armature (`Object` > `Parent` > `With Automatic Weights`), because the dimensions of the bones coincide with the dimensions of the vertices that are bound to this bone. X-Ray dice shapes (`Box`, `Cylinder` or `Sphere`) are adapted to the new dice transformations. This allows the game to replace the original armature with a `weight` armature if the object does not use animations. If there are animations, they will need to be adapted to the new bones.

___

## Sources

[Blender X-Ray Addon Wiki on GitHub](https://github.com/PavelBlend/blender-xray/wiki/Operator-Create-Connected-Bones)
