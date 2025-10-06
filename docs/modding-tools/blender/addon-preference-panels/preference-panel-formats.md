---
title: Formats
preview: /docs/modding-tools/blender/addon-preference-panels/assets/images/Formats.png
---

# Formats

___

![formats centered](assets/images/Formats.png)

## About

This page describes the addon settings in the `Formats` category.

___

In this category you can switch off support for import/export of formats. If format import/export is turned off, it will not appear in the import/export menu. Also import/export operators are removed from the `Import/Export` pane in the `3D Viewport` window in the `N-panel`, in the `X-Ray tab`. And the panels and parameters that are used by this format will not be displayed in the interface. Different formats affect the display of different panels and parameters. The display of some panels depends on several formats. This feature is necessary to simplify the interface, so that unnecessary parameters and import/export operators, which are not used by the user, are not displayed. To hide panels, you should disable such formats:

### X-Ray Engine: Action

- [*.object](../../../references/file-formats/models/object.md)
- [*.skl](../../../references/file-formats/animations/skl-skls.md)
- [*.skls](../../../references/file-formats/animations/skl-skls.md)
- [*.ogf](../../../references/file-formats/models/ogf.md)
- [*.omf](../../../references/file-formats/animations/omf.md)
- [*.anm](../../../references/file-formats/animations/anm.md)

### X-Ray Engine: Armature

- [*.object](../../../references/file-formats/models/object.md)
- [*.skl](../../../references/file-formats/animations/skl-skls.md)
- [*.skls](../../../references/file-formats/animations/skl-skls.md)
- [*.ogf](../../../references/file-formats/models/ogf.md)
- [*.omf](../../../references/file-formats/animations/omf.md)
- [*.bones](../../../references/file-formats/models/bones.md)

### X-Ray Engine: Bone

- [*.object](../../../references/file-formats/models/object.md)
- [*.skl](../../../references/file-formats/animations/skl-skls.md)
- [*.skls](../../../references/file-formats/animations/skl-skls.md)
- [*.ogf](../../../references/file-formats/models/ogf.md)
- [*.omf](../../../references/file-formats/animations/omf.md)
- [*.bones](../../../references/file-formats/models/bones.md)

### X-Ray Engine: Material

`Shader`, `Compile`, `Material`, `Two Sided` parameters are always displayed and cannot be disabled. To hide parameters from `Level Visual` and `Level CForm` blocks, it is necessary to disable these formats:

- [level](../../../references/file-formats/game-levels/level.md)

### X-Ray Engine: Mesh

- [*.object](../../../references/file-formats/models/object.md)
- [*.level](../../../references/file-formats/sdk/dot-level.md)
- [*.part](../../../references/file-formats/game-levels/part.md)
- [*.group](../../../references/file-formats/models/group.md)

### X-Ray Engine: Object

To hide parameters from the `Object` block, you need to disable such formats:

- [*.object](../../../references/file-formats/models/object.md)
- [*.skl](../../../references/file-formats/animations/skl-skls.md)
- [*.skls](../../../references/file-formats/animations/skl-skls.md)
- [*.ogf](../../../references/file-formats/models/ogf.md)
- [*.omf](../../../references/file-formats/animations/omf.md)
- [*.level](../../../references/file-formats/sdk/dot-level.md)
- [*.part](../../../references/file-formats/game-levels/part.md)
- [*.group](../../../references/file-formats/models/group.md)

To hide the `Details` block:

- [*.dm](../../../references/file-formats/models/dm.md)
- [*.details](../../../references/file-formats/game-levels/details.md)

To hide the `Level` block:

- [level](../../../references/file-formats/game-levels/level.md)

___

## Sources

[Blender X-Ray Addon Wiki on GitHub](https://github.com/PavelBlend/blender-xray/wiki/Preferences-Formats)
