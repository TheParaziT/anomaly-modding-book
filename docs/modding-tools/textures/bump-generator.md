---
title: Bump Generator
tags: [Texture, Modding Tool]
---

# Bump Generator

___

## Info

<table>
  <tbody>
    <tr>
      <td>Program Developer</td>
      <td><Authors
          authors={['i_love_kfc']}
          size="small"
          showTitle={false}
        /></td>
    </tr>
    <tr>
      <td>Described Version</td>
      <td>
        [0.1](https://gitlab.com/i-love-kfc/bump-generator/-/releases/%D0%A0%D0%B5%D0%BB%D0%B8%D0%B7)
      </td>
    </tr>
    <tr>
      <td>Discussion Forum</td>
      <td>
        [Ap-pro forum topic](https://ap-pro.ru/forums/topic/3740-bump-generator)
      </td>
    </tr>
  </tbody>
</table>

___

## About

A simple [*_bump.dds](../../references/file-formats/textures/bump.md) and [*_bump#.dds](../../references/file-formats/textures/bump_hash.md) texture generator from normal maps with the ability to use specular maps, also, is capable of generating *_bump#.dds for ready-made "green" \*_bumps.dds.

![bump-generator centered](assets/images/bump-generator.png)

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

___

## Sources

[Source Code](https://gitlab.com/i-love-kfc/bump-generator)
