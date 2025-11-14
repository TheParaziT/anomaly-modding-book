---
tags:
    - Unfinished
title: SM_BLOOD (Bloodsucker)
draft: false
---

# SM_BLOOD (Bloodsucker)

___

:::warning
This article is under construction
:::

## Sounds

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| Sound_Growl | Growling sound | monsters\bloodsucker\sucker_growl_ |  |
| Sound_Alien |  | monsters\bloodsucker\sucker_breath_ |  |
| Sound_Invisibility_Change_State | Sound of changing visibility | monsters\bloodsucker\invisible |  |
| Sound_Vampire_Grasp |  | monsters\bloodsucker\vampire_grasp |  |
| Sound_Vampire_Sucking | The sound of blood sucking | monsters\bloodsucker\vampire_sucking |  |
| Sound_Vampire_Hit | The sound of a hit | monsters\bloodsucker\vampire_hit |  |
| Sound_Vampire_StartHunt | The sound of the hunt beginning | monsters\bloodsucker\vampire_grasp |  |

## Velocities

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| Velocity_Invisible_Linear | Linear velocity in invisible mode | 5.0 |  |
| Velocity_Invisible_Angular | Angular velocity in invisible mode | 4.62 |  |

## Abilitys

### Invisible

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| is_no_fx | No visual effects flag |  |  |
| Particle_Invisible | Particle effect in invisibility | anomaly2\bloodsucker_shield |  |
| Particles_Invisible_Tracks |  | monsters\bloodsucker_step |  |
| Particles_Invisible_Tracks_Freq |  | 70 |  |
| Invisibility_BlinkTime |  | 300 |  |
| Invisibility_BlinkMicroInterval |  | 30 |  |
| Invisibility_EnergySpeed |  | 0.05 |  |
| full_visibility_radius |  | 5 |  |
| partial_visibility_radius |  | 9 |  |
| no_visibility_radius |  | 14 |  |
| visibility_state_change_min_delay |  | 1000 |  |

### Vampire

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| Vampire_Delay | Delay between attacks | 5000 |  |
| Vampire_Want_Speed | A vampire's “thirst” accumulation rate | 0.1 |  |
| Vampire_Wound | Vampire attack damage | 0.2 |  |
| Vampire_GainHealth | Restore health on a successful attack | 0.65 |  |
| Vampire_Sufficient_Hits | The right number of hits before attacking | 5 |  |
| Vampire_Distance | Attack distance | 1 |  |
| vampire_effector | Post-effect section for the vampire attack | m_bloodsucker_vampire_effector |  |

### Predator

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| Predator_Visual | Visual in invisibility | monsters\krovosos\krovosos_xray |  |
| collision_hit_off | Disables collision handling |  |  |
