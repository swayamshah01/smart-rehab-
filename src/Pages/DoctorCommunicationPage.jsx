import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import PatientOverview from '../components/doctor-panel/PatientOverview';
import DetailedAnalytics from '../components/doctor-panel/DetailedAnalytics';
import CommunicationFeedback from '../components/doctor-panel/CommunicationFeedback';
import PlanValidationControl from '../components/doctor-panel/PlanValidationControl';
import ReportsExportCenter from '../components/doctor-panel/ReportsExportCenter';
import PatientListSidebar from '../components/doctor-panel/PatientListSidebar';

const DoctorCommunicationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentDate = new Date('2025-11-06T11:12:05Z');
  const userLogin = 'swayamshah01';
  
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
      painImprovement: 56,
      mobilityChange: 60,
      strengthGain: 45,
      consistencyRate: 92,
      nutritionScore: 85,
      mentalWellnessScore: 88,
    };
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientList, setShowPatientList] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [doctorStatus, setDoctorStatus] = useState('online');

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: 'Swayam Shah',
      username: 'swayamshah01',
      injury: 'Knee Injury',
      affectedArea: 'Right Knee',
      daysSinceStart: 36,
      overallScore: 85,
      painLevel: 3.5,
      lastActive: currentDate,
      status: 'active',
      priority: 'normal',
      unreadMessages: 2,
    },
    {
      id: 2,
      name: 'John Anderson',
      username: 'johnanderson',
      injury: 'Shoulder Injury',
      affectedArea: 'Left Shoulder',
      daysSinceStart: 28,
      overallScore: 72,
      painLevel: 5.0,
      lastActive: new Date('2025-11-06T09:30:00Z'),
      status: 'active',
      priority: 'high',
      unreadMessages: 1,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      username: 'emilyrodriguez',
      injury: 'Ankle Sprain',
      affectedArea: 'Right Ankle',
      daysSinceStart: 14,
      overallScore: 90,
      painLevel: 2.0,
      lastActive: new Date('2025-11-05T18:20:00Z'),
      status: 'active',
      priority: 'normal',
      unreadMessages: 0,
    },
  ];

  useEffect(() => {
    // Set default selected patient to current user
    const currentPatient = patients.find(p => p.username === userLogin);
    setSelectedPatient(currentPatient || patients[0]);
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📋', color: 'from-[#22d3ee] to-[#06b6d4]' },
    { id: 'analytics', label: 'Analytics', icon: '📊', color: 'from-[#a855f7] to-[#9333ea]' },
    { id: 'communication', label: 'Communication', icon: '💬', color: 'from-[#10b981] to-[#059669]', badge: unreadMessages },
    { id: 'plan-control', label: 'Plan Control', icon: '⚙️', color: 'from-[#f59e0b] to-[#d97706]' },
    { id: 'reports', label: 'Reports', icon: '📁', color: 'from-[#ec4899] to-[#db2777]' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#dbeafe] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.1, 0.05],
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
            opacity: [0.05, 0.1, 0.05],
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
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">👨‍⚕️</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#0f172a]">
                    Doctor <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">Command Center</span>
                  </h1>
                  <p className="text-sm text-gray-600">
                    Clinical Monitoring & Patient Communication • {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Doctor Status & Actions */}
            <div className="flex items-center gap-4">
              {/* Doctor Status */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-full">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-white rounded-full"
                />
                <span className="text-sm font-semibold capitalize">{doctorStatus}</span>
              </div>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadMessages > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#ef4444] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadMessages}
                  </div>
                )}
              </motion.button>

              {/* Doctor Profile */}
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full">
                <div className="w-10 h-10 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center text-xl">
                  Dr
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-[#0f172a]">Dr. Sarah Mitchell</p>
                  <p className="text-xs text-gray-600">Orthopedic Specialist</p>
                </div>
              </div>

              {/* Back Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold text-sm transition-all"
              >
                Exit Panel
              </motion.button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#ef4444] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex h-[calc(100vh-180px)]">
        {/* Patient List Sidebar */}
        <PatientListSidebar
          patients={patients}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
          showPatientList={showPatientList}
          setShowPatientList={setShowPatientList}
          currentDate={currentDate}
        />

        {/* Main Panel */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedPatient ? (
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <PatientOverview
                  key="dashboard"
                  patient={selectedPatient}
                  userProgress={userProgress}
                  currentDate={currentDate}
                />
              )}

              {activeTab === 'analytics' && (
                <DetailedAnalytics
                  key="analytics"
                  patient={selectedPatient}
                  userProgress={userProgress}
                  currentDate={currentDate}
                />
              )}

              {activeTab === 'communication' && (
                <CommunicationFeedback
                  key="communication"
                  patient={selectedPatient}
                  currentDate={currentDate}
                  setUnreadMessages={setUnreadMessages}
                />
              )}

              {activeTab === 'plan-control' && (
                <PlanValidationControl
                  key="plan-control"
                  patient={selectedPatient}
                  userProgress={userProgress}
                  currentDate={currentDate}
                />
              )}

              {activeTab === 'reports' && (
                <ReportsExportCenter
                  key="reports"
                  patient={selectedPatient}
                  userProgress={userProgress}
                  currentDate={currentDate}
                />
              )}
            </AnimatePresence>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">👨‍⚕️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Select a Patient</h3>
                <p className="text-gray-600">Choose a patient from the sidebar to view their details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCommunicationPage;