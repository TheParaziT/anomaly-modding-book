---
title: Line 784
keywords:
  - "*.omf"
  - Animation
  - Motion
  - 3D
  - Model
draft: false
---

# Line 784

___

```ini
[error]Expression    : \<no expression>
[error]Function      : CKinematicsAnimated::Load::<lambda_1d323dfa2c5eacee46e042904e528af6>::operator ()
[error]File          : ..\xrRender\SkeletonAnimated.cpp
[error]Line          : 784
[error]Description   : fatal error
[error]Arguments     : Can't find motion file ["path and file name"]
```

- Clarification: No [*.omf](../file-formats/animations/omf.md) animation was found

- Error fixing:
  - Check that the animation exists
  - Check the correct paths to it in the Motions Reference of the model
