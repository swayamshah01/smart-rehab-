import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MentalWellnessInsights = ({ userData, analyticsData, currentDate }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Mood data over time
  const moodData = [
    { day: 'Mon', mood: 7, stress: 4, meditation: 10 },
    { day: 'Tue', mood: 7.5, stress: 3.5, meditation: 15 },
    { day: 'Wed', mood: 8, stress: 3, meditation: 10 },
    { day: 'Thu', mood: 8.5, stress: 2.5, meditation: 15 },
    { day: 'Fri', mood: 8, stress: 3, meditation: 10 },
    { day: 'Sat', mood: 9, stress: 2, meditation: 20 },
    { day: 'Sun', mood: 9, stress: 2, meditation: 15 },
  ];

  // Mood-Pain correlation data
  const correlationData = [
    { metric: 'Meditation vs Pain', correlation: 0.72, strength: 'Strong Positive' },
    { metric: 'Mood vs Recovery Speed', correlation: 0.65, strength: 'Moderate Positive' },
    { metric: 'Stress vs Pain', correlation: -0.58, strength: 'Moderate Negative' },
    { metric: 'Sleep vs Performance', correlation: 0.81, strength: 'Very Strong Positive' },
  ];

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-[#0f172a] mb-3">
          Mental <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">Wellness Insights</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Analyze your emotional stability and mental resilience throughout recovery
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Report Date: {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </p>
      </motion.div>

      {/* Mental Wellness Score */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] rounded-2xl p-6 border-2 border-[#a855f7]/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#a855f7] rounded-full flex items-center justify-center">
              <span className="text-2xl">🧠</span>
            </div>
            <div>
              <p className="text-sm text-gray-700">Mental Wellness</p>
              <p className="text-3xl font-bold text-[#a855f7]">{analyticsData.mentalWellnessScore}/100</p>
            </div>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${analyticsData.mentalWellnessScore}%` }}
              className="h-full bg-gradient-to-r from-[#a855f7] to-[#ec4899]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-2xl p-6 border-2 border-[#f59e0b]/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#f59e0b] rounded-full flex items-center justify-center">
              <span className="text-2xl">😊</span>
            </div>
            <div>
              <p className="text-sm text-gray-700">Average Mood</p>
              <p className="text-3xl font-bold text-[#f59e0b]">8.3/10</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            <strong className="text-[#10b981]">+40%</strong> improvement since week 2
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-2xl p-6 border-2 border-[#22d3ee]/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#22d3ee] rounded-full flex items-center justify-center">
              <span className="text-2xl">🧘</span>
            </div>
            <div>
              <p className="text-sm text-gray-700">Meditation Minutes</p>
              <p className="text-3xl font-bold text-[#22d3ee]">95</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Total this week • <strong>13.6 min/day</strong> average
          </p>
        </motion.div>
      </div>

      {/* Mood Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#0f172a]">Mood & Stress Timeline</h3>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#a855f7]"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Dual Line Chart */}
        <div className="relative h-64 mb-6">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid */}
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="0.2"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Mood Line */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
              d={moodData.map((point, index) => {
                const x = (index / (moodData.length - 1)) * 100;
                const y = 100 - ((point.mood / 10) * 100);
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#10b981"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            {/* Stress Line */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              d={moodData.map((point, index) => {
                const x = (index / (moodData.length - 1)) * 100;
                const y = 100 - ((point.stress / 10) * 100);
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#ef4444"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="2,2"
            />

            {/* Data Points */}
            {moodData.map((point, index) => {
              const x = (index / (moodData.length - 1)) * 100;
              const moodY = 100 - ((point.mood / 10) * 100);
              const stressY = 100 - ((point.stress / 10) * 100);
              return (
                <g key={index}>
                  <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    cx={x}
                    cy={moodY}
                    r="1.5"
                    fill="#10b981"
                    stroke="white"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                  <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    cx={x}
                    cy={stressY}
                    r="1.5"
                    fill="#ef4444"
                    stroke="white"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              );
            })}
          </svg>

          {/* Y-axis */}
          <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-600">
            {[10, 7.5, 5, 2.5, 0].map((val) => (
              <div key={val} className="text-right">{val}</div>
            ))}
          </div>
        </div>

        {/* X-axis */}
        <div className="flex justify-between text-sm text-gray-600 px-8 mb-6">
          {moodData.map((point) => (
            <div key={point.day} className="text-center">
              <p className="font-semibold">{point.day}</p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-[#10b981] rounded"></div>
            <span className="text-sm text-gray-700">Mood Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-[#ef4444] rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #ef4444 0, #ef4444 4px, transparent 4px, transparent 8px)' }}></div>
            <span className="text-sm text-gray-700">Stress Level</span>
          </div>
        </div>
      </motion.div>

      {/* AI Insights */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-bold text-[#0f172a] mb-4 flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            AI Mental Wellness Insights
          </h3>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl p-4 border border-[#10b981]/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#10b981] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#10b981] mb-1">Peak Performance Pattern</h4>
                  <p className="text-sm text-gray-700">
                    Your best performance happens when <strong>stress level is below 4</strong>. Plan intense exercises on low-stress days.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] rounded-xl p-4 border border-[#a855f7]/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#a855f7] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#a855f7] mb-1">Meditation Impact</h4>
                  <p className="text-sm text-gray-700">
                    Sessions with <strong>15+ minutes</strong> of meditation correlate with <strong>30% pain reduction</strong> the next day.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-xl p-4 border border-[#f59e0b]/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#f59e0b] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#f59e0b] mb-1">Mood Improvement</h4>
                  <p className="text-sm text-gray-700">
                    Your mood has improved by <strong>40% since week 2</strong>, showing strong mental resilience and adaptation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Correlation Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-bold text-[#0f172a] mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Mental-Physical Correlation
          </h3>

          <div className="space-y-4">
            {correlationData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{item.metric}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    Math.abs(item.correlation) > 0.7
                      ? 'bg-[#10b981]/20 text-[#10b981]'
                      : Math.abs(item.correlation) > 0.5
                      ? 'bg-[#22d3ee]/20 text-[#22d3ee]'
                      : 'bg-[#f59e0b]/20 text-[#f59e0b]'
                  }`}>
                    {item.strength}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.abs(item.correlation) * 100}%` }}
                      transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                      className={`h-full ${
                        item.correlation > 0
                          ? 'bg-gradient-to-r from-[#10b981] to-[#059669]'
                          : 'bg-gradient-to-r from-[#ef4444] to-[#dc2626]'
                      }`}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-700 w-12 text-right">
                    {item.correlation > 0 ? '+' : ''}{(item.correlation * 100).toFixed(0)}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl border border-[#22d3ee]/20">
            <p className="text-sm text-gray-700">
              <strong className="text-[#22d3ee]">Key Finding:</strong> Strong correlation between mental wellness activities and physical recovery metrics. Continue prioritizing meditation and stress management!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Daily Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
      >
        <h3 className="text-xl font-bold text-[#0f172a] mb-6">Weekly Mental Wellness Activities</h3>

        <div className="grid md:grid-cols-7 gap-3">
          {moodData.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              className="text-center"
            >
              <p className="text-sm font-semibold text-gray-700 mb-3">{day.day}</p>
              
              <div className="space-y-2">
                {/* Mood */}
                <div className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-lg p-3 border border-[#10b981]/20">
                  <p className="text-xs text-gray-600 mb-1">Mood</p>
                  <p className="text-lg font-bold text-[#10b981]">{day.mood}</p>
                </div>

                {/* Meditation */}
                <div className="bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] rounded-lg p-3 border border-[#a855f7]/20">
                  <p className="text-xs text-gray-600 mb-1">Meditation</p>
                  <p className="text-lg font-bold text-[#a855f7]">{day.meditation}m</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MentalWellnessInsights;