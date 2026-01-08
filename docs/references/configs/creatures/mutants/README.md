---
tags:
    - Unfinished
title: General Mutant Configs
draft: false
---

# m_*mutant*.ltx

___

:::warning
This article is under construction
:::

## General

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| GroupControlSection |  | spawn_group |  |
| SpaceRestrictionSection |  | space_restrictor zone_mosquito_bald zone_witches_galantine zone_burning_fuzz1 zone_mincer zone_gravi_zone |  |
| $spawn |  | "monsters\bloodsuckers\bloodsucker_base" |  |
| $npc |  | on |  |
| $prefetch | Preload order | 16 |  |
| visual | Model of a living mutant | monsters\krovosos\krovosos |  |
| corpse_visual | Dead mutant model | monsters\krovosos\krovosos_dead |  |
| destroyed_vis_name | visual, what remains when destroying a monster in an anomaly |  |  |
| cform | parameter for dynamic objects; necessary for correct creation of the skeleton model | skeleton | skeleton |
| class | engine mutant class | SM_BLOOD | SM_BLOOD -  |
| script_binding  |  | bind_monster.bind |  |
| rank |  | 16 |  |
| spec_rank | Monster rank displayed in statistics | normal |  |
| community | What type of monster belongs to | bloodsucker | Taken from game_relations.ltx |
| species | biological species | bloodsucker |  |
| monster_type |  |  | indoor outdoor |
| can_spawn_phantom | Can spawn phantoms | true | `true` or `1` or `on` - Yes `false` or `0` or `off` - No |
| spawn_phantom |  | m_phantom_bloodsucker |  |
| killer_clsids | Game classes of objects from which a mutant can die in offline | Z_MINCER Z_GALANT ZS_BFUZZ ZS_MBALD ZS_GALAN ZS_MINCE |  |
| material | Mutant material | creatures\medium | Unused |
| selector_approach |  |  |  |
| terrain |  | bloodsucker_terrain |  |
| step_params | Step parameters | m_bloodsucker_step_params |  |
| LegsCount | Legs count | 2 |  |

## AI

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| berserk_always |  | true | `true` or `1` or `on` - Yes `false` or `0` or `off` - No |
| DayTime_Begin | Beginning of a mutant's day | 22 | Game Time |
| DayTime_End | End of a mutant's day | 5 | Game Time |
| Min_Satiety | Minimum hunger value | 0.000055 |  |
| Max_Satiety | Maximum hunger value | 0.9 |  |
| ef_creature_type | Mutant AI type | 13 | -1 - <abbr title="Unconfirmed">No AI?</abbr> 1 - ? 2 - Rat 3 - Zombie 4 - <abbr title="Unconfirmed">Zombified Man?</abbr> 5 - Poltergeist 6 - Blind Dog 7 - Flesh 8 - ? 9 - ? 10 - ? 11 - Boar 12 - Controller 13 - Bloodsucker 14 - <abbr title="Unconfirmed">Soldier?</abbr> 15 - ? 16 - <abbr title="Unconfirmed">Military Stalker?</abbr> 17 - Stalker 18 - Burer 19 - Psevdogiant 20 - Chimera 21 - Fracture |
| ef_weapon_type |  | 2 |  |
| ef_detector_type | Type of detector used | 1 | 1 - no detector 2 - simple detector 3 - visual detector |
| panic_threshold  | The threshold below which there will be panic | 0.01 |  |
| weapon_usage | <abbr title="Unconfirmed">Ability to use weapons(?)</abbr> | 0 |  |
| Scheduled |  | on |  |
| Human |  | off |  |
| Health | Amount of lives in offline | 700 |  |
| MinSpeed | Minimum speed to move in offline | 2.0 |  |
| MaxSpeed | Maximum speed to move in offline | 4.5 |  |
| going_speed |  | 3.0 |  |
| current_level_going_speed |  | 3.0 |  |
| search_speed |  |  |  |
| smart_terrain_choose_interval |  | 00:15:00 |  |

### Feels

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| feel_enemy_who_just_hit_max_distance | Maximum distance of feeling hit by the enemy |  |  |
| feel_enemy_max_distance | Maximum enemy feeling distance |  |  |
| max_hear_dist | Maximum hearing distance | 60 |  |
| feel_enemy_who_made_sound_max_distance | Maximum distance of feeling the sound of the enemy |  |  |

