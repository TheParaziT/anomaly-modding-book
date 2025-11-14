---
title: Fluid Volume
draft: false
---

# Fluid Volume

___

## About

Configuration parameters for fluid volume

## General

| Parameter Name | Parameter Description | Example Value | Possible Parameters |
|---|---|---|---|
| Type | Simulation type | Fog | FogFire |
| Hemi | Hemispherical attenuation coefficient | 0.2 | 0.0 - 1.0 |
| ConfinementScale | Force “holding” the fluid within the volume boundaries (viscosity) | 0.06 | 0.0 - 1.0 |
| Decay | Rate of exponential density decay | 0.994 | 0.9 - 0.999 |
| GravityBuoyancy | Influence of gravity | 0.1 | -1.0 - 1.0 |
| EmittersNum | Number of fluid sources ([emitters](fluid-emitter.md)) | 2 | - |
