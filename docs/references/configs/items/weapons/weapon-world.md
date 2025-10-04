---
tags:
    - LTX
    - Weapon
title: Weapon World
---

# Weapon World

___

## About

Configuration parameters for weapons

___

### General

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| GroupControlSection |  | spawn_group |  |
| $npc | use NPC of this weapon | on | true - 1 - on (Yes) false - 0 - off (No) |
| $prefetch | Preload queue | 8 |  |
| $spawn | Weapon Directory in the Level Editor | "weapons\ak-74" | "weapons\ *wpn_name*" |
| scheduled | online/offline switch; Works only for "live" objects with AI | off | true - 1 - on (Yes) false - 0 - off (No) |
| cform | Skeleton model | skeleton | skeleton sphear box |
| parent_section |  | wpn_akm |  |
| class | Engine weapon class | WP_AK74 | WP_BINOC WP_KNIFE WP_BM16 WP_GROZA WP_SVD WP_AK74 WP_LR300 WP_HPSA WP_PM WP_RG6 WP_RPG7 WP_SHOTG WP_ASHTG WP_MAGAZ WP_SVU WP_USP45 WP_VAL WP_VINT WP_WALTH W_STMGUN |
| animation_slot | Animation slot number | 2 | 1 - pistol 2 - automatic rifle 3 - rifle, shotgun 4 - RPG 5 - knife 7 - bolt, grenade 8 - submachine gun with integrated underbarrel grenade launcher 9 - Shotgun 10 - Drum Gun 13 - binoculars |
| hand_dependence |  | 1 | 0 - no hands 1 - one hand 2 - two hands |
| single_handed | held with one hand | 0 | true - 1 - on (Yes) false - 0 - off (No) |
| default_to_ruck | whether the weapon will be moved to the backpack instead of the slot when picked up | false | true - 1 - on (Yes) false - 0 - off (No) |
| sprint_allowed | this line means that you can run with the weapon | true | true - 1 - on (Yes) false - 0 - off (No) |
| kind | The type of item to group into the appropriate section in the [Item Spawner](../../../../modding-tools/in-game-editors/item-spawner.md) | w_rifle | w_rifle w_misc w_explosive w_melee w_pistol w_smg w_shotgun w_sniper |
| cost | Base price | 28780 |  |
| hud | Section with parameters for [*_hud model](../../../../glossary/glossary.html#_hud-model) | wpn_akm_hud | Section name |
| visual | [*_world model](../../../../glossary/glossary.html#_world-model) | dynamics\weapons\wpn_akm\wpn_akm.ogf | Path to file |

### Position/Orientation

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| position | position of the weapon in the hands when viewed from the 3rd person | -0.026, -0.175, 0.0 | X -- (`-`) left / (`+`) right Y -- (`+`) up / (`-`) down Z -- (`-`) forward / (`+`) backward |
| orientation | how the weapon is rotated in the hands of the NPC and headgear, in the 3rd person view | 0, 0, 0 | X -- (`+`) left / (`-`) right Y -- (`+`) up / (`-`) down Z -- (`-`) roll to the right / (`+`) roll to the left |
| fire_point | coordinates of the fire particle from the shot, in the 3rd person view | 0, 0.218, 0.656 | X -- (`-`) left / (`+`) right Y -- (`+`) up / (`-`) down Z -- (`-`) forward / (`+`) backward |
| fire_point2 | Coordinates of the fire particle from the shot, when viewed from the 3rd person from the holster | 0, 0.161, 0.583 | X -- (`-`) left / (`+`) right Y -- (`+`) up / (`-`) down Z -- (`-`) forward / (`+`) backward |
| strap_bone0 | the name of the first NPC model bone where the weapon is located when hidden | bip01_spine2 | Bone Name |
| strap_bone1 | The name of the second NPC model bone that holds the weapon when hidden | bip01_spine1 | Bone Name |
| strap_position | the position of the weapon on the NPC's back, when viewed from the third person | -0.26, -0.11, 0.25 | X -- (`-`) left / (`+`) right Y -- (`+`) up / (`-`) down Z -- (`-`) forward / (`+`) backward |
| strap_orientation | how the weapon is rotated on the NPC's back in 3rd person view | -15, -9, 110 | X -- (`+`) left / (`-`) right Y -- (`+`) up / (`-`) down Z -- (`-`) roll to the right / (`+`) roll to the left |

### Inventory

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| icons_texture | texture where the weapon icon will be taken from | ui\ui_icon_spas |  |
| inv_grid_height | icon height | 2 | number of 50x50 pixels cells |
| inv_grid_width | icon width | 5 | number of 50x50 pixels cells |
| inv_grid_x | the coordinate of the upper left corner of the icon on a 50x50 pixel grid on the X axis | 35 | number of cells indented to the right |
| inv_grid_y | The coordinate of the upper left corner of the icon on a 50x50 pixel grid on the Y axis | 0 | number of cells indenting downward |
| inv_name | The name in the inventory | st_wpn_akm | Section name, in [*.xml](../../../file-formats/conf-script/xml.md) files included in the string_table section of `gamedata\configs\text\*localization*\st_items_weapons.xml` |
| inv_name_short | short name in the inventory | st_wpn_akm | Section name, in [*.xml](../../../file-formats/conf-script/xml.md) files included in the string_table section of `gamedata\configs\text\*localization*\st_items_weapons.xml` |
| inv_weight | the inventory weight of the unloaded weapon | 3.3 | The number is given in kilograms |
| description | Description in inventory | st_wpn_akm_descr | Section name, in [*.xml](../../../file-formats/conf-script/xml.md) files included in the string_table section of `gamedata\configs\text\*localization*\st_items_weapons.xml` |
| slot | Inventory slot number | 2 | 0 - knives1 - pistols2 - shotguns, machine guns, rifles, grenade launchers3 - grenades (may be crashing)4 - binoculars5 - bolts (may be crashing)6 - outfits (may be crashing) |
| highlight_equipped |  |  | true - 1 - on (Yes) false - 0 - off (No) |

### Multiplayer

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| weapon_class | is used exclusively for the purchase menu in multiplayer |  | shotgun assault_rifle sniper_rifle heavy_weapon |
| startup_ammo | startup amount of ammo in multiplayer | The number of rounds of ammunition is indicated |  |
| kill_msg_x | the coordinate of the upper left corner of the kill icon on the X axis |  |  |
| kill_msg_y | top-left corner coordinate of the kill icon on the Y axis |  |  |
| kill_msg_width | kill icon width |  | Specified in pixels |
| kill_msg_height | kill icon height |  | Specified in pixels |

### Particles

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| flame_particles | Gunshot fire particle | weapons\generic_weapon05 | Specifies the path to the file |
| smoke_particles | shot smoke particle | weapons\generic_shoot_00 | Specifies the path to the file |
| light_disabled | flash off when shot | false | true - 1 - on (Yes) false - 0 - off (No) |
| light_color | Parameters for changing the color of the shot fire particle | 0.6, 0.5, 0.3 | RGB Color |
| light_range | the radius of the fire partition from the shot | 5 |  |
| light_time | time of light playback when shot | 0.2 |  |
| light_var_color | Parameter of variation of the color of the fire particle from the shot | 0.05 | RGB Color |
| light_var_range | varies the radius of the fire particle from the shot | 0.5 | Value 60.0 = 10 seconds |

### Upgrades/repairs

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| upgrades |  | up_gr_firstab_akm, up_gr_seconab_akm, up_gr_thirdab_akm, up_gr_fourtab_akm, up_gr_fifthab_akm, up_gr_fifthcd_akm |  |
| installed_upgrades | installed upgrades |  |  |
| upgrade_scheme | upgrade_scheme | upgrade_scheme_ak74 |  |
| repair_type | item type for repair tools | rifle_7 | pistol shotgun rifle_5 rifle_7 |

#### Upgrades Icons

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| upgr_icon_x | X coordinate of the upper left corner of the weapon icon in the upgrade window | 300 | Specified in pixels |
| upgr_icon_y | Y coordinate of the upper left corner of the weapon icon in the upgrade window | 0 | Specified in pixels |
| upgr_icon_width | icon width in the upgrade window | 300 | Specified in pixels |
| upgr_icon_height | icon height in the upgrade window | 100 | Specified in pixels |

### Parameters of the weapon itself

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| fire_modes | Firing mode | 1, -1 | -1 - automatic 1 - single 2 - two-shot 3 - three-shot |
| wallmark_section | section of wallmarks that appear on the ground/geometry |  | Section name (by default it is in the system.ltx file) |
| wm_size | texture size of the mark left on the ground after the explosion |  | The bigger the number, the bigger the mark |
| allow_inertion | allow inertia |  | true - 1 - on (Yes) false - 0 - off (No) |
| ph_mass | Weight of the unloaded weapon for the physical engine | 4 | Kilograms |

#### Shot

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| hit_impulse | The force that the flying bullet transmits to the victim affects the ragdoll-body behavior | 34 | The more, the farther the body will fly away |
| hit_power | damage dealt | 0.58, 0.58, 0.58, 0.58 | Specifies a value for the level of difficulty in descending order, i.e. from master to beginner |
| hit_type | Type of damage inflicted; used to calculate damage; armor suits (and others) are set to be immune to each type of damage separately | fire_wound | burn light_burn shock strike wound - stabbing radiation telepatic fire_wound - fire damage chemical_burn explosion - shrapnel damage wound_2 - cutting |
| fire_distance | Effective range of the shot after which the bullet disappears | 900 | Specified in meters |
| bullet_speed | Initial bullet speed | 715 | Specified in meters per second |
| rpm | Rounds per minute | 600 | Specifies the number of shots per minute |
| rpm_mode_2 | Rounds per minute for burst mode |  | Specifies the number of shots per minute |
| rpm_anim_fix | New shot animation behavior | true | true - 1 - on (Yes) false - 0 - off (No) |
| rpm_empty_click | Misfire/empty magazine sound frequency | 200 |  |
| fire_dispersion_base | The dispersion (angle of the bullets) introduced by the weapon; affects accuracy; added to the `disp_base` in `actor.ltx` | 0.45 | Specified in degrees |
| PDM_disp_accel_factor | Multiplier by which `fire_dispersion_base` is multiplied when the protagonist runs | 2.5 | Specified in numbers |
| PDM_disp_base | Multiplier by which `fire_dispersion_base` is multiplied when the protagonist is standing at full height | 1.15 | Specified in numbers |
| PDM_disp_crouch | Multiplier by which `fire_dispersion_base` is multiplied when the protagonist goes crouched | 1.0 | Specified in numbers |
| PDM_disp_crouch_no_acc | Multiplier by which `fire_dispersion_base` is multiplied when the protagonist stands still in a crouch | 1.0 | Specified in numbers |
| PDM_disp_vel_factor | Multiplier by which `fire_dispersion_base` is multiplied when the protagonist spins a weapon or runs | 2.5 | Specified in numbers |

#### Ammo

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| ammo_class | ammo type for this weapon | ammo_7.62x39_fmj, ammo_7.62x39_fmj_bad, ammo_7.62x39_fmj_verybad, ammo_7.62x39_ap, ammo_7.62x39_ap_bad, ammo_7.62x39_ap_verybad | The names of the ammunition sections are indicated, separated by commas |
| ammo_elapsed | magazine capacity at the moment of spawning | 30 | indicate the value equal to ammo_mag_size |
| ammo_mag_size | ammunition capacity | 30 | The number of bullets is indicated |

### Particle shell parameters

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| shell_point | coordinates of the shell partylock, when viewed from the 3rd person | 0, 0.216, 0.174 | X -- left/+right, Y -- +up/down, Z -- forward/+backward |
| shell_dir | how the shell particle is rotated when viewed from the 3rd person | 0, 0, 0.4 | X -- left/+right, Y -- +up/down, Z -- forward/+backward |
| shell_particles | shell particle | weapons\762x39 | Particles file path relative to particles.xr |

### Scopes

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| scopes | Name of the gun sight section | 1p29, kobra, ps01 | Sections to models with these sights are indicated |
| scope_status | Scope status | 0 | 0 - not available 1 - built-in 2 - removable |
| scope_zoom_factor | scope magnification | 0 | For the sight specified in the parameter scopes, the value can already be more |
| scope_nightvision |  |  |  |
| scope_dynamic_zoom |  |  |  |
| scope_alive_detector |  |  |  |
| scope_texture |  |  |  |
| scope_texture_alt |  |  |  |

### Overheat

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| overheat_time_quant | Determines how quickly the weapon overheats when fired |  |  |
| overheat_decr_quant | Determines how fast the weapon cools down when not firing |  |  |
| overheat_threshold | Maximum allowable overheating level at which the weapon stops firing |  |  |
| overheat_particles | Indicates the particle effect that is played when overheating occurs |  |  |

### Silencer

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| silencer_name | Name of the silencer section of the gun | wpn_sil_pbs1 |  |
| silencer_status | silencer status | 2 | 0 - not available 1 - built-in 2 - removable |
| silencer_light_color | Parameters for changing the color of the particle of the smoke from the shot from the weapon with silencer | 0.6, 0.5, 0.3 |  |
| silencer_light_range | the radius of the particle of the haze when firing | 0.01 |  |
| silencer_light_time | light time | 0.2 |  |
| silencer_light_var_color | Parameter for varying the color of the particle of smoke from a shot from a weapon with silencer | 0.05 |  |
| silencer_light_var_range | variation of the radius of the particle of the smoke from the shot from the weapon with silencer | 0.5 |  |
| silencer_smoke_particles | particle smoke effect for a shot with silencer | weapons\generic_shoot_00 | Particles file path relative to particles.xr |
| silencer_x | the coordinates of the silencer icon superimposed on top of the weapon icon on the X coordinate | 235 | Specified in numbers |
| silencer_y | the coordinates of the silencer icon superimposed over the weapon icon in Y coordinate | 10 | Specified in numbers |

### Underbarrel Grenade Launcher

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| grenade_class | type of underbarrel grenades | ammo_vog-25, ammo_vog-25_bad, ammo_vog-25_verybad |  |
| grenade_launcher_name | name of the section of the underbarrel grenade launcher | wpn_addon_grenade_launcher |  |
| grenade_launcher_status | the status of the underbarrel grenade launcher | 0 | 0 - not available 1 - built-in 2 - removable |
| launch_speed | launch speed of the underbarrel grenade launcher | 0 |  |
| grenade_flame_particles | particle of the fire from the underbarrel grenade launcher | weapons\generic_weapon01 | Particles file path relative to particles.xr |
| grenade_launcher_x | grenade launcher icon coordinates superimposed over the weapon icon on the X coordinate | 127 | Specified in numbers |
| grenade_launcher_y | grenade_launcher icon coordinates superimposed over the weapon icon on the Y coordinate | 18 | Specified in numbers |
| gl_zoom_factor |  |  |  |

### Aiming

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| use_aim_bullet | A game mechanic in which the first bullet fired after drawing and aiming the weapon does more damage to certain limbs | false | true (Yes) - false (No) |
| time_to_aim | Time during which the use_aim_bullet parameter can be activated when aiming and drawing a weapon | 0.0 | Specified in seconds |
| zoom_dof |  | 0.5, 1.0, 180 |  |
| zoom_enabled | the ability to aim | true | true (Yes) - false (No) |
| zoom_rotate_time | the speed at which the weapon goes to the "aiming" state, in seconds | 0.25 | Specified in seconds |
| reload_dof |  | 0.0, 0.5, 5, 2 |  |
| control_inertion_factor | Usability; aka inertia; affects how easily the weapon can be controlled with the mouse | 1.0f |  |
| crosshair_inertion |  | 5.8 |  |

### Misfire

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| misfire_probability | misfire_probability | 0.005 | 0 - never jams 1 - always jams |
| misfire_start_condition | the wear at which there is a chance of misfire | 0.7 |  |
| misfire_start_prob | misfire chance of misfire when wear is greater than misfireStartCondition | 0.007 |  |
| misfire_end_condition | the chance of misfire when worn out is greater than misfireEndCondition | 0.05 |  |
| misfire_end_prob | wear rate at which the chance of misfire becomes constant | 0.11 |  |

### Condition

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| condition_queue_shot_dec | condition_shot_dec | 0.0008 |  |
| condition_shot_dec | increase wear on each shot | 0.0008 | 0 - no wear 1 - maximum wear |
| fire_dispersion_condition_factor | the effect of wear on the variance of the weapon as a percentage | 0.001 |  |

### Сamera

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| cam_return | Whether to return the camera to its original position | 0 | 1 or 0 |
| cam_relax_speed | camera return speed | 10 |  |
| cam_dispersion | angle increase with each shot | 0.762 |  |
| cam_dispersion_frac | barrel will rise by cam_dispersion*cam_dispersion_frac +- cam_dispersion*(1-cam_dispersion_frac) | 1.0 |  |
| cam_dispersion_inc | increase cam_dispersion with each shot | 0.0725 |  |
| cam_max_angle | maximum vertical recoil angle | 50.0 |  |
| cam_max_angle_horz | maximum horizontal recoil angle | 50.0 |  |
| cam_step_angle_horz | barrel shift horizontally during firing | 1.38 |  |

### Camera when aiming

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| zoom_cam_relax_speed | Similar to return speed of the camera in the aiming mode | 10 |  |
| zoom_cam_dispersion | Similar to cam_dispersion in the aiming mode | 0.732 |  |
| zoom_cam_dispersion_frac | Similar to cam_dispersion_frac in aiming mode | 0.7 |  |
| zoom_cam_dispersion_inc | Similar to cam_dispersion_inc in aiming mode | 0.0625 |  |
| zoom_cam_max_angle | Similar to cam_max_angle in aiming mode | 50.0 |  |
| zoom_cam_max_angle_horz | Similar to cam_max_angle_horz in aiming mode | 50.0 |  |
| zoom_cam_step_angle_horz | Similar to cam_step_angle_horz in aiming mode | 1.28 |  |

### AI

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| ef_main_weapon_type | NPC weapon type | 2 | 0 - pistol 1 -shotgun 2 - assault rifle 3 - rifle 4 - grenade launcher |
| ef_weapon_type | NPC fire mode | 8 | 5 - fire single shots 6 - fire in bursts 7 - aim and fire single shots 8 - aim and fire (sniper) 9 - grenade launcher |
| cam_relax_speed_ai | Determines the recovery (return) speed of the camera after recoil for NPCs (if not specified, cam_relax_speed is used) | 360 |  |
| zoom_cam_relax_speed_ai | Determines the speed of camera recovery (return) after recoil for NPCs in aiming mode (if not specified, cam_relax_speed_ai is used) | 360 |  |
| holder_fov_modifier | NPC angle of view multiplier (eye_fov) with this weapon | 1.0 | Specified in numbers |
| holder_range_modifier | NPC range multiplier (eye_range) with this weapon | 1.0 | Specified in numbers |
| min_radius |  |  |  |
| max_radius |  |  |  |
