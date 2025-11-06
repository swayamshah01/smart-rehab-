import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import AIVisualExplanation from '../components/medical-report/AIVisualExplanation';
import RecoveryTimeline from '../components/medical-report/RecoveryTimeline';
import PainMoodCheckIn from '../components/medical-report/PainMoodCheckIn';
import AudioExplanation from '../components/medical-report/AudioExplanation';
import GamifiedPreview from '../components/medical-report/GamifiedPreview';
import NutritionMindfulnessWidget from '../components/medical-report/NutritionMindfulnessWidget';

const MedicalReportPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('visuals');
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [userData, setUserData] = useState(location.state || {});
  const [checkInData, setCheckInData] = useState({
    painLevel: 5,
    mood: null,
  });

  useEffect(() => {
    // Simulate AI analysis
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'visuals', label: 'AI Visual Explanation', icon: '🔍' },
    { id: 'timeline', label: 'Recovery Timeline', icon: '📅' },
    { id: 'checkin', label: 'Pain & Mood Check-In', icon: '💓' },
    { id: 'audio', label: 'Audio Guide', icon: '🔊' },
    ...(userData.recoveryStyle === 'gamified' ? [{ id: 'rewards', label: 'XP System', icon: '🎮' }] : []),
  ];

  const handleContinue = () => {
    if (!checkInData.mood) {
      alert('Please complete the Pain & Mood Check-In before continuing.');
      setActiveTab('checkin');
      return;
    }
    navigate('/dashboard', { state: { ...userData, checkInData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#dbeafe] relative overflow-hidden">
      {/* Animated Background Elements */}
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
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-3xl"
        />
        
        {/* Subtle muscle illustrations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <path d="M100,300 Q200,200 300,300 T500,300" stroke="#22d3ee" strokeWidth="2" fill="none" />
            <path d="M700,600 Q600,500 500,600 T300,600" stroke="#a855f7" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-[#22d3ee]/20 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-lg flex items-center justify-center shadow-lg shadow-[#a855f7]/30">
              <span className="text-white font-bold text-xl">R+</span>
            </div>
            <span className="text-[#0f172a] font-bold text-xl">RehabAI</span>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-[#22d3ee]">
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/onboarding')}
              className="text-gray-600 hover:text-[#22d3ee] transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </motion.button>
          </div>
        </div>
      </header>

      {/* AI Analysis Loading */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0f172a]/90 backdrop-blur-md z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 mx-auto mb-6"
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="60 200"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
              <motion.h2
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl font-bold text-white mb-2"
              >
                AI Analyzing Your Medical Report
              </motion.h2>
              <p className="text-gray-400">
                Processing your data and generating personalized insights...
              </p>
              <div className="mt-6 flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    className="w-3 h-3 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#a855f7]/30"
          >
            <span className="text-4xl">🩺</span>
          </motion.div>
          <h1 className="text-4xl font-bold text-[#0f172a] mb-3">
            Your Medical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">Report Analysis</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Understanding your condition through AI-powered visualization and personalized insights
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-[#22d3ee]/20 mb-6"
            >
              <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[150px] px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-[#22d3ee] border-b-2 border-[#22d3ee] bg-[#22d3ee]/5'
                        : 'text-gray-500 hover:text-[#22d3ee] hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'visuals' && <AIVisualExplanation userData={userData} />}
                    {activeTab === 'timeline' && <RecoveryTimeline userData={userData} />}
                    {activeTab === 'checkin' && (
                      <PainMoodCheckIn 
                        checkInData={checkInData} 
                        setCheckInData={setCheckInData} 
                      />
                    )}
                    {activeTab === 'audio' && <AudioExplanation userData={userData} />}
                    {activeTab === 'rewards' && <GamifiedPreview userData={userData} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Continue Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className="px-10 py-4 rounded-full font-semibold bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white shadow-lg shadow-[#a855f7]/30 hover:shadow-[#a855f7]/50 transition-all flex items-center gap-3 text-lg"
              >
                <span>Start My Rehab Journey</span>
                <motion.svg
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </motion.button>
            </motion.div>
          </div>

          {/* Sidebar - Nutrition & Mindfulness Widgets */}
          <div className="lg:col-span-1">
            <NutritionMindfulnessWidget userData={userData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalReportPage;