---
title: gamemtl_xr_cdc
tags:
  - Game Material
  - Modding Tool
draft: false
---

# gamemtl_xr_cdc

___

## Info

import ProgramDescription from '@site/src/components/ProgramDescription';

<ProgramDescription 
  program={{
    name: "gamemtl_xr_cdc",
    version: "0.2",
    developers: ["kd"],
    forum: [
      "https://www.amk-team.ru/forum/topic/11568-universal-acdc-i-drugie-perl-skripty/",
    ],
  }}
  maxAddonsToShow={2}
/>

## About

Compiler, decompiler of archives (gamemtl.xr) with Game Materials.

### General

| Key           | Description |
| ------------- | ----------- |
| -l \<logfile> | Log file    |

### Decompilation mode

| Key              | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| -d \<input_file> | Input file (gamemtl.xr)                                      |
| -o \<outdir>     | Folder for saving Game Materials files in text form (\*.ltx) |

### Compilation mode

| Key             | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| -c \<input_dir> | Folder with decompiled Game Materials files in text form (\*.ltx) |
| -o \<outfile>   | Output file                                                       |
