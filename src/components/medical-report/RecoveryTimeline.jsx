import React from 'react';
import { motion } from 'framer-motion';

const RecoveryTimeline = ({ userData }) => {
  const phases = [
    {
      id: 1,
      title: 'Early Phase',
      subtitle: 'Pain Reduction & Protection',
      duration: '2-4 weeks',
      icon: '🕐',
      color: 'from-[#ef4444] to-[#dc2626]',
      bgColor: 'bg-[#fef2f2]',
      borderColor: 'border-[#ef4444]/30',
      goals: [
        'Reduce pain and inflammation',
        'Protect healing tissues',
        'Gentle range-of-motion exercises',
        'Ice therapy and rest periods',
      ],
      exercises: [
        'Ankle pumps',
        'Quad sets',
        'Straight leg raises',
        'Gentle stretching',
      ],
    },
    {
      id: 2,
      title: 'Mid Phase',
      subtitle: 'Strength & Mobility Restoration',
      duration: '4-8 weeks',
      icon: '💪',
      color: 'from-[#f59e0b] to-[#d97706]',
      bgColor: 'bg-[#fffbeb]',
      borderColor: 'border-[#f59e0b]/30',
      goals: [
        'Restore full range of motion',
        'Build muscle strength',
        'Improve balance and coordination',
        'Progress to weight-bearing exercises',
      ],
      exercises: [
        'Resistance band training',
        'Partial squats',
        'Step-ups',
        'Balance exercises',
      ],
    },
    {
      id: 3,
      title: 'Final Phase',
      subtitle: 'Performance Reinforcement',
      duration: '8-12 weeks',
      icon: '🏃',
      color: 'from-[#10b981] to-[#059669]',
      bgColor: 'bg-[#f0fdf4]',
      borderColor: 'border-[#10b981]/30',
      goals: [
        'Return to normal activities',
        'Build endurance and power',
        'Sport-specific training (if applicable)',
        'Prevent future injuries',
      ],
      exercises: [
        'Full squats and lunges',
        'Plyometric training',
        'Sport-specific drills',
        'Advanced balance challenges',
      ],
    },
  ];

  const getTotalDuration = () => {
    const minWeeks = phases.reduce((sum, phase) => {
      const weeks = parseInt(phase.duration.split('-')[0]);
      return sum + weeks;
    }, 0);
    return `${minWeeks}-${minWeeks + 8} weeks total`;
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0f172a] mb-2">
          Your Personalized Recovery Timeline
        </h2>
        <p className="text-gray-600">
          Expected full recovery: <span className="font-semibold text-[#22d3ee]">{getTotalDuration()}</span>
        </p>
      </div>

      {/* Timeline Visualization */}
      <div className="relative mb-12">
        {/* Progress Line */}
        <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-[#ef4444] via-[#f59e0b] to-[#10b981] rounded-full"></div>
        
        <div className="grid md:grid-cols-3 gap-6 relative">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Phase Circle */}
              <div className="flex justify-center mb-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-lg cursor-pointer relative z-10`}
                >
                  <span className="text-4xl">{phase.icon}</span>
                </motion.div>
              </div>

              {/* Phase Card */}
              <motion.div
                whileHover={{ y: -5, shadow: '0 10px 30px rgba(34, 211, 238, 0.2)' }}
                className={`${phase.bgColor} border-2 ${phase.borderColor} rounded-2xl p-6 shadow-sm`}
              >
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-[#0f172a] mb-1">
                    {phase.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {phase.subtitle}
                  </p>
                  <div className="inline-block px-3 py-1 bg-white/70 rounded-full">
                    <span className="text-xs font-semibold text-gray-700">
                      ⏱️ {phase.duration}
                    </span>
                  </div>
                </div>

                {/* Goals */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#0f172a] mb-3 flex items-center gap-2">
                    <span>🎯</span> Key Goals
                  </h4>
                  <ul className="space-y-2">
                    {phase.goals.map((goal, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + idx * 0.1 }}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <svg className="w-4 h-4 text-[#22d3ee] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{goal}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Sample Exercises */}
                <div>
                  <h4 className="text-sm font-semibold text-[#0f172a] mb-3 flex items-center gap-2">
                    <span>💪</span> Sample Exercises
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.exercises.map((exercise, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 + idx * 0.1 }}
                        className="px-3 py-1 bg-white/70 rounded-full text-xs font-medium text-gray-700"
                      >
                        {exercise}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress Expectations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-[#22d3ee]/10 to-[#a855f7]/10 rounded-2xl p-6 border border-[#22d3ee]/30"
      >
        <h3 className="text-lg font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          What to Expect During Recovery
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/50 rounded-xl p-4">
            <h4 className="font-semibold text-[#10b981] mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Normal Signs of Progress
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span>•</span>
                <span>Gradual reduction in pain levels</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Increased range of motion</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Improved strength and stability</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Some muscle soreness after exercises</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/50 rounded-xl p-4">
            <h4 className="font-semibold text-[#ef4444] mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              When to Contact Your Doctor
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span>•</span>
                <span>Sharp or increasing pain</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Excessive swelling or warmth</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Numbness or tingling sensations</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Loss of range of motion</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RecoveryTimeline;