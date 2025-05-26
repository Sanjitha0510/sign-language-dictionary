import React from 'react';

const FloatingAddButton = ({ onClick }) => {
  return (
    <button
      className="fab-add-word"
      title="Add Word"
      onClick={onClick}
    >
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  );
};

export default FloatingAddButton;
