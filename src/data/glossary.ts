import { GlossaryData } from '../types/glossary';

const glossaryData: GlossaryData = {
  categories: [
    'Game Concepts',
    'Technical Terms',
    'Modding Terminology',
    'Engine Components'
  ],
  terms: [
    {
      id: "anomaly",
      term: "Anomaly",
      definition: "A zone with unusual physical properties that can be hazardous to humans. Anomalies often contain artifacts and can damage or kill stalkers who enter them.",
      category: "Game Concepts",
      related: [
        { id: "artifact", term: "Artifact" },
        { id: "emission", term: "Emission" }
      ]
    },
    {
      id: "artifact",
      term: "Artifact",
      definition: "An object formed in anomalies that possesses unusual properties. Artifacts can be sold or used to enhance a stalker's abilities.",
      category: "Game Concepts",
      related: [
        { id: "anomaly", term: "Anomaly" }
      ]
    },
    {
      id: "xray-engine",
      term: "X-Ray Engine",
      definition: "The game engine used by the S.T.A.L.K.E.R. series. It's known for its advanced AI system called A-Life and its dynamic world simulation.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "alife",
      term: "A-Life",
      definition: "The artificial life system in S.T.A.L.K.E.R. that controls NPC behavior and world events independently of the player's actions.",
      category: "Technical Terms",
      related: [
        { id: "xray-engine", term: "X-Ray Engine" }
      ]
    },
    {
      id: "emission",
      term: "Emission",
      definition: "A catastrophic release of energy from the Zone that transforms living beings and creates new anomalies.",
      category: "Game Concepts",
      related: [
        { id: "anomaly", term: "Anomaly" }
      ]
    },
    {
      id: "addon",
      term: "Addon",
      definition: "A modification that adds new content or features to the game without changing core gameplay mechanics.",
      category: "Modding Terminology",
      related: [
        { id: "mod", term: "Mod" }
      ]
    },
    {
      id: "mod",
      term: "Mod",
      definition: "Short for modification, a user-made alteration to the game that changes or expands its content, mechanics, or visuals.",
      category: "Modding Terminology",
      related: [
        { id: "addon", term: "Addon" }
      ]
    },
    {
      id: "offline",
      term: "Offline",
      definition: "Simulation of life in any given radius from the player will be calculated by a simplified formula.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "online",
      term: "Online",
      definition: "Simulating life within any given radius of the player will be completely calculated.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "anim-point",
      term: "Animation Point",
      definition: "Key positions in which the animation should be played.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "finite-state-machine",
      term: "Finite State Machine",
      definition: "Common and convenient technique for programming the behavior of bots (NPCs) in computer games.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "goal-oriented-action-planning",
      term: "Goal Oriented Action Planning",
      definition: "AI design technique in which a chain of behaviors of agents (NPCs, abstract entities, living obstacles) is automatically selected in real time to satisfy a goal.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "motivation-graph",
      term: "Motivation Graph",
      definition: "Decision-making method described in AI Game Programming Wisdom 2, which, according to the authors, is something between Decision Trees and Neural Networks.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "graph-point",
      term: "Graph Point",
      definition: "Monsters and stalkers in offline move on graph points.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "gulag",
      term: "Gulag",
      definition: "Gulags control a set of stalkers together by assigning them each tasks by task priority. For example a gulag could contain tasks for patrolling an area and sitting at a campfire. The priority of these tasks will mean that the first stalker caught by the gulag (that is, the first stalker to be given over to the gulag's control) will patrol the area with subsequent caught stalkers simply sitting at a fire. A stalker is caught by a gulag be entering the associated Smart Terrain.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "ai-map",
      term: "AI-Map",
      definition: "AI-Map consisting of nodes.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "gvid",
      term: "gvid (game_vertex_id)",
      definition: "Graph Point index.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "lvid",
      term: "lvid (level_vertex_id)",
      definition: "AI-Map node.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "smart-cover",
      term: "Smart Cover",
      definition: "A system designed to control the behavior of NPCs when using cover.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "smart-terrain",
      term: "Smart Terrain",
      definition: "Area which, when entered by a stalker, captures that stalker and assigns them tasks to perform. These tasks are allocated by the smart terrain's controlling Gulag.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "space-restrictor",
      term: "Space Restrictor",
      definition: "An object that defines zones with special properties or restrictions in the game space.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "way-point",
      term: "Way Point",
      definition: "A predetermined point on the map that serves as a reference point for NPCs. Waypoints indicate their movement pattern or where they should go.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "info-portion",
      term: "Info Portion",
      definition: "It is a piece of information that can be passed between characters, saved in quests, or used for AI decision making.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "hud-animation",
      term: "*_hud animation",
      definition: "Animations for the *_hud object.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "motion-mark",
      term: "Motion Mark",
      definition: "Time intervals in the animation in which something happens.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "motion-reference",
      term: "Motion Reference",
      definition: "Reference to the animation library *.omf.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "luabind",
      term: "Luabind",
      definition: "Luabind is a library that helps you create bindings between C++ and Lua. It has the ability to expose functions and classes, written in C++, to Lua. It will also supply the functionality to define classes in lua and let them derive from other lua classes or C++ classes. Lua classes can override virtual functions from their C++ base classes. It is written towards Lua 5.x, and does not work with Lua 4.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "Luajit",
      term: "LuaJIT",
      definition: "LuaJIT is a Just-In-Time Compiler for the Lua programming language. Anomaly uses LuaJIT 2.0.4.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "xrai",
      term: "xrAI",
      definition: "AI-Map Compiler.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "xrdo",
      term: "xrDO",
      definition: "Detail Object Compiler.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "xrlc",
      term: "xrLC",
      definition: "Level Compiler.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "game-material",
      term: "Game Material",
      definition: "Responsible for the physical feature of the surface (friction, damping, etc.).",
      category: "Technical Terms",
      related: []
    },
    {
      id: "dynamic-object",
      term: "Dynamic Object",
      definition: "An object that uses bones.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "multiply-usage-object",
      term: "Multiply Usage Object",
      definition: "An object that creates an Imposter texture of the same object.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "hud",
      term: "*_hud",
      definition: "*_hud is a model in front of the player in the hands of the character. Usually it is a model of a weapon, grenades, hands.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "world",
      term: "*_world",
      definition: "*_world is a model in-game world (NPC weapons, 3rd-person view). The difference from the *_hud model is that the *_world must have a collision to calculate the interaction with the game.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "detail-object",
      term: "Detail Object",
      definition: "Static object (grass, rocks, debris and other landscape details) with high optimization to display a large number of small objects without significant performance loss.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "static-object",
      term: "Static Object",
      definition: "Static Object.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "scene-object",
      term: "Scene Object",
      definition: "An object in the SDK that represents a reference object that uses a model to visualize and interact with the environment.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "light-source-object",
      term: "Light Source Object",
      definition: "Light source.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "sound-source-object",
      term: "Sound Source Object",
      definition: "Sound source.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "sound-environment-object",
      term: "Sound Environment Object",
      definition: "Object with environmental sound effects.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "glow-object",
      term: "Glow Object",
      definition: "Glow Object.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "fog-volume-object",
      term: "Fog Volume Object",
      definition: "A object to simulate dynamic volumetric fog, smoke and other gaseous effects.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "sound-occluder-mesh",
      term: "Sound Occluder Mesh",
      definition: "Geometry for calculating sound propagation.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "custom-data",
      term: "Custom Data",
      definition: "Custom or additional parameters in *.ltx format.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "hierarchical-occluder-mesh",
      term: "Hierarchical Occluder Mesh",
      definition: "Geometry defining the visibility of an object to remove from the renderer.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "rigid",
      term: "Rigid",
      definition: "Joint type that completely restricts all transformations.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "cloth",
      term: "Cloth",
      definition: "Ball joint. Allows rotation in all directions, but without translation.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "joint",
      term: "Joint",
      definition: "Universal joint. Automatically selects the optimal physical connection type based on constraint analysis (between Hinge and FullControl(partially constrained axes)).",
      category: "Technical Terms",
      related: []
    },
    {
      id: "wheel",
      term: "Wheel",
      definition: "Hinge-2 joint. Allows rotation around the first axis (suspension axis) and rotation around the second axis (wheel axis).",
      category: "Technical Terms",
      related: []
    },
    {
      id: "slider",
      term: "Slider",
      definition: "Slider joint. Allows movement along one axis only.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "portal",
      term: "Portal",
      definition: "A portal between the two sectors.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "sector",
      term: "Sector",
      definition: "Sector is part of Portal Rendering. An area or section of virtual space that contains objects and geometry for rendering. Sectors help organize the scene, allowing you to control visibility and performance, especially in large worlds.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "hierarchical-occlusion-mapping",
      term: "Hierarchical Occlusion Mapping",
      definition: "Technique in computer graphics that uses a multi-resolution representation of occlusion information to efficiently culling objects that are not visible.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "progressive-meshes",
      term: "Progressive Meshes",
      definition: "One of the methods of dynamic level of detail. Only for Dynamic Objects.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "compile-shader",
      term: "Compile Shader",
      definition: "Shader used by the Level Compiler. Specifies to the compiler the features of the final game level geometry. The source geometry, depending on the compiler shader, may have different features.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "engine-shader",
      term: "Engine Shader",
      definition: "Shader responsible for the visual appearance of the surface.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "particle-effect",
      term: "Particle Effect",
      definition: "Single Particle Effect. Stored in *.pe files.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "particle-group",
      term: "Particle Group",
      definition: "Particle Effects Group. Stored in *.pg files.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "rigid-joint",
      term: "Rigid Joint",
      definition: "Joint type that completely restricts all transformations.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "xr-lc",
      term: "xrLC",
      definition: "Level Compiler.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "xr-ai",
      term: "xrAI",
      definition: "AI-Map Compiler.",
      category: "Technical Terms",
      related: []
    },
    {
      id: "xr-do",
      term: "xrDO",
      definition: "Detail Object Compiler.",
      category: "Technical Terms",
      related: []
    },
  ]
};

export default glossaryData;