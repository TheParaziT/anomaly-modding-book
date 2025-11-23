---
title: Line 120
keywords:
    - "*.ogf"
    - 3D
    - Model
draft: false
---

# Line 120

___

```ini
[error]Expression    : \<no expression>
[error]Function      : CModelPool::Instance_Load
[error]File          : ..\xrRender\ModelPool.cpp
[error]Line          : 120
[error]Description   : fatal error
[error]Arguments     : Can't find model file ["path and file name"]
```

- Clarification: No [*.ogf](../file-formats/models/ogf.md) model was found

- Error fixing:
  - Check that the model exists
  - Check that the paths to it are correct
