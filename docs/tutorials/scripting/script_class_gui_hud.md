---
title: Script class GUIs and HUDs
tags:
    - LUA
draft: false
---

# Script class GUIs and HUDs

___

<Authors
  authors={["privatepirate97"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## Introduction

Graphical user interfaces essential parts of every game. Generally GUIs can be separated into two distict categories:

1. GUIs that let the player interact with certain game mechanics via mouse and/or keyboard such as trader inventories, NPC dialog windows, options menu etc

2. GUIs that provide the player with essential information such as player health, stamina, ammo etc, but without offering direct interaction

To make the distiction between these two types clear, I am going to refer to type 1 as "GUI" and type 2 as "HUD" throughout this tutorial. Based on this
distiction, it's clear that GUIs and HUDs have a fundamentally different character/purpose. However, looking at their code it goes to show that GUIs and HUDs
are very similar. This tutorial provides a brief overview of how to create a basic GUI or HUD and how to handle UI element XML info. Furthermore it provides
detailed info about the functions commonly used in GUIs.

## Code Basics

Apart from a few exceptions, GUIs and HUDs can be created entirely in Lua scripts. However, they work extensively with engine class methods,
more details about this later.

From now on the term "GUI" will be used synonym for both GUI and HUD if not expressed otherwise.

### Creating a GUI

To create a GUI you need these essential functions:

```LUA
class "MyGUI" (CUIScriptWnd)	-- 1

function MyGUI:__init() super() -- 2
	-- your code
end

function MyGUI:__finalize()		-- 3
	-- your code (optional)
end

function MyGUI:Update()			-- 4
	CUIScriptWnd.Update(self)
	-- your code
end
```

1. Creates a class with the name "MyGUI". Your GUI class can have any name that has not already been used anywhere else.

2. Called once when your GUI class instance is created. In this function you can execute any code that only needs to be
executed once like e.g. creating static/fundamental UI elements like the main window of your GUI. Attention: the function name uses
TWO underscores `__`!

3. Called when your GUI is destroyed and necessary in order to prevent Lua from potentially interacting with a GUI that
doesn't exist anymore on the engine side. The call happens when the game is interrupted by a level transition or when loading a save.

4. Called about 4 times per frame (I don't know why). If you have any dynamic UI elements that need to update time based (as opposed to event
based) e.g. progress bars you're probably gonna put the respective code here. Never forget to add `CUIScriptWnd.Update(self)`,
otherwise none of your UI elements will work properly! Also better avoid putting performance heavy code here if possible or throttle the
code execution using timers. ;) Attention: the function names uses TWO underscores `__`!

As you can see, the functions 2, 3 and 4 are called with this pattern: `YourClassName:SomeClassFunction()`. Adding new functions
to your class follows the same pattern. It is common style to start each word of the name of the class and all its functions with a capital
letter but that's up to you. Just make sure that these four functions are written as shown above.

### How do I show my GUI on Screen?

Just like with other engine classes exposed to Lua you can call an instance of you CUI class with the following code:

```LUA
GUI = nil

function show_ui()
	if GUI == nil then
		GUI = MyGUI() -- calls instance of your GUI class
	end
	
	if GUI and not GUI:IsShown() then -- only show the GUI if it is NOT active yet
		GUI:ShowDialog(true) 		  -- shows the GUI dialog, mouse cursor appears on screen, all user inputs are passed to the GUI
		Register_UI("MyGUI", "my_script_name", GUI)
	end
end
```

It is recommened to declare `GUI` as a global variable in your script so that it is accessable from other scripts. Keep in mind that when calling
your GUI using `GUI:ShowDialog(true)` you usually cannot move the character but you can change that behavior, see chapter 'Control of UI Elements'
for reference. Also make sure to check whether your GUI is already active. You don't want to have more than one instance active at a time, otherwise
you WILL break your GUI and probably the game as well.

For HUDs the example function looks a little different:

```LUA
HUD = nil

function show_hud()
	if HUD == nil then
		HUD = MyHUD() -- calls instance of your HUD class
	end
	
	if HUD and not HUD:IsShown() then
		get_hud():AddDialogToRender(HUD) -- renders HUD to screen
		Register_UI("MyHUD", "my_script_name", HUD)
	end
end
```

Unlike with GUIs, when using `get_hud():AddDialogToRender(MyHUD)` by default you always retain full control over the character while your HUD instance
is active. This function call does nothing more than adding your HUD to the render pipeline. As you can see, the way you tell the engine to show your GUI
controls whether the GUI is interactive (that's why it's called `ShowDialog`) or behaves like a HUD.
`Register_UI()` has two purposes:

1. It fires the `GUI_on_show` callback when executed.

2. It adds your GUI to the global tables `_GUIs` and `_GUIsInstances` in *_g.script* which are used to have control over all active GUIs in the game
like e.g. hiding or even destroying all of them at once, see *_g.script* for reference.

### How do I close my GUI?

Closing a GUI dialog works like this:

```LUA
function close_ui()
	if GUI and GUI:IsShown() then
		GUI:HideDialog() -- closes GUI dialog, mouse cursor disappears, full control over character regained
		Unregister_UI("MyGUI")
		GUI = nil -- optional, destroys GUI instance
	end
end
```

For HUDs the code looks like this:

```LUA
function close_hud()
	if HUD and HUD:IsShown() then
		get_hud():RemoveDialogToRender(HUD)
		Unregister_UI("MyHUD")
		HUD = nil -- optional, destroys HUD instance
	end
end
```

`Unregister_UI` fires the `GUI_on_hide` callback and removes your GUI from the global tables `_GUIs` and `_GUIsInstances` mentioned in the
previous chapter.

Whether or not you set `GUI`/`HUD` to nil depends on the use case of your GUI. If you set it to nil your class instance will be destroyed.
Calling a new instance will create a completely new GUI, `__init()` is called again, your GUI structure is rebuild from scratch. Otherwise
your GUI instance persists and when calling it `__init()` will be skipped.
Keep in mind that when transitioning to another level or loading a save, all GUIs and their references will be destroyed. But be careful!
It is strongly advised to always close your GUI automatically when the game is interrupted by any loading sequences. Otherwise the game
can crash! In order to prevent such crashes simply use a callback like this:

```LUA
function on_game_start()
	RegisterScriptCallback("actor_on_net_destroy", close_my_gui)
end
```

## Building the GUI Structure

In order to build and interact with a GUI there exists bunch of different UI elements such as buttons and sliders or the window that contains
these elements. But of course these elements have to be added manually. To build your GUI call a function when `__init()` is executed:

```LUA
function MyGUI:__init() super()
	self:InitControls()
end

function MyGUI:InitControls()
	self:SetWndRect(Frect():set(0,0, 1024, 768)) -- sets position and size (left, top, right, bottom) of the dialog window
	self:SetAutoDelete(true)
	
	self.xml = CScriptXmlInit()
	local xml = self.xml -- just so you don't have to write 'self.xml' everytime
	xml:ParseFile("my_gui_structure.xml")
	
	self.my_wnd = xml:InitStatic("background", self)
	
	self.my_text = xml:InitTextWnd("background:text", self.my_wnd)
	self.my_text:SetText("My text here")
end
```

Setting the interaction area of your GUI using `SetWndRect()` is the first step. Every UI element placed outside of this area cannot be
interacted with. Therefore it is common to set the area to cover the whole screen. Keep in mind that no matter what your screen resolution
is, the engine will always translate the resolution to a frame with size 1024x768 to handle any GUI related stuff.
`self.xml = CScriptXmlInit()`calls an instance of the engine class `CUIXmlInit`, responsible for creating any of the available UI elements.
`xml:ParseFile()` receives the name of your XML file that stores properties of the UI elements your GUI uses such as position, size, textures,
text formatting, color etc. Without this XML file your GUI won't work.

So what UI elements are created in the example above?

- `InitStatic()` creates a simple static window that can contain any other UI element.
- `InitTextWnd()` creates a window that can display text.
- `InitCheck()` creates an ON/OFF button.

There are many more UI elements which can be found in *lua_help.script*. Additionally the file lists all methods available to these UI elements
such as `SetText()` or `Show()`. A detailed description of these elements and their methods can be found in chapter 'UI elements and their Methods'.

A UI element creation method like e.g. `InitStatic()` usually receives the following arguments:

- the path to the UI element info in your XML file, e.g. `"background"`
- the parent UI element or, if none exists, the GUI class instance itself (`self`)

Calling `InitControls()` in `__init()` is recommended if the GUI structure needs to be built only once and stays the same after that. If instead you
need a more dynamic structure you can call `InitControls()` from outside your class instead of calling it in `__init`.

### Parents and Children

Setting the parent has a direct influence on how UI elements behave. If you change the visibility or position of the parent, this will also affect
all its children.

Consider the following example. We create a simple window that contains text and a trackbar. We want to control both position and visiblilty of these
UI elements via the window that contains them:

```LUA
function MyGUI:CreateWindow()
	self.wnd = XML:InitStatic("parent_window", self)
	self.wnd:Show(false) -- sets the window invisible
	
	self.text = XML:InitTextWindow("parent_window:text_block", self.wnd)
	self.text:SetText("Our text window displays this text.")
	
	self.track = XML:InitTrackBar("bar", self.text)
end
```

As you can see we pass `self.wnd` as the parent of the text window and `self.text` as the parent of the trackbar. You can ignore the structure of the
XML info path for now. It has nothing to with how parent/child relations between UI elements a created. Now what happens here? As you can see `self.wnd`
has been set invisible. Since `self.text` is a child of `self.wnd` and `self.track` is a child of `self.text` (and therefore indrectly a child of
`self.wnd`), by default not just `self.wnd` but all three elements will be invisible.

### Self???

"What is 'self'?", you may ask. Basically it's a shorter, more convenient way to reference your GUI class instance WITHIN your class.
`self.my_wnd` is the same as writing `MyGUI.my_wnd`. Everything you declare with `self` can be accessed from anywhere within your GUI class. Don't
confuse `self.` with `self:` though. When calling a class method such as `self:InitControls()` you always use `:` instead of `.`. Keep in mind that
calling a class member from outside your GUI class requires class access via the variable `GUI`/`HUD`, e.g. `GUI.some_value` or `GUI:DoSomething()`.
`self.some_value` or `self:DoSomething()` won't work here. ALWAYS pay close attention to when to use which symbol. If you use the wrong one, the
game either crashes or your GUI just won't work and trust me, finding this tiny little syntax error in your code can be annoying AF!

## UI Callbacks

Like with anything in programming you need to tell the computer what to do when a UI element is interacted with. That's where UI callbacks come into play.
Consider the following example. We create two simple buttons and want to execute two functions when pressing them:

```LUA
function MyGUI:CreateButton()
	self.btn_a = XML:Init3tButton("wnd:btn_a", self.wnd) -- creates button
	self.btn_a:TextControl():SetText("button text 1") 	 -- displays text on the button

	self.btn_b = XML:Init3tButton("wnd:btn_b", self.wnd)
	self.btn_b:TextControl():SetText("button text 2")
	
	self:Register(self.btn_a, "do_this")	-- pass the UI element and assign a unique ID
	self:AddCallback("to_this", ui_events.BUTTON_CLICKED, self.OnButton_One, self)
	
	self:Register(self.btn_b, "do_that")
	self:AddCallback("to_that", ui_events.BUTTON_CLICKED, self.OnButton_Two, self)
end

function MyGUI:OnButton_One() -- called when pressing button A
	-- your code
end

function MyGUI:OnButton_Two() -- called when pressing button B
	-- your code
end
```

The methods `Register()` and `AddCallback()` are provided by the engine and always available to your GUI. `Register()` assigns a unique ID to the button.
`AddCallback()` then receives the following arguments:

- the unique ID passed to `Register()`, this way game knows which button fires which callback
- the callback event ID that determines what interaction event has to happen in order for the callback to fire
- the function that will be executed when the callback fires. Note that here we pass the function as a member of your GUI class
and don't execute it, hence using `self.`, not `self:`.
- a reference to your GUI class instance

Next, we consider a more advanced example. Let's say we have three buttons and want to create callbacks for them. But instead of having a separate
function per button, we want use the same function but execute different code depending on the value we have pressed. By default `AddCallback()`
does not allow to pass arguments to a function but we can use a simple trick, a wrapper function:

```LUA
function MyGUI:CreateCheck()
	self.btn = {}
	
	for i = 1,3 do
		self.btn[i] = XML:InitCheck("wnd:check_"..i, self.wnd)
		self.btn[i]:TextControl:SetText("check button text "..i)

		self:Register(self.btn[i], "button_exec_func_"..i)
		
		local _wrapper = function(self.wnd) -- pass parent UI element here
			self:OnCheck(i)
		end
		self:AddCallback("button_exec_func_"..i, ui_events.BUTTON_CLICKED, _wrapper, self)
	end
end

function MyGUI:OnCheck(i)
	-- your code
end
```

As you can see, instead of passing the class method directly we pass the wrapper function that itself calls the class method with a passed argument.
With a wrapper function you can pass as many arguments as you want.

Callbacks are not limited to be used with buttons only. There are a bunch of different callbacks for all kinds of UI elements. A full list of callback
event IDs can be found in chapter 'UI Callback Event IDs'.

## Key Inputs

Usually when tracking key inputs you use the callback "on_key_press". When a GUI is active this callback usually does not work (not true for HUDs). For this
reason the engine provides a GUI specific callback function. It doesn't have to be registered unlike regular callbacks and works out of the box.
It looks like this:

```LUA
function MyGUI:OnKeyboard(key, keyboard_action)
	--your code
end
```

`key` is the index of the key press that's received, `keyboard_action` is a UI callback event ID whose value depends on what key event happened.
For example when pressing and releasing a key, `OnKeyboard()` is called twice and receives a `WINDOW_KEY_PRESSED` and `WINDOW_KEY_RELEASED` event ID
value respectively. By using appropriate conditions you have very precise control over your code flow.

# UI Elements and their Methods

This following lists contain all UI elements available in the game. Disclaimer: Despite having researched carefully some lists or function descriptions
may be incomplete or incorrect.

## Creating a UI Element

All methods in the next two lists are called as methods of `CScriptXmlInit()`.

| Function | Purpose |
|----------|---------|
| `InitWindow(string, number, CUIWindow*)` | creates a separate window (for temporary use) that can be interacted with, see properties menu in inventory for reference |
| `InitStatic(string, CUIWindow*)` | creates basic window that can contain any other UI element |
| `InitFrame(string, CUIWindow*)` | creates a UI element whose frame texture elements don't get distorted when scaling the element itself |
| `InitFrameLine(string, CUIWindow*)` | creates a UI element similar to InitFrame() but without a center section, can be used to scale separating elements like lines/bars distortion-free |
| `InitHint` | creates a hint window that can fade in and out automatically |
| `InitTextWnd(string, CUIWindow*)` | creates a text window that allows for various formatting options |
| `Init3tButton(string, CUIWindow*)` | creates a simple button |
| `InitCheck(string, CUIWindow*)` | creates an ON/OFF button |
| `InitScrollView(string, CUIWindow*)` | creates a window with a scrollbar and up/down arrows for navigation |
| `InitTrackBar(string, CUIWindow*)` | creates a trackbar that can be used to change a value |
| `InitProgressBar(string, CUIWindow*)` | creates a progress bar as used for health, stamina, psy health etc. |
| `InitListBox(string, CUIWindow*)` | creates a list with strings, see properties menu in inventory for reference |
| `InitComboBox(string, CUIWindow*)` | creates a dropdown menu, see e.g. SMAA settings in settings menu for reference |
| `InitEditBox(string, CUIWindow*)` | creates a prompt window that allows to change a value, see Hud Editor for reference |
| `InitKeyBinding(string, CUIWindow*)` | creates a prompt window for setting a keybind |
| `InitMMShniaga(string, CUIWindow*)` | creates a vertical button list with the magnifying stip UI element that exists in main and pause menu |
| `InitTab(string, CUIWindow*)` | used for creating complex menus with multiple tabs, see Stalker CoP settings menu for reference |
| `InitAnimStatic(string, CUIWindow*)` | unused/methods not exposed to Lua, creates a window that can display an animated icon |
| `InitSleepStatic(string, CUIWindow*)` | unused/methods not exposed to Lua |
| `InitSpinText(string, CUIWindow*)` | unused/methods not exposed to Lua | 
| `InitSpinFlt(string, CUIWindow*)` | unused/methods not exposed to Lua |
| `InitSpinNum(string, CUIWindow*)` | unused/methods not exposed to Lua |
| `InitCustomSpin(string, CUIWindow*)` | unused/methods not exposed to Lua |
| `InitMapList(string, CUIWindow*)` | unsued |
| `InitCDkey(string, CUIWindow*)` | unused |
| `InitMPPlayerName(string, CUIWindow*)` | unused |
| `InitMapInfo(string, CUIWindow*)` | unused |
| `InitServerList(string, CUIWindow*)` | unused |

These methods allow (manual) parsing of your UI element info XML file and are called on an instance of `ScriptXmlInit()`. Keep in mind that default index = 0.

| Function | Purpose |
|----------|---------|
| `ParseFile(string)` | reads UI element info from XML file (string) from standard path `"gamedata\\configs\\ui"` |
| `ParseDirFile(string, string)` | same as `ParseFile()` but allows to pass a custom file path e.g `"gamedata\\configs\\ui\\my_gui"` as 2. argument |
| `NodeExist(string, number)` | checks whether a node exists, receives node path and its index (in case there are several nodes with the same name, otherwise can be ignored). returns boolean value |
| `GetNodesNum(string, number, string)` | counts how many nodes with the specified node tag name exist as children of the node specified with path and index, if no path is passed the whole XML is parsed, if no tag name is passed all child nodes are counted. receives path (string), index (integer) and tag name (string). returns node count as number |
| `NavigateToNode(string, number)` | navigates to node defined with path (string) and index (integer) |
| `NavigateToNode_ByAttribute(string, string, number)` | searches XML file for a node with tag name (string) that contains an attribute with the attibute name (string) and a value (integer) |
| `NavigateToNode_ByPath(string, index, string, string, string)` | searches XML file for a node specified by path (string), index (number) and tag name (string) that contains an attribute with the attibute name (string) based on certain attribute-value pattern (string) |
| `NavigateToRoot()` | navigates to root node of the UI element info structure in XML file |
| `ReadValue(string, number)` | reads the value of the node specified by path (string) and index (index), only used for simple node structures like `<texture>tex_name_here</texture>` |
| `ReadAttribute(string, number, string)` | reads the value of an attribute specified by name in a node specified by path and index, receives path (string), index (integer) and attribute name (string) |

These UI elements are called from different classes or are created by calling their respective class.

| Function | Purpose |
|----------|---------|
| `CUITabControl()` | creates a window that allows switching between multiple tabs, has to be filled with tab `CUITabButton` instances |
| `CUIMessageBox()` | handles message boxes |

These UI elements are handled in Lua. They are prefabricated and always have a certain structure but can be customized to a certain degree.
You can call them from *utils_ui.script*, see *utils_ui.script* for reference.

| Function | Purpose |
|----------|---------|
| `UICellContainer()` | creates a container with 'cells', similar to how items are displayed in inventory |
| `UICellItem()` | creates a single item cell |
| `UIInfoItem()` | creates a window with info about an item, similar to the info window that pops up when hovering above an item in inventory |
| `UIInfoUpgr()` | creates the upgrade interface for items like weapons |
| `UICellProperties()` | creates a dropdown menu, can be filled with options that execute various functions, similar to props window when right clicking on an item in inventory |
| `UICellPropertiesItem()` | creates an entry for a `UICellProperties` window |
| `UIHint()` | creates a simple hint window that can contain any text, similar to hint texts appearing when hovering settings in settings menu |

You can use them in your GUI like this:

```LUA
self.item_info = utils_ui.UIItemInfo(self, 500)
```

In this example an info window for items is created. You pass your GUI instance as the parent of this UI element and a hover pop up delay time in ms. What arguments you
have to pass in general depends on the UI element you use.

## Control of UI Elements

Once you have created your UI elements you want to control them, change their appearance, change numbers and text, show or hide certain things, make them become alive so to speak.
Most GUIs have a dynamic nature after all.
  
The following lists provide info about the most important and most frequently used methods to control UI elements. Keep in mind that many UI elements
can use the same methods, refer to *lua_help.script* for detailed info about which UI elements can use which methods. The methods listed here are
sorted primarily by purpose but also by UI element type.

### General / Called on GUI Class

| Function | Purpose |
|----------|---------|
| `ShowDialog(bool)` | shows GUI, shows cursor by default, boolean flag controls whether HUD indicators will be hidden |
| `HideDialog()` | closes GUI, cursor disappears, character controls are fully regained |
| `Update()` | general update function to execute all kinds of code to control time dependent UI element behavior, called about 4 times per frame, use with care! |
| `OnKeyboard(number, number)` | tracks key presses, returns key ID and UI element callback event ID as numbers, see chapter 'UI Callback Event IDs' |
| `Register(CUIWindow*, string)` | registers a UI element to make callbacks work, receives the UI element instance and a unique ID as a string |
| `AddCallback(string, number, functor, CUIWindow*)` | creates a callback for a UI element to perform certain actions based on the callback event ID, receives a UI element ID, a callback event ID, a functor to execute, the parent UI element class instance |
| `AllowMovement(bool)` | if set to true, moving around is possible while the GUI is active, similar to inventory |
| `AllowCursor(bool)` | if set to false, the cursor is not usable in the GUI and becomes invisible |
| `AllowCenterCursor(bool)` | if set to true, the cursor always shows up in the center of the screen (default behavior), otherwise it starts at the last position when the GUI was closed |
| `AllowWorkInPause(bool)` | if set to true, the GUI is still usable when pausing the game loop (e.g with `device():pause(true)`, NOT when pausing the game so that pause menu pops up!) |
| `Dispatch()` | unused, event based callback function that was used to open multiplayer menu in main menu |
| `GetHolder()` | returns the object that manages the GUI dialog (showing your GUI, showing cursor, hiding indicator etc.), has to be called AFTER the GUI dialog has started, has no obvious use |

### Commonly Used

| Function | Purpose |
|----------|---------|
| `Show(bool)` | sets visibility of the UI element |
| `IsShown()` | returns current visibility state of the UI element as boolean value |
| `SetAutoDelete(bool)` | if set to true, the UI element will be destroyed automatically when removed from the GUI structure |
| `IsAutoDelete()` | checks AutoDelete state of the UI element, returns boolean value |
| `Enable(bool)` | if set to false, any interaction with the UI element is disabled |
| `IsEnabled()` | checks interaction state of the UI element, returns boolean value |
| `SetWndPos(vector2)` | sets position of the top left corner of the UI element |
| `GetWndPos()` | returns a 2D vector of the top left corner position of the UI element |
| `SetWndRect(Frect)` | sets position and size of the area where mouse event are registered |
| `GetAbsoluteRect(Frect)` | returns position and size of the UI element, for info about how to use it see hint below |
| `SetWndSize(vector2)` | sets width and height of the UI element |
| `GetWidth()` | returns width of the UI element as number |
| `GetHeight()` | returns height of the UI element as number |
| `AttachChild(CUIWindow*)` | sets a UI element as the child of some other UI element/adds it to the GUI structure |
| `DetachChild(CUIWindow*)` | removes a UI element from its parent/the GUI structure |
| `SetWindowName(string)` | assigns a string as a name to a UI element is used to register callbacks using `AddCallback()` |
| `WindowName()` | returns the string assigned to a UI element when registering it using `Register()` or when setting callbacks |
| `FocusReceiveTime()` | returns inital delay time for a UI element to receive inputs as a number, has no obvious use |
| `SetPPMode(bool)` | PostProcessing mode, apparently used for the magnifier element in main/pause menu |
| `ResetPPMode()` | resets PP mode |

:::info This is how `GetAbsoluteRect()` is used

```Lua
local rect = Frect()
self.wnd:GetAbsoluteRect(rect) -- pass rect here

local x1, y1, x2, y2 = rect.x1, rect.y1, rect.x2, rect.y2 -- how to access Frect values
```

:::

### Textures

| Function | Purpose |
|----------|---------|
| `InitTexture(string)` | sets texture of the UI element, receives a texture path e.g. `"ui\\my_gui\\background.dds"` |
| `InitTextureEx(string, string)` | sets texture of the UI element placed on a 3D model e.g. display of dosimeter, receives a texture path and the shader path `"hud\\p3d"` |
| `SetTextureRect(Frect)` | sets position and size of the area containing the texture, receives an Frect |
| `GetTextureRect()` | returns Frect containing position and size info about the area containing the texture |
| `SetStretchTexture(bool)` | controls whether or not a button texture will be stretched when button size is not equal to texture size |
| `SetTextureColor(number)` | sets color of a texture, receives a number |
| `GetTextureColor()` | returns color of a texture as a number, default value resembles A = R = G = B = 255 |
| `EnableHeading(bool)` | enabled a static to be rotated |
| `SetHeading(number)` | sets rotation of the UI element in radians |
| `GetHeading()` | returns rotation of the UI element in radians |
| `SetConstHeading(bool)` | if set to false, UI elements rotates when its parent UI element rotates, otherwise it's not affected |
| `GetConstHeading()` | returns const heading state of the UI element |
| `SetColorAnimation(string, number, number)` | creates animated color change for a texture, receives color anim name, number resembling set flags and start delay time in ms, see cahpter 'Color Animations' for reference |
| `ResetColorAnimation()` | resets color animation |
| `RemoveColorAnimation()` | removes color animation |

### Text

| Function | Purpose |
|----------|---------|
| `SetText(string)` | sets text of a UI element |
| `SetTextST(string)` | sets text of a UI element using a string ID, for text stored in XML file |
| `GetText()` | returns string that a text element is currently displaying |
| `TextControl()` | access text formating methods for certain UI elements, use like this: `self.btn:TextControl():SetText()` |
| `SetTextOffset(x, y)` | sets position of the text relative to its text UI element, even allows to set position outside of its text UI element |
| `SetTextColor(number)` | sets text color, use like this: `self.text:SetTextColor(GetARGB(255, 110, 110, 50))` |
| `GetTextColor()` | returns text color as a number |
| `SetFont(CGameFont*)` | sets text font, see chapter 'Fonts, Colors and Text Alignment' for reference |
| `GetFont()` | returns the current font used by the text |
| `SetTextAlignment(number)` | sets horizontal text alignment, see chapter 'Fonts, Colors and Text Alignment' for reference |
| `SetVTextAlignment(number)` | sets vertical text alignment, see chapter 'Fonts, Colors and Text Alignment' for reference |
| `SetTextComplexMode(bool)` | if set to true, text continues on new line when reaching the border of a text UI element, also any formatting in the text will be considered |
| `SetEllipsis(bool)` | if set to true, text that doesn't fit inside its text UI element will be cut off and replaced with "..". Only works if text complex mode is set to false! |
| `AdjustWidthToText(bool)` | if set to true, the text UI element's width will be set to fit the width of the text block |
| `AdjustHeightToText(bool)` | if set to true, the text UI element's height will be set to fit the height of the text block |

### Buttons

| Function | Purpose |
|----------|---------|
| `GetCheck()` | returns current state of a check button |
| `SetCheck(bool)` | sets current state of a check button |
| `SetDependControl(CUIWindow*)` | synchronizes the interaction state of another UI element to the button state. When the button state is OFF the assigned UI element is disabled i.e. cannot be interacted with |

### Scrollview

| Function | Purpose |
|----------|---------|
| `AddWindow(CUIWindow*, bool)`	| adds an item to the scrollview, the boolean flag controls the auto delete state of that UI element |
| `RemoveWindow(CUIWIndow*)` | removes an item from the scrollview |
| `Clear()` | removes all item from the scrollview |
| `ScrollToBegin()` | scrolls to the top of the scrollview |
| `ScrollToEnd()` | scrolls to the bottom of the scrollview |
| `GetMinScrollPos()` | returns the lowest scroll position as a number |
| `GetMaxScrollPos()` | returns the highest scroll position as a number |
| `SetScrollPos(number)` | sets current scroll position |
| `GetCurrentScrollPos()` | returns current scroll position as a number |
| `SetFixedScrollBar(bool)` | controls whether the scrollbar is always visible even if there is nothing to scroll |

### Trackbars

| Function | Purpose |
|----------|---------|
| `SetIValue(number)` | sets the current trackbar value as a number, use if trackbar mode `is_integer="1"` in XML files, a passed float will be rounded to the next lowest integer |
| `GetIValue()` | returns the current trackbar value as a number, use if trackbar mode `is_integer="1"` in XML files |
| `SetFValue(number)` | sets the current trackbar value as a number, if trackbar mode `is_integer="1"` the passed value will be rounded to the next lowest integer |
| `GetFValue()` | returns the current trackbar value as a number, if trackbar mode `is_integer="1"` this returns an integer |
| `SetStep(number)` | sets the value increment/decrement when moving the slider on the trackbar, if trackbar mode `is_integer="1"` the passed value will be rounded to the next lowest integer |
| `SetInvert()` | sets invert state of the trackbar, if set to true moving the slider to the left increases the value instead of decreasing it and vice versa |
| `GetInvert()` | returns invert state of the trackbar as a boolean value |
| `SetOptIBounds(number, number)` | sets min/max value of the trackbar, use if trackbar mode `is_integer="1"` in XML files, passed floats will be rounded to the next lowest integers |
| `SetOptFBounds(number, number)` | sets min/max value of the trackbar |
| `SetCurrentValue(number)` | sets the current trackbar value |
| `SetCheck(bool)` | apparently unused |
| `GetCheck()` | apparently unused |

### Progressbars

| Function | Purpose |
|----------|---------|
| `SetProgressPos(number)` | sets the current position of the progressbar |
| `GetProgressPos()` | returns current position of the progressbar as a number |
| `SetRange(number, number)` | sets possible min an max values of a progressbar |
| `GetRange_min()` | returns min value the progressbar can display as a number |
| `GetRange_max()` | returns max value the progressbar can display as a number |
| `ShowBackground(bool)` | if set to true the background texture behind the actual bar will be visible |
| `SetColor(number)` | sets the color of the progressbar |
| `UseColor(bool)` | controls whether the progressbar uses different colors |
| `SetMinColor(number)` | sets the color displayed at the lowest progressbar value |
| `SetMiddleColor(number)` | sets the color displayed when the progressbar value reaches 50% |
| `SetMaxColor(number)` | sets the color displayed at the hightest progressbar value |
| `GetProgressStatic()` | returns the `CUIStatic` that resembles the actual bar |

### Hints

| Function | Purpose |
|----------|---------|
| `SetHintText(string)` | sets the text to be displayed |
| `GetHintText()` | returns the hint text as a string |

### Listboxes

To be used with `CUIListBoxItem()` which creates a listbox item that can be added to a listbox.

| Function | Purpose |
|----------|---------|
| `ShowSelectedItem(bool)` | sets visibility of the listbox |
| `RemoveAll()` | removes all items of the listbox |
| `GetSize()` | returns listbox item count as a number |
| `GetSelectedItem()` | returns the `CUIListBoxItem` instance of the selected listbox item or nil if no item is selected |
| `SetSelectedIndex(number)` | sets listbox item with the specified ID as selected, receives ID (number) |
| `GetSelectedIndex()` | returns ID of the selected listbox item or 4294967295 if no item is selected |
| `SetItemHeight(number)` | sets height of each listbox item, receives height (number) |
| `GetItemHeight()` | return height of each listbox item as a number |
| `GetItemByIndex(number)` | returns the `CUIListBoxItem` instance of the listbox item with the specified ID or nil if no item with this ID exists, receives ID (number) |
| `GetItem(number)` | generalized version of `GetItemByIndex()`, can also access other elements of the UI object e.g. the `CUIScrollView` instance the listbox is made of |
| `RemoveItem(CUIWindow*)` | removes a `CUIListBoxItem` from the listbox, receives a `CUIListBoxItem` instance |
| `AddTextItem(string)` | adds an item to the listbox, receives a string ID or a default string |
| `AddExistingItem(CUIWindow*)` | adds an existing `CUIListBoxItem` instance to the listbox, use if you have created a `CUIListBoxItem` inctance manually |

These methods are called on a `CUIListBoxItem` instance.

| Function | Purpose |
|----------|---------|
| `GetTextItem()` | returns the `CUITextWnd` instance of the listbox item |
| `AddTextField(string, number)` | adds a `CUITextWindow` instance to the listbox item that displays text, receives text (string) and width (number) |
| `AddIconField(number)` | adds a `CUIStatic` instance to the listbox item, can be used to display textures, images etc., receives width (number) |
| `SetTextColor(number)` | sets color of the text displayed in the listbox item, receives a number |

### Comboboxes

A combobox is a combination of a `CUITextWnd` and a `CUIListBox` so you can call the respective methods on both elements.

| Function | Purpose |
|----------|---------|
| `SetVertScroll(bool)` | controls whether the scrollbar is always visible even if there is nothing to scroll |
| `SetListLength(number)` | sets the amount of elements in the combobox, receives an integer |
| `CurrentID()` | returns the ID of the currently selected combobox item as a number |
| `disable_id(number)` | disables the combobox item with the specified ID, receives ID (integer) |
| `enable_id(number)` | enables the combobox item with the specified ID, receives ID (integer) |
| `AddItem(string, number)` | adds a combobox item to the combobox, receives displayed text (string) and options value (integer) |
| `SetText(string)` | sets the text in the selection window, receives text as a string |
| `GetText()` | returns the text that's currently shown in the selection window |
| `GetTextOf(number)` | returns the text displayed on the combobox item with the specified ID, returns `""` if ID is greater than item count, receives ID (integer) |
| `ClearList()` | removes all combobox entries and the text in the selection window |
| `SetCurrentOptValue()` | updates the combobox items and their values with current engine options value, usable when the UI element is bound to an engine option, see chapter 'CUIOptionsItem' for reference |
| `SetCurrentIdx(number)` | sets the ID of the selected combobox item, receives and ID as a number |
| `SetCurrentIdx()` | returns the ID of the selected combobox item as a number |

### Editboxes

Hint: Editboxes work with `CUICustomEdit` objects internally.

| Function | Purpose |
|----------|---------|
| `SetText(string)` | sets currently displayed text of the editbox |
| `GetText()` | currently displayed text of the editbox as a string |
| `CaptureFocus(bool)` | if set to true all keyboard inputs will be captured by the editbox |
| `SetNextFocusCapturer(CUICustomEdit*)` | sets the passed `CUIEditBox` instance as the next object to receive keyboard inputs when changing focus |
| `InitTexture(string)` | sets the texture of the editbox, receives a texture file path |

### TabControl

To be used with `CUITabButton()` which creates a tab button instance, not usable on its own!

| Function | Purpose |
|----------|---------|
| `AddItem(string, string, vector2, vector2)` | adds a tab button, receives the button text, texture path, position vector and size vector |
| `AddItem(CUITabButton*)` | adds a tab button, receives a tab button UI element |
| `RemoveAll()` | removes all tab buttons |
| `SetActiveTab(string)` | sets the tab with the passed ID as active tab |
| `GetActiveId()` | returns ID of active tab as a string |
| `GetTabsCount()` | returns tab count as number |
| `GetButtonById(string)` | returns the UI element with the passed tab button ID |
| `SetEnabled(bool)` | sets tab (button) interaction state, when set to false interaction with this tab is disabled |
| `GetEnabled()` | returns tab (button) interaction state as a boolean value |

### Messageboxes

| Function | Purpose |
|----------|---------|
| `InitMessageBox(string)` | creates a message box with buttons, similar to the 'Discard changes?' window in settings menu |

## UI Callback Event IDs

UI callbacks event IDs can be accessed via `ui_events.CALLBACK_NAME_HERE` as seen in previous chapters. Here is a list of all available UI callback event IDs
exposed to Lua.

CUIWindow / General:

- `const WINDOW_LBUTTON_DOWN = 0`
- `const WINDOW_RBUTTON_DOWN = 1`
- `const WINDOW_LBUTTON_UP = 3`
- `const WINDOW_RBUTTON_UP = 4`
- `const WINDOW_MOUSE_MOVE = 6`
- `const WINDOW_LBUTTON_DB_CLICK = 9`
- `const WINDOW_KEY_PRESSED = 10`
- `const WINDOW_KEY_RELEASED = 11`
- `WINDOW_KEYBOARD_CAPTURE_LOST = 14`

CUIButton / CUI3tButton:

- `const BUTTON_CLICKED = 17`
- `const BUTTON_DOWN = 18`

CUITabControl:

- `const TAB_CHANGED = 19`

CUICheckButton:

- `const CHECK_BUTTON_SET = 20`
- `const CHECK_BUTTON_RESET = 21`

CUIRadioButton:

- `const RADIOBUTTON_SET = 22`

CUIScrollBox:

- `const SCROLLBOX_MOVE = 30`

CUIScrollView:

- `const SCROLLBAR_VSCROLL = 31`
- `const SCROLLBAR_HSCROLL = 32`

CUIListBox:

- `const LIST_ITEM_CLICKED = 35`
- `const LIST_ITEM_SELECT = 36`

UIPropertiesBox:

- `const PROPERTY_CLICKED = 38`

CUIMessageBox:

- `const MESSAGE_BOX_OK_CLICKED = 39`
- `const MESSAGE_BOX_YES_CLICKED = 40`
- `const MESSAGE_BOX_QUIT_GAME_CLICKED = 42`
- `const MESSAGE_BOX_QUIT_WIN_CLICKED = 41`
- `const MESSAGE_BOX_NO_CLICKED = 43`
- `const MESSAGE_BOX_CANCEL_CLICKED = 44`
- `const MESSAGE_BOX_COPY_CLICKED = 45`

CUIAnimationBase:

- `const EDIT_TEXT_COMMIT = 71`

CMainMenu:

- `MAIN_MENU_RELOADED = 76`

# The UI Info XML File

As mentioned in the beginning, a GUI works with a file that describes its UI elements. This information is stored in an XML file and has a tree like
node structure with branches and subbranches. In general every UI element can be described with a number of certain parameters (also called attributes)
but none of them are mandatory. "Then why use them in the first place?" Well, every time you create a UI element the engine executes a bunch of code to
read all the stored info, whether or not you actually store any attributes. If instead you decided to set all these attributes in scripts your code would:

1. get bloated with a lot of functions in order to get your GUI look and behave the way you want it to

2. take longer to build the GUI because it has to execute all that code beside the engine trying to do the exact same thing for you

So storing basic attributes in the xml file makes your code more efficient on the one hand and keeps it shorter/cleaner on the other. Apart from that storing
UI element info externally is useful if you need a certain UI element with a predefined structure many times in your GUI e.g. check buttons. Instead of writing
the same code over and over again you can simply create a template and read its structure from the XML file.

## The Basic Structure

The basic structure of an XML file used for GUIs always looks like this:

```XML
<w> -- opening tag
	
	your UI element info here

</w> -- closing tag
```

How you name these base tags doesn't matter. All that matters is that they exist, have the same name and the closing tag contains `/`. All data you store
is enclosed in these two tags. The same is true for any other pair of tags you add for a node. It is possible to close a node with `/>` instead of `</abc>`
if the node contains no child nodes:

```XML
<w>
	<some_info info here />
</w>
```

This works in most cases but there are exceptions to this. If your XML file has a syntax typo the game usually crashes with an error message hinting to
an error in your file. Let's add some data:

```XML
<w>
	<main_wnd x="120" y="200" width="300" height="200" stretch="1">
		<texture>ui\my_gui\background.dds</texture>
	</main_wnd>
</w>
```

The entries `x`, `y`, `width` and `height` are the attributes. Their value is always noted in quotation marks `""`. In this example we describe the size
and position of a `CUIStatic`, a simple window that displays a texture. `x` and `y` define the position of the upper left corner of the window, `width`
and `height` tell us that the window expands 300 px to the right and 200 px downwards (in the virtual screen space with dimensions 1024x768). If these
numbers were negative the window would expand to the upper left direction instead but it's uncommon to do that. As you can see we have defined a texture
for the window by storing the texture path. This is where the `stretch` attribute comes into play. It controls whether the texture will scale according
to the window dimensions (`stretch="1"`) or keep its own dimensions instead (`stretch="0"`) e.g. 100x200 px.

The info structure shown above can be used in your script as follows:

```LUA
self.main = xml:InitStatic("main_wnd", self) -- pass node tag name here
```

You simply pass the path to the node tag name as a string. Since `main_wnd` is at the 1. level of the node tree the path is the tag name itself. Keep in mind
that the base tag `<w>` is never included in any path. Thats's all, nothing as simple as that. Let's add two buttons:

```XML
<w>
	<main_wnd x="120" y="200" width="300" height="200" stretch="1">
		<texture>ui\my_gui\background.dds</texture>
		
		<btn_start x="2" y="3" width="68" height="24" stretch="1">
			<texture>ui_button_ordinary</texture> -- button texture
			<text font="letterica16" r="250" g="255" b="255" a="255" align="c" vert_align="c"/> -- button text info
		</btn_start>
	</main_wnd>
	
	<btn_settings x="75" y="3" width="68" height="24" stretch="1">
		<texture>ui_button_ordinary</texture>
		<text font="letterica16" r="250" g="255" b="255" a="255" align="c" vert_align="c"/>
	</btn_settings>
</w>
```

In the script you add:

```LUA
self.main = xml:InitStatic("main_wnd", self)

self.btn_start = xml:Init3tButton("main_wnd:btn_start", self.main)

self.btn_settings = xml:Init3tButton("btn_settings", self.main)
```

The syntax of the UI info path generally follows this pattern: `tag:child_tag:child_child_tag:...`. Since `main_wnd` is the parent info tag name of 
`btn_start` the info path is `main_wnd:btn_start`. If you pass an incorrect path that leads to nowhere the game crashes with a message saying that
no node could be found.

Both buttons are children of `self.main` but one button info is enclosed by the `main_wnd` tags while the other is not. This may look a bit confusing
but this code is actually totally valid. As mentioned before the xml tree structure has absolutely no effect on the UI element hierarchy. It's pure design
choice where you put which info. Of course it makes sense to resemble the UI element hierarchy in the XML info structure to some degree but that's up to you.
An info tree structure scheme can look like this:

```XML
<w>
	wnd
		text
		btn
		btn
		wnd
			list
			btn
			text
			text
	wnd
		wnd
			trackbar
</w>
```

or like this:

```XML
<w>
	wnd
	text
	btn
	btn
	wnd
	list
	btn
	text
	text
	wnd
	wnd
	trackbar
</w>
```

It makes no difference as long as you feed the UI element init functions the correct info path.

## Texture Descriptions - A Necessary Evil

In one example in the previous chapter the button texture was not stored with a texture file path but with the ID `ui_button_ordinary` instead.
Why is that? Well, it makes sense to save multiple textures in one .dds file instead of having a single file for every tiny little icon. But how
do we know which texture is where in the file and how do we access it? That's where texture descriptions files help us out. A texture description
file is an XML file that assigns an ID to each texture and stores information about its size and position. Texture description files are stored in
*gamedata/configs/ui/textures_descr* and can have any name but it makes sense to give them a name similar to that of the texture file they describe.
Here is an excerpt of the file *ui_common.xml* that stores the button texture reference used in the example in the previous chapter:

```XML
<w>
	<file name="ui\ui_common"> -- texture file path, ".dds" is not required here
		.
		. -- skipped entries
		.
		<texture id="ui_button_ordinary_d" x="0" y="86" width="117" height="29" />  -- disabled state
		<texture id="ui_button_ordinary_e" x="0" y="115" width="117" height="29" /> -- enabled state
		<texture id="ui_button_ordinary_h" x="0" y="144" width="117" height="29" /> -- hovered state
		<texture id="ui_button_ordinary_t" x="0" y="173" width="117" height="29" /> -- pressed state
		.
		. -- skipped entries
		.
	</file>
</w>
```

As you can see a texture description entry starts with the node tage name `file` followed by the attibute `name` that stores the path to the texture
it describes. The file actually stores 4 different button texture references in *ui_common.dds*. Why 4? They resemble the 4 button states disabled/
enabled/hovered/pressed. Yes, this is handled with different textures, not shaders or anything else. Interesting, isn't it? Don't be confused by the
`_d`/`_e`/`_h`/`_t` suffixes. These are necessary for the engine to handle the textures properly. For your UI info XML file it's enough to store the
"base name" of the textures -> `ui_button_ordinary`. But if you wanna store them explicitely you can use the following structure for your button info:

```XML
<btn_start x="2" y="3" width="68" height="24" stretch="1">
	<texture>
		<texture_d>ui_button_ordinary_d</texture_d>
		<texture_e>ui_button_ordinary_e</texture_e>
		<texture_h>ui_button_ordinary_h</texture_h>
		<texture_t>ui_button_ordinary_t</texture_t>
	</texture>
		<text font="letterica16" r="250" g="255" b="255" a="255" align="c" vert_align="c"/>
	</btn_start>
</btn_start>
```

This allows you to replace one of the texture references with a custom one if desired. To sum this chapter up: whenever you want to use a texture stored
in a multi texture .dds file, you have to store its ID that is listed in the corresponding texture description XML file.

## XML Attributes for UI Elements

These lists contain all XML info attributes for each UI element. Additionally all child nodes with a predefined tag name that are only usable with certain
UI elements are listed as well. Disclaimer: Despite having researched carefully some lists or info descriptions may be incomplete or incorrect.

Hint: most attributes are boolean flags and accept 0 or 1 as their value.

### Commonly Used

| Attribute | Purpose |
|-----------|---------|
| `x`/`y` | x/y position of the UI element relative to its parent UI element, absolute screen position if parent is GUI class instance itself (`self`) |
| `width` | width of the UI element, how far it expands to the right, if value is \< 0 the window expands to the left |
| `height` | height of the UI element, how far it expands downwards, if value is \< 0 the window expands upwards |
| `stretch` | if set to 1 the used texture will be scaled to fit the UI element size |
| `alignment` | if used and set to "c" the window's reference point for positioning will be to its center instead of the upper left corner |

**Child Nodes**

| Tag Name | Purpose |
|----------|---------|
| `texture` | stores the texture reference used by the UI element, accepts a texture path, texture ID and texture child nodes |
| `texture_offset` | stores a texture offset position with attributes `x` and `y` |
| `text` | stores text formatting info |
| `window_name` | stores the ID used to register an interactive UI element using `Register()` |

### Textures

| Attribute | Purpose |
|-----------|---------|
| `heading` | if set to 1 texture rotation is enabled |
| `heading_angle` | sets the initial rotation angle in radians of the texture |
| `shader` | stores the shader path `hud\p3d`, use with textures attached to a 3D model |
| `light_anim` | stores the name of a color animation |
| `la_cyclic` | if set to 1 the color anim will be played on repeat |
| `la_text` | if set to 1 the color anim affects text |
| `la_texture` | if set to 1 the color anim affects the texture |
| `la_alpha` | if set to 1 only the alpha channel will be affected by the color anim |
| `xform_anim` | stores the name of an xform animation |
| `xform_anim_cyclic` | if set to 1 the xform anim will be played on repeat |

Hints:

- An xform animation is an animtion for UI elements that can animate element position, scale and rotation.

### Text

| Attribute | Purpose |
|-----------|---------|
| `font` | sets the font of the text: e.g. `letterica16` |
| `r`/`g`/`b`/`a` | red/green/blue/alpha color channel: range 0 - 255 |
| `color` | can be used to store the preset text color, accepts a color ID, see *color_defs.xml* for reference |
| `align` | horizontal text alignment: `l` left, `c` center, `r` right  |
| `vert_align` | vertical text alignment: `t` top, `c` center, `b` bottom |
| `complex_mode` | if set to 1 multiline rendering will be enabled |

### Buttons

| Attribute | Purpose |
|-----------|---------|
| `frame_mode` | if set to 1 the button will work in frameline mode |
| `vertical` | apparently unused |
| `hint` | stores a string ID for text to be displayed when hovering over the button |
| `accel` | primary key assigned to a button to tigger it by keypress (hotkey feature), accepts a string like `kSPACE` or `kG` |
| `accel_ext` | secondary key assigned to a button to tigger it by keypress (hotkey feature), accepts a string like `kSPACE` or `kG` |

Hint: For more info about how to use `accel`/`accel_ext`, see chapter 'Hotkeys for Buttons' for reference.

**Child Nodes**

| Tag name | Purpose |
|----------|---------|
| `texture_d`/`_e`/`_h`/`_t` | child nodes for storing texture IDs info for the disabled/enabled/hovered/pressed state of a button, useful for inserting custom textures |
| `text_color` | stores state dependend text colors of a button, accepts the child nodes `d`, `e`, `h`, `t` |
| `d`/`e`/`h`/`t` | child nodes for storing text color info for the disabled/enabled/hovered/pressed state of a button |

**Example**

```XML
<btn_start x="20" y="10" width="50" height="20" stretch="1" frame_mode="0" hint="ui_btn_start_hint">
	<texture>
		<texture_d>ui_button_ordinary_d</texture_d>
		<texture_e>ui_button_ordinary_e</texture_e>
		<texture_h>ui_button_ordinary_h</texture_h>
		<texture_t>ui_button_ordinary_t</texture_t>
	</texture>
	<text font="graffiti22" align="c">ui_btn_start</text> -- button text ID can be stored here too!
	<text_color>
		<e r="240" g="217" b="182"/>
		<t r="0" g="0" b="0"/>
		<d r="135" g="123" b="116"/>
		<h r="0" g="0" b="0"/>
	</text_color>
</btn_start>
```

### Scrollview

| Attribute | Purpose |
|-----------|---------|
| `right_ident` | creates an empty space on the left side scrollview content |
| `left_ident` | creates an empty space on the right side scrollview content |
| `top_indent` | creates an empty space above the first item in the scrollview |
| `bottom_indent` | creates an empty space below the last item in the scrollview |
| `vert_interval` | sets the size of the vertical gab between scrollview items |
| `inverse_dir` | if set to 1 the scrollview starts at the bottom item position |
| `scroll_profile` | sets the style of the scrollview control elements, accepts a node tag name, see *scroll_bar.xml* for reference |
| `flip_vert` | if set to 1 the scrollview item order is inverted |
| `always_show_scroll` | if set to 1 the scrollbar is always visible even if there is nothing to scroll |
| `can_select` | controls whether the scrollview content is selectable, internal flag for `CUIListBox` and `CUICombobox` |

**Example**

```XML
<scroll x="4" y="158" width="292" height="340" right_ident="0" left_ident="0" top_indent="5" bottom_indent="5" vert_interval="0" always_show_scroll="1"/>
```

### Trackbars

| Attribute | Purpose |
|-----------|---------|
| `is_integer` | controls whether the value set with the trackbar is treated as an integer |
| `invert` | if set to 1 moving the slider to the left increases the value |
| `step` | sets the value increment/decrement when moving the slider on the trackbar |

### Progressbars

| Attribute | Purpose |
|-----------|---------|
| `horz` | if set to 1 the progressbar will work in horizontal mode |
| `mode` | sets the work mode of the progressbar, accepts `horz`, `vert`, `back`, `down` |
| `min`/`max`/`pos` | sets the min/max possible and initial value |
| `inertion` | controls how fast the progressbar reacts to a (sudden) value change, range 0 - 1 |

**Child Nodes**

| Tag name | Purpose |
|----------|---------|
| `progress` | stores info for a `CUIProgressBar` |
| `background` | stores texture info about the background of a `CUIProgressBar` |
| `min_color` | stores a color for the lowest progressbar value |
| `mddle_color` | stores a color for when the progressbar value reaches 50% |
| `max_color` | stores a color for the hightest progressbar value |

**Example**

```XML
<power_bar x="369" y="416" width="60" height="6" horz="1" min="0" max="1" pos="0" inertion="0.2">
	<progress stretch="1">
		<texture r="142" g="149" b="149">ui_inGame2_inventory_status_bar</texture>
	</progress>
		<min_color r="196" g="18" b="18"/>
		<middle_color r="255" g="255" b="118"/>
		<max_color r="107" g="207" b="119"/>
</power_bar>
```

### Listboxes

| Attribute | Purpose |
|-----------|---------|
| `item_height` | height of the listbox items |

**Child Nodes**

| Tag name | Purpose |
|----------|---------|
| `font` | stores text font info of a `CUIListBox` and `CUICombobox` |
| `properties_box` | stores text formatting info of a `CUIListBox` and `CUICombobox`, accepts the child node `list` |
| `list` | stores text formatting info of a `CUIListBox` and `CUICombobox`, accepts params `complex_mode` and `line_wrap` |

### Comboboxes

| Attribute | Purpose |
|-----------|---------|
| `item_height` | height of the listbox items |
| `list_length` | sets the number of item in the combobox |
| `always_show_scroll` | if set to 1 the scrollbar is always visible in the combobox's list even if there is nothing to scroll |

**Child Nodes**

| Tag name | Purpose |
|----------|---------|
| `list_font` | stores the text font info of the combobox's list items |
| `text_color` | stores state dependend text color info for the disabled/enabled state of a combobox (item), accepts child nodes `d`/`e` |
| `d`/`e` | child nodes for storing text color info for the disabled/enabled state of a combobox (item) |

### Editboxes

| Attribute | Purpose |
|-----------|---------|
| `max_symb_count` | maximum number of symbols allowed |
| `num_only` | allows only numbers |
| `read_only` | no input mode |
| `file_name_mode` | disables any keys that input letters |
| `password` | if set to 1 every character will be displayed as `*` |

### Tabcontrol

| Attribute | Purpose |
|-----------|---------|
| `radio` | controls whether a `CUITabButton` or a `CUIRadioButton` is created |
| `id` | the ID assigned to the button |

**Child Nodes**

| Tag name | Purpose |
|----------|---------|
| `button` | creates a `CUITabButton` instance, store multiple node entries to create multiple tab buttons, internally a `CUI3tButton` is created for visual representation of the tab button so you can store corresponding UI element info attributes |

### Animated Static

The `CUIAnimatedStatic` uses textures that store the individual animation frames.

| Attribute | Purpose |
|-----------|---------|
| `x_offset` | x offset position relative to parent UI element |
| `y_offset` | y offset position relative to parent UI element |
| `frames` | number of frames the animation consists of |
| `duration` | time the animation lasts in ms |
| `columns` | number of columns the frame texture has |
| `frame_width` | width of a frame in the texture |
| `frame_height` | height of a frame in the texture |
| `cyclic` | if set to 1 the animation will play on repeat |
| `autoplay` | if set to one, the anim will start playing automatically when creating the anim static |

### Optionsitem

A `CUIOptionsItem` was/is an important part of many UI elements such as `CUICheckButton`, `CUITabControl`, `CUIEditBox`, `CUITrackBar` and `CUIComboBox`.
It is used to bind a UI element to an engine option. This way you can execute console commands directly by interacting with a UI element. Be aware That
this is more of a legacy feature. With all the engine functions that are exposed to Lua we can easily reproduce the same behavior entirely in scripts!

To make use of this feature, you have to add the child node `options_item` to the info node of the UI element that is supposed to use it:

```XML
trackbar_time x="10" y="10" width="70" height="20" stretch="1">
	<options_item entry="time_factor" group="sleep" depend="runtime"/>
</trackbar_time>
```

In this example the trackbar will change the game's time factor on runtime when changing its value.

| Attribute | Purpose |
|-----------|---------|
| `entry` | name of a console command cvar |
| `group` | an ID (string) the UI element is assigned to, you can assign UI elements that control similar options to the same group, only important on the engine side for efficient options handling |
| `depend` | controls how the game reacts to the UI element interaction, accepts `vid`, `snd`, `restart` and `runtime` |
| `vid` | restarts the game's sound output system |
| `snd` | restarts the game's video render system |
| `restart` | unused, apparently used to restart the core engine systems |
| `runtime` | applies new value on UI element interaction |

# Useful Stuff, Tipps and Tricks

Finally I'd like to share some info about a few small QoL features, useful functions and nice-to-know's that make life a little easier.

## Mouse Specific Functions

**IsCursorOverWindow()**

This is called as a method of a UI element and returns a boolean value:

```LUA
local over_wnd = self.wnd:IsCursorOverWindow()
```

**GetCursorPosition() / SetCursorPosition()**

Global functions not tied to GUI classes, can be called as is. This is an example from *utils_ui.script*:

```LUA
local pos = GetCursorPosition() -- because ShowDialog moves mouse cursor to center
self:ShowDialog()
SetCursorPosition(pos)
```

## Better than game.translate_string

**SetTextST()**

Imagine you have stored your text in an XML file and want to set the text in GUI by using its string ID. Usually to convert a string ID to text
would you use:

```LUA
local str = game.translate_string("some_string_id")
self.text_wnd:SetText(str)
```

With `SetTextST()` you can skip the string ID to string conversion and instead pass the string ID directly:

```LUA
self.text_wnd:SetTextST("some_string_id")
```

This not only more compact but also a slightly faster in terms of execution time.

## Keeping Windows in Frame

Imagine you want a window to appear at or around the cursor position. How do you make sure it always appears within a given frame without adding
extra code that handles this check? Well, there is an engine function that does exactly that:

```LUA
self.ref -- reference window, can also be the GUI instance itself (self)
self.wnd -- some window you want to position around the cursor within the frame of the reference window

local window_rect = Frect()
self.ref:GetAbsoluteRect(window_rect)

local border = 10 -- safety dead zone width within window_rect
local dx16pos = 100 -- correction offset for 16x9 screen resolution

FitInRect(self.wnd, window_rect, border, dx16pos)
```

This function is commonly used to position UI elements such as hint windows correctly.

## Fonts, Colors and Text Alignment

You can access various fonts from scripts using these global functions:

- `GetFontSmall()`
- `GetFontMedium()`
- `GetFontDI()`
- `GetFontLetterica16Russian()`
- `GetFontLetterica18Russian()`
- `GetFontLetterica25()`
- `GetFontGraffiti19Russian()`
- `GetFontGraffiti22Russian()`
- `GetFontGraffiti32Russian()`
- `GetFontGraffiti50Russian()`

Use them like this:

```LUA
self.text:SetFont(GetFontMedium())

-- or alternatively

local font_medium = GetFontMedium()
self.text:SetFont(font_medium)
```

You can set horizontal and vertical text alignment. This is often more convenient then having to set the text UI element position manually
to get the desired result. There are three different modes each to choose from:

horizontal:

- `const alLeft = 0`
- `const alRight = 1`
- `const alCenter = 2`

vertical:

- `const valTop = 0`
- `const valCenter = 1`
- `const valBottom = 2`

Use them like this, in the example the text will be aligned left and at the bottom of our UI element:

```LUA
self.text_wnd:SetTextAlignment(0) -- expects integer value 0, 1 or 2
self.text_wnd:SetVTextAlignment(2) -- expects integer value 0, 1 or 2
```

When working with GUIs you may want to set or change a given color of certain UI elements dynamically. Methods that change colors always
receive a single number as their input argument. "But why a single number, what am I supposed to pass here???" Don't worry, the engine got
you covered. Just use this little function:

```LUA
local clr = GetARGB(123, 123, 123, 123) -- Alpha, Red, Green, Blue (range: 0 - 255)
```

This function converts your A,R,G,B values to a single number or in other words maps the 8 bit color channel values to a D3DCOLOR. Setting
a color works best for text but it works for textures too. When using a plain white texture the color changes will be visible the most. For
darker textures changing the color has a similar effect to changing the texture's Hue. If you want to get or set a certain color value of a
given color you can use these functions:

```Lua
local clr = GetARGB(255, 0, 0, 180)

-- getters, pass a D3DCOLOR value
-- returns a color channel value (range 0 - 255)
local A = ClrGetA(number)
local R = ClrGetR(number)
local G = ClrGetG(number)
local B = ClrGetB(number)

-- setters, pass a D3DCOLOR value and the value of the color channel you want to change (range 0 - 255)
-- returns a D3DCOLOR value
clr = ClrSetA(number, number)
clr = ClrSetR(number, number)
clr = ClrSetG(number, number)
clr = ClrSetB(number, number)
```

## Color Animations

Color animations are useful to create dynamic color effects like fades and blinking effects. Color animations can be used with `CUIStatic` instances.
You can set a color animation using the following code:

```Lua
self.background:SetColorAnimation("ui_slow_blinking", 9, 1000) -- color anim name, flag value, start delay in ms
```

These are all color animation flags you can set:

- `LA_CYCLIC` = 1
- `LA_ONLYALPHA` = 2
- `LA_TEXTCOLOR` = 4
- `LA_TEXTURECOLOR` = 8

Setting the flags that your color anim needs works by summing up the flag values. In the example above the color anim receives the flags `LA_CYCLIC`
and `LA_TEXTURECOLOR`: 1 + 8 = 9. Setting `LA_TEXTCOLOR` or `LA_TEXTURECOLOR` is absolutely necessary for the color anim to work, otherwise the game
crashes! The number 1000 means that the color animation starts 1000 ms after the anim has been set. If your `CUIStatic` instance displays text using
`self.background:TextControl():SetText()` you can use the flag `LA_TEXTCOLOR` to animate the text color.

This is a list of all color animations that exist in the game. All color animations have been tested with the flags `LA_CYCLIC` and
`LA_TEXTURECOLOR` on a texture with A/R/G/B = 255/255/150/140, a pink shade that's usually not represented in the game to make any color changes
visible. The appearance descriptions represent the effect visible with these flags. 'slow'/'medium'/'fast' describe the blinking speed. Note that
some color animations are very similar in appearance.

| Function | Appearance |
|----------|---------|
| `asus_logo_01` | fading from full transparent to full opaque and back, long pause at full opaque, sets color to black |
| `buy_menu_info` | fading from full transparent to full opaque and back, pause at full opaque, sets color to black |
| `credits_vis` | slow fading between full transparent to full opaque, short pause at full opaque, sets color to black |
| `credits_vis_sub` | similar to `credits_vis` |
| `credits_head` | medium blinking with fading between full transparent and full opaque, instant jump to full transparent, sets color to black |
| `det_on_off` | medium blinking with fading from base color to black |
| `flare_lanim_idle` | fading from orange to red to base color to black |
| `flare_lanim_showing` | fading from black to base color to orange to yellow |
| `hud_hit_mark` | slow blinking with fading from full opaque to full transparent, instant jump to full opaque, sets color to red |
| `hud_target` | sets color to black |
| `intro_1` | slow blinking from black to full transparent, long pause at black |
| `la_hud1` | medium blinking between red to base color |
| `map_spot_rel` | fast blinking between full opaque and full transparent, sets color to black |
| `map_spot_secrets` | low FPs style medium blinking from full transparent to full opaque, sets color to black |
| `mm_flicker_01` | slow blinking between full opaque and full transparent, sets color to black |
| `mm_flicker_02` | very slow blinking between full opaque and full transparent, sets color to black |
| `monster_claws` | fast blinking with fading from full opaque to full transparent, instant jump to full opaque, sets color to red |
| `outro_la` | slow blinking from full transparent to full opaque, sets color to black |
| `pri_a28_phrase_2` | low FPS style slow blinking from full transparent to full opaque, very long pause at full opaque |
| `ui_blinking_1` | medium blinking with fading between full opaque and half transparent + black color, small color pulse at highest transparency |
| `ui_btn_hint` | medium blinking with fading from full transparent to full opaque, instant jump to full transparent, sets color to black |
| `ui_fast_blinking_alpha` | fast blinking with fading effect from opaque to half transparent, instant jump to full opaque |
| `ui_medium_blinking_alpha` | medium blinking with fading effect from opaque to half transparent, instant jump to full opaque |
| `ui_slow_blinking_alpha` | slow blinking with fading effect from opaque to half transparent, instant jump to full opaque |
| `ui_slow_blinking` | medium blinking with fading effect between opaque and half transparent + black color |
| `ui_too_slow_blinking` | slow blinking with fading effect between opaque and half transparent + black color |
| `ui_too_slow_blinking_1` | slow blinking with fading effect between half transparent and almost full transparent |
| `ui_main_msgs` | slow blinking with very slow fading from full opaque to full transparent, instant jump to full opaque, short pause at full opaque |
| `ui_main_msgs_short` | slow blinking with fading effect from opaque to full transparent, instant jump to full opaque |
| `ui_map_area_anim` | medium blinking with fading effect from full transparent to opaque, instant jump to full transparent |
| `ui_minimap_enemy` | blinking that alternates between fading between opaque and full transparent and changing color brightness, sets color to red |
| `ui_minimap_friend` | sets color to green |
| `ui_minimap_neutral` | sets color to orange |
| `ui_mm_mp_srvinfo` | medium blinking with dafing from full transparent to full opaque, instant jump to full transparent, sets color to black |
| `ui_mp_chat` | VERY slow blinking with fading effect from opaque to full transparent while also fading color to black, instant jump to full opaque |
| `ui_mp_award_reward` | slow blinking with fading from full opaque to full transparent, longer pause at full opaque |
| `ui_mp_minimap_af_enemy` | blinking with fading between opaque and full transparent, short pause at full opaque, sets color to red |
| `ui_mp_minimap_af_friend` | blinking with fading between opaque and full transparent, short pause at full opaque, sets color to green |
| `ui_mp_minimap_af_neutral` | blinking with fading between opaque and full transparent, short pause at full opaque |
| `ui_pda_contacts` | fast on/off blinking without a fading effect, every 5. on blink has a short pause |
| `ui_tesk_description` | slow blinking with fading from full transparent to full opaque, longer pause at full opaque, sets color to black |
| `ui_task_selected` | medium blinking with fading between blue and turquoise |
| `new_task_highlight_00` | medium blinking with fading between almost full trnsparent and half transparent |
| `test_la_color` | medium blinking with fading between half transparent + base color and full opaque + blue |
| `test_la_fade_in` | fading from half transparent + black color to full opaque to base color |
| `test_la_fade_in_long` | fading from full opaque + black color to full transparent, instant jump to full opaque + black, longer pause at full transparent |
| `tutor_rad_sign_clr` | medium blinking with fading between half transparent and full transparent, sets color to light blue |
| `zat_a1_phrase_1` | low FPS style slow blinking from full transparent to full opaque, very long pause at full opaque |
| `zat_a1_phrase_2` | low FPS style slow blinking from full transparent to full opaque, long pause at full opaque |

## Hotkeys for Buttons

It is possible to assign a keybind to a `CUI3tButton` as a hotkey. When pressing the hotkey the button is triggered as if you pressed it using
the mouse. In your UI element info XML file add the following attribute to your button info:

```XML
<some_btn ... accel="kSpace"> -- assigns spacebar as hotkey
	...
</some_btn>
```

The assigned key needs to have the pattern `k*`, `*` can be any keybind like `G`,`L` or `1`. You can even assign a secondary hotkey using the
attribute `accel_ext`. Then in your script add the following line to `OnKeyboard()`:

```LUA
function MyGUI:OnKeyboard(key, keyboard_action)

	local res = CUIScriptWnd.OnKeyboard(self, key, keyboard_action) -- catches the key input
	
	if res then return end -- safety check to prevent potential crashes e.g. when a certain key press closes your GUI
	
	-- your code
end
```

`CUIScriptWnd.OnKeyboard(self,key,keyboard_action)` catches the key input and passes it to the button which has the hotkey assigned if the pressed key
matches the hotkey. Make sure your button has a registered callback function, otherwise nothing will happen. If the key press was indeed used by the
engine the function returns `true`.

## Changing Files on Runtime

Besides script files it is possible to edit certain GUI related files and see the changes in-game WITHOUT having to restart it. Just save the
file and reload the game/save. This works as long as you edit the file content, NOT the file name or its location. Such files include:

- XML files that contain UI element info
- texture files

Unfortunately this doesn't work for all GUI related files. You have to restart the game when editing the following files:

- XML files that store text
- texture description files
