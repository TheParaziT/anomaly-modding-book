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
