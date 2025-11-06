import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import OnBoardingPage from './Pages/OnBoardingPage';
import MedicalReportPage from './Pages/MedicalReportPage';
import DashboardPage from './Pages/DashboardPage';
import GamifiedRehabPage from './Pages/GamifiedRehabPage';
import ProgressReportsPage from './Pages/ProgressReportsPage';
import FeedbackAdaptivePage from './Pages/FeedbackAdaptivePage';
import DoctorCommunicationPage from './Pages/DoctorCommunicationPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/onboarding" element={<OnBoardingPage />} />
          <Route path="/medical-report" element={<MedicalReportPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/gamified" element={<GamifiedRehabPage />} />
          <Route path="/progress-reports" element={<ProgressReportsPage />} />
          <Route path="/feedback-adaptive" element={<FeedbackAdaptivePage />} />
          <Route path="/doctor-panel" element={<DoctorCommunicationPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;