import React from 'react';

const SearchBar = ({ searchQuery, onSearchQueryChange, onSearch, onClear }) => {
  return (
    <div className="search-bar-enhanced">
      <input
        type="text"
        placeholder="Search words or definitions…"
        value={searchQuery}
        onChange={e => onSearchQueryChange(e.target.value)}
        onKeyDown={e => e.key === "Enter" && onSearch()}
      />
      <button
        className="search-btn"
        onClick={onSearch}
        aria-label="Search"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
      </button>
      {searchQuery && (
        <button
          className="clear-btn"
          onClick={onClear}
          aria-label="Clear"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="6" y1="6" x2="18" y2="18"/>
            <line x1="18" y1="6" x2="6" y2="18"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
