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

<table>
  <tbody>
    <tr>
      <td>Program Developer</td>
      <td>      <Authors
          authors={['kd']}
          size="small"
          showTitle={false}
        /></td>
    </tr>
    <tr>
      <td>Described Version</td>
      <td>0.2</td>
    </tr>
    <tr>
      <td>Discussion Forum</td>
      <td>
        [AMK Forum](https://www.amk-team.ru/forum/topic/11568-universal-acdc-i-drugie-perl-skripty/)
      </td>
    </tr>
  </tbody>
</table>

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
