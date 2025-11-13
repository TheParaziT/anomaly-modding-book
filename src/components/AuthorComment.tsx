import type { JSX } from 'react';
import React from 'react';
// @ts-ignore
import authorsGlobal from 'js-yaml-loader!../../blog/authors.yml';
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaStackOverflow,
  FaEnvelope,
  FaGlobe,
  FaLink,
  FaYoutube,
  FaDiscord,
  FaTelegram,
} from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { SiVk, SiModin } from 'react-icons/si';
import type { AuthorData, AuthorSocials } from '../types/index';
import styles from './AuthorComment.module.css';

// Типы для компонента
interface AuthorCommentProps {
  author: string; // ключ автора из authors.yml
  children: React.ReactNode;
  variant?: 'default' | 'highlighted' | 'minimal';
  showSocials?: boolean;
  className?: string;
}

// Конфигурация социальных иконок
const socialIconMap = {
  github: FaGithub,
  twitter: FaTwitter,
  x: SiX,
  linkedin: FaLinkedin,
  stackoverflow: FaStackOverflow,
  email: FaEnvelope,
  website: FaGlobe,
  vk: SiVk,
  telegram: FaTelegram,
  moddb: SiModin,
  discord: FaDiscord,
  youtube: FaYoutube,
};

const localIcons: Record<string, string> = {
  'moddb': '/img/logo/moddb.png',
  'ap-pro': '/img/logo/ap-pro.png', 
  'amk': '/img/logo/amk.png',
};

const localIconSizes: Record<string, { width: number; height: number }> = {
  'moddb': { width: 16, height: 16 },
  'ap-pro': { width: 14, height: 14 },
  'amk': { width: 16, height: 16 },
};

// Утилиты для социальных ссылок
function normalizeSocialLink(platform: string, handleOrUrl: string): string {
  const isAbsoluteUrl = handleOrUrl.startsWith('http://') || handleOrUrl.startsWith('https://');

  if (isAbsoluteUrl) {
    return handleOrUrl;
  }

  switch (platform) {
    case 'github':
      return `https://github.com/${handleOrUrl}`;
    case 'twitter':
      return `https://twitter.com/${handleOrUrl}`;
    case 'x':
      return `https://x.com/${handleOrUrl}`;
    case 'linkedin':
      return `https://linkedin.com/in/${handleOrUrl}`;
    case 'stackoverflow':
      return `https://stackoverflow.com/users/${handleOrUrl}`;
    case 'email':
      return `mailto:${handleOrUrl}`;
    case 'vk':
      return `https://vk.com/${handleOrUrl}`;
    case 'telegram':
      return `https://t.me/${handleOrUrl}`;
    case 'moddb':
      return `https://www.moddb.com/members/${handleOrUrl}`;
    case 'ap-pro':
      return `https://ap-pro.ru/${handleOrUrl}`;
    case 'amk':
      return `https://amk.com/${handleOrUrl}`;
    case 'discord':
      return handleOrUrl.startsWith('https://') ? handleOrUrl : `https://discord.gg/${handleOrUrl}`;
    case 'youtube':
      if (handleOrUrl.includes('youtube.com') || handleOrUrl.includes('youtu.be')) {
        return handleOrUrl;
      }
      return `https://youtube.com/${handleOrUrl}`;
    default:
      return handleOrUrl;
  }
}

function SocialIcon({ platform }: { platform: string }) {
  const IconComponent = socialIconMap[platform as keyof typeof socialIconMap];
  const localIconPath = localIcons[platform];
  const localIconSize = localIconSizes[platform];

  if (localIconPath) {
    return (
      <img 
        src={localIconPath} 
        alt={platform}
        className={styles.socialIconImage}
        style={{ 
          width: localIconSize?.width || 16,
          height: localIconSize?.height || 16,
        }}
      />
    );
  }

  if (IconComponent) {
    return <IconComponent className={styles.socialIcon} />;
  }

  return <FaLink className={styles.socialIcon} />;
}

// Основной компонент
export default function AuthorComment({ 
  author, 
  children, 
  variant = 'default',
  showSocials = true,
  className = ''
}: AuthorCommentProps): JSX.Element {
  const authorData = authorsGlobal[author] as AuthorData;

  if (!authorData) {
    console.warn(`Author key "${author}" not found in authors.yml`);
    return (
      <div className={styles.authorNotFound}>
        Author "{author}" not found
      </div>
    );
  }

  const getContainerClass = () => {
    switch (variant) {
      case 'highlighted':
        return styles.containerHighlighted;
      case 'minimal':
        return styles.containerMinimal;
      default:
        return styles.containerDefault;
    }
  };

  return (
    <div className={`${getContainerClass()} ${className}`}>
      {/* Заголовок с информацией об авторе */}
      <div className={styles.header}>
        {/* Аватар автора */}
        {authorData.image_url && (
          <img
            src={authorData.image_url}
            alt={authorData.name}
            className={styles.avatar}
          />
        )}
        
        {/* Информация об авторе */}
        <div className={styles.authorInfo}>
          <div className={styles.nameRow}>
            <strong className={styles.authorName}>
              {authorData.name}
            </strong>
            
            {authorData.title && (
              <span className={styles.authorTitle}>
                {authorData.title}
              </span>
            )}
          </div>
          
          {/* Социальные ссылки */}
          {showSocials && authorData.socials && Object.keys(authorData.socials).length > 0 && (
            <div className={styles.socialLinks}>
              {Object.entries(authorData.socials)
                .filter(([_, value]) => value && value !== '')
                .slice(0, 4) // Показываем до 4 социальных сетей
                .map(([platform, handleOrUrl]) => {
                  const normalizedUrl = normalizeSocialLink(platform, handleOrUrl as string);
                  
                  return (
                    <a
                      key={platform}
                      href={normalizedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${authorData.name} on ${platform}`}
                      className={styles.socialLink}
                    >
                      <SocialIcon platform={platform} />
                    </a>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* Содержимое комментария */}
      <div className={authorData.image_url ? styles.contentWithAvatar : styles.content}>
        <div className={styles.commentText}>
          {children}
        </div>
      </div>
    </div>
  );
}