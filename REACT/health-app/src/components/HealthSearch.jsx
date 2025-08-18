import React from 'react';

// HealthSearch 컴포넌트는 검색 기능을 담당합니다.
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
