---
title: Copy X-Ray Transforms Operators
draft: false
---

# Copy X-Ray Transforms Operators

___

## About

Copies transformations for the weapon at rest and for aiming to the clipboard. The values are calculated for the active object based on the Position and Orientation parameters of this panel. Transformations are written to the clipboard in text form. The text has the syntax of [*.ltx](../../../references/file-formats/conf-script/ltx.md) configs (similar to [*.ini](https://en.wikipedia.org/wiki/INI_file)). First, the transformations for the hud model are written in the format of transformations for the resting state in the form of position and orientation parameters. Then the same transformations are written, but in the format of transformations for aiming in the form of parameters zoom_offset, zoom_rotate_x, zoom_rotate_y. These parameters should be written to the [*.ltx](../../../references/file-formats/conf-script/ltx.md)-config of the weapon.

___

## Sources

[Blender X-Ray Addon Wiki on GitHub](https://github.com/PavelBlend/blender-xray/wiki/Panel-Transforms#%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80-copy-x-ray-transforms)
