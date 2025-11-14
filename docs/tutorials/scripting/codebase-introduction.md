---
title: Introduction to Codebase
draft: false
---

# Introduction to Codebase

___

Prepare for the worst. You'll be either right, or pleasantly surprised.

___

Codebase. What a nice word for a folder filled with Poorly-But-Sometimes-Good written code. Say hello to our little friend `/gamedata/scripts` - here you will find every script in the game, and you will even be able to read some of them. Here are the important ones:

1. `_g.script`  - your global namespace. Everything defined here can be accessed in any script. If you don't understand where a function comes from, it's probably here. For example, here lies `CreateTimeEvent`.

1. `lua_help.script` - engine imports. It's not really a lua file, but it's important nevertheless. Every namespace defined here is globally accessible, and you better avoid name collisions with it - otherwise death is imminent. Documentation is... Not there, but some names are understandable, so you might be able to use it anyway.

1. `axr_main.script` - a table with all callbacks is defined there. Don't register your callbacks there, use `RegisterScriptCallback` from `_g` instead.

These are the ones you need to know about. Every other functionality is found through global search. Ctrl-Shift-F in your favorite editor. You're welcome.
