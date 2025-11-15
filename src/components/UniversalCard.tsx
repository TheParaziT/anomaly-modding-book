import React from 'react';
import Link from '@docusaurus/Link';
import type { UniversalCardProps } from '../types';
import styles from './UniversalCard.module.css';

const UniversalCard: React.FC<UniversalCardProps> = ({
  title,
  content,
  image,
  link,
  linkText = 'View Details',
  internal = false,
  className = '',
}) => {
  const cardClass = `${styles.card} ${className}`.trim();

  const CardContent = (
    <>
      {image && (
        <div className={styles.cardImage}>
          <img src={image} alt={title} loading="lazy" />
        </div>
      )}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.cardContent}>
          {typeof content === 'string' ? <p>{content}</p> : content}
        </div>
      </div>
      {link && (
        <div className={styles.cardFooter}>
          <span className={styles.cardLink}>{linkText} →</span>
        </div>
      )}
    </>
  );

  if (link) {
    return internal ? (
      <Link to={link} className={cardClass}>
        {CardContent}
      </Link>
    ) : (
      <a href={link} className={cardClass} target="_blank" rel="noopener noreferrer">
        {CardContent}
      </a>
    );
  }

  return <div className={cardClass}>{CardContent}</div>;
};

export default UniversalCard;
