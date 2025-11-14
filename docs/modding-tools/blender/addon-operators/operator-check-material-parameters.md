---
title: Check Material Parameters Operator
draft: false
---

# Check Material Parameters Operator

___

## About

This operator checks xray-parameters of materials: Engine Shader, Compile Shader, Game Material. Sometimes files from mods or builds have engine shaders, compile shaders and game materials that are not in SoC, CS or CoP, because of which the game or compilation will crash. When checking shaders and materials used [*.xr](../../../references/file-formats/archives-resource-packs/xr.md) files that are specified in the addon settings (shaders.xr, shaders_xrlc.xr, gamemtl.xr). This operator looks for those problematic materials that have missing xray-parameters in the \*.xr files. After the operator runs, a log text file will be created with the following content:

```python
Incorrect Materials:

    Material: "Material":
        Compile Shader: "456"

    Material: "Material.001":
        Game Material: "789"

    Material: "Material.002":
        Engine Shader: "123"
```

## Modes

Specifies which materials to check:

- `Active Material` - For active material of the active object.
- `Active Object` - For active object.
- `Selected Objects` - For selected objects.
- `All Objects` - For all objects.
- `All Materials` - For all materials.

## Sources

[Blender X-Ray Addon Wiki on GitHub](https://github.com/PavelBlend/blender-xray/wiki/Operator-Check-Material-Parameters)
