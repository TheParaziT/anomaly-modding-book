import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>

        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <div className={styles.buttons}>
          {/* Основные разделы документации */}
          <div className={styles.buttonGroup}>
            <Link className="button button--primary button--lg" to="/docs/tutorials/">
              🚀 Tutorials
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/modding-tools/">
              🛠️ Modding Tools
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/references/">
              ⚙️ References
            </Link>
          </div>

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
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Introductory book for S.T.A.L.K.E.R. Anomaly modding"
    >
      <HomepageHeader />
      <main></main>
    </Layout>
  );
}
