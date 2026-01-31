---
title: shaders_xrlc_xr_cdc
tags:
  - Shaders
  - Modding Tool
draft: false
---

# shaders_xrlc_xr_cdc

___

## Info

import ProgramDescription from '@site/src/components/ProgramDescription';

<ProgramDescription 
  program={{
    name: "shaders_xrlc_xr_cdc",
    version: "0.2",
    developers: ["kd"],
    forum: [
      "https://www.amk-team.ru/forum/topic/11568-universal-acdc-i-drugie-perl-skripty/",
    ],
  }}
  maxAddonsToShow={2}
/>

## About

Compiler, decompiler of archives (shaders_xrlc.xr) with Compile Shaders.

### General

| Key | Description |
|---|---|
| -l \<logfile> | Log file |

### Decompilation mode

| Key | Description |
|---|---|
| -d \<input_file>| Input file (shaders_xrlc.xr) |
| -o \<outdir> |  Folder for saving decompiled Compile Shaders in text form (*.ltx) |

### Compilation mode

| Key | Description |
|---|---|
| -c \<input_dir> | Folder with decompiled Compile Shaders in text form (*.ltx) |
| -o \<outfile> | Output file |
