---
title: Addon Installers
---

# Addon Installers

___

<Authors
  authors={["ravenascendant"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

MO2 supports 2 kinds of installers.
BAIN is the simpler.
For BAIN to work you put the gamedata folder for for the main mod into a folder thats name starts with 00.
Patches would then go in folders with subsequent numbers.
These folders should all be at the root level of the archive.

Example: *addon.zip*

```plaintext
00 Main
01 BAS patch
02 Optional thing
```

Files in folders with higher numbers will overwrite those in folders with lower numbers.

BAIN installers present as a list of check boxes. Folders with 00 will be checked by default, all others will be unchecked. Folders at the root of the archive without numbers will not show up in the installer and not be installed.

[DNPCAV](https://www.moddb.com/mods/stalker-anomaly/addons/dynamic-npc-armor-visuals) uses BAIN.

The second is FOMOD
Fomod installers can be made to look like a fancy windows installer, have preview images, descriptions of what each component does.
There is a tool that can help you build a FOMOD installer.

[Guide and tool](https://wiki.nexusmods.com/index.php/How_to_create_mod_installers)

[An anomaly specific Guide](https://drive.google.com/file/d/10CP5wsPb5OO9Zf53G1N_bUHGeF_c4rvn/view?usp=sharing)

A fomod installer can be built using any folder structure, even the messy one you use now. Or the structure of a BAIN.

[Mags Redux](https://www.moddb.com/mods/stalker-anomaly/addons/armr-arti-and-ravenascendants-mags-redux/) has a FOMOD installer but a pretty messy file structure.

[SidHUD](https://www.moddb.com/mods/stalker-anomaly/addons/sidhud) uses FOMOD but has a BAIN file structure.
