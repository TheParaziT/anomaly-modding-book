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

Graphical user interfaces (GUI) and heads up displays (HUD) are essential parts of any game. While GUIs let the player interact
with certain gameplay mechanics (e.g. trader inventories, NPC dialog windows, options menu), the purpose of HUDs is to provide the player
with essential info such as player health, stamina or ammo. However, looking at their code it goes to show that GUIs and HUDs
are very similar. This tutorial provides a brief overview of how to create a basic GUI or HUD.

  
## Code Basics

Apart from a few exceptions, GUIs and HUDs can be created entirely in Lua scripts and are treated as engine simulated classes since
Lua itself doesn't provide a native class system unlike C++. However, they work extensively with engine class methods, more details
about this later.

From now on the term "GUI" will be written synonym for both GUI and HUD if not expressed otherwise.

  
### Creating a GUI

To create a GUI you need essential functions.

```LUA
class "MyGUI" (CUIScriptWnd)	-- 1

function MyGUI:__init() super() -- 2
	-- your code
end

function MyGUI:__finalize()		-- 3
	-- your code
end

function MyGUI:Update()			-- 4
	CUIScriptWnd.Update(self)
	-- your code
end
```

1. Creates a class with the name "MyGUI" but the class can have any name. It is common style to start each word of the class name and its
methods with a capital letter but that's up to you.

2. This function is called once when your GUI class instance is created. In this function you can execute any code that only needs to be
executed once like e.g. creating static UI elements.

3. This function is called when your GUI is destroyed and necessary in order to prevent Lua from potentially interacting with a GUI that
doesn't exist anymore on the engine side. This happens when the game is interrupted by a level transition or when loading a save.

4. This function is called about 4 times per frame (I don't know why). If you have any dynamic UI elements that need to update time based
(as opposed to event based) e.g. progress bars you're probably gonna put the respective code here. Never forget to add `CUIScriptWnd.Update(self)`,
otherwise none of your UI elements will work properly! Also better avoid putting performance heavy code here if possible or throttle the
code execution using timers. ;)

  
### How do I call my GUI?

Just as with other engine classes exposed to Lua you can call an instance of you CUI class with the following code:

```LUA
function show_ui()
	if GUI == nil then
		GUI = MyGUI() -- calls instance of your GUI class
	end
	
	if GUI and not GUI:IsShown() then -- only show the GUI if it is NOT shown yet
		GUI:ShowDialog(true) -- show the GUI dialog, mouse cursor appears on screen
		Register_UI("MyGUI", "your_script_name", GUI)
	end
end
```

You may want to declare "GUI" as a global variable in your script in order to be able to access it from other scripts. Keep in mind that
when a GUI is active you usually cannot move the player. This restriction can be bypassed though. Notice that Register_UI creates and
entry in a global table in *_g.script*.

For HUDs this example function looks a little different:

```LUA
function show_hud()
	if HUD == nil then
		HUD = MyHUD() -- calls instance of your HUD class
	end
	
	if HUD and not HUD:IsShown() then
		get_hud():AddDialogToRender(MyHUD) -- adds HUD to the screen
	end
end
```

Unlike with GUIs you always retain full control over the actor when having an active HUD instance.

  
### How do I close my GUI?

Closing a GUI dialog works like this:

```LUA
function close_ui()
	if GUI and GUI:IsShown() then
		GUI:HideDialog() -- closes GUI dialog, mouse cursor disappears
		Unregister_UI("UI_Attachments")
		GUI = nil -- optional, destroys GUI instance
	end
end
```

For HUDs the code looks like this:

```LUA
function close_hud()
	if HUD and HUD:IsShown() then
		get_hud():RemoveDialogToRender(HUD)
		HUD = nil -- optional, destroys HUD instance
	end
end
```

Whether or not you set `GUI`/`HUD` to nil depends on the use case of your GUI. If you set it to nil your class instance will be destroyed.
Calling a new instance will create a completely new GUI, `__init()` is called again, your GUI structure is rebuild from scratch. Otherwise
your GUI instance persists and when calling it you skip rebuilding its fundamental structure.
Keep in mind that when transitioning to another level or loading a save, all GUIs and their references will be destroyed. But be careful!
It is strongly advised to always close your GUI automatically when the game is interrupted by any loading sequences. Otherwise the game
can crash! In order to prevent such crashes simply use a callback like this:

```LUA
function on_game_start()
	RegisterScriptCallback("actor_on_net_destroy", close_my_gui)
end
```

  
## Building the GUI Structure

