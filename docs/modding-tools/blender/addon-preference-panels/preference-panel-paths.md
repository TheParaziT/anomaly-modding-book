---
title: Paths
---

# Paths

___

## About

This settings category contains paths to files and folders from the game/X-Ray SDK.

___

## Mode

- `Base` - Basic mode that allows you to specify files and folders from the same game/mod/X-Ray SDK
- `Advanced` - Advanced mode that allows you to specify files and folders from multiple games/mods/X-Ray SDKs

### Base

These settings specify paths to external files or directories of the game or  `X-Ray SDK`. It is possible to set paths automatically based on a single parameter. For example, if you specify  `gamedata` folder in `Gamedata Folder` parameter then empty paths (except `fs.ltx` File) will be filled automatically. Automatically filled paths have a button with a spanner icon on the right. To change the path manually, you must click this button. The spanner button will disappear and the button with the folder icon will be displayed instead. You can then open the file browser using the button with the folder icon and select the desired folder or file in the browser. Or you can change the path in the text field by typing it from the keyboard. If the path is set manually, its value will not be changed automatically by the addon. In order to return the automatic indication of the path you need to clear the path input field. Automatically addon sets such values:

| Parameter | Description |
|---|---|
| FS Ltx File | - |
| Gamedata Folder | . |
| Textures Folder | .textures\ |
| Meshes Folder | .meshes\ |
| Levels Folder | .levels\ |
| Objects Folder | ..rawdata\objects |
| Engine Shaders File | .shaders.xr |
| Compile Shaders File | .shaders_xrlc.xr |
| Game Materials File | .gamemtl.xr |

#### FS Ltx File

Path to `fs.ltx` file. You can also specify `fsgame.ltx` file. This file is located in `X-Ray SDK` and stores paths to directories. The addon uses the `fs.ltx` file only to automatically set all other paths. Only these variables from the file are used: `$fs_root$`/`$sdk_root$`, `$game_data$`, `$game_textures$`, `$game_meshes$`, `$game_levels$`, `$objects$`. The `gamemtl.xr,` `shaders.xr`, `shaders_xrlc.xr` files are searched for in the directory that is specified in `$game_data$`. If the paths are already configured, it is not necessary to specify `FS Ltx File`. This parameter is necessary for correct automatic paths setting, if `fs.ltx` file was edited and `X-Ray SDK` uses paths that differ from `gamedata`, `gamedata\textures`, `gamedata\meshes`, `gamedata\levels`, `rawdata\objects`.

#### Gamedata Folder

