---
title: Fluid Emitter
tags:
    - LTX
draft: false
---

# Fluid Emitter

___

## About

Configuration parameters for fluid emmiter

## General

<table>
  <thead>
    <tr>
      <th>Parameter Name</th>
      <th>Parameter Description</th>
      <th>Example Value</th>
      <th>Possible Parameters</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type</td>
      <td>Emitter type</td>
      <td>SimpleGaussian</td>
      <td>
        SimpleGaussian
        <br />SimpleDraught
      </td>
    </tr>
    <tr>
      <td>Position</td>
      <td>Local coordinates of the emitter center in volume space</td>
      <td>0.5, 0.5, 0.5</td>
      <td>
        X --- 0.0 - 1.0
        <br />Y --- 0.0 - 1.0
        <br />Z --- 0.0 - 1.0
      </td>
    </tr>
    <tr>
      <td>WorldPosition</td>
      <td>`Position` alternative: global coordinates in world space</td>
      <td>10.0, 2.0, 15.0</td>
      <td>XYZ</td>
    </tr>
    <tr>
      <td>Radius</td>
      <td>Emitter influence radius</td>
      <td>0.4</td>
      <td>&gt;0.0</td>
    </tr>
    <tr>
      <td>Sigma</td>
      <td>Gaussian distribution width parameter</td>
      <td>0.2</td>
      <td>&gt;0.0</td>
    </tr>
    <tr>
      <td>FlowDirection</td>
      <td>Flow direction</td>
      <td>0, 1, 0</td>
      <td>
        X --- -1.0 - 1.0
        <br />Y --- -1.0 - 1.0
        <br />Z --- -1.0 - 1.0
      </td>
    </tr>
    <tr>
      <td>FlowSpeed</td>
      <td>Flow speed</td>
      <td>1.5</td>
      <td>≥0.0</td>
    </tr>
    <tr>
      <td>Density</td>
      <td>Maximum fluid density at the center of the emitter</td>
      <td>1.0</td>
      <td>≥0.0</td>
    </tr>
    <tr>
      <td>ApplyDensity</td>
      <td>Does the emitter affect the density field</td>
      <td>true</td>
      <td>true/false</td>
    </tr>
    <tr>
      <td>ApplyImpulse</td>
      <td>Does the emitter affect the velocity field</td>
      <td>true</td>
      <td>true/false</td>
    </tr>
  </tbody>
</table>

## Specific parameters for SimpleDraught

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| DraughtPeriod | Pulsation period | 1.5 | ≥0.0 |
| DraughtPhase | Initial pulsation phase | 0.0 | 0.0-2π |
| DraughtAmp | Pulsation amplitude | 0.7 | ≥0.0 |
