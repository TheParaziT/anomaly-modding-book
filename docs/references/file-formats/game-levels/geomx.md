---
title: "*.geomx"
draft: false
---

# *.geomx

___

## About

*.geomx files contain geometry buffer data that serves as an alternative to the standard [*.geom](geom.md) format. The engine loads these files during level initialization as part of a two-stage geometry loading process:

- First, it loads the standard `level.geom` file containing vertex buffers (VB), index buffers (IB), and sliding window items (SWI)
- Then it loads the `level.geomx` file as alternate/fast geometry data
