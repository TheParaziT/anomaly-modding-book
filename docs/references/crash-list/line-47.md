---
title: Line 47
keywords:
    - "*.anm"
    - Camera
    - Animation
draft: false
---

# Line 47

___

```ini
[error]Expression    : \<no expression>
[error]Function      : CObjectAnimator::LoadMotions
[error]File          : ObjectAnimator.cpp
[error]Line          : 47
[error]Description   : fatal error
[error]Arguments     : Can't find motion file ["path and file name"]
```

- Clarification: No [.anm](../file-formats/animations/anm.md) file was found

- Error fixing:
  - Check that the animation exists
  - Check that the paths to it are correct
