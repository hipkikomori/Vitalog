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

  // 입력값은 문자열로 받되 계산 시 숫자로 변환
  const [weight, setWeight] = useState(''); // kg
  const [duration, setDuration] = useState(30); // minutes
  const [calories, setCalories] = useState(null);

  // 운동 강도를 판단하는 함수 (MET 기준)
  const getExerciseIntensity = (met) => {
    if (met < 3.0) {
      return { level: '가벼운 운동', style: 'light' };
    } else if (met >= 3.0 && met < 6.0) {
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
    const metRaw = exercise['단위체중당에너지소비량'];
    const met = typeof metRaw === 'number' ? metRaw : parseFloat(metRaw);

    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) {
      alert('올바른 체중을 입력해주세요.');
      return;
    }

    const minutes = Number(duration);
    const hours = minutes / 60; // 분 → 시간

    // kcal = MET × 체중(kg) × 시간(시간)
    const kcal = met * w * hours;

    setCalories(kcal.toFixed(1));
  };

  // 현재 운동의 강도 정보 가져오기 (MET 기반)
  const metValueRaw = exercise['단위체중당에너지소비량'];
  const metValue = typeof metValueRaw === 'number' ? metValueRaw : parseFloat(metValueRaw);
  const intensity = getExerciseIntensity(metValue);

  // 편의: 현재 입력 체중 기준 분당 소모량 표시
  const kcalPerMin = (() => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0 || isNaN(metValue)) return null;
    return ((metValue * w) / 60).toFixed(1); // kcal / min
  })();

  return (
    <div className="detail-container">
      <h1 className="detail-title">{exercise['운동명']}</h1>

      <div className="detail-info">
        <p>
          <strong>MET:</strong>
          <span>{metValue}</span>
        </p>
        <p>
          <strong>기본 에너지 소비량(설명):</strong>
          <span>{metValue} kcal / kg / hour</span>
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
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="예: 70"
            min="1"
            step="0.1"
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
            <option value={120}>2시간</option>
          </select>
        </div>
        <button onClick={handleCalculate} className="calculate-btn">
          계산하기
        </button>

        {kcalPerMin && (
          <div className="hint-box">
            <small>현재 입력 체중 기준 분당 소모량: 약 {kcalPerMin} kcal/min</small>
          </div>
        )}

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
