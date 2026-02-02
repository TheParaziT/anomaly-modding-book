---
title: shaders_xr_cdc
tags:
  - Shaders
  - Modding Tool
draft: false
---

# shaders_xr_cdc

___

## Info

import ProgramDescription from '@site/src/components/ProgramDescription';

<ProgramDescription 
  program={{
    name: "shaders_xr_cdc",
    version: "0.2",
    developers: ["kd"],
    forum: [
      "https://www.amk-team.ru/forum/topic/11568-universal-acdc-i-drugie-perl-skripty/",
    ],
  }}
  maxAddonsToShow={2}
/>

## About

Compiler, decompiler of archives (shaders.xr) with Engine Shaders.

### General

| Key | Description |
|---|---|
| -m \<ltx or bin> | Decompilation mode.bin - decompilation into binary files. ltx - full decompilation |
| -l \<logfile> | Log file |

### Decompilation mode

| Key | Description |
|---|---|
| -d \<input_file>| Input file (shaders.xr) |
| -o \<outdir> |  Folder for saving decompiled Engine Shaders |

### Compilation mode

| Key | Description |
|---|---|
| -c \<input_dir> | Folder with decompiled Engine Shaders |
| -o \<outfile> | Output file |
