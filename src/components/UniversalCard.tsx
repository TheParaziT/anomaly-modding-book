import React from 'react';
import Link from '@docusaurus/Link';
import type { UniversalCardProps } from '../types';

export default function UniversalCard({
  title,
  content,
  image,
  link,
  linkText = 'View Details',
  internal = false,
  className = '',
}: UniversalCardProps): React.JSX.Element {
  return (
    <div className={`universal-card card ${className}`}>
      {image && (
        <div className="card__image">
          <img src={image} alt={title} loading="lazy" />
        </div>
      )}
      <div className="card__body">
        <h3>{title}</h3>
        <div className="card__content">
          {typeof content === 'string' ? <p>{content}</p> : content}
        </div>
      </div>
      <div className="card__footer">
        {internal ? (
          <Link to={link} className="button button--primary button--block">
            {linkText}
          </Link>
        ) : (
          <a
            href={link}
            className="button button--primary button--block"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        )}
      </div>
    </div>
  );
}