In order to interact with a GUI there are a bunch of UI elements such as buttons and sliders or the window that contains these elements.
But of course these elements have to be created manually. To build your GUI call a function when `__init()` is executed:

```LUA
function MyGUI:__init() super()
	self:InitControls()
end

function MyGUI:InitControls()
	self:SetWndRect(Frect():set(0,0, 1024, 768)) -- sets position (x,y) and size (h,w) of the dialog window
	self:SetAutoDelete(true)
	
	self.xml = CScriptXmlInit()
	local xml = self.xml -- just so you don't have to write self.xml everytime
	xml:ParseFile("my_xml_gui_structure.xml")
	
	self.my_wnd = xml:InitStatic("background", self)
	
	self.my_text = xml:InitTextWnd("background:text", self.my_wnd)
	self.my_text:SetText("My text here")
end
```

Setting the interaction area of your GUI using `SetWndRect()` is the first step. Every UI element placed outside of this area cannot be
interacted with. Therefore it is common to set the area to cover the whole screen. Keep in mind that no matter what your screen resolution
is, the engine will always translate the resolution to a frame with size 1024x768 to handle any GUI related stuff.
`self.xml = CScriptXmlInit()`calls an instance of the engine class `CUIXmlInit`, responsible for creating any of the available UI elements.
`xml:ParseFile()` receives the name of your xml file that stores properties of the UI elements you create, such as position, size, textures,
text formatting, color etc. Without this xml file you're GUI won't work.

`InitStatic()` creates a simple static window that can contain any other UI element.
`InitTextWnd()` creates a window that can display text.
`InitCheck()` creates an ON/OFF button.

There are many more UI elements which can be found in *lua_help.script*. Additionally the file lists all methods available to these UI elements
such as `SetText()` or `Show()`. A detailed description of these elements and their methods can be found in chapter 'UI elements and their methods'.

A UI element creation method receives the following arguments:

- the path to the UI element info in your xml file, e.g. `"background"`
- the parent UI element or, if none exists, the class instance itself (`self`)

  
### Parents and Children

Setting the parent has a direct influence on how UI elements behave. If you change the visibility or position of the parent, this will also affect
all its children.

Consider the following example. We create a simple window that contains text and a trackbar. We want to control both position and visiblilty of these
UI element via the window that contains them:

```LUA
function MyGUI:CreateWindow()
	self.wnd = xml:InitStatic("parent_window", self)
	self.wnd:Show(false) -- sets the window invisible
	
	self.text = xml:InitTextWindow("parent_window:text_block", self.wnd)
	self.text:SetText("This is our text window.")
	
	self.track = xml:InitTrackBar("bar", self.text)
end
```

As you can see we pass `self.wnd` as the parent of text window and `self.text` as the parent of the trackbar. You can ignore the structure of the
xml info path. It has nothing to with how parent/child relations between UI elements a created. Now what happens here? As you can see `self.wnd`
has been set invisible. Since `self.text` is a child of `self.wnd` and `self.track` is a child of `self.text` (and therefore indrectly a child of
`self.wnd`), when the GUI opens not just `self.wnd` but all three elements will be invisible.
 
  
### Self???

"What is this 'self'?" you may ask. Basically it's a shorter, more convenient way to reference your GUI class instance WITHIN your class.
`self.my_wnd` is the same as writing `MyGUI.my_wnd`. Everything you declare with `self` can be accessed from anywhere within your GUI class. Don't
confuse `self.` with `self:` though. When calling a class method such as `self:InitControls()` you always use ':' instead of '.'. Keep in mind that
calling a class member from outside your GUI class requires class access via the variable `GUI`/`HUD`, e.g. `GUI.some_value` or `GUI:DoSomething()`.
`self.some_value` or `self:DoSomething()` won't work here.

  
## UI Callbacks

Like with anything in programming you need to tell the computer what to do when a UI element is interacted with. That's where UI callbacks come into play.
Consider the following example. We create a simple button and want to execute a function when pressing it:

```LUA
function MyGUI:CreateButton()
	self.btn = xml:Init3tButton("wnd:btn", self.wnd) -- creates button
	self.btn:TextControl():SetText("button text") 	 -- let's us display text on the button

	self:Register(self.btn, "button_exec_func") 	 -- pass the UI element and assign a unique ID
	self:AddCallback("button_exec_func", ui_events.BUTTON_CLICKED, self.OnButton, self)
end

function MyGUI:OnButton()
	-- your code
end
```

