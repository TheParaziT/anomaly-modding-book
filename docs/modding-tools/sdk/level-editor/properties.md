---
description: Level Editor Properties documentation
---

# Properties

___

## About

Allows to setup various parameters of the selected object.

:::note
All types of objects have different parameters. Depending on the type of selected object, the parameters will change.
:::

<Tabs>
  <TabItem value="sceneobject" label="Scene Object" default>
    <table>
      <thead>
        <tr>
          <th>1</th>
          <th>Description</th>
          <th>1</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowSpan={3}>Transform</td>
          <td rowSpan={3} />
          <td>Position</td>
          <td />
        </tr>
        <tr>
          <td>Rotation</td>
          <td />
        </tr>
        <tr>
          <td>Scale</td>
          <td />
        </tr>
        <tr>
          <td>Reference</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Flags</td>
          <td />
          <td>Motionable</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={5}>Surfaces</td>
          <td rowSpan={5} />
          <td>Texture</td>
          <td />
        </tr>
        <tr>
          <td>Shader</td>
          <td />
        </tr>
        <tr>
          <td>Compile</td>
          <td />
        </tr>
        <tr>
          <td>Game Mtl</td>
          <td />
        </tr>
        <tr>
          <td>Action</td>
          <td />
        </tr>
      </tbody>
    </table>
  </TabItem>
  <TabItem value="light" label="Light">
    <table>
      <thead>
        <tr>
          <th />
          <th>Description</th>
          <th>Extra</th>
          <th>Extra Description</th>
          <th>Extra</th>
          <th>Extra Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td />
          <td />
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowSpan={3}>Transform</td>
          <td rowSpan={3} />
          <td>Position</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Rotation</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Scale</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>In group editable</td>
          <td />
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Type</td>
          <td />
          <td>Point</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Color</td>
          <td />
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Brightness</td>
          <td />
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowSpan={3}>Light Control</td>
          <td />
          <td>$static</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td />
          <td>$hemi</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td />
          <td>$sun</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowSpan={3}>Usage</td>
          <td />
          <td>LightMap</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td />
          <td>Dynamic</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td />
          <td>Animated</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Range</td>
          <td />
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowSpan={5}>Attenuation</td>
          <td rowSpan={5} />
          <td>Constant</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Linear</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Quadratic</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Auto</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Graphic</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowSpan={6}>Fuzzy</td>
          <td rowSpan={6} />
          <td>Count</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Generate</td>
          <td />
          <td>Random</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={2}>Shape</td>
          <td rowSpan={2} />
          <td>Sphere</td>
          <td />
        </tr>
        <tr>
          <td>Box</td>
          <td />
        </tr>
        <tr>
          <td>Radius</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Half Dimension</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Use in D3D</td>
          <td />
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
  </TabItem>
  <TabItem value="soundsource" label="Sound Source">
    <table>
      <thead>
        <tr>
          <th />
          <th>Description</th>
          <th>Extra</th>
          <th>Extra Description</th>
          <th>Extra</th>
          <th>Extra Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td rowSpan={3}>Transform</td>
          <td rowSpan={3} />
          <td>Position</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td>Rotation</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td>Scale</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td rowSpan={3}>Custom</td>
          <td rowSpan={3} />
          <td>Play</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td>Stop</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td>Simulate</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td rowSpan={6}>Source</td>
          <td rowSpan={6} />
          <td>WAVE name</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td>Frequency</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td>Volume</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td>Min dist</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td>Max dist</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td>Max ai dist</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td rowSpan={9}>Game</td>
          <td rowSpan={9} />
          <td rowSpan={3}>Active time</td>
          <td rowSpan={3} />
          <td>Hint</td>
          <td />
        </tr>
        <tr>
          <td>From</td>
          <td />
        </tr>
        <tr>
          <td>To</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={3}>Play time</td>
          <td rowSpan={3} />
          <td>Hint</td>
          <td />
        </tr>
        <tr>
          <td>From</td>
          <td />
        </tr>
        <tr>
          <td>To</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={3}>Pause delt</td>
          <td rowSpan={3} />
          <td>Hint</td>
          <td />
        </tr>
        <tr>
          <td>From</td>
          <td />
        </tr>
        <tr>
          <td>To</td>
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
          <th>Description</th>
          <th>Extra</th>
          <th>Extra Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td rowSpan={3}>Transform</td>
          <td rowSpan={3} />
          <td>Position</td>
          <td />
        </tr>
        <tr>
          <td>Rotation</td>
          <td />
        </tr>
        <tr>
          <td>Scale</td>
          <td />
        </tr>
        <tr>
          <td>Environment Inner</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td>Envirment Outer</td>
          <td />
          <td />
          <td />
        </tr>
      </tbody>
    </table>
  </TabItem>
  <TabItem value="glow" label="Glow">
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
          <td>Name</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowSpan={3}>Transform</td>
          <td rowSpan={3} />
          <td>Position</td>
          <td />
        </tr>
        <tr>
          <td>Rotation</td>
          <td />
        </tr>
        <tr>
          <td>Scale</td>
          <td />
        </tr>
        <tr>
          <td>In group editable</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Texture</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Shader</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Radius</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
  </TabItem>
  <TabItem value="shape" label="Shape">
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
      <td>Name</td>
      <td />
      <td />
      <td />
    </tr>
    <tr>
      <td rowSpan={3}>Transform</td>
      <td rowSpan={3} />
      <td>Position</td>
      <td />
    </tr>
    <tr>
      <td>Rotation</td>
      <td />
    </tr>
    <tr>
      <td>Scale</td>
      <td />
    </tr>
    <tr>
      <td>Shape usage</td>
      <td />
      <td />
      <td />
    </tr>
  </tbody>
