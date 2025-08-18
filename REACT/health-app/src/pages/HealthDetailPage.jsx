import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHealthData } from '../contexts/HealthDataContext';
import '../css/HealthDetailPage.css';

export default function HealthDetailPage() {
  const { healthData } = useHealthData();
  const { exerciseName } = useParams();
  const decodedExerciseName = decodeURIComponent(exerciseName);

  const exercise = healthData.find(
    (item) => item['운동명'] === decodedExerciseName
  );

  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState(30);
  const [calories, setCalories] = useState(null);

  // 운동 강도를 판단하는 함수
  const getExerciseIntensity = (energy) => {
    // 시간당 소비량을 기준으로 강도 분류
    if (energy < 3.0) {
      return { level: '가벼운 운동', style: 'light' };
    } else if (energy >= 3.0 && energy < 6.0) {
      return { level: '적당한 운동', style: 'moderate' };
    } else {
      return { level: '격렬한 운동', style: 'intense' };
    }
  };

  if (healthData.length === 0) {
    return <div className="detail-container">데이터를 불러오는 중...</div>;
  }
  
  if (!exercise) {
    return (
      <div className="detail-container">
        <h2>운동 정보를 찾을 수 없습니다.</h2>
        <Link to="/">목록으로 돌아가기</Link>
      </div>
    );
  }

  const handleCalculate = () => {
    if (!weight || weight <= 0) {
      alert('올바른 체중을 입력해주세요.');
      return;
    }
    const energyConsumption = exercise['단위체중당에너지소비량'];
    const calculated = (energyConsumption / 60) * weight * duration;
    setCalories(calculated.toFixed(1));
  };

  // 현재 운동의 강도 정보 가져오기
  const intensity = getExerciseIntensity(exercise['단위체중당에너지소비량']);

  return (
    <div className="detail-container">
      <h1 className="detail-title">{exercise['운동명']}</h1>
      <div className="detail-info">
        <p>
          <strong>기본 에너지 소비량:</strong>
          <span>{exercise['단위체중당에너지소비량']} kcal / kg / hour</span>
        </p>
        <p>
          <strong>운동 강도:</strong>
          <span className={`intensity-badge ${intensity.style}`}>
            {intensity.level}
          </span>
        </p>
      </div>

      <div className="calculator-box">
        <h2>예상 소모 칼로리 계산기</h2>
        <div className="input-group">
          <label htmlFor="weight">체중 (kg)</label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="예: 70"
          />
        </div>
        <div className="input-group">
          <label htmlFor="duration">운동 시간</label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          >
            <option value={10}>10분</option>
            <option value={20}>20분</option>
            <option value={30}>30분</option>
            <option value={45}>45분</option>
            <option value={60}>1시간</option>
            <option value={90}>1시간 30분</option>
          </select>
        </div>
        <button onClick={handleCalculate} className="calculate-btn">
          계산하기
        </button>

        {calories !== null && (
          <div className="result-box">
            <p>
              당신이 {duration}분간 '{exercise['운동명']}'을(를) 하면
            </p>
            <p className="result-calories">
              약 <strong>{calories} kcal</strong>를 소모합니다!
            </p>
          </div>
        )}
      </div>

      <Link to="/" className="back-link">
        목록으로 돌아가기 →
      </Link>
    </div>
  );
}