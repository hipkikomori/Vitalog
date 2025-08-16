// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // 기본 CSS 파일 import

function App() {
    const [healthData, setHealthData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/health-data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // API 응답 데이터가 예상과 다를 경우를 대비하여 콘솔에 로깅합니다.
                console.log('API data:', data); 
                setHealthData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">데이터를 불러오는 중...</div>;
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>헬스케어 운동 데이터</h1>
            </header>
            <div className="data-list">
                {healthData && healthData.length > 0 ? (
                    <ul>
                        {/* 맵핑 시 객체 구조 분해 할당을 사용하여 코드를 간결하게 만듭니다. */}
                        {healthData.map(({ 운동명, 단위체중당에너지소비량 }, index) => (
                            <li key={index} className="data-item">
                                <strong>{운동명}</strong>: {단위체중당에너지소비량}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default App;