### Group behavior

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| separate_factor | Separation power in the group (How far the monsters keep from each other) |  |  |
| separate_range | Separation radius (Minimum distance between allies) |  |  |

## Bones

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| bone_head  | Head bone | bip01_head | Bone name |
| bone_fire |  | bip01_head | Bone name |
| bone_eye_left | Left eye bone | bip01_ponytail1 | Bone name |
| bone_eye_right | Right eye bone | bip01_ponytail2 | Bone name |
| bone_spin |  | bip01_spine1 | Bone name |

## Inventory

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| icon | Inventory icon | ui_npc_monster_krovosos |  |
| Spawn_Inventory_Item_Section | What can be found during the search  | mutant_krovosos_jaw | Taken from the file monster_items.ltx |
| Spawn_Inventory_Item_Probability | The chance of a body part falling out  | 0.0 | if you set it to 1.0, it will always fall out. If set to 2.0, two pieces will fall out |

## Aura

### Fire

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| fire_max_distance |  | 0 |  |
| fire_max_power |  | 5 |  |
| fire_linear_factor |  | 0 |  |
| fire_quadratic_factor |  | 0.025 |  |

### Psy

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| psy_max_distance |  | 0 |  |
| psy_max_power |  | 5 |  |
| psy_linear_factor |  | 0.05 |  |
| psy_quadratic_factor |  | 0 |  |

### Radiation

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| radiation_max_distance |  | 0 |  |
| radiation_max_power |  | 0.01 |  |
| radiation_linear_factor |  | 1 |  |
| radiation_quadratic_factor |  | 1 |  |
| radiation_pp_effector_name |  | postprocess_rad |  |
| radiation_pp_highest_at |  | 0.02 |  |

## Physics

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| ph_box0_center |  | 0.0,  0.9,  0.0 |  |
| ph_box0_size |  | 0.35, 0.9,  0.35 |  |
| ph_box1_center |  | 0.0,  0.6,  0.0 |  |
| ph_box1_size |  | 0.40, 0.6,  0.40 |  |
| ph_foot_size |  | 0.20, 0.23, 0.20 |  |
| ph_crash_speed_min |  | 100 |  |
| ph_crash_speed_max |  | 200 |  |
| ph_collision_damage_factor |  | 0.1 |  |
| ph_mass |  | 150 |  |
| ph_skeleton_airr_lin_factor |  | 2.0 |  |
| ph_skeleton_airr_ang_factor |  | 0.0 |  |
| ph_skeleton_hinger_factor1 |  | 1.0 |  |
| ph_skeleton_ddelay | Time of change in the value of friction in the joint since the creation of the shell | 15.0 |  |
| ph_skel_fatal_impulse_factor |  | 12.0 |  |
| ph_after_death_velocity_factor |  | 0.75 |  |
| ph_skel_shot_up_factor |  | 0.25 |  |

## Movement

### Velocities

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| Velocity_Stand |  |  |  |
| Velocity_RunFwdNormal | Running speed |  |  |
| Velocity_RunFwdDamaged | Running speed when wounded |  |  |
| Velocity_WalkFwdNormal | Walking velocity |  |  |
| Velocity_WalkFwdDamaged | Walking velocity when wounded |  |  |
| Velocity_Drag | Velocity when dragging an object |  |  |
| Velocity_Steal | Sneak velocity |  |  |

### Accelerations

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| Accel_Generic | Total mutant speed | 1.5 |  |
| Accel_Calm | Mutant acceleration in calm state | 2.5 |  |
| Accel_Aggressive | Mutant acceleration in aggressive state | 20.0 |  |

## Attack

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| MinAttackDist | Minimum attack distance | 2.0 |  |
| MaxAttackDist | Maximum attack distance | 2.8 |  |
| EffectDistance |  | 20.0 |  |
| hit_type | Type of damage to the target | wound |  |
| as_min_dist |  | 2.0 |  |
| as_step |  | 0.0 |  |
| Run_Attack_Dist |  | 3.5, 4.5 |  |
| Run_Attack_Delay |  | 1000, 3000 |  |
| attack_params |  | m_bloodsucker_attack_params |  |
| attack_effector |  | m_bloodsucker_attack_effector |  |
| Melee_Rotation_Factor | Angular velocity during melee | 2.0 |  |

