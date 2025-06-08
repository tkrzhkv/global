import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the "Welcome" text', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Welcome to auth app')).toBeInTheDocument();
  });
});
