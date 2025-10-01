import React from 'react';
import { render } from '@testing-library/react';
import UniversalCard from '../UniversalCard';

describe('UniversalCard', () => {
  it('renders title and content', () => {
    const { getByRole, getByText } = render(
      <UniversalCard
        title="My Title"
        content="Some content"
        link="https://example.com"
        internal={false}
      />
    );

    expect(getByRole('heading', { name: /my title/i })).toBeInTheDocument();
    expect(getByText(/some content/i)).toBeInTheDocument();
  });

  it('renders external link as anchor', () => {
    const { getByRole } = render(
      <UniversalCard
        title="External"
        content="..."
        link="https://example.com"
        internal={false}
        linkText="Visit"
      />
    );

    const link = getByRole('link', { name: /visit/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders internal link using docusaurus Link', () => {
    const { getByRole } = render(
      <UniversalCard
        title="Internal"
        content="..."
        link="/docs/page"
        internal
        linkText="Read"
      />
    );

    const link = getByRole('link', { name: /read/i });
    expect(link).toHaveAttribute('href', '/docs/page');
  });
});


