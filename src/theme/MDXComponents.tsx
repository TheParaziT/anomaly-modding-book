import MDXComponents from '@theme-original/MDXComponents';
import Authors from '@site/src/components/Authors';
import YouTubeVideo from '@site/src/components/YouTubeVideo';
import UniversalCard from '@site/src/components/UniversalCard';
import CardGrid from '@site/src/components/CardGrid';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import AuthorComment from '@site/src/components/AuthorComment';
import CustomLink from '@site/src/components/CustomLink';
import type { MDXComponentsType } from '../components';

export default {
  ...MDXComponents,
  Authors,
  AuthorComment,
  YouTubeVideo,
  UniversalCard,
  Tabs,
  TabItem,
  CardGrid,
  a: CustomLink,
} as MDXComponentsType;
