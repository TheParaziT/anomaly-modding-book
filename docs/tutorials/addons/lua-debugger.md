---
tags:
  - LUA
title: Lua Debugger
draft: false
---

# Lua Debugger

___

<Authors
  authors={["ix_ray_platform", "saloeater"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

Always up-to-date instruction on the Modded Exes repository: [GitHub](https://github.com/themrdemonized/xray-monolith#script_debugger_instructions)

* Debug scripts with VSCode and LuaPanda, support by IX-Ray Platform
  * Download latest version of [ME](https://github.com/themrdemonized/xray-monolith) 
  * To use it, you need to install VSCode, [Lua](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) and [LuaPanda](https://marketplace.visualstudio.com/items?itemName=stuartwang.luapanda) extensions
  * Open your `gamedata/scripts` folder in VSCode
  * Download these files into your `gamedata/scripts/.vscode` folder:
    * [`launch.json`](https://raw.githubusercontent.com/themrdemonized/xray-monolith/all-in-one-vs2022-wpo/gamedata/scripts/.vscode/launch.json)
    * [`settings.json`](https://raw.githubusercontent.com/themrdemonized/xray-monolith/all-in-one-vs2022-wpo/gamedata/scripts/.vscode/settings.json)
  * In VSCode, go to `Run and Debug` section and start debugging or press F5 key
  * Return to the game and open in-game console with `~`
  * Type console command `lua_debug 1` in console and reload the save or start a new game

There are several ways to enable debugger from the engine side:
1) Auto-attach
   * add `-ldbg` to launch arguments
2) Press F11 to open ImGui window and go to Debug > LuaDebug > Start
3) Console
    * Open in-game console with `~`
    * Type console command `run_string debugger_attach()`

If you did everything correctly and engine is working properly too, you will get an entry breakpoint at `global.lua` file in VSCode.

Unless you are using auto-attach solution, you have to enable the debugger every time you start a new game or load a save

Debugger is working dynamically, so you can add/remove files from your VSCode folder and it will automatically update the list of files available for debugging.

Debugger doesn't support workspace with multiple folders, so you HAVE to use "File" -> "Open Folder" to make debugger work
