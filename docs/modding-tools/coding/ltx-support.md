---
tags:
  - LTX
  - Modding Tool
title: LTX Support
preview: /docs/modding-tools/coding/assets/images/ltx-support-Title.gif
draft: false
---

# LTX Support

___

![Title centered](assets/images/ltx-support-Title.gif)

Extension for [Visual Studio Code](https://code.visualstudio.com/), which adds support for [logic syntax](../../references/file-formats/conf-script/ltx.md) from **S.T.A.L.K.E.R. Call of Pripyat**. The plugin adds a lot of big and not so big features that should make it easier to work on modifications, as well as help newcomers start making your first mod. Perhaps the most important aspect of the extension is that it tries as much as possible to adapt to projects.

![Demonstration centered](assets/images/ltx-support-Demonstration.gif)

Currently implemented VSCode features such as:

* Completion
  * Infos
  * Sections Types
  * Sections Links
  * Functions & Conditions
  * Localization
  * Squads
  * Tasks
  * Signals
* Hover
* Syntax Highlighting
* Semantic Highlighting
* Folding Ranges
* Symbols

The list is constantly being updated with new features as each new version is released.

## Settings

To enter the extension settings, you must:

* Press `Ctrl+Shift+P => Open Settings (UI)`.
* Open `Extensions => LTX` or just search for `ltx`.

## Extension assembly

If you're interested in poking around the extension yourself or just helping to develop it, here's a little information on how to build it. To do this, you need to:

1. Download the source code using `git clone`.
2. Open the project, run the console `npm install` or click on `package.json` in the spoiler `NPM Scripts` and click on the item `Run install`.
3. After installing all the required libraries, press `Launch` in the `Run and Debug` tab or the `F5` hotkey.
4. Done. A new VS Code window should open with 2 test files.

## Links

* [GitHub](https://github.com/AziatkaVictor/ltx-support)
* [GitHub Wiki](https://github.com/AziatkaVictor/ltx-support/wiki)
* [Author Profile on AP-PRO.RU](https://ap-pro.ru/profile/6-aziatkavictor/)
* [Forum topic](https://ap-pro.ru/forums/topic/3561-vscode-podderzhka-sintaksisa-cop/)
