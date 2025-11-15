import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSection from '../components/HeroSection';
import React from 'react';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Introductory book for S.T.A.L.K.E.R. Anomaly modding"
    >
      <HeroSection />
      <main></main>
    </Layout>
  );
}
