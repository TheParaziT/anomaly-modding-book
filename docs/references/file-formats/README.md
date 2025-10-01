# File Formats

___

## About

This section describes the extensions that are found in the game files and the SDK.

## General

| Extension | Description |
|---|---|
| [*.log](../file-formats/general/log.md) | Event log. It contains records of program start, operation and termination |
| [*.pdb](../file-formats/general/pdb.md) |  |
| [*.scop](../file-formats/general/scop.md) | Save file |
| [*.scoc](../file-formats/general/scoc.md) | Save file |
| [*.xrdemo](../file-formats/general/xrdemo.md) | Recording camera flyover (demo). Created in the game with a [console command](../engine/console-commands/general-game-console-commands.md). |
| [*.ogm](../file-formats/audio-video/ogm.md) | The video format used by the game engine. |
| [*.ogg](../file-formats/audio-video/ogg.md) | The sound format used by the game engine. |

## Configuration and script files

| Extension | Description |
|---|---|
| [*.ltx](../file-formats/conf-script/ltx.md) | Configuration file, custom ini-like format |
| [*.script](../file-formats/conf-script/script.md) | Game script |
| [*.xml](../file-formats/conf-script/xml.md) | Carry in text format data related to in-game text, UI element placement, and characters and information within the game world |
| [*.seq](../file-formats/textures/seq.md) | Text file containing a description of the frame sequence in the 2D animation |

## AI

| Extension | Description |
|---|---|
| [*.efd](../file-formats/ai/efd.md) | Table of AI heuristic parameters, contains constants for fine-tuning A-Life. They are used as input parameters in scripts |

## Textures

