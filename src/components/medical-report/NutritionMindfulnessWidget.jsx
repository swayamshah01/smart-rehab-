import React from 'react';
import { motion } from 'framer-motion';

const NutritionMindfulnessWidget = ({ userData }) => {
  const nutrients = [
    { name: 'Protein', amount: '60-80g/day', icon: '🥩', color: 'from-[#ef4444] to-[#dc2626]', importance: 'high' },
    { name: 'Calcium', amount: '1200mg/day', icon: '🥛', color: 'from-[#22d3ee] to-[#06b6d4]', importance: 'high' },
    { name: 'Vitamin D', amount: '800 IU/day', icon: '☀️', color: 'from-[#f59e0b] to-[#d97706]', importance: 'medium' },
    { name: 'Omega-3', amount: '1-2g/day', icon: '🐟', color: 'from-[#10b981] to-[#059669]', importance: 'medium' },
  ];

  const mindfulnessTips = [
    {
      title: 'Morning Breath Work',
      duration: '5 min',
      icon: '🌅',
      description: 'Start your day with deep breathing to reduce inflammation and promote healing.',
    },
    {
      title: 'Body Scan Meditation',
      duration: '10 min',
      icon: '🧘',
      description: 'Connect with your recovering areas and visualize healing energy flowing through.',
    },
    {
      title: 'Gratitude Journal',
      duration: '3 min',
      icon: '📝',
      description: 'Write down 3 things youre grateful for to boost mental resilience.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Nutrition Widget */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-[#22d3ee]/20 sticky top-24"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl">🍎</span>
          <h3 className="text-xl font-bold text-[#0f172a]">Nutrition Snapshot</h3>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Key nutrients essential for faster healing and recovery
        </p>

        <div className="space-y-4 mb-6">
          {nutrients.map((nutrient, index) => (
            <motion.div
              key={nutrient.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <div className={`bg-gradient-to-r ${nutrient.color} rounded-xl p-4 shadow-sm cursor-pointer transition-all hover:shadow-md`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{nutrient.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white">{nutrient.name}</h4>
                      <p className="text-sm text-white/90">{nutrient.amount}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    nutrient.importance === 'high'
                      ? 'bg-white/30 text-white'
                      : 'bg-white/20 text-white/80'
                  }`}>
                    {nutrient.importance === 'high' ? 'Essential' : 'Important'}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span>View Full Nutrition Plan</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.button>

        <div className="mt-4 p-3 bg-gradient-to-r from-[#fef3c7] to-[#fde68a] rounded-lg border border-[#f59e0b]/30">
          <p className="text-xs text-gray-700 flex items-start gap-2">
            <span className="text-lg">💡</span>
            <span>Proper nutrition can reduce recovery time by up to 30%!</span>
          </p>
        </div>
      </motion.div>

      {/* Mindfulness Widget */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-[#a855f7]/20"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl">🧘</span>
          <h3 className="text-xl font-bold text-[#0f172a]">Mindfulness Tips</h3>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Mental wellness practices to support your physical recovery
        </p>

        <div className="space-y-3 mb-6">
          {mindfulnessTips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-4 border border-[#22d3ee]/20 cursor-pointer transition-all hover:shadow-md group"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{tip.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-[#0f172a]">{tip.title}</h4>
                    <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-full">
                      {tip.duration}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="mt-2 text-[#22d3ee] text-xs font-semibold flex items-center gap-1"
                  >
                    <span>Try now</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span>Explore Mental Wellness</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.button>

        <div className="mt-4 p-3 bg-gradient-to-r from-[#f3e8ff] to-[#fae8ff] rounded-lg border border-[#a855f7]/30">
          <p className="text-xs text-gray-700 flex items-start gap-2">
            <span className="text-lg">🌟</span>
            <span>Patients who practice mindfulness recover 25% faster!</span>
          </p>
        </div>
      </motion.div>

      {/* Quick Tips Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-[#10b981]/10 to-[#22d3ee]/10 rounded-2xl p-6 border border-[#10b981]/30"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">💪</span>
          <h3 className="text-lg font-bold text-[#0f172a]">Recovery Tip of the Day</h3>
        </div>
        
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          <strong>Hydration is key!</strong> Aim for 8-10 glasses of water daily. 
          Proper hydration helps transport nutrients to healing tissues and flush out toxins.
        </p>

        <div className="flex items-center gap-2 p-3 bg-white/60 rounded-lg">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-full bg-gradient-to-r from-[#22d3ee] to-[#10b981]"
            />
          </div>
          <span className="text-xs font-semibold text-gray-600">6/10 glasses</span>
        </div>
      </motion.div>
    </div>
  );
};

export default NutritionMindfulnessWidget;