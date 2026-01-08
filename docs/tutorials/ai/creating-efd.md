---
title: Creating *.efd
tags:
  - AI
  - efd
description: Guide for creating *.efd
draft: false
---

# Creating *.efd

___

:::warning
This article is under construction
:::

<Authors
  authors={["theparazit"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## About

[*.efd](../../references/file-formats/ai/efd.md) files are required for simplified probability calculations in <GlossaryTerm termId="offline">Offline</GlossaryTerm> mode. For example, encounters of mutants and stalkers with each other, anomalies, etc.

## Get program

To create an *.efd file, we need the Evaluation Function Constructor program. To obtain it, you will need to compile it from sources or download the precompiled version from the [latest release on GitHub](https://github.com/ixray-team/ixray-1.6-stcop/releases) (Utilities). We only need `EFC.exe`.

## Start

After you have obtained the program, you need to create the main configuration *.ini file. This file contains global settings, variables, and functions.

<UniversalCard
  title="Evaluation Function Constructor"
  content="List of all parameters."
  link="../../modding-tools/ai/evaluation-function-constructor"
  internal={true}
/>

:::warning
Be sure to name the file "`efc.ini`"!
:::

```ini title="efc.ini"
;File Names
  LogData = %s\efc.log
  TextData = %s\examples.txt
  BinaryData = %s\binary.dat
  ConfigData = %s\configs.dat
  PatternData = %s\patterns.dat
  CoreData = %s\core.dat
  ParametersData = %s\params.dat
  EFData = %s.efd

;Weight Fitting Parameters
  Epsilon = 0.00001
  Alpha = 1.0
  Beta = 0.01
  MaxIterationCount = 10000

;Probabilistic Weight Fitting Parameters
  RandomFactor = 4
  RandomProbability = 1
  RandomUpdate = 1
  RandomStartSeed = 0

;Configuration Generation Parameters
  MatchThreshold = 1
  MaxCardinality = 30

;Patterns Generation Parameters
  PatternExistanceCoefficient = 1.0

;Function Types

  ;Primary Functions
    Distance = 0
    GraphPointType0 = 1
    EquipmentType = 2
    ItemDeterioration = 3
    EquipmentPreference = 4
    MainWeaponType = 5
    MainWeaponPreference = 6
    ItemValue = 7
    WeaponAmmo = 8
    DetectorType = 9
  
    PersonalHealth = 21
    PersonalMorale = 22
    PersonalCreatureType = 23
    PersonalWeaponType = 24
    PersonalAccuracy = 25
    PersonalIntelligence = 26
    PersonalRelation = 27
    PersonalGreed = 28
    PersonalAggressiveness = 29
    PersonalEyeRange = 30
    PersonalMaxHealth = 31

    EnemyHealth = 41
    EnemyCreatureType = 42
    EnemyWeaponType = 43
    EnemyEquipmentCost = 44
    EnemyRukzakWeight = 45
    EnemyAnomality = 46
    EnemyEyeRange = 47
    EnemyMaxHealth = 48
    EnemyAnomalyType = 49
    EnemyDistanceToGraphPoint = 50

  ;Complex Functions
    WeaponEffectiveness = 61
    CreatureEffectiveness = 62
    IntCreatureEffectiveness = 63
    AccWeaponEffectiveness = 64
    FinCreatureEffectiveness = 65
    VictoryProbability = 66
    EntityCost = 67
    Expediency = 68
    SurgeDeathProbability = 69
    EquipmentValue = 70
    MainWeaponValue = 71
    SmallWeaponValue = 72
    TerrainType = 73
    WeaponAttackTimes = 74
    WeaponSuccessProbability = 75
    EnemyDetectability = 76
    EnemyDetectProbability = 77
    EnemyRetreatProbability = 78
    AnomalyDetectProbability = 79
    AnomalyInteractProbability = 80
    AnomalyRetreatProbability = 81
    BirthPercentage = 82	
    BirthProbability = 83	
    BirthSpeed = 84
```

## Creating project

The Evaluation Function Constructor operates based on a project design, which means you need "projects" in the form of folders containing files.

:::info
  Create a folder named `project1` inside the `data` folder—this will be the name of the project.

  Each project must contain a *.txt file with the project parameters.
    :::warning
    The name of the project's \*.txt file must be "`examples.txt`"!
    :::

:::info
Directory structure example:

```txt
data/
├── project1/
│   ├── examples.txt      (input)
│   ├── binary.dat        (stage 1)
│   ├── configs.dat       (stage 2)
│   ├── patterns.dat      (stage 3)
│   ├── core.dat          (stage 4)
│   ├── params.dat        (stage 5)
│   ├── ef.dat            (stage 6)
│   └── efc.log           (logging)
├── project2/
│   └── ...
└── projectN/
    └── ...
```
:::

### Project config

This text-based file contains training data in the form of test examples with associated expected results that the system uses to discover patterns and optimize weights. Let's break it down line by line.

:::info

example.txt example:

```txt
<variable_count>
<function_type>
<value1_min> <value1_max>
<value2_min> <value2_max>
...
<example1_var1> <example1_var2> ... <example1_result>
<example2_var1> <example2_var2> ... <example2_result>
...
```
:::

#### Header Line 1: Variable Ranges

The first line contains space-separated integers, each representing the number of possible values for one variable (`range_1 range_2 range_3 ... range_N`).

#### Header Line 2: Variable Type Names

:::warning
Must be defined in efc.ini!
:::

The second line contains space-separated strings identifying the semantic type of each variable (`type_1 type_2 type_3 ... type_N`).

#### Header Line 3: Function Type Name

:::warning
Must be defined in efc.ini!
:::

The third line contains a single string identifying the type of evaluation function (`function_type_name`).

#### Test Example Lines: Training Data

Each subsequent line (lines 4 through end-of-file) represents one test example, containing variable values followed by the expected evaluation result (`value_1 value_2 value_3 ... value_N expected_result`). This is are the ground truth examples that teach the system how to evaluate different variable combinations

### Example

Now that we know the purpose of each line, we can create our own file or explore existing ones.

```txt title="Example"
5 3 4 2  
Distance PersonalHealth PersonalMorale PersonalWeaponType 
1 2 1 1 12.5
2 1 3 2 8.3  
3 3 2 1 15.7  
4 1 1 2 6.2  
5 2 3 1 11.9  
1 2 1 1 13.1  
2 1 3 2 7.9  
```

For example, the first training line means: When `Distance = 1`, `PersonalHealth = 2`, `PersonalMorale = 1`, `PersonalWeaponType = 1`, the evaluation should be 12.5

## Seven-Stage Pipeline Execution 

The complete pipeline executes seven sequential stages. Each stage can be run independently if prerequisite files exist.

### Stage 1: Convert Text to Binary

```bash
efc.exe -p project_name -c
```

- Inputs:

  - data/project_name/examples.txt

- Outputs:

  - data/project_name/binary.dat - Binary test data
  - data/project_name/patterns.dat - Initial single-variable patterns

- Optional flag: 

  - Add -cd to display duplicates found during conversion.

### Stage 2: Generate Configurations

```bash
efc.exe -p project_name -gc
```

- Inputs:

  - data/project_name/binary.dat

- Outputs:

  - data/project_name/configs.dat - Configuration bit masks by cardinality

### Stage 3: Generate Patterns

```bash
efc.exe -p project_name -gp
```

- Inputs:

  - data/project_name/binary.dat
  - data/project_name/configs.dat

- Outputs:

  - data/project_name/patterns.dat - Filtered, non-redundant patterns

- Optional flag: 

  - Add -gps to show all configurations during generation.

### Stage 4: Generate Pattern Basis

```bash
efc.exe -p project_name -gb
```

- Inputs:

  - data/project_name/binary.dat
  - data/project_name/patterns.dat

- Outputs:

  - data/project_name/core.dat - Combined test and pattern data

### Stage 5: Optimize Parameters

```bash
efc.exe -p project_name -f
```

- Inputs:

  - data/project_name/core.dat

- Outputs:

  - data/project_name/params.dat - Optimized pattern weights

- Optional flags:

  - -fp - Force probabilistic weight fitting (random perturbations)
  - -fu - Use previous parameters as starting point if they exist

### Stage 6: Build Evaluation Function

```bash
efc.exe -p project_name -b
```

- Inputs:

  - data/project_name/core.dat
  - data/project_name/params.dat

- Outputs:

  - data/project_name.dat - Final evaluation function (note: no subdirectory)

- Optional flag:

  - Add -bf to save parameters as floats instead of doubles.

### Stage 7: Validate Evaluation Function

```bash
efc.exe -p project_name -v
```

- Inputs:

  - data/project_name.dat

- Outputs:

  - Interactive console validation interface

## Common Workflows

### Complete Pipeline Execution

```bash title="Run all stages in a single command"
efc.exe -p project_name -c -gc -gp -gb -f -b -v
```

This executes all seven stages sequentially using the same project data.

### Multi-Project Batch Processing

```bash
efc.exe -pa -c -gc -gp -gb -f -b
```

## Sources

[DeepWiki](https://deepwiki.com/TheParaziT/Evaluation-Function-Constructor/1.3-quick-start-guide)
