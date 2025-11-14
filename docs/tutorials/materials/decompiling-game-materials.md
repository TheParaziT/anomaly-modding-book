---
title: Decompiling Game Materials
tags:
    - Decompilation
    - Game Material
    - Shader
draft: false
---

# Decompiling Game Materials

___

## About

In some cases it is necessary to decompile the contents of gamemtl.xr.

:::warning
This method of decompilation is considered obsolete. All editing of Game Materials should be done through [SDK Shader Editor](../../modding-tools/sdk/shader-editor/README.md), as there is a risk of corrupting the game archive.
:::

## Preparing and installing ActivePerl

Install ActivePerl version no lower than 5 and no higher than 5.24.

Next, download [stkutils](https://disk.yandex.ru/d/nnjntzYZQv8sD) and put it in the `\Perl\lib` folder.

## Decompilation

Download and unzip `gamemtl_xr_cdc` to a convenient place.

Put the `gamemtl.xr` file we need into the unzipped folder.

Then we can run already ready *.bat files for compilation, decompilation or work through the command line ([List of commands here](../../modding-tools/achive-compilers-decompilers/gamemtl-xr-cdc.md))

As a result, we should have a folder with decompiled Game Materials in [*.ltx](../../references/file-formats/conf-script/ltx.md) format.
