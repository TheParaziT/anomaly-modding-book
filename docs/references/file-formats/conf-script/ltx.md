# *.ltx

___

## About

LTX files are basically [*.ini](https://en.wikipedia.org/wiki/INI_file) files with some custom additions. They are located all over the `gamedata/configs` and are used for, well, configs.

:::info

```ini
#include "tables/gun_*.ltx"

[some_nice_gun]
recoil              = 0.8
boosts              = a, b, c, d    ; list
fancy_feature       = {=is_night()} true, false

[some_other_gun]
...
```

:::

## *.ltx features

1. `#include` preprocessor command. This command basically merges the file into this config. Many of the configs are included into `system.ltx` this way, so you can access almost all sections through `ini_sys` handler.
2. Wildcard imports - `*` in include statement corresponds to any text, so the given include will include both `gun_ak.ltx` and `gun_m4.ltx`. This feature was developed for Anomaly, so you may not find it in other mods.
3. Name of the section in square brackets - this is referred in scripts as `section_name` or just `section`.
4. Key-value pairs. Values may include comma-separated lists.
5. Comments start with `;`.
6. `fancy_feature` uses something called "condlist". Refer to [condlists manual](../../../tutorials/configs/condlists.md) to understand this bs.

___

## Programs editing this file

- Any text editor
  - There are also extensions for VSCode for *.ltx ([LTX Support Extension by AziatkaVictor](https://marketplace.visualstudio.com/items?itemName=AziatkaVictor.ltx-support))
  