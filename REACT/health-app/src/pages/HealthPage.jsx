import React, { useState, useEffect, useCallback } from 'react';
import HealthList from '../components/HealthList';
import HealthSearch from '../components/HealthSearch';
import HealthFilter from '../components/HealthFilter';
import { useHealthData } from '../contexts/HealthDataContext';

import '../css/HealthPage.css';

export default function HealthPage() {
  // Context로부터 데이터와 로딩 상태를 직접 가져옵니다.
  const { healthData, loading } = useHealthData();
  
  const [displayHealthData, setDisplayHealthData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const filteredData = healthData.filter(item =>
      item && item['운동명'] && item['운동명'].toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortCriteria) {
      filteredData.sort((a, b) => {
        let aValue, bValue;
        if (sortCriteria === '운동명') {
          aValue = a['운동명'];
          bValue = b['운동명'];
        } else if (sortCriteria === '단위체중당에너지소비량') {
          aValue = parseFloat(a['단위체중당에너지소비량']);
          bValue = parseFloat(b['단위체중당에너지소비량']);
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setDisplayHealthData(filteredData);
  }, [searchTerm, sortCriteria, sortOrder, healthData]);

  const handleSortChange = useCallback((e) => {
    const value = e.target.value;
    const [criteria, order] = value.split('-');
    setSortCriteria(criteria);
    setSortOrder(order);
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">헬스케어 운동 데이터</h1>
        <div className="controls">
          <HealthSearch searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
          <HealthFilter onSortChange={handleSortChange} sortCriteria={sortCriteria} sortOrder={sortOrder} />
        </div>
      </header>
      <HealthList healthData={displayHealthData} loading={loading} />
    </div>
  );
}