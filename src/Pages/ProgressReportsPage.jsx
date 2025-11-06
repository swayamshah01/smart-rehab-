import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import PerformanceDashboard from '../components/progress-report/PerformanceDashboard';
import PhysicalProgress from '../components/progress-report/PhysicalProgress';
import MentalWellnessInsights from '../components/progress-report/MentalWellnessInsights';
import NutritionCompliance from '../components/progress-report/NutritionCompliance';
import AIGeneratedReports from '../components/progress-report/AIGeneratedReports';
import CompareMode from '../components/progress-report/CompareMode';

const ProgressReportsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get userData from location state or localStorage
  const [userData] = useState(() => {
    const savedUserData = localStorage.getItem('rehabUserData');
    return location.state || (savedUserData ? JSON.parse(savedUserData) : {});
  });

  const [userProgress] = useState(() => {
    const savedProgress = localStorage.getItem('rehabProgress');
    return savedProgress ? JSON.parse(savedProgress) : {
      currentStreak: 7,
      totalXP: 350,
      level: 3,
      exercisesCompleted: 25,
      painTrend: [],
      moodTrend: [],
    };
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [showCompareMode, setShowCompareMode] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const userName = 'Swayam Shah';
  const userLogin = 'swayamshah01';
  const currentDate = new Date('2025-11-06T10:52:50Z');
  const recoveryStartDate = new Date('2025-10-01');
  const daysSinceStart = Math.floor((currentDate - recoveryStartDate) / (1000 * 60 * 60 * 24));
  const weeksCompleted = Math.floor(daysSinceStart / 7);

  // Comprehensive analytics data
  const analyticsData = {
    sessionsCompleted: 25,
    totalXP: 350,
    currentStreak: 7,
    painImprovement: 56,
    mobilityChange: 60,
    strengthGain: 45,
    consistencyRate: 92,
    nutritionScore: 85,
    mentalWellnessScore: 88,
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'physical', label: 'Physical Progress', icon: '💪' },
    { id: 'mental', label: 'Mental Wellness', icon: '🧠' },
    { id: 'nutrition', label: 'Nutrition', icon: '🍎' },
    { id: 'reports', label: 'AI Reports', icon: '📄' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#dbeafe] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-[#22d3ee]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#a855f7]/20 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back & Title */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-[#0f172a] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Back to Dashboard</span>
              </motion.button>

              <div className="h-6 w-px bg-gray-300"></div>

              <div>
                <h1 className="text-2xl font-bold text-[#0f172a]">
                  Progress & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">Reports</span>
                </h1>
                <p className="text-sm text-gray-600">
                  Day {daysSinceStart} • Week {weeksCompleted} • {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCompareMode(!showCompareMode)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                  showCompareMode
                    ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Compare Mode
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowExportModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-semibold text-sm shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Report
              </motion.button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PerformanceDashboard
                analyticsData={analyticsData}
                userName={userName}
                userLogin={userLogin}
                daysSinceStart={daysSinceStart}
                weeksCompleted={weeksCompleted}
                currentDate={currentDate}
              />
            </motion.div>
          )}

          {/* Physical Progress Tab */}
          {activeTab === 'physical' && (
            <motion.div
              key="physical"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PhysicalProgress
                userData={userData}
                analyticsData={analyticsData}
                daysSinceStart={daysSinceStart}
                currentDate={currentDate}
              />
            </motion.div>
          )}

          {/* Mental Wellness Tab */}
          {activeTab === 'mental' && (
            <motion.div
              key="mental"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MentalWellnessInsights
                userData={userData}
                analyticsData={analyticsData}
                currentDate={currentDate}
              />
            </motion.div>
          )}

          {/* Nutrition Tab */}
          {activeTab === 'nutrition' && (
            <motion.div
              key="nutrition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <NutritionCompliance
                analyticsData={analyticsData}
                currentDate={currentDate}
              />
            </motion.div>
          )}

          {/* AI Reports Tab */}
          {activeTab === 'reports' && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AIGeneratedReports
                userData={userData}
                analyticsData={analyticsData}
                userName={userName}
                userLogin={userLogin}
                daysSinceStart={daysSinceStart}
                weeksCompleted={weeksCompleted}
                currentDate={currentDate}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compare Mode Overlay */}
        {showCompareMode && (
          <CompareMode
            onClose={() => setShowCompareMode(false)}
            userData={userData}
            analyticsData={analyticsData}
            currentDate={currentDate}
          />
        )}
      </div>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Export Report</h3>
              <p className="text-gray-600 mb-6">
                Choose the format for your progress report
              </p>

              <div className="space-y-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white rounded-xl font-semibold flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    <span>Download PDF Report</span>
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-semibold flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Export CSV Data</span>
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 bg-gradient-to-r from-[#22d3ee] to-[#06b6d4] text-white rounded-xl font-semibold flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>Email to Doctor</span>
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowExportModal(false)}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all"
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgressReportsPage;