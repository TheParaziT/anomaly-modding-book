import React from 'react';
import Icon from './Icon';
import { localIcons, localIconSizes, getIconifyIcon } from '../utils/iconifyUtils';

interface SocialIconProps {
  platform: string;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const SocialIcon: React.FC<SocialIconProps> = ({ platform, size = 16, className = '', style }) => {
  const localIconPath = localIcons[platform];
  const localIconSize = localIconSizes[platform];

  // Render local icon if available
  if (localIconPath) {
    const iconWidth = localIconSize?.width || size;
    const iconHeight = localIconSize?.height || size;

    return (
      <img
        src={localIconPath}
        alt={platform}
        className={className}
        style={{
          width: iconWidth,
          height: iconHeight,
          objectFit: 'contain',
          flexShrink: 0,
          display: 'block',
          ...style,
        }}
      />
    );
  }

  // Render Iconify icon
  const iconName = getIconifyIcon(platform);

  return <Icon icon={iconName} size={size} className={className} style={style} />;
};

export default SocialIcon;
