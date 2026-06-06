import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = ({ fullPage = false }) => {
  const containerStyle = fullPage
    ? {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--bg-primary)',
      }
    : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 0',
      };

  return (
    <div style={containerStyle}>
      <Spinner
        animation="border"
        role="status"
        style={{
          width: '3.5rem',
          height: '3.5rem',
          color: 'var(--accent-color)',
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {fullPage && (
        <h5 className="mt-3 fw-semibold text-muted animate-pulse">
          Loading Portfolio...
        </h5>
      )}
    </div>
  );
};

export default Loading;
