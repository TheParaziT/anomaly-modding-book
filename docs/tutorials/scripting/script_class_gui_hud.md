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
are very similar. This tutorial provides a quick overview of how to create a basic GUI or HUD.


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

1. creates class with the name "MyGUI" but class can have any name. It is common style to start each word of the class name with a capital
letter but that's up to you.

2. This function is called once when your GUI class instance is created. In this function you can execute any code that only needs to be
executed once like e.g. creating static UI elements.

3. This function is called when your GUI is destroyed and necessary in order to prevent Lua from potentially interacting with a GUI that
doesn't exist anymore on the engine side. This happens when the game is interrupted by a level transition or when loading a save.

4. This function is called about 4 times per frame (I don't know why). If you have any dynamic UI elements that need to update time based
(as opposed to event based) e.g. progress bars you're probably gonna put the respective code here. Never forget to add `CUIScriptWnd.Update(self)`,
otherwise none of your UI elements will work properly! Also better avoid putting performance heavy code here if possible. ;)


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
entry in a global table in _g.script.

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

Unlike with GUIs you retain full control over the actor when having an active HUD instance.


### How do I close my GUI?

Closing a GUI dialog works like this:

```LUA
function close_ui()
	if GUI and GUI:IsShown() then
		GUI:HideDialog() -- closes GUI dialog, mouse cursor disappears
		GUI:Show(false)  -- hides any UI elements
		Unregister_UI("UI_Attachments")
		GUI = nil -- optional, destroys GUI instance
	end
end
```

For HUDs the code looks like this:

```LUA
function hide_hud()
	if HUD and HUD:IsShown() then
		get_hud():RemoveDialogToRender(HUD)
		HUD = nil -- optional, destroys HUD instance
	end
end
```

Whether or not you set GUI/HUD to nil depends on the use case of your GUI. If you set it to nil your class instance will be destroyed.
Calling a new instance will create a completely new GUI, `__init()` is called again, your GUI structure is rebuild from scratch. Otherwise
your GUI instance persists and when calling it you skip rebuilding its structure from scratch. Keep in mind that when transitioning to
another level or loading a save all GUIs and their references will be destroyed.


## Building the GUI structure

In order to interact with a GUI there are a bunch of UI elements such as buttons and sliders or the window that contains these elements.
But of course these elements have to be created manually. To build your GUI call a function when `__init()` is executed:

```LUA
function MyGUI:__init() super()
	self:InitControls()
end

function MyGUI:InitControls()
	self:SetWndRect(Frect():set(0,0, 1024, 768)) -- sets position (x,y) and size (h,w) of the dialog window
	self:SetAutoDelete(true)
	
	self.xml = ScriptXmlInit()
	local xml = self.xml -- just so you don't have to write self.xml everytime
	xml:ParseFile("my_xml_gui_structure.xml")
	
	self.my_wnd = xml:InitStatic("background", self)
	
	self.my_text = xml:InitTextWnd("background:text", self.my_wnd)
	self.my_text:SetText("My text here")
	
	self.some_butten = xml:InitCheck("btn", self)
	self.some_button:Show(true)
end
```

Setting the interaction area of your GUI is the first step. Every UI element placed outise of this area cannot be interacted with. Therefore
it is common to set the area to cover the whole screen. Keep in mind that no matter what your screen resolution is, the engine will always
handle any GUI related stuff within a frame with size 1024x768. `self.xml = ScriptXmlInit()`calls an instance of the engine class responsible
for creating any of the available UI elements. `xml:ParseFile()` receives the name of your xml file that describes properties of the UI elements
you create, such as position, size, textures, text formatting, color etc. ScriptXmlInit created UI elements based on the provided info in your
xml file. Without this xml file you're GUI won't work.

`InitStatic()` creates a simple static window that can contain any other UI element.
`InitTextWnd()` creates a window that can display text.
`InitCheck()` creates an ON/OFF button.

There are many more UI elements which can be found in lua_help.script. Additionally the file lists all methods available to these UI elements
such as `SetText()` or `Show()`.

A UI element creation method receives the following arguments:

- the path to the UI element info in your xml file, e.g. "background"
- the parent UI element

Setting the parent has a direct influence on how UI element behave. If you change the visibility or position of the parent, it will also affect
all its children.

