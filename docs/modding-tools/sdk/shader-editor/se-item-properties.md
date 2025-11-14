---
title: Item Properties
tags:
  - SDK
keywords:
  - Compile Shader
  - Engine Shader
  - Game Material
  - Game Material Pairs
  - SDK
  - Sound Environment
draft: false
---

# Item Properties

___

## About

Window with shader properties.

<Tabs>
  <TabItem value="engineshader" label="Engine Shader" default>
<table>
  <thead>
    <tr>
      <th />
      <th>Description</th>
      <th>Extra</th>
      <th>Extra Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan={18}>Type</td>
      <td rowSpan={18}>Shader type</td>
      <td>
        <a href="../shader-types/basic-simple.md">basic (simple)</a>
      </td>
      <td>
        A basic shader, with a wide range of features. Supports transformation,
        different types of blending, adjusting the effect of lighting on it and
        Z-buffering. Used for most effects, such as glow
      </td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/editor-selection.md">EDITOR: selection</a>
      </td>
      <td>Designed to display object selection in the SDK</td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/editor-wire.md">EDITOR: wire</a>
      </td>
      <td>Wireframe shader in SDK</td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/internal-blur.md">INTERNAL: blur</a>
      </td>
      <td>Blur effect</td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/internal-gray-scale-effect.md">
          INTERNAL: gray-scale effect
        </a>
      </td>
      <td>Discoloration effect</td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/internal-shadow-projecting.md">
          INTERNAL: shadow projecting
        </a>
      </td>
      <td>General shadow projection</td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/level-detail-objects.md">
          LEVEL: detail objects
        </a>
      </td>
      <td>Designed for Detail Objects. Supports alpha channel dissolution</td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/level-diffuse-base-aref.md">
          LEVEL: diffuse*base.aref
        </a>
      </td>
      <td>
        A shader designed to apply vertex lighting to geometry to which alpha
        channel textures are assigned
      </td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/level-diffuse-base.md">LEVEL: diffuse*base</a>
      </td>
      <td>
        A shader designed to apply vertex lighting to the geometry that will use
        it
      </td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/level-implicit-detail.md">
          LEVEL: implicit**detail
        </a>
      </td>
      <td>
        Allows to apply several types of detail map to the main texture,
        supports mask technology
      </td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/level-lmap-base-aref.md">
          LEVEL: lmap*base.aref
        </a>
      </td>
      <td>
        A shader designed to apply lightmap lighting to geometry to which alpha
        channel textures are assigned
      </td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/level-lmap-base-default.md">
          LEVEL: lmap*base (default)
        </a>
      </td>
      <td>
        Default Lightmap shader type. This shader type is used in most of the
        geometry in the game. It can use tessellation
      </td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/level-lmap-env-base.md">
          LEVEL: lmap*(env^base)
        </a>
      </td>
      <td>
        Lightmap type of shader with a feature set such as Environment map and
        Alpha-Blend
      </td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/level-lmap-env-const-base.md">
          LEVEL: (lmap+env*const)*base
        </a>
      </td>
      <td>
        A type of shader with a wide range of functions. Through it you can
        transform ID0 textures, assign Environment map to them and customize
        them, with changing RGBA constants
      </td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/level-trees-bushes.md">LEVEL: trees/bushes</a>
      </td>
      <td>A type of shader for flora and LOD. Supports alpha channel</td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/model-default.md">MODEL: Default</a>
      </td>
      <td>
        Default shader for Dynamic Object. Supports alpha channel and
        tessellation
      </td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/model-env-base.md">MODEL: env^base</a>
      </td>
      <td>Similar to LEVEL: lmap*(env^base), only for Dynamic Objects</td>
    </tr>
    <tr>
      <td>
        <a href="../shader-types/particles.md">particles</a>
      </td>
      <td>
        Practically identical to basic (simple), except that it does not support
        a certain set of functions that are needed only for Static Object
      </td>
    </tr>
    <tr>
      <td>Owner</td>
      <td>Owner name</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowSpan={2}>General</td>
      <td rowSpan={2} />
      <td>Priority</td>
      <td>Priority for strict sorting</td>
    </tr>
    <tr>
      <td>Strict sorting</td>
      <td>
        Enables a mode that renders objects in a strictly defined order, usually
        to correctly render transparent or translucent surfaces
      </td>
    </tr>
  </tbody>
