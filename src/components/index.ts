// index.ts
/**
 * Главный файл экспорта компонентов UI библиотеки
 * 
 * @module Components
 * 
 * @description
 * Этот файл экспортирует все основные компоненты UI библиотеки для S.T.A.L.K.E.R. моддинг документации.
 * 
 * @example
 * ```tsx
 * // Импорт отдельных компонентов
 * import { UniversalCard, HeroSection, Authors } from './components';
 * 
 * // Импорт всех компонентов
 * import * as Components from './components';
 * ```
 */

// Component exports
export { default as Authors } from './Authors';
export { default as AuthorComment } from './AuthorComment';
export { default as UniversalCard } from './UniversalCard';
export { default as CardGrid } from './CardGrid';
export { default as YouTubeVideo } from './YouTubeVideo';
export { default as GlossaryTable } from './GlossaryTable';
export { default as ExpandableDataTable } from './ExpandableDataTable';
export { default as DetailTable } from './DetailTable';
export { default as WaveSurferPlayer } from './WaveSurferPlayer';
export { default as SectionNavigator } from './SectionNavigator';
export { default as HeroSection } from './HeroSection';
export { default as SocialIcon } from './SocialIcon';
export { default as Icon } from './Icon';
export { default as LoadingSpinner } from './LoadingSpinner';
export { default as ErrorBoundary } from './ErrorBoundary';

// Type exports
export * from '../types';