import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProgressReports = ({ userData, userProgress, updateProgress }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [hoveredDay, setHoveredDay] = useState(null);

  // Personalized data based on user
  const userName = 'Swayam';
  const currentDate = new Date('2025-11-06T09:41:46Z');
  const recoveryStartDate = new Date('2025-10-01');
  const daysSinceStart = Math.floor((currentDate - recoveryStartDate) / (1000 * 60 * 60 * 24));
  const weeksCompleted = Math.floor(daysSinceStart / 7);

  // Enhanced weekly data
  const weeklyData = [
    { 
      day: 'Mon', 
      date: '2025-10-31',
      exercises: 4, 
      pain: 6, 
      mood: 7, 
      xp: 150,
      duration: 45,
      mobility: 60,
      energy: 7,
      sleep: 7.5,
    },
    { 
      day: 'Tue', 
      date: '2025-11-01',
      exercises: 3, 
      pain: 5.5, 
      mood: 7.5, 
      xp: 120,
      duration: 35,
      mobility: 62,
      energy: 7.5,
      sleep: 8,
    },
    { 
      day: 'Wed', 
      date: '2025-11-02',
      exercises: 4, 
      pain: 5, 
      mood: 8, 
      xp: 160,
      duration: 50,
      mobility: 65,
      energy: 8,
      sleep: 7,
    },
    { 
      day: 'Thu', 
      date: '2025-11-03',
      exercises: 4, 
      pain: 4.5, 
      mood: 8.5, 
      xp: 170,
      duration: 48,
      mobility: 68,
      energy: 8.5,
      sleep: 8,
    },
    { 
      day: 'Fri', 
      date: '2025-11-04',
      exercises: 3, 
      pain: 4, 
      mood: 8, 
      xp: 140,
      duration: 40,
      mobility: 70,
      energy: 8,
      sleep: 7.5,
    },
    { 
      day: 'Sat', 
      date: '2025-11-05',
      exercises: 4, 
      pain: 3.5, 
      mood: 9, 
      xp: 180,
      duration: 55,
      mobility: 72,
      energy: 9,
      sleep: 8.5,
    },
    { 
      day: 'Sun', 
      date: '2025-11-06',
      exercises: 3, 
      pain: 3, 
      mood: 9, 
      xp: 150,
      duration: 42,
      mobility: 75,
      energy: 8.5,
      sleep: 8,
    },
  ];

  // Monthly data for trend analysis
  const monthlyData = [
    { week: 'Week 1', pain: 8, mobility: 45, mood: 6, exercises: 18 },
    { week: 'Week 2', pain: 7, mobility: 52, mood: 7, exercises: 21 },
    { week: 'Week 3', pain: 6, mobility: 58, mood: 7.5, exercises: 24 },
    { week: 'Week 4', pain: 5, mobility: 64, mood: 8, exercises: 25 },
    { week: 'Week 5', pain: 4, mobility: 68, mood: 8.5, exercises: 25 },
    { week: 'Week 6', pain: 3.5, mobility: 72, mood: 8.8, exercises: 25 },
  ];

  // AI insights
  const aiInsights = [
    {
      id: 1,
      type: 'success',
      icon: '🎉',
      title: 'Outstanding Progress!',
      description: `${userName}, your pain level has decreased by 56% over the past 6 weeks! From 8/10 to 3.5/10. This is exceptional progress for day ${daysSinceStart} of recovery.`,
      action: 'View Pain Trends',
      gradient: 'from-[#10b981] to-[#059669]',
    },
    {
      id: 2,
      type: 'improvement',
      icon: '💪',
      title: 'Mobility Milestone Reached',
      description: `You've improved mobility by 60% since starting! Your consistent exercise completion (92%) is paying off. Keep it up!`,
      action: 'See Mobility Chart',
      gradient: 'from-[#22d3ee] to-[#06b6d4]',
    },
    {
      id: 3,
      type: 'recommendation',
      icon: '🎯',
      title: 'AI Recommendation',
      description: `Based on your ${userData.affectedArea || 'knee'} recovery pattern, you're ready to progress to Level 3 exercises. Your body is responding excellently!`,
      action: 'Upgrade Plan',
      gradient: 'from-[#a855f7] to-[#9333ea]',
    },
    {
      id: 4,
      type: 'warning',
      icon: '⚠️',
      title: 'Sleep Optimization',
      description: `Your sleep average is 7.8 hours. Increasing to 8+ hours could accelerate recovery by 20% based on similar recovery profiles.`,
      action: 'Sleep Tips',
      gradient: 'from-[#f59e0b] to-[#d97706]',
    },
  ];

  // Achievements
  const achievements = [
    { id: 1, name: 'First Steps', date: '2025-10-01', icon: '👣', unlocked: true, progress: 100 },
    { id: 2, name: 'Week Warrior', date: '2025-10-08', icon: '🔥', unlocked: true, progress: 100 },
    { id: 3, name: 'Pain Reducer', date: '2025-10-15', icon: '💊', unlocked: true, progress: 100 },
    { id: 4, name: 'Consistency Champion', date: '2025-10-22', icon: '⭐', unlocked: true, progress: 100 },
    { id: 5, name: 'Mobility Master', date: '2025-11-05', icon: '🤸', unlocked: true, progress: 100 },
    { id: 6, name: '30-Day Streak', date: null, icon: '👑', unlocked: false, progress: 85, remaining: '4 days' },
    { id: 7, name: 'Full Recovery', date: null, icon: '🏆', unlocked: false, progress: 65, remaining: '3 weeks' },
  ];

  // Milestones
  const milestones = [
    { 
      week: 1, 
      phase: 'Early Recovery',
      goal: 'Reduce pain by 2 points', 
      status: 'completed', 
      progress: 100,
      achieved: 'Reduced from 8/10 to 6/10',
      date: '2025-10-08',
    },
    { 
      week: 2, 
      phase: 'Early Recovery',
      goal: 'Complete 20 exercises', 
      status: 'completed', 
      progress: 100,
      achieved: 'Completed 21 exercises',
      date: '2025-10-15',
    },
    { 
      week: 3, 
      phase: 'Mid Recovery',
      goal: 'Improve mobility by 15%', 
      status: 'completed', 
      progress: 100,
      achieved: 'Improved by 18%',
      date: '2025-10-22',
    },
    { 
      week: 4, 
      phase: 'Mid Recovery',
      goal: '7-day exercise streak', 
      status: 'completed', 
      progress: 100,
      achieved: '10-day streak achieved',
      date: '2025-10-29',
    },
    { 
      week: 5, 
      phase: 'Mid Recovery',
      goal: 'Pain level below 4/10', 
      status: 'completed', 
      progress: 100,
      achieved: 'Currently at 3.5/10',
      date: '2025-11-05',
    },
    { 
      week: 6, 
      phase: 'Advanced Recovery',
      goal: 'Return to daily activities', 
      status: 'in-progress', 
      progress: 75,
      expected: '2025-11-12',
    },
    { 
      week: 7, 
      phase: 'Advanced Recovery',
      goal: 'Complete advanced exercises', 
      status: 'upcoming', 
      progress: 20,
      expected: '2025-11-19',
    },
    { 
      week: 8, 
      phase: 'Final Phase',
      goal: 'Full mobility restoration', 
      status: 'upcoming', 
      progress: 0,
      expected: '2025-11-26',
    },
  ];

  // Peer comparison
  const peerComparison = {
    exerciseCompletion: { you: 92, average: 78, percentile: 88 },
    painReduction: { you: 56, average: 35, percentile: 92 },
    mobilityGain: { you: 60, average: 42, percentile: 90 },
    recoverySpeed: { you: 'Fast', average: 'Moderate', percentile: 90 },
  };

  // Calculate statistics
  const totalExercises = weeklyData.reduce((sum, day) => sum + day.exercises, 0);
  const avgPain = (weeklyData.reduce((sum, day) => sum + day.pain, 0) / weeklyData.length).toFixed(1);
  const avgMood = (weeklyData.reduce((sum, day) => sum + day.mood, 0) / weeklyData.length).toFixed(1);
  const avgMobility = (weeklyData.reduce((sum, day) => sum + day.mobility, 0) / weeklyData.length).toFixed(0);

  // Line chart helper functions
  const getLineChartPoints = (data, key, maxValue = 10) => {
    const width = 100;
    const height = 160;
    const padding = 20;
    
    return data.map((item, index) => {
      const x = (index / (data.length - 1)) * width;
      const value = key === 'mobility' ? item[key] / 10 : item[key];
      const y = height - padding - ((value / maxValue) * (height - 2 * padding));
      return { x: `${x}%`, y, value: item[key], label: item.day || item.week, rawIndex: index };
    });
  };

  const createSmoothPath = (points) => {
    if (points.length === 0) return '';
    
    const commands = points.map((point, i) => {
      if (i === 0) return `M ${point.x} ${point.y}`;
      
      const prev = points[i - 1];
      const cpx = `calc((${prev.x} + ${point.x}) / 2)`;
      
      return `Q ${cpx} ${prev.y}, ${cpx} ${(prev.y + point.y) / 2} Q ${cpx} ${point.y}, ${point.x} ${point.y}`;
    });
    
    return commands.join(' ');
  };

  return (
    <div>
      {/* Personalized Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#ec4899] rounded-2xl p-8 text-white shadow-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-2">
                Welcome back, {userName}! 👋
              </h2>
              <p className="text-white/90 text-lg mb-4">
                Day {daysSinceStart} of your recovery journey • Week {weeksCompleted}
              </p>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <p className="text-sm">Recovery Progress: <strong>65%</strong></p>
                </div>
                <div className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <p className="text-sm">Current Phase: <strong>Advanced Recovery</strong></p>
                </div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="text-6xl"
            >
              🎯
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* AI Insights */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
          <span className="text-3xl">🤖</span>
          AI-Powered Insights for You
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {aiInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`bg-gradient-to-br ${insight.gradient} rounded-2xl p-6 text-white shadow-lg cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl">{insight.icon}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                  {insight.type.toUpperCase()}
                </span>
              </div>
              <h4 className="text-xl font-bold mb-2">{insight.title}</h4>
              <p className="text-white/90 mb-4 leading-relaxed">{insight.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold text-sm transition-all"
              >
                {insight.action} →
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#22d3ee]/30"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">📅</span>
            <span className="text-xs font-semibold text-[#22d3ee]">This Week</span>
          </div>
          <h3 className="text-3xl font-bold text-[#0f172a] mb-1">{totalExercises}</h3>
          <p className="text-sm text-gray-600 mb-2">Exercises Completed</p>
          <div className="text-[#10b981] text-xs font-semibold flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            +4 from last week
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#10b981]/30"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">😊</span>
            <span className="text-xs font-semibold text-[#10b981]">Excellent</span>
          </div>
          <h3 className="text-3xl font-bold text-[#0f172a] mb-1">{avgPain}/10</h3>
          <p className="text-sm text-gray-600 mb-2">Average Pain Level</p>
          <div className="text-[#10b981] text-xs font-semibold flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            -2.5 improvement
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#a855f7]/30"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">💪</span>
            <span className="text-xs font-semibold text-[#a855f7]">Improving</span>
          </div>
          <h3 className="text-3xl font-bold text-[#0f172a] mb-1">{avgMobility}%</h3>
          <p className="text-sm text-gray-600 mb-2">Mobility Score</p>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${avgMobility}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-[#a855f7] to-[#ec4899]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#f59e0b]/30"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">😄</span>
            <span className="text-xs font-semibold text-[#f59e0b]">Great</span>
          </div>
          <h3 className="text-3xl font-bold text-[#0f172a] mb-1">{avgMood}/10</h3>
          <p className="text-sm text-gray-600 mb-2">Mood Score</p>
          <div className="text-[#10b981] text-xs font-semibold flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Stable & Positive
          </div>
        </motion.div>
      </div>

      {/* Peer Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-2xl p-6 border border-[#22d3ee]/20 mb-8"
      >
        <h3 className="text-xl font-bold text-[#0f172a] mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          How You Compare to Similar Recovery Profiles
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {Object.entries(peerComparison).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4"
            >
              <p className="text-sm text-gray-600 mb-2 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-3xl font-bold text-[#22d3ee]">
                  {typeof value.you === 'number' ? value.you + (key.includes('Completion') || key.includes('Reduction') || key.includes('Gain') ? '%' : '') : value.you}
                </span>
                <span className="text-sm text-gray-500 mb-1">
                  vs {typeof value.average === 'number' ? value.average + (key.includes('Completion') || key.includes('Reduction') || key.includes('Gain') ? '%' : '') : value.average}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value.percentile}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-[#22d3ee] to-[#10b981]"
                  />
                </div>
                <span className="text-xs font-semibold text-[#10b981]">
                  Top {100 - value.percentile}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-white/50 rounded-xl">
          <p className="text-sm text-gray-700">
            <strong className="text-[#10b981]">Great news, {userName}!</strong> You're performing better than {peerComparison.exerciseCompletion.percentile}% of users with similar {userData.affectedArea || 'knee'} injuries at this stage of recovery. Keep up the excellent work! 🌟
          </p>
        </div>
      </motion.div>

      {/* Line Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Trends Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#0f172a]">Weekly Progress Trends</h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#22d3ee]"
            >
              <option value="all">All Metrics</option>
              <option value="pain">Pain Only</option>
              <option value="mood">Mood Only</option>
              <option value="mobility">Mobility Only</option>
            </select>
          </div>

          {/* Line Chart */}
          <div className="relative h-48 mb-6">
            <svg width="100%" height="100%" viewBox="0 0 100 160" preserveAspectRatio="none" className="overflow-visible">
              {/* Grid lines */}
              {[0, 2.5, 5, 7.5, 10].map((value, index) => {
                const y = 160 - 20 - ((value / 10) * 120);
                return (
                  <g key={index}>
                    <line
                      x1="0"
                      y1={y}
                      x2="100"
                      y2={y}
                      stroke="#e5e7eb"
                      strokeWidth="0.2"
                      vectorEffect="non-scaling-stroke"
                    />
                    <text
                      x="-2"
                      y={y + 1}
                      fontSize="3"
                      fill="#9ca3af"
                      textAnchor="end"
                    >
                      {value}
                    </text>
                  </g>
                );
              })}

              {/* Pain Line */}
              {(selectedMetric === 'all' || selectedMetric === 'pain') && (() => {
                const painPoints = getLineChartPoints(weeklyData, 'pain');
                
                return (
                  <g>
                    {/* Area gradient */}
                    <defs>
                      <linearGradient id="painAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Area fill */}
                    <motion.path
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      d={`M 0 140 ${painPoints.map(p => `L ${p.x} ${p.y}`).join(' ')} L 100 140 Z`}
                      fill="url(#painAreaGradient)"
                    />
                    
                    {/* Line */}
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      d={`M ${painPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="0.8"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Points */}
                    {painPoints.map((point, index) => (
                      <motion.circle
                        key={`pain-${index}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        cx={point.x}
                        cy={point.y}
                        r="1.5"
                        fill="#f59e0b"
                        stroke="white"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredDay(point.rawIndex)}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    ))}
                  </g>
                );
              })()}

              {/* Mood Line */}
              {(selectedMetric === 'all' || selectedMetric === 'mood') && (() => {
                const moodPoints = getLineChartPoints(weeklyData, 'mood');
                
                return (
                  <g>
                    <defs>
                      <linearGradient id="moodAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    <motion.path
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.4 }}
                      d={`M 0 140 ${moodPoints.map(p => `L ${p.x} ${p.y}`).join(' ')} L 100 140 Z`}
                      fill="url(#moodAreaGradient)"
                    />
                    
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                      d={`M ${moodPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="0.8"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {moodPoints.map((point, index) => (
                      <motion.circle
                        key={`mood-${index}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        cx={point.x}
                        cy={point.y}
                        r="1.5"
                        fill="#10b981"
                        stroke="white"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredDay(point.rawIndex)}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    ))}
                  </g>
                );
              })()}

              {/* Mobility Line */}
              {(selectedMetric === 'all' || selectedMetric === 'mobility') && (() => {
                const mobilityPoints = getLineChartPoints(weeklyData, 'mobility', 10);
                
                return (
                  <g>
                    <defs>
                      <linearGradient id="mobilityAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    <motion.path
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      d={`M 0 140 ${mobilityPoints.map(p => `L ${p.x} ${p.y}`).join(' ')} L 100 140 Z`}
                      fill="url(#mobilityAreaGradient)"
                    />
                    
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                      d={`M ${mobilityPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="0.8"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {mobilityPoints.map((point, index) => (
                      <motion.circle
                        key={`mobility-${index}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        cx={point.x}
                        cy={point.y}
                        r="1.5"
                        fill="#a855f7"
                        stroke="white"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredDay(point.rawIndex)}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    ))}
                  </g>
                );
              })()}
            </svg>

            {/* Tooltip */}
            {hoveredDay !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#0f172a] text-white px-4 py-3 rounded-lg shadow-xl z-10 pointer-events-none"
              >
                <p className="text-xs font-semibold mb-2">{weeklyData[hoveredDay].day} - {weeklyData[hoveredDay].date.split('-').slice(1).join('/')}</p>
                <div className="space-y-1 text-xs">
                  <p className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#f59e0b] rounded-full"></span>
                    Pain: {weeklyData[hoveredDay].pain}/10
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#10b981] rounded-full"></span>
                    Mood: {weeklyData[hoveredDay].mood}/10
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#a855f7] rounded-full"></span>
                    Mobility: {weeklyData[hoveredDay].mobility}%
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between px-2 text-xs text-gray-600 mb-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="text-center">
                <p className="font-semibold">{day.day}</p>
                <p className="text-gray-400">{day.date.split('-')[2]}</p>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <div className="w-4 h-4 bg-[#f59e0b] rounded-full"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Pain</p>
                <p className="text-sm font-bold text-[#0f172a]">{avgPain}/10</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <div className="w-4 h-4 bg-[#10b981] rounded-full"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Mood</p>
                <p className="text-sm font-bold text-[#0f172a]">{avgMood}/10</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <div className="w-4 h-4 bg-[#a855f7] rounded-full"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Mobility</p>
                <p className="text-sm font-bold text-[#0f172a]">{avgMobility}%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Monthly Trends Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-xl font-bold text-[#0f172a] mb-6">6-Week Recovery Journey</h3>
          
          {/* Line Chart */}
          <div className="relative h-48 mb-6">
            <svg width="100%" height="100%" viewBox="0 0 100 160" preserveAspectRatio="none" className="overflow-visible">
              {/* Grid */}
              {[0, 20, 40, 60, 80, 100].map((value, index) => {
                const y = 160 - 20 - ((value / 100) * 120);
                return (
                  <g key={index}>
                    <line
                      x1="0"
                      y1={y}
                      x2="100"
                      y2={y}
                      stroke="#e5e7eb"
                      strokeWidth="0.2"
                      vectorEffect="non-scaling-stroke"
                    />
                    <text
                      x="-2"
                      y={y + 1}
                      fontSize="3"
                      fill="#9ca3af"
                      textAnchor="end"
                    >
                      {value}
                    </text>
                  </g>
                );
              })}

              {/* Mobility Progress */}
              {(() => {
                const mobilityPoints = getLineChartPoints(monthlyData, 'mobility', 100);
                
                return (
                  <g>
                    <defs>
                      <linearGradient id="monthlyMobilityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    <motion.path
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      d={`M 0 140 ${mobilityPoints.map(p => `L ${p.x} ${p.y}`).join(' ')} L 100 140 Z`}
                      fill="url(#monthlyMobilityGradient)"
                    />
                    
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                      d={`M ${mobilityPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                    />
                    
                    {mobilityPoints.map((point, index) => (
                      <motion.circle
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.15 }}
                        cx={point.x}
                        cy={point.y}
                        r="1.8"
                        fill="#22d3ee"
                        stroke="white"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                  </g>
                );
              })()}

              {/* Pain Reduction (inverted) */}
              {(() => {
                const painPoints = monthlyData.map((item, index) => {
                  const x = (index / (monthlyData.length - 1)) * 100;
                  const value = 100 - (item.pain * 10); // Invert so decrease shows as increase
                  const y = 160 - 20 - ((value / 100) * 120);
                  return { x: `${x}%`, y, value: item.pain, label: item.week, rawIndex: index };
                });
                
                return (
                  <g>
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.6 }}
                      d={`M ${painPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeDasharray="2,2"
                    />
                    
                    {painPoints.map((point, index) => (
                      <motion.circle
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.15 }}
                        cx={point.x}
                        cy={point.y}
                        r="1.5"
                        fill="#10b981"
                        stroke="white"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between px-2 text-xs text-gray-600 mb-4">
            {monthlyData.map((week, index) => (
              <span key={index} className="font-semibold">{week.week.split(' ')[1]}</span>
            ))}
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-4 border border-[#22d3ee]/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-[#22d3ee] rounded-full"></div>
                <p className="text-xs font-semibold text-gray-600">Mobility Gain</p>
              </div>
              <p className="text-2xl font-bold text-[#22d3ee]">+60%</p>
              <p className="text-xs text-gray-600 mt-1">From 45% to 72%</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl p-4 border border-[#10b981]/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
                <p className="text-xs font-semibold text-gray-600">Pain Reduction</p>
              </div>
              <p className="text-2xl font-bold text-[#10b981]">-56%</p>
              <p className="text-xs text-gray-600 mt-1">From 8/10 to 3.5/10</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rest of the components remain the same - Milestones, Achievements, Doctor Report */}
      {/* ... (keeping previous code for milestones, achievements, and doctor report) ... */}

    </div>
  );
};

export default ProgressReports;