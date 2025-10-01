---
tags: [Unfinished]
---

# Outfit

___

:::warning
This article is under construction
:::

## About

Configuration parameters for outfits

___

## General

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| GroupControlSection |  | spawn_group |  |
| $spawn | Outfit Directory in the [Level Editor](../../../../modding-tools/sdk/level-editor/README.md) | "outfit\cs_light_novice_outfit" |  |
| cform | Skeleton model | skeleton | parameter for dynamic objects; necessary for correct creation of the skeleton model |
| discovery_dependency | Outdated parameter used in early SoC builds. Needed for discovery or improvement after working with scientists |  |  |
| class | Engine outfit class | EQU_STLK |  |
| default_to_ruck | whether the outfit will be moved to the backpack instead of the slot when picked up | true | true - 1 - on (Yes) false - 0 - off (No) |
| sprint_allowed | It is possible to run in this outfit | true | true - 1 - on (Yes) false - 0 - off (No) |
| kind | Kind of item to group into the appropriate section in the [Item Spawner](../../../../modding-tools/in-game-editors/item-spawner.md) | o_light o_medium o_sci o_heavy |  |
| cost | base price | 32340 |  |
| community | To which faction the outfit belongs | dolg | army csky stalker killer dolg bandit freedom monolith isg greh ecolog renegade |
| helmet_avaliable | Is a helmet available for this outfit | true | true - 1 - on (Yes) false - 0 - off (No) |
| backpack_avaliable | Is a backpack available for this outfit | true | true - 1 - on (Yes) false - 0 - off (No) |
| artefact_count  |  |  |  |
| can_trade |  | true | true - 1 - on (Yes) false - 0 - off (No) |
| use_condition  |  |  |  |

## Sounds

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| snd_on_take |  | outfit |  |

## Inventory

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| full_icon_name | the icon of the protagonist in a full-suit | npc_icon_svoboda_light_outfit | Not used (used only in the SoC inventory) |
| full_scale_icon | Coordinates of the protagonist icon in full suit | 10, 11 | Not used (used only in the SoC inventory) |
| character_portrait | Portrait of the NPC or protagonist wearing the outfit | ui_inGame2_csky_1_2 |  |
| inv_grid_height | Icon height | 3 | number of 50x50 pixels cells |
| inv_grid_width | Icon width | 2 | number of 50x50 pixels cells |
| inv_grid_x | Coordinate of the upper left corner of the icon on a 50x50 pixel grid on the X axis | 116 | number of cells indented to the right |
| inv_grid_y | Coordinate of the upper left corner of the icon on a 50x50 pixel grid on the Y axis | 0 | number of cells indenting downward |
| inv_name | Inventory name | csky_light_novice_outfit_name |  |
| inv_name_short | Inventory short name | csky_light_novice_outfit_name |  |
| inv_weight | Inventory weight | 5.48 | The number is given in kilograms |
| description | Description in inventory | csky_light_novice_outfit_description |  |
| slot | Inventory slot number | 6 | 0 - knives (may be crashing)1 - pistols (may be crashing)2 - shotguns, machine guns, rifles, grenade launchers (may be crashing)3 - grenades (may be crashing)4 - binoculars (may be crashing)5 - bolts (may be crashing)6 - outfits |

## Visual

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| player_hud_section | First-person HUD section | actor_hud_cs1 |  |
| visual | Outfit visual | dynamics\outfit\cs_light_outfit |  |
| actor_visual | Visual of a character in outfit | actors\stalker_nebo\stalker_nebo_1 |  |
| npc_visual | Visual of an NPC in outfit | actors\stalker_nebo\stalker_nebo_1 |  |

## Upgrades/Repairs

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| upgrades |  | up_gr_firstab_sunrise_3, up_gr_seconab_sunrise_3, up_gr_thirdab_sunrise_3 |  |
| installed_upgrades | installed upgrades |  |  |
| upgrade_scheme | upgrade_scheme | up_scheme_sunrise_1 |  |
| repair_type | item type for repair tools | outfit |  |
| repair_part_bonus |  | 0.17 |  |
| upgr_icon_x | the X coordinate of the upper left corner of the icon in the repair window | 953 | Specified in pixels |
| upgr_icon_y | top-left corner coordinate of the icon in the Y axis repair window | 365 | Specified in pixels |
| upgr_icon_width | Width of the icon in the repair window | 309 | Specified in pixels |
| upgr_icon_height | icon height in the repair window | 142 | Specified in pixels |

## Armor Outfit Parameters

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| artefact_count | Number of artifact cells initially available | 1 |  |
| immunities_sect | Costume Immunities Section | sect_light_novice_outfit_immunities |  |
| control_inertion_factor | inertia in the outfit | 1 |  |
| use1_functor |  | gameplay_disguise.menu_patch |  |
| use1_action_functor |  | gameplay_disguise.menu_patch_action |  |
| additional_inventory_weight | Maximum weight at which the protagonist can walk and additional carrying weight| 5 | Specified in kilograms |
| additional_inventory_weight2 |  | 5 | Specified in kilograms |

## Parameters that affect the protagonist

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| bones_koeff_protection | Parameter coefficients of the "persistence" of the protagonist's bones in the outfit | actor_armor_cs1 |  |
| hit_fraction_actor | General protection | 0.75 |  |
| power_loss | Responsible for fatigue | 0.05 | Specified in percent |
| bleeding_restore_speed | Responsible for stopping bleeding |  | Specified in percent |
| health_restore_speed | Responsible for restoring health |  | Specified in percent |
| power_restore_speed | Responsible for restoring powers |  | Specified in percent |

## Parameters of the wearer's protection against various types of impacts provided by the outfits

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| burn_protection | Protection against fire | 0.145 |  |
| shock_protection | Protection against electric shock | 0.96 |  |
| radiation_protection | Radiation protection | 0.0025 |  |
| chemical_burn_protection | Chemicals Protection  | 0.037 |  |
| telepatic_protection | Psi Protection | 0 |  |
| strike_protection | Strike protection | 0.045 |  |
| explosion_protection | Explosion/shrapnel protection | 0.24 |  |
| wound_protection | Protection from Wounds | 0.31 |  |
| fire_wound_protection | Protection from firearms | 0.25 |  |

## Immunities

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| burn_immunity | Immunity to fire exposure | 0.25 |  |
| chemical_burn_immunity | Immunity to chemical exposure | 0.07 |  |
| explosion_immunity | Immunity to effects from explosions/shrapnel | 0.2 |  |
| fire_wound_immunity | Immunity to exposure from firearms | 0.075 |  |
| radiation_immunity | Immunity to exposure from radiation | 0.0 |  |
| shock_immunity | Immunity to exposure to electricity | 0.03 |  |
| strike_immunity | Immunity to impact from strikes | 0.0 |  |
| telepatic_immunity | Immunity to psi exposure | 0.0 |  |
| wound_immunity | Immunity to the effects of wounds | 0.122 |  |

## AI

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| ef_equipment_type | Preference for NPCs | 3 |  |
