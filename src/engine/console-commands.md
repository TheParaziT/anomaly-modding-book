# Console commands

## About
This section describes all console commands. 
All the settings described below are stored in the file "user".ltx. (You can read more about [important files here](../main-folders-and-files/README.md))

### Game

| Сommand | Command description | Command's argument |
---|---|---|
| help | Outputs a list of console commands | - |
| g_dead_body_collision | Enables collision for selected objects  | full/actor_only/off |
| g_game_difficulty | Selects the game difficulty |  |
| g_god | Enables God Mode | 'on/off' or '1/0' |
| g_hit_pwr_modif |  | 0.500 - 3.000 |
| g_ironsights_zoom_factor | Zoom factor of the mechanical sight | 1.000 - 2.000 |
| g_unlimitedammo | Enables Infinite Ammo Mode | 'on/off' or '1/0' |
| g_use_tracers |  | 'on/off' or '1/0' |
| g_important_save | Saving at key points | 'on/off' or '1/0' |
| g_autopickup | Enables the ability to pick up items automatically (not working) | 'on/off' or '1/0' |
| g_always_active | The game will continue to work if the focus is not on it | 'on/off' or '1/0' |
| demo_play | Plays the selected demo_record | "name" of demo |
| demo_record |  |  |
| demo_set_cam_position |  |  |
| keypress_on_start | Whether to wait after loading a level to press the key to go into the game | 'on/off' or '1/0' |
| load | Load specified save | save_name |
| load_last_save | Load last save | - |
| main_menu | Exit to the main menu | - |
| quit | Exit to the desktop | - |
| cl_cod_pickup_mode | Selecting items from the radius around the scope | 'on/off' or '1/0' |
| disconnect | Ends the game | - |
| time_factor | Ability to change the game time |  |


#### Actor

| Сommand | Command description | Command's argument |
---|---|---|
| g_backrun | Backward running mode (not working) | 'on/off' or '1/0' |
| head_bob_factor | Basic head bobbing factor | 0 - 2 |

#### HUD

| Сommand | Command description | Command's argument |
---|---|---|
| g_simple_pda | ??? | 'on/off' or '1/0' |
| g_3d_pda | Switching between 2D and 3D PDA modes | 'on/off' or '1/0' |
| hud_weapon | Shows weapons and hands | 'on/off' or '1/0' |
| hud_draw | Shows UI | 'on/off' or '1/0' |
| hud_fov | FOV for HUD |  |

#### UI

| Сommand | Command description | Command's argument |
---|---|---|
| cl_dynamiccrosshair | Dynamic Sight (not working из-за прицела ввиде точки) | 'on/off' or '1/0' |
| g_crosshair_color | Changes the color of the crosshair | -(255,255,255,255) - (255,255,255,255) |
| g_feel_grenade | "Sensitivity" grenade | 'on/off' or '1/0' |
| hud_crosshair | Show crosshair | 'on/off' or '1/0' |
| hud_crosshair_dist | Show distance under crosshair | 'on/off' or '1/0' |

#### Debug

| Сommand | Command description | Command's argument |
---|---|---|
| rs_stats | Display engine statistics on the screen | 'on/off' or '1/0' |
| rs_cam_pos | Display camera coordinates (not working?) | 'on/off' or '1/0' |
| list_actions | Display a list of active console commands | - |
| bind_list | Display a list of commands assigned to the keys | - |
| hud_info | (not working?) |  |
| render_memory_stats | Output information about memory usage | - |
| stat_memory |  |  |

### Control

| Сommand | Command description | Command's argument |
---|---|---|
| bind | Assign a command to the button | Action, key prefixed with k (kLeft, etc.) |
| mouse_invert | Inverts the mouse | 'on/off' or '1/0' |
| mouse_sens | Mouse sensitivity | 0.001 - 0.600 |
| mouse_sens_aim | Mouse sensitivity when aiming | 0.500 - 2.000 |
| default_controls | Resets key settings to defaults | - |
| wpn_aim_toggle | Aiming Mode | 'on/off' or '1/0' |
| g_crouch_toggle | Sit/stand mode | 'on/off' or '1/0' |
| g_sprint_toggle | Sprint mode | 'on/off' or '1/0' |
| g_walk_toggle |  | 'on/off' or '1/0' |

