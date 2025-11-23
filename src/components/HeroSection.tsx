import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Icon from './Icon';
import styles from './HeroSection.module.css';

// Local background videos list
const backgroundVideos = [
  {
    id: 'stalker-ambience-1',
    title: 'S.T.A.L.K.E.R. LA Atmosphere - Pripyat Monolith',
    url: '/video/1.mp4',
    startTime: 0,
  },
  {
    id: 'stalker-ambience-2',
    title: 'S.T.A.L.K.E.R. CoC Atmosphere - Rostok Campfire',
    url: '/video/2.mp4',
    startTime: 0,
  },
  {
    id: 'stalker-ambience-3',
    title: 'S.T.A.L.K.E.R. CoC Atmosphere - Dead City',
    url: '/video/3.mp4',
    startTime: 0,
  },
] as const;

// Navigation cards with Iconify icons
const navigationCards = [
  {
    title: 'Getting Started',
    description: 'Begin your journey',
    icon: 'mdi:rocket-launch',
    href: '/docs/getting-started/',
    color: 'primary',
  },
  {
    title: 'Glossary',
    description: 'Glossary',
    icon: 'mdi:book',
    href: '/glossary',
    color: 'secondary',
  },
  {
    title: 'Tutorials',
    description: 'Step-by-step guides',
    icon: 'mdi:teach',
    href: '/docs/tutorials/',
    color: 'secondary',
  },
  {
    title: 'Modding Tools',
    description: 'Essential software',
    icon: 'mdi:tools',
    href: '/docs/modding-tools/',
    color: 'secondary',
  },
  {
    title: 'References',
    description: 'Technical documentation',
    icon: 'mingcute:list-search-line',
    href: '/docs/references/',
    color: 'secondary',
  },
  {
    title: 'Resources',
    description: 'Assets and materials',
    icon: 'carbon:software-resource',
    href: '/docs/resources/',
    color: 'secondary',
  },
  {
    title: 'Engine API',
    description: 'Engine documentation',
    icon: 'tabler:engine',
    href: '/docs/engine-api/',
    color: 'secondary',
  },
  {
    title: 'Scripting API',
    description: 'Scripting reference',
    icon: 'mdi-light:script',
    href: '/docs/scripting-api/',
    color: 'secondary',
  },
  {
    title: 'For Contributors',
    description: 'Help improve the book',
    icon: 'mdi:handshake-outline',
    href: '/docs/for-contributors/',
    color: 'secondary',
  },
] as const;

/**
 * Hero Section Component - главная секция с видео-фоном и навигационными карточками
 *
 * @example
 * ```tsx
 * <HeroSection />
 * ```
 *
 * @component
 * @category Core Components
 */
const HeroSection: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Вместо const currentVideo = backgroundVideos[currentVideoIndex];
  const currentVideo = backgroundVideos[currentVideoIndex]!; // Используем non-null assertion

  // Или с проверкой
  if (!currentVideo) {
    console.error('Current video is undefined');
    return null; // или fallback UI
  }

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pick a random background video on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundVideos.length);
    setCurrentVideoIndex(randomIndex);
  }, []);

  // Handle video loaded event
  const handleVideoLoaded = useRef(() => {
    if (videoRef.current && currentVideo) {
      videoRef.current.currentTime = currentVideo.startTime;
      setIsVideoLoaded(true);
    }
  });

  return (
    <section className={styles.heroSection}>
      {/* Video background - disable on mobile for better performance */}
      <div className={styles.videoBackground}>
        {!isMobile ? (
          <video
            ref={videoRef}
            className={clsx(styles.videoElement, isVideoLoaded && styles.videoElementFaded)}
            src={currentVideo.url}
            title={currentVideo.title}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoaded.current}
          />
        ) : (
          // Fallback for mobile - static gradient background
          <div className={styles.mobileBackground} />
        )}
        <div className={styles.videoOverlay} />

        {/* Loading indicator */}
        {!isVideoLoaded && !isMobile && (
          <div className={styles.videoLoading}>
            <div className={styles.loadingSpinner} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.heroContent}>
        <div className="container">
          <div className={styles.heroLayout}>
            {/* Title Section */}
            <div className={styles.titleSection}>
              <Heading as="h1" className={styles.heroTitle}>
                {siteConfig.title}
              </Heading>
              <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
              <div className={styles.externalLinks}>
                <Link
                  className="button button--outline button--secondary"
                  href="https://github.com/TheParaziT/anomaly-modding-book"
                >
                  <Icon icon="mdi:github" size={20} style={{ marginRight: '8px' }} />
                  GitHub
                </Link>
                <Link
                  className="button button--outline button--secondary"
                  href="https://discord.gg/8Pu2ekQYg3"
                >
                  <Icon icon="ic:baseline-discord" size={20} style={{ marginRight: '8px' }} />
                  Discord
                </Link>
              </div>
            </div>

            {/* Cards Section */}
            <div className={styles.cardsSection}>
              <div className={styles.cardsGrid}>
                {navigationCards.map((card, index) => (
                  <Link
                    key={card.title}
                    to={card.href}
                    className={clsx(styles.navigationCard, styles[`card${index + 1}`])}
                  >
                    <div className={styles.cardIcon}>
                      <Icon icon={card.icon} size={32} className={styles.cardIconImage} />
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{card.title}</h3>
                      <p className={styles.cardDescription}>{card.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
