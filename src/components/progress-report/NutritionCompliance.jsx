import React from 'react';
import { motion } from 'framer-motion';

const NutritionCompliance = ({ analyticsData, currentDate }) => {
  const weeklyTargets = {
    protein: { target: 560, actual: 476, unit: 'g' },
    calories: { target: 14000, actual: 11900, unit: 'kcal' },
    water: { target: 70, actual: 59, unit: 'glasses' },
    calcium: { target: 8400, actual: 6720, unit: 'mg' },
    vitaminD: { target: 5600, actual: 4480, unit: 'IU' },
  };

  const dailyLog = [
    { day: 'Mon', protein: 68, water: 8, supplements: 3, compliance: 90 },
    { day: 'Tue', protein: 72, water: 9, supplements: 4, compliance: 95 },
    { day: 'Wed', protein: 65, water: 7, supplements: 3, compliance: 85 },
    { day: 'Thu', protein: 70, water: 10, supplements: 4, compliance: 92 },
    { day: 'Fri', protein: 68, water: 8, supplements: 3, compliance: 88 },
    { day: 'Sat', protein: 75, water: 9, supplements: 4, compliance: 96 },
    { day: 'Sun', protein: 58, water: 8, supplements: 3, compliance: 80 },
  ];

  const supplementLog = [
    { name: 'Vitamin D3', taken: 7, total: 7, status: 'perfect' },
    { name: 'Calcium', taken: 7, total: 7, status: 'perfect' },
    { name: 'Omega-3', taken: 6, total: 7, status: 'good' },
    { name: 'Multivitamin', taken: 7, total: 7, status: 'perfect' },
    { name: 'Protein Powder', taken: 5, total: 7, status: 'fair' },
  ];

  const getComplianceColor = (percentage) => {
    if (percentage >= 90) return 'from-[#10b981] to-[#059669]';
    if (percentage >= 75) return 'from-[#22d3ee] to-[#06b6d4]';
    if (percentage >= 60) return 'from-[#f59e0b] to-[#d97706]';
    return 'from-[#ef4444] to-[#dc2626]';
  };

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-[#0f172a] mb-3">
          Nutrition & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#059669]">Lifestyle Compliance</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Track your dietary adherence and nutritional goals for optimal recovery
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Report Date: {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </motion.div>

      {/* Nutrition Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#10b981] to-[#059669] rounded-3xl p-8 mb-8 text-white shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl opacity-90 mb-2">Weekly Nutrition Score</h3>
            <div className="flex items-baseline gap-3 mb-4">
              <p className="text-7xl font-bold">{analyticsData.nutritionScore}</p>
              <p className="text-3xl opacity-90">/100</p>
            </div>
            <p className="text-lg opacity-90">
              Excellent compliance! You're meeting <strong>85%</strong> of your nutritional targets.
            </p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-8xl"
          >
            🍎
          </motion.div>
        </div>
      </motion.div>

      {/* Weekly Targets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
      >
        <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Weekly Nutritional Targets</h3>

        <div className="space-y-6">
          {Object.entries(weeklyTargets).map(([key, data], index) => {
            const percentage = (data.actual / data.target) * 100;
            const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${getComplianceColor(percentage)} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{Math.round(percentage)}%</span>
                    </div>
                    <span className="text-lg font-semibold text-[#0f172a]">{label}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">
                      {data.actual.toLocaleString()} / {data.target.toLocaleString()} {data.unit}
                    </p>
                    <p className="text-sm text-gray-600">
                      {data.target - data.actual > 0 
                        ? `${(data.target - data.actual).toLocaleString()} ${data.unit} remaining`
                        : 'Target achieved!'
                      }
                    </p>
                  </div>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                    transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                    className={`h-full bg-gradient-to-r ${getComplianceColor(percentage)}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Daily Nutrition Log */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-bold text-[#0f172a] mb-6">Daily Nutrition Log</h3>

          <div className="space-y-4">
            {dailyLog.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${getComplianceColor(day.compliance)} rounded-full flex items-center justify-center`}>
                      {day.compliance >= 90 ? (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-white text-xs font-bold">{day.compliance}%</span>
                      )}
                    </div>
                    <span className="font-semibold text-gray-800">{day.day}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Protein</p>
                    <p className="text-sm font-bold text-gray-800">{day.protein}g</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Water</p>
                    <p className="text-sm font-bold text-gray-800">{day.water} 💧</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Supplements</p>
                    <p className="text-sm font-bold text-gray-800">{day.supplements}/4</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Supplement Tracking */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-bold text-[#0f172a] mb-6">Supplement Tracking</h3>

          <div className="space-y-4 mb-6">
            {supplementLog.map((supplement, index) => {
              const percentage = (supplement.taken / supplement.total) * 100;
              
              return (
                <motion.div
                  key={supplement.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">{supplement.name}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      supplement.status === 'perfect'
                        ? 'bg-[#10b981]/20 text-[#10b981]'
                        : supplement.status === 'good'
                        ? 'bg-[#22d3ee]/20 text-[#22d3ee]'
                        : 'bg-[#f59e0b]/20 text-[#f59e0b]'
                    }`}>
                      {supplement.taken}/{supplement.total}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                      className={`h-full ${
                        supplement.status === 'perfect'
                          ? 'bg-[#10b981]'
                          : supplement.status === 'good'
                          ? 'bg-[#22d3ee]'
                          : 'bg-[#f59e0b]'
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="p-4 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl border border-[#10b981]/20">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#10b981] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-[#10b981] mb-1">Great Adherence!</h4>
                <p className="text-sm text-gray-700">
                  You've maintained <strong>93% supplement compliance</strong> this week. Keep it up for optimal recovery support!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
          <span className="text-3xl">🤖</span>
          AI Nutrition Recommendations
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-xl p-6 border border-[#f59e0b]/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#f59e0b] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h4 className="font-bold text-[#f59e0b] mb-2">Boost Vitamin D</h4>
                <p className="text-sm text-gray-800 mb-3">
                  You're at <strong>80% of your Vitamin D target</strong>. Consider adding more fortified foods or increase supplement dosage to support bone recovery.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white/50 rounded-full text-xs font-semibold">Mushrooms</span>
                  <span className="px-2 py-1 bg-white/50 rounded-full text-xs font-semibold">Egg yolks</span>
                  <span className="px-2 py-1 bg-white/50 rounded-full text-xs font-semibold">Fortified milk</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-6 border border-[#22d3ee]/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#22d3ee] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💧</span>
              </div>
              <div>
                <h4 className="font-bold text-[#22d3ee] mb-2">Hydration Target</h4>
                <p className="text-sm text-gray-800 mb-3">
                  You're averaging <strong>8.4 glasses/day</strong>. Aim for 10 glasses to optimize recovery and reduce inflammation.
                </p>
                <div className="p-2 bg-white/50 rounded-lg">
                  <p className="text-xs font-semibold text-gray-700">
                    💡 Tip: Set hourly reminders on your phone
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl p-6 border border-[#10b981]/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#10b981] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🥩</span>
              </div>
              <div>
                <h4 className="font-bold text-[#10b981] mb-2">Protein Timing</h4>
                <p className="text-sm text-gray-800 mb-3">
                  Excellent protein intake! Consider distributing <strong>20-25g per meal</strong> for better muscle recovery and synthesis.
                </p>
                <div className="p-2 bg-white/50 rounded-lg">
                  <p className="text-xs font-semibold text-gray-700">
                    ✅ Current: 68g avg/day - Perfect range!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] rounded-xl p-6 border border-[#a855f7]/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#a855f7] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🌿</span>
              </div>
              <div>
                <h4 className="font-bold text-[#a855f7] mb-2">Anti-Inflammatory Foods</h4>
                <p className="text-sm text-gray-800 mb-3">
                  Add more omega-3 rich foods to reduce inflammation and accelerate healing.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white/50 rounded-full text-xs font-semibold">Walnuts</span>
                  <span className="px-2 py-1 bg-white/50 rounded-full text-xs font-semibold">Flax seeds</span>
                  <span className="px-2 py-1 bg-white/50 rounded-full text-xs font-semibold">Fish oil</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NutritionCompliance;