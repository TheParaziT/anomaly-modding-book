// ProgramDescription.tsx
import React, { useState } from 'react';
import Authors from './Authors';
import { Icon } from '@iconify/react';
import CustomLink from './CustomLink';
import styles from './ProgramDescription.module.css';

interface Addon {
  name: string;
  description?: string;
  url?: string;
}

interface Fix {
  name?: string;
  description: string;
  version?: string;
  url?: string;
}

interface ProgramDescriptionProps {
  program: {
    name: string;
    version: string;
    versionType?: 'standard' | 'date' | 'both';
    versionDate?: string;
    versionLabel?: string;
    versionUrl?: string;
    previewImage?: string | any;
    previewImageAlt?: string;
    website?: string | string[];
    documentation?: string | string[];
    forum?: string | string[];
    repository?: string | string[];
    download?: string | string[];
    developers: string[];
    license?: string;
    supportedPlatforms?: string[];
    addons?: Addon[];
    fixes?: Fix[];
  };

  showDevelopers?: boolean;
  compact?: boolean;
  showAllAddons?: boolean;
  maxAddonsToShow?: number;
  versionLinkTarget?: '_blank' | '_self';
  dateFormat?: 'full' | 'short' | 'monthYear';
}

const ProgramDescription: React.FC<ProgramDescriptionProps> = ({
  program,
  showDevelopers = true,
  compact = false,
  showAllAddons = false,
  maxAddonsToShow = 5,
  versionLinkTarget = '_blank',
  dateFormat = 'full',
}) => {
  const [showAllAddonsState, setShowAllAddonsState] = useState(showAllAddons);
  const [showAllFixesState, setShowAllFixesState] = useState(false);

  const displayedAddons = showAllAddonsState
    ? program.addons
    : program.addons?.slice(0, maxAddonsToShow);
  const displayedFixes = showAllFixesState ? program.fixes : program.fixes?.slice(0, 3);

  const hasMoreAddons =
    program.addons && program.addons.length > maxAddonsToShow && !showAllAddonsState;
  const hasMoreFixes = program.fixes && program.fixes.length > 3 && !showAllFixesState;

  // Функция для нормализации ссылок (строки в массив)
  const normalizeLinks = (links?: string | string[]): string[] => {
    if (!links) return [];
    if (Array.isArray(links)) return links;
    return [links];
  };

  // Функция для получения URL превью изображения
  const getPreviewImageUrl = (): string => {
    if (!program.previewImage) return '';

    if (typeof program.previewImage === 'string') {
      if (
        program.previewImage.startsWith('http://') ||
        program.previewImage.startsWith('https://')
      ) {
        return program.previewImage;
      }
      if (program.previewImage.startsWith('/')) {
        return program.previewImage;
      }
      return program.previewImage;
    }

    try {
      return program.previewImage.default || program.previewImage || '';
    } catch (error) {
      console.error('Ошибка загрузки изображения:', error);
      return '';
    }
  };

  // Функция форматирования даты
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return dateString;
      }

      const options: Intl.DateTimeFormatOptions = {};

      if (dateFormat === 'short') {
        options.day = 'numeric';
        options.month = 'short';
        options.year = 'numeric';
      } else if (dateFormat === 'monthYear') {
        options.month = 'long';
        options.year = 'numeric';
      } else {
        // full format
        options.day = 'numeric';
        options.month = 'long';
        options.year = 'numeric';
      }

      return date.toLocaleDateString('en-EN', options);
    } catch {
      return dateString;
    }
  };

  // Функция для проверки, является ли версия датой
  const isDateVersion = (version: string): boolean => {
    const datePatterns = [
      /^\d{4}-\d{2}-\d{2}$/,
      /^\d{4}\/\d{2}\/\d{2}$/,
      /^\d{2}\.\d{2}\.\d{4}$/,
      /^\d{4}-\d{2}$/,
      /^\d{4}\.\d{2}\.\d{2}$/,
    ];

    return datePatterns.some(pattern => pattern.test(version));
  };

  // Иконки для платформ
  const getPlatformIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();

    if (platformLower.includes('windows')) {
      return 'mdi:microsoft-windows';
    } else if (
      platformLower.includes('mac') ||
      platformLower.includes('os x') ||
      platformLower.includes('macos')
    ) {
      return 'mdi:apple';
    } else if (platformLower.includes('linux')) {
      return 'mdi:linux';
    } else if (platformLower.includes('android')) {
      return 'mdi:android';
    } else if (platformLower.includes('ios')) {
      return 'mdi:apple-ios';
    } else if (platformLower.includes('web') || platformLower.includes('браузер')) {
      return 'mdi:web';
    } else if (platformLower.includes('docker')) {
      return 'mdi:docker';
    } else {
      return 'mdi:monitor';
    }
  };

  // Функция для извлечения отображаемого текста из URL
  const getDisplayTextFromUrl = (
    url: string,
    type: 'website' | 'docs' | 'forum' | 'repo' | 'download' = 'website'
  ): string => {
    try {
      const urlObj = new URL(url);

      if (type === 'website') {
        return urlObj.hostname.replace('www.', '');
      } else if (type === 'docs') {
        const path = urlObj.pathname;
        if (path === '/' || path === '') {
          return urlObj.hostname.replace('www.', '');
        } else {
          const segments = path
            .split('/')
            .filter(seg => seg && seg !== 'docs' && seg !== 'documentation');
          return segments.length > 0
            ? segments[segments.length - 1].replace(/-/g, ' ')
            : urlObj.hostname.replace('www.', '');
        }
      } else if (type === 'forum') {
        return urlObj.hostname.replace('www.', '').replace('forum.', '');
      } else if (type === 'repo') {
        if (urlObj.hostname.includes('github.com') || urlObj.hostname.includes('gitlab.com')) {
          const pathSegments = urlObj.pathname.split('/').filter(Boolean);
          if (pathSegments.length >= 2) {
            return `${pathSegments[0]}/${pathSegments[1]}`;
          }
        }
        return urlObj.hostname.replace('www.', '');
      } else if (type === 'download') {
        const filename = urlObj.pathname.split('/').pop() || '';
        if (filename) {
          return filename.replace(/\.(zip|exe|dmg|tar\.gz|deb|rpm|msi|appimage)$/i, '');
        }
        return urlObj.hostname.replace('www.', '');
      }

      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  // Определение, как отображать версию
  const getVersionDisplay = () => {
    const versionType =
      program.versionType || (isDateVersion(program.version) ? 'date' : 'standard');

    if (versionType === 'both' && program.versionDate) {
      return {
        mainText: program.versionLabel || `v${program.version}`,
        subText: program.versionDate,
        isDate: true,
      };
    }

    if (versionType === 'date' || isDateVersion(program.version)) {
      return {
        mainText: program.versionLabel || formatDate(program.version),
        subText: program.versionDate ? formatDate(program.versionDate) : undefined,
        isDate: true,
      };
    }

    // Стандартная версия
    return {
      mainText: program.versionLabel || `v${program.version}`,
      subText: program.versionDate ? formatDate(program.versionDate) : undefined,
      isDate: false,
    };
  };

  // Компонент для отображения версии
  const VersionDisplay = () => {
    const versionInfo = getVersionDisplay();

    const versionContent = (
      <div className={styles.versionContainer}>
        <span className={styles.versionMain}>{versionInfo.mainText}</span>
        {versionInfo.subText && (
          <span className={`${styles.versionSub} ${versionInfo.isDate ? styles.versionDate : ''}`}>
            {versionInfo.isDate ? ` (${versionInfo.subText})` : ` от ${versionInfo.subText}`}
          </span>
        )}
      </div>
    );

    if (program.versionUrl) {
      return (
        <CustomLink
          href={program.versionUrl}
          target={versionLinkTarget}
          rel={versionLinkTarget === '_blank' ? 'noopener noreferrer' : undefined}
          className={`${styles.version} ${styles.versionLink}`}
          title={`Страница версии ${program.version}`}
        >
          {versionContent}
        </CustomLink>
      );
    }

    return <div className={`${styles.version} ${styles.versionNoLink}`}>{versionContent}</div>;
  };

  // Подготовленные массивы ссылок
  const websites = normalizeLinks(program.website);
  const documentations = normalizeLinks(program.documentation);
  const forums = normalizeLinks(program.forum);
  const repositories = normalizeLinks(program.repository);
  const downloads = normalizeLinks(program.download);

  // URL превью изображения
  const previewImageUrl = getPreviewImageUrl();
  const previewImageAlt = program.previewImageAlt || `${program.name} preview`;

  return (
    <div className={`${styles.programDescription} ${compact ? styles.compact : ''}`}>
      <div className={`${styles.tableContainer} ${!program.previewImage ? styles.noPreview : ''}`}>
        {/* Превью изображение (если есть) */}
        {previewImageUrl && (
          <div className={styles.previewCell}>
            <div className={styles.previewSection}>
              <img
                src={previewImageUrl}
                alt={previewImageAlt}
                className={styles.previewImage}
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="200" y="150" text-anchor="middle" fill="%23999" font-family="Arial, sans-serif" font-size="16">Изображение не найдено</text></svg>';
                }}
              />
            </div>
          </div>
        )}

        <table className={styles.infoTable}>
          <tbody>
            {/* Основная информация */}
            <tr className={styles.mainInfoRow}>
              <td className={styles.cellValue} colSpan={2}>
                <div className={styles.programHeader}>
                  <span className={styles.programName}>{program.name}</span>
                  <VersionDisplay />
                </div>
              </td>
            </tr>

            {/* Лицензия и платформы */}
            <tr>
              <th className={styles.cellLabel}>License</th>
              <td className={styles.cellValue}>
                <code className={styles.licenseCode}>{program.license || 'Not specified'}</code>
              </td>
            </tr>

            {/* Платформы */}
            {program.supportedPlatforms && program.supportedPlatforms.length > 0 && (
              <tr>
                <th className={styles.cellLabel}>Platforms</th>
                <td className={styles.cellValue}>
                  <div className={styles.platformsContainer}>
                    {program.supportedPlatforms.map((platform, index) => {
                      const icon = getPlatformIcon(platform);
                      return (
                        <div key={index} className={styles.platformItem} title={platform}>
                          <Icon icon={icon} className={styles.platformIcon} />
                          <span className={styles.platformText}>{platform}</span>
                        </div>
                      );
                    })}
                  </div>
                </td>
              </tr>
            )}

            {/* Официальный сайт (сайты) */}
            {websites.length > 0 && (
              <tr>
                <th className={styles.cellLabel}>Website</th>
                <td className={styles.cellValue}>
                  <div className={styles.linksList}>
                    {websites.map((url, index) => (
                      <CustomLink
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.customLinkItem}
                      >
                        <span className={styles.linkText}>
                          {getDisplayTextFromUrl(url, 'website')}
                        </span>
                      </CustomLink>
                    ))}
                  </div>
                </td>
              </tr>
            )}

            {/* Документация */}
            {documentations.length > 0 && (
              <tr>
                <th className={styles.cellLabel}>Documentation</th>
                <td className={styles.cellValue}>
                  <div className={styles.linksList}>
                    {documentations.map((url, index) => (
                      <CustomLink
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.customLinkItem}
                      >
                        <span className={styles.linkText}>
                          {getDisplayTextFromUrl(url, 'docs')}
                        </span>
                      </CustomLink>
                    ))}
                  </div>
                </td>
              </tr>
            )}

            {/* Форум */}
            {forums.length > 0 && (
              <tr>
                <th className={styles.cellLabel}>Forum</th>
                <td className={styles.cellValue}>
                  <div className={styles.linksList}>
                    {forums.map((url, index) => (
                      <CustomLink
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.customLinkItem}
                      >
                        <span className={styles.linkText}>
                          {getDisplayTextFromUrl(url, 'forum')}
                        </span>
                      </CustomLink>
                    ))}
                  </div>
                </td>
              </tr>
            )}

            {/* Репозиторий */}
            {repositories.length > 0 && (
              <tr>
                <th className={styles.cellLabel}>Repository</th>
                <td className={styles.cellValue}>
                  <div className={styles.linksList}>
                    {repositories.map((url, index) => (
                      <CustomLink
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.customLinkItem}
                      >
                        <span className={styles.linkText}>
                          {getDisplayTextFromUrl(url, 'repo')}
                        </span>
                      </CustomLink>
                    ))}
                  </div>
                </td>
              </tr>
            )}

            {/* Скачать */}
            {downloads.length > 0 && (
              <tr>
                <th className={styles.cellLabel}>Download</th>
                <td className={styles.cellValue}>
                  <div className={styles.linksList}>
                    {downloads.map((url, index) => (
                      <CustomLink
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.customLinkItem}
                      >
                        <span className={styles.linkText}>
                          {getDisplayTextFromUrl(url, 'download')}
                        </span>
                      </CustomLink>
                    ))}
                  </div>
                </td>
              </tr>
            )}

            {/* Дополнения */}
            {program.addons && program.addons.length > 0 && (
              <tr className={styles.listRow}>
                <th className={styles.cellLabel}>Addons</th>
                <td className={styles.cellValue}>
                  <ul className={styles.list}>
                    {displayedAddons?.map((addon, index) => (
                      <li key={index} className={styles.listItem}>
                        <div className={styles.listItemContent}>
                          <strong className={styles.listItemTitle}>
                            {addon.url ? (
                              <CustomLink
                                href={addon.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.addonLink}
                              >
                                {addon.name}
                              </CustomLink>
                            ) : (
                              addon.name
                            )}
                          </strong>
                          {addon.description && (
                            <div className={styles.listItemDescription}>{addon.description}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  {hasMoreAddons && (
                    <button
                      className={styles.showMoreButton}
                      onClick={() => setShowAllAddonsState(true)}
                    >
                      Показать все {program.addons!.length} дополнений
                    </button>
                  )}
                </td>
              </tr>
            )}

            {/* Исправления */}
            {program.fixes && program.fixes.length > 0 && (
              <tr className={styles.listRow}>
                <th className={styles.cellLabel}>Fixes</th>
                <td className={styles.cellValue}>
                  <ul className={styles.list}>
                    {displayedFixes?.map((fix, index) => (
                      <li key={index} className={styles.listItem}>
                        <div className={styles.listItemContent}>
                          {/* Если есть имя исправления, показываем его как заголовок */}
                          {fix.name && (
                            <strong className={styles.fixTitle}>
                              {fix.url ? (
                                <CustomLink
                                  href={fix.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.fixLink}
                                >
                                  {fix.name}
                                </CustomLink>
                              ) : (
                                fix.name
                              )}
                            </strong>
                          )}

                          {/* Описание исправления */}
                          <div className={styles.fixDescription}>{fix.description}</div>

                          {/* Мета-информация: версия и ссылка */}
                          <div className={styles.fixMeta}>
                            {fix.version && (
                              <span className={styles.fixVersion}>
                                {isDateVersion(fix.version)
                                  ? formatDate(fix.version)
                                  : `v${fix.version}`}
                              </span>
                            )}
                            {fix.url && !fix.name && (
                              <CustomLink
                                href={fix.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.fixLink}
                              >
                                Подробнее
                              </CustomLink>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {hasMoreFixes && (
                    <button
                      className={styles.showMoreButton}
                      onClick={() => setShowAllFixesState(true)}
                    >
                      Показать все {program.fixes!.length} исправлений
                    </button>
                  )}
                </td>
              </tr>
            )}

            {/* Разработчики */}
            {showDevelopers && program.developers.length > 0 && (
              <tr className={styles.developersRow}>
                <th className={styles.cellLabel}>Developers</th>
                <td className={styles.cellValue}>
                  <div className={styles.developersContainer}>
                    <Authors
                      authors={program.developers}
                      size="small"
                      showTitle={true}
                      showDescription={false}
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramDescription;
