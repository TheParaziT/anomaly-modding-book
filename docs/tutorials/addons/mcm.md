---
title: Anomaly MCM Documentation
tags:
  - LUA
description: Anomaly MCM Documentation
keywords:
  - MCM
  - Mod Configuration Menu
draft: false
---

# Anomaly MCM Documentation

___

<Authors
  authors={["ravenascendant", "igigog"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## Before you start

<AuthorComment author="igigog">
Oh hey, Igi here! As you'll see from these docs, setting up MCM takes a lot of somewhat arcane tables, and debugging MCM can be the biggest pain in the ass.
To make my life quite a bit easier, I created MCM Builder ([ModDB](https://www.moddb.com/mods/stalker-anomaly/addons/mcm-builder) | [GitHub](https://github.com/ProfLander/mcm-builder)) - a modding tool to create MCM pages
in a clear object-oriented way. Really recommend to check it out. There are no docs for it, just check in the script what's available - it's very easy to read.

This is how it looks like with MCM Builder:

```lua
Tree = mcm_builder.Tree
Page = mcm_builder.Page
Checkbox = mcm_builder.Checkbox
Title = mcm_builder.Title
Line = mcm_builder.Line
Description = mcm_builder.Description

function on_mcm_load()
    local tree = Tree.new("MCM_Builder")
    local page = Page.new("With Checkbox")
    local check = Checkbox.new("My_cool_checkbox"):default(true)
    page:add(check)

    local page_two = Page.new("With_description_and_line")
    local title = Title.new("uwu")
                    :text("Title??? Omegalul")
                    :color(200,100,50,255)
    page_two:add(title)
    page_two:add(Description.new("descr"):text("What a nice description"))
    page_two:add(Line.new())

    return tree:add_page(page):add_page(page_two):build()
end
```

Now, to the actual guide.
</AuthorComment>

## Start

Inspired by MCM mod for the Bethesda games, this provides similar functionality for Anomaly. Adds a "Mod Configuration Menu" (MCM), accessible in the in-game menu, that allows players to change settings for mods that are configured for MCM. MCM currently supports:

- Check boxes
- Input boxes
- Sliders
- Radio buttons (horizontal or vertical layout)
- Drop-down lists
- Key binds (with advanced functionality for double-presses, long-press, and modifiers)
- Simple formatting aids (line breaks, image boxes, section breaks, descriptions and tooltips)

## Adding MCM Functionality

In order to add MCM functionality to your mod, you'll need to create a script in `gamedata/scripts` ending in `mcm.script`. You can use a `_` to separate this suffix from the name of the script but this is not necessary. For example, both `mod_name_mcm.script` and `modnamemcm.script` will work.

Within these scripts, MCM will execute the function `on_mcm_load()`. This function must define an options tree, where you'll set up the options for your mod - details on how to do so are in the sections below. The function `on_mcm_load()` must return this valid options tree to work.

In addition to returning a valid options tree `op`, you may return a string to name a collection. This string can be anything, and is used to create a category for one or more options trees. Options that are grouped together will be presented together under a common heading, and clicking "Apply to All" in the MCM will apply to all options trees grouped under the same collection.

**Note**: The collection name will become the root name for your settings path and translation strings, instead of the mod name. As a root name, you should take care to ensure it will not conflict with another mod's name.

### Setting up your options tree in MCM

The basic structure of your `mod_name_mcm.script` structure is as follows:

```lua
function on_mcm_load()
  op = { 
    id = "modname", sh = true, gr =
      {  -- options tree goes here
        { id = "title1", type = "slide", link = "AMCM_Banner.dds", text = "ui_mcm_example_text", size = {512,50}, spacing = 20 },
        { id = "value_1", type = "input", val = 2, def = some_value_here },
      }
    }
  return op
end
```

Your options tree is what will actually get displayed to the player in MCM. At minimum it must include some unique ID `id` (string), and at least one group `gr`. The group is a table that contains either a further sub-tree, or your options. You may also set whether each table is shown or hidden with the boolean value `sh`.

Every item in the `gr` table (or tables) needs a ID `id`, and a type `type`. Certain types have [dependent variables](#dependent-parameters) that must also be defined for them to work.

### Using MCM Options in your mod

In your mod, simply replace the value of the variable that you want to be controlled in MCM with `(your_mod_mcm.get_config("option_id"))`.

For example, let us say we have a variable called `example_value` that we want to be boolean, and controlled using an MCM check box. You would need to define this value in your mod as:

`example_value = (my_mod_mcm.get_config("example_value"))`

And inside your `my_mod_mcm.script`, you would need an options tree as follows:

```lua
function on_mcm_load()
  op = { 
     id = "my_mod", sh = true, gr =
      {
        { id = "example_value", type = "check", val = 1, def = true },
      }
    }
  return op
end
```

Now, players should see an entry for "my_mod" in their MCM menu, with a single checkbox for "example_value" that they can set to be on or off.

### Text Strings for MCM

These work very similarly to the way `ui_options` does. The only difference is that all instances of `ui_mm_` are renamed to `ui_mcm_`.

MCM takes text strings from your mod's `gamedata/config/text/<eng or rus>` folder for display. The file itself does not have any special naming requirements, only that it must be a `.xml` file. You will need at minimum:

- One entry for the name of your mod in the MCM menu, with the ID `ui_mcm_menu_modname`
- One entry per option item, with the prefix `ui_mcm_`, such as `ui_mcm_example`
- (Optional) Descriptive tooltips for option items, which should start with `ui_mcm` and end with `_desc`, for example `ui_mcm_example_desc`

Any descriptive strings will be displayed as a tooltip when the cursor hovers over that menu item.

Option item names follow this format: `ui_mcm_(id of the first group)_(id of the Nth group)_(value name)`. Let's reuse the example `on_mcm_load()` from before:

```lua
function on_mcm_load()
  op = { 
     id = "modname", sh = true, gr =
      {  -- options tree goes here
        { id = "title1",  type = "slide", link = "AMCM_Banner.dds", text = "ui_mcm_example_text", size = {512,50}, spacing = 20 },
        { id = "value_1",  type = "check", val = 1, def = some_value_here },
      }
    }
  return op
end
```

Here, we would need to define the following strings:

- `ui_mcm_menu_modname` Should display in the MCM for your mod's name
- `ui_mcm_modname_title1` Appears in the slide/header
- `ui_mcm_example_text` Text that appears in the `text = ` call of the first item
- `ui_mcm_modname_value_1` Name of the `value_1` entry
- (optional) `ui_mcm_modname_value_1_desc` Text for the tooltip that would appear for `value_1`

If a string is missing or broken, the ID will be displayed instead.

### Summary

- Create a `your_mod_name_mcm.script` file
- Make sure this script file defines an option tree
- Make sure this options tree reflects the settings you want to be adjustable
- Set up variables in your mod to use `(your_mod_mcm.get_config("option_id"))`
- Create relevant text strings for your MCM Options
  - Each item in the options needs a **name**, and an optional **_desc** string, which shows up as a tooltip

## Saving MCM settings

By default, MCM will read the current value of a given setting from the `axr_options.ltx` file without a `[curr]` functor, and will write values to `axr_options.ltx` if no `[functor]` is provided. For simple global settings, this will be more than adequate, and you will not need any functors.

The easiest way to read your settings is to call `ui_mcm.get(path)`, where `path` is the id field of the nested tables, down to the option in the table that you returned in `on_mcm_load()`. This usually takes the form of `"modname/settingname"` but you can break your settings into multiple panels if desired, resulting in a longer path. You can reference the options section of `axr_configs` for how Anomaly options menus translate into paths - the same system is used here.

`ui_mcm.get(path)` is cached, and falls back to the value you set in `[def = ]`.

As with `ui_options`, when MCM applies a settings change, it sends an `on_option_change` callback. You can use this to do a one-time read of your options into variables for your script. You can either get these values with `ui_mcm.get(path)`, or read them directly from `axr_configs` like so:

```lua
axr_main.config:r_value("mcm", path, type, default) --see _g for how r_value functions.
```

### Per-save MCM settings

*This uses [dph-hcl's original script](https://www.moddb.com/mods/stalker-anomaly/addons/151-mcm-13-mcm-savefile-storage). Refer to their mod and script for more.*

> dph-hcl's original function has been aliased here as `ui_mcm.store_in_save(path)`. This function can be called safely as MCM will simply print an error if dph-hcl's script is missing.

**tl;dr** You almost certainly don't need to set up per-save MCM settings. Your mod's MCM options will write to `axr_options.ltx` and that will work for 90% of cases.

The cases where you might want per-save MCM settings are:

- You want to save mod settings to the savegame file instead of globally
- You're building your settings dynamically and can't rely on a consistent path
- You like to over-complicate things

To store an option in a savegame instead of globally, call `ui_mcm.store_in_save(path)`. `path` can be a full option path, such as the one used by `ui_mcm.get(path)`, or a partial path. If a partial path is used, all options that contain that path will be stored in the save game. Partial paths must start with a valid root, and cannot end with a `/` character.

For example, take the following options menu:

```lua
function on_mcm_load()
  op =  
  {
    id = "example_example", gr =
    {
      { id= "example_one", sh = true, gr =
        {
          { id= "slide_example_example", type = "slide", link = "AMCM_Banner.dds", text = "ui_mcm_title_example_example", size = {512,50}, spacing = 20 },
          { id = "1check1", type = "check", val = 1, def = false},
          { id = "1check2", type = "check", val = 1, def = false},
        }
      },
    }
  }  
  return op
end
```

To store the second checkbox `1check2` in a savegame, you would call:

```lua
ui_mcm.store_in_save("example_example/example_one/1check2")
```

To store both `1check1` and `1check2` in a savegame, you would call:

```lua
ui_mcm.store_in_save("example_example/example_one")
```

To store all options of the mod `example_example` in a savegame, you would call:

```lua
ui_mcm.store_in_save("example_example")
```

`ui_mcm.store_in_save(path)` can be called at any time. It could be done as late as `on_game_start()` if one wanted to have an MCM option for global vs save-specific option storing. However, calling `ui_mcm.get(path)` in `on_mcm_load()` is a bad idea. `on_mcm_load` is called as part of building the the options table. `ui_mcm.get()` relies on the option table. If `get` is called while the table is being built, the results can be unpredictable, ranging from no consequence to corruption of the options table or settings file.

To prevent potential corruption, MCM detects if `get` is called while the options table is being built and crashes the game manually with a custom error message.

## List of MCM Parameters

### Option tree parameters

| Parameter | Type | Optionality | Description |
| --- | --- | --- | --- |
| `id`  | String  | Required | ID for the tree, should be different for each tree |
| `sh`  | Boolean | Optional | Determines whether to show (`true`) or hide (`false`) the tree |
| `text` | String | Optional | Display text for the tree in tree select. Overrides default display text |
| `precondition` | Table `{function, parameters}` | Optional | Shows tree options if precondition returns `true`, hides if precondition returns `false` |
| `output` | String | Optional | Text to show when `precondition` fails |
| `gr` | Table `{ ... }` | Required | Table of a sub-tree or options list |
| `id_gr` | String | Optional | Allows you to give option trees a group id. Must be used if `apply_to_all` is `true` |
| `apply_to_all` | Boolean | Optional | Each option tree with `apply_to_all = true` will have an "apply to all" button added to each option. Clicking it will apply option changes from this option, to all other trees from the same group. Trees with `apply_to_all` **must** have a group id |

### Required parameters

The following option parameters are **required** for all options:

- `id` (string) Option identity/name. Options are stored in `axr_main` or called in other scripts via its path (the IDs of sub-trees and options)
- `type` (string) Type of the element. See below for list of possible values.

### Possible types

These are the possible option types - that is, these types accept user inputs and therefore can be used to change your mod's options.

| Type | Description | Output |
| --- | --- | --- |
| `check` | Checkbox input | *On* or *off* |
| `list` | Drop-down list input | One out of a provided list of strings |
| `input` | Free input box | May be set to whatever value is typed inside |
| `radio_h` | Horizontal radio buttons (fits up to 8 items) | Exactly one value from the provided items |
| `radio_v` | Vertical radio buttons (fits any number of items) | Exactly one value from the provided items |
| `track` | Track bar or slider input | May be set to a numerical value between a provided `max` and `min` |
| `key_bind` | Keybind input | Creates a button that registers a keypress after being clicked. See additional documentation below. **Keybinds must have val = 2** |

Some types do not accept user input, and are designed to aid formatting and layout. Possible non-option types are:

| Type | Description |
| --- | --- |
| `line` | Simple horizontal line for separating parts of the options menu |
| `image` | Shows an image. Image box dimensions are 563x50px, with full-area coverage |
| `slide` | Creates a graphical "section header" with an image box on the left, and text on the right |
| `title` | Text title with user-defined text alignment |
| `desc` | Left-aligned text description |

### Dependent parameters

These parameters must be declared when certain other parameters are declared.

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Dependent parameter</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`val`</td>
      <td>Any option `type`</td>
      <td>Number</td>
      <td>
        Tells the script what kind of value the option stores. Acceptable values
        are `0` (string), `1` (boolean), and `2` (float)
      </td>
    </tr>
    <tr>
      <td>`cmd`</td>
      <td>Any option `type`</td>
      <td>String</td>
      <td>
        Ties an option to a console command, so that when the option value is
        changed, it is applied directly to the command. The option will show the
        command's current value.&lt;sup&gt;1&lt;/sup&gt;
      </td>
    </tr>
    <tr>
      <td>`def`</td>
      <td>Any option `type`</td>
      <td>
        Boolean / Number / String / Table `{"{"}function, parameters{"}"}`
      </td>
      <td>
        **Not required if `cmd` is used**. Default value of an option when no
        cached values are found in `axr_options.ltx`. Type depends on the type
        of the element.
      </td>
    </tr>
    <tr>
      <td>`min`</td>
      <td>`input` / `track` if `val = 2`</td>
      <td>Number</td>
      <td>
        Minimum viable value for an option. Ensures user input stays in a
        predefined range
      </td>
    </tr>
    <tr>
      <td>`max`</td>
      <td>`input` / `track` if `val = 2`</td>
      <td>Number</td>
      <td>
        Maximum viable value for an option. Ensures user input stays in a
        predefined range
      </td>
    </tr>
    <tr>
      <td>`step`</td>
      <td>`input` / `track` if `val = 2`</td>
      <td>Number</td>
      <td>How much a value can be changed in one step</td>
    </tr>
    <tr>
      <td>`content`</td>
      <td>`list` / `radio_h` / `radio_v`</td>
      <td>
        Table `{"{"}double pairs{"}"}` &lt;br&gt; Table `{"{"}function,
        parameters{"}"}`
      </td>
      <td>
        Declares an option's list of possible inputs.&lt;sup&gt;2&lt;/sup&gt;
      </td>
    </tr>
    <tr>
      <td>`link`</td>
      <td>`image` / `slide`</td>
      <td>String</td>
      <td>
        Path and filename (including extension) of the texture that you want to
        show in the image or slide image area. The assumed root folder is
        `gamedata extures`
      </td>
    </tr>
    <tr>
      <td>`text`</td>
      <td>`slide` / `title` / `desc`</td>
      <td>String</td>
      <td>String ID of the text to be shown</td>
    </tr>
  </tbody>
</table>

<sup>1</sup>: cmd options don't get cached in `axr_options.ltx`, instead they get stored in `appdata/user.ltx`. The \[def] parameter is not needed here since the engine applies default values to commands if they don't exist in `user.ltx`.

<sup>2</sup>: Pair-values for `radio_h` or `radio_v` are provided in the following format: `{ value, value string ID }`

Example:

```lua
-- for some group called groupID
{ id = "somelist", type = "radio_h", val = 2, content = { {0, "somelist_off"}, {1, "somelist_half"}, {2, "somelist_full"} }, def = 0 }
```

 In this example, you would need to provide three translation strings:

- `ui_mcm_lst_somelist_off`
- `ui_mcm_lst_somelist_half`
- `ui_mcm_lst_somelist_full`

Because all lists and radio button elements share the same prefix, `ui_mcm_lst`, it is important that the value string ID is something unique.

### Optional parameters

These parameters are entirely optional, and can be used for further customization.

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Dependent parameter</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`force_horz`</td>
      <td>`radio_h`</td>
      <td>Boolean</td>
      <td>
        Forces radio buttons into horizontal layout, no matter how many items
        there are
      </td>
    </tr>
    <tr>
      <td>`no_str`</td>
      <td>`list` / `radio_h` / `radio_v` / `track`</td>
      <td>Boolean</td>
      <td>
        If `true`, hides the content table translation string (i.e. the
        `opt_str_list_(string)`), instead showing the string from the table
        as-is without translations. For `track`, setting `no_str = true` hides
        the value next to the slider
      </td>
    </tr>
    <tr>
      <td>`prec`</td>
      <td>`track`</td>
      <td>Number</td>
      <td>
        Stands for 'precision'. Input value will be rounded **up** to have no
        more than this number of decimal places (e.g. with `prec = 3`, input
        values will round up to no more than 3 decimal places). Defaults to 6.
        &lt;br&gt; Should always be equal to or exceed the number of decimal
        places in `step`. Unless using `cmd` to pass this value into a console
        command, or more than 6 decimal places are needed in your input, this
        can be omitted.
      </td>
    </tr>
    <tr>
      <td>`precondition`</td>
      <td>Any option</td>
      <td>
        Table `{"{"}function, parameters{"}"}`
      </td>
      <td>
        Shows the option if precondition returns `true`, hides if precondition
        returns `false`
      </td>
    </tr>
    <tr>
      <td>`functor`</td>
      <td>Any option</td>
      <td>
        Table `{"{"}function, parameters{"}"}`
      </td>
      <td>
        Executes a function when the option's changes are applied. The value of
        the option is added to the end of the parameters list
      </td>
    </tr>
    <tr>
      <td>`postcondition`</td>
      <td>Any option with defined `functor`</td>
      <td>
        Table `{"{"}function, parameters{"}"}`
      </td>
      <td>
        If `postcondition` returns `true`, executes functor; otherwise, does not
        execute the functor
      </td>
    </tr>
    <tr>
      <td>`curr`</td>
      <td>Any option</td>
      <td>
        Table `{"{"}function, parameters{"}"}`
      </td>
      <td>
        Get current value of an option by executing the declared function,
        instead of reading it from `axr_options.ltx`
      </td>
    </tr>
    <tr>
      <td>`hint`</td>
      <td>Any option</td>
      <td>String</td>
      <td>
        Overrides default naming rules to replace an option's translation with a
        chosen string. Should not include the `ui_mcm_` prefix nor the `_desc`
        suffix.&lt;sup&gt;3&lt;/sup&gt;
      </td>
    </tr>
    <tr>
      <td>`clr`</td>
      <td>`title` / `desc`</td>
      <td>
        Table `{"{"}a,r,g,b{"}"}`
      </td>
      <td>Determines color of the text in ARGB format</td>
    </tr>
    <tr>
      <td>`align`</td>
      <td>`title`</td>
      <td>String, `"l" "r" "c"`</td>
      <td>
        Determines alignment of the title, left `"l"`, right `"r"`, or center
        `"c"`
      </td>
    </tr>
    <tr>
      <td>`stretch`</td>
      <td>`slide`</td>
      <td>Boolean</td>
      <td>
        Determines if the slide texture should stretch (`true`) or not (`false`)
      </td>
    </tr>
    <tr>
      <td>`pos`</td>
      <td>`slide`</td>
      <td>
        Table `{"{"}x,y{"}"}`
      </td>
      <td>Custom position for the slide texture</td>
    </tr>
    <tr>
      <td>`size`</td>
      <td>`slide`</td>
      <td>
        Table `{"{"}w,h{"}"}`
      </td>
      <td>Custom size for the slide texture</td>
    </tr>
    <tr>
      <td>`spacing`</td>
      <td>`slide`</td>
      <td>Number</td>
      <td>Adds a height offset in px, which can be used to add extra space</td>
    </tr>
  </tbody>
</table>

<sup>3</sup>: For example, this entry would force the script to use  `ui_mcm_some_random_string` and `ui_mcm_some_random_string_desc` for the name and description of the option `example`.

```lua
{ id = "example", type = "check", val = 1, def = true, hint = "some_random_string" }
```

### Additional key_bind information

Keybinds are gathered into two meta lists for users' convenience, which show at the very top of MCM as a list of every keybind that MCM provides. This means it is very important that your translation strings clearly identify what the key does, and which addon the keybind comes from.

The value stored by the key bind is the DIK_keys value of the key. The same number will be given to key-related callbacks.

Note that `curr` and `functor` **do not work** for keybinds. If you need this for some reason, post an issue on github describing the use-case you had for them, and if it's cool enough they might get fixed.

:::note
Old (pre 1.6.0) versions of MCM will not display `key_bind` and calling `ui_mcm.get` for it will return nil. Keep this in mind if you want to have backwards compatibility.
:::

#### key_bind utilities

MCM can track the held status of the Control and Shift keys, as well as flag that is true if neither is pressed. It also provides functions for detecting when a key is double-tapped, held down, or single-pressed. This increases the number of key combinations available for key binding. Users can set a configurable multi tap window, a value between 100 and 1000 ms.

**Tracking modifier keys**

You can track the status of modifier keys by using `ui_mcm.get_mod_key(val)`, where `val` can be `0` (`MOD_NONE`), `1` (`MOD_SHIFT`), `2` (`MOD_CTRL`), or `3` (`MOD_ALT`). It will return the following flags based on `val`:

```lua
ui_mcm.MOD_NONE  ui_mcm.MOD_SHIFT and ui_mcm.MOD_CTRL ui_mcm.MOD_ALT
```

If these get latched, they will reset when Escape is pressed. **Please report cases of latching.**

**Tracking different types of key press**

After you have filtered for your key, you can call one of the following from an `on_key_press` callback:

`ui_mcm.double_tap(id, key, [multi_tap])`

- `id`: a unique identifier for your event. One good way to do this is to use your scriptname and a number: `"ui_mcm01"`
- `key`: the key passed into the `on_key_press` callback
- `multi_tap`: if true, timer is updated instead of cleared. This allows for the detection of triple/quad/etc. taps

This returns `true` for a given id and key, if less than `X` ms has elapsed since the last time it was called with that id and key (`X` is a user configurable value between 100 ms and 1000 ms). Otherwise, it returns `false`.

If `multi_tap` is `false`, the timer is reset when true is returned, preventing the function from returning true twice in a row. If `multi_tap` is `true`, the function will return true any time the gap between a call and the one before is within the window.

`ui_mcm.key_hold(id, key, [repeat])`

- `id`: a unique identifer for your event
- `key`: the key passed into the `on_key_hold` callback
- `repeat`: Optional, takes a number representing time in seconds. If the key continues to be held down, the function will return `true` again after `repeat` seconds, on a cycle.

When called from the `on_key_hold` callback, it will return true after the key has been held down for `Y` ms (determined by applying a user-defined multiplier to `X` above) and then again every `repeat` seconds if `repeat` is provided. The sequence resets when key is released.

`ui_mcm.simple_press(id, key, functor)`

- `id`: a unique identifier for your event
- `key`: the key passed into the `on_key_hold` callback
- `function`: table \{function, parameters} To be executed, when it is determined that the key press is not long or double (or multi-press in general)

Unlike the other two, this does not return anything but instead you give it a function to execute. Using this function you gain exclusivity, your event won't fire when the key is double-tapped (or multi-tapped), or held (long press), at the cost of a little input delay. This delay is dependent on the double tap window, as defined by the user in the MCM Key Bind settings.

The following option entries have translation strings provided by MCM and are set up to be ignored by pre-1.6.0 versions of MCM. Note the keybind conflict identification in MCM does **not** look for these, and reports conflicts on the keybind value alone.

With shift and control, radio button:

```lua
{id = "modifier", type = ui_mcm.kb_mod_radio, val = 2, def = 0, hint = "mcm_kb_modifier", content= { {0,"mcm_kb_mod_none"} , {1,"mcm_kb_mod_shift"} , {2,"mcm_kb_mod_ctrl"},{3,"mcm_kb_mod_alt"}}},
```

With shift and control, list:

```lua
{id = "modifier", type = ui_mcm.kb_mod_list, val = 2, def = 0, hint = "mcm_kb_modifier" , content= { {0,"mcm_kb_mod_none"} , {1,"mcm_kb_mod_shift"} , {2,"mcm_kb_mod_ctrl"},{3,"mcm_kb_mod_alt"}}},
```

Single, double or long press, radio button:

```lua
{id = "mode", type = ui_mcm.kb_mod_radio, val = 2, def = 0, hint = "mcm_kb_mode" , content= { {0,"mcm_kb_mode_press"} , {1,"mcm_kb_mode_dtap"} , {2,"mcm_kb_mode_hold"}}},
```

Single, double or long press, radio button:

```lua
{id = "mode", type = ui_mcm.kb_mod_list, val = 2, def = 0, hint = "mcm_kb_mode" , content= { {0,"mcm_kb_mode_press"} , {1,"mcm_kb_mode_dtap"} , {2,"mcm_kb_mode_hold"}}},
```

An example script making use of all of these can be found at [https://github.com/RAX-Anomaly/MiniMapToggle/blob/main/gamedata/scripts/mini_map_toggle_mcm.script](https://github.com/RAX-Anomaly/MiniMapToggle/blob/main/gamedata/scripts/mini_map_toggle_mcm.script).

## Example Scripts

See the original comments in the `ui_mcm` script for more.

### example_mcm.script

```lua
--Change your defaults here if you don't have Mod Config Menu installed. This allows people without MCM to change values.
local defaults = {
  ["1check1"] = some_value_here,
  ["1check2"] = some_value_here,
  ["2slider1"] = some_value_here,
  ["2radio2"] = some_value_here,
}

-- This section sets up MCM to read from this mod's keys, and falls back to the previously defined defaults table if MCM is not installed
function get_config(key)
  if ui_mcm then return ui_mcm.get("example_mod_name/"..key) else return defaults[key] end
end

-- This function actually adds the entry for this mod into the MCM
function on_mcm_load()
  op = { 
      id= "example_example",
      gr = {    
          { id= "example_one", sh = true, gr = 
            { -- option group 1
              { id = "slide_example_example" , type = "slide" , link = "AMCM_Banner.dds", text = "ui_mcm_title_example_example", size = {512,50}, spacing = 20 },
              { id = "1check1", type = "check", val = 1, def = false},
              { id = "1keybind2", type = "key_bind", val = 2, def = DIK_keys.DIK_O},
            }
          },
          { id= "example_two", sh = true, gr = 
            { -- option group 2
              { id = "slide_example_example" , type = "slide" , link = "AMCM_Banner.dds", text = "ui_mcm_title_example_example", size = {512,50}, spacing = 20 },
              { id = "2slider1", type = "track", val = 2, min = 0.0, max = 1.0, step = 0.1, def = 0.5},
              { id = "2radio2", type = "radio_h", val = 2, content =
                {
                  { 0, "3radio2_none"},
                  { 1, "3radio2_some"},
                  { 2, "3radio2_most"},
                  { 3, "3radio2_all"},
                },
                def = 0
              },
            }
          },
        }
      }  
  return op
end
```

### Example ui_mcm_mod_example.xml strings

This is set up for the generic mcm.script example above.

```xml
<string id="ui_mcm_menu_example_example">
<text>Name of your mod as it appears in the MCM</text>
</string>

<string id="ui_mcm_title_example_example">
<text>Text shown by any option with `text = "ui_mcm_title_example_example"`, which would be all of the slides</text>
</string>

<string id="ui_mcm_example_one_1check1">
<text>Name of the 1check1 option</text>
</string>

<string id="ui_mcm_example_one_1check1_desc">
<text>Tooltip of the 1check1 option</text>
</string>

<string id="ui_mcm_example_one_1keybind2">
<text>Name of the 1keybind2 option</text>
</string>

<string id="ui_mcm_example_one_1keybind2_desc">
<text>Tooltip of the 1keybind2 option</text>
</string>

<string id="ui_mcm_example_one_2slider1">
<text>Name of the 2slider1 option</text>
</string>

<string id="ui_mcm_example_one_2slider1_desc">
<text>Tooltip of the 2slider1 option</text>
</string>

<string id="ui_mcm_example_one_2radio2">
<text>Name of the 2radio2 option</text>
</string>

<string id="ui_mcm_example_one_2radio2_desc">
<text>Tooltip of the 2radio2 option</text>
</string>

<string id="ui_mcm_lst_3radio2_none">
<text>Text for the 3radio2_none option</text>
</string>

<string id="ui_mcm_lst_3radio2_some">
<text>Text for the 3radio2_some option</text>
</string>

<string id="ui_mcm_lst_3radio2_most">
<text>Text for the 3radio2_most option</text>
</string>

<string id="ui_mcm_lst_3radio2_all">
<text>Text for the 3radio2_all option</text>
</string>
```

## MCM Best Practices

### Options

- The top id in the table you return to MCM should be **as unique as possible** to prevent conflicts with other mods
- Keybind names should be understandable outside of their menu, since they will be displayed in a meta-keybinds list at the top of MCM. Therefore, avoid generic names and be specific.
