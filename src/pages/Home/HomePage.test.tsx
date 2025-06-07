import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the "Welcome" text', () => {
    render(<HomePage />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });
});