Path, which must refer to the `gamedata` folder (or to the folder that is specified in `$game_data$` if `fs.ltx` has been modified). This path is only used to automatically set the parameters below. The paths are automatically set by adding `Gamedata Folder` and pre-set values. The values are set as follows: `Textures Folder` - `textures`, `Meshes Folder` - `meshes`, `Levels Folder` - `levels`, `Game Materials File` - `gamemtl.xr`, `Engine Shaders File` - `shaders.xr`, `Compile Shaders File` - `shaders_xrlc.xr`, `Objects Folder` - `..rawdata\objects`, where `..` at the beginning of `Objects Folder` means to go one folder back in the path. That is, the path to `Objects Folder` will look like this: `c:\programs\xray_sdk\rawdata\objects\`, if `Gamedata Folder` has the following value: `c:\programs\xray_sdk\gamedata\`.

#### Textures Folder

The path that should refer to `$game_textures$`. Usually this is the `gamedata\textures` folder, which contains textures. Only `*.dds` format is supported for loading. This path is only used by operators that import/export formats that support the use of textures. When importing, the addon searches for `*.dds` textures in this path and loads them into `Blender`.

#### Meshes Folder

Path to the folder with 3D game objects and animations. Usually found in `X-Ray SDK` in `gamedata\meshes` folder. It is used to calculate Export Path for imported `*.ogf` files.

#### Levels Folder

Path to the folder with game levels. Usually located in `X-Ray SDK` in `gamedata\levels` folder. Used when exporting game levels to calculate relative paths to `*.dds` textures, if they are located in the folder with level in `gamedata\levels`, not `gamedata\textures`. Usually lighting maps are stored in the level folder.

#### Objects Folder

Path to the folder with the source 3D objects and animations. Usually located in `X-Ray SDK` in the folder `rawdata\objects`. From this folder addon can read only `*.object` and `*.skls` files. This folder is used by `*.object`, `*.level`, `*.part`, `*.group` importers/exporters. Also this parameter is used by some operators, for example, `Motions Browser` (if you run it from `Motion Refs` scroll, `Load Active Motion Refs mode`).

#### Engine Shader File

Path to `shaders.xr` file. Usually stored in `gamedata\shaders.xr`. This file contains descriptions of shader settings. Responsible for surface appearance in `X-Ray SDK` and game. If this path refers to the `shaders.xr` file, then the `Shader` list in the material options will be filled with shader names from this file and you can specify any engine shader name from this list. If this path does not refer to the `shaders.xr` file, then the Shader list in the materials will be empty. Only shader names are read from the `shaders.xr` file.

#### Compile Shader File

Path to `shaders_xrlc.xr` file. Usually stored in `gamedata\shaders_xrlc.xr`. This file contains descriptions of settings used by the level geometry compiler (`xrLC.exe`). It specifies to the compiler the properties of the final game level geometry. The source geometry, depending on the compiler shader, may have no visible or collision tangible geometry, have a different way of storing lighting, etc. If this path references the `shaders_xrlc.xr` file, the Compile list at materials will be populated with shader names from that file and you can specify any compiler shader name from the list. Only shader names are read from the `shaders_xrlc.xr` file.

#### Game Materials File

Path to `gamemtl.xr` file. Usually stored in `gamedata\gamemtl.xr`. This file stores surface materials. In `X-Ray Engine`, a material is a physical property of the surface for collision, and does not affect the visual representation (not to be confused with materials in `Blender`, which affect the appearance). The `X-Ray Engine` uses shaders to change the appearance of the surface. The material affects the sounds of footsteps, wallmark textures from gunshots, friction, particle effects when bullets hit, the ability to get cast shadows from dynamic objects, etc. If this path refers to `gamemtl.xr` file, then the list of `GameMtl` parameter for materials and bones will be filled with material names from `gamemtl.xr` file and any material name can be specified from this list. If this path does not reference the `gamemtl.xr` file, then the `GameMtl` list of materials and dice will be empty. Only names, text descriptions and integer identifiers of materials are read from the `gamemtl.xr` file.

___

### Advanced

These parameters allow you to specify two paths for each parameter. The first path is the path to the folder or file of the platform, for example, `SoC`, `CS`, `CoP`. The second path specifies folders and files for the mod. For example, if you need to configure the addon to import files from `Arsenal Mod` for `SoC`, then as a platform should specify the paths from the unpacked archives `SoC`, and as a mod to specify the paths to the `gamedata` folder `Arsenal Mod`. This will allow you to search for textures from two folders at once `SoC` and `Arsenal Mod`. Paths from the mod have a higher priority, as in the game.

#### Used Config

The paths config to use. The list of configs that can be selected can be found below under `Paths Configs`.

#### Paths Configs

A list of path configs. Each config has parameters at the bottom, under the `Active Paths Config` label. To change these parameters, you must highlight the desired config in the list. Two parameters are available.

- `Platform` - Preset that specifies the paths to the platform files and folders.
- `Mod` - preset that specifies the paths to the mod's files and folders.

#### Paths Presets

A list of path presets. The items in this list can be selected from the `Platform` and `Mod` settings in the `Paths Configs` section. The settings are identical to those in Base mode. There is also an additional `Format Version` parameter.

#### Format Version

Specifies the version of the `SoC` or `CS/CoP` platform. This parameter specifies the default value for the `Format Version` parameter of the import/export operators.

___

## Sources

[Blender X-Ray Addon Wiki on GitHub](https://github.com/PavelBlend/blender-xray/wiki/Preferences-Paths)
