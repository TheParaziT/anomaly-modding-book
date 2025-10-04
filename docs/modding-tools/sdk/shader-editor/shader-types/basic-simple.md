---
description: Basic simple shader type
title: Basic Simple
---

# Basic Simple

___

## About

A basic shader, with a wide range of features. Supports transformation, different types of blending, adjusting the effect of lighting on it and Z-buffering. Used for most effects, such as glow

## Base Texture

<table><thead>
  <tr>
    <th></th>
    <th>Description</th>
    <th>Options</th>
    <th>Description</th>
    <th>Options</th>
    <th>Description</th>
    <th>Options</th>
    <th>Description</th>
  </tr></thead>
<tbody>
  <tr>
    <td rowspan="10">Name</td>
    <td rowspan="10"></td>
    <td>Custom</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$null</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base0</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base1</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base2</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base3</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base4</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base5</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base6</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base7</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="20">Transform</td>
    <td rowspan="20"></td>
    <td rowspan="11">Custom</td>
    <td rowspan="11"></td>
    <td>Programmable</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="8">TCM</td>
    <td rowspan="8"></td>
    <td>Scale enabled</td>
    <td></td>
  </tr>
  <tr>
    <td>Scale U</td>
    <td></td>
  </tr>
  <tr>
    <td>Scale V</td>
    <td></td>
  </tr>
  <tr>
    <td>Rotate enabled</td>
    <td></td>
  </tr>
  <tr>
    <td>Rotate</td>
    <td></td>
  </tr>
  <tr>
    <td>Scroll enabled</td>
    <td></td>
  </tr>
  <tr>
    <td>Scroll U</td>
    <td></td>
  </tr>
  <tr>
    <td>Scroll V</td>
    <td></td>
  </tr>
  <tr>
    <td>Spherical Reflection</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Cube Reflection</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$null</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base0</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base1</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base2</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base3</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base4</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base5</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base6</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>$base7</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="10">Blending</td>
    <td rowspan="10"></td>
    <td>SET</td>
    <td>Simple color change (no blending)</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>BLEND</td>
    <td>Standard Alpha Blending (SRCALPHA, INVSRCALPHA)</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>ADD</td>
    <td>Additive Overlay (ONE, ONE)</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>MUL</td>
    <td>Color multiplication (DESTCOLOR, ZERO)</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>MUL_2X</td>
    <td>Multiplication with brightness doubling (DESTCOLOR, SRCCOLOR)</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>ALPHA-ADD</td>
    <td>Additive overlay with alpha channel (SRCALPHA, ONE)</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>MUL_2X (B^D)</td>
    <td>Multiplication 2X + Alpha Test (used for decals)</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SET (2r)</td>
    <td>Two-pass SET</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>BLEND (2r)</td>
    <td>Two-pass BLEND</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>BLEND (4r)</td>
    <td>Four-pass BLEND</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Texture clamp</td>
    <td>Parameter that controls the method of texture overlay outside the standard texture coordinates [0, 1]</td>
    <td>-</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Alpha ref</td>
    <td>Parameter that defines the transparency threshold value when using Alpha Test in rendering</td>
    <td>-</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Z-test</td>
    <td>Enables the process of comparing the depth (Z-coordinate) of the current pixel with the corresponding value in the Z-buffer (depth buffer)</td>
    <td>-</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Z-write</td>
    <td>Enables whether to allow or disallow the Z-buffer to be updated after passing the Z-test</td>
    <td>-</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Lighting</td>
    <td></td>
    <td>-</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Fog</td>
    <td></td>
    <td>-</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</tbody></table>
