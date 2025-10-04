---
tags:
  - Under Construction
title: Engine Classes List
draft: true
---

# Engine Classes List

___

:::warning
This article is under construction
:::

## Client classes

- CGameTask
- CGameObject
  - ANY_CLASS
  - DLL_Pure
    - ICollidable
    - IRenderable
    - ISheduled
    - ce_smart_zone
    - ce_script_zone
  - CActor
  - CAI_Stalker
  - CAI_Trader
  - CAI_Bloodsucker
  - CAI_Boar
  - CAI_Dog
  - CAI_Flesh
  - CAI_PseudoDog
  - CBurer
  - CCat
  - CChimera
  - CController
  - CFracture
  - CPoltergeist
  - CPseudoGigant
  - CPsyDog
  - CPsyDogPhantom
  - CSnork
  - CTushkano
  - CZombie
  - CAntirad
  - CBottleItem
  - CFoodItem
  - CMedkit
  - CTorch
  - CSimpleDetector
  - CAdvancedDetector
  - CEliteDetector
  - CScientificDetector
  - CGrenadeLauncher
  - CScope
  - CSilencer
  - hanging_lamp
  - CCar
  - CHelicopter
  - CPhysicObject
  - CDestroyablePhysicsObject
  - CExplosiveItem
  - CWeaponAmmo
  - CInventoryBox
  - CPda
  - CF1
  - CRGD5
  - CWeaponAK74
  - CWeaponAutomaticShotgun
  - CWeaponBinoculars
  - CWeaponBM16
  - CWeaponFN2000
  - CWeaponFORT
  - CWeaponGroza
  - CWeaponHPSA
  - CWeaponKnife
  - CWeaponLR300
  - CWeaponPM
  - CWeaponRG6
  - CWeaponRPG7
  - CWeaponShotgun
  - CWeaponSVD
  - CWeaponSVU
  - CWeaponUSP45
  - CWeaponVal
  - CWeaponVintorez
  - CWeaponWalther
  - CMincer
  - CMosquitoBald
  - CHairsZone
  - CRadioactiveZone
  - CTorridZone
  - CZoneCampfire
  - CLevelChanger
  - CSpaceRestrictor
  - smart_cover_object
  - CStalkerOutfit
  - CHelmet
  - CArtefact
    - CBastArtefact
    - CBlackDrops
    - CBlackGraviArtefact
    - CDummyArtefact
    - CElectricBall
    - CFadedBall
    - CGalantineArtefact
    - CGraviArtefact
    - CMercuryBall
    - CRustyHairArtefact
    - CThornArtefact
    - CZudaArtefact

## Server classes

- cse_abstract
  - cse_alife_graph_point
  - cse_temporary
  - cse_alife_object_climable
  - CSE_AbstractVisual
  - cse_alife_object
    - cse_alife_dynamic_object
      - cse_alife_space_restrictor
        - cse_alife_level_changer
        - cse_alife_team_base_zone
        - cse_alife_smart_zone
        - cse_alife_online_offline_group
        - cse_smart_cover
        - cse_custom_zone
          - cse_torrid_zone
          - cse_anomalous_zone
          - cse_zone_visual
        - cse_alife_dynamic_object_visual
          - cse_alife_car
          - cse_alife_helicopter
          - cse_alife_inventory_box
          - cse_alife_mounted_weapon
          - cse_alife_object_breakable
          - cse_alife_object_hanging_lamp
          - cse_alife_object_physic
          - cse_alife_object_projector
          - cse_alife_ph_skeleton_object
          - cse_alife_trader
          - cse_alife_creature_abstract
            - cse_alife_item
              - cse_alife_item_ammo
              - cse_alife_item_artefact
              - cse_alife_item_bolt
              - cse_alife_item_custom_outfit
              - cse_alife_item_detector
              - cse_alife_item_document
              - cse_alife_item_explosive
              - cse_alife_item_grenade
              - cse_alife_item_pda
              - cse_alife_item_torch
              - cse_alife_item_weapon
                - cse_alife_item_weapon_auto_shotgun
                - cse_alife_item_weapon_magazined
                - cse_alife_item_weapon_magazined_w_gl
                - cse_alife_item_weapon_shotgun
