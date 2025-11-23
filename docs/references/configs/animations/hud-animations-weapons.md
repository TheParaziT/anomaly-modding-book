---
tags:
    - Unfinished
title: Weapon HUD
draft: false
---

# Weapon HUD

___

:::tip[Formula]
animation parameter name = animation name (hands), animation name (weapon), playback speed
:::

:::info[Weapon Modes]
Weapon has two modes:
- Normal Mode - Standard bullet firing
- Underbarrel Grenade Launcher Mode - Mode with active Underbarrel Grenade Launcher (grenade firing)

Each of these states has unique configuration parameters (animations, HUD position, sounds, etc.).
:::

## Idle animations

| Parameter Name | Engine Class |Parameter Description |
|---|---|---|
| anm_idle |  | Idle animation |
| anm_idle_empty |  | Idle animation with empty magazine |
| anm_idle_g |  | Idle animation with underbarrel grenade launcher |
| anm_idle_empty_g |  | Idle animation with empty underbarrel grenade launcher |
| anm_idle_w_gl |  | Idle animation with active underbarrel grenade launcher |
| anm_idle_empty_w_gl |  | Idle animation with empty active underbarrel grenade launcher |
| anm_idle_aim_0 | WP_BM16 | Aiming idle animation with 0 bullets |
| anm_idle_aim_1 | WP_BM16 | Aiming idle animation with 1 bullets |
| anm_idle_aim_2 | WP_BM16 | Aiming idle animation with 2 bullets |
| anm_idle_aim |  | Aiming idle animation |
| anm_idle_aim_empty |  | Aiming idle animation with empty magazine |
| anm_idle_g_aim |  | Aiming idle animation with underbarrel grenade launcher |
| anm_idle_empty_g_aim |  | Aiming idle animation with empty underbarrel grenade launcher |
| anm_idle_w_gl_aim |  | Aiming idle animation with active underbarrel grenade launcher |
| anm_idle_empty_w_gl_aim |  | Aiming idle animation with empty active underbarrel grenade launcher |

## Motion animations

| Parameter Name | Engine Class |Parameter Description |
|---|---|---|
| anm_show_0 | WP_BM16 | Show animation with 0 bullets |
| anm_show_1 | WP_BM16 | Show animation with 1 bullets |
| anm_show_2 | WP_BM16 | Show animation with 2 bullets |
| anm_show |  | Show animation |
| anm_show_empty |  | Show animation with empty magazine |
| anm_show_g |  | Show animation with underbarrel grenade launcher |
| anm_show_empty_g |  | Show animation with empty underbarrel grenade launcher |
| anm_show_w_gl |  | Show animation with active underbarrel grenade launcher |
| anm_show_empty_w_gl |  | Show animation with empty active underbarrel grenade launcher |
| anm_idle_moving |  | Moving animation |
| anm_idle_moving_empty |  | Moving animation with empty magazine |
| anm_idle_aim_moving |  | Aiming moving animation |
| anm_idle_moving_0 | WP_BM16 | Moving animation with 0 bullets |
| anm_idle_moving_1 | WP_BM16 | Moving animation with 1 bullets |
| anm_idle_moving_2 | WP_BM16 | Moving animation with 2 bullets |
| anm_idle_moving_g |  | Moving animation with underbarrel grenade launcher |
| anm_idle_moving_empty_g |  | Moving animation with empty underbarrel grenade launcher |
| anm_idle_moving_g_aim |  | Aiming moving animation with underbarrel grenade launcher |
| anm_idle_moving_w_gl |  | Moving animation with active underbarrel grenade launcher |
| anm_idle_moving_empty_w_gl |  | Moving animation with active empty underbarrel grenade launcher |
| anm_idle_moving_w_gl_aim |  | Aiming moving animation with active underbarrel grenade launcher |
| anm_idle_moving_crouch |  | Crouch moving animation |
| anm_idle_moving_crouch_empty |  | Crouch moving animation with empty magazine |
| anm_idle_aim_moving_crouch |  | Aiming crouch moving animation |
| anm_idle_moving_crouch_empty_g |  | Crouch moving animation with empty underbarrel grenade launcher |
| anm_idle_moving_crouch_empty_w_gl |  | Crouch moving animation with active empty underbarrel grenade launcher |
| anm_idle_moving_crouch_g_aim |  | Aiming crouch moving animation with underbarrel grenade launcher |
| anm_idle_moving_crouch_w_gl_aim |  | Aiming crouch moving animation with active underbarrel grenade launcher |
| anm_idle_sprint_0 | WP_BM16 | Sprint moving animation with 0 bullets |
| anm_idle_sprint_1 | WP_BM16 | Sprint moving animation with 1 bullets |
| anm_idle_sprint_2 | WP_BM16 | Sprint moving animation with 2 bullets |
| anm_idle_sprint |  | Sprint moving animation |
| anm_idle_sprint_empty |  | Sprint moving animation with empty magazine |
| anm_idle_sprint_g |  | Sprint moving animation with underbarrel grenade launcher |
| anm_idle_sprint_empty_g |  | Sprint moving animation with empty underbarrel grenade launcher |
| anm_idle_sprint_w_gl |  | Sprint moving animation with active underbarrel grenade launcher |
| anm_idle_sprint_empty_w_gl |  | Sprint moving animation with active empty underbarrel grenade launcher |
| anm_bore_0 | WP_BM16 | Boredom animation with 0 bullets |
| anm_bore_1 | WP_BM16 | Boredom animation with 1 bullets |
| anm_bore_2 | WP_BM16 | Boredom animation with 2 bullets |
| anm_bore |  | Boredom animation |
| anm_bore_empty |  | Boredom animation with empty magazine |
| anm_bore_g |  | Boredom animation with underbarrel grenade launcher |
| anm_bore_empty_g |  | Boredom animation with empty underbarrel grenade launcher |
| anm_bore_w_gl |  | Boredom animation with active underbarrel grenade launcher |
| anm_bore_empty_w_gl |  | Boredom animation with active empty underbarrel grenade launcher |
| anm_hide_0 | WP_BM16 | Hiding animation with 0 bullets |
| anm_hide_1 | WP_BM16 | Hiding animation with 1 bullets |
| anm_hide_2 | WP_BM16 | Hiding animation with 2 bullets |
| anm_hide |  | Hiding animation |
| anm_hide_empty |  | Hiding animation with empty magazine |
| anm_hide_g |  | Hiding animation with underbarrel grenade launcher |
| anm_hide_empty_g |  | Hiding animation with empty underbarrel grenade launcher |
| anm_hide_w_gl |  | Hiding animation with active underbarrel grenade launcher |
| anm_hide_empty_w_gl |  | Hiding animation with active empty underbarrel grenade launcher |

