---
title: Time Events
tags:
  - LUA
keywords:
  - LUA
---

# Time Events

___

<Authors
  authors={["nltp_ashes"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## I. INTRODUCTION

Time events are a mechanism that exist to run a function after a given number of seconds. Before we even start, here are two **important** things you **need to know** :

1. Time events do not persist through saves : if you start a 60 seconds time event, save/load before the time event runs, the function will never be executed;
2. When a time event fires (aka, its delay is reached), the function associated with it will be executed indefinitely at each update until the function returns `true`.

## II. CREATING A TIME EVENT

To create a time event, use the `CreateTimeEvent` function. It takes four arguments :

- `event_id`  
  A unique identifier of your choice (could be your name, or something related to what is happening).

- `action_id`  
  A second unique identifier of your choice (what matters is that two time events should not have the same `event_id` & `action_id` pair).

- `delay`  
  The time to wait (in seconds) before running the function.

- `function`  
  The function to execute when the delay has passed.

With all that, you can for example create three time events that will execute three different functions with a 5 seconds gap.

```lua
CreateTimeEvent("modding_book_event", "delay_func_a", 5, func_a)
CreateTimeEvent("modding_book_event", "delay_func_b", 10, func_b)
CreateTimeEvent("modding_book_event", "delay_func_c", 15, func_c)
```

Note that there exist two ways to pass information to a function within a time event.

First, you can pass information through the closure. It works, but you should only do it for non-userdata types. Passing userdata (`alife_objects`, `game_objects`, `vectors`, etc) exposes you to pure virtual function calls if the object was destroyed by the engine while the time event was pending.

```lua
local my_var = 5
CreateTimeEvent("modding_book_event", "delay_func", 5, function()
    printf("My var is %s", my_var)
    return true
end)
```

Another way to do it is to pass arguments through the time event function. You can give an indefinite amount of them. Each argument that you give to `CreateTimeEvent` will be transited to the function you passed.

```lua
local my_var_a = 5
local my_var_b = 10
CreateTimeEvent("modding_book_event", "delay_func", 5, function(some_var_a, some_var_b)
    printf("My var A is %s and B is %s", some_var_a, some_var_b)
    return true
end, my_var_a, my_var_b)
```

If you are having troubles reading the previous bit of code, note that it is equivalent to the following one.

```lua
function my_func(some_var_a, some_var_b)
    printf("My var A is %s and B is %s", some_var_a, some_var_b)
    return true
end

local my_var_a = 5
local my_var_b = 10
CreateTimeEvent("modding_book_event", "delay_func", 5, my_func, my_var_a, my_var_b)
```

A frequent use case of time events is waiting for a `game_object` to come online after an `alife_object` hs been created.

```lua
local se_obj = alife_create("my_sec", pos, gvid, lvid)
CreateTimeEvent("wait_for_spawn", se_obj.id, 0, function(id) -- 0 as a delay means it'll be ran on the next frame
  if level.get_object_by_id(id) then
    -- do something
    return true  -- if the object has spawned, kill the time event
  else
    return false -- if not, we'll run it again next frame
  end
end, se_obj.id)
```

## III. RESETTING A TIME EVENT

It is possible to reset the delay after a time event has been created. For this purpose, use the `ResetTimeEvent` function. It takes three arguments :

- `event_id`  
  A unique identifier of your choice (similarly to `CreateTimeEvent`).

- `action_id`  
  A second unique identifier of your choice (similarly to `CreateTimeEvent`).

- `delay`  
  The new time to wait (in seconds) before running the function (starting from the moment `ResetTimeEvent` is called).

```lua
CreateTimeEvent("modding_book_event", "delay_func", 10, some_func)
-- after 5 sec
ResetTimeEvent("modding_book_event", "delay_func", 10)
-- time event will end up running after 15 seconds
```

## IV. REMOVING A TIME EVENT

Lastly, it is possible to remove a time event with the help of the `RemoveTimeEvent` function. There isn't a lot to say about this one, its name says it all. It takes two arguments :

- `event_id`  
  A unique identifier of your choice (similarly to `CreateTimeEvent`).

- `action_id`  
  A second unique identifier of your choice (similarly to `CreateTimeEvent`).

```lua
RemoveTimeEvent("modding_book_event", "delay_func")
```
