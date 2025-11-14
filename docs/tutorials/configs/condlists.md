---
tags:
    - LTX
title: Condition Lists Tutorial
draft: false
---

# Condition Lists Tutorial

___

<Authors
  authors={["tdef", "themrdemonized", "proflander"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## About

Condition list or condlist is one way to write dynamic configuration files and have this structure:

```ini title="somefile.ltx"
[some_section]
my_condlist = {=A(a1:a2) !B +C -D ~30} X %=E(e1) +F -G%, Y
```

And are used like this:

```lua title="somescript.script"
local ini = ini_file("path\\to\\somefile.ltx")
local condlist = ini:r_string_to_condlist("some_section","my_condlist")
local result = xr_logic.pick_section_from_condlist(game_object_1, game_object_2, condlist)
```

The code above is the equivalent of:

```lua
if                                                                  -- {
    xr_conditions.A(game_object_1, game_object_2, {"a1","a2"}) and  -- =A(a1:a2)
    not xr_conditions.B(game_object_1, game_object_2) and           -- !B
    db.actor:has_info("C") and                                      -- +C
    not db.actor:has_info("D") and                                  -- -D    
    math.random(1,100) > 30                                         -- ~30 (not a typo, ~30 means 70% chance, ~80 means 20% and so on)
    
then                                                                -- }
    result = "X"                                                    -- X
                                                                    -- %
    xr_effects.E(game_object_1, game_object_2, {"e1"})              -- =E(e1)
    db.actor:give_info_portion("F")                                 -- +F
    db.actor:disable_info_portion("G")                              -- -G
                                                                    -- %
else                                                                -- ,
    result = "Y"                                                    -- Y
end
```

Condlist can have more than one condition block:

```lua
    my_condlist = {-A -B} X, {-A +B} Y, Z
```

this is the equivalent of:

```lua
if                                                                     
    not db.actor:has_info("A") and
    not db.actor:has_info("B")    
then        
    result = "X"
elseif
    not db.actor:has_info("A") and
    db.actor:has_info("B")    
then        
    result = "Y"
else
    result = "Z"
end
```

All condlist elements are optional, these are all valid condlist:

```ini
cond1 =                      ;returns nil
cond2 = true                 ;returns "true"
cond3 = %=f%                 ;returns nil and executes xr_effects.f(a,b) --> remember that a and b depend on the arguments of pick_section_from_condlist 
cond4 = {-info1} , %=f1%     ;if actor doesn't have info1 then returns nil, else returns nil and executes xr_effects.f1(a,b)
cond5 = {+info1} %=f1%       ;same effect of previous one but easier to read
```

The return value can be ignored to use condlist as a way to run functions listed from a config file, one example are the on_complete lines in task manager files:

```ini
on_complete = %=reward_stash(true)%
```

This condlist has no condition (the part inside {}) and no return value, so calling

```lua
xr_logic.pick_section_from_condlist()
```

on this is the equivalent of just calling

```lua
xr_effects.reward_stash(x, x, {"true"})
```

Remember that both the return on pick_section_from_condlist and arguments passed to xr_conditions and xr_effects functions are strings and not boolean/numbers

Some config lines are condlist even if they aren't obvious, for example one line can be

```ini
something = true
```

But in reality it's a condlist that always returns "true", the only way to know for sure it's to search for "something" in all scripts and see if that config line is parsed as condlist anywhere.

Condlist can be also be parsed from a string

```lua
local condlist1 = ini:r_string_to_condlist("some_section","my_condlist")
local somestring = ini:r_string_ex("some_section","my_condlist")
local condlist2 = xr_logic.parse_condlist(game_object, string1, string2, somestring)
```

condlist1 and condlist2 are the same, the first 3 arguments of xr_logic.parse_condlist are used only to print a message if the 4th (the actual condlist string) is nil, or just use alun_utils.parse_condlist(string)

Now we examine some condlist in Anomaly, what they mean and some examples of edits we can make.

## Example 1

Near the end of `tm_dynamic.ltx` in `configs/misc`

```ini title="configs/misc/tm_dynamic.ltx"
[simulation_task_52]
icon = ui_inGame2_PD_Torgovets_informatsiey
storyline = false
prior = 120
sim_communities = army, bandit, csky, dolg, ecolog, freedom, killer, stalker
repeat_timeout = 14400
precondition = {=random_chance(100)} true, false

title = simulation_task_52_name
descr = simulation_task_52_text
descr_functor = general_fate_desc
job_descr = simulation_task_52_about
task_complete_descr = simulation_task_52_finish

stage_complete     = 4
target_functor     = general_fate
status_functor     = fate_task
condlist_0         = {!task_giver_alive(simulation_task_52)} fail

on_job_descr = %=on_init_fate_task(simulation_task_52:detector_radio:broken_pda:k01_darkscape:k02_trucks_cemetery:y04_pole:l06_rostok:zaton:jupiter:pripyat)%
on_complete  = %=inc_goodwill_by_tasker_comm(simulation_task_52:50) =reward_stash(true) =reward_random_money(10500:18500) =reward_random_item(beer:vodka:vodka2:cigarettes_lucky_3:cigarettes_russian_3) -simulation_task_52_dead_spawned -simulation_task_52_item_spawned -simulation_task_52_target_found =remove_quest_item(simulation_task_52) =forget_dead_npcs(simulation_task_52) =pstor_reset(simulation_task_52)%
on_fail      = %=remove_quest_item(simulation_task_52) -simulation_task_52_dead_spawned -simulation_task_52_target_found -simulation_task_52_item_spawned =forget_dead_npcs(simulation_task_52) =pstor_reset(simulation_task_52)%
```

If we change precondition line to

```ini
precondition = {=is_rain} true, false
```

Then npc will propose this quest only if you ask them while it's raining

If we change it to

```ini
precondition = false
```

Then npc will never give this quest

True and false don't have any special meaning in the condlist on their own, in this case they matter only because the code that parses the condlist spelled out by the precondition line does different things
depending on the pick_section_from_condlist return value

If we change on_complete to

```ini
on_complete = aslkdjslakd %=inc_goodwill_by_tasker_comm(simulation_task_52:50) =reward_stash(true) =reward_random_money(10500:18500) =reward_random_item(beer:vodka:vodka2:cigarettes_lucky_3:cigarettes_russian_3) -simulation_task_52_dead_spawned -simulation_task_52_item_spawned -simulation_task_52_target_found =remove_quest_item(simulation_task_52) =forget_dead_npcs(simulation_task_52) =pstor_reset(simulation_task_52)%
```

Everything will still work as before, because the code that runs the pick_section_from_condlist on on_complete does nothing with the return value, so if it's nil, random text, true/false or whatever doesn't matter

## Example 2

```ini title="configs/scripts/escape/devushka.ltx"
[walker@devushka]
path_walk = guard_2_walk
path_look = guard_2_look
on_info = {=surge_started} walker@surge
on_info2 = {=is_night} walker@sleeper_1
on_info3 = {=is_rain} walker@rain
combat_ignore_cond = {=actor_enemy =check_enemy_name(actor)} false, false
combat_ignore_keep_when_attacked = {=is_warfare} false, true
reach_distance = 10
gather_items_enabled = false
help_wounded_enabled = false
corpse_detection_enabled = false
invulnerable = {=is_warfare} false, {!actor_enemy} true, false
on_game_timer = 2400 | remark@smoking_stand
```

we change `on_info3` to

```ini
on_info3 = {=is_rain =is_actor_enemy_to_faction(freedom)} walker@rain
```

Now Hip will seek shelter from rain only if we are enemy to Freedom, women be like that sometimes

## Custom conditions

If you want to make custom conditions either create new functions inside xr_conditions or make your own script file defining functions inside xr_conditions scope

```lua title="my_conditions.script"
function xr_conditions.has_more_money_than(a,b,c)
    
    -- a and b will be the game objects given as arguments to the xr_logic.pick_section_from_condlist call that evaluates this condlist
    -- most of the times a will be the actor game object and b one npc game object, but unless you're 100% sure of that (after testing or looking which pick_section_from_condlist parses it and with which arguments) 
    -- don't ever rely on those, i've seen cases where b is a server object or even nil

    local amount = c and c[1] and tonumber(c[1])
    -- c is a table where condlist arguments for the function are passed
    -- so has_more_money_than(10000) means c[1] == "10000" (a string!)
    -- so we need to convert it to a number to be able to compare it to another
    if amount then
        return db.actor:money() > amount
    end
    return false
end
```

Now we have has_more_money_than available as conditions for condlist, now we can do

```ini
on_info = {=has_more_money_than(50000)} walker@surge
```

So Hip will stay outside during blowouts unless we have more than 50k rubles

You can do the same with xr_effects

```lua title="my_effects.script"
function xr_effects.give_tuna_to_actor(a,b,c)
    alife():create('conserva',vector(),0,0,0)
end
```

Then change `on_info2` to

```ini
on_info2 = {=is_night} walker@sleeper_1 %=give_tuna_to_actor%
```

And when Hip goes to sleep you'll get a tuna can

___

## BNF Syntax Specification

Courtesy of Lander

```bnf
                  ;; A Condlist is either a Statement, or a comma-separated list of Statements.
                  ;- Statements are evaluated left-to-right,
                  ;  and the first whose Condition returns true will apply its Effect
                  ;  and return its Value as output.
                  ;- This corresponds to the text you type into an LTX value.
                  ;- ex. Everything to the right of '=' here is a <condlist>:
                  ;      my_condlist = {-A -B} X, {-A +B} Y, Z
       <condlist> ::= <statement> | <condlist> "," <statement>

                  ;; A Statement is a space-separated series of Condition, Effect, and Value.
                  ;- Each of these is optional. As such, an empty condlist is considered valid.
                  ;- If a Statement's Condition evaluates to true, its Effect is applied,
                  ;  and its Value is returned as output.
      <statement> ::= <opt-condition> " " <opt-effect> " " <opt-value>

                  ;; Optional elements may be omitted.
  <opt-condition> ::= <condition> | ""
     <opt-effect> ::= <effect> | ""
      <opt-value> ::= <value> | ""

                  ;; A Condition is a list of Actions surrounded by curly braces.
                  ;- Actions are evaluated left-to-right and combined via logical AND to produce a boolean.
                  ;- Call / Not-Call actions within a Condition namespace via xr_conditions.
                  ;  (i.e. =func(1, 2, 3) will call xr_conditions.func(obj1, obj2, {1, 2, 3}))
      <condition> ::= "{" <actions> "}"

                  ;; An Effect is a list of Actions surrounded by percent signs.
                  ;- Actions are evaluated left-to-right, and their return values are ignored.
                  ;- Call / Not-Call actions within an Effect namespace via xr_effects.
                  ;  (i.e. =func(1, 2, 3) will call xr_effects.func(obj1, obj2, {1, 2, 3}))
         <effect> ::= "%" <actions> "%"

                  ;; A Value is simply a string, and represents the condlist's output.
          <value> ::= <string>

                  ;; Lists of Actions are separated with spaces.
        <actions> ::= <action> | <actions> " " <action>

                  ;; An Action is either a Has, Not-Has, Randomize, Call, or Not-Call.
         <action> ::= <has> | <not-has> | <randomize> | <call> | <not-call>

                  ;; A Has action is a plus sign followed by an Info.
                  ;- If used inside a Condition, it tests for the presence
                  ;  of the given Info on the player actor.
                  ;- If used inside an Effect, it adds the given Info to the player actor.
            <has> ::= "+" <info>

                  ;; A Not-Has action is a minus sign followed by an Info.
                  ;- If used inside a Condition, it tests for the absence
                  ;  of the given Info on the player actor.
                  ;- If used inside an Effect, it removes the given Info from the player actor.
        <not-has> ::= "-" <info>

                  ;; An Info is simply a string, and represents a key saved on an actor.
           <info> ::= <string>

                  ;; A Randomize is a tilde followed by a number.
                  ;  It is equivalent to a Call action whose function returns 'math.random(1,100) > number'.
      <randomize> ::= "~" <number>

                  ;; A Call action is made up of an equals symbol followed by a
                  ;; function name and braced parameter list.
                  ;- It evaluates the given function, with different semantics depending
                  ;  on the enclosing element.
                  ;- If used inside a Condition, it expects the function to return a boolean.
                  ;- If used inside an Effect, it ignores return value,
                  ;  and expects the function to apply some side-effect to the game state.
           <call> ::= "=" <function-name> "(" <function-params> ")"

                  ;; A Not-Call action is made up of an exclamation mark followed by a
                  ;; function name and braced parameter list.
                  ;  It behaves the same as a Call action,
                  ;  but applies a logical NOT to its return value.
       <not-call> ::= "!" <function-name> "(" <function-params> ")"

                  ;; Function parameters may be empty, singular, or separated by colons.
<function-params> ::= "" | <function-param> | <function-params> ":" <function-param>

                  ;; A function parameter is simply a string,
                  ;; and will be passed as such during runtime.
                  ;- As a result, functions must convert boolean and numeric values manually.
 <function-param> ::= <string>
```
