import React from 'react';
import type { Film } from '../types/api';

interface FilmsSectionProps {
  films: Film[];
}

export const FilmsSection: React.FC<FilmsSectionProps> = ({ films }) => {
  if (!films || films.length === 0) return null;

  return (
    <section className="detail-section">
      <h2 className="section-title">Films</h2>
      <div className="films-grid">
        {films.map((film) => (
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
  );
};
