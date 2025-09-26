import React from 'react';
import { render, screen } from '@testing-library/react';
import UniversalCard from '../UniversalCard';

describe('UniversalCard', () => {
  it('renders title and content', () => {
    render(
      <UniversalCard
        title="My Title"
        content="Some content"
        link="https://example.com"
        internal={false}
      />
    );

    expect(screen.getByRole('heading', { name: /my title/i })).toBeInTheDocument();
    expect(screen.getByText(/some content/i)).toBeInTheDocument();
  });

  it('renders external link as anchor', () => {
    render(
      <UniversalCard
        title="External"
        content="..."
        link="https://example.com"
        internal={false}
        linkText="Visit"
      />
    );

    const link = screen.getByRole('link', { name: /visit/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders internal link using docusaurus Link', () => {
    render(
      <UniversalCard
        title="Internal"
        content="..."
        link="/docs/page"
        internal
        linkText="Read"
      />
    );

    const link = screen.getByRole('link', { name: /read/i });
    expect(link).toHaveAttribute('href', '/docs/page');
  });
});


