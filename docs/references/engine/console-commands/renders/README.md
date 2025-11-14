---
tags:
    - Console Commands
description: General Render Console Commands
title: General Render
preview: /docs/references/engine/console-commands/assets/images/console-commands-preview.png
draft: false
---

# General Render

___

## Release build

| Command | Command description | Command's argument | Note |
|---|---|---|---|
| renderer | Render type (old) | - | - |
| rs_vis_distance | Visibility range | 0.400 - 1.500 | - |
| r__actor_shadow | Player shadow | 'on/off' or '1/0' | - |
| r__bloom_thresh | Brightness threshold for 3rd party bloom shader | 0.0 - 1.0 | - |
| r__bloom_weight | Bloom weights for 3rd party bloom shader | 0.0 - 1.0 | - |
| r__clear_models_on_unload |  | 'on/off' or '1/0' | - |
| r__color_grading |  | 0.000000e+00, 0.000000e+00, 0.000000e+00 - 1.000000e+00, 1.000000e+00, 1.000000e+00 | - |
| r__detail_density | Grass density | 0.040 - 1.000 | - |
| r__detail_height | Grass height | 0.5 - 2.0 | - |
| r__detail_radius | Grass rendering radius | 50.0 - 250.0 | - |
| r__dtex_range |  | 5.000 - 175.000 | - |
| r__enable_grass_shadow | Enables grass shadows | 'on/off' or '1/0' | - |
| r__exposure | Scene exposure | 0.500 - 4.000 | - |
| r__framelimit | FPS limiter | 0 - 500 | - |
| r__gamma | Scene gamma | 0.500 - 2.200 | - |
| r__geometry_lod | Geometry level of detail | 0.100 - 1.500 | - |
| r__lens_flares | The "lens flare" effect | 'on/off' or '1/0' | - |
| r__nightvision | Controls nightvision shader | 0 - 3 | - |
| r__no_ram_textures | don't keep textures in RAM | 'on/off' or '1/0' | - |
| r__no_scale_on_fade |  | 'on/off' or '1/0' | - |
| r__optimize_dynamic_geom |  | 0 - 4 | - |
| r__optimize_shadow_geom |  | 'on/off' or '1/0' | - |
| r__optimize_static_geom |  | 0 - 4 | - |
| r__saturation | Color saturation | 0.0 - 2.0 | - |
| r__supersample | Supersampling (DX8) | 1 - 8 | - |
| r__tf_aniso | Anisotropic filtering | 0 4 8 16 | - |
| r__tf_mipbias | Bias for initial texture mip level | -3.0 - 3.0 | - |
| r__use_precompiled_shaders |  | 'on/off' or '1/0' | - |
| r__wallmark_ttl | Wallmark Lifetime | 1.000 - 600.000 | - |
| r_screenshot_mode | Screenshot in the selected format | jpg png tga | - |
| _preset | Selecting a set of quality settings | Minimum Low Default High/Extreme | - |
| rs_screenmode | Resolution selection mode | Windowed Fullscreen Borderless Windowed | - |
| rs_v_sync | Vertical Sync | 'on/off' or '1/0' | - |
| rs_refresh_60hz | Screen refresh rate 60 Hz | 'on/off' or '1/0' | - |
| r_restore_quad_ib_data | Restore index buffer data for quads | - | - |
| vid_mode | Screen resolution | 800x600 1024x768 1280x720 1280x1024 1366x768 1600x900 1680x1050 1920x1080 | - |
| vid_restart | Reboot the video engine | - | - |
| rs_c_brightness | Brightness | 0.500 - 1.500 | - |
| rs_c_contrast | Contrast | 0.500 - 1.500 | - |
| rs_c_gamma | Gamma | 0.500 - 1.500 | Not working |

## Debug build

| Command | Command description | Command's argument |
|---|---|---|
| vid_bpp |  |  |
| build_ssa |  | - |
| r__lsleep_frames |  | 4.0 - 30.0 |
| r__ssa_glod_start |  | 128 - 512 |
| r__ssa_glod_end |  | 16 - 96 |
| r__wallmark_shift_pp |  | 0.0 - 1.0 |
| r__wallmark_shift_v |  | 0.0 - 1.0 |
| r__detail_l_ambient |  | 0.5 - 0.95 |
| r__detail_l_aniso |  | 0.1 - 0.5 |
| r__d_tree_w_amp |  | 0.001 - 1.0 |
| r__d_tree_w_rot |  | 0.01 - 0.5 |
| r__d_tree_w_speed |  | 1.0 - 10.0 |
| r__d_tree_wave |  |  |
