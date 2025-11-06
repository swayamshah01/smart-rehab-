import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CompareMode = ({ onClose, userData, analyticsData, currentDate }) => {
  const [compareType, setCompareType] = useState('weeks');

  const week1Data = {
    pain: 8,
    mobility: 45,
    mood: 6,
    exercises: 18,
    strength: 30,
  };

  const currentWeekData = {
    pain: 3.5,
    mobility: 72,
    mood: 8.8,
    exercises: 25,
    strength: 70,
  };

  const metrics = [
    { 
      key: 'pain', 
      label: 'Pain Level', 
      unit: '/10', 
      improvement: ((week1Data.pain - currentWeekData.pain) / week1Data.pain * 100).toFixed(0),
      inverse: true,
      color: '#f59e0b'
    },
    { 
      key: 'mobility', 
      label: 'Mobility Score', 
      unit: '%', 
      improvement: ((currentWeekData.mobility - week1Data.mobility) / week1Data.mobility * 100).toFixed(0),
      inverse: false,
      color: '#a855f7'
    },
    { 
      key: 'mood', 
      label: 'Mood Score', 
      unit: '/10', 
      improvement: ((currentWeekData.mood - week1Data.mood) / week1Data.mood * 100).toFixed(0),
      inverse: false,
      color: '#10b981'
    },
    { 
      key: 'exercises', 
      label: 'Weekly Exercises', 
      unit: ' sessions', 
      improvement: ((currentWeekData.exercises - week1Data.exercises) / week1Data.exercises * 100).toFixed(0),
      inverse: false,
      color: '#22d3ee'
    },
    { 
      key: 'strength', 
      label: 'Strength Index', 
      unit: '%', 
      improvement: ((currentWeekData.strength - week1Data.strength) / week1Data.strength * 100).toFixed(0),
      inverse: false,
      color: '#ec4899'
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#0f172a] mb-2">Compare Progress</h2>
              <p className="text-gray-600">Week 1 vs Current Week - Visual Growth Analysis</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Comparison Type Selector */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setCompareType('weeks')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                compareType === 'weeks'
                  ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Week 1 vs Current
            </button>
            <button
              onClick={() => setCompareType('months')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                compareType === 'months'
                  ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Month-to-Month
            </button>
          </div>

          {/* Visual Comparison */}
          <div className="space-y-6 mb-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0f172a]">{metric.label}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      parseInt(metric.improvement) > 0
                        ? 'bg-[#10b981]/20 text-[#10b981]'
                        : 'bg-[#ef4444]/20 text-[#ef4444]'
                    }`}>
                      {metric.inverse ? '-' : '+'}{metric.improvement}% Improvement
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Week 1 */}
                  <div>
                    <p className="text-sm text-gray-600 mb-3">Week 1 (Baseline)</p>
                    <div className="relative">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="h-12 bg-gray-200 rounded-lg overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: metric.inverse ? `${(week1Data[metric.key] / 10) * 100}%` : `${week1Data[metric.key]}%` }}
                              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                              className="h-full bg-gray-400 flex items-center justify-end pr-3"
                              style={{ backgroundColor: metric.color, opacity: 0.5 }}
                            >
                              <span className="text-white font-bold text-sm">
                                {week1Data[metric.key]}{metric.unit}
                              </span>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Week */}
                  <div>
                    <p className="text-sm text-gray-600 mb-3">Current Week</p>
                    <div className="relative">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="h-12 bg-gray-200 rounded-lg overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: metric.inverse ? `${(currentWeekData[metric.key] / 10) * 100}%` : `${currentWeekData[metric.key]}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                              className="h-full flex items-center justify-end pr-3 relative"
                              style={{ backgroundColor: metric.color }}
                            >
                              <span className="text-white font-bold text-sm">
                                {currentWeekData[metric.key]}{metric.unit}
                              </span>
                              <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -right-2 top-1/2 -translate-y-1/2 text-2xl"
                              >
                                ✨
                              </motion.div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Improvement Arrow */}
                <div className="mt-4 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-[#10b981]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold">
                      {metric.inverse 
                        ? `Decreased by ${(week1Data[metric.key] - currentWeekData[metric.key]).toFixed(1)}${metric.unit}`
                        : `Increased by ${(currentWeekData[metric.key] - week1Data[metric.key]).toFixed(1)}${metric.unit}`
                      }
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-[#22d3ee] via-[#a855f7] to-[#ec4899] rounded-2xl p-6 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Overall Transformation</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-white/80 text-sm mb-1">Total Improvement</p>
                <p className="text-3xl font-bold">+138%</p>
                <p className="text-white/80 text-xs mt-1">Across all metrics</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-white/80 text-sm mb-1">Recovery Speed</p>
                <p className="text-3xl font-bold">2x</p>
                <p className="text-white/80 text-xs mt-1">Faster than average</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-white/80 text-sm mb-1">Days Active</p>
                <p className="text-3xl font-bold">36</p>
                <p className="text-white/80 text-xs mt-1">Consistent dedication</p>
              </div>
            </div>
          </motion.div>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full mt-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all"
          >
            Close Comparison
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareMode;