---
tags:
    - LTX
description: Comprehensive guide for creating and managing quests and tasks in the game
title: Outfits/Weapon Stats Editor
preview: /docs/modding-tools/in-game-editors/assets/images/outfits-stats-editor.png
draft: false
---

# Outfits/Weapon Stats Editor

___

## About

Allows you to edit outfit and weapon parameters

![outfits-stats-editor centered](assets/images/outfits-stats-editor.png)

![weapon-stats-editor centered](assets/images/weapon-stats-editor.png)

:::warning

- Items configs must be unpacked before working with the editor, they must be in (gamedata/configs/items)
- Don't forget to make a backup of the configs for reference.

:::

### Key binds

- `Arrow keys` - parameters navigation.
- `Numpad 8/2` - increase/reduce selected value.
- `Numpad 9/3` - increase/reduce all values of selected parameter.
- `LShift (hold)` - x10 value step size / jump 2 parameters.
- `LAlt (hold)` - x50 value step size / jump 3 parameters.
- `Numpad 5` - copy current stats.
- `Numpad 6` - paste stored stats.
- `H` - Show help window.
- `Esc` - turn off editor.

To work it is necessary to put on the outfit or weapon to be edited

### Left Column

The column on the left shows the items parameters (yellow color highlights the values of the item selected for comparison with the currently worn item)

- `Copy` - copies parameters
- `Paste` - pastes parameters
- `Apply` - applies parameters
- `Reset` - resets the items parameters to their original values (Modified values are cached temporary for the item you're working on, you can return to it if you turn the editor off)

### Middle Column

The column in the middle has items (outfits/weapons) sections for comparison with the current items worn

### Right Column

The column on the right shows a comparison of items parameters

___

## Technical part

The editor script is located in the file "`ui_debug_item.script`"
