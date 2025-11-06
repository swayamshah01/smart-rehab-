import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdaptationHistory = ({ userProgress, currentDate }) => {
  const [showHistory, setShowHistory] = useState(false);

  // Mock adaptation history data
  const adaptationHistory = [
    {
      week: 6,
      date: '2025-11-06',
      changes: [
        { type: 'Exercise', detail: 'Knee flexion reps adjusted: 10 → 8', reason: 'High difficulty reported' },
        { type: 'Wellness', detail: 'Meditation increased: 2 → 4 sessions/week', reason: 'Low mood score' },
      ],
      outcome: 'Positive',
    },
    {
      week: 5,
      date: '2025-10-30',
      changes: [
        { type: 'Nutrition', detail: 'Protein increased: 60g → 68g/day', reason: 'Strength training progression' },
        { type: 'Exercise', detail: 'Added Quad Sets exercise', reason: 'Recovery ahead of schedule' },
      ],
      outcome: 'Positive',
    },
    {
      week: 4,
      date: '2025-10-23',
      changes: [
        { type: 'Rest', detail: 'Rest days maintained: 1 day/week', reason: 'Optimal recovery pace' },
      ],
      outcome: 'Neutral',
    },
  ];

  return (
    <div className="mt-12">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowHistory(!showHistory)}
        className="w-full p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:border-[#22d3ee] transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-[#0f172a]">Adaptation History Timeline</h3>
              <p className="text-sm text-gray-600">View how your plan has evolved over time</p>
            </div>
          </div>
          <svg
            className={`w-6 h-6 text-gray-600 transition-transform ${showHistory ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.button>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 bg-white rounded-3xl p-8 shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#22d3ee] via-[#a855f7] to-[#10b981]"></div>

              {/* Timeline Items */}
              <div className="space-y-8">
                {adaptationHistory.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-20"
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute left-5 top-6 w-8 h-8 rounded-full border-4 border-white shadow-lg ${
                      item.outcome === 'Positive' ? 'bg-[#10b981]' : 'bg-[#22d3ee]'
                    }`}></div>

                    {/* Content */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-[#0f172a]">Week {item.week} Adjustment</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.outcome === 'Positive'
                            ? 'bg-[#10b981]/20 text-[#10b981]'
                            : 'bg-[#22d3ee]/20 text-[#22d3ee]'
                        }`}>
                          {item.outcome} Outcome
                        </div>
                      </div>

                      <div className="space-y-3">
                        {item.changes.map((change, changeIndex) => (
                          <div key={changeIndex} className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-3">
                              <div className="px-2 py-1 bg-[#22d3ee]/10 text-[#22d3ee] rounded text-xs font-semibold">
                                {change.type}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-800 mb-1">{change.detail}</p>
                                <p className="text-xs text-gray-600">Reason: {change.reason}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Total Adaptations</p>
                <p className="text-3xl font-bold text-[#10b981]">{adaptationHistory.reduce((sum, item) => sum + item.changes.length, 0)}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Weeks Optimized</p>
                <p className="text-3xl font-bold text-[#22d3ee]">{adaptationHistory.length}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                <p className="text-3xl font-bold text-[#f59e0b]">95%</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdaptationHistory;