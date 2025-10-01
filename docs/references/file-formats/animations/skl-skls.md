# *.skl | \*.skls

___

## About

These files store skeleton animations. The format for storing animations in *.skl/\*.skls is similar to the format of animations embedded in [*.object](../models/object.md) files. Animations are stored in uncompressed form. Bone motion data are stored lossless when exported from a 3D editor. These formats are designed for X-Ray SDK. They are used as source files that are compiled into compressed formats for the game.

___

## Technical information

- Animations are stored as 3 animation curves for position and 3 curves for rotation in [Euler angles](https://en.wikipedia.org/wiki/Euler_angles) with ZXY axis order
- A *.skls file can store one or more animations
- A *.skl file can store only one animation
- Each animation has [game parameters](../../../modding-tools/animations/omf-editor-by-valerok.md#animation-parameters).
- Skeletal animations do not support Scale keys

### Interpolation types

- [Stepped](https://help.autodesk.com/view/MOBPRO/2024/ENU/?guid=GUID-F263EE8F-70A4-4941-BD31-410C08EC101A)
- [Linear](https://en.wikipedia.org/wiki/Linear_interpolation)
- [Bezier 1D](https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Linear_B%C3%A9zier_curves)
- [Bezier 2D](https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Quadratic_B%C3%A9zier_curves)
- [Hermite](https://en.wikipedia.org/wiki/Hermite_interpolation)
- [TCB](https://wiki.synfig.org/TCB)

___

## Programs editing this file

- [Blender (X-Ray Addon)](../../../modding-tools/blender/README.mdx)
- [SDK](../../../modding-tools/sdk/README.md)

___

## Sources

[Source](https://github.com/PavelBlend/blender-xray/wiki/Formats#skl--skls)
