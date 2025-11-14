---
title: "*.script"
draft: false
---

# *.script

___

## About

Contain some game functions, command sequences, written in [Lua](https://en.wikipedia.org/wiki/Lua_(programming_language)) scripting language.

:::info

```lua title="...\scripts\actor_status_thirst.script"
function create()
	printdbg("- Water deprivation | Enabled")
	feature_state = true
	last_drink 				= last_drink or 0
	RegisterScriptCallback("actor_on_update",actor_on_update)
	RegisterScriptCallback("actor_on_item_use",actor_on_item_use)
	RegisterScriptCallback("actor_on_sleep",actor_on_sleep)
	actor_status.add_indicator("Thirst",{
		index= 3,
		typ= "state",
		functor= {"actor_status_thirst","get_water_deprivation",true},
		icon= "ui_inGame2_indicator_thirst",
		background= "ui_inGame2_indicator_slot",
		anim_icon= false,
		anim_bk= false,
	})
end
```

:::

## Programs

<UniversalCard
  title="Any text editor"
/>
