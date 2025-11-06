import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LeaderboardAvatar = ({ gameState, userName }) => {
  const [activeTab, setActiveTab] = useState('leaderboard');

  const leaderboardData = [
    { rank: 1, name: 'FitWarrior92', xp: 1520, avatar: '💪', streak: 15, badge: '🥇' },
    { rank: 2, name: 'RecoveryKing', xp: 1380, avatar: '👑', streak: 12, badge: '🥈' },
    { rank: 3, name: 'HealthHero', xp: 1240, avatar: '🦸', streak: 10, badge: '🥉' },
    { rank: 4, name: userName, xp: gameState.totalXP, avatar: '👤', streak: gameState.streak, badge: '', isUser: true },
    { rank: 5, name: 'PainFreeJoe', xp: 890, avatar: '😊', streak: 8, badge: '' },
    { rank: 6, name: 'FlexMaster', xp: 750, avatar: '🧘', streak: 7, badge: '' },
  ];

  const avatarOptions = [
    { id: 1, icon: '👤', name: 'Default', unlocked: true, cost: 0 },
    { id: 2, icon: '💪', name: 'Strong', unlocked: true, cost: 0 },
    { id: 3, icon: '⚡', name: 'Lightning', unlocked: false, cost: 200 },
    { id: 4, icon: '🔥', name: 'Fire', unlocked: false, cost: 300 },
    { id: 5, icon: '🌟', name: 'Star', unlocked: false, cost: 500 },
    { id: 6, icon: '👑', name: 'Royal', unlocked: false, cost: 1000 },
  ];

  const backgrounds = [
    { id: 1, name: 'Forest', gradient: 'from-[#10b981] to-[#059669]', unlocked: true, cost: 0 },
    { id: 2, name: 'Ocean', gradient: 'from-[#22d3ee] to-[#06b6d4]', unlocked: true, cost: 0 },
    { id: 3, name: 'Sunset', gradient: 'from-[#f59e0b] to-[#d97706]', unlocked: false, cost: 150 },
    { id: 4, name: 'Galaxy', gradient: 'from-[#a855f7] to-[#9333ea]', unlocked: false, cost: 250 },
  ];

  return (
    <div className="bg-[#1e293b]/50 backdrop-blur-xl rounded-2xl p-6 border border-[#22d3ee]/20 shadow-xl">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-[#0f172a]/50 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
            activeTab === 'leaderboard'
              ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🏆 Leaderboard
        </button>
        <button
          onClick={() => setActiveTab('avatar')}
          className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
            activeTab === 'avatar'
              ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🎨 Avatar
        </button>
      </div>

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div>
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>📊</span>
            Weekly Rankings
          </h4>
          <div className="space-y-2">
            {leaderboardData.map((player, index) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-xl transition-all ${
                  player.isUser
                    ? 'bg-gradient-to-r from-[#22d3ee]/20 to-[#a855f7]/20 border-2 border-[#22d3ee] shadow-lg'
                    : 'bg-[#0f172a]/30 hover:bg-[#0f172a]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    player.rank <= 3
                      ? 'bg-gradient-to-r from-[#f59e0b] to-[#eab308] text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {player.rank}
                  </div>
                  <div className="text-2xl">{player.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white text-sm">{player.name}</p>
                      {player.isUser && (
                        <span className="px-2 py-0.5 bg-[#22d3ee] text-white rounded-full text-xs font-semibold">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{player.xp} XP</span>
                      <span className="flex items-center gap-1">
                        🔥 {player.streak}
                      </span>
                    </div>
                  </div>
                  {player.badge && <span className="text-2xl">{player.badge}</span>}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gradient-to-r from-[#10b981]/10 to-[#22d3ee]/10 rounded-xl border border-[#10b981]/30">
            <p className="text-sm text-white text-center">
              <strong className="text-[#10b981]">Great job!</strong> You're in the top 10%. Keep completing quests to climb higher! 🚀
            </p>
          </div>
        </div>
      )}

      {/* Avatar Customization Tab */}
      {activeTab === 'avatar' && (
        <div>
          {/* Preview */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-white mb-4">Your Avatar</h4>
            <div className="flex justify-center">
              <div className={`w-32 h-32 bg-gradient-to-br ${backgrounds.find(b => b.unlocked)?.gradient || backgrounds[0].gradient} rounded-full flex items-center justify-center text-6xl shadow-2xl`}>
                👤
              </div>
            </div>
          </div>

          {/* Avatar Icons */}
          <div className="mb-6">
            <h5 className="text-sm font-semibold text-white mb-3">Choose Icon</h5>
            <div className="grid grid-cols-3 gap-3">
              {avatarOptions.map((avatar) => (
                <motion.button
                  key={avatar.id}
                  whileHover={{ scale: avatar.unlocked ? 1.1 : 1 }}
                  whileTap={{ scale: avatar.unlocked ? 0.95 : 1 }}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    avatar.unlocked
                      ? 'bg-[#0f172a]/50 border-[#22d3ee] hover:bg-[#22d3ee]/10'
                      : 'bg-gray-800/30 border-gray-700 cursor-not-allowed'
                  }`}
                >
                  <div className={`text-3xl mb-1 ${!avatar.unlocked && 'grayscale opacity-50'}`}>
                    {avatar.icon}
                  </div>
                  <p className={`text-xs ${avatar.unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {avatar.name}
                  </p>
                  {!avatar.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                      <span className="text-xs font-semibold text-white">
                        {avatar.cost} XP
                      </span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Backgrounds */}
          <div>
            <h5 className="text-sm font-semibold text-white mb-3">Choose Background</h5>
            <div className="grid grid-cols-2 gap-3">
              {backgrounds.map((bg) => (
                <motion.button
                  key={bg.id}
                  whileHover={{ scale: bg.unlocked ? 1.05 : 1 }}
                  whileTap={{ scale: bg.unlocked ? 0.95 : 1 }}
                  className={`relative h-16 rounded-xl border-2 transition-all ${
                    bg.unlocked
                      ? 'border-[#22d3ee]'
                      : 'border-gray-700 cursor-not-allowed'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${bg.gradient} rounded-xl ${!bg.unlocked && 'opacity-30'}`}></div>
                  <div className="relative h-full flex items-center justify-center">
                    <p className={`text-xs font-semibold ${bg.unlocked ? 'text-white' : 'text-gray-400'}`}>
                      {bg.name}
                    </p>
                    {!bg.unlocked && (
                      <span className="absolute bottom-1 right-2 text-xs font-semibold text-white bg-black/50 px-2 py-0.5 rounded-full">
                        {bg.cost} XP
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardAvatar;