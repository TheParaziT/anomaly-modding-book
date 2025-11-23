// SectionNavigator.tsx
import React from 'react';
import Link from '@docusaurus/Link';

interface SectionItem {
  id: string;
  title: string;
  href: string;
  description?: string;
  icon?: string;
}

interface SectionNavigatorProps {
  sections: SectionItem[];
  currentSection?: string;
  title?: string;
}

/**
 * Навигационный компонент для перехода между разделами документации
 * 
 * @component
 * @example
 * ```tsx
 * <SectionNavigator
 *   sections={[
 *     { id: 'intro', title: 'Введение', href: '/docs/intro', description: 'Начало работы' },
 *     { id: 'tutorials', title: 'Туториалы', href: '/docs/tutorials' }
 *   ]}
 *   currentSection="intro"
 *   title="Навигация по разделам"
 * />
 * ```
 * 
 * @param {SectionNavigatorProps} props - Свойства компонента
 * @param {SectionItem[]} props.sections - Массив разделов для навигации
 * @param {string} [props.currentSection] - ID текущего активного раздела
 * @param {string} [props.title="Navigate Sections"] - Заголовок навигатора
 * 
 * @returns {JSX.Element} Навигационный компонент разделов
 */
const SectionNavigator: React.FC<SectionNavigatorProps> = ({
  sections,
  currentSection,
  title = 'Navigate Sections',
}) => {
  return (
    <div style={{ 
      border: '1px solid var(--ifm-color-emphasis-200)',
      borderRadius: '8px',
      padding: '1.5rem',
      margin: '1.5rem 0'
    }}>
      <h3>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {sections.map(section => (
          <Link
            key={section.id}
            to={section.href}
            style={{
              display: 'block',
              padding: '1rem',
              border: `2px solid ${currentSection === section.id ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-200)'}`,
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'var(--ifm-transition-fast)',
              background: currentSection === section.id ? 'var(--ifm-color-primary)' : 'transparent',
              color: currentSection === section.id ? 'white' : 'var(--ifm-font-color-base)'
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {section.title}
            </div>
            {section.description && (
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                {section.description}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SectionNavigator;