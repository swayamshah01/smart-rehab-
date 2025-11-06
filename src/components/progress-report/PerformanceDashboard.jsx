import React from 'react';
import { motion } from 'framer-motion';

const PerformanceDashboard = ({ analyticsData, userName, userLogin, daysSinceStart, weeksCompleted, currentDate }) => {
  const metrics = [
    {
      id: 1,
      label: 'Sessions Completed',
      value: analyticsData.sessionsCompleted,
      icon: '🎯',
      gradient: 'from-[#22d3ee] to-[#06b6d4]',
      change: '+4 this week',
      trend: 'up',
    },
    {
      id: 2,
      label: 'Current Streak',
      value: `${analyticsData.currentStreak} Days`,
      icon: '🔥',
      gradient: 'from-[#f59e0b] to-[#d97706]',
      change: 'Personal best!',
      trend: 'up',
    },
    {
      id: 3,
      label: 'Pain Improvement',
      value: `${analyticsData.painImprovement}%`,
      icon: '💊',
      gradient: 'from-[#10b981] to-[#059669]',
      change: '-2.5 points',
      trend: 'up',
    },
    {
      id: 4,
      label: 'Mobility Gain',
      value: `${analyticsData.mobilityChange}%`,
      icon: '🤸',
      gradient: 'from-[#a855f7] to-[#9333ea]',
      change: '+15% from baseline',
      trend: 'up',
    },
  ];

  const ringData = [
    { label: 'Strength', value: analyticsData.strengthGain, color: '#22d3ee', max: 100 },
    { label: 'Flexibility', value: analyticsData.mobilityChange, color: '#10b981', max: 100 },
    { label: 'Consistency', value: analyticsData.consistencyRate, color: '#f59e0b', max: 100 },
    { label: 'Mental Wellness', value: analyticsData.mentalWellnessScore, color: '#a855f7', max: 100 },
  ];

  const circumference = 2 * Math.PI * 70;

  return (
    <div>
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#ec4899] rounded-3xl p-8 mb-8 text-white shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-3">
              Incredible Progress, {userName}! 🎉
            </h2>
            <p className="text-white/90 text-xl mb-4">
              You've been on your recovery journey for <strong>{daysSinceStart} days</strong> and completed <strong>{weeksCompleted} weeks</strong>
            </p>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                <p className="text-sm">Overall Progress: <strong>65%</strong></p>
              </div>
              <div className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                <p className="text-sm">Recovery Phase: <strong>Advanced</strong></p>
              </div>
              <div className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                <p className="text-sm">User: <strong>{userLogin}</strong></p>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-8xl"
          >
            🏆
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`bg-gradient-to-br ${metric.gradient} rounded-2xl p-6 text-white shadow-lg cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-5xl">{metric.icon}</span>
              {metric.trend === 'up' && (
                <div className="px-2 py-1 bg-white/20 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <p className="text-sm opacity-90 mb-1">{metric.label}</p>
            <p className="text-4xl font-bold mb-2">{metric.value}</p>
            <p className="text-sm opacity-80">{metric.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Recovery Ring */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Recovery Ring</h3>
          
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-80 h-80">
              <svg className="w-full h-full -rotate-90">
                {ringData.map((ring, index) => {
                  const radius = 70 - index * 20;
                  const newCircumference = 2 * Math.PI * radius;
                  const newOffset = newCircumference - (ring.value / ring.max) * newCircumference;

                  return (
                    <g key={ring.label}>
                      {/* Background circle */}
                      <circle
                        cx="160"
                        cy="160"
                        r={radius}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="16"
                      />
                      {/* Progress circle */}
                      <motion.circle
                        initial={{ strokeDashoffset: newCircumference }}
                        animate={{ strokeDashoffset: newOffset }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: 'easeOut' }}
                        cx="160"
                        cy="160"
                        r={radius}
                        fill="none"
                        stroke={ring.color}
                        strokeWidth="16"
                        strokeDasharray={newCircumference}
                        strokeLinecap="round"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">
                    65%
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Overall Recovery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-4">
            {ringData.map((ring) => (
              <div key={ring.label} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: ring.color }}
                ></div>
                <div>
                  <p className="text-sm font-semibold text-[#0f172a]">{ring.label}</p>
                  <p className="text-xs text-gray-600">{ring.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-[#0f172a] mb-6">AI Key Insights</h3>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl p-4 border border-[#10b981]/20"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#10b981] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#10b981] mb-1">Excellent Consistency</h4>
                  <p className="text-sm text-gray-700">
                    You've maintained a <strong>92% adherence rate</strong>. Your commitment is paying off with accelerated recovery!
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] rounded-xl p-4 border border-[#22d3ee]/20"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#22d3ee] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#22d3ee] mb-1">Peak Performance Days</h4>
                  <p className="text-sm text-gray-700">
                    You perform best on <strong>Tuesdays and Thursdays</strong>. Consider scheduling intense exercises on these days.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-xl p-4 border border-[#f59e0b]/20"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f59e0b] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#f59e0b] mb-1">Recovery Acceleration</h4>
                  <p className="text-sm text-gray-700">
                    Based on current trends, you're on track to complete recovery <strong>2 weeks ahead</strong> of the standard timeline!
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] rounded-xl p-4 border border-[#a855f7]/20"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#a855f7] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#a855f7] mb-1">Mental-Physical Correlation</h4>
                  <p className="text-sm text-gray-700">
                    AI detected a <strong>strong positive correlation</strong> between your meditation sessions and pain reduction the following day.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Weekly Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#0f172a]">Weekly Performance Summary</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-lg text-sm font-semibold shadow-lg">
              Week
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-all">
              Month
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl border border-[#22d3ee]/20">
            <p className="text-sm text-gray-600 mb-2">Avg. Session Time</p>
            <p className="text-4xl font-bold text-[#22d3ee] mb-1">42min</p>
            <p className="text-xs text-gray-600">+5min from last week</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl border border-[#10b981]/20">
            <p className="text-sm text-gray-600 mb-2">Calories Burned</p>
            <p className="text-4xl font-bold text-[#10b981] mb-1">1,250</p>
            <p className="text-xs text-gray-600">Total this week</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-xl border border-[#f59e0b]/20">
            <p className="text-sm text-gray-600 mb-2">XP Earned</p>
            <p className="text-4xl font-bold text-[#f59e0b] mb-1">1,070</p>
            <p className="text-xs text-gray-600">+270 from last week</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] rounded-xl border border-[#a855f7]/20">
            <p className="text-sm text-gray-600 mb-2">Badges Earned</p>
            <p className="text-4xl font-bold text-[#a855f7] mb-1">5</p>
            <p className="text-xs text-gray-600">2 new this week</p>
          </div>
        </div>

        {/* Current Date Display */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-600">
                Report generated on: <strong className="text-[#0f172a]">{currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong> at <strong className="text-[#0f172a]">{currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</strong>
              </p>
            </div>
            <div className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full text-xs font-semibold">
              ✓ Real-time Data
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceDashboard;