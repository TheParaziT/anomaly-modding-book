---
title: ffmpeg2theora
description: Command-line tool to encode/recode various video formats
tags:
    - Audio
    - Modding Tool
draft: false
---


# ffmpeg2theora

___

## Info

import ProgramDescription from '@site/src/components/ProgramDescription';

<ProgramDescription 
  program={{
    name: "ffmpeg2theora",
    version: "0.30",
    developers: ["V2V"],
  }}
  maxAddonsToShow={2}
/>

## About

This package provides a command-line tool to encode/recode various video formats (basically everything that ffmpeg can read) into [Theora](https://en.wikipedia.org/wiki/Theora), the free video codec.

## Outputs

### General output

| Key | Description |
|---|---|
| -o, \--output | Alternative output filename |
| \--no-skeleton | Disables *.ogg skeleton metadata output |
| \--skeleton-3 | Outputs Skeleton Version 3, without keyframe indexes |
| -s, \--starttime |  Start encoding at this time (in sec.) |
| -e, \--endtime | End encoding at this time (in sec.) |
| -p, \--preset |  Encode file with preset. Right now there is preview, pro and videobin. Run `-p info` for more informations |

### Video output

| Key | Description |
|---|---|
| -v, \--videoquality | \[0 to 10] Encoding quality for video (default: 6) use higher values for better quality |
| -V, \--videobitrate |  Encoding bitrate for video (kb/s) |
| \--soft-target | Use a large reservoir and treat the rate as a soft target; rate control is less strict but resulting quality is usually higher/smoother overall. Soft target also allows an optional -v setting to specify a minimum allowed quality. |
| \--two-pass | Compress input using two-pass rate control. This option requires that the input to the to the encoder is seekable and performs both passes automatically. |
|  \--first-pass \<filename> | Perform first-pass of a two-pass rate controlled encoding, saving pass data to \<filename> for a later second pass |
| \--second-pass \<filename> | Perform second-pass of a two-pass rate controlled encoding, reading first-pass data from \<filename>.  The first pass data must come from a first encoding pass using identical input video to work properly. |
| \--optimize | Optimize video output filesize (slower) (same as `--speedlevel 0`) |
| \--speedlevel | Encoding is faster with higher values the cost is quality and bandwidth (default 1) available values depend on the version of libtheora your version supports speedlevels 0 to -1 |
| -x, \--width | Scale to given width (in pixels) |
| -y, \--height | Scale to given height (in pixels) |
| \--max_size | Scale output frame to be within box of given size, height optional (%d\[x%d], i.e. 640x480) |
| \--aspect |  Define frame aspect ratio: i.e. 4:3 or 16:9 |
| \--pixel-aspect | Define pixel aspect ratio: i.e. 1:1 or 4:3, overwrites frame aspect ratio |
| -F, \--framerate | Output framerate e.g 25:2 or 16 |
| \--croptop, \--cropbottom, \--cropleft, \--cropright | crop input by given pixels before resizing |
| -K, \--keyint | \[1 to 2147483647] Keyframe interval (default: 64) |
| -d \--buf-delay \<n> | Buffer delay (in frames). Longer delays allow smoother rate adaptation and provide better overall quality, but require more client side buffering and add latency. The default value is the keyframe interval for one-pass encoding (or somewhat larger if `--soft-target` is used) and infinite for two-pass encoding. (only works in bitrate mode) |
| \--no-upscaling | Only scale video or resample audio if input is bigger than provided parameters |
| \--resize-method \<method> |  Use this method for rescaling the video. See `--resize-method help` for a list of available resizing methods |

### Video transfer

| Key | Description | Note |
|---|---|---|
| \--pp | Video Postprocessing, denoise, deblock, deinterlacer use `--pp help` for a list of available filters. | - |
| -C, \--contrast | \[0.1 to 10.0] Contrast correction (default: 1.0) | Note: lower values make the video darker. |
| -B, \--brightness | \[-1.0 to 1.0] Brightness correction (default: 0.0) | Note: lower values make the video darker. |
| -G, \--gamma | \[0.1 to 10.0] Gamma correction (default: 1.0) | Note: lower values make the video darker. |
| -Z, \--saturation | \[0.1 to 10.0] Saturation correction (default: 1.0) | Note: lower values make the video grey. |

### Audio output

| Key | Description |
|---|---|
| -a, \--audioquality | \[-2 to 10] Encoding quality for audio (default: 1) use higher values for better quality |
| -A, \--audiobitrate | \[32 to 500] Encoding bitrate for audio (kb/s) |
| -c, \--channels | Set number of output channels |
| -H, \--samplerate | Set output samplerate (in Hz) |
| \--noaudio | Disable audio from input |
| \--novideo | Disable video from input |

### Input

| Key | Description |
|---|---|
| \--deinterlace | Force deinterlace, otherwise only material marked as interlaced will be deinterlaced |
| \--no-deinterlace | Force deinterlace off |
| -f, \--format | Specify input format |
| \--inputfps \<fps> | Override input fps |
| \--audiostream \<id> | By default the first audio stream is selected, use this to select another audio stream |
| \--videostream \<id> | By default the first video stream is selected, use this to select another video stream |
| \--nosync | So not use A/V sync from input container. Try this if you have issues with A/V sync |

### Subtitles

| Key | Description |
|---|---|
| \--subtitles \<file> | Use subtitles from the given file (SubRip (*.srt) format) |
| \--subtitles-encoding \<encoding> | Set encoding of the subtitles file. supported are utf-8, utf8, iso-8859-1, latin1 |
| \--subtitles-language \<language> | Set subtitles language (de, en_GB, etc) |
| \--subtitles-category \<category> | Set subtitles category (default "subtitles") |
| \--subtitles-ignore-non-utf8 | Ignores any non UTF-8 sequence in UTF-8 text |
| \--nosubtitles | Disables subtitles from input (equivalent to `--subtitles=none`) |
| \--subtitle-types=\[all,text,spu,none] | Select what subtitle types to include from the input video (default text) |

### Metadata

| Key | Description |
|---|---|
| \--artist | Name of artist (director) |
| \--title | Title |
| \--date | Date |
| \--location | Location |
| \--organization | Name of organization (studio) |
| \--copyright | Copyright |
| \--license | License |
| \--contact | Contact link |
| \--nometadata | Disables metadata from input |
| \--no-oshash | Do not include oshash of source file (SOURCE_OSHASH) |

### Keyframe indexing

| Key | Description |
|---|---|
| \--index-interval \<n> | Set minimum distance between indexed keyframes to \<n> ms (default: 2000) |
| \--theora-index-reserve \<n> | Reserve \<n> bytes for Theora keyframe index |
| \--vorbis-index-reserve \<n> | Reserve \<n> bytes for Vorbis keyframe index |
| \--kate-index-reserve \<n> | Reserve \<n> bytes for Kate keyframe index |

### Other

| Key | Description |
|---|---|
| -P, \--pid fname | Write the process' id to a file |
| -h, \--help | Help |
| \--info | Output *.json info about input file, use `-o` to save \*.json to file |
| \--frontend | Print status information in *.json, one \*.json dict per line |
