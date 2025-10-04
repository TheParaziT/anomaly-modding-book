---
description: Callbacks list documentation
title: Callbacks List
---

# Callbacks List

___

## About

The following is a non-exhaustive list of callbacks available in Anomaly 1.5.2.

Technically, this should cover all the callbacks available in vanilla, but remember that addons (like the modded exes) can add additional callbacks too.

## Player

```lua
* on_before_level_changing                 Params: ()
* on_level_changing                        Params: ()
* actor_on_before_death                    Params: (<number>,<table>)
* actor_on_net_destroy                     Params: (<binder>)
* actor_on_first_update                    Params: (<binder>,<?>)
* actor_on_update                          Params: (<binder>,<?>)
* actor_on_weapon_fired                    Params: (<game_object>,<game_object>,<number>,<number>,<number>,<number>)
* actor_on_weapon_jammed                   Params: (<game_object>)
* actor_on_weapon_no_ammo                  Params: (<game_object>,<number>)
* actor_on_weapon_lower                    Params: (<game_object>)
* actor_on_weapon_raise                    Params: (<game_object>)
* actor_on_weapon_reload                   Params: (<game_object>,<number>)
* actor_on_weapon_zoom_in                  Params: (<game_object>)
* actor_on_weapon_zoom_out                 Params: (<game_object>)
* actor_on_item_take                       Params: (<game_object>)
* actor_on_item_take_from_box              Params: (<game_object>,<game_object>)
* actor_on_item_put_in_box                 Params: (<game_object>,<game_object>)
* actor_on_item_drop                       Params: (<game_object>)
* actor_on_item_use                        Params: (<game_object>,<string>)
* actor_on_item_before_use                 Params: (<game_object>,<table>)
* actor_on_item_before_pickup              Params: (<game_object>,<table>)
* actor_item_to_belt                       Params: (<game_object>)
* actor_item_to_ruck                       Params: (<game_object>)
* actor_item_to_slot                       Params: (<game_object>)
* actor_on_trade                           Params: (<game_object>,<?>,<number>)
* actor_on_init                            Params: (<binder>)
* actor_on_reinit                          Params: (<binder>)
* actor_on_info_callback                   Params: (<game_object>,<number>)
* actor_on_hit_callback                    Params: (<game_object>,<number>,<vector>,<game_object>,<number>)
* actor_on_attach_vehicle                  Params: (<game_object>)
* actor_on_detach_vehicle                  Params: (<game_object>)
* actor_on_use_vehicle                     Params: (<game_object>)
* actor_on_hud_animation_play              Params: (<table>,<game_object>)
* actor_on_hud_animation_end               Params: (<game_object>,<string>,<?>,<?>,<number>)
* actor_on_hud_animation_mark              Params: (<number>,<string>)
* actor_on_sleep                           Params: (<number>)
* actor_on_foot_step                       Params: (<game_object>,<number>,<?>,<?>,<?>)
* actor_on_interaction                     Params: (<string>,<game_object>,<string>)
* actor_on_before_hit                      Params: (<game_object>,<SHit>,<number>,<table>)
* actor_on_before_hit_belt                 Params: (<table>,<number>,<number>)
* actor_on_weapon_before_fire              Params: (<table>)
* actor_on_feeling_anomaly                 Params: (<game_object>,<table>)
* actor_on_leave_dialog                    Params: (<number>)
* actor_on_stash_create                    Params: (<table>)
* actor_on_stash_remove                    Params: (<table>)
* actor_on_frequency_change                Params: (<number>,<number>)
* actor_on_achievement_earned              Params: (<string>,<string>)
* actor_on_movement_changed                Params: (<number>)
* actor_on_footstep                        Params: (<string>,<number>,<boolean>,<table>)
* actor_on_jump                            Params: ()
* actor_on_land                            Params: (<number>)
```

## NPCs

```lua
* npc_on_use                               Params: (<game_object>,<game_object>)
* npc_on_choose_weapon                     Params: (<game_object>,<game_object>,<table>)
* npc_on_item_take                         Params: (<game_object>,<game_object>)
* npc_on_item_take_from_box                Params: (<game_object>,<game_object>,<game_object>)
* npc_on_item_drop                         Params: (<game_object>,<game_object>)
* npc_on_net_spawn                         Params: (<game_object>,<server_object>)
* npc_on_net_destroy                       Params: (<game_object>)
* npc_on_update                            Params: (<game_object>,<table>)
* npc_on_before_hit                        Params: (<game_object>,<SHit>,<number>,<table>)
* npc_on_hit_callback                      Params: (<game_object>,<number>,<vector>,<game_object>,<number>)
* npc_on_death_callback                    Params: (<game_object>,<game_object>)
* npc_on_fighting_actor                    Params: (<game_object>)
* npc_on_weapon_strapped                   Params: (<game_object>,<game_object>)
* npc_on_weapon_unstrapped                 Params: (<game_object>,<game_object>)
* npc_on_weapon_drop                       Params: (<game_object>,<game_object>)
* npc_on_hear_callback                     Params: (<game_object>,<number>,<?>,<number>,<number>,<vector>)
* npc_on_get_all_from_corpse               Params: (<game_object>,<game_object>,<game_object>,<boolean>)
* npc_on_eval_danger                       Params: (<game_object>,<table>)
* anomaly_on_before_activate               Params: (<game_object>,<game_object>)
```

