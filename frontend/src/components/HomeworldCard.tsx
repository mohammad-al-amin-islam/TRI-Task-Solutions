import React from 'react';
import type { Planet } from '../types/api';

interface HomeworldCardProps {
  homeworld?: Planet;
}

export const HomeworldCard: React.FC<HomeworldCardProps> = ({ homeworld }) => {
  if (!homeworld) return null;

  return (
    <section className="detail-section">
      <h2 className="section-title">Homeworld</h2>
      <div className="homeworld-card">
        <h3 className="homeworld-name">{homeworld.name}</h3>
        <div className="homeworld-details">
          <div className="detail-item">
            <span className="detail-label">Climate</span>
            <span className="detail-value">{homeworld.climate || 'Unknown'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Terrain</span>
            <span className="detail-value">{homeworld.terrain || 'Unknown'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Population</span>
            <span className="detail-value">{homeworld.population || 'Unknown'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
