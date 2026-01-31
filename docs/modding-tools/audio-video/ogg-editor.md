---
title: OGG Editor
description: Utility designed to simplify working with X-Ray Engine sound files in *.ogg format
tags:
  - Audio
  - Modding Tool
preview: /docs/modding-tools/audio-video/assets/images/ogg-editor.png
draft: false
---

# OGG Editor

___

## Info

import ProgramDescription from '@site/src/components/ProgramDescription';

<ProgramDescription 
  program={{
    name: "OGG Editor",
    version: "2.0",
    developers: ["sin!"],
    previewImage: "/img/ogg-editor.png",
    download: [
      "https://disk.yandex.ru/d/Dcyo0Nt3A3b5g",
    ],
  }}
  maxAddonsToShow={2}
/>

## About

Utility for quickly view and edit audio comments in [*.ogg](../../references/file-formats/audio-video/ogg.md) files already converted through the SDK without having to open the SDK.

## Functionality

### Buttons

| Button | Description |
|---|---|
| Load |  |
| Update |  |

### Parameters

| Parameters | Description | Possible parameters |
|---|---|---|
| Min Dist | indicates the distance in meters from the sound source at which it can still be heard at 100% volume |  |
| Max Dist | Distance in meters from the sound source at which you can no longer hear the sound |  |
| Maxm AI Dist | Distance from the sound source (in meters) at which NPCs can no longer hear the sound |  |
| Base Vol | Default sound volume in the game at the sound source location | Range is 0.0 - 2.0 |
| Game Type | Determines how the sound will be perceived by NPCs and mutants in the game | undefined. anomaly_idle. item_dropping. item_hiding. item_pickup. item_taking. item_using. NPC_attacking. NPC_dying. NPC_eating. NPC_injuring. NPC_step. NPC_talking. object_breaking. object_colliding object_exploding. weapon_bullet_hit. weapon_empty_click. weapon_recharging. weapon_shooting. world_ambient |
