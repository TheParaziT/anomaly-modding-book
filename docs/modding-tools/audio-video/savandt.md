---
title: Sound Attribute Viewer And Tweaker
description: Utility designed to simplify working with X-Ray Engine sound files in *.ogg format
tags:
  - Audio
  - Modding Tool
preview: /docs/modding-tools/audio-video/assets/images/savandt.png
keywords:
  - ogg
  - Sound
  - Tweaker
  - Viewer
  - Modding Tool
draft: false
---

# Sound Attribute Viewer And Tweaker

___

## Info {#info}

<table>
  <tbody>
    <tr>
      <td>Program Developer</td>
      <td><Authors
          authors={["nat_vac"]}
          size="small"
          showTitle={false}
        /></td>
    </tr>
    <tr>
      <td>Described Version</td>
      <td>1.1.7</td>
    </tr>
    <tr>
      <td>Official Site</td>
      <td>[Official Site](https://www.metacognix.com/files/stlkrsoc/)</td>
    </tr>
  </tbody>
</table>

## About

Utility designed to simplify working with X-Ray Engine sound files in [*.ogg](../../references/file-formats/audio-video/ogg.md) format.

![editor centered](assets/images/savandt.png)

## Features

- Easy viewing of comments in files, and other information
- Quick editing of comments, with automatic CRC-32 checksum generation
- Automatic insertion of comment structure into standard *.ogg files (eliminates Missing ogg-comment and Invalid ogg-comment version errors)
- Small executable file that does not require installation
- No hex editor, X-Ray SDK or checksum fixing required
- Help file included, accessible from the utility

## Functionality

### Buttons

| Button | Description |
|---|---|
| Select Drive/Directory | Selects the path to the directive with the sounds (If you press Ctrl and click on the button the list will reload) |
| Help | Output Help Information |
| About | About |

### Checkboxes

| Checkboxes | Description |
|---|---|
| Rename Originals with *.bak | Make backup when saving |

### Parameters

<table>
  <tbody>
    <tr>
      <td>Parameters</td>
      <td>Description</td>
      <td>Possible parameters</td>
    </tr>
    <tr>
      <td>Header (audio file name)</td>
      <td>
        When clicked, it opens the media player installed on your computer and
        plays only the original *.ogg sound (without affecting the settings)
      </td>
      <td>-</td>
    </tr>
    <tr>
      <td>Sound File Info</td>
      <td>
        Displays some detailed information about the sound itself. These
        characteristics are shown for information and cannot be changed
      </td>
      <td>-</td>
    </tr>
    <tr>
      <td>Game Sound Type</td>
      <td>
        Determines how the sound will be perceived by NPCs and mutants in the
        game
      </td>
      <td>
        undefined
        <br /> anomaly_idle
        <br /> item_dropping
        <br /> item_hiding
        <br /> item_pickup
        <br /> item_taking
        <br /> item_using
        <br /> NPC_attacking
        <br /> NPC_dying
        <br /> NPC_eating
        <br /> NPC_injuring
        <br /> NPC_step
        <br /> NPC_talking
        <br /> object_breaking
        <br /> object_colliding object_exploding
        <br /> weapon_bullet_hit
        <br /> weapon_empty_click
        <br /> weapon_recharging
        <br /> weapon_shooting
        <br /> world_ambient
      </td>
    </tr>
    <tr>
      <td>Base Sound Volume</td>
      <td>Default sound volume in the game at the sound source location</td>
      <td>Range is 0.0 - 2.0</td>
    </tr>
    <tr>
      <td>Minimum Distance</td>
      <td>
        indicates the distance in meters from the sound source at which it can
        still be heard at 100% volume
      </td>
      <td />
    </tr>
    <tr>
      <td>Maximum Distance</td>
      <td>
        Distance in meters from the sound source at which you can no longer hear
        the sound
      </td>
      <td />
    </tr>
    <tr>
      <td>Maximum AI Distance</td>
      <td>
        Distance from the sound source (in meters) at which NPCs can no longer
        hear the sound
      </td>
      <td />
    </tr>
  </tbody>
</table>


