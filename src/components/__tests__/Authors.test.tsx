import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Authors from '../Authors';

describe('Authors', () => {
  it('renders title when provided', () => {
    render(
      <Authors
        authors={["saloeater"]}
        size="small"
        showTitle
        showDescription={false}
      />
    );
    expect(screen.getByText(/authors/i)).toBeInTheDocument();
  });
});


