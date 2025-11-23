---
title: Line 86
keywords:
    - "*.spawn"
draft: false
---

# Line 86

___

```ini
[error]Expression    : FS.exist(file_name, "$game_spawn$", *m_spawn_name, ".spawn")
[error]Function      : CALifeSpawnRegistry::load
[error]File          : alife_spawn_registry.cpp
[error]Line          : 86
[error]Description   : Can't find spawn file:
[error]Arguments     : ["file name"]
```

- Clarification: No [*.spawn](../file-formats/game-levels/spawn.md) file was found

- Error fixing:
  - Check that the *.spawn file exists
