---
title: Server and Game Objects
tags:
    - LUA
description: Tutorial for server and game objects in scripting
draft: false
---

# Server and Game Objects

___

Computers are stupid! But so are we, so it's actually okay.

___

So, in short, we don't want our single-threaded XRay Engine to implode...

That's why we have server objects and game objects! A-Life is inherently complex and has up to 65535 objects in the game, each having a ton of computations. We kinda don't want a ton of computations, so we only compute interesting things around player and everything else is simplified.

## Server objects

All objects in the game have two faces: server and level objects. Server object exists *always*, and has all the really basic stuff about the object: what it is, its coordinates, its parent object and some more basic info. Server objects are also called *offline* objects, but mainly just server objects.

You can get a server object for something in the game using `alife():object(id)`. Because the engine functions are Really Fucking Fragile we also have a function in _G called `alife_object` which does the same, but also checks that your id is what everyone expects it to be (a number). Better use it, mostly no overhead.

Special case: id of player (or *actor*) is 0, and player server object can be obtained with `alife():object(0)`.

## Level objects

Unsurprisingly, there also are *online* objects, or *game* objects, or *level* objects. Interesting parts about them: they only exist around player and they have more functionality than server objects. Online radius setting defines what exactly is "around".  

You can get a level object for something using `level.object_by_id(id)`. All the level objects are also saved in `db.storage` table, which is pure lua and won't randomly break. As with server objects, we have a function in _G called `get_object_by_id` which will perform a sanity check and give you the object either from `db.storage` or from `level.object_by_id`. Use it, it's good.

Special case: level object of actor is always online and is saved in `db.actor`.

## :3

| - | Server object | Level object |
|--:|:---------:|:----:|
| Exists | Always | Only around player |
| Functionality | Basic | Everything You Need |
| To obtain | `alife_object(id)` | `get_object_by_id(id)` |
| Common identifier | `se_obj` | `obj` |
| Id | `se_obj.id` | `obj:id()` |
| Section | `se_obj:section_name()` | `obj:section()` |
