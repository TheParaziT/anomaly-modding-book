---
title: "*.ogg"
---

# *.ogg

___

## About

Sound format used by the game engine

## Technical information

- Supports up to 44.100 Hz
- Audio format:
  - Mono audio format (For the game world)
  - Stereo audio format (To play in the player's head)
- Audiocodek: [Vorbis](https://en.wikipedia.org/wiki/Vorbis)
- For proper operation in the game world contains a comment chunk

## Programs

<CardGrid
  columns={4}
  items={[
    {
      title: "Any sound editor that supports *.ogg",
      content: "But it won't write comments into the chunks!",
    },
    {
      title: "Sound Attribute Viewer And Tweaker",
      content: "Utility designed to simplify working with X-Ray Engine sound files in \*.ogg format.",
      link: "../../../modding-tools/audio-video/savandt",
      internal: true
    },
    {
      title: "SDK Sound Editor",
      content: "A sound editor is needed to edit sound files in \*.wav format and convert to \*.ogg.",
      link: "../../../modding-tools/sdk/sound-editor",
      internal: true
    },
    {
      title: "OGG Editor",
      content: "Utility for quickly view and edit audio comments in \*.ogg files already converted through the SDK without having to open the SDK.",
      link: "../../../modding-tools/audio-video/ogg-editor",
      internal: true
    },
  ]}
/>

___

## Sources

[Wikipedia Page](https://en.wikipedia.org/wiki/Ogg)
