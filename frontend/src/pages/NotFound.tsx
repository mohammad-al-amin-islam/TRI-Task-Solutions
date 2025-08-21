import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div style={{ 
      padding: '60px 20px', 
      textAlign: 'center', 
      color: 'white',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🌌</div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#ffe81f' }}>
        404 - Page Not Found
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.8 }}>
        The page you're looking for seems to have disappeared into hyperspace.
      </p>
      <Link 
        to="/" 
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#ffe81f',
          color: '#0a0a0a',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: '600',
          transition: 'all 0.3s ease'
        }}
      >
        Return to Characters
      </Link>
    </div>
  );
};