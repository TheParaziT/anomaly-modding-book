---
title: Object Tools
description: Level Editor Object tools documentation
draft: false
---

# Object Tools

___

## About

Tools for working with the selected object type.

:::note
All types of objects have different sets of tools for working with them. Depending on the type of the selected object, the tools will change.
:::

<Tabs>
  <TabItem value="sceneobject" label="Scene Object" default>
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
          <td>Show lists</td>
          <td>Show Edit group items window</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowSpan={6}>Commands</td>
          <td rowSpan={6} />
          <td>Multiple Append</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Random Append</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Load</td>
          <td>Loads random placement properties</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Save</td>
          <td>Saves the current random placement properties</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Custom</td>
          <td>Opens additional properties to configure random placement</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Generate random garbage</td>
          <td>Places random objects on the level based on the selected objects</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowSpan={5}>Reference Select</td>
          <td rowSpan={5} />
          <td rowSpan={2}>Select by Current</td>
          <td rowSpan={2} />
          <td>+</td>
          <td />
        </tr>
        <tr>
          <td>-</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={3}>Select by Selected</td>
          <td rowSpan={3} />
          <td>=%</td>
          <td>
            Select by Selected | =% - Selects a similar object by a specified
            percentage +%
          </td>
        </tr>
        <tr>
          <td>+%</td>
          <td />
        </tr>
        <tr>
          <td>%</td>
          <td>Sets the similarity percentage for filtering</td>
        </tr>
        <tr>
          <td rowSpan={2}>Surface</td>
          <td rowSpan={2} />
          <td>Clear Select</td>
          <td>Cleans the surfaces of selected random placement objects</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Clear Level</td>
          <td>
            Cleans the surfaces of all selected random placement objects on level
          </td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowSpan={2}>Current Object</td>
          <td rowSpan={2} />
          <td>Select</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Refresh</td>
          <td>Refreshes the list of all selected random placement objects</td>
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
  </TabItem>
  <TabItem value="light" label="Light">
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
          <td rowSpan={4}>Affect in D3D</td>
          <td rowSpan={4} />
          <td>Enable Sel</td>
          <td />
        </tr>
        <tr>
          <td>Disable Sel</td>
          <td />
        </tr>
        <tr>
          <td>Enable All</td>
          <td />
        </tr>
        <tr>
          <td>Disable All</td>
          <td />
        </tr>
      </tbody>
    </table>
  </TabItem>
  <TabItem value="shape" label="Shape">
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
          <td rowSpan={2}>Commands</td>
          <td rowSpan={2} />
          <td>Sphere</td>
          <td />
        </tr>
        <tr>
          <td>Box</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={2}>Edit</td>
          <td rowSpan={2} />
          <td>Attach Shape</td>
          <td />
        </tr>
        <tr>
          <td>Detach All</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={2}>Level Bound</td>
          <td rowSpan={2} />
          <td>Edit Level Bound</td>
          <td />
        </tr>
        <tr>
          <td>Recalc</td>
          <td />
        </tr>
      </tbody>
    </table>
  </TabItem>
  <TabItem value="spawnelement" label="Spawn Element">
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
          <td rowSpan={2}>Reference Select</td>
          <td rowSpan={2} />
          <td>+</td>
          <td />
        </tr>
        <tr>
          <td>-</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={3}>Select by Selected</td>
          <td rowSpan={3} />
          <td>=%</td>
          <td />
        </tr>
        <tr>
          <td>+%</td>
          <td />
        </tr>
        <tr>
          <td>%</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={2}>Commands</td>
          <td rowSpan={2} />
          <td>Attach Object</td>
          <td />
        </tr>
        <tr>
          <td>Detach Object</td>
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
          <th>1</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan={2}>Commands</td>
          <td rowSpan={2} />
          <td>Way Mode</td>
          <td />
        </tr>
        <tr>
          <td>Way Point</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={7}>Link Command</td>
          <td rowSpan={7} />
          <td>Auto Link</td>
          <td />
        </tr>
        <tr>
          <td>Create 1-Link</td>
          <td />
        </tr>
        <tr>
          <td>Create 2-Link</td>
          <td />
        </tr>
        <tr>
          <td>Convert to 1-Link</td>
          <td />
        </tr>
        <tr>
          <td>Convert to 2-Link</td>
          <td />
        </tr>
        <tr>
          <td>Invert Link</td>
          <td />
        </tr>
        <tr>
          <td>Remove Link</td>
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
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan={6}>Command</td>
          <td rowSpan={6} />
          <td>Validate Sectors</td>
          <td />
        </tr>
        <tr>
          <td>Capture Volume</td>
          <td />
        </tr>
        <tr>
          <td>Distribute Objects</td>
          <td />
        </tr>
        <tr>
          <td>Create Default</td>
          <td />
        </tr>
        <tr>
          <td>Remove Default</td>
          <td />
        </tr>
        <tr>
          <td>Recalculate Portals</td>
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
          <td rowSpan={4}>Command</td>
          <td rowSpan={4} />
          <td>Invert Orientation</td>
          <td />
        </tr>
        <tr>
          <td>Compute All Portals</td>
          <td />
        </tr>
        <tr>
          <td>Compute Sel. Portals</td>
          <td />
        </tr>
        <tr>
          <td>Remove Similar</td>
          <td />
        </tr>
      </tbody>
    </table>
  </TabItem>
  <TabItem value="group" label="Group">
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
          <td rowSpan={4}>Commands</td>
          <td rowSpan={4} />
          <td>Group</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Ungroup</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Make Thumbnail</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Save As ...</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowSpan={2}>Current Object</td>
          <td rowSpan={2} />
          <td>Select ...</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Reload Refs</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowSpan={5}>Reference Select</td>
          <td rowSpan={5} />
          <td rowSpan={2}>Select by Current</td>
          <td rowSpan={2} />
          <td>+</td>
          <td />
        </tr>
        <tr>
          <td>-</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={3}>Select by Selected</td>
          <td rowSpan={3} />
          <td>=%</td>
          <td />
        </tr>
        <tr>
          <td>+%</td>
          <td />
        </tr>
        <tr>
          <td>%</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={2}>Pivot Aligment</td>
          <td rowSpan={2} />
          <td>Center To Group</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Aligh to Object</td>
          <td />
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
  </TabItem>
  <TabItem value="staticparticles" label="Static Particles">
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
          <td rowSpan={4}>Commands</td>
          <td rowSpan={4} />
          <td rowSpan={2}>Ref's Select</td>
          <td rowSpan={2} />
          <td>+</td>
          <td />
        </tr>
        <tr>
          <td>-</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={2}>Selected</td>
          <td rowSpan={2} />
          <td>play</td>
          <td />
        </tr>
        <tr>
          <td>stop</td>
          <td />
        </tr>
      </tbody>
    </table>
  </TabItem>
  <TabItem value="detailobjects" label="Detail Objects">
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
          <td rowSpan={10}>Commands</td>
          <td rowSpan={10} />
          <td rowSpan={2}>First Initialize</td>
          <td rowSpan={2} />
        </tr>
        <tr></tr>
        <tr>
          <td rowSpan={2}>Reinitialize All</td>
          <td rowSpan={2} />
        </tr>
        <tr></tr>
        <tr>
          <td>Reinitialize Objects Only</td>
          <td />
        </tr>
        <tr>
          <td>Reinitialize Selected Slot Objects</td>
          <td />
        </tr>
        <tr>
          <td>Update Renderer</td>
          <td />
        </tr>
        <tr>
          <td>Clear Slots</td>
          <td />
        </tr>
        <tr>
          <td>Clear Details</td>
          <td />
        </tr>
        <tr>
          <td>Object List</td>
          <td />
        </tr>
      </tbody>
    </table>
  </TabItem>
  <TabItem value="aimap" label="AI Map">
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
          <td rowSpan={5}>Commands</td>
          <td rowSpan={5} />
          <td>Generate Full</td>
          <td />
        </tr>
        <tr>
          <td>Generate Selected</td>
          <td />
        </tr>
        <tr>
          <td>Clear AI Map</td>
          <td />
        </tr>
        <tr>
          <td>Smooth Selected</td>
          <td />
        </tr>
        <tr>
          <td>Reset Selected</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={2}>AI Map Nodes</td>
          <td rowSpan={2} />
          <td>Ignore Constraints</td>
          <td />
        </tr>
        <tr>
          <td>Auto Link</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={2}>Ignore materials</td>
          <td rowSpan={2} />
          <td>Add</td>
          <td />
        </tr>
        <tr>
          <td>X</td>
          <td />
        </tr>
        <tr>
          <td rowSpan={11}>Link Commands</td>
          <td rowSpan={11} />
          <td>Add</td>
          <td />
        </tr>
        <tr>
          <td>Delete</td>
          <td />
        </tr>
        <tr>
          <td>Invert</td>
          <td />
        </tr>
        <tr>
          <td>Up</td>
          <td />
        </tr>
        <tr>
          <td>Left</td>
          <td />
        </tr>
        <tr>
          <td>Right</td>
          <td />
        </tr>
        <tr>
          <td>Down</td>
          <td />
        </tr>
        <tr>
          <td>X</td>
          <td />
        </tr>
        <tr>
          <td>Select 0-Link</td>
          <td />
        </tr>
        <tr>
          <td>Select 1-Link</td>
          <td />
        </tr>
        <tr>
          <td>Select 2-Link</td>
          <td />
        </tr>
      </tbody>
    </table>
  </TabItem>
  <TabItem value="fogvolume" label="Fog Volume">
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
          <td rowSpan={2}>Commands</td>
          <td rowSpan={2} />
          <td>Group Selected</td>
          <td />
        </tr>
        <tr>
          <td>UnGroup Selected</td>
          <td />
        </tr>
      </tbody>
    </table>
  </TabItem>
</Tabs>
