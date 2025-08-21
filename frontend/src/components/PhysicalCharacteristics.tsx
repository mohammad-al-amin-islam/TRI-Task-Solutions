import React from 'react';
import type { Character } from '../types/api';

interface PhysicalCharacteristicsProps {
  character: Character;
}

export const PhysicalCharacteristics: React.FC<PhysicalCharacteristicsProps> = ({ character }) => {
  return (
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
  );
};
