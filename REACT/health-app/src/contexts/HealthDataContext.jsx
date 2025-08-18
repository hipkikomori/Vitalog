import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Context 생성
const HealthDataContext = createContext(null);

// 2. Context를 쉽게 사용하기 위한 커스텀 훅
export const useHealthData = () => {
  const context = useContext(HealthDataContext);
  if (!context) {
    throw new Error('useHealthData는 HealthDataProvider 안에서 사용해야 합니다.');
  }
  return context;
};

// 3. 데이터 로직을 처리하고 공유하는 Provider 컴포넌트
export function HealthDataProvider({ children }) {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/health-data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHealthData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  const value = { healthData, loading };

  return (
    <HealthDataContext.Provider value={value}>
      {children}
    </HealthDataContext.Provider>
  );
}