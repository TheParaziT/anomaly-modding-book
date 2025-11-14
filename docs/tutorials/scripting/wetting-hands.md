---
title: Wetting Our Hands
draft: false
---

# Wetting Our Hands

___

At the end of this guide you'll grow enough to be a modder. Just kidding, lol.

___

Nothing better for a start than actually starting, don't you think?

Who

cares

about

boring

theory.

I sure don't, especially while teaching people.

Let's finally take our script into the game! Go to your favorite Anomaly installation and navigate into `gamedata/scripts`. Don't have it? Create it. There, create a file `my_ingenuous_script.script` any way you want. All script files in the folder will be automatically included in the game - cool, right?

## Hello, World?

Let's start by showing the player some nice message. Function `news_manager.send_tip` does wonders in this regard - let's use it! Here is a text for the script:

*my_ingenuous_script.script*

```lua
function on_game_start()
    RegisterScriptCallback("actor_on_first_update", actor_on_first_update)
end

function actor_on_first_update()
    news_manager.send_tip(db.actor, "Your mum gay", nil, nil, 30000)
end
```

By loading your favorite saved game you will now be shown the state of affairs in the world. You don't see the message? Welp, idk, try again, works on my end.

Let's see how it works:

1. Function `on_game_start` is always called after loading all the scripts in `scripts` folder. That happens really early in the loading screen, and the game is not initialized at this point, so we need another time to show the message.
1. Callback `actor_on_first_update` is fired exactly once after the game is loaded. This is the point in time where the game shows you the "Press any key to continue" in the loading screen, but game session already started, so it's fine.
1. Now we actually send the message in function `actor_on_first_update`. `db.actor` is player, `30000` is for how long the message will be shows, everything else is irrelevant.

## A little cheating incident

Just showing stuff is no fun, we need Game Mechanics, of course. Lets give player a RPG-8 every time you press "O". Delete everything in your script and write this:

*my_ingenuous_script.script*

```lua
function on_game_start()
    RegisterScriptCallback("on_key_press", on_key_press)
end

function on_key_press(key)
    if key == DIK_keys.DIK_O then 
        alife_create_item("underwear", alife():object(0))
    end
end
```

Try it out.

Your mighty ~~soaked underwear~~ *RPG-8* is waiting for you, you dirty cheater.

You should already know how it goes. Here are the important stuff:

1. Callback `on_key_press` gives you a key from DIK_keys table. DIK_keys is imported from engine, check `lua_help.script` for other keys.
1. `0` is the id of actor. `alife():object(0)` gives you the *server object* of actor.
1. `alife_create_item` creates an item inside the inventory of a given server object.

Easy? Easy.

gg go next
