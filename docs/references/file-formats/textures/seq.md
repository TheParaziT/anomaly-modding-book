---
title: "*.seq (Sequence)"
description: Text file that is used to create a simple animation texture, by recording a sequence of "frames" and a playback speed.
---

# *.seq (Sequence)

___

## About

Text file that is used to create a simple animation texture, by recording a sequence of "frames" and a playback speed.

:::info

```example
15
ui\ui_ani_cursor_01
ui\ui_ani_cursor_02
ui\ui_ani_cursor_03
ui\ui_ani_cursor_04
ui\ui_ani_cursor_05
```

Order in which the textures are played will be 1234512312312345

```example
cycled
15
ui\ui_ani_cursor_01
ui\ui_ani_cursor_02
ui\ui_ani_cursor_03
ui\ui_ani_cursor_04
ui\ui_ani_cursor_05
```

In this case, because of "cycled" the playback order will be 1234543212345432123454321

Speed of texture change is set in numerical format before the enumeration
:::

The number of textures in the list is arbitrary, but the more frames, the greater the load on the engine, respectively.
The name of the file is set by the name of the assigned texture (without taking the extension into account). If there is a [.dds](dds.md) file in the folder with the same name as the .seq file, the engine ignores the original texture, giving priority to the .seq file. The priority of file search by extension is as follows:

- [*.ogm](../audio-video/ogm.md)
- .avi
- [*.seq](seq.md)
- [*.dds](dds.md)

## Parameters

- The "cycled" parameter is optional if you want to loop from the first texture to the last texture and from the last texture to the first texture.
If you don't write it, it will play in a normal circular loop
- Playback speed (frames per second) (written before the list of textures)

## Programs

<UniversalCard
  title="Any text editor"
/>

___

## Sources

[modfaq](https://modfaq.ru/*.seq)
