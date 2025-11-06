import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const QuickWidgets = ({ userData, userProgress }) => {
  const navigate = useNavigate();

  // Get recovery style from userData or localStorage
  const recoveryStyle = userData?.recoveryStyle || 
    JSON.parse(localStorage.getItem('rehabUserData') || '{}').recoveryStyle || 
    'gamified'; // Default to gamified

  const widgets = [
    {
      id: 1,
      title: 'Next Session',
      time: 'In 2 hours',
      icon: '⏰',
      gradient: 'from-[#22d3ee] to-[#06b6d4]',
      action: 'View Exercises',
      onClick: () => {}, 
    },
    {
      id: 2,
      title: 'Mindfulness Tip',
      description: 'Take 5 deep breaths',
      icon: '🧘',
      gradient: 'from-[#a855f7] to-[#9333ea]',
      action: 'Start Now',
      onClick: () => {}, 
    },
    {
      id: 3,
      title: 'Nutrition Insight',
      description: 'Increase protein intake',
      icon: '🍎',
      gradient: 'from-[#10b981] to-[#059669]',
      action: 'View Plan',
      onClick: () => {}, 
    },
  ];

  const handleGamifiedClick = () => {
    // Get complete user data from localStorage
    const savedUserData = localStorage.getItem('rehabUserData');
    const completeData = savedUserData ? JSON.parse(savedUserData) : userData;
    
    navigate('/gamified', { state: completeData });
  };

  return (
    <div>
      {/* Regular Quick Widgets */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {widgets.map((widget, index) => (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={widget.onClick}
            className={`bg-gradient-to-br ${widget.gradient} rounded-2xl p-6 text-white shadow-lg cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">{widget.icon}</div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-semibold transition-all"
              >
                {widget.action}
              </motion.button>
            </div>
            <h3 className="text-lg font-bold mb-1">{widget.title}</h3>
            <p className="text-white/90">{widget.time || widget.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Gamified Mode Banner - Always show */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.02, y: -5 }}
        onClick={handleGamifiedClick}
        className="relative bg-gradient-to-r from-[#f59e0b] via-[#ec4899] to-[#a855f7] rounded-3xl p-8 shadow-2xl cursor-pointer border-2 border-white/20 mb-8 overflow-hidden group"
      >
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -top-20 -left-20 w-40 h-40 bg-white rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.5, 1, 1.5],
              rotate: [360, 180, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-white rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Animated Icon */}
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-8xl filter drop-shadow-2xl"
            >
              ⚔️
            </motion.div>

            {/* Text Content */}
            <div>
              <motion.h3 
                className="text-4xl font-bold text-white mb-2 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Enter Gamified Rehab Mode
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🎮
                </motion.span>
              </motion.h3>
              <motion.p 
                className="text-white/90 text-lg mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                Complete quests, earn XP, unlock achievements, and make recovery an adventure!
              </motion.p>
              
              {/* Stats Preview */}
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                  <span className="text-xl">⭐</span>
                  <span className="text-sm font-semibold">Level {userProgress?.level || 3}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                  <span className="text-xl">🔥</span>
                  <span className="text-sm font-semibold">{userProgress?.currentStreak || 7} Day Streak</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                  <span className="text-xl">🏆</span>
                  <span className="text-sm font-semibold">5 Badges Earned</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-10 py-5 bg-white rounded-2xl font-bold text-2xl shadow-2xl overflow-hidden group"
          >
            {/* Button Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f59e0b] via-[#ec4899] to-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Button Text */}
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#ec4899] to-[#a855f7] group-hover:text-white transition-colors duration-300 flex items-center gap-3">
              Play Now
              <motion.svg
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
          </motion.button>
        </div>

        {/* Bottom Shine Effect */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
        />
      </motion.div>

      {/* Additional Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <h4 className="text-lg font-bold text-[#0f172a] mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Today's Progress
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Exercises</span>
              <span className="font-bold text-[#22d3ee]">{userProgress?.exercisesCompleted || 0}/4</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((userProgress?.exercisesCompleted || 0) / 4) * 100}%` }}
                className="h-full bg-gradient-to-r from-[#22d3ee] to-[#a855f7]"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Water Intake</span>
              <span className="font-bold text-[#22d3ee]">6/10 glasses</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                className="h-full bg-gradient-to-r from-[#22d3ee] to-[#06b6d4]"
              />
            </div>
          </div>
        </motion.div>

        {/* Quick Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-2xl p-6 border-2 border-[#f59e0b]/30"
        >
          <h4 className="text-lg font-bold text-[#0f172a] mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Quick Tip
          </h4>
          <p className="text-gray-800 leading-relaxed">
            <strong>Recovery Boost:</strong> Completing exercises in the morning can improve your energy levels by 30% throughout the day. Try scheduling your next session earlier!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-4 py-2 bg-[#f59e0b] hover:bg-[#d97706] text-white rounded-lg font-semibold text-sm transition-all"
          >
            Schedule Morning Session
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default QuickWidgets;