import React from 'react';
import { motion } from 'framer-motion';

const StoryMap = ({ chapters, currentChapter, userData }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-3xl">🗺️</span>
        Your Recovery Journey Map
      </h3>

      <div className="bg-[#1e293b]/50 backdrop-blur-xl rounded-3xl p-8 border border-[#22d3ee]/20 shadow-xl">
        {/* Map Path */}
        <div className="relative">
          {/* Connecting Path Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#22d3ee] via-[#a855f7] to-[#ec4899] -translate-x-1/2 opacity-30"></div>

          {/* Chapters */}
          <div className="space-y-8">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative ${index % 2 === 0 ? 'pr-1/2' : 'pl-1/2 ml-auto'}`}
              >
                <div className={`flex items-center gap-6 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Chapter Circle */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: chapter.unlocked ? 1.1 : 1 }}
                      animate={chapter.progress > 0 && chapter.progress < 100 ? {
                        boxShadow: ['0 0 20px rgba(34, 211, 238, 0.5)', '0 0 40px rgba(168, 85, 247, 0.5)', '0 0 20px rgba(34, 211, 238, 0.5)']
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`w-32 h-32 rounded-full flex items-center justify-center text-6xl cursor-pointer relative ${
                        chapter.unlocked
                          ? `bg-gradient-to-br ${chapter.gradient} shadow-2xl`
                          : 'bg-gray-700 grayscale'
                      }`}
                    >
                      {chapter.icon}
                      
                      {/* Progress Ring */}
                      {chapter.unlocked && (
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle
                            cx="50%"
                            cy="50%"
                            r="60"
                            fill="none"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="4"
                          />
                          <motion.circle
                            initial={{ strokeDashoffset: 377 }}
                            animate={{ strokeDashoffset: 377 - (377 * chapter.progress) / 100 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            cx="50%"
                            cy="50%"
                            r="60"
                            fill="none"
                            stroke="white"
                            strokeWidth="4"
                            strokeDasharray="377"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}

                      {/* Lock Icon */}
                      {!chapter.unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                          <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </motion.div>

                    {/* Current Chapter Indicator */}
                    {chapter.id === currentChapter && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#fef3c7] to-[#fde68a] rounded-full flex items-center justify-center border-2 border-[#f59e0b] shadow-lg"
                      >
                        <span className="text-lg">👑</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Chapter Info */}
                  <motion.div
                    whileHover={{ scale: chapter.unlocked ? 1.02 : 1 }}
                    className={`flex-1 ${
                      chapter.unlocked
                        ? 'bg-[#0f172a]/50 backdrop-blur-sm'
                        : 'bg-gray-800/30'
                    } rounded-2xl p-6 border-2 ${
                      chapter.unlocked
                        ? `border-transparent bg-gradient-to-br ${chapter.gradient}`
                        : 'border-gray-700'
                    }`}
                  >
                    <div className={chapter.unlocked ? 'text-white' : 'text-gray-500'}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-2xl font-bold mb-1">{chapter.name}</h4>
                          <p className="text-sm opacity-90">{chapter.phase}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          chapter.unlocked
                            ? 'bg-white/20'
                            : 'bg-gray-700'
                        }`}>
                          +{chapter.xpReward} XP
                        </div>
                      </div>
                      
                      <p className="text-sm opacity-80 mb-4">{chapter.description}</p>

                      {chapter.unlocked && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs opacity-90">Chapter Progress</span>
                            <span className="text-sm font-bold">{chapter.progress}%</span>
                          </div>
                          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${chapter.progress}%` }}
                              transition={{ duration: 1, delay: 0.3 }}
                              className="h-full bg-white rounded-full"
                            />
                          </div>
                        </div>
                      )}

                      {!chapter.unlocked && (
                        <div className="flex items-center gap-2 text-xs">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <span>Complete previous chapter to unlock</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Story Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 bg-gradient-to-r from-[#22d3ee]/20 to-[#a855f7]/20 rounded-xl p-6 border border-[#22d3ee]/30"
        >
          <div className="flex items-start gap-4">
            <span className="text-4xl">📜</span>
            <div>
              <h5 className="text-lg font-bold text-white mb-2">Current Story</h5>
              <p className="text-gray-300 leading-relaxed">
                You've strengthened the {userData.affectedArea || 'knee'} shield and are making excellent progress through <strong>Flexibility Forest</strong>. Your dedication is remarkable! Complete today's quests to advance further on your recovery journey. The path to <strong>Strength Summit</strong> awaits! ⚔️
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StoryMap;