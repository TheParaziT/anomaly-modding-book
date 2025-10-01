---
description: Guide describing the purpose of key folders and files in the game directory structure
---

# Main Folders And Files

___

## About

This guide describes the purpose of key folders and files.

## Root files and folders

Files and folders located in the main game directory.

<table>
  <thead>
    <tr>
      <th>File / Folder</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>fsgame.ltx</td>
      <td>
        The main configuration file that defines the paths to critical resource folders.
      </td>
    </tr>
    <tr>
      <td>bin</td>
      <td>Contains the game's executable files (*.exe).</td>
    </tr>
    <tr>
      <td>db</td>
      <td>
        Contains packaged game resources in archives. Has a lower priority than the gamedata folder. If the file exists in gamedata, the game will use it instead of the version from *.db.
      </td>
    </tr>
    <tr>
      <td>gamedata</td>
      <td>
        The game primarily searches for resources here. If the folder is missing, data from the *.db is used. The structure of its subfolders mirrors the structure of the archives.
      </td>
    </tr>
    <tr>
      <td>tools</td>
      <td>
        Contains auxiliary tools for modding: icons for add-ons, resource converters, *.bat files for unpacking .db archives.
      </td>
    </tr>
    <tr>
      <td>appdata</td>
      <td>A folder containing user data created during gameplay.</td>
    </tr>
  </tbody>
</table>

## Contents of the appdata folder

<table>
  <thead>
    <tr>
      <th>File / Folder</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>logs</td>
      <td>
        Game log files (logs of object and texture downloads, etc.) are created
        and stored. These are useful for debugging mods and identifying the
        causes of crashes.
      </td>
    </tr>
    <tr>
      <td>savedgames</td>
      <td>
        Game save files (files with the extensions *.scop and *.scoc) are
        created and stored.
      </td>
    </tr>
    <tr>
      <td>screenshots</td>
      <td>Folder for screenshots taken in the game.</td>
    </tr>
    <tr>
      <td>shaders_cache</td>
      <td>
        Cache of compiled shaders. Needed to speed up game loading after the
        first launch.
      </td>
    </tr>
    <tr>
      <td>username.ltx</td>
      <td>
        A personal file containing the user's game settings (graphics, sound,
        controls).
      </td>
    </tr>
  </tbody>
</table>

## Contents of the gamedata folder

<table>
  <thead>
    <tr>
      <th>File / Folder</th>
      <th>Description</th>
      <th>Key file formats</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ai</td>
      <td>Files required for AI to function.</td>
      <td>*.efd</td>
    </tr>
    <tr>
      <td>anims</td>
      <td>Camera animation files, paths, and image post-processing.</td>
      <td>*.anm, *.ppe</td>
    </tr>
    <tr>
      <td>configs</td>
      <td>Configuration files and localization files.</td>
      <td>*.ltx, *.xml</td>
    </tr>
    <tr>
      <td>levels</td>
      <td>Level files.</td>
      <td></td>
    </tr>
    <tr>
      <td>meshes</td>
      <td>3D models, skeletons, and animations of characters and objects.</td>
      <td>*.ogf, *.dm, *.omf</td>
    </tr>
    <tr>
      <td>scripts</td>
      <td>Scripts that define game logic.</td>
      <td>*.script</td>
    </tr>
    <tr>
      <td>shaders</td>
      <td>Shader source files.</td>
      <td></td>
    </tr>
    <tr>
      <td>sounds</td>
      <td>Sound effects, music, and ambient sounds.</td>
      <td>*.ogg</td>
    </tr>
    <tr>
      <td>spawns</td>
      <td>Files with spawn points for characters and objects in locations.</td>
      <td>*.spawn</td>
    </tr>
    <tr>
      <td>textures</td>
      <td>Textures for models and interface.</td>
      <td>*.dds</td>
    </tr>
  </tbody>
</table>

## Key resource files (*.xr)

<table>
  <thead>
    <tr>
      <th>File / Folder</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>gamemtl.xr</td>
      <td>
        Database of game materials and their properties (sound of footsteps, durability, bullet marks, etc.).
      </td>
    </tr>
    <tr>
      <td>lanims.xr</td>
      <td>Light source animations (flickering, fading).</td>
    </tr>
    <tr>
      <td>particles.xr</td>
      <td>Particle system data (fire, smoke, rain).</td>
    </tr>
    <tr>
      <td>senvironment.xr</td>
      <td>Settings for sound environments (echo in caves, sound in rooms).</td>
    </tr>
    <tr>
      <td>shaders.xr</td>
      <td>Library of shaders used by the rendering engine.</td>
    </tr>
    <tr>
      <td>shaders_xrlc.xr</td>
      <td>Library of shaders used by the level compiler (xrLC).</td>
    </tr>
  </tbody>
</table>
