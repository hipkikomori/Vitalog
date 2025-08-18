import React from 'react';

// HealthFilter 컴포넌트는 정렬 기능을 담당합니다.
function HealthFilter({ onSortChange, sortCriteria, sortOrder }) {
  const value = sortCriteria && sortOrder ? `${sortCriteria}-${sortOrder}` : '';

  return (
    <select
      onChange={onSortChange}
      className="sort-select"
      value={value}
    >
      <option value="">정렬</option>
      <option value="운동명-asc">운동명 (오름차순)</option>
      <option value="운동명-desc">운동명 (내림차순)</option>
      <option value="단위체중당에너지소비량-asc">소비 에너지 (낮은 순)</option>
      <option value="단위체중당에너지소비량-desc">소비 에너지 (높은 순)</option>
    </select>
  );
}

export default HealthFilter;
