import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AchievementSystem = ({ gameState, updateGameState }) => {
  const [showAll, setShowAll] = useState(false);

  const allAchievements = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Complete your first exercise',
      icon: '👣',
      xp: 50,
      unlocked: true,
      date: '2025-10-30',
      rarity: 'common',
    },
    {
      id: 2,
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      xp: 100,
      unlocked: true,
      date: '2025-11-05',
      rarity: 'rare',
    },
    {
      id: 3,
      name: 'Pain Vanquisher',
      description: 'Reduce pain by 50%',
      icon: '⚔️',
      xp: 150,
      unlocked: true,
      date: '2025-11-04',
      rarity: 'epic',
    },
    {
      id: 4,
      name: 'Mobility Master',
      description: 'Achieve 70% mobility',
      icon: '🤸',
      xp: 200,
      unlocked: true,
      date: '2025-11-06',
      rarity: 'epic',
    },
    {
      id: 5,
      name: 'Consistency Champion',
      description: 'Complete 30 consecutive days',
      icon: '👑',
      xp: 500,
      unlocked: false,
      progress: 23,
      total: 30,
      rarity: 'legendary',
    },
    {
      id: 6,
      name: 'Perfect Week',
      description: 'Complete all daily quests for 7 days',
      icon: '✨',
      xp: 300,
      unlocked: false,
      progress: 5,
      total: 7,
      rarity: 'epic',
    },
    {
      id: 7,
      name: 'Full Recovery',
      description: 'Complete your entire recovery journey',
      icon: '🏆',
      xp: 1000,
      unlocked: false,
      progress: 65,
      total: 100,
      rarity: 'legendary',
    },
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-500';
      case 'rare':
        return 'from-[#22d3ee] to-[#06b6d4]';
      case 'epic':
        return 'from-[#a855f7] to-[#9333ea]';
      case 'legendary':
        return 'from-[#f59e0b] via-[#f59e0b] to-[#eab308]';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const displayedAchievements = showAll ? allAchievements : allAchievements.slice(0, 4);

  return (
    <div className="bg-[#1e293b]/50 backdrop-blur-xl rounded-2xl p-6 border border-[#a855f7]/20 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🏅</span>
          Achievements
        </h3>
        <div className="px-3 py-1 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-full text-xs font-semibold">
          {allAchievements.filter(a => a.unlocked).length}/{allAchievements.length}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {displayedAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: achievement.unlocked ? 1.02 : 1 }}
            className={`relative p-4 rounded-xl border-2 transition-all ${
              achievement.unlocked
                ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white shadow-lg`
                : 'bg-gray-800/30 border-gray-700 text-gray-500'
            }`}
          >
            {achievement.unlocked && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className={`text-4xl ${!achievement.unlocked && 'grayscale opacity-50'}`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold">{achievement.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    achievement.unlocked ? 'bg-white/20' : 'bg-gray-700'
                  }`}>
                    +{achievement.xp} XP
                  </span>
                </div>
                <p className={`text-xs ${achievement.unlocked ? 'opacity-90' : 'text-gray-600'}`}>
                  {achievement.description}
                </p>
                
                {achievement.unlocked && achievement.date && (
                  <p className="text-xs opacity-75 mt-1">
                    Unlocked: {new Date(achievement.date).toLocaleDateString()}
                  </p>
                )}

                {!achievement.unlocked && achievement.progress !== undefined && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">Progress</span>
                      <span className="text-xs font-bold">{achievement.progress}/{achievement.total}</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        className="h-full bg-gradient-to-r from-[#22d3ee] to-[#a855f7]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowAll(!showAll)}
        className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold transition-all"
      >
        {showAll ? 'Show Less' : `View All (${allAchievements.length})`}
      </motion.button>
    </div>
  );
};

export default AchievementSystem;