// glossary.ts
import { GlossaryData } from '../types/glossary';

/**
 * Данные глоссария для S.T.A.L.K.E.R. моддинга - содержит термины, определения и категории
 * 
 * @constant
 * @type {GlossaryData}
 * 
 * @property {string[]} categories - Категории терминов
 * @property {GlossaryTerm[]} terms - Массив терминов глоссария
 * 
 * @example
 * ```ts
 * import glossaryData from './glossary';
 * 
 * console.log(glossaryData.categories); // ['Game Concepts', 'Technical Terms', ...]
 * console.log(glossaryData.terms[0].term); // 'Anomaly'
 * ```
 */
const glossaryData: GlossaryData = {
  categories: ['Game Concepts', 'Technical Terms', 'Modding Terminology', 'Engine Components'],
  terms: [
    {
      id: 'anomaly',
      term: 'Anomaly',
      definition:
        'A zone with unusual physical properties that can be hazardous to humans. Anomalies often contain artifacts and can damage or kill stalkers who enter them.',
      category: 'Game Concepts',
      related: [
        { id: 'artifact', term: 'Artifact' },
        { id: 'emission', term: 'Emission' },
      ],
    },
    {
      id: 'artifact',
      term: 'Artifact',
      definition:
        "An object formed in anomalies that possesses unusual properties. Artifacts can be sold or used to enhance a stalker's abilities.",
      category: 'Game Concepts',
      related: [{ id: 'anomaly', term: 'Anomaly' }],
    },
    {
      id: 'xray-engine',
      term: 'X-Ray Engine',
      definition:
        "The game engine used by the S.T.A.L.K.E.R. series. It's known for its advanced AI system called A-Life and its dynamic world simulation.",
      category: 'Technical Terms',
      related: [],
    },
    {
      id: 'alife',
      term: 'A-Life',
      definition:
        "The artificial life system in S.T.A.L.K.E.R. that controls NPC behavior and world events independently of the player's actions.",
      category: 'Technical Terms',
      related: [{ id: 'xray-engine', term: 'X-Ray Engine' }],
    },
    // ... остальные термины
  ],
};

export default glossaryData;