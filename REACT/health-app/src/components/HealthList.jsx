import React from 'react';
import { Link } from 'react-router-dom';

function HealthList({ healthData, loading }) {
  if (loading) {
    return <div className="loading">데이터를 불러오는 중...</div>;
  }

  return (
    <main className="main-content">
      <div className="data-grid">
        {healthData && healthData.length > 0 ? (
          healthData.map((item, index) => (
            <Link to={`/exercise/${encodeURIComponent(item['운동명'])}`} key={index} className="data-card-link">
              <div className="data-card">
                <h2 className="card-title">{item['운동명']}</h2>
                <p className="card-info">
                  <span className="card-info-label">소비 에너지:</span> {item['단위체중당에너지소비량']} Kcal/kg
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-data-message">표시할 데이터가 없습니다.</p>
        )}
      </div>
    </main>
  );
}

export default HealthList;