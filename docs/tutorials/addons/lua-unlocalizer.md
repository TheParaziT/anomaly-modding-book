---
tags:
  - LUA
description: Addons allows to unlocalize variables for lua environment, making them global to the script namespace
title: Lua Variables Unlocalizer
keywords:
  - LUA
  - Unlocalizer
  - Variable
  - Modded Exes
---

# Lua Variables Unlocalizer

___

<Authors
  authors={["themrdemonized"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## About

Lua variables unlocalizer is a part of [modded exes repo, version 2023.03.09+](https://github.com/themrdemonized/xray-monolith)

This addons allows to unlocalize variables for lua environment, making them global to the script namespace

## Usage

* In brackets you define the script file name as a section, without "[*.script](../../references/file-formats/conf-script/script.md)" part.
* Under the section put all variables that should be unlocalized, only their names are required.
* All unlocalizers [*.ltx](../../references/file-formats/conf-script/ltx.md) files should be put into `gamedata/configs/unlocalizers` folder. They can be named as you like.

* Supported local definitions (if local is declared like in the list below, it is possible to unlocalize it)

  * `local <name> = <value>` (will be transformed to `<name> = <value>`)
  * `local <name>` (will be transformed to `<name> = nil`)
  * `local <name1>,<name2>,<name3>` (if any of name1, name2, name3 is in unlocalizers' lists, they all will be unlocalized) (will be transformed to `<name1>,<name2>,<name3> = nil`)
  * `local <name1>,<name2>,<name3> = <value1>,<value2>...` (will be transformed to `<name1>,<name2>,<name3> = <value1>,<value2>...`)
  * `local function <function_name>...` (will be transformed to function `<function_name>...`)

* Unsupported local definitions
  * `local x; local y` (will be ignored)
  * `local x local y` (will be ignored)
  * any variations of multiple local keywords on a single line (will be ignored)

Example in `gamedata/configs/unlocalizers/unlocalizer_text.ltx`. `RENDERER` and `STATIC_LIGHT` variables are local in `actor_effects.script` file, this will make them global.

```ini title="gamedata/configs/unlocalizers/unlocalizer_text.ltx"
[actor_effects]
RENDERER
STATIC_LIGHT
```