The methods `Register()` and `AddCallback()` are provided by the engine and always available to your GUI. `Register()` assigns the ID we've passed
to the button. `AddCallback()` then receives the following arguments:

- the unique ID defined in `Register()`, this way the callback knows which button has to be pressed in order for it to fire
- the callback event ID that determines what interaction event has to happen in order for the callback to fire
- the function that will be executed when the callback fires. Note that here we pass the function as a member of your GUI class
and don't execute it, hence using `self.`, not `self:`.
- a reference to your GUI class instance

Next, we consider a more advanced example. Let's say we have three buttons and want to create Callbacks for them. But instead of having a separate
function per button, we want use the same function but execute different code depending on the button we have pressed. By default `AddCallback()`
does not allow us to pass arguments to a function but we can use a simple trick, a wrapper function:

```LUA
function MyGUI:CreateCheck()
	self.btn = {}
	
	for i = 1,3 do
		self.btn[i] = xml:InitCheck("wnd:check_"..i, self.wnd)
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

Usually when tracking key inputs you use the callback "on_key_press". When a GUI is active this callback does not work (not true for HUDs). For this
reason the engine provides a GUI specific callback function. It doesn't have to be registered unlike regular callbacks and works out of the box.
It looks like this:

```LUA
function MyGUI:OnKeyboard(key, keyboard_action)
	--your code
