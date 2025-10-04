---
title: Weather Editor
preview: /docs/modding-tools/in-game-editors/assets/images/weather-editor.png
---

# Weather Editor

___

## About

Weather editor allows you to change weather values in real-time. Minute precision

- The GUI is interactive and easy to use, with ability to modify or create new weather files
- Edited values are temporary cached for the weathers, hours and minutes you worked on. You can return to them in case you turned off the editor (Avoid exiting or reloading when you have unsaved values)
- In Viewer mode, you can witness weather changes by the time slider

![weather-editor centered](assets/images/weather-editor.png)

> Viewer Mode

![Viewer Mode centered](assets/images/viewer-mode.png)

### Key binds

- `Up Arrow` - select previous parameter
- `Down Arrow` - select next parameter
- `Left Arrow` - reduce\rotate value of selected parameter
- `Right Arrow` - increase\rotate value of selected parameter
- `LShift (hold)` - x10 value step
- `LAlt (hold)` - x50 value step
- `Q` - previous hour
- `A` - next hour
- `W` - previous minute
- `S` - next minute
- `E` - increase selected parameter value
- `D` - reduce selected parameter value
- `R` - increase selected group value (all parameters within)
- `F` - reduce selected group value (all parameters within)
- `T` - next moment
- `G` - previous moment
- `C` - copy select parameter value
- `C + CTRL` - copy current moment settings
- `V` - paste/apply copied parameter value
- `V + CTRL` - paste/apply to current moment settings
- `Z` - viewer mode
- `Delete` - Reset current modified moment
- `Delete + CTRL` - Reset all modified moments
- `H` - toggle hint window
- `Esc` or `Home` - turn off editor

### Buttons

| Icon | Description |
|---|:---:|
| ![Alt text](../../../static/icons/in-game-editors/copy.png) | Copy settings |
| ![Alt text](../../../static/icons/in-game-editors/paste.png) | Paste settings |
| ![Alt text](../../../static/icons/in-game-editors/view-mode.png) | Viewer Mode |
| ![Alt text](../../../static/icons/in-game-editors/pause.png) | Pause in Viewer Mode |
| ![Alt text](../../../static/icons/in-game-editors/resume.png) | Auto play in Viewer Mode |
| ![Alt text](../../../static/icons/in-game-editors/save.png) | Save to new file if you indicated the name in box below, otherwise save to current file. Name of custom files must start with "`w_`". |
| ![Alt text](../../../static/icons/in-game-editors/clear-cache-values.png) | Clear cached values |
| ![Alt text](../../../static/icons/in-game-editors/resume.png) | Resume weather, and exit |
| ![Alt text](../../../static/icons/in-game-editors/exit.png) | Exit (weather will still paused in engine) |
| ![Alt text](../../../static/icons/in-game-editors/about.png) | About |

___

## Technical part

The settings of the editor and its parameters can be found in the file "`ui_debug_weather.script`"

| Name | Description | Note |
|---|---|---|
| ambient | Ambient | The list is taken from the file "`ambients.ltx`" |
| ambient_color | Ambient color |  |
| clouds_color | Clouds color |  |
| clouds_texture | Clouds texture |  |
| far_plane |  |  |
| fog_color | Fog color |  |
| fog_density | Fog density |  |
| fog_distance | Fog distance |  |
| hemisphere_color | Hemisphere color |  |
| rain_density | Rain density |  |
| rain_color | Rain color |  |
| sky_color | Sky color |  |
| sky_rotation | Sky rotation |  |
| sky_texture | Sky texture |  |
| sun | Sun | The list is taken from the file "`suns.ltx`" |
| sun_color |  |  |
| sun_longitude | Sun longitude |  |
| sun_altitude | Sun altitude |  |
| sun_shafts_intensity | Sun shaft intensity |  |
| thunderbolt_collection |  | The list is taken from the file "`thunderbolt_collections.ltx`" |
| thunderbolt_duration | Thunderbolt duration |  |
| thunderbolt_period | Thunderbolt period |  |
| water_intensity | Water intensity |  |
| wind_velocity | Wind velocity |  |
| tree_amplitude_intensity | Tree amplitude intensity |  |
| wind_direction | Wind direction |  |