</table>
  </TabItem>
  <TabItem value="compilershader" label="Compile Shader">
<table>
  <thead>
    <tr>
      <th />
      <th>Description</th>
      <th>Extra</th>
      <th>Extra Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Translucency</td>
      <td>Transparency level for vertices</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>Ambient</td>
      <td>Base ambient light for vertices</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>LM density</td>
      <td>Density (quality) of the lightmap for the surface</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowSpan={5}>Flags</td>
      <td rowSpan={5} />
      <td>Collision</td>
      <td>Enable collision for object with this shader</td>
    </tr>
    <tr>
      <td>Rendering</td>
      <td>Enable rendering for object with this shader</td>
    </tr>
    <tr>
      <td>OptimizeUV</td>
      <td>?</td>
    </tr>
    <tr>
      <td>Vertex light</td>
      <td>Will use Vertex Lighting instead lightmap</td>
    </tr>
    <tr>
      <td>Cast shadow</td>
      <td>Enable shadow casting for object with this shader</td>
    </tr>
  </tbody>
</table>
  </TabItem>
  <TabItem value="gamematerials" label="Game Materials">
<table>
  <thead>
    <tr>
      <th />
      <th>Description</th>
      <th>Extra</th>
      <th>Extra Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Desc</td>
      <td>Material description</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowSpan={12}>Flags</td>
      <td rowSpan={12} />
      <td>Dynamic</td>
      <td>Using material for a Dynamic Object</td>
    </tr>
    <tr>
      <td>Passable</td>
      <td>Allows the material to be passable</td>
    </tr>
    <tr>
      <td>Breakable</td>
      <td>Allows the material to be breakable. Only for Dynamic Object.</td>
    </tr>
    <tr>
      <td>Bounceable</td>
      <td>Allows the material to be bounceable</td>
    </tr>
    <tr>
      <td>Skidmark</td>
      <td />
    </tr>
    <tr>
      <td>Bloodmark</td>
      <td>Enables the possibility of blood marks appearing on this material</td>
    </tr>
    <tr>
      <td>Climable</td>
      <td>Allows climbing on this material</td>
    </tr>
    <tr>
      <td>Liquid</td>
      <td>Flags the material as a liquid (?)</td>
    </tr>
    <tr>
      <td>Suppress Shadows</td>
      <td>Disables shadows for material</td>
    </tr>
    <tr>
      <td>Suppress Wallmarks</td>
      <td>Disables wallamarks for material</td>
    </tr>
    <tr>
      <td>Actor Obstacle</td>
      <td>Forcing collision inclusion (?)</td>
    </tr>
    <tr>
      <td>Bullet No Ricoshet</td>
      <td>Disabling the recochet from the material</td>
    </tr>
    <tr>
      <td rowSpan={5}>Physics</td>
      <td rowSpan={5} />
      <td>Friction</td>
      <td>Friction coefficient</td>
    </tr>
    <tr>
      <td>Damping</td>
      <td>Softness coefficient of the material (collision energy loss)</td>
    </tr>
    <tr>
      <td>Spring</td>
      <td>Material stiffness coefficient (spring stiffness)</td>
    </tr>
    <tr>
      <td>Bounce start vel</td>
      <td />
    </tr>
    <tr>
      <td>Bouncing</td>
      <td>Bounce coefficient</td>
    </tr>
    <tr>
      <td rowSpan={8}>Factors</td>
      <td rowSpan={8} />
      <td>Bounce Damage</td>
      <td />
    </tr>
    <tr>
      <td>Injurious</td>
      <td>Speed of wound on touch (?)</td>
    </tr>
    <tr>
      <td>Shooting (1-went through)</td>
      <td>Resistance to penetration factor</td>
    </tr>
    <tr>
      <td>Shooting MP (1-went through)</td>
      <td>Resistance to penetration factor for Multiplayer</td>
    </tr>
    <tr>
      <td>Transparency (1-full transp)</td>
      <td>
        Determining object visibility through materials to calculate NPC
        visibility
      </td>
    </tr>
    <tr>
      <td>Sound occlusion (1-full hear)</td>
      <td>Sound occlusion factor</td>
    </tr>
    <tr>
      <td>Flotation (1-full passable)</td>
      <td>Flotation factor</td>
    </tr>
    <tr>
      <td>Density Factor</td>
      <td>Density factor</td>
    </tr>
  </tbody>