"What is this 'self'?" you may ask. Basically it's a shorter and hence more convenient way to reference your GUI class instance WITHIN your class.
`self.my_wnd` is the same as writing `MyGUI.my_wnd`. Everything you declare with `self` can be accessed from anywhere within your GUI class. Don't
confuse `self.` with `self:` though. When calling a class method such as `self:InitCntrols()` you always use ':' instead of '.'. Keep in mind that
calling a class method from outside yout GUI class requires class access via the variable "GUI" or "HUD", e.g. `GUI:DoSomething()`, `self` won't
work here.


## Key inputs

Usually when tracking key inputs you use the callback "on_key_press". When a GUI is active this callback does not work (not true for HUDs). For this
reason the engine provides a GUI specific callback function. It doesn't have to be registered unlike regular callbacks and workes out of the box.
It looks like this:

```LUA
function MyGUI:OnKeyboard(key, keyboard_action)
	--your code
end
```

`key` is the index of the key press that's received, `keyboard_action` is a flag with different values depending on what key event happened. Some
examples:

- `WINDOW_KEY_PRESSED`
- `WINDOW_KEY_RELEASED`
- `WINDOW_KEY_HOLD`
- `WINDOW_MOUSE_WHEEL_UP`
- `WINDOW_MOUSE_WHEEL_DOWN`

So pressing and releasing a key, `OnKeyboard()` is called twice and receives a `WINDOW_KEY_PRESSED` and `WINDOW_KEY_RELEASED` flag value respectively.


## UI Callbacks

Buttons are essential parts of a GUI. But like anything in programming you need to tell the comupter what to do when a button is pressed. That's where
button callbacks come into play. Consider this example. We create a simple button and want to execute some function when pressing it:

```LUA
function MyGUI:CreateButton()
	self.btn = xml:Init3tButton("wnd:btn", self.wnd)
	self.btn:TextControl:SetText("button text") -- let's us display text on the button

	self:Register(self.btn, "button_exec_func") -- pass the UI element and assign a unique ID
	self:AddCallback("button_exec_func", ui_events.BUTTON_CLICKED, self.OnButton, self)
end

function MyGUI:OnButton()
	-- your code
end
```

`AddCallback()` receives the following arguments:

- the unique ID defined in `Register()`, this way the callback knows which button has to be pressed in order for it to fire
- the callback flag that determines what interaction event has to happen in order to fire the callback
- the function that will be executed when the callback fires. Note that here was pass the function as a member of the class and don't
execute it, hence using `self.`, not `self:`.
- a reference to the GUI class instance

Next, we consider a more advanced example. Let's say we have three buttons and want to create Callbacks for them. But instead of having a separate
function per button we want use the same function but execute different code depening on the button we have pressed. By default `AddCallback()`
does not allow us to pass arguments to a function but we can use a simple trick, a wrapper function:

```LUA
function MyGUI:CreateCheck()
	self.btn = {}
	
	for i = 1,3 do
		self.btn[i] = xml:InitCheck("wnd:check", self.wnd)
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


# Useful stuff, tipps and tricks (Put this at the end of the tutorial!)

Finally I'd like to share some info about a bunch of small QoL features, useful functions and nice-to-know's that make life a little easier.

**IsCursorOverWindow()**
This is called as a method of a UI element and returns a bool:

```LUA
local over_wnd = self.wnd:IsCursorOverWindow()
```

**GetCursorPosition()**
Global function not tied to GUI classes, can be called as is:

```LUA
local pos = GetCursorPosition()
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
We can access various fonts via script using these global functions:

