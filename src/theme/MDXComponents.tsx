import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Authors from '@site/src/components/Authors';
import ImageWithCaption from '@site/src/components/ImageWithCaption';
import type { MDXComponentsType } from '../types';

export default {
  ...MDXComponents,
  Authors,
  ImageWithCaption,
} as MDXComponentsType;