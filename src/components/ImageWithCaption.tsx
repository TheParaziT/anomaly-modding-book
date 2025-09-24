import React from 'react';

type ImageWithCaptionProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

const ImageWithCaption: React.FC<ImageWithCaptionProps> = ({
  src,
  alt,
  caption,
  width,
  height,
  className,
}) => {
  return (
    <figure className={className} style={{ margin: '1rem 0' }}>
      <img src={src} alt={alt} width={width} height={height} />
      {caption && (
        <figcaption style={{ opacity: 0.8, fontSize: '0.9rem', marginTop: '0.5rem' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ImageWithCaption;


