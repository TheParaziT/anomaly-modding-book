import React from 'react';
import type { YouTubeVideoProps } from '../types';

export default function YouTubeVideo({ id, title }: YouTubeVideoProps) {
  return (
    <div className="video-container">
      <iframe
        className="responsive-iframe"
        src={`https://www.youtube.com/embed/${id}`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
