---
title: Line 406
keywords:
    - Armature
    - 3D
    - Model
    - Bone
draft: false
---

# Line 406

___

```ini
[error]Expression    : \<no expression>
[error]Function      : CkinematicsAnimated::LL_PlayCycle
[error]File          : ..\xrRender\SkeletonAnimated.cpp
[error]Line          : 406
[error]Description   : fatal error
[error]Arguments     : ! MODEL: missing bone/wrong armature?: ["path and file name"]
```

- Clarification: Probably in the animation that is based on this skeleton there was no animation channel for a newly added or removed bone in the skeleton

- Error fixing:
  - Check the skeleton for bones that have been removed or added
