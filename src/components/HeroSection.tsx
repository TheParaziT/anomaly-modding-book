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
];

// Navigation cards
const navigationCards = [
  {
    title: 'Getting Started',
    description: 'Begin your journey',
    iconifyUrl: 'https://api.iconify.design/mdi:rocket-launch.svg',
    href: '/docs/getting-started/',
    color: 'primary',
  },
  {
    title: 'Glossary',
    description: 'Glossary',
    iconifyUrl: 'https://api.iconify.design/mdi:book.svg',
    href: '/glossary',
    color: 'secondary',
  },
  {
    title: 'Tutorials',
    description: 'Step-by-step guides',
    iconifyUrl: 'https://api.iconify.design/mdi:teach.svg',
    href: '/docs/tutorials/',
    color: 'secondary',
  },
  {
    title: 'Modding Tools',
    description: 'Essential software',
    iconifyUrl: 'https://api.iconify.design/mdi:tools.svg',
    href: '/docs/modding-tools/',
    color: 'secondary',
  },
  {
    title: 'References',
    description: 'Technical documentation',
    iconifyUrl: 'https://api.iconify.design/mingcute:list-search-line.svg',
    href: '/docs/references/',
    color: 'secondary',
  },
  {
    title: 'Resources',
    description: 'Assets and materials',
    iconifyUrl: 'https://api.iconify.design/carbon:software-resource.svg',
    href: '/docs/resources/',
    color: 'secondary',
  },
  {
    title: 'Engine API',
    description: 'Engine documentation',
    iconifyUrl: 'https://api.iconify.design/tabler:engine.svg',
    href: '/docs/engine-api/',
    color: 'secondary',
  },
  {
    title: 'Scripting API',
    description: 'Scripting reference',
    iconifyUrl: 'https://api.iconify.design/mdi-light:script.svg',
    href: '/docs/scripting-api/',
    color: 'secondary',
  },
  {
    title: 'For Contributors',
    description: 'Help improve the book',
    iconifyUrl: 'https://api.iconify.design/mdi:handshake-outline.svg',
    href: '/docs/for-contributors/',
    color: 'secondary',
  },
];

// Icon component using Iconify CDN
interface IconifyIconProps {
  url: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const IconifyIcon: React.FC<IconifyIconProps> = ({
  url,
  width = 24,
  height = 24,
  className,
  style,
}) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    const fetchIcon = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const svgText = await response.text();
          setSvgContent(svgText);
        }
      } catch (error) {
        console.warn('Failed to load icon:', url, error);
      }
    };

    fetchIcon();
  }, [url]);

  if (!svgContent) {
    return (
      <div
        className={clsx(styles.iconPlaceholder, className)}
        style={{ width, height, ...style }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{ width, height, ...style }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

const HeroSection: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const currentVideo = backgroundVideos[currentVideoIndex];

  return (
    <section className={styles.heroSection}>
      {/* Video background - disable on mobile for better performance */}
      <div className={styles.videoBackground}>
        {!isMobile ? (
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
                  <IconifyIcon
                    url="https://api.iconify.design/mdi:github.svg"
                    width={20}
                    height={20}
                    style={{ marginRight: '8px' }}
                  />
                  GitHub
                </Link>
                <Link
                  className="button button--outline button--secondary"
                  href="https://discord.gg/8Pu2ekQYg3"
                >
                  <IconifyIcon
                    url="https://api.iconify.design/mdi:discord.svg"
                    width={20}
                    height={20}
                    style={{ marginRight: '8px' }}
                  />
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
                      <IconifyIcon
                        url={card.iconifyUrl}
                        width={32}
                        height={32}
                        className={styles.iconifyIcon}
                      />
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