### Attack on move

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| aom_enabled | Whether attack on the move is enabled | 1 | `true` or `1` or `on` - Yes `false` or `0` or `off` - No |
| aom_max_go_close_time | Maximum time to approach the target | 8.0 |  |
| aom_far_radius | Range to start the attack | 15.0 |  |
| aom_attack_radius | Attack radius | 3.0 |  |
| aom_update_side_period | Frequency of changing the side of attack | 1.5 |  |
| aom_prediction_factor | Target motion prediction factor | 1.2 |  |
| aom_prepare_radius | Attack preparation radius | 5.0 |  |
| aom_prepare_time | Preparation time before the attack | 5 |  |
| aom_animation_left | Left attack animation | stand_run_attack_left_ |  |
| aom_animation_right | Right attack animation | stand_run_attack_right_ |  |

## Entity condition

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| satiety_v | Rate of decrease in satiety over time | 0.0001 |  |
| radiation_v | Radiation reduction rate | 0.00001 |  |
| satiety_power_v | Increasing stamina with decreasing satiety | 0.005 |  |
| satiety_health_v | Increasing health with decreasing satiety | 0.001 |  |
| satiety_critical | The critical satiety value at which health begins to decrease |  |  |
| radiation_health_v | Reduced health when exposed to radiation | 0.0 |  |
| morale_v | Rate of Moral Restoration | 0.01 |  |
| health_hit_part | <abbr title="Unconfirmed">the percentage of the hit that goes to take away health?</abbr> | 1.0 |  |
| power_hit_part | <abbr title="Unconfirmed">the percentage of the hit that goes to take away power?</abbr> | 1.0 |  |
| psy_health_v | Speed of psy health recovery | 0.1 |  |
| health_restore_v | <abbr title="Unconfirmed">Restoring health over time?</abbr> | 0.0001 |  |
| immunities_sect | Mutant immunities section | bloodsucker_immunities |  |
| protections_sect | Section with protection parameters | bloodsucker_protections |  |
| bleeding_v | Blood loss at nominal wound per second | 0.008 |  |
| wound_incarnation_v | <abbr title="Unconfirmed">the steepness of the healing curve (what percentage of the wound remains after healing in a game second)?</abbr> | 0.02 |  |
| min_wound_size | Minimum value at which bleeding will start | 0.0226 |  |
| DamagedThreshold | The value at which the wound animation starts to play | 0.36 |  |

| skin_armor | Armor (damage resistance) |  |  |
| hit_fraction_monster | Damage modifier |  |  |

### Sleep

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| sleep_health | <abbr title="Unconfirmed">Restoring health when sleeping?</abbr> | 1.0 |  |
| sleep_power | Recovering strength when sleeping | 1.0 |  |
| sleep_satiety | Decreased strength when sleeping | 1.0 |  |
| sleep_radiation | damage from radiation while sleeping in a radioactive zone | 1.0 |  |
| sleep_psy_health | <abbr title="Unconfirmed">Restoring psi health when sleeping?</abbr> | 1.0 |  |

### Eat

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| eat_freq | bite frequency | 5.0 | Specified in seconds |
| eat_slice | increase in satiety at one bite | 0.05 |  |
| eat_slice_weight | reduction of food from a corpse in one bite | 10.0 |  |
| satiety_threshold | If the value is lower than specified, the monster becomes hungry | 0.8 |  |
| distance_to_corpse | Distance to corpse to start playing eating animation | 0.8 |  |

### Morale

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| Morale_Hit_Quant |  | 0.1 |  |
| Morale_Attack_Success_Quant | increase in morale during a successful attack | 0.1 |  |
| Morale_Take_Heart_Speed |  | 0.1 |  |
| Morale_Despondent_Speed |  | 0.01 |  |
| Morale_Stable_Speed |  | 0.01 |  |
| Morale_Despondent_Threashold |  | 0.5 |  |

