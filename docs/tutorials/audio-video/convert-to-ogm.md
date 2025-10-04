---
tags:
    - Video
title: Convert to *.ogm
---

# Convert to *.ogm

___

## About

[*.ogm](../../references/file-formats/audio-video/ogm.md) is a special format for playing back video in X-Ray. It can be created using [ffmpeg2theora](../../modding-tools/audio-video/ffmpeg2theora.md).

:::note
Audio track must be in a separate [*.ogg](../../references/file-formats/audio-video/ogg.md) file
:::

## Convert AVI to OGM

```bash
ffmpeg2theora.exe test.avi -v 10 --noaudio -o test.ogm
```

## Converting Image Sequence to OGM

```bash
ffmpeg2theora.exe frame%06d.png -o test1.ogm
```
