import React, { useState } from 'react';
import glossaryData from '../data/glossary';

interface GlossaryTermProps {
  termId: string;
  children: React.ReactNode;
  className?: string;
}

const GlossaryTerm = ({ termId, children, className = '' }: GlossaryTermProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Находим термин в данных
  const term = glossaryData.terms.find(t => t.id === termId);

  if (!term) {
    console.warn(`Термин с ID "${termId}" не найден в глоссарии`);
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={`glossary-term ${className}`}
      style={{
        cursor: 'help',
        borderBottom: '1px dotted var(--ifm-color-primary)',
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsHovered(!isHovered);
        }
      }}
    >
      {children}
      <span
        className="glossary-term-tooltip"
        style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--ifm-background-surface-color)',
          color: 'var(--ifm-font-color-base)',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          width: '320px',
          maxWidth: '90vw',
          boxShadow: 'var(--ifm-global-shadow-md)',
          zIndex: 1000,
          marginBottom: '10px',
          border: '1px solid var(--ifm-color-emphasis-300)',
          display: isHovered ? 'block' : 'none',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
            paddingBottom: '6px',
            borderBottom: '1px solid var(--ifm-color-emphasis-200)',
          }}
        >
          <strong
            style={{
              color: 'var(--ifm-color-primary)',
              fontSize: '16px',
            }}
          >
            {term.term}
          </strong>
          <span
            style={{
              fontSize: '11px',
              backgroundColor: 'var(--ifm-color-secondary)',
              padding: '2px 8px',
              borderRadius: '12px',
              color: 'var(--ifm-color-secondary-contrast-background)',
            }}
          >
            {term.category}
          </span>
        </div>

        <div
          style={{
            lineHeight: '1.5',
            fontSize: '14px',
            marginBottom: '8px',
          }}
        >
          {term.definition}
        </div>
      </span>
    </span>
  );
};

export default GlossaryTerm;