end
```

`key` is the index of the key press that's received, `keyboard_action` is a UI callback event ID whose value depends on what key event happened.
For example pressing and releasing a key, `OnKeyboard()` is called twice and receives a `WINDOW_KEY_PRESSED` and `WINDOW_KEY_RELEASED` event ID
value respectively.

  
# UI Elements and their Methods

## Creating a UI Element

This following lists contain all UI elements available in the game. Please forgive me for not being able to provide complete info about
what each UI element does.

All methods in the next two lists are called as methods of `CScriptXmlInit()`.

- `InitSpinText(string, CUIWindow*)`		- 
- `InitTab(string, CUIWindow*)`				- used for creating compley menus with multiple tabs, see Stalker CoP options menu for reference
- `InitStatic(string, CUIWindow*)`			- creates basic window that can contains any other UI element
- `InitSleepStatic(string, CUIWindow*)`		- unused
- `InitTextWnd(string, CUIWindow*)`			- creates a text window that allows for various formatting options
- `InitSpinFlt(string, CUIWindow*)`			- unused
- `InitProgressBar(string, CUIWindow*)`		- creates progress bar as used for health, stamina, Psy health etc.
- `InitSpinNum(string, CUIWindow*)`			- unused
- `InitMapList(string, CUIWindow*)`			- unsued
- `InitCDkey(string, CUIWindow*)`			- unused
- `InitListBox(string, CUIWindow*)`			- creates a list with strings, see properties menu in inventory for reference
- `InitKeyBinding(string, CUIWindow*)`		- creates a prompt window for setting a keybind
- `InitMMShniaga(string, CUIWindow*)`		- creates a vertical button list with the magnifying stip UI element that exists in main and pause menu
- `InitWindow(string, number, CUIWindow*)`	- creates a separate window (for temporary use) that can be interacted with, see properties menu in inventory for reference
- `InitEditBox(string, CUIWindow*)`			- creates a prompt window that allows to change a value, see Hud Editor for reference
- `InitCheck(string, CUIWindow*)`			- creates an ON/OFF button
- `InitScrollView(string, CUIWindow*)`		- creates a window with a scrollbar and up/down arrows for navigation
- `InitMPPlayerName(string, CUIWindow*)`	- unused
- `InitTrackBar(string, CUIWindow*)`		- creates a slider that can be used to change a value
- `InitMapInfo(string, CUIWindow*)`			- unused
- `InitServerList(string, CUIWindow*)`		- unused
- `InitComboBox(string, CUIWindow*)`		- creates a dropdown menu
- `InitFrameLine(string, CUIWindow*)`		- creates a UI element similar to InitFrame() but without a center section, can be used to scale separating elements like lines/bars distortion-free
- `Init3tButton(string, CUIWindow*)`		- creates a simple button
- `InitAnimStatic(string, CUIWindow*)`		- 
- `InitFrame(string, CUIWindow*)`			- creates a UI element whose frame texture elements don't get distorted when scaling the element itself

  
These methods are for (manual) parsing of your UI element info xml file.

- `ParseFile(string)`						- reads UI element info from xml file from standard path `"gamedata\\configs\\ui"`, receives xml file name as string
- `ParseDirFile(string, string)`			- same as `ParseFile()` but allows to set a custom directory path e.g `"gamedata\\configs\\ui\\my_gui"`, receives custom path as 2. argument
- `NodeExist(string, number)`				- checks whether a node exists, receives node path and its index (in case there are several nodes with the same name, otherwise can be ignored), returns a boolean value
- `GetNodesNum(string, number, string)`		- counts how many nodes with the specified node name exist as children of the node specified with path and index, receives path, index and node name, if no path is passed the whole xml is parsed, if no tag name is parsed all child nodes are counted, returns node count as number
- `NavigateToNode(string, number)`			- navigates to node defined with path and index
- `NavigateToNode_ByAttribute(string, string, number)` - searches xml file for a node with tag name that contains an attribute with the attibute name and a value, receives node name, attribute name and attribute value
- `NavigateToNode_ByPath(string, index, string, string, string)` - searches xml file for a node with tag name that contains an attribute with the attibute name
- ``
- ``
- ``


These UI elements are called from different classes.

`CUIMessageBox()`
- `InitMessageBox(string)`	- creates a message box with buttons, similar to the 'Discard changes?' window in options menu

`CUITabControl()`	- This is used to create a menu that allows switching between multiple tabs.
- `AddItem(string, string, vector2, vector2)`	- adds a tab button, receives the button text, texture path, position vector and size vector 
- `AddItem(CUITabButton*)`	- adds a tab button, receives a tab button UI element
- `RemoveAll()`				- removes all tab buttons
- `GetActiveId()`			- returns ID of active tab as a string
- `GetTabsCount`			- returns tab count as number
- `SetActiveTab(string)`	- sets the tab with the passed ID as active tab 
- `GetButtonById(string)`	- returns the UI element with the passed tab button ID
- `GetEnabled()`			- returns tab (button) interaction state as a boolean value
- `SetEnabled(bool)`		- sets tab (button) interaction state, when set to false interaction with this tab is disabled
- `CUITabButton()`			- creates a tab button instance, not usable on its own!

These UI elements are created in Lua. They are prefabricated, always have a certain structure and are called from *utils_ui.script*, see *utils_ui.script* for reference.

- `UICellContainer()`					- creates a container with 'cells', similar to how items are displayed in inventory
- `UICellItem()`						- creates a single item cell
- `UIInfoItem()`						- creates a window with info about an item, similar to the info window that pops up when hovering above an item in inventory
- `UIInfoUpgr()`						- creates the upgrade interface for items like weapons
- `UICellProperties()`					- creates a dropdown menu, can be filled with options, similar to props window when right clicking on an item in inventory
- `UICellPropertiesItem()`				- creates an entry for a UICellProperties window
- `UIHint()`							- creates a hint simple window that can contains any text, similar to hint texts appearing when hovering options in options menu

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

**General / called on GUI class**
- `ShowDialog(bool)`			- shows GUI, shows cursor by default, bool controls whether HUD indicators will be hidden
- `HideDialog()`				- closes GUI
- `AllowMovement(bool)`			- if set to true, moving around is possible while the GUI is active, similar to inventory
- `AllowCursor(bool)`			- if set to false, no cursor will be available for the GUI
- `AllowCenterCursor(bool)`		- if set to true, the cursor will always show up in the center of the screen, otherwise it starts at the last position when the GUI was closed
- `AllowWorkInPause(bool)`		- if set to true, the GUI stays active when pausing the game
- `Update()`					- general update function to put all kinds of code to control time dependent UI element behavior, called about 4 times per second, use with care!
- `OnKeyboard()`				- tracks key presses, returns key ID and UI element callback event ID as numbers, see chapter 'UI Callback Event IDs'
- `Dispatch()`					- unused, event based Callback function that opened multiplayer menu in main menu
- `GetHolder()`					- returns the object that manages the GUI dialog (showing your GUI, showing cursor, hiding indicator etc.), has to be called AFTER the GUI dialog has started, has no real use cases

**Commonly used**
- `IsShown()`					- returns current visibility state of the UI element as boolean value
- `Show(bool)`					- sets visibility of the UI element
- `IsAutoDelete()`				- checks AutoDelete state of the UI element, returns boolean value
- `SetAutoDelete(bool)`			- if set to true, the UI element will automatically be hidden when opening the GUI
- `Enable(bool)`				- if set to false, any interaction with the UI element is disabled
- `IsEnabled()`					- checks interaction state of the UI element, returns boolean value
- `GetWndPos()` 				- returns a 2D vector of the top left corner position of the UI element
- `SetWndPos(vector2)`			- sets position of the top left corner of the UI element
- `SetWndRect(Frect)`			- sets position and size of the area where mouse event are registered
- `GetWidth()`					- returns a the width of the UI element as number
- `GetHeight()`					- returns a the height of the UI element as number
- `SetWndSize(vector2)`			- sets width and height of the UI element
- `AttachChild(CUIWindow*)`		- sets a UI element as the child of some other UI element
- `DetachChild(CUIWindow*)`		- removes child state of UI element with respect to its parent. If the element has no parent and there is reference to that element it will be destroyed
- `WindowName()`				- returns the string assigned as a name to a UI element
- `SetWindowName(string)`		- assigns a string as a name to a UI element
- `SetPPMode(bool)`				- PostProcessing mode, used for the magnifier element in main/pause menu
- `ResetPPMode()`				- resets PP mode

**Textures**
- `InitTexture(string)`			- sets texture of the UI element, receives a texture path e.g. `"ui\\my_gui\\background.dds"`
- `InitTextureEx(string, string)` - sets texture of the UI element placed on a 3D model e.g. display of dosimeter, receives a texture path and a shader path e.g. `"hud\\p3d"`
- `GetTextureRect()`			- returns Frect containg position and size info about the area containing the texture CHECK!!!
- `SetTextureRect(Frect)` 		- sets position and size of the area containing the texture
- `SetStretchTexture(bool)`		- controls whether or not a button texture will be stretched when button size is not equal to texture size
- `GetTextureColor()`			- returns color of a texture as a number
- `SetTextureColor(number)`		- sets color of a texture, receives a number. Changing color works best for bright textures, changing Alpha works for all textures.
- `EnableHeading(bool)`			- enabled a static to be rotated
- `GetHeading()`				- returns rotation of the UI element in radians
- `SetHeading(number)`			- sets rotation of the UI element in radians
- `GetConstHeading()`			- returns const heading state of the UI element WHAT IS CONSTHEADING???
- `SetConstHeading(bool)`		- if set to false, UI elements rotates when its parent UI element rotates, otherwise it's not affected
- `SetColorAnimation(string)`	- creates animated color change for a texture CHECK!!!
- `ResetColorAnimation(string)`	- resets color animation
- `RemoveColorAnimation(string)` - removes color animation

**Text**
- `GetText()`					- returns string that a text element is currently displaying
- `SetText(string)`				- sets text of a UI element
- `SetTextST(string)`			- sets text of a UI element using a string ID, for text stored in xml file
- `TextControl()`				- access text formating methods for certain UI elements, use like this: `self.btn:TextControl():SetText("text")`
- `SetTextOffset(x, y)`			- sets position of the text relative to its text UI element, even allows to set position outside its text UI element
- `GetTextColor()`				- return the text color as a number
- `SetTextColor(number)`		- sets text color, use like this: `self.text:SetTextColor(GetARGB(255, 110, 110, 50))`
- `GetFont()`					- returns the current font used by the text
- `SetFont(CGameFont*)`			- sets text font, see chapter 'Useful stuff, tipps and tricks' for reference
- `SetTextAlignment(number)` 	- sets horizontal text alignment, see chapter 'Useful stuff, tipps and tricks' for reference
- `SetVTextAlignment(number)`	- sets vertical text alignment, see chapter 'Useful stuff, tipps and tricks' for reference
- `SetTextComplexMode(bool)`	- if set to true, text continues on new line when reaching the border of a text UI element, also any formatting in the text will be considered
- `SetEllipsis(bool)`			- if set to true, text that doesn't fit inside its text UI element will be cut off and replaced with "..". Only works if text complex mode is set to false!
- `AdjustWidthToText(bool)`		- if set to true, the text UI element's width will be set to fit the height of a text block
- `AdjustHeightToText(bool)`	- if set to true, the text UI element's height will be set to fit the height of a text block

**Buttons**
- `GetCheck()`					- returns current state of a (check) button
- `SetCheck(bool)`				- sets current state of a (check) button
- `SetDependControl(CUIWindow*)` - synchronizes the interaction state of another UI element to the button state. When the button state is OFF the assigned UI element is disabled i.e. cannot be interacted with


TEST
**Buttons**
---
function:
	- GetCheck()
	- SetCheck(bool)
	- SetDependControl(CUIWindow*)
purpose:
	- returns current state of a (check) button
	- sets current state of a (check) button
	- synchronizes the interaction state of another UI element to the button state. When the button state is OFF the assigned UI element is disabled i.e. cannot be interacted with
---



**Scrollviews**
- `AddWindow(CUIWindow*, bool)`	- adds a UI element to the scrollview, the boolean flag controls the auto delete state of that UI element. UI elements are added vertically if not set otherwise in xml file.
- `RemoveWindow(CUIWIndow*)`	- removes a UI element from the scrollview
- `Clear()`						- removes all UI elements from the scrollview
- `ScrollToBegin()`				- scrolls to the top of the scrollview
- `ScrollToEnd()`				- scrolls to the bottom of the scrollview
- `GetMinScrollPos()`			- returns the lowest scroll position as a number
- `GetMaxScrollPos()`			- returns the highest scroll position as a number
- `GetCurrentScrollPos()`		- returns current scroll position as a number
- `SetScrollPos(number)`		- sets current scroll position
- `SetFixedScrollBar(bool)`		- controls whether the scrollbar is always visible CHECK!!!

**Trackbars**
- `GetCheck()`					- apparently unused
- `SetCheck(bool)`				- apparently unused
- `GetIValue()`					- returns the current trackbar value as a number, use if trackbar mode `is_integer="1"` in xml files
- `SetIValue(number)`			- sets the current trackbar value as a number, use if trackbar mode `is_integer="1"` in xml files, a passed float will be rounded to the next lowest integer
- `GetFValue()`					- returns the current trackbar value as a number, if trackbar mode `is_integer="1"` this returns an integer
- `SetFValue(number)`			- sets the current trackbar value as a number, if trackbar mode `is_integer="1"` the passed value will be rounded to the next lowest integer
- `SetStep(number)`				- sets the step size when moving the slider on the trackbar, if trackbar mode `is_integer="1"` the passed value will be rounded to the next lowest integer
- `GetInvert()`					- returns invert state of the trackbar as a boolean value
- `SetInvert()`					- sets invert state of the trackbar, if set to true moving the slider to the left increases the value instead of decreasing it and vice versa
- `SetOptIBounds(min, max)`		- sets min/max value of the trackbar, use if trackbar mode `is_integer="1"` in xml files, passed floats will be rounded to the next lowest integers
- `SetOptFBounds(min, max)`		- sets min/max value of the trackbar
- `SetCurrentValue(number)`		- sets the current trackbar value


###UI Callback Event IDs

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

  
# Useful stuff, tipps and tricks

Finally I'd like to share some info about a bunch of small QoL features, useful functions and nice-to-know's that make life a little easier.

**IsCursorOverWindow()**

This is called as a method of a UI element and returns a bool:

```LUA
local over_wnd = self.wnd:IsCursorOverWindow()
```

**GetCursorPosition() / SetCursorPosition(vector2)**

Global functions not tied to GUI classes, can be called as is. This is an example form *utils_ui.script*:

```LUA
local pos = GetCursorPosition() -- because ShowDialog moves mouse cursor to center
self:ShowDialog()
SetCursorPosition(pos)
```

**SetTextST()**

Let's say we have stored our text in an xml file and want to set the text in GUI by using its string ID. Usually to convert a string ID to text we use:

```LUA
local str = game.translate_string("some_string_id")
self.text_wnd:SetText(str)
```

With `SetTextST()` you can skip the string ID to string conversion and instead pass the string ID directly:

```LUA
self.text_wnd:SetTextST("some_string_id")
```

**Fonts**

We can access various fonts from scripts using these global functions:

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

**Text alignment**

We can set horizontal and vertical text alignment. This is often more convenient then having to set the text UI element position manually
to get the desired result. There are three different modes each to choose from:

horizontal:
- `const alLeft = 0`
- `const alRight = 1`
- `const alCenter = 2`

vertical:
- `const valTop = 0`
- `const valCenter = 1`
- `const valBottom = 2`

We can use them like this, here the text will be aligned left and at the bottom of our UI element:

```LUA
self.text_wnd:SetTextAlignment(0) -- expects integer value 0, 1 or 2
self.text_wnd:SetVTextAlignment(2) -- expects integer value 0, 1 or 2
```

**Changing UI element properties or text in an xml file**

Let's say we store UI element property info or text in an xml file and want to change something. When changing UI info we simply save the file,
reload the save and open our GUI. The changes will be visible. Unfortunately this is not possible when changing text. In this case we have to
restart the game.