---
title: Dialogues
tags:
  - LTX
  - XML
  - LUA
description: Guide for creating and managing dialogues in quests
keywords:
  - Dialogue
---

# Dialogues

___

<Authors
  authors={["сomradeсatilina"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## Chapter 1 : Concerned Files

The files you need are:

**File :** `_unpacked\configs\gameplay\character_desc_*.xml`

In this file you have to add your dialogue to the concerned NPC. This is done by adding the line: <actor_dialog>XXX</actor_dialog>

**File :** `_unpacked\configs\gameplay\dialogs_*.xml`

In this file you construct the dialogue tree.

**File :** `_unpacked\configs\gameplay\text\eng\st_dialogs_*.xml`

In this file you write the text of your dialogue.

:::note
If you're doing a custom NPC, it's advisable to not use preexisting files but to add your own. You can check under "NPC creation" how to include your own files. If you're adding dialogue to a preexisting NPC, you will have to add your `<actor_dialog>XXX</actor_dialog>` in his file, but you can use a 'custom dialogs_*.xml' file for the dialogue tree.
:::

**File :** `_unpacked\configs\gameplay\text\eng\st_dialogs_*.xml` doesn't need to be included.

## Chapter 2 : Basic dialogue tree

As an example, we will use a preexisting NPC - the barman in Rostok.

You will find him in

**File :** `_unpacked\configs\gameplay\character_desc_bar.xml`

under the name "bar_visitors_barman_stalker_trader".

### Step 1

Add <actor_dialog>my_custom_dialogue_1</actor_dialog>

"my_custom_dialogue_1" is an example, you can use whatever you want as long as it's unique.

### Step 2

We create the dialogue tree:

In this example we will use a preexisting dialogs file, although it's strongly recommended to add your own file to your mod.

 **File :** `_unpacked\configs\gameplay\dialogs_bar.xml`

The basic structure of a dialogue tree is the following:

```xml title="_unpacked\configs\gameplay\dialogs_bar.xml"
<dialog id="my_custom_dialogue_1">
  <phrase_list>
    <phrase id="0">
      <text>my_custom_dialogue_1_0</text>
      <next>1</next>
    </phrase>
  <phrase id="1">
    <text>my_custom_dialogue_1_1</text>
    </phrase>
  </phrase_list>
</dialog>
```

- `<dialog id="my_custom_dialogue_1">`

 This is the link between `<actor_dialog>my_custom_dialogue_1</actor_dialog>` and the dialogue tree.

- `<phrase_list>`

 Your whole dialogue tree has to be inbetween these nodes.

- `<phrase id="0">`

  This is one branch of the tree. Note that 0 is the first line of the actor and 1 is the NPC's answer. The exception is `<start_dialog>` - the dialogue shown if you talk to the NPC the first time. In this case 0 is the NPC and 1 is the actor.

- `<text>my_custom_dialogue_1_0</text>`

  my_custom_dialogue_1_0 is the text string which will get translated by the game.

- `<next>1</next>`

  This handles which dialogue branch will be shown next.

:::note
Notice that every node starts with `<XXX>` and is closed with a "/" : `</XXX>`. This is essential - take care to always close your nodes or the game will crash on boot.
:::

### Step 3

Now we need to add the text of the dialogue.

In order to do that, add in your

```xml title="_configs\gameplay\text\eng\st_dialogs_*.xml"
<string id="my_custom_dialogue_1_0">
  <text>Hy barkeep, I made my own dialogue.</text>
</string>

<string id="my_custom_dialogue_1_1">
  <text>Very impressive.</text>
</string>
```

Now, if you load your mod, you should see an dialogue option for the barkeep in Rostok "Hy barkeep, I made my own dialogue." and he will answer "Very impressive."

## Chapter 3 : Advanced dialogue tree
  
Now we will add multiple choice answers for the player:
  
```xml
<dialog id="my_custom_dialogue_1">
  <phrase_list>
    <phrase id="0">
      <text>my_custom_dialogue_1_0</text>
      <next>1</next>
  </phrase>

    <phrase id="1">
      <text>my_custom_dialogue_1_1</text>
      <next>2</next>
      <next>3</next>       
    </phrase>

    <phrase id="2">
      <text>my_custom_dialogue_1_2</text>
      <next>4</next>
    </phrase>
        
    <phrase id="3">
      <text>my_custom_dialogue_1_3</text>
      <next>5</next>
    </phrase>
      
    <phrase id="4">
      <text>my_custom_dialogue_1_4</text>
    </phrase>
      
    <phrase id="5">
      <text>my_custom_dialogue_1_5</text>
    </phrase>
  </phrase_list>
</dialog>
```  
  
Now after the first exchange, the player will have two options to answer: either option 2 or 3.

If the player chooses option 2, the NPC will answer with branch 4, and if the player chooses option 3, the NPC will answer with branch 5.
  
Note that if the dialogue is over, there is no `<next>` in the branch. The player will again see the starting dialogue options.
  
## Chapter 4 : The four horsemen of dialogue and the executor
  
The four major tools to handle a dialogue tree are the following:

- `<has_info>XXX</has_info>`
  
  Dialogue tree or dialogue branch will only show if the actor has the XXX info.
  
- `<dont_has_info>XXX</dont_has_info>`
  
  Dialogue tree or dialogue branch will only show if the actor doesn't have the XXX info.
  
- `<give_info>XXX</give_info>`
  
  Gives the actor the XXX info during a dialogue.

Alternatives are:

- on_death = %+XXX%
  
  This has to be added in the squad_descr file, and gives the info on the death of the squad it is linked to.
  
- give_info("XXX")
  
  This gives the info during the execution of a script.
  
- `<precondition>my_script_for_mod.my_condition</precondition>`  
  
Dialogue tree or dialogue branch will only show if the condition is met.
  
"my condition" is the name of a function which has to be defined in the script file "my_script_for_mod.script".
  
This tool is quite versatile, and is only limited by your coding skills (and the limitations of lua).
  
Last but not least, we have:
  
- `<action>my_script_for_mod.my_action</action>`
  
This will trigger a function "my_action" defined in the script file "my_script_for_mod.script".
  
This can be used to give a quest or to give the player an item, money etc.
  
## Chapter 5 : Putting everything together
  
Let's imagine the actor has a quest consisting in bringing a tuna can "conserva" to the barkeep.
  
So we have to write two functions, the first for the \<precondition> (so that you can only submit the quest if you have a tuna can in your inventory) and the second in order to give the tuna can.

Create the file "my_script_for_mod.script"

First we create the precondition:

```lua title="_gamedata\scripts\my_script_for_mod.script"
function my_condition()
  if db.actor:object("conserva") then
    return true
  end
  return false
end  
```

"my_condition" can be named as you like, take care to use the same name in the script file and in the precondition.  

We can see that the script works as follows: it returns "false" by default, except if the condition is met: if (inside the actors inventory is an item called conserva) then return true  

Now we create the transfer  

```lua
function my_action(first_speaker, second_speaker)
  dialogs.relocate_item_section_from_actor(first_speaker, second_speaker, "conserva")
  dialogs.relocate_money_to_actor(first_speaker, second_speaker, 7500)
end 
```

This will remove the tuna can from the player's inventory (but not add it to the NPC) and give the player 7500 roubles.
  
Now that we added these two tools we can write the dialogue:
  
### Example 1: Curtailing the dialogue tree
  
We will use the dialogue tree in Chapter 2 as an example.
  
In this example, you want the dialogue tree to be available to the player only if he has a tuna can in his inventory. But, you also want to show the dialogue tree only if the player accepted a mission beforehand (imagine another dialogue tree before this one in which the dialogue branch gave the mission and the info). This is done by adding `<has_info>my_tuna_mission_given</has_info>`. Now this option will only show if the player also has the info `my_tuna_mission_given`.

But you also want to show the dialogue only once to the player, or else he will repeatatly be able to exchange tuna for money. This is done by adding `<dont_has_info>my_tuna_mission_done</dont_has_info>` and later in the dialogue `<give_info>my_tuna_mission_done</give_info>`. Now this dialogue will only be shown until the player resolves the quest.

In order to affect the dialogue tree, and not specific branches, the conditions, `has_info`, `dont_has_info` have to be before `<phrase_list>`.

```xml
<dialog id="my_custom_dialogue_1">
  <precondition>my_script_for_mod.my_condition</precondition>
  <has_info>my_tuna_mission_given</has_info>
  <dont_has_info>my_tuna_mission_done</dont_has_info>
    <phrase_list>

      <phrase id="0">
        <text>my_custom_dialogue_1_0</text>
        <next>1</next>
      </phrase>

      <phrase id="1">
        <text>my_custom_dialogue_1_1</text>
        <action>my_script_for_mod.my_action</action>
        <give_info>my_tuna_mission_done</give_info>
      </phrase>

  </phrase_list>
</dialog>
```  

### Example 2: Curtailing the dialogue branches
  
In the precedent example we saw how to hide the dialogue option until the conditions are met. Now we will do the same, but with a dialogue branch.
  
Again, we want this dialogue tree to be open only after the quest has been given and only until the quest has been resolved. This means we keep `has_info` and `dont_has_info`.
  
But this time, precondition will be used to show the dialogue option / branch only if the player has the tuna in his inventory.
  
In this example, the text is written directly inside the tree to ease the comprehension.
  
```xml
<dialog id="my_custom_dialogue_1">
  <has_info>my_tuna_mission_given</has_info>
  <dont_has_info>my_tuna_mission_done</dont_has_info>
  <phrase_list>
      <phrase id="0">
      <text>ABOUT YOUR TUNA MISSION</text>
      <next>1</next>
      </phrase>

      <phrase id="1">
      <text>YES, WHAT ABOUT IT?</text>
      <next>2</next>
      <next>3</next>       
      </phrase>

      <phrase id="2">
      <precondition>my_script_for_mod.my_condition</precondition>
      <text>I HAVE YOUR TUNA</text>
      <next>4</next>
      </phrase>

      <phrase id="3">
      <text>I NEED MORE TIME TO FIND YOUR TUNA</text>
      <next>5</next>
      </phrase>

      <phrase id="4">
      <text>THANK YOU VERY MUCH</text>
      <action>my_script_for_mod.my_action</action>
      <give_info>my_tuna_mission_done</give_info>     
      </phrase>

      <phrase id="5">
      <text>NO PROBLEM</text>
      </phrase>
  </phrase_list>
</dialog>
```  
  
Now every instrument is playing together. After initiating the dialogue by saying "about your tuna mission", the NPC will reply "what about it?"

Now the player has two options: branch 2 which will only show if he has a tuna can in his inventory and branch 3 which will always show.
  
If the player uses branch 2 - it will lead to branch 4 which triggers the tuna - money exchange and gives the info which will prevent the code to show the dialogue again (as we added `<dont_has_info>my_tuna_mission_done</dont_has_info>`)
  
Of course you can use `has_info` and `dont_has_info` also in the different dialogue branches in order to make the dialogue tree more complex.

:::note
I never tried it, but I believe you cannot use precondition, `has_info` and `dont_has_info` to curtail the NPC replies. The NPC should always have only one `<next>`.
:::
