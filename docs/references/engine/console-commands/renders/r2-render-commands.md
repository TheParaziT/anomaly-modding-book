---
tags:
    - Console Commands
description: R2 Render Console Commands
title: R2 Render
preview: /docs/references/engine/console-commands/assets/images/console-commands-preview.png
---

# R2 Render

___

:::note
DirectX 9.0c - (Shader Model 3.0)
:::

## Release build

| Command | Command description | Command's argument | Note |
|---|---|---|---|
| r2_aa | Enable "Pseudo-smoothing" on dynamic lighting | 'on/off' or '1/0' | - |
| r2_aa_break | Distance at which the "Pseudo-smoothing" effect works | 0.000000e+00, 0.000000e+00, 0.000000e+00 - 1.000000e+00, 1.000000e+00, 1.000000e+00 | - |
| r2_aa_kernel | Basic value of the "Pseudo-smoothing" effect | 0.300 - 0.700 | - |
| r2_aa_weight | Controls the blurring of the fake AA more accurately | 0.000000e+00, 0.000000e+00, 0.000000e+00 - 1.000000e+00, 1.000000e+00, 1.000000e+00 | - |
| r2_allow_r1_lights |  | 'on/off' or '1/0' | - |
| r2_detail_bump | Enable bump for Detail textures | 'on/off' or '1/0' | - |
| r2_dof |  |  | - |
| r2_dof_enable | Enable depth of field | 'on/off' or '1/0' | - |
| r2_dof_radius | Doesn't work. In vanilla game that command controls blur radius | 0.05 - 1.0 | - |
| r2_dof_sky | Sky depth | -10000.0 - 10000.0 | - |
| r2_drops_control | Controls rain drops shader | 0.000000e+00, 0.000000e+00, 0.000000e+00 - 1.000000e+00, 2.000000e+00, 1.000000e+00 | - |
| r2_exp_donttest_shad |  | 'on/off' or '1/0' | - |
| r2_gi | Enalbe Global illumination | 'on/off' or '1/0' | - |
| r2_gi_clip | Global illumination effect range | 0.000 - 0.100 | - |
| r2_gi_depth | Shadow depth of the global illumination effect | 1 - 5 | - |
| r2_gi_photons | Number of rays to trace the global illumination effect | 8 - 256 | - |
| r2_gi_refl | Reflectivity of global illumination effect surfaces | 0.001 - 0.990 | - |
| r2_gloss_factor | Surface gloss level | 0.001 - 10.000 | - |
| r2_gloss_min | Minimal gloss level | 0.001 - 1.0 | - |
| r2_ls_bloom_fast | In theory, this should enable faster bloom implementation, yet it doesn't work correctly | 'on/off' or '1/0' | - |
| r2_ls_bloom_kernel_b | Determines the level of shading (haze) from the HDR and Bloom | 0.010 - 1.000 | - |
| r2_ls_bloom_kernel_g | Bloom 'radius'. Higher values results in softer bloom | 1.0 - 7.0 | - |
| r2_ls_bloom_kernel_scale | Bloom scale | 0.05 - 2.0 | - |
| r2_ls_bloom_speed |  | 0.000 - 100.000 | - |
| r2_ls_bloom_threshold | Brightness threshold | 0.0 - 1.0 | - |
| r2_ls_depth_bias | Controls the range of light sources | -0.500 - 0.500 | - |
| r2_ls_depth_scale | Controls the effect of lighting on shadows | 0.500 - 1.500 | - |
| r2_ls_dsm_kernel |  | 0.100 - 3.000 | - |
| r2_ls_psm_kernel |  | 0.100 - 3.000 | - |
| r2_ls_squality |  | 0.500 - 1.000 | - |
| r2_ls_ssm_kernel |  | 0.100 - 3.000 | - |
| r2_mask_control | Controls gasmask shader | 0.000000e+00, 0.000000e+00, 0.000000e+00, 0.000000e+00 - 1.000000e+01, 3.000000e+00, 1.000000e+00, 1.000000e+00 | - |
| r2_mblur | Motion blur intensity | 0.0 - 1.0 | - |
| r2_mblur_enabled | Enable motion blur effect | 'on/off' or '1/0' | - |
| r2_parallax_h | Parallax strength | 0.0 - 0.5 | - |
| r2_qsync |  | 0 - 1 | - |
| r2_shadow_cascede_old | Enable 'SoC-like' shadow mapping | 'on/off' or '1/0' | - |
| r2_slight_fade |  | 0.200 - 1.000 | - |
| r2_smaa | Enable Subpixel Morphological Anti-aliasing | off low medium high ultra | - |
| r2_soft_particles | Enable soft particles | 'on/off' or '1/0' | - |
| r2_soft_water | Enable soft Water | 'on/off' or '1/0' | - |
| r2_ss_sunshafts_length | Length of screen-space sun rays | 0.2 - 1.5 | - |
| r2_ss_sunshafts_radius |  | 0.500 - 2.000 | - |
| r2_ssa_lod_a |  | 16.0 - 96.0 | - |
| r2_ssa_lod_b |  | 32.0 - 96.0 | - |
| r2_ssao | Enable Screen Space Ambient Occlusion | st_opt_off st_opt_low st_opt_medium st_opt_high st_opt_ultra | - |
| r2_ssao_blur | Doesn't work | 'on/off' or '1/0' | - |
| r2_ssao_half_data | Enable half-resolution depth buffer for Ambient Occlusion | 'on/off' or '1/0' | - |
| r2_ssao_hbao | Horizon-Based Ambient Occlusion | 'on/off' or '1/0' | - |
| r2_ssao_hdao | High-definition Ambient Occlusion | 'on/off' or '1/0' | - |
| r2_ssao_mode | Ambient occlusion type | disabled default hdao hbao | - |
| r2_ssao_opt_data |  | 'on/off' or '1/0' | - |
| r2_steep_parallax | Enable [Steep Parallax Occlusion Mapping](https://en.wikipedia.org/wiki/Parallax_mapping#Steep_parallax_mapping) | 'on/off' or '1/0' | - |
| r2_sun | Enable sun shadows | 'on/off' or '1/0' | - |
| r2_sun_depth_far_bias |  | -0.500 - 0.500 | - |
| r2_sun_depth_far_scale |  | 0.500 - 1.500 | - |
| r2_sun_depth_near_bias |  | -0.500 - 0.500 | - |
| r2_sun_depth_near_scale |  | 0.500 - 1.500 | - |
| r2_sun_details | Enable sun shadows for grass and other detailed objects | 'on/off' or '1/0' | - |
| r2_sun_far |  | 51.000 - 180.000 | - |
| r2_sun_focus | Focus of sun shadows | 'on/off' or '1/0' | - |
| r2_sun_lumscale | Sun light brightness | 0.0 - 3.0 | - |
| r2_sun_lumscale_amb | Ambient light brightness | 0.0 - 3.0 | - |
| r2_sun_lumscale_hemi | Sky light brightness | 0.0 - 3.0 | - |
| r2_sun_near | The location of the sun from the earth | 1.000 - 150.000 | - |
| r2_sun_near_border |  | 0.500 - 1.000 | - |
| r2_sun_quality | Shadow filter quality | st_opt_low st_opt_medium st_opt_high st_opt_ultra st_opt_extreme | - |
| r2_sun_tsm | Clarity of sun shadows | 'on/off' or '1/0' | - |
| r2_sun_tsm_bias |  | -0.500 - 0.500 | - |
| r2_sun_tsm_proj |  | 0.001 - 0.800 | - |
| r2_sunshafts_min | Min. sun rays intensity | 0.0 - 0.5 | - |
| r2_sunshafts_mode | Sun rays mode | off volumetric screen_space combined | - |
| r2_sunshafts_quality | Quality of the sun rays | st_opt_low st_opt_medium st_opt_high | - |
| r2_sunshafts_value | Sun rays intensity | 0.0 - 2.0 | - |
| r2_terrain_z_prepass | Terrain Z-Prepass | 'on/off' or '1/0' | - |
| r2_tnmp_a |  | 0.0 - 20.0 | - |
| r2_tnmp_b |  | 0.0 - 20.0 | - |
| r2_tnmp_c |  | 0.0 - 20.0 | - |
| r2_tnmp_d |  | 0.0 - 20.0 | - |
| r2_tnmp_e |  | 0.0 - 20.0 | - |
| r2_tnmp_exposure | Tonemap exposure | 0.0 - 20.0 | - |
| r2_tnmp_f |  | 0.0 - 20.0 | - |
| r2_tnmp_gamma | Tonemap gamma | 0.0 - 20.0 | - |
| r2_tnmp_onoff | Enables custom tonemapping (based on Uncharted 2 curve) | 0.0 - 1.0 | - |
| r2_tnmp_w | White point | 0.0 - 20.0 | - |
| r2_tonemap | Enables eye-adaptation | 'on/off' or '1/0' | - |
| r2_tonemap_adaptation | Eye-adaptation speed | 0.0 - 10.0 | - |
| r2_tonemap_amount |  | 0.000 - 1.000 | - |
| r2_tonemap_lowlum | Controls the tone mapping effect on dark locations | 0.000 - 1.000 | - |
| r2_tonemap_middlegray | Controls the overall appearance of the HDR effect | 0.000 - 2.000 | - |
| r2_volumetric_lights | Volumetric light | 'on/off' or '1/0' | - |
| r2_wait_sleep |  | 0 - 1 | - |
| r2_water_reflections | Enable water reflections | 'on/off' or '1/0' | - |
| r2_zfill |  | 'on/off' or '1/0' | - |
| r2_zfill_depth |  | 0.001 - 0.500 | - |
| r2em |  | 0.000 - 4.000 | - |

## Debug build

| Command | Command description | Command's argument |
|---|---|---|
| r2_use_nvdbt |  | - |
| r2_mt |  | - |
| r2_dhemi_count |  | 4 - 25 |
| r2_dhemi_sky_scale |  | 0.0 - 100.0 |
| r2_dhemi_light_scale |  | 0.0 - 100.0 |
| r2_dhemi_light_flow |  | 0.0 - 1.0 |
| r2_dhemi_smooth |  | 0.0 - 10.0 |
| rs_hom_depth_draw |  | 'on/off' or '1/0' |
| r2_shadow_cascede_zcul |  | 'on/off' or '1/0' |
