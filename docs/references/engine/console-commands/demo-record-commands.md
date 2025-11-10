---
tags:
    - Console Commands
description: Demo Console Commands
title: Demo Record
preview: /docs/references/engine/console-commands/assets/images/console-commands-preview.png
---

# Demo Record

___

## Release build

| Command | Command description | Command's argument | Note |
|---|---|---|---|
| demo_play | Plays the selected demo_record | "name" of demo | - |
| demo_record | Enables recording of camera overflights | "name" of demo | Space bar sets key points when the camera flies The Enter key exits record mode and takes the player to the exit point from demo_record mode |
| demo_set_cam_position | Sets position of the demo camera | (x, y, z) | `x`, `y`, and `z` are 4-byte floats, i.e. in the range of -3.402823e+38 to 3.402823e+38. |
