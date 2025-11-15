import React from 'react';
// @ts-ignore
import authorsGlobal from 'js-yaml-loader!../../blog/authors.yml';
import { normalizeSocialLink } from '../utils/iconifyUtils';
import SocialIcon from './SocialIcon';
import type { AuthorCommentProps, AuthorData } from '../types';
import styles from './AuthorComment.module.css';

const AuthorComment: React.FC<AuthorCommentProps> = ({
  author,
  children,
  variant = 'default',
  showSocials = true,
  className = '',
}) => {
  const authorData = authorsGlobal[author] as AuthorData;

  if (!authorData) {
    console.warn(`Author "${author}" not found in authors.yml`);
    return <div className={styles.authorNotFound}>Author "{author}" not found</div>;
  }

  const containerClass = `${styles.container} ${styles[variant]} ${className}`.trim();

  return (
    <div className={containerClass}>
      <div className={styles.header}>
        {authorData.image_url && (
          <img src={authorData.image_url} alt={authorData.name} className={styles.avatar} />
        )}

        <div className={styles.authorInfo}>
          <div className={styles.nameRow}>
            <strong className={styles.authorName}>{authorData.name}</strong>

            {authorData.title && <span className={styles.authorTitle}>{authorData.title}</span>}
          </div>

          {showSocials && authorData.socials && (
            <div className={styles.socialLinks}>
              {Object.entries(authorData.socials)
                .filter(([_, value]) => value && value !== '')
                .slice(0, 4)
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
                      <SocialIcon platform={platform} size={16} />
                    </a>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      <div className={authorData.image_url ? styles.contentWithAvatar : styles.content}>
        <div className={styles.commentText}>{children}</div>
      </div>
    </div>
  );
};

export default AuthorComment;
