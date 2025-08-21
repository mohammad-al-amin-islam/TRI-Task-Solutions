import React from 'react';
import type { Species } from '../types/api';

interface SpeciesListProps {
  species: Species[];
}

export const SpeciesList: React.FC<SpeciesListProps> = ({ species }) => {
  if (!species || species.length === 0) return null;

  return (
    <section className="detail-section">
      <h2 className="section-title">Species</h2>
      <div className="species-list">
        {species.map((s) => (
          <div key={s.id} className="species-card">
            <h3 className="species-name">{s.name}</h3>
            <div className="species-details">
              <div className="detail-item">
                <span className="detail-label">Classification</span>
                <span className="detail-value">{s.classification || 'Unknown'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Language</span>
                <span className="detail-value">{s.language || 'Unknown'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Average Height</span>
                <span className="detail-value">{s.average_height || 'Unknown'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
