---
title: "*.omf"
draft: false
---

# *.omf

___

## About

A specialized S.T.A.L.K.E.R. game format containing animations. This is a separate dedicated file used in conjunction with [*.ogf](../models/ogf.md) models. Was created in order to optimize process when some different models use the same list of animations.

## Technical information

They are in [RIFF](https://en.wikipedia.org/wiki/Resource_Interchange_File_Format) format. That is, the file is divided into chunks.
The omf file consists of two chunks:

- 0xE - stores animations (rotation, movement of bones)

- 0xF - stores the Bone Parts and animation parameters.

These chunks can be found inside the ogf files.
In other words, an omf file is a slice of an ogf file that is moved to an external file.
The structure of the 0xE and 0xF chunks in ogf is identical to those in omf.

### The structure of the 0xE chunk

This chunk consists of nested chunks.
The first nested chunk is the one with the identifier 0x0.
The zero chunk stores an unsigned 32-bit integer number.
This number indicates the number of animations in the omf file.
The identifier of each subsequent chunk is one more than the previous one.
That is, 0x0 is followed by 0x1, then 0x2, 0x3, etc.
All the chunks following 0x0 contain animations.
Description of the nested chunk that stores the animations
The animation name comes first, which is a string ending with a null byte.
Next is an unsigned 32-bit integer, which specifies the number of animation frames.
The following data is the bone transforms. For each bone, rotation, movement, and flags are stored.
Flags come first. Flags is an unsigned 8 bit integer.
The first bit of this byte indicates if the movement is modifiable.
If the bit is 1, then the movement has values throughout all frames.
If the bit is 0, then the movement has only one value for the entire animation interval.
This is done to optimize it so that it doesn't store a bunch of identical keys, but instead has a single value.
The second bit of this byte indicates whether the rotation is static (not changing throughout the animation).
The third bit is the High Quality flag. If it is 0, then the position has an 8-bit representation, otherwise it is 16-bit.
Next comes the information about the rotation.
What will be written to the file next depends on the flags.
If the second bit of the flag is 0, the file will contain the following:
One rotation value as a quaternion with two-byte signed components.
That is, QXYZ, each 2 bytes, for a total of 8 bytes.
And if the second bit of the flag is 1, then the following follows:
crc32 sum as a 4 byte unsigned integer.
And after that come the rotation quaternion values for each frame.
The format of rotation is the same as described above (the same 8 bytes).
Now comes the movement information.
If the first bit of the flag is 1, then follows a 32-bit unsigned integer, which is the crc32 sum.
This is followed by three eight-bit numbers, which indicate the position of the bone on the x, y, z axes.
These positions are written for each frame.
That is, the positions should be read in a loop, which is repeated as many times as the number of frames contains the animation.
After all these positions are data about the initial conditions of movement:
Amplitude or size of movement.
These are three float numbers (4 bytes each).
And then there is the initial value of movement. These are also 3 float numbers.
These initial conditions are stored in a single instance for each bone in this animation.
That is, these values do not change throughout the animation.
If the first bit of the flag is 0, there is one move value for all frames.
This movement is stored in 3 float numbers (4 bytes each).

Below is a pseudocode that describes one animation:

```cpp
name = string
length = uint32
for bone in bones {
    flags = uint8
    translate_present = flags(0)    // get bit 0
    rotate_absent = flags(1)    // get bit 1
    high_quality = flags(2)    // get bit 2
    if rotate_absent {
        quaternion = int16, int16, int16, int16    // Q, X, Y, Z
    } else {
        motion_crc32 = int32
        for (i=0, i<length, i++) {
            quaternion = int16, int16, int16, int16    // Q, X, Y, Z
        }
    }
    if translate_present {
        motion_crc32 = int32
        if high_quality {
            for (i=0, i<length, i++) {
                translation = int16, int16, int16    // X, Y, Z
            }
        } else {
            for (i=0, i<length, i++) {
                translation = int8, int8, int8    // X, Y, Z
            }
        }
        translate_size = float, float, float    // X, Y, Z
        translate_init = float, float, float    // X, Y, Z
    } else {
        translate = float, float, float    // X, Y, Z
    }
```

### Chunk structure 0xF

Stores bone parts and animation parameters.
The code that describes this chunk is shown below:

```cpp
params_version = uint16 // parameter format version
partition_count = uint16 // number of bone parts
for (i=0, i<partition_count, i++) {
    partition_name = string // name of the bone part
    bone_count = uint16 // number of bones in this bone part
    for (j=0, j<bone_count, j++) {
        if params_version == 3 {
            bone_name = string // bone name
            bone_id = uint32 // bone ID
        }
    }
    motion_count = uint16 // number of animations
    for (j=0, i<motion_count, j++) {
        // animation parameters
        motion_name = string
        motion_flags = uint32
        bone_or_part = uint16
        motion = uint16 // animation identifier from the 0xE chunk
        speed = float32
        power = float32
        accrue = float32
        falloff = float32
    }
}
```

### Interpolation types

- [Stepped](https://help.autodesk.com/view/MOBPRO/2024/ENU/?guid=GUID-F263EE8F-70A4-4941-BD31-410C08EC101A)

## Programs

<CardGrid
  columns={2}
  items={[
    {
      title: "Blender X-Ray Addon",
      content: "Blender X-Ray is an addon for the Blender that is designed to import/export 3D models and animations from S.T.A.L.K.E.R. (X-Ray Engine).",
      link: "../../../modding-tools/blender",
      internal: true
    },
    {
      title: "OMF Editor by ValeroK",
      content: "Modified tool for working with *.omf format.",
      link: "../../../modding-tools/animations/omf-editor-by-valerok",
      internal: true
    },
  ]}
/>

## Sources

- [gameru (Wayback Machine)](https://web.archive.org/web/20200919000502/http://stalkerin.gameru.net/wiki/index.php?title=%D0%A4%D0%BE%D1%80%D0%BC%D0%B0%D1%82_%D1%84%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2_*.omf)
- [Blender X-Ray Addon Wiki](https://github.com/PavelBlend/blender-xray/wiki/Formats#omf)
