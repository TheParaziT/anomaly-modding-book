---
title: Configuring VSCode-like Programs to Handle Game Files
---

# Configuring VSCode-like Programs to Handle Game Files

___

## About

Here will talk about setting up VSCode similar programs to work with game files.

- This article is based on [Liner's article](https://ap-pro.ru/forums/topic/3406-nastroyka-skriptov-stalkera-kak-proekt-v-visual-studio-code/) on setting up scripts as projects in VSCode
- In this article the setup will be done in VSCodium.

:::warning
Not all files can be configured because there are no extensions for their viewing, reading (for example preview .dds textures and others). Some files can only be opened with third-party applications!
:::

## Step 1: Installing VSCodium

Just install [VSCodium](https://vscodium.com/)

## Step 2. Configuring extension associations

In the `settings.json` file, in the `"files.associations": {` specify:

```json title="settings.json"
"*.script": "lua",
"*.ps": "hlsl",
"*.cs": "hlsl",
"*.gs": "hlsl",
"*.vs": "hlsl",
"*.s": "lua",
"*.level": "ini",
"*.ltx": "ltx",
"*.seq": "ini",
"*.part": "ini",
"*.part1": "ini"
```

:::info
At the moment these are all the extensions that can be opened in VSCodium
:::

## Step 3: Installing extensions

You need to install the following extensions:

1. [audio-preview by sukumo28](https://marketplace.visualstudio.com/items?itemName=sukumo28.wav-preview) - provides more detailed data about the sound files. Needed for [*.ogg](../references/file-formats/audio-video/ogg.md) files

2. [LTX Support by AziatkaVictor](https://marketplace.visualstudio.com/items?itemName=AziatkaVictor.ltx-support) - adds support for [*.ltx](../references/file-formats/conf-script/ltx.md) files
   - extension can be configured, to do this in his settings need to specify the path to the scripts of the game
   - [More About](../modding-tools/coding/ltx-support.md)

3. Two extensions for Lua. Needed for .script files:
   - [LUA by keyring](https://marketplace.visualstudio.com/items?itemName=keyring.Lua)
   - [LUA by yinfei](https://marketplace.visualstudio.com/items?itemName=yinfei.luahelper)

   - You need a fully unpacked scripts folder to work. You also need to create a workspace for your project. Some files will always give error warnings (e.g. `lua_help` - This can be deleted or added to exceptions in the extension from yinfei)

4. [Open in External App by YuTengjing](https://marketplace.visualstudio.com/items?itemName=YuTengjing.open-in-external-app) - ability to open the file in other applications. Needed for [*.ogf](../references/file-formats/models/ogf.md), [*.object](../references/file-formats/models/object.md), [.dm](../references/file-formats/models/dm.md), [*.omf](../references/file-formats/animations/omf.md), [*.dds](../references/file-formats/textures/dds.md), [.thm](../references/file-formats/textures/thm.md), [*.ogm](../references/file-formats/audio-video/ogm.md) files
   - The extension can be configured by writing in `settings.json` in the `"openInExternalApp.openMapper": [` needed programs. Example:

    ```json title="settings.json"
    "openInExternalApp.openMapper": [

        // 3D models (ogf, dm, object)
            {
                "extensionName": "ogf",
                "apps": "D:\\Needed\\Modding Tools\\OGF.Editor\\OGF tool.exe"
            },
            {
                "extensionName": "object",
                "apps": "D:\\Needed\\Modding Tools\\Object.Editor.4.35\\Object tool.exe"
            },
            {
                "extensionName": "dm",
                "apps": "D:\\Needed\\Modding Tools\\OGF.Editor\\OGF tool.exe"
            },
        // Textures (thm, dds)
            {
                "extensionName": "thm",
                "apps": "D:\\Needed\\Modding Tools\\THM_Editor_by_ValeroK\\THM Editor.exe"
            },
            {
                "extensionName": "dds",
                "apps": "C:\\Program Files\\paint.net\\paintdotnet.exe"
            },

        // Video
            {
                "extensionName": "ogm",
                "apps": "C:\\Program Files\\VideoLAN\\VLC\\vlc.exe"
            },
        // Animations
            {
                "extensionName": "omf",
                "apps": "D:\\Needed\\Modding Tools\\OMF.Editor.1.2\\OMF_Editor.exe"
            },
        ],
    ```

5. HLSL support and preview for shaders:
   - [Shader languages support for VS Code by slevesque](https://marketplace.visualstudio.com/items?itemName=slevesque.shader)
   - [HLSL preview by A2K](https://marketplace.visualstudio.com/items?itemName=A2K.hlsl-preview)

6. [TGA Image Preview by lunarwtr](https://marketplace.visualstudio.com/items?itemName=lunarwtr.tga-image-preview) - Preview *.tga files
