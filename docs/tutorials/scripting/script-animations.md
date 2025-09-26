---
tags: [LUA, 3D Animation]
---

# Scripted Animations

___

<Authors
  authors={["etherealstalkermodding"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## Theory

The first thing to know is that animations can be divided into a few categories:

### Motions Theory

* They represent actual hands, NPCs or actor movements
* Stored in [*.omf](../../references/file-formats/animations/omf.md) files
* Unique to an object

In this article we’ll focus on hands animations which are, for example, sprinting or weapons reloading. FDDA items animations are also motions. Motions are usually unique to a specific object. For example, AK74 reload animation will only look nice when used with AK74 or any other gun that is set up for this specific motion. That means you can still play it in your script with empty hands, but if you play it while holding a PKM the machine gun won’t play any reload animation at all.

Why so many details, you may wonder? Point is, a motion can have interesting use cases. For example, you can play a pistol holstering animation to temporarily hide one or both hands. Or you can use it for gestures as well as other unarmed animations, items animations - there's quite enough room for creativity.

Also, an *.omf file itself is not a motion. \*.omf files usually store multiple motions. If you want to add a new motion, you’ll need to either

1. put your motion into an existing *.omf file or
2. make a new *.omf file that will store your motions.

### *.anm animations Theory

In turn, these can be divided into two subcategories:

#### Camera animations Theory

These are much simpler due to their nature. Camera animations represent a screen effect - for example, leaning when an actor equips a helmet or a suit, ‘kickback’ effect when enhanced recoil effects are enabled, camera animations when reloading (mostly used by weapon mods like Boomsticks and Sharpsticks; not to be confused with hands motions) etc.

#### ‘Universal’ animations

This is not an official name, of course, it’s just something I came up with to distinguish these from the simple screen effects. They're also called 'Blend animations' in engine. I’d better describe them with an example.

In Anomaly, there’s a ‘misfire’ animation. Try to shoot a gun without any ammo, and you’ll see slight hands movement. This is ‘misfire.anm’ animation.

Point is, this is not exactly a screen effect type of [*.anm](../../references/file-formats/animations/anm.md) file, and yet this is not an *.omf-type motion. It can be used with any object the actor is holding, i.e. it’s not tied to a specific gun.

So technically, these are both .anm files. I just decided there needs to be some sort of distinction. As of now this documentation focuses on playing 'blend' animations.

.anm are separate files unlike motions from *.omf files, and every single .anm file can be just placed into **anims/** folder in gamedata and used directly.

### *.ppe effects Theory

These are camera animations with more possibilities: besides camera movements, they can also include, for example, duality effect (when drinking vodka or when there was an explosion next to the actor), grain effect in radiation zones etc. Vanilla night vision is also a [*.ppe](../../references/file-formats/postprocceses/ppe.md) effect.

*.ppe files work similarly to .anm files - they’re separate and go to **anims/** folder as well.

___

## Practice

Now let’s have a look at what we need to play animations in scripts.

### Motions

To play a motion, we need a few components:

1. An [*.ltx](../../references/file-formats/conf-script/ltx.md) file containing the basic parameters of the motion we’re going to use.
2. A script function to play it.
3. An *.omf file that contains the motion we want to play.
   1) Currently knows paths:
      1) **gamedata\meshes\anomaly_weapons\hud_hands_animation** - for hud hands animations

#### Setting up motion parameters

1. Create a config [*.ltx](../../references/file-formats/conf-script/ltx.md) file in **configs/items/items** and give it any name, but make sure it starts with **items_**. Example: **items_my_anims.ltx**.
2. Set the parameters. We’ll examine them by looking at this example.

```ini
[anim_my_sec]

    hands_position              = 0.033, -0.155, 0.1

    hands_orientation           = 0, 0, 0

    hands_position_16x9         = 0.033, -0.155, 0.1

    hands_orientation_16x9      = 0, 0, 0

    anm_my_anim                 = name_of_motion_that_will_be_played
```

**\[anim_my_sec]** is an animation section name. It’ll be used in the script.

**hands_position**, **hands_orientation**, **hands_position_16x9** and **hands_orientation_16x9** are hands position/orientation parameters. They work similarly to weapon position parameters.

**anm_my_anim** is a motion name. From what I saw, it should always be started with **anm_** in such a config. Not to be confused with an *.omf file name. For example, if your \*.omf file is called **my_new_file.omf** and it stores a motion called **my_motion_1**, specify **my_motion_1** here.

To make a test placeholder, you can also open any weapon config file and choose any of the motions specified there (like, `anm_ak74_reload`, `anm_svd_sprint` etc.)

#### Script function

The function that lets you play a motion is:

```lua
game.play_hud_motion(hands, anim_section_name, motion_name, bMixIn, speed)
```

Now let’s have a closer look at its arguments.

1. (int) **hands**
    * Specifies what hands will be used to play an animation. 1 - left hand only, 0 - right hand only, 2 - both hands.
    * Note that it's not possible to play a left-handed (like detector draw) animation for the right hand. But you still can play any two-handed animation with only one of the hands.
2. (string) **anim_section_name**
    * This is the name of the animation section specified in the config file.
    * In our example this is **\[anim_my_sec]**.
3. (string) **motion_name**
    * This is the name of the motion within the specified section in the config file.
    * In our example this is **anm_my_anim**.
4. (bool) **bMixIn**
    * This one is a bit unclear - it’s missing from `lua_help.script`, and I’m not sure if I understood how it works correctly. This is how this argument is named in the engine, probably it has something to do with mixing or transition from one motion to another.
5. (float) **speed**
    * Sets the playback speed of an animation. Example: 0.5, 1.2, 5.5 etc.

#### Supplementary functions

```lua
game.hud_motion_allowed()
```

Checks if a hands motion can be played at the moment. Useful as an additional safety check. Returns True or False.

```lua
game.get_motion_length(anim_section_name, motion_name, speed)
```

Gets the specified motion length. The parameters are identical to those in `play_hud_motion`.
Note that it returns time in milliseconds, so in order to get the actual length you’ll need to divide the result by 1000. Useful to know when the motion is over.

```lua
game.stop_hud_motion()
```

It will stop any hands motion that is currently playing (since it can’t accept a specific motion as an argument), not only the one you’re playing in your script.
Example: you have an animation from FDDA that is currently being played. This function is called from your script, intentionally or not. It will stop the current FDDA animation as well, despite the fact that it wasn't called from any of the FDDA scripts.

#### Things to consider

1. It’s safer to always stop the looped animations explicitly. This can be done by:
    1. playing a non-looped and non-restart animation - the previous one will be stopped.
    2. calling `game.stop_hud_motion()`.
2. Consider adding more protection from breaking something.
    1. Know when to stop an animation and how not to make it looped when it’s not wanted. Remember to check the necessary conditions to make sure it makes sense to play it at all at the current moment.
    2. Know the callbacks you’re using to play animations. This may affect the animation behavior. Incorrect callback usage may lead to unwanted results, softlocks or sometimes even crashes.
    3. Call `game.only_allow_movekeys(true)` if you don’t want the user to break an animation by pressing any action keys (like item quick use), and then restore the controls with `game.only_allow_movekeys(false)`.
    4. `hide_hud_inventory()` and `db.actor:activate_slot(0)` can be used to close the backpack inventory or force hide an active weapon if needed. Detectors can be manipulated in a similar way with:

```lua
    local det = db.actor:active_detector() or nil
    det:switch_state(2)
```

and then restored with:

```lua
    det:switch_state(1)
```

#### Tips

1. You can use console command `time_factor N` where N goes float from 0 to 1 to slow down the game time. This can be useful for testing purposes.

### *.anm animations

It’s simpler to play these. Here we don’t need any configs. The files are played directly. The function is `game.play_hud_anm(path, hands, speed, power, looped, restart)`.

In this case I assume the played animation is “misfire.anm” mentioned earlier - I used this function for it in my addon. You can try it with different animations.

The arguments are:

1. (string) **path**
    * Path to the .anm file.
    * It is predefined that a file is in the **gamedata/anims** folder. That being said, the path should look like this, for example: `"camera_effects\\actor_move\\strafe_left.anm"`.
    * The real path in this case is `gamedata/anims/camera_effects/actor_move/strafe_left.anm.`
    * If the file is in the root **anims/** folder, just specify the file name.
2. (int) **hands**
    * Specifies what hands will be used to play an animation. 1 - left hand only, 0 - right hand only, 2 - both hands.
3. (float) **speed**
    * Sets the playback speed of an animation. Example: 0.5, 1.2, 5.5 etc.
4. (float) **power**
    * Sets the ‘amplitude’ of an animation. The more it is, the more noticeable the animation will be. When set too low, it may be too ‘faint’. Example: 0.51, 1.65, 5.1 etc.
5. (bool) **looped**
    * Defines if an animation will loop until stopped by any means. Can be True or False.
6. (bool) **restart**
    * Specified whether or not an animation can be restarted after it was finished, or it should only play once. Can be True or False.

#### Supplementary functions

```lua
game.stop_hud_anm(path, force
```

Stops a specific .anm from playing. **path** is identical to the one above. **force** is a boolean parameter which makes it possible to force stop it - a bit more ‘harsh’ method.

```lua
game.stop_all_hud_anms(boolean)
```

Stops all .anm’s that are currently played.

```lua
game.set_hud_anm_time(path, time)
```

This function alters the playback speed of the specified .anm file. **path** is still the same as it was mentioned earlier, and **time** is actually a speed value (float).

The name may be a bit confusing, but judging by the engine code it actually manipulates the .anm speed:

```lua
float speed = (anm->anm->anim_param().max_t - anm->anm->anim_param().t_current) / time;
```

And a descriptive example in `actor_effects.script`:

```lua
game.play_hud_motion(1, mc_anm_sec, "anm_hide_hand", true, hide_hand_speed)
new_speed = game.set_hud_anm_time(anm_name, ((mc_anm_time_1 + mc_anm_time_2) / 1000) + anm_additional_length)
```

#### Things to consider

1. Unlike motions, .anm’s can be stopped directly by calling `game.stop_hud_anm`. It makes it possible to stop a specific .anm only.
2. .anm’s can be ‘layered’ - i.e. it’s possible to play two or more .anm files at the same time. This can provide interesting and good-looking results.
3. However, it may be tricky to play a few .anm’s with the same name at the same time because the function relies on the file name (which is already played in this case). If you want to play the same effect but with different parameters, consider making a copy of the .anm you use, give it another name and play them with two functions with different arguments according to the desired result.
4. In practice, .anm playing parameters often require fine-tuning by testing it in-game. The same set of parameters for different .anm's may often lead to substantially different results. Achieving a good looking result may require patience.
5. Though .anm's usually can't cause a softlock or break something substantially, it's still advised to stick to the safety recommendations described in the 'Motions' section.

### *.ppe effects

These are the functions for them:

1. `level.add_pp_effector(path,id,looped)`
2. `level.set_pp_effector_factor(id,power)`
3. `level.remove_pp_effector(id)`

The first one is used to start a .ppe effect. Arguments:

1. (string) **path**
    * It works absolutely the same way the **path** argument from `game.play_hud_anm` does.
2. (int) **id**
    * An ID of the effect. Can be any number.
    * Used for removal of the effect later on.
3. (bool) **looped**
    * Defines if the effect will loop until stopped by any means. Can be True or False.

The second one is used to alter an already existing effect added by `add_pp_effector`. Arguments:

1. (int) **id**
    * The ID of the previously created effect.
2. (float) **power**
    * Effect intensity factor from 0 to 1.

The third one stops and removes the added effect. The only argument is **id** - use the same one you specified when adding the effect with `add_pp_effector`.
