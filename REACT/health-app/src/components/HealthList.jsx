import React from 'react';
import { Link } from 'react-router-dom';

function HealthList({ healthData, loading }) {
  if (loading) {
    return <div className="loading">데이터를 불러오는 중...</div>;
  }

  return (
    <main className="main-content">
        <div className="met-explanation">
        <p>
          <strong>💡 MET란?</strong><br />
          운동 강도를 숫자로 나타낸 값이에요. 숫자가 높을수록 더 힘들고, 칼로리 소모도 많다는 의미입니다!
        </p>
      </div>
      <div className="data-grid">
        {healthData && healthData.length > 0 ? (
          healthData.map((item, index) => (
            <Link
              to={`/exercise/${encodeURIComponent(item['운동명'])}`}
              key={index}
              className="data-card-link"
            >
              <div className="data-card">
                <h2 className="card-title">{item['운동명']}</h2>
                <p className="card-info">
                  <span className="card-info-label">MET:</span>{' '}
                  {item['단위체중당에너지소비량']}
                </p>
                <p className="card-sub-info">
                  <small>
                    (= {item['단위체중당에너지소비량']} kcal / kg / hour)
                  </small>
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
