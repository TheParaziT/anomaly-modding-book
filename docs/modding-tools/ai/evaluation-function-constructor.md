---
title: Evaluation Function Constructor
tags: [Alife, AI, Modding Tool]
---

# Evaluation Function Constructor

___

## Info

<table>
  <tbody>
    <tr>
      <td>Program Developer</td>
      <td><Authors
          authors={['gsc_game_world']}
          size="small"
          showTitle={false}
        /></td>
    </tr>
    <tr>
      <td>Described Version</td>
      <td>0.564</td>
    </tr>
  </tbody>
</table>

## About

Program for creating evaluation functions.

## Switches

<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>-p &lt;name&gt;</td>
      <td>Obligatory switch with project name</td>
    </tr>
    <tr>
      <td>-pa</td>
      <td>Perform operations for all projects</td>
    </tr>
    <tr>
      <td>-c[d]</td>
      <td>
        Convert text to binary data and generate initial patterns. <br />d - Show duplicates being found in text data
      </td>
    </tr>
    <tr>
      <td>
        -g\{{"c,p\[s],b"}}
      </td>
      <td>
        gc - Generate configurations from atomic features based on test data. <br />gp - generate patterns from configurations being generated. <br />gps - Show all configurations during generation. <br />gb - Generate pattern basis from patterns being generated
      </td>
    </tr>
    <tr>
      <td>-f[p,u]</td>
      <td>
        Fit weights of pattern configurations. <br />p - Force to use probabilistic weight fitting algorithm. <br />u - Force to use previous parameters if exist
      </td>
    </tr>
    <tr>
      <td>-l</td>
      <td>List stats on test data</td>
    </tr>
    <tr>
      <td>-s</td>
      <td>List sorted stats on test data</td>
    </tr>
    <tr>
      <td>-w</td>
      <td>List pattern configuration weights</td>
    </tr>
    <tr>
      <td>-b[f]</td>
      <td>
        Build evaluation function. <br />f - Save parameters in float (default is double)
      </td>
    </tr>
    <tr>
      <td>-v</td>
      <td>Validate evaluation function</td>
    </tr>
    <tr>
      <td>-a</td>
      <td>Append log file</td>
    </tr>
    <tr>
      <td>-h, -?, -i</td>
      <td>Help</td>
    </tr>
  </tbody>
</table>
