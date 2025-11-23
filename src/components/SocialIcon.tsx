// SocialIcon.tsx
import React from 'react';
import Icon from './Icon';
import { localIcons, localIconSizes, getIconifyIcon } from '../utils/iconifyUtils';

interface SocialIconProps {
  platform: string;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Компонент для отображения иконок социальных сетей с поддержкой локальных иконок и Iconify
 * 
 * @component
 * @example
 * ```tsx
 * <SocialIcon platform="github" size={24} />
 * <SocialIcon platform="discord" size="1.5rem" />
 * ```
 * 
 * @param {SocialIconProps} props - Свойства компонента
 * @param {string} props.platform - Название платформы (github, discord, twitter и т.д.)
 * @param {number | string} [props.size=16] - Размер иконки в пикселях или CSS-единицах
 * @param {string} [props.className=""] - Дополнительные CSS классы
 * @param {React.CSSProperties} [props.style] - Инлайн стили
 * 
 * @returns {JSX.Element} Иконка социальной сети
 */
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