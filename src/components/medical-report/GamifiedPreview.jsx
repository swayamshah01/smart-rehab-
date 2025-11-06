import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GamifiedPreview = ({ userData }) => {
  const [activeDemo, setActiveDemo] = useState('xp');

  const achievements = [
    { id: 1, name: 'First Steps', icon: '👣', description: 'Complete your first exercise', unlocked: true, xp: 50 },
    { id: 2, name: 'Week Warrior', icon: '🔥', description: '7-day exercise streak', unlocked: false, xp: 100 },
    { id: 3, name: 'Pain Buster', icon: '💪', description: 'Reduce pain level by 3 points', unlocked: false, xp: 150 },
    { id: 4, name: 'Consistency King', icon: '👑', description: '30-day exercise streak', unlocked: false, xp: 500 },
    { id: 5, name: 'Full Recovery', icon: '🏆', description: 'Complete all rehab phases', unlocked: false, xp: 1000 },
  ];

  const levels = [
    { level: 1, name: 'Beginner', minXP: 0, maxXP: 500, color: 'from-[#ef4444] to-[#dc2626]' },
    { level: 2, name: 'Novice', minXP: 500, maxXP: 1500, color: 'from-[#f59e0b] to-[#d97706]' },
    { level: 3, name: 'Intermediate', minXP: 1500, maxXP: 3000, color: 'from-[#22d3ee] to-[#06b6d4]' },
    { level: 4, name: 'Advanced', minXP: 3000, maxXP: 5000, color: 'from-[#a855f7] to-[#9333ea]' },
    { level: 5, name: 'Expert', minXP: 5000, maxXP: 10000, color: 'from-[#10b981] to-[#059669]' },
    { level: 6, name: 'Master', minXP: 10000, maxXP: 999999, color: 'from-[#f59e0b] via-[#f59e0b] to-[#eab308]' },
  ];

  const dailyGoals = [
    { id: 1, task: 'Complete 3 exercises', progress: 0, total: 3, xp: 30, icon: '🏋️' },
    { id: 2, task: 'Log pain level', progress: 0, total: 1, xp: 10, icon: '📝' },
    { id: 3, task: '15 min stretching', progress: 0, total: 15, xp: 20, icon: '🧘' },
    { id: 4, task: 'Drink 8 glasses of water', progress: 0, total: 8, xp: 15, icon: '💧' },
  ];

  const currentXP = 350;
  const currentLevel = levels.find(l => currentXP >= l.minXP && currentXP < l.maxXP);
  const progressToNextLevel = ((currentXP - currentLevel.minXP) / (currentLevel.maxXP - currentLevel.minXP)) * 100;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0f172a] mb-2">
          Your Gamified Recovery System
        </h2>
        <p className="text-gray-600">
          Earn XP, unlock achievements, and track your progress with fun rewards
        </p>
      </div>

      {/* Demo Tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        {[
          { id: 'xp', label: 'XP & Levels', icon: '⭐' },
          { id: 'achievements', label: 'Achievements', icon: '🏆' },
          { id: 'daily', label: 'Daily Goals', icon: '🎯' },
          { id: 'leaderboard', label: 'Leaderboard', icon: '📊' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveDemo(tab.id)}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeDemo === tab.id
                ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white shadow-lg'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#22d3ee]/50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* XP & Levels */}
      {activeDemo === 'xp' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Current Level Card */}
          <div className={`bg-gradient-to-br ${currentLevel.color} rounded-2xl p-8 shadow-xl border border-white/20 text-white`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm font-semibold opacity-90 mb-1">CURRENT LEVEL</div>
                <h3 className="text-4xl font-bold">Level {currentLevel.level}</h3>
                <p className="text-lg opacity-90">{currentLevel.name}</p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl"
              >
                ⭐
              </motion.div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span>{currentXP} XP</span>
                <span>{currentLevel.maxXP} XP</span>
              </div>
              <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextLevel}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-white rounded-full shadow-lg"
                />
              </div>
            </div>
            <p className="text-sm opacity-90">
              {currentLevel.maxXP - currentXP} XP to Level {currentLevel.level + 1}
            </p>
          </div>

          {/* Level Progression */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-[#0f172a] mb-6">Level Progression</h3>
            <div className="space-y-4">
              {levels.map((level, index) => (
                <motion.div
                  key={level.level}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    level.level === currentLevel.level
                      ? `bg-gradient-to-r ${level.color} text-white shadow-lg`
                      : level.level < currentLevel.level
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    level.level === currentLevel.level
                      ? 'bg-white/20'
                      : 'bg-white/50'
                  }`}>
                    {level.level}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{level.name}</h4>
                    <p className="text-sm opacity-80">{level.minXP} - {level.maxXP} XP</p>
                  </div>
                  {level.level <= currentLevel.level && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Achievements */}
      {activeDemo === 'achievements' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`relative p-6 rounded-2xl border-2 transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-[#fef3c7] to-[#fde68a] border-[#f59e0b] shadow-lg'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              {achievement.unlocked && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring' }}
                  className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full flex items-center justify-center shadow-lg"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}

              <div className="flex items-start gap-4">
                <div className={`text-6xl ${!achievement.unlocked && 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`text-lg font-bold mb-1 ${achievement.unlocked ? 'text-[#0f172a]' : 'text-gray-400'}`}>
                    {achievement.name}
                  </h4>
                  <p className={`text-sm mb-3 ${achievement.unlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    achievement.unlocked
                      ? 'bg-[#f59e0b] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    +{achievement.xp} XP
                  </div>
                </div>
              </div>

              {!achievement.unlocked && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-semibold text-gray-600">Locked</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Daily Goals */}
      {activeDemo === 'daily' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#0f172a]">Today's Goals</h3>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total XP Available</p>
              <p className="text-2xl font-bold text-[#22d3ee]">+75 XP</p>
            </div>
          </div>

          <div className="space-y-4">
            {dailyGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-4 border border-[#22d3ee]/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{goal.icon}</span>
                    <div>
                      <h4 className="font-semibold text-[#0f172a]">{goal.task}</h4>
                      <p className="text-sm text-gray-600">{goal.progress}/{goal.total} completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-full text-xs font-semibold">
                      +{goal.xp} XP
                    </div>
                  </div>
                </div>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(goal.progress / goal.total) * 100}%` }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-[#22d3ee] to-[#a855f7] rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 bg-gradient-to-r from-[#fef3c7] to-[#fde68a] rounded-xl p-4 border-2 border-[#f59e0b]"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔥</span>
              <div>
                <h4 className="font-bold text-[#0f172a]">Streak Bonus!</h4>
                <p className="text-sm text-gray-700">Complete all daily goals for 7 days to earn +200 bonus XP</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Leaderboard */}
      {activeDemo === 'leaderboard' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-[#0f172a] mb-6">Weekly Leaderboard</h3>
          <div className="space-y-3">
            {[
              { rank: 1, name: 'Sarah Johnson', xp: 1250, avatar: '👩', badge: '🥇' },
              { rank: 2, name: 'Michael Chen', xp: 1180, avatar: '👨', badge: '🥈' },
              { rank: 3, name: 'Emma Davis', xp: 1050, avatar: '👩', badge: '🥉' },
              { rank: 4, name: 'You (swayamshah01)', xp: 350, avatar: '🧑', badge: '', isUser: true },
              { rank: 5, name: 'James Wilson', xp: 320, avatar: '👨', badge: '' },
            ].map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  user.isUser
                    ? 'bg-gradient-to-r from-[#22d3ee]/20 to-[#a855f7]/20 border-2 border-[#22d3ee] shadow-md'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  user.rank <= 3
                    ? 'bg-gradient-to-r from-[#f59e0b] to-[#eab308] text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {user.rank}
                </div>
                <div className="text-4xl">{user.avatar}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#0f172a]">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.xp.toLocaleString()} XP</p>
                </div>
                {user.badge && <span className="text-3xl">{user.badge}</span>}
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-[#22d3ee]/10 to-[#a855f7]/10 rounded-xl border border-[#22d3ee]/30">
            <p className="text-sm text-gray-700 text-center">
              <span className="font-semibold text-[#22d3ee]">Keep going!</span> You're {1050 - 350} XP away from top 3!
            </p>
          </div>
        </motion.div>
      )}

      {/* System Preview Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-gradient-to-r from-[#a855f7]/10 to-[#ec4899]/10 border border-[#a855f7]/30 rounded-xl p-6"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-[#0f172a] mb-2">Gamification Preview</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              This is a preview of your gamified recovery system. Once you start your rehab journey, 
              you'll earn real XP, unlock achievements, and compete on leaderboards. The system automatically 
              adapts to your progress and provides personalized rewards to keep you motivated!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GamifiedPreview;