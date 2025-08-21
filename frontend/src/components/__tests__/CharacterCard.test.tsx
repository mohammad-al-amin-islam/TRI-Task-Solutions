import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CharacterCard } from '../CharacterCard';
import type { Character } from '../../types/api';

const mockCharacter: Partial<Character> = {
  id: '1',
  name: 'Luke Skywalker',
  gender: 'male',
  birth_year: '19BBY',
  image_url: 'https://example.com/luke.jpg'
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('CharacterCard', () => {
  it('renders character information correctly', () => {
    renderWithRouter(<CharacterCard character={mockCharacter} />);
    
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
  });

  it('renders character image with correct alt text', () => {
    renderWithRouter(<CharacterCard character={mockCharacter} />);
    
    const image = screen.getByAltText('Luke Skywalker portrait');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/luke.jpg');
  });

  it('links to character detail page', () => {
    renderWithRouter(<CharacterCard character={mockCharacter} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/characters/1');
  });

  it('highlights search query in character name', () => {
    renderWithRouter(
      <CharacterCard character={mockCharacter} searchQuery="luke" />
    );
    
    const highlightedText = screen.getByText('Luke');
    expect(highlightedText).toHaveClass('search-highlight');
  });

  it('handles missing character data gracefully', () => {
    const incompleteCharacter = { id: '2', name: 'Test Character' };
    renderWithRouter(<CharacterCard character={incompleteCharacter} />);
    
    expect(screen.getByText('Test Character')).toBeInTheDocument();
    // Should not crash when optional fields are missing
  });

  it('shows fallback when image fails to load', () => {
    renderWithRouter(<CharacterCard character={mockCharacter} />);
    
    const image = screen.getByAltText('Luke Skywalker portrait');
    
    // Simulate image error
    fireEvent.error(image);
    
    expect(screen.getByText('No Image')).toBeInTheDocument();
    expect(screen.getByText('👤')).toBeInTheDocument();
  });
});