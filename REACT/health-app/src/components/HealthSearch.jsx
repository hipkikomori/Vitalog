import React from 'react';

function HealthSearch({ searchTerm, onSearchTermChange }) {
  return (
    <input
      type="text"
      placeholder="운동명 검색..."
      value={searchTerm}
      onChange={(e) => onSearchTermChange(e.target.value)}
      className="search-input"
    />
  );
}

export default HealthSearch;
