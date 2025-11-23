// YouTubeVideo.tsx
import React from 'react';
import type { YouTubeVideoProps } from '../types';
import styles from './YouTubeVideo.module.css';

/**
 * Компонент для встраивания YouTube видео с адаптивным дизайном
 * 
 * @component
 * @example
 * ```tsx
 * <YouTubeVideo 
 *   id="dQw4w9WgXcQ" 
 *   title="Пример видео" 
 * />
 * ```
 * 
 * @param {YouTubeVideoProps} props - Свойства компонента
 * @param {string} props.id - ID YouTube видео
 * @param {string} props.title - Заголовок видео для accessibility
 * 
 * @returns {JSX.Element} Адаптивный YouTube плеер
 */
const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ id, title }) => {
  return (
    <div className={styles.videoContainer}>
      <iframe
        className={styles.responsiveIframe}
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

export default YouTubeVideo;