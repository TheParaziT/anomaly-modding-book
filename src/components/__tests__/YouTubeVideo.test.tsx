import React from 'react';
import { render } from '@testing-library/react';
import YouTubeVideo from '../YouTubeVideo';

describe('YouTubeVideo', () => {
  it('renders iframe with provided video id', () => {
    const { container } = render(<YouTubeVideo id="dQw4w9WgXcQ" title="Sample" />);
    const iframe = container.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute('src')).toContain('dQw4w9WgXcQ');
  });
});