</table>
  </TabItem>
  <TabItem value="spawnelement" label="Spawn Element">
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
      <td>Name</td>
      <td />
      <td />
      <td />
    </tr>
    <tr>
      <td rowSpan={3}>Transform</td>
      <td rowSpan={3} />
      <td>Position</td>
      <td />
    </tr>
    <tr>
      <td>Rotation</td>
      <td />
    </tr>
    <tr>
      <td>Scale</td>
      <td />
    </tr>
    <tr>
      <td>Profile (spawn section)</td>
      <td />
      <td />
      <td />
    </tr>
    <tr>
      <td>Custom data</td>
      <td />
      <td />
      <td />
    </tr>
    <tr>
      <td rowSpan={4}>Alife</td>
      <td rowSpan={4} />
      <td>Interactive</td>
      <td />
    </tr>
    <tr>
      <td>Used AI Locations</td>
      <td />
    </tr>
    <tr>
      <td>Story ID</td>
      <td />
    </tr>
    <tr>
      <td>Spawn Story ID</td>
      <td />
    </tr>
    <tr>
      <td>restrictor type</td>
      <td />
      <td />
      <td />
    </tr>
    <tr>
      <td>check for separator</td>
      <td />
      <td />
      <td />
    </tr>
    <tr>
      <td rowSpan={6}>Game Type</td>
      <td rowSpan={6} />
      <td>Single</td>
      <td />
    </tr>
    <tr>
      <td>DM</td>
      <td />
    </tr>
    <tr>
      <td>TDM</td>
      <td />
    </tr>
    <tr>
      <td>ArtefactHunt</td>
      <td />
    </tr>
    <tr>
      <td>CTA</td>
      <td />
    </tr>
    <tr>
      <td>FMP</td>
      <td />
    </tr>
    <tr>
      <td>MP respawn</td>
      <td />
      <td />
      <td />
    </tr>
  </tbody>
</table>
  </TabItem>
  <TabItem value="waypoints" label="Way Points">
<table>
  <thead>
    <tr>
      <th>1</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Way Name</td>
      <td />
    </tr>
  </tbody>
</table>
  </TabItem>
  <TabItem value="sector" label="Sector">
<table>
  <thead>
    <tr>
      <th>1</th>
      <th>Description</th>
      <th>1</th>
      <th>Description</th>
      <th>1</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Name</td>
      <td />
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowSpan={3}>Transform</td>
      <td rowSpan={3} />
      <td>Position</td>
      <td />
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>Rotation</td>
      <td />
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>Scale</td>
      <td />
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>Color</td>
      <td />
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowSpan={8}>Sector_*Name*</td>
      <td rowSpan={8} />
      <td rowSpan={3}>Contents</td>
      <td rowSpan={3} />
      <td>Objects</td>
      <td />
    </tr>
    <tr>
      <td>Meshes</td>
      <td />
    </tr>
    <tr>
      <td>Faces</td>
      <td />
    </tr>
    <tr>
      <td rowSpan={5}>Change LevelMap to</td>
      <td rowSpan={5} />
      <td>default</td>
      <td />
    </tr>
    <tr>
      <td>#0</td>
      <td />
    </tr>
    <tr>
      <td>#1</td>
      <td />
    </tr>
    <tr>
      <td>#2</td>
      <td />
    </tr>
    <tr>
      <td>#3</td>
      <td />
    </tr>
  </tbody>
</table>
  </TabItem>
  <TabItem value="portal" label="Portal">