| Extension | Description |
|---|---|
| [*.bump](../file-formats/textures/bump.md) | Normal map in A(BGR) format |
| [*.bump#](../file-formats/textures/bump_hash.md) | File that fixes DXT compression errors in [*_bump.dds](../file-formats/textures/bump.md) |
| [*.dds](../file-formats/textures/dds.md) | Graphic file used by DirectX to store textures |
| [*_detail_map.dds](../file-formats/textures/detail-map.md) | Same as a regular [*.dds](../file-formats/textures/dds.md) texture, needed as an extra map in a [*.thm](../file-formats/textures/thm.md) |
| [*.tga](../file-formats/textures/thm.md) | A bitmap graphics format with support for color depth of 1-32 bits per pixel, alpha channels, and RLE compression. Used as a source format. |
| [*.thm](../file-formats/textures/thm.md) | They are used to set the parameters of textures - bump, detail, and more. |

## Shaders

| Extension | Description |
|---|---|
| [*.cs](../file-formats/shaders/cs.md) | Compute shader |
| [*.gs](../file-formats/shaders/gs.md) | Geometry shader |
| [*.ds](../file-formats/shaders/ds.md) | Domain shader |
| [*.hs](../file-formats/shaders/hs.md) | Hull shader |
| [*.vs](../file-formats/shaders/vs.md) | Vertex shader |
| [*.ps](../file-formats/shaders/ps.md) | Pixel shader |
| [*.s](../file-formats/shaders/s.md) | Script shader. Lua version of engine blenders |

## Postprocess

| Extension | Description |
|---|---|
| [*.ppe](../file-formats/postprocceses/ppe.md) | Postprocess file format. Color-noise effects of the actor's screen |

## Models

| Extension | Description |
|---|---|
| [*.dm](../file-formats/models/dm.md) |  Effect of a dynamic weather environment (e.g., rain or lightning) |
| [*.object](../file-formats/models/object.md) | These files are intended for the X-Ray SDK to store 3D content in its original, uncompressed, lossless form. They are source files that store information before compilation into other game compressed formats.  |
| [*.ogf](../file-formats/models/ogf.md) | Compiled object |
| [*.bones](../file-formats/models/bones.md) | Skeleton bone data files |
| [*bone_parts*.*](../file-formats/models/bone-parts.md) | Bone part description file for an object/NPC |
| [*.group](../file-formats/models/group.md) | Object groups |

## Animations

| Extension | Description |
|---|---|
| [*.anm](../file-formats/animations/anm.md) | A set of coordinates, which works as an animation of the actor's camera movement. It is also used for anomalies, which need to be given a path. |
| [*.skl](../file-formats/animations/skl-skls.md) | Skeletal animation |
| [*.skls](../file-formats/animations/skl-skls.md) | Skeletal animations(.skl) in a container |
| [*.omf](../file-formats/animations/omf.md) | A specialized S.T.A.L.K.E.R. game format containing animations. This is a separate dedicated file used in conjunction with [*.ogf](../file-formats/models/ogf.md) models. Was created in order to optimize process when some different models use the same list of animations. |

## Archives and Resource Packages

| Extension | Description |
|---|---|
| [*.db](../file-formats/archives-resource-packs/db.md) | archive of game resources. Used in late builds and the final version of the game, has several options (db."number", db."letter"). |
| [*.xr](../file-formats/archives-resource-packs/xr.md) | resource library. Contains resources such as particles, Engine Shaders, [Compile Shaders](../shaders/compiler-shaders-list.md). in a packed format. |

## Game level

| Extension | Description |
|---|---|
| [*.err](../file-formats/sdk/err.md) | Contains information about geometry errors during level compilation |
| [level](../file-formats/game-levels/level.md) | File with general information about the game location (light sources, object names, texture and shader names, sectors and portals). Created during compilation |
| [*.prj](../file-formats/sdk/prj.md) | Level precompilation file |
| [*.ai](../file-formats/game-levels/ai.md) | AI location grid. Created during compilation |
| [*.cform](../file-formats/game-levels/cform.md) | Geometry for calculating collisions. Calculated by the level compiler. Contains a solid map structure. All tangible objects with materials live here. Because of this, the game knows with what sound and property objects should react when they are hit by bullets or walked on |
| [*.details](../file-formats/game-levels/details.md) | Detail Objects (grass, cigarette butts, construction debris) on the level. Created through LevelEditor SDK at compile time. |
| [*.env_mod](../file-formats/game-levels/env_mod.md) | local environment modifiers (environment), set areas on the location with lighting different from the main weather cycle. |
| [*.fog_vol](../file-formats/game-levels/fog_vol.md) | Volumetric fog |
| [*.game](../file-formats/game-levels/game.md) | Coordinates of the player's spawn in the multiplayer game. Outdated file. |
| [*.geom](../file-formats/game-levels/geom.md) | Contains vertices (position, normals, texture coordinates, etc.), indices, and information for smooth geometry detail. |
| [*.geomx](../file-formats/game-levels/geomx.md) | It contains only geometry. In the renderer it is used in the shadow rendering passes, due to the fact that there is less information - loading data into the buffers - faster. |
| [*.gtc](../file-formats/game-levels/gtc.md) | Cross table of correspondence between the location graph and the AI grid. Created during compilation |
| [*.hom](../file-formats/game-levels/hom.md) | Mapping of hierarchical cutoffs |
| [*.level](../file-formats/sdk/dot-level.md) | List of SDK scene objects |
| [*.lights](../file-formats/game-levels/lights.md) | Light sources for xrLC |
| [*.ps_static](../file-formats/game-levels/ps_static.md) | Particle systems. Flies, steam from pipes, etc. |
| [*.graph](../file-formats/game-levels/graph.md) | Global graph of AI navigation. Used, among other things, for moving AI objects outside the active level. |
| [*.spawn](../file-formats/game-levels/spawn.md) | A file storing spawn data. |
| [*.snd_env](../file-formats/game-levels/snd_env.md) | Volumetric sound sources. |
| [*.snd_static](../file-formats/game-levels/snd_static.md) | Static point sources of sound. Sound of flies, etc. |
| [*.som](../file-formats/game-levels/som.md) | Geometry for calculating sound propagation. |
| [*.wallmarks](../file-formats/game-levels/wallmarks.md) | Decals. Bloodstains, faction emblems on walls, etc. Used for the compiled level. |
| [*.part](../file-formats/game-levels/part.md) | Scene objects |
