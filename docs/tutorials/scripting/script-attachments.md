---
tags: [LUA]
---

# Script Attachments

___

<Authors
  authors={["lucy"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## Basics

Script attachments are used to attach any model to any game object or even other script attachments.  
This opens up a lot of possibilities like weapon attachments no longer having to be part of the weapon model and much more.

Script attachments are managed entirely by scripts, the engine does not store any attachment data in save files.  
This means you'll have to keep track of your attachments and store serialized data of them in mdata if you want them to persist throughout saves.  
Or find other means to reliably attach/remove them, like `actor_item_to_slot` and `actor_item_to_ruck` callbacks.

### Creating a script attachment

All you need to create a script attachment is a parent game_object/attachment and the model you want to use.  
One simple line will create the script attachment and attach it to its parent:

```lua
local test_att = db.actor:add_attachment("name", "path\\to\\model")
```

This adds a new script attachment with the name `name` the actor game_object using the model we specified.  
Attachments can have any name and creating an attachment with a name that is already used by an attachment will delete the previous attachment.  

You can also attach attachments to other attachments:

```lua
local child_att = test_att:add_attachment("child", "path\\to\\other_model")
local child_child_att = child_attachment:add_attachment("child_child", "path\\to\\another_model")
```

### How do I remove them?

If you want to remove an attachment, just remove it from its parent:

```lua
test_att:remove_attachment("child")
child_att = nil
child_child_att = nil
```

This will remove the `child_att` with the name `child` we previously added to `test_att`.  
Any child attachments of `child_att` will be removed as well.  
Make sure you don't keep references to deleted attachments in your scripts or you might get pure virtual function errors, similar to storing a reference to a destroyed game_object.

`remove_attachment` also accepts script_attachment objects, so it's possible to do this:

```lua
test_att:remove_attachment(child_att)
child_att = nil
child_child_att = nil
```

### Accessing script attachments without a reference

It's possible to access a script attachment without it being stored in a variable.
You can access it using its name:

```lua
db.actor:get_attachment("name")
```

Another way to get all of the attachments of an object or script attachment is by <a href="script-attachments.html#iterating-attachments">iterating them</a>.

### Types

Methods like `set_parent_bone` rely on the type (to choose the correct parent hud or world model).  
This means that the type should be the first thing to set after adding an attachment.  
By default the type is set to `World`, which means a new attachment will render on the world model of its parent object.  

At the moment there are three types (or rendering modes) of script attachments.

```lua
script_attachment_type = {
	["Hud"]         = 0,
	["World"]       = 1,
	["CamAttached"] = 2,
}
```

Using getter/setter we can read and change the attachment type:

```lua
get_type()
set_type(number)
```

If we want the attachment to render in hud mode, we can do it as follows:

```lua
test_att:set_type(0)
-- or
test_att:set_type(script_attachment_type.Hud)
```

### Cam attached?

Another very cool aspect of script attachments is the ability to have them attach to the player camera.
Setting the flags value to `2` (`script_attachment_type.CamAttached`) will enable this behavior.

When attached to the camera, the attachment will follow the position and direction of the first person camera and render at a fixed fov, so it should look similar on all resolutions and fov values.  
This is especially useful for things like 3D UIs or visible 3D helmets and gasmasks.

### Attachment names

The name of an attachment can be read or set at any time:

```lua
test_att:get_name()
test_att:set_name("new_name")
```

### Getting and setting parent

If you need the parent object or parent attachment of an attachment for whatever reason, it's possible to access it like this:

```lua
local parent_tbl = test_att:get_parent()
```

We’ll receive a table, that looks like this:

```lua
parent_tbl = {
	["object"] = userdata, -- (reference to db.actor)
	["attachment"] = nil
}
```

Now we know that the attachment is attached to a game_object and we have a reference to said game_object.

```lua
local parent_tbl = test_att:get_parent()
if parent_tbl.object then
	-- will print "parent is actor"
	printf("parent is %s", parent_tbl.object:section())
elseif parent_tbl.attachment then
	printf("parent is %s", parent_tbl.attachment:get_name())
end
```

Maybe you want to transfer your script attachment to another parent game_object or attachment?
Just use `set_parent`, it will transfer the attachment, as well as any child attachments to the new parent:

```lua
test_att:set_parent(npc)
```

:::warning
**The attachment will overwrite an existing attachment of the new parent object, if it uses the same name!**
*(Might get changed in the future)*
:::

### Parent Bone

**Make sure you have set the correct attachment type first or you might get wrong results because the engine tries to find the bone in the parent world model instead of its hud model.**

By default the script attachment will attach to the root bone (bone 0) of the parent game_object or attachment.
You can change the parent bone at any time using

```lua
test_att:set_parent_bone(15)
-- or
test_att:set_parent_bone("bip01_head")
```

In this case it will set the parent bone to `bip01_head` of the parent npc object.
Changing to a bone that doesn't exist will default to the root bone.

To get the current parent bone id you can use

```lua
local bone_id = test_att:get_parent_bone()
```

___

## Attachment position, rotation and scale

Position and rotation work as an offset to the parent bone's position and rotation.
Functions support both vectors and three numbers.  
Scale can even be set with a single number, if the scale should be the same in all directions.

### Position

```lua
get_position() -- returns vector
set_position(vector)
set_position(number, number, number)
```

### Rotation

```lua
get_rotation() -- returns vector
set_rotation(vector)
set_rotation(number, number, number)
```

### Scale

```lua
get_scale() -- returns vector
set_scale(vector)
set_scale(number, number, number)
set_scale(number)
```

### Attachment origin

```lua
get_origin() -- returns vector
set_origin(vector)
set_origin(number, number, number)
```

You can change the origin point of an attachment.  
By default the root bone of the attachment will be used as its origin point.

Say, you want to rotate the attachment around its center, instead of its root bone:

```lua
local center = test_att:get_center()
test_att:set_origin(center)
```

`get_center()` can be used to get the center position of an attachment model (also works on game objects).  

___

## Attachment model

To get the path of the model that is currently used for a script attachment use

```lua
local path = test_att:get_model()
```

The model can be changed at any time

```lua
test_att:set_model("path\\to\\new_model", false)
```

The boolean tells the engine if existing bone callbacks should be kept in place.  
You can find out more about bone callbacks <a href="script-attachments.html#bone-callbacks">down below</a>.

### Model bones

The bone methods are similar to the ones we have for game_objects, accepting both IDs and bone names:

```lua
bone_id(string)
bone_name(number)
bone_visible(number)
bone_visible(string)
bone_visible(number, boolean, boolean)
bone_visible(string, boolean, boolean)
bone_transform(number)
bone_transform(string)
bone_position(number)
bone_position(string)
bone_direction(number)
bone_direction(string)
bone_parent(number)
bone_parent(string)
set_parent_bone(number);
set_parent_bone(string);
get_parent_bone();
list_bones()
```

### Animations

If the model contains any motions or motion references, you can play them on the attachment model.  
**By default the engine will try to play the `idle` motion, so it's advised to always add one to your model if you're exporting it as a dynamic model.**

```lua
         -- Name    MixIn    Speed
play_motion(string, boolean, number)
```

\
Example

```lua
-- returns animation length in milliseconds
local anm_length = test_att:play_motion("reload", false, 1)

-- if you want to stop the motion, just play "idle"
-- if the animation is not looped, it will automatically play "idle" at the end
test_att:play_motion("idle", true, 1)
```

___

## Bone Callbacks

Bone callbacks are a powerful feature, they allow you to change the position of any bone of the attachment model in real time.  
There are two types of bone callbacks.

### Copy Bone Callback

The first type of bone callbacks simply copies the position of a bone of the parent game_object/attachment and moves the selected attachment bone to that position.
It's mainly useful if you want to attach something with multiple bones to a parent object and have it follow its animations.

Usage

```lua
test_att:bone_callback(attachment_bone, parent_bone, true)
-- attachment_bone is the name or ID of the bone of the attachment model we want to modify
-- parent_bone is the name or ID of the bone of the parent model we want to copy
-- setting the boolean to true tells the engine that we don't need to calculate
-- animations for this bone (on the attachment model) - mainly for performance reasons
```

\
For example we can add an exoskeleton to the player model like this

```lua
-- attach exo model
local exo_n = db.actor:add_attachment("exoskeleton_body", ogf_file_npc)

-- set bone callbacks
-- you can do for i=0,46
-- i'm just copying the bones that are actually used by the exo model
for i=0,14 do
	exo_n:bone_callback(i,i,true)
end

for i=20,22 do
	exo_n:bone_callback(i,i,true)
end

for i=33,35 do
	exo_n:bone_callback(i,i,true)
end
```

**You have to set the callback for bone 0 on actor, stalker and mutant models, otherwise the attachment will awkwardly shift around sometimes due to foot IK.**  
\
\
Attaching something to the first person hands is a little more involved.  
Since left and right arms use seperate models, we have to attach two script attachments:

```lua
local exo_r = db.actor:add_attachment("exoskeleton_right_arm", ogf_file)

-- set hud mode first
exo_r:set_type(script_attachment_type.Hud)

-- an attachment for the right arm has to use a bone of the right arm as its parent bone
exo_r:set_parent_bone("r_clavicle")

-- the model I'm using is for both arms so we have to hide the left part
exo_r:set_bone_visible("l_clavicle", false, true)

-- we also need a bone callback to copy the root bone
exo_r:bone_callback(0,0,true)

-- copy the rest of the right arm bones
for i=21,41 do
	exo_r:bone_callback(i,i,true)
end


-- attaching to the left arm is simpler
local exo_l = db.actor:add_attachment("exoskeleton_left_arm", ogf_file)

-- set hud mode
exo_l:set_type(script_attachment_type.Hud)

-- hide right part
exo_l:set_bone_visible("r_clavicle", false, true)

-- copy left arm bones
for i=0,20 do
	exo_l:bone_callback(i,i,true)
end
```

### Script Bone Callback

The second type of bone callbacks uses a lua function to modify the final position of a bone.  
It is called each frame so don't use too many of them if you can avoid it :)

We need a function for our callback.  
It takes the matrix of the bone and does calculations on it to modify the final bone matrix.  
See the following example from the lockpick UI

```lua
function cylinder_callback(mat)
	-- temp copy of position since setHPB overwrites it
	local temp = mat.c
	local hpb = mat:getHPB()
	-- apply our rotation
	mat:setHPB(hpb.x, hpb.y + cylinder_rotation, hpb.z)
	-- revert to saved position
	mat.c = temp
	-- return modified matrix to the engine
	return mat
end
```

\
Since we want the cylinder_rotation to be applied on top of an animated lock, we don't disable animation calculation this time (third argument is `false`).

```lua
lockpicker:bone_callback(1, cylinder_callback, false)
```

### Removing Bone Callbacks

Bone callbacks can be removed like this

```lua
-- remove bone callback from bone with ID 1
lockpicker:remove_bone_callback(1)
```

### Persisting through model change

As mentioned before, you can tell the engine to keep existing bone callbacks in place when changing the attachment model by setting the second argument to true in `set_model`

```lua
lockpicker:set_model("path\\to\\other_lock", true)
```

___

## Miscellaneous

### Attaching Script UI

Another nice to have feature, you can attach script 3D UI to attachments (UI like on the dosimeter or rf receiver)  
Check `gamedata\scripts\ui_dosimeter.script` to see how script 3D UI works.

Available functions:

```lua
get_ui()
get_ui_bone()
get_ui_rotation()

set_ui(string)
set_ui_bone(number)
set_ui_bone(string)
set_ui_position(vector)
set_ui_position(number, number, number)
set_ui_position()
set_ui_rotation(vector)
set_ui_rotation(number, number, number)
```

\
Let's say, we want to display the dosimeter UI on the attachment model:

```lua
test_att:set_ui("ui_dosimeter.get_UI")
test_att:set_ui_bone(5)
test_att:set_ui_position(0,0.1,0)
test_att:set_ui_rotation(90,0,0)
```

\
You can even change the scale of the UI using bone callbacks!  
Just change the scale of the bone the UI is attached to.  
*(Better use a bone that is not actually used by the model, or you'll scale a part of it.)*

```lua
test_att:bone_callback(5, scale_func, false)

local scale_mat = matrix():scale(1.5, 1.5, 1.5)

function scale_func(mat)
	mat:mulA_43(scale_mat)
	return mat
end
```

### Attaching Script Lights

First create an attachment_script_light, it can use the same functions and properties as a regular script_light.  
*(Make sure to keep a reference to the script light or it will be garbage collected)*

```lua
att_light = attachment_script_light()
att_light.type = 2
att_light.hud_mode = true
att_light:set_cone(math.rad(0.5))
att_light.color = fcolor():set(1,0,0,1)
```

\
attachment_script_light position and direction work as an offset to the attachment position/direction

```lua
att_light:set_position(0,0,2)
att_light:set_direction(0,90,0)
```

\
Finally use `attach_light` to attach the light to your script attachment

```lua
att:attach_light(att_light)
```

\
Similar to script 3D UI you can get/set which bone the light is attached to

```lua
set_light_bone(number)
set_light_bone(string)
get_light_bone()
```

\
If you don't have a reference to the attached light you can get one using

```lua
att_light = att:get_light()
```

### Iterating attachments

Similar to inventories, it's possible to iterate all attachments of an object or attachment  
This example prints the name, followed by the model of every attachment attached to `obj`.

```lua
local function it_att(name, attachment)
	printf(name)
	printf(attachment:get_model())
	
	-- you can return true to exit the iteration early
	if (name == "my_attachment") then return true end
end
obj:iterate_attachments(it_att)
```