## Weapon animations

| Parameter Name | Engine Class |Parameter Description |
|---|---|---|
| anm_open | WP_RG6 WP_ASHTG |  |
| anm_add_cartridge | WP_RG6 |  |
| anm_close | WP_RG6 |  |
| anm_close_empty | WP_RG6 |  |
| anm_reload_1 | WP_BM16 CWeaponRevolver | Reload animation with 1 bullets |
| anm_reload_2 | WP_BM16 CWeaponRevolver | Reload animation with 2 bullets |
| anm_reload_3 | CWeaponRevolver | Reload animation with 3 bullets |
| anm_reload_4 | CWeaponRevolver | Reload animation with 4 bullets |
| anm_reload_5 | CWeaponRevolver | Reload animation with 5 bullets |
| anm_reload |  | Partial reload animation |
| anm_reload_empty |  | Full reload animation |
| anm_reload_g |  | Underbarrel grenade launcher reload animation |
| anm_reload_w_gl |  | Partial reload animation with attached underbarrel grenade launcher |
| anm_reload_empty_w_gl |  | Full reload animation with attached underbarrel grenade launcher |
| anm_reload_misfire |  | Jam clearing animation |
| anm_reload_misfire_w_gl |  | Jam clearing animation with attached underbarrel grenade |
| anm_attack |  | Primary melee attack animation |
| anm_attack2 |  | Secondary melee attack animation |
| anm_shots |  | Standard firing animation |
| anm_shot_l |  | Last shot animation |
| anm_shot_g_l |  | Last shot animation with attached underbarrel grenade launcher |
| anm_shots_g |  | Underbarrel grenade launcher firing animation |
| anm_shots_w_gl |  | Standard firing animation with attached underbarrel grenade launcher |
| anm_shot_w_gl_l |  | Last shot animation with active underbarrel grenade launcher mode |
| anm_shot_1 | WP_BM16 | Shot animation with 1 bullets |
| anm_shot_2 | WP_BM16 | Shot animation with 2 bullets |
| anm_switch_mode |  | Firemode switch animation |
| anm_switch_mode_empty |  | Firemode switch animation with empty magazine |
| anm_switch |  | Switching animation from normal mode to underbarrel grenade launcher mode |
| anm_switch_empty |  | Switching animation from normal mode with empty magazine to underbarrel grenade launcher mode |
| anm_switch_g |  | Switching animation from underbarrel grenade launcher mode to normal mode |
| anm_switch_g_empty |  | Switching animation from underbarrel grenade launcher mode to normal mode with empty magazine |
