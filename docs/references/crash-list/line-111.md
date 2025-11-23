---
title: Line 111
keywords:
    - "*.spawn"
    - "*.scop"
    - Save
draft: false
---
# Line 111

___

:::info
This is a theoretical crash (needs checking!)
:::

```ini
[error]Expression    : R_ASSERT2(!save_guid || (*save_guid == header().guid()) || ignore_save_incompatibility()
[error]Function      : CALifeSpawnRegistry::load
[error]File          : alife_spawn_registry.cpp
[error]Line          : 111
[error]Description   : Saved game doesn't correspond to the spawn : DELETE SAVED GAME!
```

- Clarification:

- Error fixing:
