import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DetailedAnalytics = ({ patient, userProgress, currentDate }) => {
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Exercise performance heatmap data (6 weeks × 7 days)
  const heatmapData = Array.from({ length: 42 }, (_, i) => {
    const intensity = Math.random();
    return {
      day: i,
      intensity: intensity > 0.8 ? 'high' : intensity > 0.5 ? 'medium' : intensity > 0.2 ? 'low' : 'none',
      value: Math.round(intensity * 100),
    };
  });

  // Mobility comparison data
  const mobilityData = {
    baseline: { shoulder: 45, knee: 40, ankle: 50, hip: 55 },
    current: { shoulder: 72, knee: 68, ankle: 75, hip: 80 },
  };

  // Pain-Mood correlation data
  const correlationData = [
    { week: 'W1', pain: 8, mood: 6 },
    { week: 'W2', pain: 7, mood: 6.5 },
    { week: 'W3', pain: 6, mood: 7 },
    { week: 'W4', pain: 5, mood: 7.5 },
    { week: 'W5', pain: 4, mood: 8 },
    { week: 'W6', pain: 3.5, mood: 8.5 },
  ];

  // Nutrition adherence data
  const nutritionData = [
    { nutrient: 'Protein', target: 70, actual: 68, adherence: 97 },
    { nutrient: 'Calories', target: 2000, actual: 1900, adherence: 95 },
    { nutrient: 'Water', target: 10, actual: 8.5, adherence: 85 },
    { nutrient: 'Calcium', target: 1200, actual: 960, adherence: 80 },
    { nutrient: 'Vitamin D', target: 800, actual: 640, adherence: 80 },
  ];

  // AI Anomaly Detection
  const anomalies = [
    {
      date: '2025-11-04',
      type: 'Pain Spike',
      severity: 'medium',
      description: 'Pain level increased from 3.0 to 5.5 after exercise session',
      recommendation: 'Consider reducing exercise intensity by 15%',
    },
    {
      date: '2025-11-02',
      type: 'Low Adherence',
      severity: 'low',
      description: 'Missed 2 consecutive sessions',
      recommendation: 'Schedule follow-up to assess barriers to adherence',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#f59e0b] rounded-3xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">Detailed Analytics Dashboard</h2>
            <p className="text-white/90 text-lg mb-2">
              Deep diagnostic insights for {patient.name}
            </p>
            <p className="text-sm text-white/80">
              Analysis Period: Last 6 Weeks • Updated: {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
            </p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-6xl"
          >
            📊
          </motion.div>
        </div>
      </div>

      {/* Exercise Performance Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
      >
        <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Exercise Performance Heatmap</h3>
        <p className="text-gray-600 mb-6">Color-coded intensity chart across 6 weeks of recovery</p>

        <div className="mb-4">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-600">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {heatmapData.map((day, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.01 }}
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
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#0f172a] text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                  <p className="font-semibold">Day {day.day + 1}</p>
                  <p>Intensity: {day.value}%</p>
                  <p className="capitalize">{day.intensity}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 text-xs text-gray-600">
            <span>No Activity</span>
            <div className="flex gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-4 h-4 bg-[#f59e0b] rounded"></div>
              <div className="w-4 h-4 bg-[#22d3ee] rounded"></div>
              <div className="w-4 h-4 bg-[#10b981] rounded"></div>
            </div>
            <span>High Performance</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center p-4 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl">
            <p className="text-sm text-gray-600 mb-1">High Intensity Days</p>
            <p className="text-3xl font-bold text-[#10b981]">
              {heatmapData.filter(d => d.intensity === 'high').length}
            </p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Medium Intensity Days</p>
            <p className="text-3xl font-bold text-[#22d3ee]">
              {heatmapData.filter(d => d.intensity === 'medium').length}
            </p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Rest Days</p>
            <p className="text-3xl font-bold text-[#f59e0b]">
              {heatmapData.filter(d => d.intensity === 'none').length}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mobility Comparison Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
      >
        <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Mobility Comparison: Baseline vs Current</h3>
        <p className="text-gray-600 mb-6">Range-of-motion values for affected areas (in degrees)</p>

        <div className="space-y-6">
          {Object.keys(mobilityData.baseline).map((joint, index) => {
            const baseline = mobilityData.baseline[joint];
            const current = mobilityData.current[joint];
            const improvement = ((current - baseline) / baseline * 100).toFixed(0);

            return (
              <motion.div
                key={joint}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-gray-800 capitalize">{joint}</span>
                  <span className="text-sm font-bold text-[#10b981]">+{improvement}% improvement</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Baseline</p>
                    <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${baseline}%` }}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                        className="h-full bg-gray-400 flex items-center justify-end pr-2"
                      >
                        <span className="text-white text-xs font-bold">{baseline}°</span>
                      </motion.div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 mb-2">Current</p>
                    <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${current}%` }}
                        transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#10b981] to-[#059669] flex items-center justify-end pr-2"
                      >
                        <span className="text-white text-xs font-bold">{current}°</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Pain-Mood Correlation */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-bold text-[#0f172a] mb-6">Pain-Mood Correlation Curve</h3>
          
          <div className="relative h-64 mb-6">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e5e7eb" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />
              ))}

              {/* Pain Line */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
                d={correlationData.map((point, index) => {
                  const x = (index / (correlationData.length - 1)) * 100;
                  const y = 100 - ((point.pain / 10) * 100);
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="#ef4444"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />

              {/* Mood Line */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                d={correlationData.map((point, index) => {
                  const x = (index / (correlationData.length - 1)) * 100;
                  const y = 100 - ((point.mood / 10) * 100);
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="flex justify-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-[#ef4444] rounded"></div>
              <span className="text-sm text-gray-700">Pain Level</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-[#10b981] rounded"></div>
              <span className="text-sm text-gray-700">Mood Score</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl border border-[#22d3ee]/20">
            <p className="text-sm text-gray-800">
              <strong className="text-[#22d3ee]">Correlation Analysis:</strong> Inverse relationship detected. As pain decreases, mood improves consistently (r = -0.94).
            </p>
          </div>
        </motion.div>

        {/* Nutrition & Hydration Graph */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-bold text-[#0f172a] mb-6">Nutrition & Hydration Adherence</h3>

          <div className="space-y-4">
            {nutritionData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{item.nutrient}</span>
                  <span className="text-sm font-bold text-[#22d3ee]">{item.adherence}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.adherence}%` }}
                      transition={{ duration: 1, delay: 0.9 + index * 0.1 }}
                      className={`h-full ${
                        item.adherence >= 90
                          ? 'bg-gradient-to-r from-[#10b981] to-[#059669]'
                          : item.adherence >= 75
                          ? 'bg-gradient-to-r from-[#22d3ee] to-[#06b6d4]'
                          : 'bg-gradient-to-r from-[#f59e0b] to-[#d97706]'
                      }`}
                    />
                  </div>
                  <span className="text-xs text-gray-600 w-24 text-right">
                    {item.actual}/{item.target}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl border border-[#10b981]/20">
            <p className="text-sm text-gray-800">
              <strong className="text-[#10b981]">Overall Nutrition Score:</strong> 87% • Diet adherence correlates with 23% faster recovery rate.
            </p>
          </div>
        </motion.div>
      </div>

      {/* AI Anomaly Detection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#ef4444] to-[#dc2626] rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#0f172a]">AI Anomaly Detection</h3>
        </div>

        {anomalies.length > 0 ? (
          <div className="space-y-4">
            {anomalies.map((anomaly, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className={`border-l-4 rounded-r-xl p-6 ${
                  anomaly.severity === 'high'
                    ? 'border-[#ef4444] bg-gradient-to-r from-[#fef2f2] to-white'
                    : anomaly.severity === 'medium'
                    ? 'border-[#f59e0b] bg-gradient-to-r from-[#fef3c7] to-white'
                    : 'border-[#22d3ee] bg-gradient-to-r from-[#f0f9ff] to-white'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-[#0f172a] mb-1">{anomaly.type}</h4>
                    <p className="text-xs text-gray-600">{new Date(anomaly.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                    anomaly.severity === 'high'
                      ? 'bg-[#ef4444] text-white'
                      : anomaly.severity === 'medium'
                      ? 'bg-[#f59e0b] text-white'
                      : 'bg-[#22d3ee] text-white'
                  }`}>
                    {anomaly.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{anomaly.description}</p>
                <div className="bg-white/50 p-3 rounded-lg">
                  <p className="text-sm text-gray-800">
                    <strong>AI Recommendation:</strong> {anomaly.recommendation}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl border border-[#10b981]/20 text-center">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-lg font-bold text-[#10b981] mb-2">No Anomalies Detected</p>
            <p className="text-sm text-gray-700">All metrics are within expected ranges. Recovery is progressing smoothly.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DetailedAnalytics;