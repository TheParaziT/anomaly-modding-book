---
title: "*.xml"
draft: false
---

# *.xml

___

## About

XML files are used to save text strings used for translation. All XML files are located in `gamedata/configs/text/*lang*`. XML files have these properties:

1. They are saved in encoding Windows-1251. English translation won't break if you're using UTF, but russian will.
2. Every string must have an unique id assigned to it.
3. There is a single namespace for all xml files of one language. That means, no matter in which file you are saving your strings, they will be available in one place, namely `game.translate_string(*id*)`.

:::info

```xml
<?xml version="1.0" encoding="windows-1251"?>
<string_table>
  <string id="nice_text_id">
    <text>Cool text inside text tags</text>
  </string>

  <string id="another_text_id">
    <text>...</text>
  </string>  
...
</string_table>
```

:::

## Programs

<UniversalCard
  title="Any text editor"
/>
