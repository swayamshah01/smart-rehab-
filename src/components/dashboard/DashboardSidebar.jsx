import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DashboardSidebar = ({ activeModule, setActiveModule, sidebarOpen, setSidebarOpen, userData, userProgress }) => {
  const navigate = useNavigate();

  const modules = [
    { id: 'exercise', label: 'Exercise', icon: '🏋️', gradient: 'from-[#22d3ee] to-[#06b6d4]' },
    { id: 'wellness', label: 'Mental Wellness', icon: '🧘', gradient: 'from-[#a855f7] to-[#9333ea]' },
    { id: 'nutrition', label: 'Nutrition', icon: '🍎', gradient: 'from-[#10b981] to-[#059669]' },
    { id: 'progress', label: 'Progress', icon: '📊', gradient: 'from-[#f59e0b] to-[#d97706]' },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: sidebarOpen ? 0 : -300 }}
      className={`fixed left-0 top-0 h-full bg-white shadow-2xl z-40 w-80 overflow-y-auto`}
    >
      <div className="p-6">
        {/* Logo & Close */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0f172a]">Rehab Hub</h2>
              <p className="text-xs text-gray-600">Your Recovery Journey</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Profile */}
        <div className="bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-2xl p-4 mb-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm">
              👤
            </div>
            <div>
              <p className="font-bold">swayamshah01</p>
              <p className="text-sm opacity-90">Level {userProgress?.level || 3}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="opacity-90">XP Progress</span>
              <span className="font-semibold">{userProgress?.totalXP || 350}/500</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((userProgress?.totalXP || 350) / 500) * 100}%` }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Navigation Modules */}
        <nav className="space-y-2 mb-6">
          {modules.map((module) => (
            <motion.button
              key={module.id}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeModule === module.id
                  ? `bg-gradient-to-r ${module.gradient} text-white shadow-lg`
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="text-2xl">{module.icon}</span>
              <span className="font-semibold">{module.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6"></div>

        {/* Additional Actions */}
        <div className="space-y-2">
          {/* Progress Reports Button */}
          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const savedUserData = localStorage.getItem('rehabUserData');
              const completeData = savedUserData ? JSON.parse(savedUserData) : userData;
              navigate('/progress-reports', { state: completeData });
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#ec4899] to-[#db2777] text-white shadow-lg hover:shadow-xl transition-all"
          >
            <span className="text-2xl">📈</span>
            <div className="flex-1 text-left">
              <p className="font-semibold">Detailed Reports</p>
              <p className="text-xs opacity-90">View full analytics</p>
            </div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Feedback & Adaptive Button */}
          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const savedUserData = localStorage.getItem('rehabUserData');
              const completeData = savedUserData ? JSON.parse(savedUserData) : userData;
              navigate('/feedback-adaptive', { state: completeData });
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#10b981] via-[#22d3ee] to-[#a855f7] text-white shadow-lg hover:shadow-xl transition-all"
          >
            <span className="text-2xl">🔄</span>
            <div className="flex-1 text-left">
              <p className="font-semibold">Optimize Plan</p>
              <p className="text-xs opacity-90">AI adjustments</p>
            </div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Gamified Mode Button */}
          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const savedUserData = localStorage.getItem('rehabUserData');
              const completeData = savedUserData ? JSON.parse(savedUserData) : userData;
              navigate('/gamified', { state: completeData });
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ec4899] text-white shadow-lg hover:shadow-xl transition-all"
          >
            <span className="text-2xl">🎮</span>
            <div className="flex-1 text-left">
              <p className="font-semibold">Gamified Mode</p>
              <p className="text-xs opacity-90">Play & recover</p>
            </div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 transition-all"
          >
            <span className="text-2xl">⚙️</span>
            <span className="font-semibold">Settings</span>
          </motion.button>

          {/* Help */}
          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 transition-all"
          >
            <span className="text-2xl">❓</span>
            <span className="font-semibold">Help & Support</span>
          </motion.button>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <h3 className="font-bold text-[#0f172a] mb-3">Quick Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Streak</span>
              <span className="font-bold text-[#f59e0b] flex items-center gap-1">
                🔥 {userProgress?.currentStreak || 7} days
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sessions Done</span>
              <span className="font-bold text-[#22d3ee]">{userProgress?.exercisesCompleted || 25}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Recovery</span>
              <span className="font-bold text-[#10b981]">65%</span>
            </div>
          </div>
        </div>

        {/* Date & Time Display */}
        <div className="mt-6 p-4 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl border border-[#22d3ee]/20">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-[#22d3ee]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs font-semibold text-[#22d3ee]">Current Session</p>
          </div>
          <p className="text-sm font-bold text-[#0f172a]">
            {new Date('2025-11-06T11:08:24Z').toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
          <p className="text-xs text-gray-600">
            {new Date('2025-11-06T11:08:24Z').toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardSidebar;