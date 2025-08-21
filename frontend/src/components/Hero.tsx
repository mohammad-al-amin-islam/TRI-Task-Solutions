import React from 'react';
import type { Character } from '../types/api';

interface HeroProps {
  character: Character;
  imageError: boolean;
  onImageError: () => void;
}

export const Hero: React.FC<HeroProps> = ({ character, imageError, onImageError }) => {
  return (
    <div className="character-hero">
      <div className="character-image-section">
        <div className="character-image-container">
          {!imageError ? (
            <img
              src={character.image_url}
              alt={`${character.name} portrait`}
              className="character-image"
              onError={onImageError}
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
                {character.height && character.height !== 'unknown' ? `${character.height} cm` : 'Unknown'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Mass</span>
              <span className="info-value">
                {character.mass && character.mass !== 'unknown' ? `${character.mass} kg` : 'Unknown'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
