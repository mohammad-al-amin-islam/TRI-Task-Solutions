import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders error message with default type', () => {
    render(<ErrorMessage message="Something went wrong" />);
    
    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();
    expect(screen.getByText('❌')).toBeInTheDocument();
  });

  it('renders with retry button when onRetry is provided', () => {
    const mockRetry = vi.fn();
    render(<ErrorMessage message="Error occurred" onRetry={mockRetry} />);
    
    const retryButton = screen.getByText('Try Again');
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it('renders without retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Error occurred" />);
    
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });

  it('renders different types correctly', () => {
    const { rerender } = render(<ErrorMessage message="Test" type="warning" />);
    expect(screen.getByText('⚠️')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();

    rerender(<ErrorMessage message="Test" type="info" />);
    expect(screen.getByText('ℹ️')).toBeInTheDocument();
    expect(screen.getByText('Information')).toBeInTheDocument();

    rerender(<ErrorMessage message="Test" type="error" />);
    expect(screen.getByText('❌')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});