## Mutants

```lua
* monster_on_update                        Params: (<game_object>,<table>)
* monster_on_before_hit                    Params: (<game_object>,<SHit>,<number>,<table>)
* monster_on_hit_callback                  Params: (<game_object>,<number>,<vector>,<game_object>,<number>)
* monster_on_net_spawn                     Params: (<game_object>,<server_object>)
* monster_on_net_destroy                   Params: (<game_object>)
* monster_on_death_callback                Params: (<game_object>,<game_object>)
* monster_on_actor_use_callback            Params: (<game_object>,<game_object>)
* monster_on_loot_init                     Params: (<game_object>,<table>)
* burer_on_before_weapon_drop              Params: (<game_object>,<game_object>)
```

## Physical objects

```lua
* physic_object_on_hit_callback            Params: (<game_object>,<number>,<vector>,<game_object>,<number>)
* physic_object_on_use_callback            Params: (<game_object>,<game_object>)
```

## Vehicles

```lua
* heli_on_hit_callback                     Params: (<game_object>,<number>,<nil>,<game_object>,<nil>)
* vehicle_on_death_callback                Params: (<number>)
```

## Squads

```lua
* squad_on_npc_creation                    Params: (<server_object>,<server_object>,<server_object>)
* squad_on_enter_smart                     Params: (<server_object>,<server_object>)
* squad_on_leave_smart                     Params: (<server_object>,<server_object>)
* squad_on_npc_death                       Params: (<server_object>,<server_object>,<server_object>)
* squad_on_update                          Params: (<server_object>)
* squad_on_first_update                    Params: (<server_object>)
* squad_on_add_npc                         Params: (<server_object>,<server_object>,<string>,<vector>,<number>,<number>)
```

:::warning
the following 2 callbacks will ALWAYS fire on level change/loaded save because the old data isn't saved for compatibility purpose
it's up to the user to check for the case in which old level name/old game vertex is nil in their code if they want to use this
:::

```lua
* squad_on_after_game_vertex_change        Params: (<server_object>,<number>,<number>,<boolean>)
* squad_on_after_level_change              Params: (<server_object>,<string>,<string>)
```

## Smart terrains

```lua
* smart_terrain_on_update                  Params: (<server_object>)
* on_try_respawn                           Params: (<server_object>,<table>)
```

## Server objects

```lua
* server_entity_on_register                Params: (<server_object>,<string>)
* server_entity_on_unregister              Params: (<server_object>,<string>)
* fill_start_position                      Params: ()
* se_stalker_on_spawn                      Params: (<server_object>)
* se_actor_on_STATE_Write                  Params: (<server_object>)
* se_actor_on_STATE_Read                   Params: (<server_object>)
```

## GUI

```lua
* ActorMenu_on_before_init_mode            Params: (<string>,<table>,<game_object>)
* ActorMenu_on_mode_changed                Params: (<number>,<number>)
* ActorMenu_on_item_drag_drop              Params: (<game_object>,<game_object>,<number>,<number>)
* ActorMenu_on_item_focus_receive          Params: (<game_object>)
* ActorMenu_on_item_focus_lost             Params: (<game_object>)
* ActorMenu_on_item_before_move            Params: (<table>,<number>,<game_object>,<string>,,<number>)
* ActorMenu_on_item_after_move             Params: (<number>,<game_object>,<string>,,<number>)
* ActorMenu_on_trade_started               Params: ()
* ActorMenu_on_trade_closed                Params: ()

* GUI_on_show                              Params: (<string>,<string>)
* GUI_on_hide                              Params: (<string>,<string>)

* map_spot_menu_add_property               Params: (<CUIWindow>,<number>,<string>,<string>)
* map_spot_menu_property_clicked           Params: (<CUIWindow>,<number>,<string>,<string>)

* main_menu_on_keyboard                    Params: (<number>,<number>,<CUIScriptWnd>,<boolean>)
* main_menu_on_init                        Params: (<CUIScriptWnd>)
* main_menu_on_quit                        Params: (<CUIScriptWnd>)

* on_screen_resolution_changed             Params: ()
```

## Technical

```lua
* on_game_load                             Params: (<binder>)
* on_key_press                             Params: (<number>)
* on_key_release                           Params: (<number>)
* on_key_hold                              Params: (<number>)
* on_before_key_press                      Params: (<number>,<number>,<boolean>,<table>)
* on_option_change                         Params: ()
* on_localization_change                   Params: ()
* on_console_execute                       Params: (<string>,<string>,<string>,...)
* on_before_save_input                     Params: (<number>,<number>,<table>)
* on_before_load_input                     Params: (<number>,<number>,<table>)
```

## Files

```lua
* save_state                               Params: (<table>)
* load_state                               Params: (<table>)
* on_pstor_save_all                        Params: (<game_object>,<?>)
* on_pstor_load_all                        Params: (<game_object>,<?>)
```

## Others

```lua
* on_enemy_eval                            Params: (<game_object>,<game_object>,<table>)
* on_before_surge                          Params: (<table>)
* on_before_psi_storm                      Params: (<table>)
* on_get_item_cost                         Params: look at bottom of utils_item.script for details
```
