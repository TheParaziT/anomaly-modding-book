---
tags:
    - Unfinished
title: SM_BURER (Burer)
draft: false
---

# SM_BURER (Burer)

___

:::warning
This article is under construction
:::

## Sounds

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| sound_tele_hold |  | monsters\burer\burer_tele_hold |  |
| sound_tele_throw |  | monsters\burer\burer_tele_throw |  |
| sound_gravi_wave |  |  |  |
| sound_tele_attack |  |  |  |
| scan_sound |  | monsters\burer\burer_scan_affect_0 |  |

## Abilitys

### Shield

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| shield_cooldown |  | 3000 |  |
| shield_time |  | 3000 |  |
| shield_keep_particle |  | artefact\af_thermal_hide |  |
| shield_keep_particle_period |  | 300 |  |
| Particle_Shield |  | artefact\af_thermal_hide |  |

### Anti-aim

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| anti_aim_timeout |  | 2 | sec |
| anti_aim_effectors |  | effector_monster_hit_1, effector_monster_hit_2, effector_monster_hit_3, effector_monster_hit_4 |  |
| anti_aim_animation |  | stand_stamina_attack_ |  |
| anti_aim_max_angle |  | 0.3 |  |
| anti_aim_detection_gain_speed |  | 10 |  |
| anti_aim_detection_loose_speed |  | 0.1 |  |
| weapon_drop_velocity |  | 8 |  |
| weapon_drop_stamina_k |  | 0.6 | IF player stamina < stamina_hit \* inv_weight(weapon param) * weapon_drop_stamina_k THEN weapon is dropped |
| weight_to_stamina_hit |  | 0.11 | kg to stamina % |

### Gravi

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| Gravi_Cooldown |  | 6840 | milliseconds |
| Gravi_MinDist |  | 1 | meter |
| Gravi_MaxDist |  | 18 | meter |
| Gravi_Speed |  | 33 | meter/sec |
| Gravi_Step |  | 2 | meter |
| Gravi_Time_To_Hold |  | 1940 | milliseconds |
| Gravi_Radius |  | 3.0 |  |
| Gravi_Impulse_To_Objects |  | 70.0 |  |
| Gravi_Impulse_To_Enemy |  | 330.0 |  |
| Gravi_Hit_Power |  | 0.61 |  |

### Tele

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| Tele_Max_Handled_Objects |  | 3 |  |
| Tele_Max_Time | max time to be in telekinesis | 6200 | s |
| Tele_Time_To_Hold |  | 340 |  |
| Tele_Object_Min_Mass |  | 10 |  |
| Tele_Object_Max_Mass |  | 1000.0 |  |
| Tele_Find_Radius |  | 25.0 |  |
| Tele_Min_Distance |  | 5 |  |
| Tele_Max_Distance |  | 60 |  |
| Tele_Raise_Speed |  | 7 |  |
| Tele_Fly_Velocity |  | 50 |  |
| Tele_Object_Height |  | 3 |  |

### Scanner

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| scan_critical_value | threshold value | 25.0 |  |
| scan_radius | scanning radius | 50.0 |  |
| scan_velocity_threshold | the boundary speed up to which the actor's movement is ignored | 4.0 |  |
| scan_decrease_value | decrease in the current amount per second | 0.3 |  |
| scan_trace_time_freq | speed trace frequency | 2 |  |
| scan_effector_section |  | m_burer_scan_effector |  |
