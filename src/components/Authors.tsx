import React, { useState } from 'react';
// @ts-ignore
import authorsGlobal from 'js-yaml-loader!../../blog/authors.yml';
import { normalizeSocialLink, sizeMap } from '../utils/iconifyUtils';
import SocialIcon from './SocialIcon';
import Icon from './Icon';
import type { AuthorsProps, Author } from '../types';
import styles from './Authors.module.css';

const Authors: React.FC<AuthorsProps> = ({
  authors,
  size = 'medium',
  showTitle = true,
  showDescription = false,
}) => {
  const [copiedUsername, setCopiedUsername] = useState<string | null>(null);
  const { icon: iconSize, image: imageSize } = sizeMap[size];

  const handleCopyUsername = (username: string) => {
    navigator.clipboard.writeText(username);
    setCopiedUsername(username);
    setTimeout(() => setCopiedUsername(null), 2000);
  };

  // Filter and validate authors
  const filteredAuthors = React.useMemo(() => {
    return authors
      .map(authorKey => {
        const authorData = authorsGlobal[authorKey];
        if (!authorData) {
          console.warn(`Author "${authorKey}" not found in authors.yml`);
          return null;
        }
        return { key: authorKey, ...authorData };
      })
      .filter(Boolean) as Author[];
  }, [authors]);

  if (filteredAuthors.length === 0) {
    return <div className={styles.emptyState}>No authors found.</div>;
  }

  return (
    <div className={styles.authorsContainer}>
      <div className="row">
        {filteredAuthors.map(author => (
          <div key={author.key} className="col col--6">
            <div className={styles.authorCard}>
              {author.image_url && (
                <img
                  src={author.image_url}
                  alt={author.name}
                  className={styles.authorImage}
                  style={{ width: imageSize, height: imageSize }}
                />
              )}

              <div className={styles.authorInfo}>
                <div className={styles.authorName}>
                  {author.url ? (
                    <a
                      href={author.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.authorLink}
                    >
                      {author.name}
                    </a>
                  ) : (
                    author.name
                  )}
                </div>

                {showTitle && author.title && (
                  <div className={styles.authorTitle}>{author.title}</div>
                )}

                {showDescription && author.description && (
                  <div className={styles.authorDescription}>{author.description}</div>
                )}

                <div className={styles.socialLinks}>
                  {author.socials &&
                    Object.entries(author.socials)
                      .filter(([_, value]) => value && value !== '')
                      .map(([platform, handleOrUrl]) => {
                        const normalizedUrl = normalizeSocialLink(platform, handleOrUrl as string);

                        return (
                          <a
                            key={platform}
                            href={normalizedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`${author.name} on ${platform}`}
                            className={styles.socialLink}
                          >
                            <SocialIcon platform={platform} size={iconSize} />
                          </a>
                        );
                      })}

                  {author.discord_username && (
                    <button
                      onClick={() => handleCopyUsername(author.discord_username!)}
                      title={`Copy Discord username: ${author.discord_username}`}
                      className={styles.discordButton}
                    >
                      <SocialIcon platform="discord" size={iconSize} />
                      {copiedUsername === author.discord_username && (
                        <span className={styles.copyTooltip}>Copied!</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authors;
