---
title: Outfit Upgrades
description: Configuration documentation for outfit upgrades
draft: false
---

# Outfit Upgrades

___

<Authors
authors={["saloeater"]}
size="medium"
showTitle={true}
showDescription={true}
/>

<AuthorComment author="saloeater">
  Этот комментарий был написан автором Иваном Ивановым. 
  Компонент автоматически подтянет его аватар, имя и социальные ссылки из `authors.yml`.
  
  Поддерживается **Markdown** разметка и любые другие MDX компоненты!
</AuthorComment>

## 1. Outfit's upgrade definition

Each outfit can have a `upgrades` property that defines first upgrade column. Each item in this list means a new row of an upgrade column.

Let's define an outfit that can have two upgrade slots:

```ini
[dolg_red_outfit]
upgrades = up_gr_firstab_ps5_3, up_gr_seconab_ps5_3, up_gr_thirdab_ps5_3
upgrade_scheme = up_scheme_ps5_1
```

Keep upgrades strictly in ascending order from `first` to `fifth`

`upgrade_scheme` defines an UI template for this outfit, see [section 5](#5-upgrade-scheme)

## 2. Upgrade column

Should be located in `configs/items/outfits/upgrades/` folder in a file that starts with `up_` prefix, for example `up_ps5_3.ltx`

Upgrade column is defined with `elements` property that contains 1 or 2 upgrade cells.

You must follow the naming convention strictly:

`up_gr_firstab_ps5_3`, where
___
`up_gr` - default identifier for upgrade column section
___
`first` - what row of upgrades this is, allowed values:
```first, secon, third, fourt, fifth``` - [code](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/scripts/utils_item.script#L1076)
___
`ab` - tiers of upgrade cells in this column, should have consequent letter matching those letters of upgrade cells - [code](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/scripts/utils_item.script#L1083). Even if you have only one upgrade cell in this column, you should still use two letters i.e. `ab` instead of only `a`
___
The rest is just to make the section's name unique and easy to understand what it is about:

`ps5` - file with outfits that is using this file
___
`3` - something like a tier of this upgrade tree

Let's continue with our example:

```ini
[up_gr_firstab_ps5_3]
elements                = up_firsta_ps5_3

[up_gr_firstcd_ps5_3]
elements                = up_firstc_ps5_3

[up_gr_firstef_ps5_3]
elements                = up_firste_ps5_3, up_firstf_ps5_3
```

If you specify 2 upgrade cells, that they are exclusive and player would be able to choose only one of them

Rest of columns for this outfit are here - [code](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/configs/items/outfits/upgrades/up_ps5_3.ltx#L262)

## 3. Upgrade cell

Should be located in `configs/items/outfits/upgrades/` folder in a file that starts with `up_` prefix, for example `up_ps5_3.ltx`

Let's start with an example first:

```ini title="up_ps5_3.ltx"
[up_firsta_ps5_3]
scheme_index            = 0, 0
known                   = 1
effects                 = up_gr_firstcd_ps5_3
section                 = up_sect_firsta_ps5_3

precondition_functor    = inventory_upgrades.precondition_functor_a
precondition_parameter  = a & b
effect_functor          = inventory_upgrades.effect_functor_a
effect_parameter        = something_here
prereq_functor          = inventory_upgrades.prereq_functor_a
prereq_tooltip_functor  = inventory_upgrades.prereq_tooltip_functor_a
prereq_params           =

property                = prop_armor

name                    = st_up_armor_1_name
description             = st_up_armor_1_descr
icon                    = ui_inGame2_upgrade_outfit_armour_3
```

Rest of upgrade cells for this outfit are here - [code](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/configs/items/outfits/upgrades/up_ps5_3.ltx#L30)

### 3.1. Section name

You must follow the naming convention strictly:
`up_firsta_ps5_3`, where
___
`up` - default identifier for upgrade cell section
___
`first` - what row of upgrades this is, allowed values:
```first, secon, third, fourt, fifth``` - [code](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/scripts/utils_item.script#L1076)
___
`a` - tier of an upgrade cell, allowed values from 'a' to 'f' - [code](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/scripts/utils_item.script#L1083)

IMPORTANT: this should be the <b>9th</b> character of the name, because that's how game works: [code](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/scripts/utils_item.script#L1158)

Also, this is a tier of an upgrade, where
`a`, `b` - first tier
`c`, `d` - second tier
`e`, `f` - third tier
, due to [code](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/scripts/utils_item.script#L1172)

IMPORTANT: if you have only one upgrade cell in an upgrade column, it should have an odd tier: `a`, `c` or `e`, due to [code](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/scripts/utils_item.script#L1200)
___
The rest is just to make the name unique and easy to understand what it is about:

`ps5` - file with outfits that is using this file
___
`3` - something like a tier of this upgrade tree

### 3.2. Properties

`scheme_index = 0, 0` - have no usage now, a legacy property from engine upgrade UI
___
`known` - have no usage now, a legacy property from engine upgrade UI
___
`effects` - upgrade column that will be unlocked after this upgrade is installed, should point to another upgrade column section
___
`section` - upgrade result that will be applied to outfit after upgrade installation, should point to another upgrade result section
___
`precondition_functor` - defines what function will be used to check if player can see this upgrade in the list of available upgrades, by default should be `inventory_upgrades.precondition_functor_a`
___
`precondition_parameter` - an additional parameter for `precondition_functor`, by default should be `a & b`
___
`effect_functor` - defines what function will be used after installing upgrade, by default should be `inventory_upgrades.effect_functor_a`
___
`effect_parameter` - an additional parameter for `effect_functor`, by default should be `something_here`
___
`prereq_functor` - defines what function will be displaying the reasons for which the upgrade is not available (in the description)
___
`prereq_tooltip_functor` - has no usage, by default should be `inventory_upgrades.prereq_tooltip_functor_a`
___
`prereq_params` - parameters for `prereq_functor`, by default should be empty
___
`property` - defines what type of tools required to install this upgrades, allowed values are [here](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/scripts/utils_item.script#L1091)
___
`name` - regular translation string [identifier](../../text/text.md)
___
`description` - regular translation string [identifier](../../text/text.md)
___
`icon` - an icon name from `configs/ui`

## 4. Upgrade result

Should be located in `configs/items/outfits/upgrades/` folder in a file that starts with `up_` prefix, for example `up_ps5_3.ltx`

Let's start with an example first:

```ini title="up_ps5_3.ltx"
[up_sect_firsta_ps5_3]:up_sect_prop_armor_5

[up_sect_prop_armor_5]
cost 		                                    = 3300
value 		                                    = +5
inv_weight										= +1
hit_fraction_actor				                = -0.05
explosion_protection 			                = 0.05
fire_wound_protection  			                = 0.05
bones_koeff_protection_add						= actor_armor_light_add_1
```

Rest of upgrade results for this outfit are here - [code](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/configs/items/outfits/upgrades/upgrade_presets.ltx)

### 4.1. Properties

`cost` - cost of this upgrade in RU
___
`value` - some value that is displayed in the description of an upgrade, usually present only on weapons and utility items, [code](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/scripts/inventory_upgrades.script#L573)
___

All other properties are basically the same as for outfits, see [upgrade presets](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/configs/items/outfits/upgrades/upgrade_presets.ltx) or [outfits definitions](https://github.com/Tosox/STALKER-Anomaly-gamedata/tree/v1.5.2/gamedata/configs/items/outfits)

## 5 Upgrade scheme

Should be located in `configs/ui/inventory_upgrade.xml` or `configs/ui/inventory_upgrade_outfit.xml`

Let's start with an example first:

```ini
<template name="up_scheme_ps5_1">
    <column>
        <cell x="0" y="24" point_x="138" point_y="210"/>
        <cell x="0" y="126" point_x="220" point_y="190"/>
        <cell x="0" y="228" point_x="195" point_y="170"/>
    </column>
    <column>
        <cell x="100" y="24" point_x="185" point_y="210"/>
        <cell x="100" y="102" point_x="265" point_y="200"/>
        <cell x="100" y="151" point_x="85" point_y="195"/>
        <cell x="100" y="228" point_x="135" point_y="260"/>
    </column>
    <column>
        <cell x="200" y="0" point_x="150" point_y="170"/>
        <cell x="200" y="49" point_x="170" point_y="195"/>
        <cell x="200" y="126" point_x="161" point_y="210"/>
        <cell x="200" y="228" point_x="187" point_y="260"/>
    </column>
</template>
```

This is an inverted upgrades tree structure. Basically, that first column with 3 cells responsible for placing first column of each row of upgrades that are
`up_gr_firstab_ps5_3, up_gr_seconab_ps5_3, up_gr_thirdab_ps5_3`.

Second column with 4 cells responsible for placing second column of each row of upgrades that are descendants to each row of first column upgrades, and so on.

### 5.1 Template name

Should be a unique name

### 5.2 Columns

Each `<column>` section defines a row of upgrade rows

### 5.3 Cells

Each `<cell>` section defines a cell in an upgrade cell and it's position on the screen
