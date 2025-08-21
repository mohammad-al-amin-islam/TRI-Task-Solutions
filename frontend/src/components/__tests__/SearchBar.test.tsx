import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders with default placeholder', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search characters...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} placeholder="Custom placeholder" />);
    
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  it('calls onSearch when input changes', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} debounceMs={0} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'luke' } });
    
    // With 0ms debounce, should call immediately
    vi.runAllTimers();
    expect(mockOnSearch).toHaveBeenCalledWith('luke');
  });

  it('shows clear button when there is text', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    
    const clearButton = screen.getByLabelText('Clear search');
    fireEvent.click(clearButton);
    
    expect(input.value).toBe('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('clears input when Escape key is pressed', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    
    expect(input.value).toBe('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('shows search info when there is a query', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'vader' } });
    
    expect(screen.getByText('Searching for "vader"')).toBeInTheDocument();
  });

  it('sets initial value correctly', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} initialValue="initial" />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('initial');
  });
});