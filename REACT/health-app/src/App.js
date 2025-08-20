import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HealthPage from './pages/HealthPage';
import HealthDetailPage from './pages/HealthDetailPage';
import { HealthDataProvider } from './contexts/HealthDataContext';

function App() {
  return (
    <BrowserRouter>
      {/* 데이터 Provider가 앱 전체를 감싸서 데이터 공유 */}
      <HealthDataProvider>
        <div>
          <Routes>
            <Route path="/" element={<HealthPage />} />
            <Route path="/exercise/:exerciseName" element={<HealthDetailPage />} />
            <Route path="*" element={<h2>404 페이지를 찾을 수 없습니다.</h2>} />
          </Routes>
        </div>
      </HealthDataProvider>
    </BrowserRouter>
  );
}

export default App;