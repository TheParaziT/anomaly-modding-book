import React from 'react';
import type { YouTubeVideoProps } from '../types';
import styles from './YouTubeVideo.module.css';

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
