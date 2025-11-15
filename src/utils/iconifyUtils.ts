// Mapping social platforms to Iconify icons
export const socialIconMap: Record<string, string> = {
  github: 'mdi:github',
  twitter: 'mdi:twitter',
  x: 'simple-icons:x',
  linkedin: 'mdi:linkedin',
  stackoverflow: 'mdi:stackoverflow',
  email: 'mdi:email',
  website: 'mdi:web',
  vk: 'fa6-brands:vk',
  telegram: 'mdi:telegram',
  discord: 'ic:baseline-discord',
  youtube: 'mdi:youtube',
  moddb: 'simple-icons:moddb',
  'ap-pro': 'mdi:toolbox-outline', // fallback icon
  amk: 'mdi:package-variant', // fallback icon
};

// Local icons for custom platforms (если нужны кастомные иконки)
export const localIcons: Record<string, string> = {
  moddb: '/img/logo/moddb.png',
  'ap-pro': '/img/logo/ap-pro.png',
  amk: '/img/logo/amk.png',
};

export const localIconSizes: Record<string, { width: number; height: number }> = {
  moddb: { width: 40, height: 40 },
  'ap-pro': { width: 30, height: 30 },
  amk: { width: 40, height: 40 },
};

export const sizeMap = {
  small: { icon: 16, image: 32 },
  medium: { icon: 20, image: 48 },
  large: { icon: 24, image: 64 },
};

/**
 * Normalize social links to full URLs
 */
export const normalizeSocialLink = (platform: string, handleOrUrl: string): string => {
  const isAbsoluteUrl = handleOrUrl.startsWith('http://') || handleOrUrl.startsWith('https://');

  if (isAbsoluteUrl) {
    return handleOrUrl;
  }

  const platformMap: Record<string, string> = {
    github: `https://github.com/${handleOrUrl}`,
    twitter: `https://twitter.com/${handleOrUrl}`,
    x: `https://x.com/${handleOrUrl}`,
    linkedin: `https://linkedin.com/in/${handleOrUrl}`,
    stackoverflow: `https://stackoverflow.com/users/${handleOrUrl}`,
    email: `mailto:${handleOrUrl}`,
    vk: `https://vk.com/${handleOrUrl}`,
    telegram: `https://t.me/${handleOrUrl}`,
    moddb: `https://www.moddb.com/members/${handleOrUrl}`,
    'ap-pro': `https://ap-pro.ru/${handleOrUrl}`,
    amk: `https://amk.com/${handleOrUrl}`,
    discord: handleOrUrl.startsWith('https://') ? handleOrUrl : `https://discord.gg/${handleOrUrl}`,
    youtube:
      handleOrUrl.includes('youtube.com') || handleOrUrl.includes('youtu.be')
        ? handleOrUrl
        : `https://youtube.com/${handleOrUrl}`,
  };

  return platformMap[platform] || handleOrUrl;
};

/**
 * Check if a social platform has a custom icon
 */
export const hasCustomIcon = (platform: string): boolean => {
  return platform in localIcons || platform in socialIconMap;
};

/**
 * Get iconify icon name for platform
 */
export const getIconifyIcon = (platform: string): string => {
  return socialIconMap[platform] || 'mdi:link';
};
