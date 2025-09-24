import type { ReactNode } from 'react';

// ============================================================================
// CORE COMPONENT TYPES
// ============================================================================

export interface UniversalCardProps {
  title: string;
  content: string | ReactNode;
  image?: string;
  link: string;
  linkText?: string;
  internal?: boolean;
  className?: string;
}

export interface CardGridProps {
  children?: ReactNode;
  items?: UniversalCardProps[];
  columns?: 2 | 3 | 4;
}

export interface YouTubeVideoProps {
  id: string;
  title: string;
}

// ============================================================================
// AUTHOR TYPES
// ============================================================================

export interface AuthorSocials {
  github?: string;
  twitter?: string;
  linkedin?: string;
  x?: string;
  stackoverflow?: string;
  email?: string;
  website?: string;
  vk?: string;
  telegram?: string;
  moddb?: string;
  discord?: string;
  youtube?: string;
  custom?: {
    label: string;
    url: string;
    icon: string;
  };
}

export interface AuthorData {
  name: string;
  title: string;
  url?: string;
  image_url: string;
  socials?: AuthorSocials;
  description?: string;
}

export interface Author extends AuthorData {
  key: string;
  discord_username?: string;
}

export interface AuthorsProps {
  authors: string[];
  size?: 'small' | 'medium' | 'large';
  showTitle?: boolean;
  showDescription?: boolean;
}

// ============================================================================
// GLOSSARY TYPES
// ============================================================================

export interface RelatedTerm {
  id: string;
  term: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category?: string;
  related?: RelatedTerm[];
}

export interface GlossaryData {
  terms: GlossaryTerm[];
  categories: string[];
}

export interface GlossaryTableProps {
  data: GlossaryData;
}

// ============================================================================
// THEME TYPES
// ============================================================================

export interface MDXComponentsType {
  [key: string]: React.ComponentType<any>;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export type ComponentSize = 'small' | 'medium' | 'large';

// ============================================================================
// MODULE DECLARATIONS
// ============================================================================
// Note: Module declarations should be in .d.ts files, not in regular .ts files
