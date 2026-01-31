---
title: Bump Generator
tags:
  - Texture
  - Modding Tool
preview: /docs/modding-tools/textures/assets/images/bump-generator.png
draft: false
---

# Bump Generator

___

## Info

import ProgramDescription from '@site/src/components/ProgramDescription';

<ProgramDescription 
  program={{
    name: "Bump Generator",
    version: "0.1",
    versionUrl: "https://gitlab.com/i-love-kfc/bump-generator/-/releases/%D0%A0%D0%B5%D0%BB%D0%B8%D0%B7",
    developers: ["i_love_kfc"],
    previewImage: "/img/bump-generator.png",
    forum: [
      "https://ap-pro.ru/forums/topic/3740-bump-generator",
    ],
    repository: [
      "https://gitlab.com/i-love-kfc/bump-generator",
    ],
  }}
  maxAddonsToShow={2}
/>

## About

A simple [*_bump.dds](../../references/file-formats/textures/bump.md) and [*_bump#.dds](../../references/file-formats/textures/bump_hash.md) texture generator from normal maps with the ability to use specular maps, also, is capable of generating *_bump#.dds for ready-made "green" \*_bumps.dds.

## Features

- Generates *_bump.dds and \*_bump#.dds textures from normal maps (with the ability to use specular maps)
- Generating *_bump#.dds for ready-made \*_bump.dds
- Supports *.dds and \*.tga texture formats.

## Functionality

| Generate From | Description |
|---|---|
| From bump (For *_bump#.dds) | Generates bump# from the bump map |
| From Normal map | Generates bump from the normal map |
| Read Specular map | Whether to use the Specular Map |
| Bump height | Bump height |

Checkboxes

| Checkboxes | Description |
|---|---|
| SOC Format thm | Generates SoC version *.thm file |
