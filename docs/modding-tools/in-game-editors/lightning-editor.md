---
title: Lightning Editor
preview: /docs/modding-tools/in-game-editors/assets/images/lightning-editor.png
draft: false
---

# Lightning Editor

___

## About

Allows you to change the various lighting settings of the weather preset

![lightning-editor centered](assets/images/lightning-editor.png)

First you need to select a weather file from the drop-down list and then edit it.

### Key binds

- `INSERT` to start
- `Up` and `Down` keys to rotate through the available commands
- `NUMPAD_8` and `NUMPAD_2` keys to increase/reduce the value of highlighted command
- `Enter` key to save the adjusted commands to print_table.txt

___

## Technical part

The commands and their settings are assigned in the script "`ui_debug_lightning.script`"

| Command | Command description |
|---|---|
| r2_sun_lumscale | Sunlight intensity |
| r2_sun_lumscale_amb | Ambient light intensity |
| r2_sun_lumscale_hemi | Hemispherical lighting |
| r2_tonemap_amount |  |
| r2_tonemap_lowlum |  |
| r2_tonemap_middlegray | Controls the middle gray value for Tone Mapping |
| r2_gloss_min |  |
| r2_gloss_factor |  |
| r2_ls_bloom_kernel_b |  |
| r2_ls_bloom_kernel_g | "Shape" of bloom. High value = more blurry bloom |
| r2_ls_bloom_kernel_scale | Size of bloom effect |
| r2_sun_shafts_min |  |
| r2_sun_shafts_value |  |
| r__optimize_dynamic_geom |  |
| r__optimize_static_geom |  |
| r__optimize_shadow_geom |  |
| rs_vis_distance |  |
| r2_tnmp_onoff |  |
| r2_tnmp_a |  |
| r2_tnmp_b |  |
| r2_tnmp_c |  |
| r2_tnmp_d |  |
| r2_tnmp_e |  |
| r2_tnmp_f |  |
| r2_tnmp_w |  |
| r2_tnmp_gamma |  |
| r2_tnmp_exposure |  |
| r3_dynamic_wet_surfaces_near | Minimum rendering distance of the wet surface effect |
| r3_dynamic_wet_surfaces_far | Maximum rendering distance of the wet surface effect |
| r3_dynamic_wet_surfaces_sm_res | Shadow map resolution for rendering wet surfaces |
