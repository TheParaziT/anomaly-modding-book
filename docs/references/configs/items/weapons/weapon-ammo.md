---
tags:
    - LTX
    - Weapon
title: Weapon Ammo
draft: false
---

# Weapon Ammo

___

## About

## General

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| GroupControlSection |  | spawn_group |  |
| discovery_dependency |  |  |  |
| $spawn | Ammo directory in Level Editor | "weapons\ammo\ammo_11.43x23_hydro" |  |
| class | Engine ammo class | AMMO_S | AMMO_S S_VOG25 S_OG7B S_M209 |
| cform | Skeleton model | skeleton |  |
| visual | Ammo box world model  | dynamics\weapons\wpn_ammo\ammo_1143x23_fmj.ogf | Path to file |
| $prefetch | Preload queue | 64 |  |
| kind | Kind of item to group into the appropriate section in the Item Spawner | w_ammo |  |
| cost | Base price | 910 |  |
| box_size | Number of bullets in ammo box | 16 |  |

### Inventory

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| inv_name | Inventory name | ammo-11.43x23-fmj |  |
| inv_name_short | Inventory short name | ammo-11.43x23-fmj_s |  |
| inv_weight | Inventory weight | .29 |   |
| description | Inventory description | ammo-11.43x23-fmj_descr |  |
| inv_grid_width | icon width | 2 | number of 50x50 pixels cells |
| inv_grid_height | icon height | 1 | number of 50x50 pixels cells |
| inv_grid_x | the coordinate of the upper left corner of the icon on a 50x50 pixel grid on the X axis | 55 | number of cells indented to the right |
| inv_grid_y | The coordinate of the upper left corner of the icon on a 50x50 pixel grid on the Y axis | 11 | number of cells indenting downward |

### Ammo Coefficients

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| k_disp | Coefficient of accuracy of the bullet | 0.66 |  |
| k_impulse | Pulse coefficient transmitted to the ragdoll-body | 0.55 |  |
| k_ap |  | 0.1 |  |
| k_air_resistance | Bullet air resistance coefficient | 0.8 |  |
| k_hit | Bullet kill rate | 1.0 |  |
| k_bullet_speed | Bullet velocity coefficient | 1.15 |  |
| k_cam_dispersion | Camera dispersion coefficient | 1.0 |  |
| k_pierce | Penetration power of a bullet |  |  |
| k_dist | Range coefficient | 0.75 |  |

### Other

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| tracer_color_ID |  | 2 |  |
| wm_size | texture size of the mark left on the ground after the explosion | 0.072 | The bigger the number, the bigger the mark |
| impair | Barrel wear coefficient from the bullet | 1.4 |  |
| tier |  | 2 |  |
| buck_shot | Number of components in a bullet, e.g. fractions | 9 |  |
| tracer | Is the bullet a tracer | off | true - 1 - on (Yes) false - 0 - off (No) |
| 4to1_tracer | Will four tracers be combined into one | true | true - 1 - on (Yes) false - 0 - off (No) |
| explosive | Will there be an explosion when touched | false | true - 1 - on (Yes) false - 0 - off (No) |
| disassemble_parts |  | prt_i_ammo,prt_i_ammo |  |

### Sounds

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| snd_on_take | The sound when taking | ammo |  |
