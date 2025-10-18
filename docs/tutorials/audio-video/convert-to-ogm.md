---
tags:
    - Video
title: Convert to *.ogm
---

# Convert to *.ogm

___

## About

[*.ogm](../../references/file-formats/audio-video/ogm.md) is a special format for playing back video in X-Ray.

:::note
Audio track must be in a separate [*.ogg](../../references/file-formats/audio-video/ogg.md) file
:::

## Via Blender

Blender has build in render in `Theora` codec.

Open `Output Properties` in `Output` in `File Format` - `FFmpeg Video`. Then open `Encoding` in `Container` select `Ogg`. For video in `Video` in `Video Codec` select `Theora`. Render Video.

## Via ffmpeg

Creating using [ffmpeg](https://www.ffmpeg.org/).

### Convert AVI to OGM

```bash
ffmpeg -i test.mp4 -c:v libtheora -q:v 10 -c:a libvorbis -q:a -1 test.ogv
```

Then rename extension from `*.ogv` to `*.ogm`.

## Via ffmpeg2theora

Creating using [ffmpeg2theora](../../modding-tools/audio-video/ffmpeg2theora.md).

### Convert AVI to OGM

```bash
ffmpeg2theora.exe test.avi -v 10 --noaudio -o test.ogm
```

### Converting Image Sequence to OGM

```bash
ffmpeg2theora.exe frame%06d.png -o test1.ogm
```