- `GetFontSmall()`
- `GetFontMedium()`
- `GetFontDI()´
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

- `const alLeft = 0`
- `const alRight = 1`
- `const alCenter = 2`

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


# List of UI elements and their methods

This list caontains all UI elements available in the game. Please forgive me for not being able to provide complete info about what each UI element
does.

- `InitSpinText(string, CUIWindow*)`		- 
- `InitTab(string, CUIWindow*)`				- used for creating compley menus with multiple tabs, see Stalker CoP options menu for reference
- `InitStatic(string, CUIWindow*)`			- creates basic window that can contains any other UI element
- `InitSleepStatic(string, CUIWindow*)`		- 
- `InitTextWnd(string, CUIWindow*)`			- creates a text window that allows for various formatting options
- `InitSpinFlt(string, CUIWindow*)`			- 
- `InitProgressBar(string, CUIWindow*)`		- creates progress bar as used for health, stamina, Psy health etc.
- `InitSpinNum(string, CUIWindow*)`			- 
- `InitMapList(string, CUIWindow*)`			- Multiplayer, unsued
- `ParseFile(string)`						- reads Ui element info from xml file
- `InitCDkey(string, CUIWindow*)`			- unused
- `InitListBox(string, CUIWindow*)`			- creates a list with strings, see properties menu in inventory for reference
- `InitKeyBinding(string, CUIWindow*)`		- creates a prompt window for setting a keybind
- `InitMMShniaga(string, CUIWindow*)`		- 
- `InitWindow(string, number, CUIWindow*)`	- creates a separate window (for temporary use) that can be interacted with, see properties menu in inventory for reference
- `InitEditBox(string, CUIWindow*)`			- creates a prompt window that allows to change a value, see Hud Editor for reference
- `InitCheck(string, CUIWindow*)`			- creates an ON/OFF button
- `InitScrollView(string, CUIWindow*)`		- creates a window with scrollbar and up/down arrows for navigation
- `InitMPPlayerName(string, CUIWindow*)`	- unused
- `InitTrackBar(string, CUIWindow*)`		- creates a slider that can be used to change a value
- `InitMapInfo(string, CUIWindow*)`			- 
- `InitServerList(string, CUIWindow*)`		- unused
- `InitComboBox(string, CUIWindow*)`		- 
- `InitFrameLine(string, CUIWindow*)`		- 
- `Init3tButton(string, CUIWindow*)`		- creates a simple button
- `InitAnimStatic(string, CUIWindow*)`		- 
- `InitFrame(string, CUIWindow*)`			- 

The following list provides info about the most important and most frequently used methods for UI elements.

**Commonly used**
- `IsShown()`					- returns current visibility state of the UI element as boolean value
- `Show(bool)`					- sets visibility of the UI element
- `IsAutoDelete()`				- checks AutoDelete state of the Ui element, returns boolean value
- `SetAutoDelete(bool)`			- if set to true, the UI element will automatically be hidden when opening the GUI
- `Enable(bool)`				- if set to false, any interaction with the UI element is disabled
- `GetWndPos()` 				- returns a 2D vector of the top left corner position of the UI element
- `SetWndPos(vector2)`			- sets position of the top left corner of the UI element
- `SetWndRect(Frect)`			- sets position and size of the area where mouse event are registered
- `GetWidth()`					- returns a the width of the UI element as number
- `GetHeight()`					- returns a the height of the UI element as number
- `SetWndSize(vector2)`			- sets width and height of the UI element
- `AttachChild(CUIWindow*)`		- sets a UI element as the child of some other UI element
- `DetachChild(CUIWindow*)`		- removes child state of UI element with respect to its parent. If the element has no parent and there is reference to that element it will be destroyed

**Text**
- `GetText()`					- returns string that a text element is currently displaying
- `SetText(string)`				- sets text of a UI element
- `SetTextST(string)`			- sets text of a UI element using a string ID, for text stored in xml file
- `SetTextOffset(x, y)`			- sets position of the text relative to its text UI element, even allows to set position outside its text UI element
- `GetTextColor()`				- return the text color as a number
- `SetTextColor(number)`		- sets text color, use like this: `self.text:SetTextColor(GetARGB(255, 110, 110, 50))`
- `GetFont()`					- returns the current font used by the text
- `SetFont(CGameFOnt*)`			- set text font, see chapter 'Useful stuff, tipps and tricks' for reference
- `SetTextAlignment(number)` 	- sets horizontal text alignment, see chapter 'Useful stuff, tipps and tricks' for reference
- `SetVTextAlignment(number)`	- sets vertical text alignment, see chapter 'Useful stuff, tipps and tricks' for reference
- `SetTextComplexMode(bool)`	- if set to true, text continues on new line when reaching the border of a text UI element, also any formatting in the text will be considered
- `SetEllipsis(bool)`			- if set to true, text that doesn't fit inside its text UI element will be cut off and replaced with "..". Only works if text complex mode is set to false!
- `AdjustWidthToText(bool)`		- if set to true, the text UI element's width will be set to fit the height of a text block
- `AdjustHeightToText(bool)`	- if set to true, the text UI element's height will be set to fit the height of a text block



**Buttons**
- `TextControl()`				- access text formating methods e.g. `TextControl():setText("text")`
- `InitTexture(string)`			- dynamically sets button texture via script of via xml file
- `GetTextureRect()`			- returns Frect containg position and size info about the area containing the button texture??? CHECK!!!
- `SetTextureRect(Frect)` 		- sets position and size of the area containing the button texture
- `SetStretchTexture(bool)`		- controls whether or not a button texture will be stretched when button size is not equal to texture size
- `GetCheck()`					- returns current state of a (check) button
- `SetCheck(bool)`				- sets current state of a (check) button

