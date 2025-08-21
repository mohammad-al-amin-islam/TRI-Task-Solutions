import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    const customMessage = 'Loading characters...';
    render(<LoadingSpinner message={customMessage} />);
    
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="small" />);
    expect(document.querySelector('.loading-spinner.small')).toBeInTheDocument();

    rerender(<LoadingSpinner size="medium" />);
    expect(document.querySelector('.loading-spinner.medium')).toBeInTheDocument();

    rerender(<LoadingSpinner size="large" />);
    expect(document.querySelector('.loading-spinner.large')).toBeInTheDocument();
  });

  it('renders without message when not provided', () => {
    render(<LoadingSpinner message="" />);
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});