import React from 'react';
import type { Starship } from '../types/api';

interface StarshipsSectionProps {
  starships: Starship[];
}

export const StarshipsSection: React.FC<StarshipsSectionProps> = ({ starships }) => {
  if (!starships || starships.length === 0) return null;

  return (
    <section className="detail-section">
      <h2 className="section-title">Starships</h2>
      <div className="starships-grid">
        {starships.map((starship) => (
          <div key={starship.id} className="starship-card">
            <div className="starship-header">
              <div className="starship-icon">🚀</div>
              <div className="starship-info">
                <h3 className="starship-name">{starship.name}</h3>
                <div className="starship-model">{starship.model}</div>
              </div>
            </div>
            <div className="starship-details">
              <div className="starship-specs">
                <div className="spec-item">
                  <span className="spec-label">Manufacturer</span>
                  <span className="spec-value">{starship.manufacturer || 'Unknown'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Class</span>
                  <span className="spec-value">{starship.starship_class || 'Unknown'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Crew</span>
                  <span className="spec-value">{starship.crew || 'Unknown'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Passengers</span>
                  <span className="spec-value">{starship.passengers || 'Unknown'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Length</span>
                  <span className="spec-value">
                    {starship.length && starship.length !== 'unknown' && starship.length !== 'n/a' 
                      ? `${starship.length} m` 
                      : 'Unknown'}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Max Speed</span>
                  <span className="spec-value">
                    {starship.max_atmosphering_speed && starship.max_atmosphering_speed !== 'unknown' && starship.max_atmosphering_speed !== 'n/a'
                      ? `${starship.max_atmosphering_speed} km/h`
                      : 'Unknown'}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Cargo Capacity</span>
                  <span className="spec-value">
                    {starship.cargo_capacity && starship.cargo_capacity !== 'unknown' && starship.cargo_capacity !== 'n/a'
                      ? `${starship.cargo_capacity} kg`
                      : 'Unknown'}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Cost</span>
                  <span className="spec-value">
                    {starship.cost_in_credits && starship.cost_in_credits !== 'unknown' && starship.cost_in_credits !== 'n/a'
                      ? `${starship.cost_in_credits} credits`
                      : 'Unknown'}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Consumables</span>
                  <span className="spec-value">{starship.consumables || 'Unknown'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Hyperdrive Rating</span>
                  <span className="spec-value">{starship.hyperdrive_rating || 'Unknown'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">MGLT</span>
                  <span className="spec-value">{starship.MGLT || 'Unknown'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
