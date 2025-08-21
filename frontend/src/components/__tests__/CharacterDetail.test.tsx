import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { apiClient } from '../../services/api';
import { CharacterDetail } from '../CharacterDetail';
import type { Character } from '../../types/api';

vi.mock('../../services/api', () => {
  return {
    apiClient: {
      getCharacterById: vi.fn(),
    },
  };
});

const renderWithRouter = (initialRoute: string) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/characters/:id" element={<CharacterDetail />} />
      </Routes>
    </MemoryRouter>
  );
};

const mockCharacter: Character = {
  id: '1',
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: { id: '1', name: 'Tatooine', climate: 'arid', terrain: 'desert', population: '200000', diameter: '10465', gravity: '1 standard' },
  films: [{ id: '1', title: 'A New Hope', episode_id: 4, director: 'George Lucas', producer: 'Gary Kurtz', release_date: '1977-05-25' }],
  species: [],
  vehicles: [{ id: '14', name: 'Snowspeeder', cargo_capacity: '10', passengers: '0', max_atmosphering_speed: '650', crew: '2', length: '4.5', model: 't-47 airspeeder' }],
  starships: [{ id: '12', name: 'X-wing', consumables: '1 week', cargo_capacity: '110', passengers: '0', max_atmosphering_speed: '1050', crew: '1', length: '12.5', model: 'T-65 X-wing', cost_in_credits: '149999', manufacturer: 'Incom Corporation', starship_class: 'Starfighter', hyperdrive_rating: '1.0', MGLT: '100' }],
  image_url: 'https://example.com/image.jpg',
  created: '2023-01-01',
  edited: '2023-01-02',
};

describe('CharacterDetail', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it('shows loading state then renders sections', async () => {
    (apiClient.getCharacterById as any).mockResolvedValueOnce(mockCharacter);

    renderWithRouter('/characters/1');

    expect(screen.getByText(/Loading character details/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    expect(screen.getByText('Physical Characteristics')).toBeInTheDocument();
    expect(screen.getByText('Homeworld')).toBeInTheDocument();
    expect(screen.getByText('Films')).toBeInTheDocument();
    expect(screen.getByText('Vehicles')).toBeInTheDocument();
    expect(screen.getByText('Starships')).toBeInTheDocument();
  });

  it('shows error state on API error', async () => {
    (apiClient.getCharacterById as any).mockRejectedValueOnce(new Error('Network error'));

    renderWithRouter('/characters/1');

    await waitFor(() => {
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });
  });

  it('handles character not found', async () => {
    (apiClient.getCharacterById as any).mockResolvedValueOnce(null);

    renderWithRouter('/characters/1');

    await waitFor(() => {
      expect(screen.getByText(/Character Not Found/i)).toBeInTheDocument();
    });
  });
});
