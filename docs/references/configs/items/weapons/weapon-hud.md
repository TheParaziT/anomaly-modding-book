---
tags:
    - LTX
    - Weapon
title: Weapon HUD
---

# Weapon HUD

___

## About

1213

## General

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| item_visual | Weapon [hud model](../../../../../glossary#hud) | anomaly_weapons\wpn_akm\wpn_akm_hud.ogf | File path relative to the `gamedata\meshes` folder |
| attach_place_idx |  | 0 | 0 1 |
| zoom_hide_crosshair | Hide crosshair when aiming | true | `true` or `1` or `on` - Yes `false` or `0` or `off` - No |

## Custom UI

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| custom_ui_func | Loads a UI element via Lua script | tasks_measure.get_UI | Function reference |
| custom_ui_bone | Custom 3D UI bone | wpn_body | Bone name |
| custom_ui_pos | Custom 3D UI position | -0.0242,0.02947,-0.0219 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| custom_ui_rot | Custom 3D UI rotation | 0,90,0 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |

## Strafe

:::info
Strafe works when moving the character (WASD)
:::

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| strafe_enabled | Enabling HUD strafing | true | `true` or `1` or `on` - Yes `false` or `0` or `off` - No |
| strafe_hud_offset_pos | HUD offset position | 0,0.002,0 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| strafe_hud_offset_rot | HUD offset rotation | 1,-0.75,4.5 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |
| strafe_hud_offset_pos_16x9 | HUD offset position for 16x9 | 0,0.0023,0 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| strafe_hud_offset_rot_16x9 | HUD offset rotation for 16x9 | 1,-1,5 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |
| strafe_aim_enabled | Enabling HUD strafing in aiming | true | `true` or `1` or `on` - Yes `false` or `0` or `off` - No |
| strafe_aim_hud_offset_pos | HUD position in aiming | 0,0.002,0 |  X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| strafe_aim_hud_offset_rot | HUD rotation while aiming | 0,-0.3,1.25 |  X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |
| strafe_aim_hud_offset_pos_16x9 | HUD position while aiming 16x9 | 0,0.0023,0 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| strafe_aim_hud_offset_rot_16x9 | HUD rotation while aiming 16x9 | 0,-0.5,1.75 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |
| strafe_transition_time | time to return to the original weapon position | 0.75 |  |
| strafe_aim_transition_time | time to return to the original weapon position | 0.35 |  |
| strafe_cam_limit_aim_factor |  | 0.9 |  |
| strafe_cam_min_angle |  | 0 |  |

## Inertia

:::info
Inertia works when moving the mouse
:::

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| inertion_min_angle_aim |  | 0 |  |
| inertion_offset_LRUD | Inertia offset | 0.011, 0.011, 0.01, 0.005 | L --- (`-`) left / (`+`) right R --- (`-`) right / (`+`) left U --- (`-`) up / (`+`) down D --- (`-`) down / (`+`) up |
| inertion_offset_LRUD_aim | HUD inertia when aim | 0.011, 0.011, 0.01, 0.005 | L --- (`-`) left / (`+`) right R --- (`-`) right / (`+`) left U --- (`-`) up / (`+`) down D --- (`-`) down / (`+`) up |

## Visual recoil

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| shooting_hud_effect | Enable Visual Recoil | true | `true` or `1` or `on` - Yes `false` or `0` or `off` - No |
| shooting_max_LRUD | Maximum LRUD position when firing | 0.005,0.005,0.005,0 | L --- (`-`) left / (`+`) right R --- (`-`) right / (`+`) left U --- (`-`) up / (`+`) down D --- (`-`) down / (`+`) up |
| shooting_max_LRUD_aim | Maximum LRUD position when firing while aim | 0.0025,0.0025,0,0 | L --- (`-`) left / (`+`) right R --- (`-`) right / (`+`) left U --- (`-`) up / (`+`) down D --- (`-`) down / (`+`) up |
| shooting_backward_offset |  | 0.02,0.015 |  |
| shooting_ret_speed | time to return to the original weapon position | 7.5 |  |
| shooting_ret_aim_speed | time to return to the original weapon position | 15 |  |
| shooting_min_LRUD_power |  | 0.01 |  |

## Collision

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| nearwall_dist_min | Minimum distance at which the collision work |  |  |
| nearwall_dist_max | Maximum distance at which the collision work |  |  |
| nearwall_target_hud_fov | How much is the maximal shift of the hud fov |  |  |
| nearwall_speed_mod | Shift speed |  |  |

## Movement layers

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| movement_layer_0 | aim walk | movement\aim_walk.anm | File path and animation name |
| movement_layer_1 | aim crouch | movement\aim_walk.anm | File path and animation name |
| movement_layer_2 | crouch | movement\newwalk.anm | File path and animation name |
| movement_layer_3 | walk | movement\newwalk.anm | File path and animation name |
| movement_layer_4 | run | movement\newwalk.anm | File path and animation name |
| movement_layer_5 | sprint | movement\newrunreload.anm | File path and animation name |

## Empty click animation

:::info
Weapon animation parameters when attempting to shoot with an empty magazine
:::

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| empty_click_anm | Weapon animation when attempting to shoot with an empty magazine | script\misfire.anm | File path and animation name |
| empty_click_anm_speed | Animation speed | 2 | - |
| empty_click_anm_power | Animation power | 1 | - |

## Item position and rotation

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| item_position | Item (Weapon) position in relation to the arms | 0, 0, 0 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| item_orientation | Item (Weapon) orientation in relation to the arms | 0, 0, 0 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |

## HUD position and rotation

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| hands_position | HUD position | -0.072, -0.15, 0.1 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| hands_position_16x9 | HUD position for 16x9 monitors | -0.072, -0.15, 0.1 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| hands_orientation | HUD orientation | 0.55, 2.39, 0.15 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |
| hands_orientation_16x9 | HUD orientation for 16x9 monitors | 0.55, 2.39, 0.15 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |

## HUD aiming position and rotation

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| aim_hud_offset_pos |  | -0.0818, 0.05494, -0.25 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| aim_hud_offset_pos_16x9 |  | -0.0818, 0.05494, -0.25 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| aim_hud_offset_rot |  | 0.0407, 0.00886, -0.00495 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |
| aim_hud_offset_rot_16x9 |  | 0.0407, 0.00886, -0.00495 |  X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |

## UGL position and rotation

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| gl_hud_offset_pos |  | -0.0491, 0.005, -0.155 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| gl_hud_offset_pos_16x9 |  | -0.0491, 0.005, -0.155 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| gl_hud_offset_rot |  | -0.067, 0.0063, -0.02 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |
| gl_hud_offset_rot_16x9 |  | -0.067, 0.0063, -0.02 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |

## Lowered state

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| safemode_anm | Weapon animation when weapon goes to safe mode | script\to_lower.anm | Path and animation name |
| safemode_anm_speed | Animation speed | 1.2 |  |
| safemode_anm_power | Animation power | 1 |  |
| safemode_anm2 | Weapon animation when weapon comes out of safe mode | script\from_lower.anm | Path and animation name |
| safemode_anm_speed2 | Animation speed | 1.3 |  |
| safemode_anm_power2 | Animation power | 0.6 |  |
| lowered_hud_offset_pos |  | 0, 0, 0 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| lowered_hud_offset_rot |  | 0, 0, 0 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |
| lowered_hud_offset_pos_16x9 |  | 0, 0, 0 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| lowered_hud_offset_rot_16x9 |  | 0, 0, 0 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |

## Leaning state

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| lean_hud_offset_pos |  | 0, 0, 0 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| lean_hud_offset_rot |  | 0, 0, 0 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |
| lean_hud_offset_pos_16x9 |  | 0, 0, 0 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| lean_hud_offset_rot_16x9 |  | 0, 0, 0 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |

## Alternative aiming position and rotation

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| aim_hud_offset_alt_pos |  | 0, 0, 0 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| aim_hud_offset_alt_rot |  | 0, 0, 0 | X --- (`+`) yaw left / (`-`) yaw right Y --- (`+`) pitch up / (`-`) pitch down Z --- (`-`) roll right / (`+`) roll left |
| scope_zoom_factor_alt |  |  |  |

## Shell

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| shell_bone | bone which will be considered the origin of coordinates for the shell sprite in 1st person view | wpn_body | Bone name |
| shell_dir | the offset parameter of the shells after departure, in 1st person view | 0, 1, 0 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| shell_point | Coordinates of the bullets ejection point in 1st person view | 0, 0.064, 0.19 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |

## Particles

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| fire_bone |  | wpn_body | Bone name |
| fire_bone2 |  | wpn_body | Bone name |
| fire_point |  | 0, 0.051841, 0.535482 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |
| fire_point2 |  | 0, -0.011, 0.553 | X --- (`-`) left / (`+`) right Y --- (`+`) up / (`-`) down Z --- (`-`) forward / (`+`) backward |

## Camera

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| freeelook_z_offset_mul | Camera displacement along the z-axis when the camera moves freely | 0.4 | Z --- (`-`) forward / (`+`) backward |
| camera_move_epsilon |  |  |  |
| disp_min |  |  |  |
| speed_min |  |  |  |
| zoom_aim_disp_k |  |  |  |
| zoom_aim_speed_k |  |  |  |
| delta_time |  |  |  |
| cam_return_stop |  |  |  |
| zoom_rotate_time_k |  |  |  |
| hud_fov_addition_modifier |  |  |  |

## Sources

[Source](https://modfaq.ru/%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B_%D0%BE%D1%80%D1%83%D0%B6%D0%B8%D1%8F)
