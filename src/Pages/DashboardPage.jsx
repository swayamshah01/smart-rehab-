import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ExerciseScreen from '../components/dashboard/ExerciseScreen';
import MentalWellness from '../components/dashboard/MentalWellness';
import NutritionPage from '../components/dashboard/NutritionPage';
import ProgressReports from '../components/dashboard/ProgressReports';
import AIAssistant from '../components/dashboard/AIAssistant';
import QuickWidgets from '../components/dashboard/QuickWidgets';

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize userData from location state or localStorage
  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem('rehabUserData');
    return location.state || (savedUserData ? JSON.parse(savedUserData) : {});
  });
  
  const [activeModule, setActiveModule] = useState('exercise');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
  // User progress data
  const [userProgress, setUserProgress] = useState(() => {
    const savedProgress = localStorage.getItem('rehabProgress');
    return savedProgress ? JSON.parse(savedProgress) : {
      currentStreak: 7,
      totalXP: 350,
      level: 3,
      todayCompleted: false,
      exercisesCompleted: 0,
      painTrend: [],
      moodTrend: [],
    };
  });

  // Save userData to localStorage whenever it changes
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      localStorage.setItem('rehabUserData', JSON.stringify(userData));
    }
  }, [userData]);

  // Update userData if location state changes
  useEffect(() => {
    if (location.state && Object.keys(location.state).length > 0) {
      setUserData(location.state);
    }
  }, [location.state]);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem('rehabProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const updateProgress = (newData) => {
    setUserProgress({ ...userProgress, ...newData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#dbeafe] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-[#22d3ee]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#10b981]/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <DashboardSidebar
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          userData={userData}
          userProgress={userProgress}
        />

        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
          {/* Header */}
          <DashboardHeader
            userData={userData}
            userProgress={userProgress}
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
          />

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {/* Quick Widgets - Show on dashboard home */}
              {activeModule === 'exercise' && (
                <QuickWidgets userData={userData} userProgress={userProgress} />
              )}

              {/* Module Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeModule === 'exercise' && (
                    <ExerciseScreen
                      userData={userData}
                      userProgress={userProgress}
                      updateProgress={updateProgress}
                    />
                  )}
                  {activeModule === 'wellness' && (
                    <MentalWellness
                      userData={userData}
                      userProgress={userProgress}
                      updateProgress={updateProgress}
                    />
                  )}
                  {activeModule === 'nutrition' && (
                    <NutritionPage
                      userData={userData}
                      userProgress={userProgress}
                      updateProgress={updateProgress}
                    />
                  )}
                  {activeModule === 'progress' && (
                    <ProgressReports
                      userData={userData}
                      userProgress={userProgress}
                      updateProgress={updateProgress}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant
        show={showAIAssistant}
        setShow={setShowAIAssistant}
        userData={userData}
        userProgress={userProgress}
      />

      {/* Floating AI Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowAIAssistant(!showAIAssistant)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] rounded-full shadow-lg shadow-[#a855f7]/50 flex items-center justify-center text-white z-50"
      >
        <motion.div
          animate={{ rotate: showAIAssistant ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {showAIAssistant ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default DashboardPage;