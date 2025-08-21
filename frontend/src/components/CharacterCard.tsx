import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { Character } from "../types/api";
import "./CharacterCard.css";

interface CharacterCardProps {
  character: Partial<Character>;
  searchQuery?: string;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  searchQuery,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  // const imageError = false;
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Highlight search query in character name
  const highlightSearchQuery = (text: string, query?: string) => {
    if (!query || !text) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="search-highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const imageUrl = character.image_url;

  return (
    <Link to={`/characters/${character.id}`} className="character-card-link">
      <article className="character-card">
        <div className="character-image-container">
          {imageLoading && (
            <div className="image-loading">
              <div className="image-spinner"></div>
            </div>
          )}

          {!imageError ? (
            <img
              src={imageUrl}
              alt={`${character.name} portrait`}
              className={`character-image ${imageLoading ? "loading" : ""}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          ) : (
            <div className="image-fallback">
              <div className="fallback-icon">👤</div>
              <span className="fallback-text">No Image</span>
            </div>
          )}
        </div>

        <div className="character-info">
          <h3 className="character-name">
            {highlightSearchQuery(character.name || "Unknown", searchQuery)}
          </h3>

          <div className="character-details">
            {character.gender && (
              <span className="character-detail">
                <span className="detail-label">Gender:</span>
                <span className="detail-value">{character.gender}</span>
              </span>
            )}

            {character.birth_year && (
              <span className="character-detail">
                <span className="detail-label">Born:</span>
                <span className="detail-value">{character.birth_year}</span>
              </span>
            )}
          </div>
        </div>

        <div className="card-overlay">
          <div className="overlay-content">
            <span className="view-details">View Details →</span>
          </div>
        </div>
      </article>
    </Link>
  );
};