## Sounds

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| sound_idle | Idle sound | monsters\bloodsucker\idle_ |  |
| sound_eat | sound of eating | monsters\bloodsucker\eat_ |  |
| sound_aggressive | sound of aggression | monsters\bloodsucker\sucker_breath_mix_ |  |
| sound_attack_hit | Sound of attack | monsters\bloodsucker\attack_hit_ |  |
| sound_take_damage | sound of taking damage | monsters\bloodsucker\hit_ |  |
| sound_die | Sound of death | monsters\bloodsucker\die_ |  |
| sound_panic | Sound of panic | monsters\bloodsucker\hit_ |  |
| sound_die_in_anomaly | Sound when dying in an anomaly |  |  |
| sound_distant_idle | <abbr title="Unconfirmed">The sound of idling in the distance?</abbr> | monsters\bloodsucker\die_ |  |
| distant_idle_sound_delay | Delay of idle distant sounds | 80000 |  |
| distant_idle_sound_range | Distance of distant idle sounds | 100.0 |  |
| idle_sound_delay | Delayed idle sounds | 95000 | 0 to N |
| eat_sound_delay | Delayed eating sounds | 3000 | 0 to N |
| attack_sound_delay | Delayed attack sounds | 1000 | 0 to N |
| SoundThreshold |  | 0.05 | range \[0 - 1] |

## Damages

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| damage | m_bloodsucker_damage |  |  |
| critical_wound_threshold | Critical wound threshold | -1 |  |
| critical_wound_decrease_quant |  | 0 |  |
| critical_wound_anim_head | Animation of a critical head wound | critical_hit_torso_0 |  |
| critical_wound_bones_head | Head bone section | bloodsucker_critical_wound_bones_head |  |
| critical_wound_anim_torso | Animation of a critical torso wound | critical_hit_torso_0 |  |
| critical_wound_bones_torso | Torso bone section | bloodsucker_critical_wound_bones_torso |  |
| critical_wound_anim_legs | Animation of a critical leg wound | critical_hit_torso_0 |  |
| critical_wound_bones_legs | Legs bone section | bloodsucker_critical_wound_bones_legs |  |

## Ability

Unique abilitys for mutants. Each mutant may have its own individual abilities, or none at all.

### Vision

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| eye_fov | Field of view | 180 |  |
| eye_range | Visibility range | 150 |  |
| DynamicObjectsCount | Determines how many objects the mutant can remember seeing | 32 |  |
| vision_free_section | Responsible for vision when the NPC is in a calm state | bloodsucker_vision_free |  |
| vision_danger_section | Responsible for vision when the NPC is in an alarmed state | bloodsucker_vision_danger |  |
| min_view_distance | Minimum visibility distance | 0.8 | coefficient, which is multiplied by eye_range, depending on the angle |
| max_view_distance | Maximum visibility distance | 1.0 | coefficient, which is multiplied by eye_range, depending on the angle |
| visibility_threshold | Value, when the sum is reached, the object is considered visible | 190.0 |  |
| always_visible_distance | Vision factor at which an NPC can see under all conditions, regardless of lighting and other parameters | 0.05 |  |
| time_quant | Used when calculating the visibility of one creature to another (the formula involves time, time quantum, illumination, speed of an object, and distance to it) | 0.0005 |  |
| decrease_value | Value by which the weight is reduced if the object is caught in the frustum, but is detached for some reason | 0.01 |  |
| velocity_factor | The higher the value, the faster we will be detected by NPCs when we move | 0.2 |  |
| luminocity_factor | light factor | 0.6 |  |
| transparency_threshold | The higher the value, the less you will be visible behind objects containing “transparent areas” such as bushes, reeds, etc. | 0.1 |  |

### Special Effectors

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| duality_h | Horizontal doubling | 0.08 |  |
| duality_v | Vertical doubling | 0.06 |  |
| gray | Discoloration | 0.5 |  |
| blur | Blurring | 0.71 |  |
| noise_intensity | Noise intensity | 0.5 |  |
| noise_grain | Noise granularity | 0.3 |  |
| noise_fps | Noise Frequency (FPS) | 30 |  |
| color_base | Base color (RGB) | 0.255, 0.0, 0.0 |  |
| color_gray | Color at discoloration (RGB) | 0.333, 0.333, 0.333 |  |
| color_add | Additive color (RGB) | 0,0,0 |  |
| time | Total effect time | 0.65 |  |
| time_attack | Effect build-up time | 0.1 |  |
| time_release | Effect decay time | 0.45 |  |
| ce_time | Camera shake time | 0.6 |  |
| ce_amplitude | Shaking amplitude | 10 |  |
| ce_period_number | Number of shaking periods | 1.0 |  |
| ce_power | Effect power | 2.0 |  |

### Anti-aim

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| anti_aim_effectors | Existence of effectors |  |  |
| anti_aim_animation | Dodge animation |  |  |

import DocCardList from '@theme/DocCardList';

<DocCardList />
