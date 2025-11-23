// LoadingSpinner.tsx
import React from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  centered?: boolean;
}

/**
 * Компонент индикатора загрузки с различными размерами и опциональным текстом
 * 
 * @component
 * @example
 * ```tsx
 * <LoadingSpinner size="large" text="Загрузка данных..." centered={true} />
 * ```
 * 
 * @param {LoadingSpinnerProps} props - Свойства компонента
 * @param {'small' | 'medium' | 'large'} [props.size="medium"] - Размер спиннера
 * @param {string} [props.text] - Текст рядом со спиннером
 * @param {boolean} [props.centered=false] - Центрировать спиннер по горизонтали
 * 
 * @returns {JSX.Element} Индикатор загрузки
 */
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