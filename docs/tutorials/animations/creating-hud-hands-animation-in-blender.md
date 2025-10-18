---
title: Creating HUD Hands Animation in Blender
tags: [Blender, 3D Animation]
references:
  - skl-skls
  - omf
  - anm
---

# Creating HUD Hands Animation in Blender

___

<Authors
  authors={["saloeater", "theparazit"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## Need to know {#need-to-know}

- How working in Blender and creating animations
- Skeleton animations ([*.skl](../../references/file-formats/animations/skl-skls.md), [*.skls](../../references/file-formats/animations/skl-skls.md), [*.omf](../../references/file-formats/animations/omf.md))
- Camera animations ([*.anm](../../references/file-formats/animations/anm.md), [*.omf](../../references/file-formats/animations/omf.md))

## Related Videos

<div className="video-grid">
  <YouTubeVideo id="HwTYYH5zLjo"/>
  <YouTubeVideo id="E_wMIdK0Ls0"/>
</div>

## Beginning

- Download the [Blender](https://www.blender.org/download/) and install it.
- Download any set of hands from [discord](https://discord.com/channels/456765861953536020/883097205710389288/1071072858358431804)
- Download the [X-Ray Tools for Blender](https://github.com/PavelBlend/blender-xray/releases)
- Install the X-Ray Tools for Blender by going to `Edit` > `Preferences` > `Add-ons` > top left > `Install from disk`
- Install [OMF Editor](https://github.com/VaIeroK/Omf-Editor)

## Creating an animation

- Open your hands .blend file in Blender
- To start you need to have opened `Dope Sheet` editor and `Action Editor` in it
- If you need to use camera motion, follow the [Applying camera motion](#applying-camera-motion) section first
- Make an animation, you can find any other Blender tutorials on how to animate
- In the right side of the `Dope Sheet` editor, select `X-Ray` > `Export .skl`
  - Right panel can be hidden, you can show it by pressing `N` in that editor or select an arrow in the most right

### Applying camera motion

- In `3d Viewport` > `X-Ray` > `Add` > `Add X-Ray Camera` select `HUD SoC/CS`
- Select the camera in the `Outliner` editor
- With `File` > `Import` > `X-Ray Animation Path` import any .anm from `gamedata\anims\camera_effects`
- In the `Dope Sheet` editor select the imported camera animation
- Make sure the camera movement is playing
  - I noticed that when you are importing camera animation without selecting the camera, it will not work properly, so make sure you select the camera before importing (lol)
- Expand camera object `xray-camera-root` in the `Outliner` editor
- Select the `xray-camera` object
- In `Properties` editor go to `Data` > `Lens`
- Adjust FoV to your game settings (65 for the Gamma)

## Creating a *.omf file

### Preparing the scene

- Create new Blender project
- Import through `File` > `Import` > `X-Ray Game Object` any hands .ogf file, for example, any from `gamedata\meshes\anomaly_weapons\hands`
- Select the imported object
- In `Properties` editor go to `Data` > `Bone Collections` > `Add Bone Collection`
- In `3d Viewport` editor go to the `Pose Mode`
- Select all the bones in the `3d Viewport` editor
- In the `Bone Collections` select the newly created bone collection and click on `Assign Selected Bones`

### Exporting the *.omf file

- Import your .skl file(s) through `File` > `Import` > `X-Ray Skeletal Animation`
- In the `Dope Sheet` editor select and play your animation and make sure it works
- Export the animation through `Export` > `X-Ray Game Motion`
- Both SoC and CS/CoP formats worked for me and I haven't seen someone using `High Quality Motions` checkbox, so you can choose any of formats
- Select `Export Mode`
  - Overwrite - obvious
  - Add - adds the animation to the existing .omf file
    - This also can be done via `3d Viewport` > `X-Ray` > `OMF Editor` > `Merge OMF`

### Managing the *.omf file

- Open the OMF Editor
- Open your .omf file
- Refer to the [OMF Editor documentation](../../modding-tools/animations/omf-editor-by-valerok.md#about) for more information on how to use it
  - Usually you want to control [SDK Flags](../../modding-tools/animations/omf-editor-by-valerok.md#animation-options) for each specific animation

Follow [Script Animation Guide](../scripting/script-animations.md#motions) to learn how to use your animation in the game