### Discord

| Сommand | Command description | Command's argument |
---|---|---|
| discord_status | Displays status in Discord | 'on/off' or '1/0' |
| discord_update_rate | Discord update rate | 0.500 - 5.000 |

### Sound

#### General settings

| Сommand | Command description | Command's argument |
---|---|---|
| snd_restart | Restart the sound engine | — |
| snd_cache_size | Cache size | 8 - 256 |
| snd_acceleration | APU resource utilization | 'on/off' or '1/0' |
| snd_targets | Maximum number of channels | 32 - 1024 |
| snd_device |  | OpenAL Soft |

#### Volume

| Сommand | Command description | Command's argument |
---|---|---|
| snd_volume_eff | Volume of sounds | 0.000 - 1.000 |
| snd_volume_music | Music volume | 0.000 - 1.000 |
| g_dynamic_music |  | 'on/off' or '1/0' |

#### Effects

| Сommand | Command description | Command's argument |
---|---|---|
| snd_efx | EAX sound effects | 'on/off' or '1/0' |

### Physics

| Сommand | Command description | Command's argument |
---|---|---|
| ph_gravity | Gravity | 0.000 - 1000.000 |
| ph_frequency | The more, the better the collision calculations | 50.0000 - 200.0000 |
| ph_iterations | Number of iterations to calculate the dynamics | 15 - 50 |

### Camera

| Сommand | Command description | Command's argument |
---|---|---|
| cam_inert | Camera inertia |  |
| cam_slide_inert |  |  |
| fov | FOV for camera |  |

### Graphics

#### General settings

| Сommand | Command description | Command's argument |
---|---|---|
| _preset | Selecting a set of quality settings | Minimum/Low/Default/High/Extreme	 |
| rs_screenmode | Resolution selection mode | Windowed/Fullscreen/Borderless/Windowed |
| rs_v_sync | Vertical Sync | 'on/off' or '1/0' |
| rs_refresh_60hz | Screen refresh rate 60 Hz | 'on/off' or '1/0' |

#### Renders

##### Common commands for all renders

| Сommand | Command description | Command's argument |
---|---|---|
| renderer | Render type (old) |  |
| rs_vis_distance | Visibility range | 0.400 - 1.500 |
| r__actor_shadow |  | 'on/off' or '1/0' |
| r__bloom_thresh |  |  |
| r__bloom_weight |  |  |
| r__clear_models_on_unload |  | 'on/off' or '1/0' |
| r__color_grading |  |  |
| r__detail_density |  | 0.040 - 1.000 |
| r__detail_height |  |  |
| r__detail_radius |  |  |
| r__dtex_range |  | 5.000 - 175.000 |
| r__enable_grass_shadow |  | 'on/off' or '1/0' |
| r__exposure |  | 0.500 - 4.000 |
| r__framelimit |  | 0 - 500 |
| r__gamma |  | 0.500 - 2.200 |
| r__geometry_lod |  | 0.100 - 1.500 |
| r__lens_flares | the "lens glow" effect |  |
| r__nightvision |  | 0 - 3 |
| r__no_ram_textures |  | 'on/off' or '1/0'off |
| r__no_scale_on_fade |  |  |
| r__optimize_dynamic_geom |  |  |
| r__optimize_shadow_geom |  |  |
| r__optimize_static_geom |  |  |
| r__saturation |  |  |
| r__supersample |  | 1 - 8 |
| r__tf_aniso |  |  |
| r__tf_mipbias |  |  |
| r__use_precompiled_shaders |  |  |
| r__wallmark_ttl | Wallmark Lifetime | 1.000 - 600.000 |
| r_screenshot_mode | Screenshot in the selected format | jpg/png/tga |

