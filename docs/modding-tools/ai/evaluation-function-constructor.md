---
title: Evaluation Function Constructor
tags:
  - Alife
  - AI
  - Modding Tool
draft: false
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
    <tr>
      <td>Documentation</td>
      <td>[DeepWiki](https://deepwiki.com/TheParaziT/Evaluation-Function-Constructor)</td>
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
        Convert text to binary data and generate initial patterns. <br /><ul>d - Show duplicates being found in text data</ul>
      </td>
    </tr>
    <tr>
      <td>
        -g\{{"c,p\[s],b"}}
      </td>
      <td>
        <ul>gc - Generate configurations from atomic features based on test data. <br />gp - generate patterns from configurations being generated. <br />gps - Show all configurations during generation. <br />gb - Generate pattern basis from patterns being generated</ul>
      </td>
    </tr>
    <tr>
      <td>-f[p,u]</td>
      <td>
        Fit weights of pattern configurations. <br /><ul>p - Force to use probabilistic weight fitting algorithm. <br />u - Force to use previous parameters if exist</ul>
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
        Build evaluation function. <br /><ul>f - Save parameters in float (default is double)</ul>
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

## Config file

Parameters contained in `efc.ini`.

### File Names

| Key | Description |
|---|---|
| LogData | Dual output log file |
| TextData | Human-readable training data |
| BinaryData | Binary test data with duplicates removed |
| ConfigData | Configurations organized by cardinality |
| PatternData | Filtered pattern specifications |
| CoreData | Complete specification (test + patterns) |
| ParametersData | Optimized double-precision weights |
| EFData | Final packaged evaluation function |

### Weight Fitting Parameters

These four parameters control the gradient descent optimization algorithm that learns pattern weights from training data. The algorithm implements momentum-based gradient descent with configurable convergence criteria.

| Key | Description |
|---|---|
| Epsilon | Convergence Threshold. Defines the minimum per-test-example improvement in squared error required to continue optimization |
| Alpha | Learning Rate. Scales the gradient magnitude during parameter updates. Larger values take bigger steps in parameter space |
| Beta | Momentum Coefficient. Weights the previous update direction in the current update, enabling momentum to accelerate convergence and escape shallow local minima. |
| MaxIterationCount | Safety Limit. Hard upper bound on optimization iterations to prevent infinite loops or excessive runtime |

### Probabilistic Weight Fitting Parameters

These parameters enable stochastic perturbation during optimization to escape local minima. When active, random subsets of parameters are temporarily frozen while others are updated, creating exploration dynamics.

<table><thead>
  <tr>
    <th>Key</th>
    <th>Description</th>
  </tr></thead>
<tbody>
  <tr>
    <td>RandomFactor</td>
    <td rowspan="2">Exploration Rate. Together determine the fraction of parameters randomly frozen during each update cycle. Each parameter has RandomProbability / RandomFactor chance of being frozen</td>
  </tr>
  <tr>
    <td>RandomProbability</td>
  </tr>
  <tr>
    <td>RandomUpdate</td>
    <td>Refresh Interval. Controls how many iterations use the same random mask before regenerating. Lower values increase variability, higher values provide stability</td>
  </tr>
  <tr>
    <td>RandomStartSeed</td>
    <td>Reproducibility. Initializes the pseudo-random number generator for reproducible experiments. Same seed produces identical random sequences</td>
  </tr>
</tbody>
</table>

### Configuration Generation Parameters

These parameters control the complexity and filtering of patterns generated during the configuration and pattern generation stages. They determine which variable combinations are considered as features for the evaluation function.

| Key | Description |
|---|---|
| MatchThreshold | Minimum Pattern Frequency. Defines the minimum number of test examples in which a configuration must appear to be considered as a viable pattern. Acts as a frequency filter during configuration generation |
| MaxCardinality | Pattern Complexity Limit. Limits the maximum number of variables that can be combined in a single pattern. Controls the combinatorial explosion during configuration generation |

### Patterns Generation Parameters

| Key | Description |
|---|---|
| PatternExistanceCoefficient | Coverage Threshold. Filters patterns based on their coverage ratio: count / complexity. A pattern must appear in at least this fraction of its possible instantiations to be kept |

### Function Types

#### Primary Functions

| Key | Description |
|---|---|
| Distance |  |
| GraphPointType0 |  |
| EquipmentType |  |
| ItemDeterioration |  |
| EquipmentPreference |  |
| MainWeaponType |  |
| MainWeaponPreference |  |
| ItemValue |  |
| WeaponAmmo |  |
| DetectorType |  |
| PersonalHealth |  |
| PersonalMorale |  |
| PersonalCreatureType |  |
| PersonalWeaponType |  |
| PersonalAccuracy |  |
| PersonalIntelligence |  |
| PersonalRelation |  |
| PersonalGreed |  |
| PersonalAggressiveness |  |
| PersonalEyeRange |  |
| PersonalMaxHealth |  |
| EnemyHealth |  |
| EnemyCreatureType |  |
| EnemyWeaponType |  |
| EnemyEquipmentCost |  |
| EnemyRukzakWeight |  |
| EnemyAnomality |  |
| EnemyEyeRange |  |
| EnemyMaxHealth |  |
| EnemyAnomalyType |  |
| EnemyDistanceToGraphPoint |  |

#### Complex Functions

| Key | Description |
|---|---|
| WeaponEffectiveness |  |
| CreatureEffectiveness |  |
| IntCreatureEffectiveness |  |
| AccWeaponEffectiveness |  |
| FinCreatureEffectiveness |  |
| VictoryProbability |  |
| EntityCost |  |
| Expediency |  |
| SurgeDeathProbability |  |
| EquipmentValue |  |
| MainWeaponValue |  |
| SmallWeaponValue |  |
| TerrainType |  |
| WeaponAttackTimes |  |
| WeaponSuccessProbability |  |
| EnemyDetectability |  |
| EnemyDetectProbability |  |
| AnomalyDetectProbability |  |
| AnomalyInteractProbability |  |
| AnomalyRetreatProbability |  |
| BirthPercentage |  |
| BirthProbability |  |
| BirthSpeed |  |
