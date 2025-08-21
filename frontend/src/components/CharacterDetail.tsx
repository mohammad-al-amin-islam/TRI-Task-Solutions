import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Character } from '../types/api';
import { apiClient } from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import './CharacterDetail.css';
import { Hero } from './Hero';
import { PhysicalCharacteristics } from './PhysicalCharacteristics';
import { HomeworldCard } from './HomeworldCard';
import { SpeciesList } from './SpeciesList';
import { FilmsSection } from './FilmsSection';
import { VehiclesSection } from './VehiclesSection';
import { StarshipsSection } from './StarshipsSection';

export const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  // Fetch character details
  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) {
        setError('Character ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const characterData = await apiClient.getCharacterById(id);
        setCharacter(characterData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch character';
        setError(errorMessage);
        console.error('Error fetching character:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  // Handle retry
  const handleRetry = () => {
    if (id) {
      setError(null);
      setLoading(true);
      window.location.reload();
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="character-detail-container">
        <div className="character-detail-header">
          <Link to="/" className="back-button">
            ← Back to Characters
          </Link>
        </div>
        <LoadingSpinner size="large" message="Loading character details..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="character-detail-container">
        <div className="character-detail-header">
          <Link to="/" className="back-button">
            ← Back to Characters
          </Link>
        </div>
        <ErrorMessage 
          message={error} 
          onRetry={handleRetry}
        />
      </div>
    );
  }

  // Character not found
  if (!character) {
    return (
      <div className="character-detail-container">
        <div className="character-detail-header">
          <Link to="/" className="back-button">
            ← Back to Characters
          </Link>
        </div>
        <div className="character-not-found">
          <h2>Character Not Found</h2>
          <p>The character you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            Browse All Characters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="character-detail-container">
      <div className="character-detail-header">
        <Link to="/" className="back-button">
          ← Back to Characters
        </Link>
      </div>

      <div className="character-detail-content">
        <Hero character={character} imageError={imageError} onImageError={() => setImageError(true)} />

        <div className="character-details-sections">
          <PhysicalCharacteristics character={character} />
          <HomeworldCard homeworld={character.homeworld} />
          <SpeciesList species={character.species} />
          <FilmsSection films={character.films} />
          <VehiclesSection vehicles={character.vehicles} />
          <StarshipsSection starships={character.starships} />
        </div>
      </div>
    </div>
  );
};