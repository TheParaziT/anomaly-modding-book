---
tags:
    - Console Commands
description: AI Console Commands
title: AI
preview: /docs/references/engine/console-commands/assets/images/console-commands-preview.png
---

# AI

___

## Release build

| Command | Command description | Command's argument |
|---|---|---|
| ai_aim_max_angle | The maximum angle at which the angular velocity of the character when aiming is calculated by the formula | 0.000 - 31.416 |
| ai_aim_min_angle | The minimum angle at which the angular velocity of the character when aiming is calculated by the formula | 0.000 - 31.416 |
| ai_aim_min_speed | Minimum angular velocity of the character when aiming at a target | 0.000 - 31.416 |
| ai_aim_predict_time | Time of the character's prediction of a change in target position | 0.000 - 10.000 |
| ai_aim_use_smooth_aim |  | 'on/off' or '1/0' |
| ai_die_in_anomaly | Enables NPCs to die in anomalies | 'on/off' or '1/0' |
| ai_use_old_vision | Includes the old model of virtual character vision, in which random points on the surface of an ellipsoid inscribed into an axially oriented rectangular parallelepiped described around the object were taken to determine the visibility of the object. | 'on/off' or '1/0' |
| ai_use_torch_dynamic_lights | Enables the use of flashlights by non-player characters (NPCs) | 'on/off' or '1/0' |

## Debug build

| Command | Command description | Command's argument | Note |
|---|---|---|---|
| al_path |  |  | - |
| al_time_factor |  |  | - |
| al_switch_distance |  |  | - |
| al_switch_factor |  |  | - |
| al_process_time |  |  |  |
| al_objects_per_update |  |  |  |
| mt_ai_vision |  |  | - |
| mt_level_path |  |  | - |
| mt_detail_path |  |  | - |
| mt_object_handler |  |  | - |
| mt_sound_player |  |  | - |
| mt_bullets |  |  | - |
| mt_script_gc |  |  | - |
| mt_level_sounds |  |  | - |
| mt_alife |  |  | - |
| mt_map |  |  | - |
| ai_obstacles_avoiding |  |  | - |
| ai_obstacles_avoiding_static |  |  | - |
| ai_use_smart_covers |  |  | - |
| ai_use_smart_covers_animation_slots |  |  | - |
| ai_smart_factor |  | 0.0 - 1000000.0 | - |
| al_switch_distance | Sets the distance of A-life switch to online.  |  |  |
| ai_dbg_lua |  |  | - |
| ai_debug |  |  | - |
| ai_dbg_brain |  |  | - |
| ai_dbg_motion |  |  | - |
| ai_dbg_frustum |  |  | - |
| ai_dbg_funcs |  |  | - |
| ai_dbg_alife |  |  | - |
| ai_dbg_goap |  |  | - |
| ai_dbg_goap_script |  |  | - |
| ai_dbg_goap_object |  |  | - |
| ai_dbg_cover |  |  | - |
| ai_dbg_anim |  |  | - |
| ai_dbg_vision |  |  | - |
| ai_dbg_monster |  |  | - |
| ai_dbg_stalker |  |  | - |
| ai_stats |  |  | - |
| ai_dbg_destroy |  |  | - |
| ai_dbg_serialize |  |  | - |
| ai_dbg_dialogs |  |  | - |
| ai_dbg_infoportion | A debugging command to help track how NPCs in the game gain and lose Info Portions | 'on/off' or '1/0' | - |
| ai_draw_game_graph |  |  | - |
| ai_draw_game_graph_stalkers |  |  | - |
| ai_draw_game_graph_object |  |  | - |
| ai_draw_game_graph_real_pos |  |  | - |
| ai_nil_object_access |  |  | - |
| ai_draw_visibility_rays |  |  | - |
| ai_animation_stats |  |  | - |
| ai_debug_doors |  |  | - |
| ai_smart_factor | Sets how much stalkers want to take cover. |  |  |
| ai_smart_cover_animation_speed_factor |  |  | - |
| air_resistance_epsilon |  |  | - |
| ai_dbg_sight |  |  | - |
| ai_ignore_actor | All the AI in the game doesn't notice the actor |  | - |
