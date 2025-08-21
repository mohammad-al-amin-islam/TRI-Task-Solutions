import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Character } from '../types/api';
import { apiClient } from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import './CharacterDetail.css';

export const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
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
      // Re-trigger the useEffect by updating a dependency
      window.location.reload();
    }
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
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
        {/* Character Image and Basic Info */}
        <div className="character-hero">
          <div className="character-image-section">
            <div className="character-image-container">
              {!imageError ? (
                <img
                  src={character.image_url}
                  alt={`${character.name} portrait`}
                  className="character-image"
                  onError={handleImageError}
                />
              ) : (
                <div className="image-fallback">
                  <div className="fallback-icon">👤</div>
                  <span className="fallback-text">No Image Available</span>
                </div>
              )}
            </div>
          </div>

          <div className="character-info-section">
            <h1 className="character-name">{character.name}</h1>
            
            <div className="character-basic-info">
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Gender</span>
                  <span className="info-value">{character.gender || 'Unknown'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Birth Year</span>
                  <span className="info-value">{character.birth_year || 'Unknown'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Height</span>
                  <span className="info-value">
                    {character.height && character.height !== 'unknown' 
                      ? `${character.height} cm` 
                      : 'Unknown'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Mass</span>
                  <span className="info-value">
                    {character.mass && character.mass !== 'unknown' 
                      ? `${character.mass} kg` 
                      : 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Sections */}
        <div className="character-details-sections">
          {/* Physical Characteristics */}
          <section className="detail-section">
            <h2 className="section-title">Physical Characteristics</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Hair Color</span>
                <span className="detail-value">{character.hair_color || 'Unknown'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Skin Color</span>
                <span className="detail-value">{character.skin_color || 'Unknown'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Eye Color</span>
                <span className="detail-value">{character.eye_color || 'Unknown'}</span>
              </div>
            </div>
          </section>

          {/* Homeworld */}
          {character.homeworld && (
            <section className="detail-section">
              <h2 className="section-title">Homeworld</h2>
              <div className="homeworld-card">
                <h3 className="homeworld-name">{character.homeworld.name}</h3>
                <div className="homeworld-details">
                  <div className="detail-item">
                    <span className="detail-label">Climate</span>
                    <span className="detail-value">{character.homeworld.climate || 'Unknown'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Terrain</span>
                    <span className="detail-value">{character.homeworld.terrain || 'Unknown'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Population</span>
                    <span className="detail-value">{character.homeworld.population || 'Unknown'}</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Species */}
          {character.species && character.species.length > 0 && (
            <section className="detail-section">
              <h2 className="section-title">Species</h2>
              <div className="species-list">
                {character.species.map((species) => (
                  <div key={species.id} className="species-card">
                    <h3 className="species-name">{species.name}</h3>
                    <div className="species-details">
                      <div className="detail-item">
                        <span className="detail-label">Classification</span>
                        <span className="detail-value">{species.classification || 'Unknown'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Language</span>
                        <span className="detail-value">{species.language || 'Unknown'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Average Height</span>
                        <span className="detail-value">{species.average_height || 'Unknown'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Films */}
          {character.films && character.films.length > 0 && (
            <section className="detail-section">
              <h2 className="section-title">Films</h2>
              <div className="films-grid">
                {character.films.map((film) => (
                  <div key={film.id} className="film-card">
                    <div className="film-episode">Episode {film.episode_id}</div>
                    <h3 className="film-title">{film.title}</h3>
                    <div className="film-details">
                      <div className="detail-item">
                        <span className="detail-label">Director</span>
                        <span className="detail-value">{film.director}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Release Date</span>
                        <span className="detail-value">{film.release_date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};