<table>
  <thead>
    <tr>
      <th>1</th>
      <th>Description</th>
      <th>1</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Name</td>
      <td />
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowSpan={3}>Transform</td>
      <td rowSpan={3} />
      <td>Postion</td>
      <td />
    </tr>
    <tr>
      <td>Rotation</td>
      <td />
    </tr>
    <tr>
      <td>Scale</td>
      <td />
    </tr>
  </tbody>
</table>
  </TabItem>
  <TabItem value="group" label="Group">
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
      <td>Name</td>
      <td />
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowSpan={3}>Transform</td>
      <td rowSpan={3} />
      <td>Position</td>
      <td />
    </tr>
    <tr>
      <td>Rotation</td>
      <td />
    </tr>
    <tr>
      <td>Scale</td>
      <td />
    </tr>
    <tr>
      <td>Reference</td>
      <td />
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowSpan={2}>FreezeObjects</td>
      <td rowSpan={2} />
      <td>Unique</td>
      <td />
    </tr>
    <tr>
      <td>Reference</td>
      <td />
    </tr>
    <tr>
      <td colSpan={4}>
        Ниже находятся названия обьектов в группе (Нажатием галочки по обьекту делает его редактируемым в своей категории типа обьекта)
      </td>
    </tr>
  </tbody>
</table>
  </TabItem>
  <TabItem value="staticparticles" label="Static Particles">
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
      <td>Name</td>
      <td />
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowSpan={3}>Transform</td>
      <td rowSpan={3} />
      <td>Position</td>
      <td />
    </tr>
    <tr>
      <td>Rotation</td>
      <td />
    </tr>
    <tr>
      <td>Scale</td>
      <td />
    </tr>
    <tr>
      <td>In group editable</td>
      <td />
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>Reference</td>
      <td />
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowSpan={2}>Controls</td>
      <td rowSpan={2} />
      <td>Play</td>
      <td />
    </tr>
    <tr>
      <td>Stop</td>
      <td />
    </tr>
    <tr>
      <td rowSpan={8}>Game Type</td>
      <td rowSpan={8} />
      <td>single</td>
      <td />
    </tr>
    <tr>
      <td>deathmatch</td>
      <td />
    </tr>
    <tr>
      <td>team deathmatch</td>
      <td />
    </tr>
    <tr>
      <td>artefact hunt</td>
      <td />
    </tr>
    <tr>
      <td>capture the artefact</td>
      <td />
    </tr>
    <tr>
      <td>domination zone</td>
      <td />
    </tr>
    <tr>
      <td>team domination zone</td>
      <td />
    </tr>
    <tr>
      <td>Free MP</td>
      <td />
    </tr>
  </tbody>
</table>
  </TabItem>
  <TabItem value="wallmarks" label="Wallmarks">
<table>
  <thead>
    <tr>
      <th />
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Draw Wallmarks</td>
      <td />
    </tr>
    <tr>
      <td rowSpan={3}>Alignment</td>
      <td rowSpan={3} />
    </tr>
    <tr />
    <tr />
    <tr>
      <td>Width</td>
      <td />
    </tr>
    <tr>
      <td>Height</td>
      <td />
    </tr>
    <tr>
      <td>Rotate</td>
      <td />
    </tr>
    <tr>
      <td>Shader</td>
      <td />
    </tr>
    <tr>
      <td>Texture</td>
      <td />
    </tr>
  </tbody>
</table>
  </TabItem>
  <TabItem value="fogvolume" label="Fog Volume">
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
      <td>Name</td>
      <td />
      <td />
      <td />
    </tr>
    <tr>
      <td rowSpan={3}>Transform</td>
      <td rowSpan={3} />
      <td>Position</td>
      <td />
    </tr>
    <tr>
      <td>Rotation</td>
      <td />
    </tr>
    <tr>
      <td>Scale</td>
      <td />
    </tr>
    <tr>
      <td>Shape usage</td>
      <td />
      <td />
      <td />
    </tr>
  </tbody>
</table>
  </TabItem>
  <TabItem value="puddles" label="Puddles">
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
      <td>Name</td>
      <td />
      <td />
      <td />
    </tr>
    <tr>
      <td rowSpan={3}>Transform</td>
      <td rowSpan={3} />
      <td>Position</td>
      <td />
    </tr>
    <tr>
      <td>Rotation</td>
      <td />
    </tr>
    <tr>
      <td>Scale</td>
      <td />
    </tr>
    <tr>
      <td>Shape usage</td>
      <td />
      <td />
      <td />
    </tr>
  </tbody>
</table>
  </TabItem>
</Tabs>
