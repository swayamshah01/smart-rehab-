import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RecoveryStyle = ({ data, onNext, onBack }) => {
  const [selectedStyle, setSelectedStyle] = useState(data.recoveryStyle || null);
  const [selectedGoals, setSelectedGoals] = useState(data.goals || []);

  const recoveryStyles = [
    {
      id: 'guided',
      icon: '🧭',
      title: 'Guided Mode',
      subtitle: 'Therapist-Led Experience',
      description: 'Step-by-step guidance with virtual therapist support. Perfect for beginners who want structured, professional guidance throughout their recovery journey.',
      features: ['Daily check-ins', 'Video guidance', 'Professional feedback', 'Personalized adjustments'],
      gradient: 'from-[#22d3ee] to-[#06b6d4]',
    },
    {
      id: 'self-paced',
      icon: '🕒',
      title: 'Self-Paced Mode',
      subtitle: 'Flexible Recovery',
      description: 'Recover at your own schedule with flexible timing. Ideal for those who prefer independence and want to manage their rehab around their lifestyle.',
      features: ['Flexible scheduling', 'Progress tracking', 'On-demand exercises', 'Customizable plans'],
      gradient: 'from-[#a855f7] to-[#9333ea]',
    },
    {
      id: 'gamified',
      icon: '🎮',
      title: 'Gamified Mode',
      subtitle: 'Stay Motivated with Fun',
      description: 'Earn XP, unlock achievements, and compete on leaderboards. Perfect for those who love challenges and need extra motivation to stay consistent.',
      features: ['XP & Rewards', 'Achievements', 'Leaderboards', 'Streak bonuses'],
      gradient: 'from-[#ec4899] to-[#db2777]',
    },
  ];

  const recoveryGoals = [
    { id: 'pain-reduction', label: 'Pain Reduction', icon: '💊' },
    { id: 'mobility-improvement', label: 'Mobility Improvement', icon: '🤸' },
    { id: 'strength-building', label: 'Strength Building', icon: '💪' },
    { id: 'flexibility', label: 'Flexibility', icon: '🧘' },
    { id: 'balance', label: 'Balance & Stability', icon: '⚖️' },
    { id: 'daily-activities', label: 'Return to Daily Activities', icon: '🏠' },
    { id: 'sports', label: 'Return to Sports', icon: '⚽' },
    { id: 'independence', label: 'Independence', icon: '🚶' },
  ];

  const toggleGoal = (goalId) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleNext = () => {
    if (selectedStyle && selectedGoals.length > 0) {
      onNext({ recoveryStyle: selectedStyle, goals: selectedGoals });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50/30 backdrop-blur-xl rounded-3xl p-8 border border-blue-200 shadow-xl shadow-blue-200/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Recovery Style</span>
        </h2>
        <p className="text-slate-600 text-lg">
          Select the approach that best fits your personality and preferences
        </p>
      </motion.div>

      {/* Recovery Styles */}
      <div className="mb-12 space-y-4">
        {recoveryStyles.map((style, index) => (
          <motion.button
            key={style.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedStyle(style.id)}
            className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
              selectedStyle === style.id
                ? `bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-300 shadow-lg shadow-blue-300/30`
                : 'bg-white border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl">{style.icon}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-slate-800 text-xl font-bold mb-1">{style.title}</h3>
                    <p className={`text-sm font-semibold ${selectedStyle === style.id ? 'text-slate-700' : 'text-slate-600'}`}>
                      {style.subtitle}
                    </p>
                  </div>
                  {selectedStyle === style.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </div>
                <p className={`mb-4 ${selectedStyle === style.id ? 'text-slate-700' : 'text-slate-600'}`}>
                  {style.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {style.features.map((feature) => (
                    <span
                      key={feature}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedStyle === style.id
                          ? 'bg-blue-500/10 text-blue-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Recovery Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h3 className="text-slate-800 font-semibold text-lg mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span> Select Your Recovery Goals
          <span className="text-sm text-slate-500 font-normal">(Choose at least one)</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {recoveryGoals.map((goal, index) => (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleGoal(goal.id)}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                selectedGoals.includes(goal.id)
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 shadow-lg shadow-blue-200/50'
                  : 'bg-white border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="text-3xl mb-2">{goal.icon}</div>
              <div className="text-slate-700 text-sm font-medium text-center">{goal.label}</div>
              {selectedGoals.includes(goal.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-200">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="px-6 py-3 rounded-full font-semibold bg-white text-slate-800 border-2 border-slate-200 hover:bg-slate-50 hover:border-blue-300 transition-all"
        >
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: selectedStyle && selectedGoals.length > 0 ? 1.05 : 1 }}
          whileTap={{ scale: selectedStyle && selectedGoals.length > 0 ? 0.95 : 1 }}
          onClick={handleNext}
          disabled={!selectedStyle || selectedGoals.length === 0}
          className={`px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
            selectedStyle && selectedGoals.length > 0
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Continue
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default RecoveryStyle;