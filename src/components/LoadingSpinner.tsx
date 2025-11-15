import React from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  centered?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  text,
  centered = false,
}) => {
  return (
    <div className={`${styles.loadingContainer} ${centered ? styles.centered : ''}`}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      {text && <span className={styles.loadingText}>{text}</span>}
    </div>
  );
};

export default LoadingSpinner;
