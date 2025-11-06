import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PlanAdjustmentSection = ({ adjustedPlan, feedbackData, aiAnalysis, onConfirm, onBack, currentDate, userLogin }) => {
  const [showComparison, setShowComparison] = useState('exercises');
  const [acceptTerms, setAcceptTerms] = useState(false);

  if (!adjustedPlan) return null;

  const comparisonTypes = [
    { id: 'exercises', label: 'Exercises', icon: '🏋️' },
    { id: 'nutrition', label: 'Nutrition', icon: '🍎' },
    { id: 'wellness', label: 'Wellness', icon: '🧘' },
    { id: 'rest', label: 'Rest Days', icon: '😴' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#10b981] via-[#22d3ee] to-[#a855f7] rounded-3xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">Your Optimized Recovery Plan</h2>
            <p className="text-white/90 text-lg mb-2">
              AI has generated a personalized plan for Week {adjustedPlan.weekNumber}
            </p>
            <p className="text-sm text-white/80">
              Starting {new Date(adjustedPlan.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • Generated for {userLogin}
            </p>
          </div>
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl"
          >
            🧭
          </motion.div>
        </div>
      </div>

      {/* Comparison Selector */}
      <div className="flex gap-3 mb-8">
        {comparisonTypes.map((type) => (
          <motion.button
            key={type.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowComparison(type.id)}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              showComparison === type.id
                ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <span className="text-2xl">{type.icon}</span>
            {type.label}
          </motion.button>
        ))}
      </div>

      {/* Comparison Content */}
      <AnimatePresence mode="wait">
        {/* Exercises Comparison */}
        {showComparison === 'exercises' && (
          <motion.div
            key="exercises"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
          >
            <h3 className="text-2xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
              <span className="text-3xl">🏋️</span>
              Exercise Routine Comparison
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Before */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold">
                    Current Plan
                  </div>
                </div>
                <div className="space-y-3">
                  {adjustedPlan.exercises.before.map((exercise, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="font-bold text-gray-800 mb-2">{exercise.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{exercise.reps} reps</span>
                        <span>×</span>
                        <span>{exercise.sets} sets</span>
                        <span>•</span>
                        <span>{exercise.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-full text-sm font-semibold">
                    Optimized Plan
                  </div>
                </div>
                <div className="space-y-3">
                  {adjustedPlan.exercises.after.map((exercise, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`rounded-xl p-4 border-2 ${
                        exercise.new
                          ? 'bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] border-[#10b981]'
                          : exercise.changed
                          ? 'bg-gradient-to-br from-[#fef3c7] to-[#fde68a] border-[#f59e0b]'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      {exercise.new && (
                        <div className="mb-2">
                          <span className="px-2 py-1 bg-[#10b981] text-white text-xs font-bold rounded-full">
                            NEW
                          </span>
                        </div>
                      )}
                      {exercise.changed && (
                        <div className="mb-2">
                          <span className="px-2 py-1 bg-[#f59e0b] text-white text-xs font-bold rounded-full">
                            ADJUSTED
                          </span>
                        </div>
                      )}
                      <p className="font-bold text-gray-800 mb-2">{exercise.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className={exercise.changed ? 'text-[#f59e0b] font-bold' : ''}>
                          {exercise.reps} reps
                        </span>
                        <span>×</span>
                        <span>{exercise.sets} sets</span>
                        <span>•</span>
                        <span>{exercise.duration}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl border border-[#22d3ee]/20">
              <p className="text-sm text-gray-800">
                <strong className="text-[#22d3ee]">Changes Summary:</strong> {adjustedPlan.exercises.after.filter(e => e.new).length} new exercise(s) added, {adjustedPlan.exercises.after.filter(e => e.changed).length} exercise(s) adjusted based on your feedback.
              </p>
            </div>
          </motion.div>
        )}

        {/* Nutrition Comparison */}
        {showComparison === 'nutrition' && (
          <motion.div
            key="nutrition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
          >
            <h3 className="text-2xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
              <span className="text-3xl">🍎</span>
              Nutrition Plan Comparison
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Before */}
              <div>
                <div className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold mb-4 inline-block">
                  Current Targets
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Protein</p>
                    <p className="text-3xl font-bold text-gray-800">{adjustedPlan.nutrition.before.protein}g/day</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Calories</p>
                    <p className="text-3xl font-bold text-gray-800">{adjustedPlan.nutrition.before.calories}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Water</p>
                    <p className="text-3xl font-bold text-gray-800">{adjustedPlan.nutrition.before.water} glasses</p>
                  </div>
                </div>
              </div>

              {/* After */}
              <div>
                <div className="px-3 py-1 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-full text-sm font-semibold mb-4 inline-block">
                  Optimized Targets
                </div>
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`rounded-xl p-4 ${
                      adjustedPlan.nutrition.after.protein !== adjustedPlan.nutrition.before.protein
                        ? 'bg-gradient-to-br from-[#fef3c7] to-[#fde68a] border-2 border-[#f59e0b]'
                        : 'bg-gray-50'
                    }`}
                  >
                    <p className="text-sm text-gray-600 mb-1">Protein</p>
                    <p className="text-3xl font-bold text-[#f59e0b]">{adjustedPlan.nutrition.after.protein}g/day</p>
                    {adjustedPlan.nutrition.after.protein !== adjustedPlan.nutrition.before.protein && (
                      <p className="text-xs text-gray-600 mt-2">
                        +{adjustedPlan.nutrition.after.protein - adjustedPlan.nutrition.before.protein}g increase
                      </p>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`rounded-xl p-4 ${
                      adjustedPlan.nutrition.after.calories !== adjustedPlan.nutrition.before.calories
                        ? 'bg-gradient-to-br from-[#fef3c7] to-[#fde68a] border-2 border-[#f59e0b]'
                        : 'bg-gray-50'
                    }`}
                  >
                    <p className="text-sm text-gray-600 mb-1">Calories</p>
                    <p className="text-3xl font-bold text-[#f59e0b]">{adjustedPlan.nutrition.after.calories}</p>
                    {adjustedPlan.nutrition.after.calories !== adjustedPlan.nutrition.before.calories && (
                      <p className="text-xs text-gray-600 mt-2">
                        +{adjustedPlan.nutrition.after.calories - adjustedPlan.nutrition.before.calories} kcal increase
                      </p>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-50 rounded-xl p-4"
                  >
                    <p className="text-sm text-gray-600 mb-1">Water</p>
                    <p className="text-3xl font-bold text-gray-800">{adjustedPlan.nutrition.after.water} glasses</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Wellness Comparison */}
        {showComparison === 'wellness' && (
          <motion.div
            key="wellness"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
          >
            <h3 className="text-2xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
              <span className="text-3xl">🧘</span>
              Mental Wellness Schedule
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Before */}
              <div>
                <div className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold mb-4 inline-block">
                  Current Schedule
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🧘</span>
                      <p className="font-bold text-gray-800">Meditation</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{adjustedPlan.wellness.before.meditation} sessions/week</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">📝</span>
                      <p className="font-bold text-gray-800">Journaling</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{adjustedPlan.wellness.before.journaling} times/week</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">💨</span>
                      <p className="font-bold text-gray-800">Breathing</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{adjustedPlan.wellness.before.breathing} min/day</p>
                  </div>
                </div>
              </div>

              {/* After */}
              <div>
                <div className="px-3 py-1 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-full text-sm font-semibold mb-4 inline-block">
                  Optimized Schedule
                </div>
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`rounded-xl p-4 ${
                      adjustedPlan.wellness.after.meditation !== adjustedPlan.wellness.before.meditation
                        ? 'bg-gradient-to-br from-[#fef3c7] to-[#fde68a] border-2 border-[#f59e0b]'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🧘</span>
                      <p className="font-bold text-gray-800">Meditation</p>
                    </div>
                    <p className="text-2xl font-bold text-[#f59e0b]">{adjustedPlan.wellness.after.meditation} sessions/week</p>
                    {adjustedPlan.wellness.after.meditation !== adjustedPlan.wellness.before.meditation && (
                      <p className="text-xs text-gray-600 mt-2">
                        +{adjustedPlan.wellness.after.meditation - adjustedPlan.wellness.before.meditation} additional session(s)
                      </p>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">📝</span>
                      <p className="font-bold text-gray-800">Journaling</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{adjustedPlan.wellness.after.journaling} times/week</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">💨</span>
                      <p className="font-bold text-gray-800">Breathing</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{adjustedPlan.wellness.after.breathing} min/day</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Rest Days Comparison */}
        {showComparison === 'rest' && (
          <motion.div
            key="rest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
          >
            <h3 className="text-2xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
              <span className="text-3xl">😴</span>
              Recovery Days Schedule
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <p className="text-sm text-gray-600 mb-3">Current Plan</p>
                <p className="text-6xl font-bold text-gray-800 mb-2">{adjustedPlan.restDays.before}</p>
                <p className="text-lg text-gray-600">rest day/week</p>
              </div>

              <div className={`rounded-2xl p-8 text-center ${
                adjustedPlan.restDays.after !== adjustedPlan.restDays.before
                  ? 'bg-gradient-to-br from-[#fef3c7] to-[#fde68a] border-2 border-[#f59e0b]'
                  : 'bg-gray-50'
              }`}>
                <p className="text-sm text-gray-600 mb-3">Optimized Plan</p>
                <motion.p
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-6xl font-bold text-[#f59e0b] mb-2"
                >
                  {adjustedPlan.restDays.after}
                </motion.p>
                <p className="text-lg text-gray-600">rest days/week</p>
                {adjustedPlan.restDays.after !== adjustedPlan.restDays.before && (
                  <p className="text-sm text-gray-700 mt-3">
                    +{adjustedPlan.restDays.after - adjustedPlan.restDays.before} additional day for recovery
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl border border-[#22d3ee]/20">
              <p className="text-sm text-gray-800">
                <strong className="text-[#22d3ee]">Note:</strong> {
                  adjustedPlan.restDays.after > adjustedPlan.restDays.before
                    ? 'Additional rest day added to prevent overtraining based on your fatigue feedback.'
                    : 'Current rest schedule is optimal for your recovery pace.'
                }
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Insight Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] rounded-3xl p-6 mb-8 border-2 border-[#a855f7]/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#0f172a] mb-2">AI Adaptation Summary</h4>
            <p className="text-gray-700 leading-relaxed">
              Based on your pain level ({feedbackData.painLevel}/10), difficulty rating ({feedbackData.difficulty}), and fatigue ({feedbackData.fatigue}), 
              we've {feedbackData.difficulty === 'too-hard' ? 'reduced' : 'increased'} exercise intensity and 
              {feedbackData.mood <= 5 ? ' added extra mental wellness sessions' : ' optimized your wellness schedule'}. 
              Your recovery plan is now perfectly balanced for Week {adjustedPlan.weekNumber}.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Confirmation */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8">
        <h3 className="text-xl font-bold text-[#0f172a] mb-6">Confirm & Apply Changes</h3>

        <label className="flex items-start gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all mb-6">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-5 h-5 text-[#22d3ee] rounded focus:ring-2 focus:ring-[#22d3ee] mt-0.5"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-800 mb-1">
              I understand and accept the adjusted recovery plan
            </p>
            <p className="text-sm text-gray-600">
              By confirming, this plan will be automatically synced to your dashboard and all upcoming sessions will follow the new schedule starting {new Date(adjustedPlan.startDate).toLocaleDateString()}.
            </p>
          </div>
        </label>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Feedback
          </motion.button>

          <motion.button
            whileHover={acceptTerms ? { scale: 1.02 } : {}}
            whileTap={acceptTerms ? { scale: 0.98 } : {}}
            onClick={acceptTerms ? onConfirm : null}
            disabled={!acceptTerms}
            className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all flex items-center justify-center gap-3 ${
              acceptTerms
                ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:shadow-[#10b981]/50 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Confirm & Apply Plan</span>
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-xl border border-[#f59e0b]/30">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-gray-800">
            <p className="font-semibold mb-1">Plan Update Notification</p>
            <p>Once confirmed, you'll receive a notification that your Week {adjustedPlan.weekNumber} plan is ready. All changes will take effect from {new Date(adjustedPlan.startDate).toLocaleDateString()}. You can always review and adjust in your dashboard.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlanAdjustmentSection;