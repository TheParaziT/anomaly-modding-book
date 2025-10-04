import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from './HeroSection.module.css';

// Local background videos list
const backgroundVideos = [
  {
    id: 'stalker-ambience-1',
    title: 'S.T.A.L.K.E.R. CoC Atmosphere - Generators',
    url: '/video/1.mp4',
    startTime: 10,
  },
  {
    id: 'stalker-ambience-2',
    title: 'S.T.A.L.K.E.R. CoC Atmosphere - Rostok Campfire',
    url: '/video/2.mp4',
    startTime: 10,
  },
  {
    id: 'stalker-ambience-3',
    title: 'S.T.A.L.K.E.R. CoC Atmosphere - Agroprom Underground',
    url: '/video/3.mp4',
    startTime: 10,
  },
  {
    id: 'stalker-ambience-4',
    title: 'S.T.A.L.K.E.R. CoC Atmosphere - Jupiter Factory',
    url: '/video/4.mp4',
    startTime: 10,
  },
  {
    id: 'stalker-ambience-5',
    title: 'S.T.A.L.K.E.R. CoC Atmosphere - Swamps Church',
    url: '/video/5.mp4',
    startTime: 10,
  },
];

// Navigation cards
const navigationCards = [
  {
    title: 'Getting Started',
    description: 'Begin your journey',
    icon: '🚀',
    href: '/docs/getting-started/',
    color: 'primary',
  },
  {
    title: 'Tutorials',
    description: 'Step-by-step guides',
    icon: '📚',
    href: '/docs/tutorials/',
    color: 'secondary',
  },
  {
    title: 'Modding Tools',
    description: 'Essential software',
    icon: '🛠️',
    href: '/docs/modding-tools/',
    color: 'secondary',
  },
  {
    title: 'References',
    description: 'Technical documentation',
    icon: '⚙️',
    href: '/docs/references/',
    color: 'secondary',
  },
  {
    title: 'Resources',
    description: 'Assets and materials',
    icon: '📦',
    href: '/docs/resources/',
    color: 'secondary',
  },
  {
    title: 'Engine API',
    description: 'Engine documentation',
    icon: '🔧',
    href: '/docs/engine-api/',
    color: 'secondary',
  },
  {
    title: 'Scripting API',
    description: 'Scripting reference',
    icon: '💻',
    href: '/docs/scripting-api/',
    color: 'secondary',
  },
  {
    title: 'For Contributors',
    description: 'Help improve the book',
    icon: '🤝',
    href: '/docs/for-contributors/',
    color: 'secondary',
  },
];

const HeroSection: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Pick a random background video on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundVideos.length);
    setCurrentVideoIndex(randomIndex);
  }, []);

  const currentVideo = backgroundVideos[currentVideoIndex];

  return (
    <section className={styles.heroSection}>
      {/* Video background */}
      <div className={styles.videoBackground}>
        <video
          className={clsx(styles.videoElement, isVideoLoaded && styles.videoElementFaded)}
          src={currentVideo.url}
          title={currentVideo.title}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={e => {
            const video = e.target as HTMLVideoElement;
            video.currentTime = currentVideo.startTime;
            setIsVideoLoaded(true);
          }}
        />
        <div className={styles.videoOverlay} />

        {/* Loading indicator */}
        {!isVideoLoaded && (
          <div className={styles.videoLoading}>
            <div className={styles.loadingSpinner} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.heroContent}>
        <div className="container">
          <div className={styles.heroLayout}>
            {/* Left column - Title */}
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
                  GitHub
                </Link>
                <Link
                  className="button button--outline button--secondary"
                  href="https://discord.gg/8Pu2ekQYg3"
                >
                  Discord Server
                </Link>
              </div>
            </div>

            {/* Right column - Cards */}
            <div className={styles.cardsSection}>
              <div className={styles.cardsGrid}>
                {navigationCards.map((card, index) => (
                  <Link
                    key={card.title}
                    to={card.href}
                    className={clsx(styles.navigationCard, styles[`card${index + 1}`])}
                  >
                    <div className={styles.cardIcon}>{card.icon}</div>
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
