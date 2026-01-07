---
title: Creating *.efd
tags:
  - AI
  - efd
description: Guide for creating *.efd
draft: true
---

# Creating *.efd

___

<Authors
  authors={["theparazit"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## About

*.efd файлы требуются для облегченых просчетов вероятностей в Offline. Например столкновение мутантов и сталкеров между собой, аномалиями и т.п.

### Get program

Для создания *.efd файла нам потребуется программа Evaluation Function Constructor. Чтобы ее получить ее потребуется скопилировать ее из исходников или скачать уже скомипилированную версию из последнего релиза на GitHub (Utilities). Нам нужен лишь EFC.exe.

### Start

После того, как вы получили программу, нужно создать главный кофигурационый *.ini файл.

:::warning
Обязательно назовите файл "efc.ini"!
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

### Creating project

EFC работает по проектному решению, что означает, что вам нужны "проекты" в виде папок с файлами.

:::info
  Создайте папку с именем project_01 - это будет название проекта.

  Внутри каждого проекта должен быть *.txt файл содержащий параметры проекта
    :::warning
    имя \*.txt файла проекта должно быть "examples.txt"!
    :::

### Generate 