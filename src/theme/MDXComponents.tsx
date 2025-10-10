import MDXComponents from '@theme-original/MDXComponents';
import Authors from '@site/src/components/Authors';
import ModelViewer from '@site/src/components/ModelViewer';
import YouTubeVideo from '@site/src/components/YouTubeVideo';
import UniversalCard from '@site/src/components/UniversalCard';
import CardGrid from '@site/src/components/CardGrid';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import type { MDXComponentsType } from '../types';

export default {
  ...MDXComponents,
  Authors,
  ModelViewer,
  YouTubeVideo,
  UniversalCard,
  Tabs,
  TabItem,
  CardGrid
} as MDXComponentsType;
