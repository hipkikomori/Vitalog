import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'; // axios를 import 합니다.

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
        // axios.get으로 API를 호출합니다.
        const response = await axios.get('http://localhost:8080/api/health-data');
        // axios는 응답 데이터를 response.data에 담아줍니다.
        setHealthData(response.data);
      } catch (error) {
        // 네트워크 오류나 서버 에러가 발생하면 여기서 처리됩니다.
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