##### R1 (DX8)

| Сommand | Command description | Command's argument |
---|---|---|
| r1_detail_textures | Detailed textures on static lighting | 'on/off' or '1/0' |
| r1_dlights | Dynamic light sources on static lighting | 'on/off' or '1/0' |
| r1_dlights_clip |  |  |
| r1_fog_luminance |  |  |
| r1_glows_per_frame |  |  |
| r1_lmodel_lerp |  |  |
| r1_pps_u |  |  |
| r1_pps_v |  |  |
| r1_software_skinning |  |  |
| r1_ssa_lod_a |  |  |
| r1_ssa_lod_b |  |  |

##### R2 (DX9)

| Сommand | Command description | Command's argument |
---|---|---|
| r2_aa | "Pseudo-smoothing" on dynamic lighting | 'on/off' or '1/0' |
| r2_aa_break | Distance at which the "Pseudo-smoothing" effect works |  |
| r2_aa_kernel | The basic value of the "Pseudo-smoothing" effect |  |
| r2_aa_weight |  |  |
| r2_allow_r1_lights |  |  |
| r2_detail_bump |  |  |
| r2_dof |  |  |
| r2_dof_enable |  |  |
| r2_dof_radius |  |  |
| r2_dof_sky |  |  |
| r2_drops_control |  |  |
| r2_exp_donttest_shad |  |  |
| r2_gi | Global illumination | 'on/off' or '1/0' |
| r2_gi_clip | Global illumination effect range |  |
| r2_gi_depth | Shadow depth of the global illumination effect |  |
| r2_gi_photons | Number of rays to trace the global illumination effect |  |
| r2_gi_refl | Reflectivity of global illumination effect surfaces |  |
| r2_gloss_factor | Surface gloss level |  |
| r2_gloss_min |  |  |
| r2_ls_bloom_fast |  |  |
| r2_ls_bloom_kernel_b |  |  |
| r2_ls_bloom_kernel_g |  |  |
| r2_ls_bloom_kernel_scale |  |  |
| r2_ls_bloom_speed |  |  |
| r2_ls_bloom_threshold |  |  |
| r2_ls_depth_bias |  |  |
| r2_ls_depth_scale |  |  |
| r2_ls_dsm_kernel |  |  |
| r2_ls_psm_kernel |  |  |
| r2_ls_squality |  |  |
| r2_ls_ssm_kernel |  |  |
| r2_mask_control |  |  |
| r2_mblur | Blur effect in motion |  |
| r2_mblur_enabled |  |  |
| r2_parallax_h |  |  |
| r2_qsync |  |  |
| r2_shadow_cascede_old |  |  |
| r2_slight_fade |  |  |
| r2_smaa |  |  |
| r2_soft_particles | Soft particles | 'on/off' or '1/0' |
| r2_soft_water | Soft Water | 'on/off' or '1/0' |
| r2_ss_sunshafts_length |  |  |
| r2_ss_sunshafts_radius |  |  |
| r2_ssa_lod_a | Level of detail of dynamic objects |  |
| r2_ssa_lod_b | Level of detail of static objects |  |
| r2_ssao | Screen space ambient occlusion effect quality |  |
| r2_ssao_blur |  |  |
| r2_ssao_half_data |  |  |
| r2_ssao_hbao |  |  |
| r2_ssao_hdao |  |  |
| r2_ssao_mode |  |  |
| r2_ssao_opt_data |  |  |
| r2_steep_parallax |  |  |
| r2_sun | Shadows from the sun | 'on/off' or '1/0' |
| r2_sun_depth_far_bias |  |  |
| r2_sun_depth_far_scale |  |  |
| r2_sun_depth_near_bias |  |  |
| r2_sun_depth_near_scale |  |  |
| r2_sun_details | Shadows of grass and other detailed objects | 'on/off' or '1/0' |
| r2_sun_far |  |  |
| r2_sun_focus |  |  |
| r2_sun_lumscale |  |  |
| r2_sun_lumscale_amb |  |  |
| r2_sun_lumscale_hemi |  |  |
| r2_sun_near |  |  |
| r2_sun_near_border |  |  |
| r2_sun_quality |  |  |
| r2_sun_tsm |  |  |
| r2_sun_tsm_bias |  |  |
| r2_sun_tsm_proj |  |  |
| r2_sunshafts_min |  |  |
| r2_sunshafts_mode |  |  |
| r2_sunshafts_quality | Quality of the sun's rays |  |
| r2_sunshafts_value |  |  |
| r2_terrain_z_prepass |  |  |
| r2_tnmp_a |  |  |
| r2_tnmp_b |  |  |
| r2_tnmp_c |  |  |
| r2_tnmp_d |  |  |
| r2_tnmp_e |  |  |
| r2_tnmp_exposure |  |  |
| r2_tnmp_f |  |  |
| r2_tnmp_gamma |  |  |
| r2_tnmp_onoff |  |  |
| r2_tnmp_w |  |  |
| r2_tonemap |  |  |
| r2_tonemap_adaptation |  |  |
| r2_tonemap_amount |  |  |
| r2_tonemap_lowlum |  |  |
| r2_tonemap_middlegray |  |  |
| r2_volumetric_lights | Volumetric light | 'on/off' or '1/0' |
| r2_wait_sleep |  |  |
| r2_water_reflections |  |  |
| r2_zfill |  |  |
| r2_zfill_depth |  |  |
| r2_terrain_z_prepass | Switching the "Z-pass mode" |  |
| r2em |  |  |

