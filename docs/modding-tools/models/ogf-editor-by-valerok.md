---
title: Modified OGF Editor by ValeroK
tags:
  - 3D Model
  - Modding Tool
preview: /docs/modding-tools/models/assets/images/ogf-editor-by-valerok.png
---

# Modified OGF Editor by ValeroK

___

## Info

<table>
  <tbody>
    <tr>
      <td>Program Developer</td>
      <td><Authors
          authors={['mortany', 'vaierok']}
          size="small"
          showTitle={false}
        /></td>
    </tr>
    <tr>
      <td>Described Version</td>
      <td>[4.1](https://github.com/VaIeroK/OGF-tool/releases/tag/4.1)</td>
    </tr>
    <tr>
      <td>Discussion Forum</td>
      <td>
        [Ap-pro forum topic](https://ap-pro.ru/forums/topic/3549-ogfdmdetailsobj-editor-v41/)
      </td>
    </tr>
    <tr>
      <td>Source Code</td>
      <td>[GitHub](https://github.com/VaIeroK/OGF-tool)</td>
    </tr>
    <tr>
      <td>Documentation</td>
      <td>[DeepWiki](https://deepwiki.com/VaIeroK/XrayExportTool)</td>
    </tr>
  </tbody>
</table>

## About

Tool for working with [*.ogf](../../references/file-formats/models/ogf.md) and [*.dm](../../references/file-formats/models/dm.md) format

![ogf-editor centered](assets/images/ogf-editor-by-valerok.png)

## Features

- Ability to work with all *.ogf parameters
- Ability to work with meshes in *.ogf
- Viewport
- Integration with OGF Viewer and [OMF Editor](../../modding-tools/animations/omf-editor-by-valerok.md)
- Saving *.ogf in [*.object](../../references/file-formats/models/object.md), [*.skl](../../references/file-formats/animations/skl-skls.md), [*.skls](../../references/file-formats/animations/skl-skls.md), [*.bones](../../references/file-formats/models/bones.md) formats
- Hotkeys
- Fix Gunslinger models (models are fixed automatically when you save them)

## Functionality

### Hotkeys

- F4 - Load file
- Ctrl+S - Save file
- F6 - Save as
- F3 - Reload file

### Buttons

- #### File button

| Button | Description |
|---|---|
| Load | Loads the selected *.ogf |
| Save | Save *.ogf |
| Save As | Save as *.ogf |
| Export | Export as *.object \*.bones \*.obj \*.omf \*.skl \*.skls |
| Reload | Reloads the program |
| Exit | Exits the program |

- #### Tools Button

| Button | Description |
|---|---|
| Open in Object Editor | Open  in Object Editor |
| Import OGF Params | Imports parameters of another .ogf with selectable parameters |
| Recalc Normals | Recalculates the normals of the selected mesh |
| Recalc Bounding Box | Recalculates Bounding Box |
| Remove Progressive Meshes | Remove Progressive Meshes |
| Move/Rotate Model | Move/Rotate Model |
| Converter | NPC CoP to SoC NPC SoC to CoP |

- #### OGF Info button

Display information about the loaded OGF

| Field | Description |
|---|---|
| OGF Version | *.ogf file version |
| Model Type | Model type |
| Motions Refs | Motions references |
| Motions | Motions |
| Links | Links |
| Verts | Vertices count |
| Faces | Faces count |

| Field | Description |
|---|---|
| Source File | Source file |
| Converter | Converter |
| Creator | Creator |
| Editor | Editor |
| Export Time | Export time |
| Creation Time | Creation time |
| Modified Time | Modified time |

| Button |
|---|
| Repair timers |

- #### Settings Button

| Field |
|---|
| Image path |
| FS Ltx path |
| Textures path |
| Game Mtl path |
| OMF Editor path |
| Object Editor path |

| Button |
|---|
| Load textures alpha channel in Viewport - slow loading |

- #### Model Format Button

Changes the format of motion references for the model

### Checkboxes

| Field | Description |
|---|---|
| Create Backup | Creates a backup file |

### Sections

- #### Textures

Section with texture and shader path editing. Also here can delete or move meshes of the model (If there is only one mesh, you cannot delete it)

##### Mesh: \[Mesh number]

| Field | Description |
|---|---|
| Texture Path: | Path to texture |
| Shader Name: | Shader name |

- #### User Data

File with userdata

- #### Motion Refs

A field with paths for animation

- #### Motions

Displays animations that are built into the model

If you right-click on this field, then the context menu will pop up where you can:

| Button | Description |
|---|---|
| Edit | Opens the OMF Editor (first, you need to specify the path to it in the settings) |
| Load | Loads selected *.omf files as an embedded movement |
| Delete | Deletes all downloaded animations |

- #### Bone Names

Displays a list of bones and their number

- #### Bone Params

Editing the bone parameter

##### Bone id: \[Bone number]

| Field | Description |
|---|---|
| Bone Name | Bone name |
| Parent Bone | Parent bone |
| Material | Material |
| Mass | Mass |
| Center Of Mass | Center of mass |
| Position | Bone position |
| Rotation | Bone rotation |

- #### LOD

Specifies the path to the LOD model

- #### View port

Viewport
