---
title: Change Userdata Operator
preview: /docs/modding-tools/blender/addon-operators/assets/images/operator-change-userdata.png
draft: false
tags:
    - Blender
---

# Change Userdata Operator

___

![alt text](assets/images/operator-change-userdata.png)

## About

Changes the value of the User Data parameter from the X-Ray Engine: Object panel to objects

### Mode

- `Active Object` - Active object
- `Selected Objects` - Selected objects
- `All Objects` - All objects from blend-file

### Value

- `Replace` - Replaces the parameter value with the text from the Value parameter below
- `Clear` - Deletes the parameter value
- `Object` - Sets the value of the parameter to the same as the object selected in the Object parameter below
- `Active Object` - sets the value of the parameter to the same as the active object. If this mode is selected, the name of the active object will be displayed below
- `Text` - sets the value of the parameter to the same as the content of the text data block, which is specified in the Text parameter below

### Object

Specifies the object from which to take the parameter value. Available in Object mode

### Text

Specifies the text block of data whose contents will be used as the value for the parameter. Available in Text mode

___

## Sources

[Blender X-Ray Addon Wiki on GitHub](https://github.com/PavelBlend/blender-xray/wiki/Panel-Props-Tools#change-userdata)
