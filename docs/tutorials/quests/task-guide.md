---
title: Task Guide
tags: [LTX, XML, LUA]
description: Comprehensive guide for creating and managing quests and tasks in the game
---

# Task Guide

___

<Authors
  authors={["nltp_ashes"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## Intorduction

Before we start, keep in mind tasks often take part at the junction of a lot of the game's systems : dialogs, NPCs, squads, smart terrains and what not.

This guide aims to address how to work on tasks, and specifically tasks, while sometimes making connections to other things. You'll most likely need to get familiar (either before, or along the way) with those other systems in order to create your task, depending on how complex you want it.

Make sure to check the Anomaly Modding Book to see if guides exists for these other aspects not detailed here.

Without going into details, to create a task, you will at least need to play with the following files.

- `gamedata/configs/misc/task/task_manager.ltx`:  
   where your task config will be;

- `gamedata/configs/text/eng/st_my_task.xml`:  
   where the translation strings for your task will be;

- `gamedata/scripts/my_task.script`:  
   where your task functors will be.

For more complex tasks, you may also need to create custom squads of NPCs, for which you will need to create the following file.

- `gamedata/configs/misc/squad_descr/squad_descr_my_task.ltx`:  
   where your custom squads configs will be.

- `gamedata/configs/gameplay/dialogs_my_task.xml`:  
   where your custom dialogs will be.

Note that, to ensure maximum compatibility, it is highly discouraged to edit and redistribute modified vanilla files. Instead, you can use [DLTX](../addons/dltx.md) and [DXML](../addons/dxml.md) to modify those files at runtime, ensuring high compatibility with other addons.

___

## Task config

Your task is in reality composed of two things. A config side, and a script side. First, we'll take a look at the config side.

### Generalities

Here is a complete task config, or section. It contains all the information to allow the game to use your task. Some of these fields are optional, but I highly recommend you use all of them to ensure a good experience for the player.

```ini title="gamedata/configs/misc/task/task_manager.ltx"
[my_task]

title_functor           = my_task_title_f
descr_functor           = my_task_descr_f
target_functor          = my_task_target_f
status_functor          = my_task_status_f

...

icon                    = ui_inGame2_Skat_1
storyline               = false

stage_complete          = 1
...
```

- `title_functor`  
  Name of a function (defined in `task_functor` namespace). This function will be used to display the name of your task in the PDA. See more in [IV.A.](task-guide.md#iva-task-title-functor).

- `descr_functor`  
  Name of a function (defined in `task_functor` namespace). This function will be used to display a description of the player's current objective in the PDA. See more in [IV.B.](task-guide.md#ivb-task-description-functor).

- `target_functor`  
  Name of a function (defined in `task_functor` namespace). This function will be used to place a marker on the player's objective in the PDA. See more in [IV.C.](task-guide.md#ivc-task-target-functor).

- `status_functor`  
  Name of a function (defined in `task_functor` namespace). This function will manage your task logic as a whole. It will be responsible for spawning objects, checking objective completion, progressing the task, etc. See more in [IV.D.](task-guide.md#ivd-task-status-functor).

- `icon`  
  ID of a texture description. This is the icon for the task that will be displayed in the PDA and in the dialogs.

- `storyline`  
  Boolean. `true` if your task is a main mission (golden marker on the PDA) or `false` if your task is a secondary mission (gray marker on the PDA).

- `stage_complete`  
  Number. Stage at which the task is considered completed. A task starts at stage `0` and can have any number of stages you want.

___

### Task lifecycle (In config)

Worth a special attention are `on_init`, `on_complete` and `on_fail`. Those are three condlists executed at key moments of your task.

At these events, you might want to give the player a reward, or take an item away from the player, etc. There honestly a lot you can do here, so I'll just breeze over the commonly used things.

```ini title="gamedata/configs/misc/task/task_manager.ltx"
[my_task]
...
on_init                 = %+my_task_is_active%
on_complete             = %-my_task_is_active +my_task_is_finished =reward_random_money(5000:10000) =reward_stash(true)%
on_fail                 = %-my_task_is_active%
```

- `on_init`  
  Condlist. List of functions to execute when the player has just taken the task.

- `on_complete`  
  Condlist. List of functions to execute when the player has just completed the task.

- `on_fail`  
  Condlist. List of functions to execute when the player has just failed the task.

You can replace the content of `% ... %` by any arrangement of the following :

- `+some_info_portion`  
  This will give an info portion called `some_info_portion` to the player.  
  **You need to replace `some_info_portion` with the name of an info portion of your liking.**

- `-some_info_portion`  
  This will remove an info portion called `some_info_portion` from the player.  
  **You need to replace `some_info_portion` with the name of an info portion of your liking.**

- `=reward_random_money(min:max)`  
  This will reward the player with a sum of money between `min` and `max`.  
  **You need to replace `min` and `max` with number values.**

- `=reward_stash(true)`  
  This will reward the player with a stash location.

- `=reward_item(sec)`  
  This will reward the player with a specific item that has `sec` for a section.  
  **You need to replace `sec` with the name of an existing section.**

- `=reward_random_item(sec_1:sec_2)`  
  This will give the player one item among the list of sections passed (you can list as many sections as you want, separated by a `:`).  
  **You need to replace `sec_1`, `sec_2`, etc. with the name of an existing section.**

- `=remove_item(sec)`  
  This will remove one item that has `sec` for a section from the player's inventory. No effect if the player does not have the item.  
  **You need to replace `sec` with the name of an existing section.**

- `=complete_task_inc_goodwill(value:faction)`  
  This will give the player `value` points of goodwill with `faction` faction.  
  **You need to replace `value` with a number value and `faction` with the name of a faction.**

- `=fail_task_dec_goodwill(value:faction)`  
  This will remove from player `value` points of goodwill with `faction` faction.  
  **You need to replace `value` with a number value and `faction` with the name of a faction.**

This list is not exhaustive, and there is plenty more you can do. As you'll soon read in [II.B.2.](task-guide.md#iib2-task-lifecycle-in-script), you can even define your own functions to use in these condlists.

___

### Task lifecycle (In script)

The condlists we just had a look at will try to call the functions they contain in the `xr_effects` namespace.

Because of how S.T.A.L.K.E.R. scripts are set up, this means you can define your own functions (in your script) to handle those events :

```ini title="gamedata/configs/misc/task/task_manager.ltx"
[my_task]
...
on_init                 = %=my_task_init()%
on_complete             = %=my_task_complete()%
on_fail                 = %=my_task_fail()%
```

```lua title="gamedata/scripts/my_task.script"
function xr_effects.my_task_init(actor, npc, params)
   give_info("my_task_is_active")
   
   -- some other code you might want can be added here
end

function xr_effects.my_task_complete(actor, npc, params)
   disable_info("my_task_is_active")
   give_info("my_task_is_finished")
   xr_effects.reward_random_money(actor,npc,{"5000","10000"})
   xr_effects.reward_stash(actor,npc,{"true"})
   
   -- some other code you might want can be added here
end

function xr_effects.my_task_fail(actor, npc, params)
   disable_info("my_task_is_active")
   
   -- some other code you might want can be added here:
end
```

This allows you for a finer control over what happens at the events, though this has the downside of putting config-related stuff in script, which isn't ideal.

___

## Starting the task

It is important to note that there are multiple ways to make the player start your task.

___

### Using the game's dynamic random tasks

You can utilize the game's dynamic random tasks system. For this, you need to :

- name your task according to the following contract `<npc_name>_task_<task_name>`
- add `<actor_dialog>dm_ordered_task_dialog</actor_dialog>` to the task giver's dialogs (if the NPC doesn't already have it)
- add `<actor_dialog>dm_ordered_task_completed_dialog</actor_dialog>` to the task giver's dialogs (if the NPC doesn't already have it)

Once that's done, you will be able to add a few things to your task config to allow you more control.

```ini title="gamedata/configs/misc/task/task_manager.ltx"
[<npc_name>_task_my_task]
...
job_descr               = st_my_task_job_descr
task_complete_descr     = st_my_task_complete_descr
repeat_timeout          = 0
precondition            = {-my_task_is_finished} true, false
...
```

- `job_descr`  
  ID of a translation string. This translation string will be the task description displayed before taking the task.

- `task_complete_descr`  
  ID of a translation string. This translation string will be the text displayed after the player says "The job is done.".

- `repeat_timeout`  
  Number. Time before the player can complete that same task again.

- `precondition`  
  Condlist. If the condlist is evaluated as `true`, the player can take the task, if it is evaluated as `false`, then the task won't show up.

By default, those tasks are repeatable, but if you check for an info portion in the precondition, and give that info when the player completes the task, you can make sure the task is played only once (useful for storyline tasks).

___

### Using your own functions

Alternatively to using the dynamic random tasks, you can define your own dialog, that will eventually call a function you defined, which will be responsible for starting the task. This will complexify your code, it'll also increase the amount of code to maintain, but it'll allow you more control over the dialogs leading to taking up a tasks, and how the tasks themselves are started.

There are many ways to start the task using that technique, but the two important things you should know are :

1. To execute a script function in a dialog, you use `<action>namespace.function</action>` inside a phrase of a dialog.  

    ```xml title="gamedata/configs/gameplay/my_task_dialogs.xml"
    <dialog id="my_dialog_id">
            <phrase_list>
                <phrase id="0"> <!-- actor -->
                    <text>st_my_string_id</text>
                    <action>my_task.start_task</action>
                </phrase>
            </phrase_list>
        </dialog>
    ```

2. You define that function in your script :  

    ```lua title="gamedata/scripts/my_task.script"
    function start_task(actor, npc)
        -- You can check conditions or do anything before giving the task if you want
        
        -- Get the server object of the NPC giving the task 
        -- If you can that function from a dialog, 'npc' will be the person the player is talking to, which can be used as a task giver
        local task_giver = get_story_se_object("my_task_giver")
   
        -- Start the task called 'my_task' with 'task_giver' as the NPC giving the task
      task_manager.get_task_manager():give_task("my_task", task_giver:id())
    end
    ```

___

## Task functors

On the script side of your task, as previously explained, you will need a few functions to get your task rolling. Those are :

1. `task_functor.my_task_title_f(...)`
2. `task_functor.my_task_descr_f(...)`
3. `task_functor.my_task_target_f(...)`
4. `task_status_functor.my_task_status_f(...)`

I recommend you use a table to manage what has been done in your task. You can define this table at the beginning of your `my_task.script`.

```lua title="gamedata/scripts/my_task.script"
MY_TASK_CACHE = {}
```

Note that you'll need to persist this table, otherwise your task will break with loading a save-game :

```lua title="gamedata/scripts/my_task.script"
--- Function used to store information in the save file.
--- @param m_data table
--- @return nil
function save_state(m_data)
    m_data.my_addon_name_my_task_cache = MY_TASK_CACHE
end

--- Function used to load information stored in the save file.
--- @param m_data table
--- @return nil
function load_state(m_data)
    MY_TASK_CACHE = m_data.my_addon_name_my_task_cache or {}
end
```

___

### Task title functor

This function manages the task's title. In the end, this function must return a string, a string that will be displayed in the PDA (among other places) as the task's name.

While generally, the name of the task itself won't change, having it as a functor allows you to have a dynamic title, in case you'd like to change it in the middle of the task for some reason.

```lua title="gamedata/scripts/my_task.script"
--- Function used to retrieve the title of the mission (displayed in the PDA).
--- @param task_id number
--- @param field string
--- @param p any
--- @param tsk CGameTask
--- @return string
function task_functor.my_task_title_f(task_id,field,p,tsk)
    return game.translate_string("st_my_task_title")
end
```

Alternatively, since the task's title isn't really meant to change, you can hard-code it in the task's config.

```ini title="gamedata/configs/misc/task/task_manager.ltx"
[my_task]
...
title                   = st_my_task_title
...
```

___

### Task description functor

In the PDA, the task's description will be whatever string is returned by this function.

A few recommendations :

- write your description in a passive way, and assume doesn't know what it did before and what it needs to do
- always give a bit of context as to what the player has done : `You have found and retrieved the documents.`
- describe what is the new objective the player has to achieve : `Return the item to Dushman, in Deadcity.`

You can have the description evolve anyway you want, either by checking the task's stage, or by checking info portions, etc.

```lua title="gamedata/scripts/my_task.script"
--- Function used to retrieve the description of the mission (displayed in the PDA).
--- @param task_id number
--- @param field string
--- @param p any
--- @param tsk CGameTask
--- @return string
function task_functor.my_task_descr_f(task_id,field,p,tsk)
    if has_alife_info("the_player_has_done_something_really_bad") then
        return game.translate_string("st_send_player_to_brazil")
    end

    if tsk.stage == 0 then
        return game.translate_string("st_my_task_stage_0_description")
    end
    
    if tsk.stage == 1 then
        return game.translate_string("st_my_task_stage_1_description")
    end
end
```

Similarly to the task's title, the description can also be hard-coded in the task's config. Although this isn't recommended, since your task will rarely have only one stage, and each stage should have its own description.

```ini title="gamedata/configs/misc/task/task_manager.ltx"
[my_task]
...
descr                   = st_my_task_description
...
```

___

### Task target functor

This function will be used to place a marker on the player's objective in the PDA. You can code this function as you see fit.

All you have to keep in mind is, if the function returns nil, no marker will be shown on the PDA, if it returns a number, the game will try to find an object with an ID matching the number, and it'll place a marker on it.

Unfortunately, this means that you cannot just place markers anywhere, and that markers can exclusively be placed on top of game objects.

```lua title="gamedata/scripts/my_task.script"
--- Function used to retrieve the target of the mission (marker displayed (or not) in the PDA).
--- @param task_id number
--- @param field string
--- @param p any
--- @param tsk CGameTask
--- @return number
function task_functor.my_task_target_f(task_id,field,p,tsk)
    if tsk.stage == 0 then
        -- Stage 0 target : the quest item
        local quest_item_se = get_story_se_object("my_task_quest_item")
        return quest_item_se and quest_item_se.id
    end
    
    if tsk.stage == 1 then
        -- Stage 1 target : the NPC that gave the task
        return tsk.task_giver_id
    end
end
```

___

### Task status functor

The task status functor is a function that is automatically called every few seconds, by the game's task manager. This is where the heart of your task will be. Spawning objects, check if they still exist, if they have been killed, progressing the task, etc. Everything lies here.

There isn't really a convention for how to write tasks, but as a personal recommendation, I suggest you write your code using a sort of "return early" pattern. That means you write your code from top and downwards, and return as soon as a condition to progress isn't met.

```lua title="gamedata/scripts/my_task.script"
--- Function used to manage the mission logic as a whole.
--- @param tsk CGameTask
--- @param task_id number
--- @return string
function task_status_functor.my_task_status_f(tsk,task_id)
    if tsk.stage == 0 then
        -- logic of the first stage
    end
    
    if tsk.stage == 1 then
        -- logic of the second stage
    end
end
```

There are a few important things you need to manipulate in this function :

1. The task stage : you can use `tsk.stage` as both a getter and a setter for the stage :
   - `local stage = tsk.stage` to get the current stage;
   - `tsk.stage = 2` to set the current stage to stage 2;

    ```lua
    -- We get the current stage of the task
    local stage = tsk.stage
    
    -- If we're in the correct stage, and the player has a certain info portion
    if stage == 0 and has_alife_info("the_player_has_done_something") then
        -- We progress the task to stage 1
        tsk.stage = 1
    end
    ```

2. The return value :
    - use `return` (aka `return nil`) to stop the execution of the function "for now";
    - use `return "complete"` to force-complete the task;
    - use `return "fail"` to force-fail the task;

    If you use "return" or "return nil" (which is the same), the task manager will not execute the rest of the code for now - but it will have no effect on the status of the task.
    Remember the task manager calls your status functor every few seconds, so it will quickly call it again.

    ```lua
    -- While the player hasn't done anything, we return (aka we wait)
    if not has_alife_info("the_player_has_done_something_great") and not has_alife_info("the_player_has_done_something_really_bad") then
        return
    -- If the player has done something great, the task is complete
    elseif has_alife_info("the_player_has_done_something_great") then
        return "complete"
    -- If the player has done something bad, the task is failed
    elseif has_alife_info("the_player_has_done_something_really_bad") then
        return "fail"
    end
    ```
