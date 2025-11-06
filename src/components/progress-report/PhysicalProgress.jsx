import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PhysicalProgress = ({ userData, analyticsData, daysSinceStart, currentDate }) => {
  const [selectedGraph, setSelectedGraph] = useState('pain');

  // Pain data over 6 weeks
  const painData = [
    { week: 'Week 1', value: 8, date: '2024-10-01' },
    { week: 'Week 2', value: 7, date: '2024-10-08' },
    { week: 'Week 3', value: 6, date: '2024-10-15' },
    { week: 'Week 4', value: 5, date: '2024-10-22' },
    { week: 'Week 5', value: 4, date: '2024-10-29' },
    { week: 'Week 6', value: 3.5, date: '2024-11-05' },
  ];

  // Mobility data
  const mobilityData = [
    { week: 'Week 1', value: 45, date: '2024-10-01' },
    { week: 'Week 2', value: 52, date: '2024-10-08' },
    { week: 'Week 3', value: 58, date: '2024-10-15' },
    { week: 'Week 4', value: 64, date: '2024-10-22' },
    { week: 'Week 5', value: 68, date: '2024-10-29' },
    { week: 'Week 6', value: 72, date: '2024-11-05' },
  ];

  // Strength data
  const strengthData = [
    { week: 'Week 1', value: 30, date: '2024-10-01' },
    { week: 'Week 2', value: 35, date: '2024-10-08' },
    { week: 'Week 3', value: 40, date: '2024-10-15' },
    { week: 'Week 4', value: 50, date: '2024-10-22' },
    { week: 'Week 5', value: 60, date: '2024-10-29' },
    { week: 'Week 6', value: 70, date: '2024-11-05' },
  ];

  // Exercise consistency heatmap (7 days x 6 weeks = 42 days)
  const consistencyData = Array.from({ length: 42 }, (_, i) => {
    const intensity = Math.random();
    return {
      day: i + 1,
      completed: intensity > 0.2,
      intensity: intensity > 0.8 ? 'high' : intensity > 0.5 ? 'medium' : intensity > 0.2 ? 'low' : 'none',
    };
  });

  const graphOptions = [
    { id: 'pain', label: 'Pain Trend', icon: '💊', color: '#f59e0b', data: painData },
    { id: 'mobility', label: 'Mobility Index', icon: '🤸', color: '#a855f7', data: mobilityData },
    { id: 'strength', label: 'Strength Gain', icon: '💪', color: '#22d3ee', data: strengthData },
  ];

  const currentData = graphOptions.find(g => g.id === selectedGraph)?.data || painData;
  const maxValue = selectedGraph === 'pain' ? 10 : 100;

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-[#0f172a] mb-3">
          Physical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">Progress Analytics</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Track your physical recovery metrics and improvements over time
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Last updated: {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-2xl p-6 border-2 border-[#f59e0b]/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#f59e0b] rounded-full flex items-center justify-center">
              <span className="text-2xl">💊</span>
            </div>
            <div>
              <p className="text-sm text-gray-700">Pain Reduction</p>
              <p className="text-3xl font-bold text-[#f59e0b]">-56%</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            From <strong>8.0/10</strong> to <strong>3.5/10</strong> in {daysSinceStart} days
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] rounded-2xl p-6 border-2 border-[#a855f7]/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#a855f7] rounded-full flex items-center justify-center">
              <span className="text-2xl">🤸</span>
            </div>
            <div>
              <p className="text-sm text-gray-700">Mobility Gain</p>
              <p className="text-3xl font-bold text-[#a855f7]">+60%</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            From <strong>45%</strong> to <strong>72%</strong> of target range
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
              <span className="text-2xl">💪</span>
            </div>
            <div>
              <p className="text-sm text-gray-700">Strength Increase</p>
              <p className="text-3xl font-bold text-[#22d3ee]">+133%</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            From <strong>30%</strong> to <strong>70%</strong> of baseline strength
          </p>
        </motion.div>
      </div>

      {/* Graph Selector & Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
      >
        {/* Graph Tabs */}
        <div className="flex gap-3 mb-8">
          {graphOptions.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedGraph(option.id)}
              className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                selectedGraph === option.id
                  ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <span className="text-2xl">{option.icon}</span>
              {option.label}
            </motion.button>
          ))}
        </div>

        {/* Line Graph */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#0f172a]">
              {graphOptions.find(g => g.id === selectedGraph)?.label} Over Time
            </h3>
            <div className="text-sm text-gray-600">
              Last updated: {currentDate.toLocaleDateString()}
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="relative h-64">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid lines */}
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

              {/* Line path */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: 'easeOut' }}
                d={currentData.map((point, index) => {
                  const x = (index / (currentData.length - 1)) * 100;
                  const y = 100 - ((point.value / maxValue) * 100);
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke={graphOptions.find(g => g.id === selectedGraph)?.color}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
              />

              {/* Area fill */}
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1.5 }}
                d={`
                  M 0 100
                  ${currentData.map((point, index) => {
                    const x = (index / (currentData.length - 1)) * 100;
                    const y = 100 - ((point.value / maxValue) * 100);
                    return `L ${x} ${y}`;
                  }).join(' ')}
                  L 100 100
                  Z
                `}
                fill={graphOptions.find(g => g.id === selectedGraph)?.color}
              />

              {/* Data points */}
              {currentData.map((point, index) => {
                const x = (index / (currentData.length - 1)) * 100;
                const y = 100 - ((point.value / maxValue) * 100);
                return (
                  <motion.circle
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    cx={x}
                    cy={y}
                    r="1.5"
                    fill={graphOptions.find(g => g.id === selectedGraph)?.color}
                    stroke="white"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                    className="cursor-pointer"
                  />
                );
              })}
            </svg>

            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-600">
              {[maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0].map((val) => (
                <div key={val} className="text-right pr-2">
                  {selectedGraph === 'pain' ? val.toFixed(1) : Math.round(val)}
                </div>
              ))}
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-sm text-gray-600 mt-4 px-12">
            {currentData.map((point) => (
              <div key={point.week} className="text-center">
                <p className="font-semibold">{point.week.split(' ')[1]}</p>
                <p className="text-xs text-gray-400">{point.date.split('-').slice(1).join('/')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Starting Value</p>
            <p className="text-2xl font-bold text-gray-800">
              {selectedGraph === 'pain' 
                ? `${currentData[0].value}/10`
                : `${currentData[0].value}%`
              }
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Current Value</p>
            <p className="text-2xl font-bold text-gray-800">
              {selectedGraph === 'pain' 
                ? `${currentData[currentData.length - 1].value}/10`
                : `${currentData[currentData.length - 1].value}%`
              }
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Total Change</p>
            <p className="text-2xl font-bold text-[#10b981]">
              {selectedGraph === 'pain' 
                ? `-${((currentData[0].value - currentData[currentData.length - 1].value) / currentData[0].value * 100).toFixed(0)}%`
                : `+${((currentData[currentData.length - 1].value - currentData[0].value) / currentData[0].value * 100).toFixed(0)}%`
              }
            </p>
          </div>
        </div>
      </motion.div>

      {/* Exercise Consistency Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Exercise Consistency Heatmap</h3>
        
        <div className="mb-4">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-600">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {consistencyData.map((day, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.02 }}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                className={`aspect-square rounded-lg cursor-pointer transition-all relative group ${
                  day.intensity === 'high'
                    ? 'bg-[#10b981] shadow-lg'
                    : day.intensity === 'medium'
                    ? 'bg-[#22d3ee]'
                    : day.intensity === 'low'
                    ? 'bg-[#f59e0b]'
                    : 'bg-gray-200'
                }`}
              >
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0f172a] text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                  <p className="font-semibold">Day {day.day}</p>
                  <p>{day.completed ? 'Completed' : 'Skipped'}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 text-xs text-gray-600">
            <span>Less Active</span>
            <div className="flex gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-4 h-4 bg-[#f59e0b] rounded"></div>
              <div className="w-4 h-4 bg-[#22d3ee] rounded"></div>
              <div className="w-4 h-4 bg-[#10b981] rounded"></div>
            </div>
            <span>More Active</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center p-4 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl border border-[#10b981]/20">
            <p className="text-sm text-gray-700 mb-1">Sessions Completed</p>
            <p className="text-3xl font-bold text-[#10b981]">
              {consistencyData.filter(d => d.completed).length}
            </p>
            <p className="text-xs text-gray-600 mt-1">out of {consistencyData.length} days</p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-xl border border-[#f59e0b]/20">
            <p className="text-sm text-gray-700 mb-1">Adherence Rate</p>
            <p className="text-3xl font-bold text-[#f59e0b]">
              {Math.round((consistencyData.filter(d => d.completed).length / consistencyData.length) * 100)}%
            </p>
            <p className="text-xs text-gray-600 mt-1">Excellent consistency!</p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl border border-[#22d3ee]/20">
            <p className="text-sm text-gray-700 mb-1">Longest Streak</p>
            <p className="text-3xl font-bold text-[#22d3ee]">10</p>
            <p className="text-xs text-gray-600 mt-1">consecutive days</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PhysicalProgress;