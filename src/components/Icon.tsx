// Icon.tsx
import React from 'react';
import { Icon as IconifyIcon } from '@iconify/react';

interface IconProps {
  icon: string;
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  inline?: boolean;
}

/**
 * Универсальный компонент иконки на основе Iconify
 * 
 * @component
 * @example
 * ```tsx
 * <Icon icon="mdi:home" size={24} color="#ff0000" />
 * <Icon icon="bi:github" size="2rem" className="custom-icon" />
 * ```
 * 
 * @param {IconProps} props - Свойства компонента
 * @param {string} props.icon - Название иконки в формате Iconify
 * @param {number | string} [props.size="1em"] - Размер иконки
 * @param {string} [props.color] - Цвет иконки
 * @param {string} [props.className=""] - Дополнительные CSS классы
 * @param {React.CSSProperties} [props.style] - Инлайн стили
 * @param {boolean} [props.inline=false] - Встроенное отображение
 * 
 * @returns {JSX.Element} Иконка Iconify
 */
const Icon: React.FC<IconProps> = ({
  icon,
  size = '1em',
  color,
  className = '',
  style,
  inline = false,
}) => {
  return (
    <IconifyIcon
      icon={icon}
      width={size}
      height={size}
      color={color}
      className={className}
      style={style}
      inline={inline}
    />
  );
};

export default Icon;