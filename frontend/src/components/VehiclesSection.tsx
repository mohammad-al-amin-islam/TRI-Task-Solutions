import React from 'react';
import type { Vehicles } from '../types/api';

interface VehiclesSectionProps {
  vehicles: Vehicles[];
}

export const VehiclesSection: React.FC<VehiclesSectionProps> = ({ vehicles }) => {
  if (!vehicles || vehicles.length === 0) return null;

  return (
    <section className="detail-section">
      <h2 className="section-title">Vehicles</h2>
      <div className="vehicles-grid">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="vehicle-card">
            <div className="vehicle-header">
              <div className="vehicle-icon">🚗</div>
              <div className="vehicle-info">
                <h3 className="vehicle-name">{vehicle.name}</h3>
                <div className="vehicle-model">{vehicle.model}</div>
              </div>
            </div>
            <div className="vehicle-details">
              <div className="vehicle-specs">
                <div className="spec-item">
                  <span className="spec-label">Crew</span>
                  <span className="spec-value">{vehicle.crew || 'Unknown'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Passengers</span>
                  <span className="spec-value">{vehicle.passengers || 'Unknown'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Length</span>
                  <span className="spec-value">
                    {vehicle.length && vehicle.length !== 'unknown' && vehicle.length !== 'n/a' 
                      ? `${vehicle.length} m` 
                      : 'Unknown'}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Max Speed</span>
                  <span className="spec-value">
                    {vehicle.max_atmosphering_speed && vehicle.max_atmosphering_speed !== 'unknown' && vehicle.max_atmosphering_speed !== 'n/a'
                      ? `${vehicle.max_atmosphering_speed} km/h`
                      : 'Unknown'}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Cargo Capacity</span>
                  <span className="spec-value">
                    {vehicle.cargo_capacity && vehicle.cargo_capacity !== 'unknown' && vehicle.cargo_capacity !== 'n/a'
                      ? `${vehicle.cargo_capacity} kg`
                      : 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
