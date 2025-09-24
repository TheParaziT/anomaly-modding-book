import React, { useState, useEffect } from 'react';
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

export default function SectionNavigator({
  sections,
  currentSection,
  title = 'Navigate Sections',
}: SectionNavigatorProps): React.JSX.Element {
  const [activeSection, setActiveSection] = useState(currentSection);

  useEffect(() => {
    setActiveSection(currentSection);
  }, [currentSection]);

  return (
    <div className="section-navigator">
      <h3 className="section-navigator__title">{title}</h3>
      <nav className="section-navigator__nav">
        {sections.map(section => (
          <Link
            key={section.id}
            className={`section-navigator__item ${
              activeSection === section.id ? 'section-navigator__item--active' : ''
            }`}
            to={section.href}
            onClick={() => setActiveSection(section.id)}
          >
            {section.icon && <span className="section-navigator__icon">{section.icon}</span>}
            <div className="section-navigator__content">
              <h4 className="section-navigator__title">{section.title}</h4>
              {section.description && (
                <p className="section-navigator__description">{section.description}</p>
              )}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
