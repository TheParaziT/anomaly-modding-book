import React from 'react';
import UniversalCard from './UniversalCard';
import type { CardGridProps } from '../types';

export default function CardGrid({
  children,
  items = [],
  columns = 3,
}: CardGridProps): React.JSX.Element {
  const columnClass = `col col--${12 / columns}`;

  return (
    <div className="card-grid">
      {children}
      <div className="row">
        {items.map((item, index) => (
          <div key={index} className={`${columnClass} margin-bottom--lg`}>
            <UniversalCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