</table>
  </TabItem>
  <TabItem value="gamematerialpairs" label="Game Material Pairs">
<table>
  <thead>
    <tr>
      <th />
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Command</td>
      <td />
    </tr>
    <tr>
      <td>Parent</td>
      <td />
    </tr>
    <tr>
      <td>Breaking Sounds</td>
      <td />
    </tr>
    <tr>
      <td>Step Sounds</td>
      <td />
    </tr>
    <tr>
      <td>Collide Sounds</td>
      <td />
    </tr>
    <tr>
      <td>Collide Particles</td>
      <td />
    </tr>
    <tr>
      <td>Collide Marks</td>
      <td />
    </tr>
  </tbody>
</table>
  </TabItem>
  <TabItem value="soundenvironment" label="Sound Environment">
<table>
  <thead>
    <tr>
      <th />
      <th />
      <th>Description</th>
      <th>Extra</th>
      <th>Extra Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan={5}>Environment</td>
      <td rowSpan={2}>Set</td>
      <td rowSpan={2} />
      <td>Identity</td>
      <td>Sets the parameters to the parameters from Identity</td>
    </tr>
    <tr>
      <td>Reset</td>
      <td>Resets parameters</td>
    </tr>
    <tr>
      <td>Preset</td>
      <td />
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>Size</td>
      <td>
        This setting sets the perceived size of the audio environment. The
        larger the number, the larger and wider the environmental space will
        "sound"
      </td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>Diffusion</td>
      <td>
        Controls the master density of audio reflections and reverberations,
        i.e. how thick the reverb and echo effects will be
      </td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowSpan={2}>Room</td>
      <td>Room</td>
      <td>
        This controls the initial volume level and amount of reverb and echo
        effects; "0" equates to full effects, while "-10000" equates to no
        effects
      </td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>RoomHF</td>
      <td>
        Sets the high frequency attenuation via a low-pass filter for Room
        setting and audio reflection; "0" equates to no low-pass filter, while
        "-10000" equates to no sound reflected
      </td>
      <td>-</td>
      <td />
    </tr>
    <tr>
      <td rowSpan={2}>Distance Effects</td>
      <td>RoomRolloffFactor</td>
      <td>
        This setting attenuates reflected sound based on how far from the audio
        source the player is; the higher the value, the more a sound will decay
        the greater the player's distance from the source of the audio
      </td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>AirAbsorptionHF</td>
      <td>
        This setting attenuates high frequencies based on the distance between
        the player and the audio source, but simulates a denser environment. The
        higher the value, the less absorbent the environment is (e.g. a low
        value would mimic thick fog, a high value would mimic a dry desert or
        tundra)
      </td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowSpan={2}>Reflections</td>
      <td>Reflections</td>
      <td>
        This sets the amount of initial echoes dependant upon the Room setting.
        "1000" equates to maximum initial reflections, while "-10000" equates to
        no initial reflections
      </td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>ReflectionsDelay</td>
      <td>
        Sets the amount of time (in milliseconds) from the initial perception of
        the audio source, to the first percieved echo. The higher the value, the
        longer the amount of time between first hearing a sound, and hearing any
        echoes of that sound
      </td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowSpan={2}>Reverb</td>
      <td>Reverb</td>
      <td>
        This setting controls the amount of late reverberations dependant upon
        the Room setting. "2000" equates to maximum late reverberations, while
        "-10000" equates to no late reverberations
      </td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>ReverbDelay</td>
      <td>
        This sets the length of time (in milliseconds) from the initial
        perception of audio reflections, to the first percieved reverberation.
        The higher the value, the longer the amount of time between the first
        echo and it's resounding reverberation
      </td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowSpan={2}>Decay</td>
      <td>DecayTime</td>
      <td>
        Controls the decay time of the audio reverberation; how quickly the
        reverberation fades away. The smaller the value, the quicker
        reverberations fade out, and the smaller the percieved room size is; the
        higher the value, the longer it takes for reverberations to fade out
      </td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>DecayHFRatio</td>
      <td>
        Sets the ratio of high frequency reverberation decay relative to actual
        reverberation decay time. The higher the value, the brighter the high
        frequency reverberation decay; the lower the value, the more dull the
        high frequency reverberation
      </td>
      <td>-</td>
      <td>-</td>
    </tr>
  </tbody>
</table>
  </TabItem>
</Tabs>
