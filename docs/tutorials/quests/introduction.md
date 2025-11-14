---
title: Introduction
description: Introduction to quest creation and management in the game
draft: false
---

# Introduction TO REDO

___

<Authors
  authors={["tdef"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

A quest is defined by adding a section inside `\configs\misc\task\task_manager.ltx` or any of the files included by it.

```ini title="\configs\misc\task\task_manager.ltx"
[mytask]
status_functor = mytask_status_f
target_functor = mytask_target_f
; there are more things but these are the essentials to have it running
```

The status functor is a function that gets called every few seconds while the task is active, used to progress the task logic.
The target functor is used to decide where to show the quest marker while the task is active.

The status functor needs to be defined inside task_status_functor.script, while the target functor inside task_functor.script
To avoid bloating those two scripts you can define those functions in a separate file.

```lua title="mytask.script"
function task_status_functor.mytask_status_f(tsk,task_id)
	-- your code
	-- return "fail" or "complete" to fail/complete the task
	-- change the value of tsk.stage to change the stage of the task
end

function task_functor.mytask_target_f(task_id,field,p,tsk)
	-- your code
	-- the return value must be a number or nil
	-- engine will place a task marker on the object 
    -- with the id returned by this function or delete it if nil
end

-- this below is not required, adds a "start_mytask" command
-- in debug menu to start the task 
_cmd = debug_cmd_list.command_get_list()
function _cmd.start_mytask()
  task_manager.get_task_manager():give_task('mytask')
end
```

Now by calling "start_mytask" in debug menu you will get a task with default task icon (the compass) and a ugly TITLE_DOESNT_EXIST title and DESCR_DOESNT_EXIST description, also nothing happens.

Title and description can be defined in two ways:
static (not really, it's actually a condlist which is a can of worms, so for now pretend it's a static value)

```ini title="\configs\misc\task\task_manager.ltx"
[mytask]
status_functor = mytask_status_f
target_functor = mytask_target_f

title = st_mytask_title
descr = st_mytask_descr
```

With `st_mytask_descr` and `st_mytask_title` defined inside a xml file in `configs/text/eng` or `rus/`

With functors

```ini title="\configs\misc\task\task_manager.ltx"
[mytask]
status_functor = mytask_status_f
target_functor = mytask_target_f

title_functor = mytask_title_f
descr_functor = mytask_descr_f
```

Title and task functors must belong to task_functor namespace so you need to add.

```lua title="mytask.script"
function task_functor.mytask_title_f(task_id,field,p,tsk)
    -- title of the task will be the text returned
    -- you will have to define your strings in an xml and "translate" the string id 
    return game.translate_string('st_mytask_title')
end

function task_functor.mytask_descr_f(task_id,field,p,tsk)
    -- description of the task will be the text returned
    return game.translate_string('st_mytask_descr')
end
```

After doing either task should show the title and description you set.

Now you need to decide a rough outline of the task, dividing them by stage makes organizing code easier, but nothing prevents you to handle all the logic in a single stage, however stage matters if you want the task to be part of the random tasks given by npc that will be explained later.

0. Stage 0: kill the soldiers

1. Stage 1: return to fanatic

Edit the status and target functor to spawn a soldier squad at the fallen bridge and make the task target them, and the target fanatic after the soldiers have been killed.

```lua title="mytask.script"
local squad_id
function task_status_functor.mytask_status_f(tsk,task_id)
    -- if it's stage 1, then we're done
	if tsk.stage > 0 then return end

    -- if it's stage 0 and it hasn't been done yet, spawn the army squad at the fallen bridge and make them stay there
    if not squad_id then
        -- spawn the squad 'army_sim_squad_novice' at the smart 'esc_smart_terrain_TODO'
        -- you can check smart terrain names with debug hud on pda map

        -- TODO: alun_utils are outdated
        local se_squad = alun_utils.create_squad('army_sim_squad_novice', 'esc_smart_terrain_TODO')
        
        -- force the squad to go and stay at the smart 'esc_smart_terrain_TODO'
        -- this is done already by alun_utils.create_squad but i write here too to make it clear how to
        se_squad.scripted_target = 'esc_smart_terrain_TODO'
        
        -- memorize the squad id to be used later to retrieve the squad object to check if still exists and for the target functor
        -- also since now squad_id has a valid value it will no longer be "falsy" so this block won't be executed on the next status functor run
        squad_id = se_squad.id
    end
    
    -- get the server object of the squad
    local se_squad = alife():object(squad_id)
    
    -- if no object is found with that id, it means the squad has been destroyed (happens automatically when all of its members are killed)
    -- in other words, the stage is complete and we can go to the next one
    if not se_squad then
        tsk.stage = 1
    end
end

function task_functor.mytask_target_f(task_id,field,p,tsk)
	-- if stage 0 (army squad alive), target it
	-- warning, this may run before the squad has been created, however since nil is a valid value for target functor (no marker) it's ok
	-- but be careful and never expect the functions to be called in a specific order
	
	if tsk.stage == 0 then
		return squad_id
	end
	
	-- if stage 1 (army squad dead), target fanatic
	-- some npc and items have defined a "story_id" to make easier getting their objects in script, in fanatic case it's "esc_2_12_stalker_fanat"
	-- as you can see in his spawn section define in \configs\creatures\spawn_sections_escape.ltx
	if tsk.stage == 1 then
		return story_objects.object_id_by_story_id('esc_2_12_stalker_fanat')
	end
end
```

Now when you start the task, the squad will appear at the bridge and after killing it you will get a quest update notification and now you have a quest marker on fanatic.

To make quests be available at specific npc and allow completion when talking to them back you'll have to edit the task section definition.

First of all the npc must have a special task manager dialog, then the task must be named "npc_section_task_XXX" where XXX is whatever you want (in vanilla coc and most other mods it must actually be a number sequential to other tasks by same npc, so if you have X_task_1, X_task_2 and X_task_3 already, you new task MUST be named X_task_4, in anomaly you can use whatever name you want as long the prefix "X_task_" is respected).
To add the task to the pool available at fanatic (he already has the task manager dialog):

```ini title="\configs\misc\task\task_manager.ltx"
[esc_2_12_stalker_fanat_task_mytask]
status_functor = mytask_status_f
target_functor = mytask_target_f

title = st_mytask_title
descr = st_mytask_descr

; the dialog used by npc to introduce the task, must be defined in xml
job_descr = st_mytask_job_descr

; the dialog used by npc when turning the quest in, must be defined in xml
; can be omitted and npc will use a generic "good job" response
task_complete_descr = st_mytask_task_complete_descr

; for task manager handled quests, the stage does matter, it is needed by the npc to know if he should show the "the job is done" dialog to turn it in
; in our case, we want it only after the army squad is dead, so stage 1
stage_complete = 1
```

Also now that the task is handled by the task manager, inside functors you can access the value tsk.task_giver_id which is the id of the npc that gave you the task, so for example the target functor can be changed to:

```lua title="mytask.script"
function task_functor.mytask_target_f(task_id,field,p,tsk)
    if tsk.stage == 0 then
        return squad_id
    elseif tsk.stage == 1 then
        return tsk.task_giver_id
    end
end
```

Now if you go talk to fanatic and ask for jobs, it will propose also the new task, you can go now kill the army and come back to turn it the task, you have now a fully working task, but the reward is missing, since fanatic is not sidorovich he would pay you, to do this we write the on_complete line, which defines what happens when task is completed.

```ini title="\configs\misc\task\task_manager.ltx"
[esc_2_12_stalker_fanat_task_mytask]
status_functor = mytask_status_f
target_functor = mytask_target_f

title = st_mytask_title
descr = st_mytask_descr

job_descr = st_mytask_job_descr
task_complete_descr = st_mytask_task_complete_descr

stage_complete = 1

on_complete = %=reward_random_money(5000:10000) =reward_stash(true) =complete_task_inc_goodwill(50:stalker)%
```

___

on complete is a condlist, which is basically a "dynamic" config line but with tons of gotchas, so when in doubt just copypaste from existing ones and edit values accordingly

```ini
on_complete = %=reward_random_money(5000:10000) =reward_stash(true) =complete_task_inc_goodwill(50:stalker)%
```

actually means that when the condlist is parsed (in this case when task is completed) it will execute the functions:

```lua
-- give player from 5000 to 10000 cash (modified by economy settings)
xr_effects.reward_random_money(nil, nil, {"5000","10000"})

-- give a stash location
xr_effects.reward_stash(nil, nil, {"true"})

-- give 50 goodwill with "stalker" (loners) faction 
-- (modified by economy settings)
xr_effects.complete_task_inc_goodwill(nil, nil, {"50","stalker"})
```

To find all possible functions check xr_effects.script, but you can make your own too as long you edit xr_effects (not recommended) or add functions from your script into it
a and b depend on how the condlist is parsed, so unless you know what you're doing (and if you need to read this guide you probably don't) ignore them.
