
import React from 'react';
import UniversalCard from './UniversalCard';
import type { CardGridProps } from '../types';
import styles from './CardGrid.module.css';

const CardGrid: React.FC<CardGridProps> = ({ children, items = [], columns = 3 }) => {
  const columnClass = `col col--${12 / columns}`;

  return (
    <div className={styles.cardGrid}>
      {children}
      <div className="row">
        {items.map((item, index) => (
          <div key={index} className={`${columnClass} ${styles.cardColumn}`}>
            <UniversalCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;