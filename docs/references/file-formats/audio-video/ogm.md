---
title: "*.ogm (Ogg Media)"
description: Video format used by the game engine
draft: false
---

# *.ogm (Ogg Media)

___

## About

Video format used by the game engine

## Technical information

- No Audio
  - The audio track must be a separate [*.ogg](ogg.md) file
- Compression format: [Theora](https://en.wikipedia.org/wiki/Theora)

## Programs

<CardGrid
  columns={2}
  items={[
    {
      title: "ffmpeg2theora",
      content: "This package provides a command-line tool to encode/recode various video formats (basically everything that ffmpeg can read) into Theora, the free video codec.",
      link: "../../../modding-tools/audio-video/ffmpeg2theora",
      internal: true,
    },
    {
      title: "FFmpeg",
      content: "A complete, cross-platform solution to record, convert and stream audio and video.",
      link: "https://www.ffmpeg.org/",
      internal: false,
      linkText: "Official Site",
    },
    {
      title: "Blender",
      content: "Blender is a free and open-source 3D computer graphics software tool.",
      link: "https://www.blender.org/",
      internal: false,
      linkText: "Official Site",
    },
  ]}
/>
