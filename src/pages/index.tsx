import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSection from '../components/HeroSection';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Introductory book for S.T.A.L.K.E.R. Anomaly modding"
    >
      <HeroSection />
      <head><meta name="google-site-verification" content="rCCq8pjOM03lh4gKsuTn5ybHKjZF2CX4NZacbsv72qE" /></head>
      <main></main>
    </Layout>
  );
}
