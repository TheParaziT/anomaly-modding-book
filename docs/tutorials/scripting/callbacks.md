---
title: Callbacks
tags:
    - LUA
description: Callbacks tutorial
draft: false
---

# Callbacks

___

<Authors
  authors={["igigog"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## I. INTRODUCTION

Callbacks are a convenient and performant way to execute code when certain events occur.

The idea is: you want a function of yours to be executed when something happens in-game, so you subscribe to a callback, and give it your function so that when the event does happen, it can *call it back*.

There are many callbacks. Most are defined statically in `axr_main.script`, but some are added by addons dynamically at runtime.

The "main" callbacks (i.e. the most often used ones) are :

1. `actor_on_update` - A callback called *really* frequently (almost every frame). In some cases, this is the only way to do what you need, but there is almost always a better option. This callback really isn't performance friendly, so it should be used with *extreme* caution;
2. `save_state` (and respectively `load_state`) - A callback fired when the player saves (and respectively loads) their game. This callback is fired with an argument : `m_data`, a table in which you can store (and respectively load) any information you want so that it persists in the save game;
3. `on_key_press` - A callback allowing you to listen to key presses and react accordingly.

There are three functions that exists allowing you to manipulate callbacks :

- `RegisterScriptCallback(string, function)` - used to register one of your functions to a given callback;
- `AddScriptCallback(string)` - used to create a new callback at runtime;
- `SendScriptCallback(string, ...)` - used to fire a callback with arguments.

You must register your functions to callbacks in `on_game_start`. This function will be called automatically by the game (if it exists in your script) after all scripts are loaded. This is because callbacks need to be created before you can register functions to them. The problem is that, when scripts are still loading, it is possible that not all the dynamic callbacks have been created yet.

```lua
function on_game_start()
    RegisterScriptCallback("actor_on_update", my_func)
end

function my_func()
    printf("we are in actor_on_update")
end
```

## II. CREATING CALLBACKS

As previously explained, callbacks can be added dynamically. This means you can create your own callbacks.

To do that, use the `AddScriptCallback(string)` function (exclusive to Anomaly 1.5.2) to add your new callback. You must do so at the root level of your script, so that other scripts can register callbacks later.

**Important :** Callback names have a risk of collision, so it is **highly** recommended you prefix/suffix your callbacks with a unique identifier (like a codename for your addon, or even your nickname - anything that can guarantee no-one else will name their callback the same).

```lua
AddScriptCallback("modding_book_something_happened")
```

Once you have created your callback, you can fire it whenever you want using `SendScriptCallback(string, ...)`. You must specify the callback's name, but after this, you can pass as many arguments as you want. They will be transited to the functions listening for that callback.

In the following example, we will create a callback that fires when the key **F** is pressed. To make the example more descriptive, it will be split in two files.

```lua title="gamedata\scripts\script_a.script"
-- A counter of how many times the player has paid respects
local respects_counter = 0

-- Create the new callback
AddScriptCallback("modding_book_on_pay_respects")

-- Register callbacks
function on_game_start()
    RegisterScriptCallback("on_key_press", some_key_was_press)
end

-- Function called when a key is pressed
function some_key_was_press(dik)
    -- If the key that was pressed is F
    if dik == DIK_keys.DIK_F then
        -- Increase the counter
        respects_counter = respects_counter + 1
        -- Send the newly created callback with the current value of the counter
        SendScriptCallback("modding_book_on_pay_respects", respects_counter)
    end
end
```

```lua title="gamedata\scripts\script_b.script"
-- Register callbacks
function on_game_start()
    RegisterScriptCallback("modding_book_on_pay_respects", is_paying_respects)
end

-- Function called when the player pays respects
function is_paying_respects(respects_count)
    -- print some message in the console showing how many times the player has paid respects
    printf("player has paid respects " .. respects_count .. " times")
end
```
