import React from 'react';
import { motion } from 'framer-motion';

const RecoveryStyle = ({ formData = {}, setFormData = () => {}, onNext = () => {}, onBack = () => {} }) => {
  const styles = [
    {
      id: 'gamified',
      name: 'Gamified Mode',
      description: 'Turn recovery into an adventure with quests, XP, and achievements',
      icon: '🎮',
      gradient: 'from-[#f59e0b] via-[#ec4899] to-[#a855f7]',
      features: ['Quest system', 'XP & Levels', 'Badges & Achievements', 'Leaderboards'],
      highlight: true,
    },
    {
      id: 'guided',
      name: 'Guided Mode',
      description: 'Step-by-step professional guidance through your recovery',
      icon: '🧭',
      gradient: 'from-[#22d3ee] to-[#06b6d4]',
      features: ['Expert guidance', 'Structured plan', 'Progress tracking', 'AI coaching'],
      highlight: false,
    },
    {
      id: 'self-paced',
      name: 'Self-Paced Mode',
      description: 'Flexible recovery at your own pace and schedule',
      icon: '⏱️',
      gradient: 'from-[#10b981] to-[#059669]',
      features: ['Flexible timing', 'Customizable plan', 'Self-monitoring', 'Freedom'],
      highlight: false,
    },
  ];

  const handleSelect = (styleId) => {
    setFormData({ ...formData, recoveryStyle: styleId });
  };

  const handleContinue = () => {
    if (!formData?.recoveryStyle) {
      alert('Please select a recovery style to continue.');
      return;
    }
    onNext();
  };

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Choose Your Recovery Style</h2>
        <p className="text-gray-600 text-lg">Select the approach that best fits your personality and goals</p>
      </motion.div>

      {/* Recovery Style Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {styles.map((style, index) => (
          <motion.div
            key={style.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={() => handleSelect(style.id)}
            className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all ${
              formData?.recoveryStyle === style.id
                ? `bg-gradient-to-br ${style.gradient} border-transparent shadow-2xl text-white`
                : 'bg-white border-gray-200 hover:border-[#22d3ee] hover:shadow-lg'
            }`}
          >
            {formData?.recoveryStyle === style.id && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg z-10"
              >
                <svg className="w-6 h-6 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}

            {style.highlight && formData?.recoveryStyle !== style.id && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#f59e0b] to-[#ec4899] text-white text-xs font-bold rounded-full shadow-lg">
                RECOMMENDED
              </div>
            )}

            <motion.div
              animate={
                formData?.recoveryStyle === style.id
                  ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }
                  : {}
              }
              transition={{ duration: 0.5 }}
              className="text-6xl mb-4 text-center"
            >
              {style.icon}
            </motion.div>

            <h3
              className={`text-xl font-bold mb-2 text-center ${
                formData?.recoveryStyle === style.id ? 'text-white' : 'text-[#0f172a]'
              }`}
            >
              {style.name}
            </h3>

            <p
              className={`text-sm mb-4 text-center min-h-[48px] ${
                formData?.recoveryStyle === style.id ? 'text-white/90' : 'text-gray-600'
              }`}
            >
              {style.description}
            </p>

            <div className="space-y-2">
              {style.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + idx * 0.05 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <svg
                    className={`w-4 h-4 flex-shrink-0 ${
                      formData?.recoveryStyle === style.id ? 'text-white' : 'text-[#10b981]'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span
                    className={
                      formData?.recoveryStyle === style.id ? 'text-white' : 'text-gray-700'
                    }
                  >
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Box */}
      {formData?.recoveryStyle && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] rounded-2xl p-6 border border-[#22d3ee]/30 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#0f172a] mb-2">
                {formData?.recoveryStyle === 'gamified' &&
                  '🎮 Great choice! Gamified Mode makes recovery fun and engaging.'}
                {formData?.recoveryStyle === 'guided' &&
                  '🧭 Perfect! Guided Mode provides structured professional support.'}
                {formData?.recoveryStyle === 'self-paced' &&
                  '⏱️ Excellent! Self-Paced Mode gives you maximum flexibility.'}
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {formData?.recoveryStyle === 'gamified' &&
                  "You'll embark on an adventure where exercises become quests, progress earns XP, and milestones unlock achievements. Perfect for staying motivated through gamification!"}
                {formData?.recoveryStyle === 'guided' &&
                  "You'll receive step-by-step guidance with AI coaching and structured plans tailored to your recovery. Ideal for those who prefer clear direction and expert support."}
                {formData?.recoveryStyle === 'self-paced' &&
                  "You'll have the freedom to progress at your own speed with flexible scheduling. Great for independent individuals who know their body best."}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
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
          Back
        </motion.button>

        <motion.button
          whileHover={formData?.recoveryStyle ? { scale: 1.02 } : {}}
          whileTap={formData?.recoveryStyle ? { scale: 0.98 } : {}}
          onClick={handleContinue}
          disabled={!formData?.recoveryStyle}
          className={`flex-1 px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            formData?.recoveryStyle
              ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>Continue to Summary</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default RecoveryStyle;
