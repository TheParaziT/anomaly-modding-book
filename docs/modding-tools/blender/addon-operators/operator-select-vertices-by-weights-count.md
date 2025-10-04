---
title: Select Vertices by Weights Count Operator
---

# Select Vertices by Weights Count Operator

___

## About

This operator is needed to select vertices that have a certain number of bone weights. It is needed to search for vertices that are bind to `1`, `2`, `3`, `4`, `5`, or more bones. The *.ogf format has a limit on the number of bones that can affect a single vertex. For `SoC` - it is two bones, for `CS`/`CoP` - no more than four bones. During export to \*.ogf, extra weights are discarded. Only the most significant weights are exported. When counting vertex groups, only those groups that are mapped to the exported bones are counted. Other vertex groups are ignored, as they are not used during export. After the operator is run, only those objects with matching vertices will be selected. All matching vertices will be selected in `Edit Mode`. Only those meshes that have the `Armature` modifier and the vertex binding to bones is configured will be checked. Only those bones that have `Exportable` parameter enabled will be used for checking.

## Mode

Specifies which objects to check:

- Active Object - Active object.
- Selected Objects - Selected objects.
- All Objects - All objects.

## Type

Specifies the type of check:

- Less Than - Less than.
- Equal To - Equal to.
- Greater Than - Greater than.
- Not Equal To - Not equal to.

## Number of Weights

This parameter specifies the number with which to compare the number of weights of verticies.

## Sources

[Blender X-Ray Addon Wiki on GitHub](https://github.com/PavelBlend/blender-xray/wiki/Operator-Select-Vertices-by-Weights-Count)