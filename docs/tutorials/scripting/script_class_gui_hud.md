---
title: Script class GUIs and HUDs
tags:
    - LUA
draft: true
---

# Script class GUIs and HUDs

___

<Authors
  authors={["PrivatePirate97"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## Introduction

Graphical user interfaces essential parts of every game. Generally GUIs can be put into two distict categories:

1. GUIs that let the player interact with certain game mechanics via mouse and/or keyboard such as trader inventories, NPC dialog windows, options menu etc.

2. GUIs that provide the player with essential information such as player health, stamina, ammo etc, but without offering direct interaction

To make the distiction between these two types clear, I am going to refer to type 1 as "GUI" and and type 2 as "HUD" throughout this tutorial. Based on this
distiction, it's clear that GUIs and HUDs have a fundamentally different character/purpose. However, looking at their code it goes to show that GUIs and HUDs
are very similar. This tutorial provides a brief overview of how to create a basic GUI or HUD.

  
## Code Basics

Apart from a few exceptions, GUIs and HUDs can be created entirely in Lua scripts. However, they work extensively with engine class methods,
more details about this later.

From now on the term "GUI" will be used synonym for both GUI and HUD if not expressed otherwise.

  
### Creating a GUI

To create a GUI you need these essential functions.

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
executed once like e.g. creating static/fundamental UI elements like the main window of your GUI.

3. Called when your GUI is destroyed and necessary in order to prevent Lua from potentially interacting with a GUI that
doesn't exist anymore on the engine side. The call happens when the game is interrupted by a level transition or when loading a save.

4. Called about 4 times per frame (I don't know why). If you have any dynamic UI elements that need to update time based (as opposed to event
based) e.g. progress bars you're probably gonna put the respective code here. Never forget to add `CUIScriptWnd.Update(self)`,
otherwise none of your UI elements will work properly! Also better avoid putting performance heavy code here if possible or throttle the
code execution using timers. ;)

As you can see, the functions 2, 3 and 4 are called with this pattern: `YourClassName:SomeClassFunction()`. Adding new functions
to your class follows the same pattern. It is common style to start each word of the name of the class and all its functions with a capital
letter but that's up to you. Just make sure that these four functions shown above are written as shown in the example.

  
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

It is recommened to declare `GUI` as a global variable in your script in order to be able to access your GUI from other scripts. Keep in mind that when
calling your GUI using `GUI:ShowDialog(true)` you usually cannot move the character but you change that behavior, see chapter 'Control of UI Elements'
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

1. It fires `GUI_on_show` callback when you show your GUI.

2. It adds your GUI to the global tables `_GUIs` and `_GUIsInstances` in *_g.script* which are used to have control over all active GUIs in the game
like e.g. hiding or even destroying all of them at once, see *_g.script* for reference.

  
### How do I close my GUI?

Closing a GUI dialog works like this:

```LUA
function close_ui()
	if GUI and GUI:IsShown() then
		GUI:HideDialog() -- closes GUI dialog, mouse cursor disappears
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

In order to interact with a GUI there exists bunch of different UI elements such as buttons and sliders or the window that contains these elements.
But of course these elements have to be added manually. To build your GUI call a function when `__init()` is executed:

```LUA
function MyGUI:__init() super()
	self:InitControls()
end

function MyGUI:InitControls()
	self:SetWndRect(Frect():set(0,0, 1024, 768)) -- sets position and size (left, top, right, bottom) of the dialog window
	self:SetAutoDelete(true)
	
	self.XML = CScriptXMLInit()
	local XML = self.XML -- just so you don't have to write self.XML everytime
	XML:ParseFile("my_XML_gui_structure.XML")
	
	self.my_wnd = XML:InitStatic("background", self)
	
	self.my_text = XML:InitTextWnd("background:text", self.my_wnd)
	self.my_text:SetText("My text here")
end
```

Setting the interaction area of your GUI using `SetWndRect()` is the first step. Every UI element placed outside of this area cannot be
interacted with. Therefore it is common to set the area to cover the whole screen. Keep in mind that no matter what your screen resolution
is, the engine will always translate the resolution to a frame with size 1024x768 to handle any GUI related stuff.
`self.XML = CScriptXMLInit()`calls an instance of the engine class `CUIXMLInit`, responsible for creating any of the available UI elements.
`XML:ParseFile()` receives the name of your XML file that stores properties of the UI elements your GUI uses such as position, size, textures,
text formatting, color etc. Without this XML file your GUI won't work.

So what UI elements are created in the example above?

- `InitStatic()` creates a simple static window that can contain any other UI element.
- `InitTextWnd()` creates a window that can display text.
- `InitCheck()` creates an ON/OFF button.

There are many more UI elements which can be found in *lua_help.script*. Additionally the file lists all methods available to these UI elements
such as `SetText()` or `Show()`. A detailed description of these elements and their methods can be found in chapter 'UI elements and their methods'.

A UI element creation method like e.g. `InitStatic()` usually receives the following arguments:

- the path to the UI element info in your XML file, e.g. `"background"`
- the parent UI element or, if none exists, the class instance itself (`self`)

Calling `InitControls()` in `__init()` is recommended if the GUI structure needs to be built only once and stays the same after that. If instead you
need a more dynamic structure you can call `InitControls()` from outside your class instead of calling it in `__init`.

  
### Parents and Children

Setting the parent has a direct influence on how UI elements behave. If you change the visibility or position of the parent, this will also affect
all its children.

Consider the following example. We create a simple window that contains text and a trackbar. We want to control both position and visiblilty of these
UI element via the window that contains them:

```LUA
function MyGUI:CreateWindow()
	self.wnd = XML:InitStatic("parent_window", self)
	self.wnd:Show(false) -- sets the window invisible
	
	self.text = XML:InitTextWindow("parent_window:text_block", self.wnd)
	self.text:SetText("This is our text window.")
	
	self.track = XML:InitTrackBar("bar", self.text)
end
```

As you can see we pass `self.wnd` as the parent of the text window and `self.text` as the parent of the trackbar. You can ignore the structure of the
XML info path. It has nothing to with how parent/child relations between UI elements a created. Now what happens here? As you can see `self.wnd`
has been set invisible. Since `self.text` is a child of `self.wnd` and `self.track` is a child of `self.text` (and therefore indrectly a child of
`self.wnd`), when the GUI opens not just `self.wnd` but all three elements will be invisible.

  
### Self???

"What is 'self'?", you may ask. Basically it's a shorter, more convenient way to reference your GUI class instance WITHIN your class.
`self.my_wnd` is the same as writing `MyGUI.my_wnd`. Everything you declare with `self` can be accessed from anywhere within your GUI class. Don't
confuse `self.` with `self:` though. When calling a class method such as `self:InitControls()` you always use ':' instead of '.'. Keep in mind that
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

function MyGUI:OnButton_One()
	-- your code
end

function MyGUI:OnButton_Two()
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

		self:Register(self.btn, "button_exec_func_"..i)
		
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

Callbacks are not limited to be used with buttons only. There are a bunch of different callbacks for all kinds of UI elements. A full list of callbacks
can be found in chapter 'UI elements and their methods'.

  
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

This following lists contain all UI elements available in the game. Please forgive me for not being able to provide complete info about
what each UI element does. Disclaimer: Despite having researched carefully some lists or function descriptions may be incomplete or incorrect.


## Creating a UI Element

All methods in the next two lists are called as methods of `CScriptXMLInit()`.

| Function | Purpose |
|----------|---------|
| `InitWindow(string, number, CUIWindow*)` | creates a separate window (for temporary use) that can be interacted with, see properties menu in inventory for reference |
| `InitStatic(string, CUIWindow*)` | creates basic window that can contain any other UI element |
| `InitFrame(string, CUIWindow*)` | creates a UI element whose frame texture elements don't get distorted when scaling the element itself |
| `InitFrameLine(string, CUIWindow*)` | creates a UI element similar to InitFrame() but without a center section, can be used to scale separating elements like lines/bars distortion-free |
| `InitTextWnd(string, CUIWindow*)` | creates a text window that allows for various formatting options |
| `Init3tButton(string, CUIWindow*)` | creates a simple button |
| `InitCheck(string, CUIWindow*)` | creates an ON/OFF button |
| `InitScrollView(string, CUIWindow*)` | creates a window with a scrollbar and up/down arrows for navigation |
| `InitTrackBar(string, CUIWindow*)` | creates a slider that can be used to change a value |
| `InitProgressBar(string, CUIWindow*)` | creates progress bar as used for health, stamina, Psy health etc. |
| `InitListBox(string, CUIWindow*)` | creates a list with strings, see properties menu in inventory for reference |
| `InitComboBox(string, CUIWindow*)` | creates a dropdown menu, see e.g. SMAA settings in options menu for reference |
| `InitEditBox(string, CUIWindow*)` | creates a prompt window that allows to change a value, see Hud Editor for reference |
| `InitKeyBinding(string, CUIWindow*)` | creates a prompt window for setting a keybind |
| `InitMMShniaga(string, CUIWindow*)` | creates a vertical button list with the magnifying stip UI element that exists in main and pause menu |
| `InitTab(string, CUIWindow*)` | used for creating complex menus with multiple tabs, see Stalker CoP options menu for reference |
| `InitAnimStatic(string, CUIWindow*)` | CHECK!!! |
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

  
These methods allow (manual) parsing of your UI element info XML file. Keep in mind that default index = 0.

| Function | Purpose |
|----------|---------|
| `ParseFile(string)` | reads UI element info from XML file (string) from standard path `"gamedata\\configs\\ui"` |
| `ParseDirFile(string, string)` | same as `ParseFile()` but allows to set a custom directory path e.g `"gamedata\\configs\\ui\\my_gui"`. receives custom path as 2. argument |
| `NodeExist(string, number)` | checks whether a node exists, receives node path and its index (in case there are several nodes with the same name, otherwise can be ignored). returns boolean value |
| `GetNodesNum(string, number, string)` | counts how many nodes with the specified node name exist as children of the node specified with path and index, if no path is passed the whole XML is parsed, if no tag name is parsed all child nodes are counted. receives path (string), index (integer) and node name (string). returns node count as number |
| `NavigateToNode(string, number)` | navigates to node defined with path (string) and index (integer) |
| `NavigateToNode_ByAttribute(string, string, number)` | searches XML file for a node with tag name (string) that contains an attribute with the attibute name (string) and a value (integer) |
| `NavigateToNode_ByPath(string, index, string, string, string)` | searches XML file for a node specified by path (string), index (number) and tag name (string) that contains an attribute with the attibute name (string) based on certain attribute-value pattern (string) |
| `NavigateToRoot()` | navigates to root node of the UI element info structure in XML file |
| `ReadValue(string, number)` | reads the value of the node specified by path (string) and index (index), only used for simple node structures like `<width>123</width>` |
| `ReadAttribute(string, number, string)` | reads the value of an attribute specified by tag name in a node specified by path and index, receives path and index and tag name|


These UI elements are called from different classes or are created by calling their respective class.

| Function | Purpose |
|----------|---------|
| `CUITabControl()` | create a bar that allows switching between multiple tabs, has to be filled with tab `CUITabButton` instances |
| `CUITabButton()` | MAYBE REMOVE creates a tab button instance, not usable on its own! |
| `CUIListBoxItem()` | creates a listbox item that can be added to a listbox |
| `` | |
| `` | |
| `` | |

`CUIMessageBox()`

| Function | Purpose |
|----------|---------|
| `InitMessageBox(string)` | creates a message box with buttons, similar to the 'Discard changes?' window in options menu |

These UI elements are created in Lua. They are prefabricated and always have a certain structure but can be customized to certain degree.
You can call them from *utils_ui.script*, see *utils_ui.script* for reference.

| Function | Purpose |
|----------|---------|
| `UICellContainer()` | creates a container with 'cells', similar to how items are displayed in inventory |
| `UICellItem()` | creates a single item cell |
| `UIInfoItem()` | creates a window with info about an item, similar to the info window that pops up when hovering above an item in inventory |
| `UIInfoUpgr()` | creates the upgrade interface for items like weapons |
| `UICellProperties()` | creates a dropdown menu, can be filled with options, similar to props window when right clicking on an item in inventory |
| `UICellPropertiesItem()` | creates an entry for a UICellProperties window |
| `UIHint()` | creates a hint simple window that can contains any text, similar to hint texts appearing when hovering settings in settings menu |

You can use them in your GUI like this:

```LUA
self.item_info = utils_ui.UIItemInfo(self, 500)
```

In this example an info window for items is created. We pass the GUI instance as the parent of this UI element and a hover pop up delay time in ms. What arguments you
have to pass depends on the UI element you call.


  
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
| `HideDialog()` | closes GUI, cursor disappears, player controls are fully regained |
| `Update()` | general update function to put all kinds of code to control time dependent UI element behavior, called about 4 times per frame, use with care! |
| `OnKeyboard(number, number)` | tracks key presses, returns key ID and UI element callback event ID as numbers, see chapter 'UI Callback Event IDs' |
| `Register(CUIWindow*, string)` | registers a UI element to make callbacks work, receives the UI element instance and a unique ID as a string |
| `AddCallback(string, number, functor, CUIWindow*)` | creates a callback for a UI element to perform certain actions based on the UI callback event ID, receives a UI element ID, a UI callback event ID, a functor to execute, the parent GUI class instance |
| `AllowMovement(bool)` | if set to true, moving around is possible while the GUI is active, similar to inventory |
| `AllowCursor(bool)` | if set to false, no cursor will be available for the GUI |
| `AllowCenterCursor(bool)` | if set to true, the cursor will always show up in the center of the screen, otherwise it starts at the last position when the GUI was closed |
| `AllowWorkInPause(bool)` | if set to true, the GUI stays active when pausing the game |
| `Dispatch()` | unused, event based callback function that opened multiplayer menu in main menu |
| `GetHolder()` | returns the object that manages the GUI dialog (showing your GUI, showing cursor, hiding indicator etc.), has to be called AFTER the GUI dialog has started, has no real use cases |


### Commonly Used

| Function | Purpose |
|----------|---------|
| `IsShown()` | returns current visibility state of the UI element as boolean value |
| `Show(bool)` | sets visibility of the UI element |
| `IsAutoDelete()` | checks AutoDelete state of the UI element, returns boolean value |
| `SetAutoDelete(bool)` | if set to true, the UI element will automatically be hidden when opening the GUI |
| `Enable(bool)` | if set to false, any interaction with the UI element is disabled |
| `IsEnabled()` | checks interaction state of the UI element, returns boolean value |
| `GetWndPos()` | returns a 2D vector of the top left corner position of the UI element |
| `SetWndPos(vector2)` | sets position of the top left corner of the UI element |
| `SetWndRect(Frect)` | sets position and size of the area where mouse event are registered |
| `GetWidth()` | returns a the width of the UI element as number |
| `GetHeight()` | returns a the height of the UI element as number |
| `SetWndSize(vector2)` | sets width and height of the UI element |
| `AttachChild(CUIWindow*)` | sets a UI element as the child of some other UI element |
| `DetachChild(CUIWindow*)` | removes child state of UI element with respect to its parent. If the element has no parent and there is reference to that element it will be destroyed |
| `WindowName()` | returns the string assigned to a UI element when registering it using `Register()` |
| `SetWindowName(string)` | assigns a string as a name to a UI element, similar to  |
| `FocusReceiveTime()` | returns inital delay time for a UI element to receive inputs as a number, no real use cases |
| `GetAbsoluteRect()` | returns position and size of the `CUIWindow` instance the method is called on as an Frect (left, top, right, bottom) |
| `SetPPMode(bool)` | PostProcessing mode, used for the magnifier element in main/pause menu |
| `ResetPPMode()` | resets PP mode |


### Textures

| Function | Purpose |
|----------|---------|
| `InitTexture(string)` | sets texture of the UI element, receives a texture path e.g. `"ui\\my_gui\\background.dds"` |
| `InitTextureEx(string, string)` | sets texture of the UI element placed on a 3D model e.g. display of dosimeter, receives a texture path and the shader path `"hud\\p3d"` |
| `GetTextureRect()` CHECK!!! | returns Frect containg position and size info about the area containing the texture CHECK!!! |
| `SetTextureRect(Frect)` | sets position and size of the area containing the texture |
| `SetStretchTexture(bool)` | controls whether or not a button texture will be stretched when button size is not equal to texture size |
| `GetTextureColor()` | returns color of a texture as a number |
| `SetTextureColor(number)` | sets color of a texture, receives a number |
| `EnableHeading(bool)` | enabled a static to be rotated |
| `GetHeading()` | returns rotation of the UI element in radians |
| `SetHeading(number)` | sets rotation of the UI element in radians |
| `GetConstHeading()` | returns const heading state of the UI element WHAT IS CONSTHEADING??? |
| `SetConstHeading(bool)` | if set to false, UI elements rotates when its parent UI element rotates, otherwise it's not affected |
| `SetColorAnimation(string)` CHECK!!! | creates animated color change for a texture CHECK!!! |
| `ResetColorAnimation(string)` | resets color animation |
| `RemoveColorAnimation(string)` | removes color animation |


### Text

| Function | Purpose |
|----------|---------|
| `GetText()` | returns string that a text element is currently displaying |
| `SetText(string)` | sets text of a UI element |
| `SetTextST(string)` | sets text of a UI element using a string ID, for text stored in XML file |
| `TextControl()` | access text formating methods for certain UI elements, use like this: `self.btn:TextControl():SetText("text")` |
| `SetTextOffset(x, y)` | sets position of the text relative to its text UI element, even allows to set position outside its text UI element |
| `GetTextColor()` | return the text color as a number |
| `SetTextColor(number)` | sets text color, use like this: `self.text:SetTextColor(GetARGB(255, 110, 110, 50))` |
| `GetFont()` | returns the current font used by the text |
| `SetFont(CGameFont*)` | sets text font, see chapter 'Useful stuff, tipps and tricks' for reference |
| `SetTextAlignment(number)` | sets horizontal text alignment, see chapter 'Useful stuff, tipps and tricks' for reference |
| `SetVTextAlignment(number)` | sets vertical text alignment, see chapter 'Useful stuff, tipps and tricks' for reference |
| `SetTextComplexMode(bool)` | if set to true, text continues on new line when reaching the border of a text UI element, also any formatting in the text will be considered |
| `SetEllipsis(bool)` | if set to true, text that doesn't fit inside its text UI element will be cut off and replaced with "..". Only works if text complex mode is set to false! |
| `AdjustWidthToText(bool)` | if set to true, the text UI element's width will be set to fit the height of a text block |
| `AdjustHeightToText(bool)` | if set to true, the text UI element's height will be set to fit the height of a text block |

  
### Buttons

| Function | Purpose |
|----------|---------|
| `GetCheck()` | returns current state of a check button |
| `SetCheck(bool)` | sets current state of a check button |
| `SetDependControl(CUIWindow*)` | synchronizes the interaction state of another UI element to the button state. When the button state is OFF the assigned UI element is disabled i.e. cannot be interacted with |


### Scrollview

| Function | Purpose |
|----------|---------|
| `AddWindow(CUIWindow*, bool)`	| adds a UI element to the scrollview, the boolean flag controls the auto delete state of that UI element. UI elements are added vertically if not set otherwise in XML file |
| `RemoveWindow(CUIWIndow*)` | removes a UI element from the scrollview |
| `Clear()` | removes all UI elements from the scrollview |
| `ScrollToBegin()` | scrolls to the top of the scrollview |
| `ScrollToEnd()` | scrolls to the bottom of the scrollview |
| `GetMinScrollPos()` | returns the lowest scroll position as a number |
| `GetMaxScrollPos()` | returns the highest scroll position as a number |
| `GetCurrentScrollPos()` | returns current scroll position as a number |
| `SetScrollPos(number)` | sets current scroll position |
| `SetFixedScrollBar(bool)` CHECK!!! | controls whether the scrollbar is always visible CHECK!!! |


### Trackbars

| Function | Purpose |
|----------|---------|
| `GetIValue()` | returns the current trackbar value as a number, use if trackbar mode `is_integer="1"` in XML files |
| `SetIValue(number)` | sets the current trackbar value as a number, use if trackbar mode `is_integer="1"` in XML files, a passed float will be rounded to the next lowest integer |
| `GetFValue()` | returns the current trackbar value as a number, if trackbar mode `is_integer="1"` this returns an integer |
| `SetFValue(number)` | sets the current trackbar value as a number, if trackbar mode `is_integer="1"` the passed value will be rounded to the next lowest integer |
| `SetStep(number)` | sets the step size when moving the slider on the trackbar, if trackbar mode `is_integer="1"` the passed value will be rounded to the next lowest integer |
| `GetInvert()` | returns invert state of the trackbar as a boolean value |
| `SetInvert()` | sets invert state of the trackbar, if set to true moving the slider to the left increases the value instead of decreasing it and vice versa |
| `SetOptIBounds(number, number)` | sets min/max value of the trackbar, use if trackbar mode `is_integer="1"` in XML files, passed floats will be rounded to the next lowest integers |
| `SetOptFBounds(number, number)` | sets min/max value of the trackbar |
| `SetCurrentValue(number)` | sets the current trackbar value |
| `GetCheck()` | apparently unused |
| `SetCheck(bool)` | apparently unused |


### Progressbars

| Function | Purpose |
|----------|---------|
| `SetProgressPos(number)` | sets the current position of the progressbar, receives a number between 0 and 1 |
| `GetProgressPos()` | returns current position of the progressbar as a number |
| `GetRange_min()` | returns min value the progressbar can display as a number |
| `GetRange_max()` | returns max value the progressbar can display as a number |
| `SetRange(number, number)` | sets min an max values of a progressbar |
| `ShowBackground(bool)` | if set to true the background texture behind the actual bar will be visible |
| `SetColor(number)` | sets the color of the progressbar |
| `UseColor(bool)` | controls whether the progressbar uses different colors |
| `SetMinColor(number)` | sets the color displayed at the lowest progressbar value |
| `SetMiggleColor(number)` | sets the color displayed when the progressbar value reaches 50% |
| `SetMaxColor(number)` | sets the color displayed at the hightest progressbar value |
| `GetProgressStatic()` | returns the `CUIStatic` that resembles the actual bar |


### Listboxes

| Function | Purpose |
|----------|---------|
| `ShowSelectedItem(bool)` | sets visibility of the listbox |
| `RemoveAll()` | removes all items of the listbox |
| `GetSize()` | returns listbox item count as a number |
| `GetSelectedItem()` | returns the `CUIListBoxItem` instance of the selected listbox item or nil if no item is selected |
| `GetSelectedIndex()` | returns ID of the selected listbox item or 4294967295 if no item is selected |
| `SetSelectedIndex(number)` | sets listbox item with the specified ID as selected, receives ID as a number |
| `SetItemHeight(number)` | sets height of each listbox item, receives the height as number |
| `GetItemHeight()` | return height of each listbox item as a number |
| `GetItemByIndex(number)` | returns the `CUIListBoxItem` instance of the listbox item with the specified ID or nil if no item with this ID exists, receives ID as number |
| `GetItem(number)` | generalized version of `GetItemByIndex()`, can also access other elements of the UI object e.g. the `CUIScrollView` instance the listbox is made of |
| `RemoveItem(CUIWindow*)` | removes a `CUIListBoxItem` from the listbox, receives a `CUIListBoxItem` instance |
| `AddTextItem(string)` | adds an item to the listbox, receives a string ID or a default string |
| `AddExistingItem(CUIWindow*)` | adds an existing `CUIListBoxItem` instance to the listbox, use if you have created a `CUIListBoxItem` inctance manually |
| `CUIListBoxItem(number)` | MOVE SOMEWHERE ELSE creates an instance of a listbox item, receives item height |

These methods are called on a `CUIListBoxItem` instance.

| Function | Purpose |
|----------|---------|
| `GetTextItem()` | returns the `CUITextWnd` instance of the listbox item |
| `AddTextField(string, number)` | adds a `CUITextWindow` instance to the listbox item that displays text, receives text as a string and width as a number |
| `AddIconField(number)` | adds a `CUIStatic` instance to the listbox item, can be used to display textures, images etc., receives width as a number |
| `SetTextColor(number)` | sets color of the text displayed in the listbox item, receives a number |


### Comboboxes

A combobox is a combination of a `CUITextWnd` and a `CUIListBox` so you can call the respective methods on both elements.

| Function | Purpose |
|----------|---------|
| `SetVertScroll(bool)` | if set to true, scrolling the combobox is enabled CHECK!!! |
| `SetListLength(number)` | sets the amount of elements in the combobox, receives an integer |
| `CurrentID()` | returns the ID of the currently selected combobox item as a number |
| `disable_id(number)` | disables the combobox item with the specified ID, receives ID (integer) |
| `enable_id(number)` | enables the combobox item with the specified ID, receives ID (integer) |
| `AddItem(string, number)` | adds a combobox item to the combobox, receives displayed text (string) and options value (integer) |
| `GetText()` | returns the text that's currently shown in the selection window |
| `GetTextOf(number)` | returns the text displayed on the combobox item with the specified ID, returns `""` if ID is greater than item count, receives ID as an integer |
| `SetText(string)` | sets the text in the selection window, receives text as a string |
| `ClearList()` | removes all combobox entries and the text in the selection window |
| `SetCurrentOptValue()` | updates the combobox items and their values with current options value CHECK!!! |
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

| Function | Purpose |
|----------|---------|
| `AddItem(string, string, vector2, vector2)` | adds a tab button, receives the button text, texture path, position vector and size vector |
| `AddItem(CUITabButton*)` | adds a tab button, receives a tab button UI element |
| `RemoveAll()` | removes all tab buttons |
| `GetActiveId()` | returns ID of active tab as a string |
| `GetTabsCount()` | returns tab count as number |
| `SetActiveTab(string)` | sets the tab with the passed ID as active tab |
| `GetButtonById(string)` | returns the UI element with the passed tab button ID |
| `GetEnabled()` | returns tab (button) interaction state as a boolean value |
| `SetEnabled(bool)` | sets tab (button) interaction state, when set to false interaction with this tab is disabled |



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


# UI Info XML File Structure

## The Basic Structure

As mentioned in the beginning, a GUI needs a file that describes its UI elements. This information is stored in an XML file and has a tree like
structure with branches and subbranches. In general every UI element can be described with a number of certain parameters. Some of them are mandatory,
some are optional, see chapter 'XML Parameters for UI Elements' for reference. The basic structure of an XML file always looks like this:

```XML
<w> -- opening tag
	
	your UI element info here

</w> -- closing tag
```

How you name these base tags doesn't matter. All that matters is that they exist, have the same name and the closing tag contains `/`. All data you store
is enclosed in these two tags. The same is true for any other pair of tags you add. If XML your file has a syntax typo the game usually crashes with an error
message hinting to an error in your file. Let's add some data:

```XML
<w>
	<main_wnd x="120" y="200" width="300" height="200" stretch="1">
		<texture>ui\my_gui\background.dds</texture>
	</main_wnd>
</w>
```

Here we describe the size and position of a `CUIStatic`, a simple window that displays a texture. `x` and `y` define the position of the
upper left corner of the window, `width` and `height` tell us that the window expands 300 px to the right and 200 px downwards. If these numbers were
negative the window would expand to the upper left direction instead but it's uncommon to do that. As you can see we have defined a texture for the
window by storing the texture path. This is where the `stretch` parameter comes into play. It controls whether the texture will scale according to the
window dimensions (`stretch="1"`) or keep its own dimenstions instead (`stretch="0"`) e.g. 100x200 px.

The info structure shown above can be used in your script as follows:

```LUA
self.main = xml:InitStatic("main_wnd", self) -- pass tag name here
```

You simply pass the path to the tag name a string. Since `main_wnd` is at the 1. level of the tree the path is the tag name itself. Keep in mind that
the base tag `<w>` is never included in any path. Thats's all, nothing as simple as that. Let's add two buttons:

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
		<texture>ui_button_ordinary</texture> -- button texture
		<text font="letterica16" r="250" g="255" b="255" a="255" align="c" vert_align="c"/> -- button text info
	</btn_settings>
</w>
```

In the script you write:

```LUA
self.main = xml:InitStatic("main_wnd", self)

self.btn_start = xml:Init3tButton("main_wnd:btn_start", self.main)

self.btn_settings = xml:Init3tButton("btn_settings", self.main)
```

Both buttons are children of the `self.main` but one button info is enclosed by the `main_wnd` tags while the other is not. This may look a bit confusing
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

In one of the example in the previous chapter the button texture was not stored with a texture file path but with the ID `ui_button_ordinary`
instead. Why is that? Well, it makes sense to save multiple textures in one .dds file instead of having a single file for every tiny little
icon. But how do we know which texture is where in the file and how do we access it? That's where texture descriptions files help are helpful.
A texture description file is an XML file that assings an ID to each texture and stores information about its size and position. Here is an excerpt
of the file that stores the button texture used in the example in the previous chapter:

```XML
<w>
	<file name="ui\ui_common"> -- texture file path
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

As you can see a texture description entry starts with the tage name `file` followed by the texture path it describes. As for the button texture, 4
different textures are stored which resemble the 4 button states disabled/enabled/hovered/pressed. Yes, this is handled with different textures, not
shaders or anything. Interesting, isn't it? Don't be confused by the `_d`/`_e`/`_h`/`_t` suffixes. These are necessary for the engine to handle the
textures properly. As for your UI info XML file, it's enough to store the "base name" of the texture -> `ui_button_ordinary`.


## XML Parameters for UI Elements

These lists contain all mandatory and optional XML info parameters for each UI element. Disclaimer: Despite having researched carefully some lists 
or info descriptions may be incomplete or incorrect.


# Useful stuff, tipps and tricks

Finally I'd like to share some info about a few small QoL features, useful functions and nice-to-know's that make life a little easier.

**IsCursorOverWindow()**

This is called as a method of a UI element and returns a bool:

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

**SetTextST()**

Let's say you have stored your text in an XML file and want to set the text in GUI by using its string ID. Usually to convert a string ID to text
would you use:

```LUA
local str = game.translate_string("some_string_id")
self.text_wnd:SetText(str)
```

With `SetTextST()` you can skip the string ID to string conversion and instead pass the string ID directly:

```LUA
self.text_wnd:SetTextST("some_string_id")
```

This not only more compact but also more a little faster in terms of execution time.


**Fonts**

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

  
**Text alignment**

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

You can use them like this, in the example the text will be aligned left and at the bottom of our UI element:

```LUA
self.text_wnd:SetTextAlignment(0) -- expects integer value 0, 1 or 2
self.text_wnd:SetVTextAlignment(2) -- expects integer value 0, 1 or 2
```

**Setting a color**

When working with a GUIs you may want to set or change a given color of certain UI elements dynamically. Methods that change colors always
receive a single number as their input argument. "But why a single number, what am I supposed to pass here???" Don't worry, the engine got
you covered. Just use this little function:

```LUA
local clr = GetARGB(123, 123, 123, 123) -- Alpha, Red, Green, Blue (range: 0 - 255)
```

This function converts your A,R,G,B values to a single number or in other words maps the 8 bit color channel values to a D3DCOLOR. Setting
a color works best for text but it works for textures too. When using a plain white texture the color changes will be visible the most. For
darker textures changing the color has a similar effect to changing the texture's Hue.


**Changing files while the game runs**

Besides script files it is possible to edit certain GUI related files and see the changes in-game WITHOUT having to restart it. Just save the
file and reload the game/save. This works as long as you edit the file content, NOT the file name or its location. Such files include:

- XML files that contain UI element info
- texture files

Unfortunately this doesn't work for all GUI related files. You have to restart the game when editing the following files:

- XML files that store text
- texture description files