##### R3 (DX10)

| Сommand | Command description | Command's argument |
---|---|---|
| r3_dynamic_wet_surfaces | Wet surfaces | 'on/off' or '1/0' |
| r3_dynamic_wet_surfaces_far |  |  |
| r3_dynamic_wet_surfaces_near |  |  |
| r3_dynamic_wet_surfaces_sm_res |  |  |
| r3_minmax_sm |  |  |
| r3_msaa |  |  |
| r3_msaa_alphatest |  |  |
| r3_use_dx10_1 | Enables use of DX10.1 | 'on/off' or '1/0' |
| r3_volumetric_smoke | Volumetric smoke | 'on/off' or '1/0' |

##### R4 (DX11)

| Сommand | Command description | Command's argument |
---|---|---|
| r4_enable_tessellation | Tessellation | 'on/off' or '1/0' |
| r4_wireframe | Displays the wireframe of dynamic models (not working) | 'on/off' or '1/0' |

#### Brightness-Contrast-Gamma

| Сommand | Command description | Command's argument |
---|---|---|
| rs_c_brightness | Brightness | 0.500 - 1.500 |
| rs_c_contrast | Contrast | 0.500 - 1.500 |
| rs_c_gamma | Gamma (not working) | 0.500 - 1.500 |

#### Video

| Сommand | Command description | Command's argument |
---|---|---|
| vid_mode | Screen resolution | 800x600/1024x768/1280x720/1280x1024/1366x768/1600x900/1680x1050/1920x1080 |
| vid_restart | Reboot the video engine | - |

#### Textures

| Сommand | Command description | Command's argument |
---|---|---|
| texture_lod | Texture detailing | 0 - 4 |

### AI

| Сommand | Command description | Command's argument |
---|---|---|
| ai_aim_max_angle |  |  |
| ai_aim_min_angle |  |  |
| ai_aim_min_speed |  |  |
| ai_aim_predict_time |  |  |
| ai_aim_use_smooth_aim |  |  |
| ai_die_in_anomaly | Enables NPCs to die in anomalies | 'on/off' or '1/0' |
| ai_use_old_vision |  |  |
| ai_use_torch_dynamic_lights | Enables the use of flashlights by non-player characters (NPCs) | 'on/off' or '1/0' |