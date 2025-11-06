import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import StoryMap from '../components/gamified/StoryMap';
import AchievementSystem from '../components/gamified/AchievementSystem';
import DoctorNPC from '../components/gamified/DoctorNPC';
import LeaderboardAvatar from '../components/gamified/LeaderboardAvatar';
import GameExerciseModal from '../components/gamified/GameExerciseModal';

const GamifiedRehabPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get userData from location state or localStorage
  const [userData] = useState(() => {
    const savedUserData = localStorage.getItem('rehabUserData');
    return location.state || (savedUserData ? JSON.parse(savedUserData) : {});
  });
  
  const [gameState, setGameState] = useState(() => {
    const savedGameState = localStorage.getItem('gamifiedState');
    return savedGameState ? JSON.parse(savedGameState) : {
      currentChapter: 2,
      totalXP: 350,
      level: 3,
      streak: 7,
      badges: ['first-steps', 'week-warrior', 'pain-reducer', 'mobility-master', 'consistency-champion'],
      completedQuests: [3],
      avatarCustomization: {
        outfit: 'default',
        background: 'forest',
        accessories: [],
      },
    };
  });
  
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [showNPCDialog, setShowNPCDialog] = useState(false);
  const [showRewardPopup, setShowRewardPopup] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const userName = 'swayamshah01';

  // Story chapters based on recovery phases
  const chapters = [
    {
      id: 1,
      name: 'Mobility Valley',
      phase: 'Early Recovery',
      description: 'Begin your journey by restoring basic movement',
      icon: '🏔️',
      gradient: 'from-[#22d3ee] to-[#06b6d4]',
      unlocked: true,
      progress: 100,
      xpReward: 200,
    },
    {
      id: 2,
      name: 'Flexibility Forest',
      phase: 'Mid Recovery',
      description: 'Enhance your range of motion through guided stretches',
      icon: '🌲',
      gradient: 'from-[#10b981] to-[#059669]',
      unlocked: true,
      progress: 75,
      xpReward: 300,
    },
    {
      id: 3,
      name: 'Strength Summit',
      phase: 'Advanced Recovery',
      description: 'Build power and endurance in your recovery',
      icon: '⛰️',
      gradient: 'from-[#a855f7] to-[#9333ea]',
      unlocked: true,
      progress: 45,
      xpReward: 400,
    },
    {
      id: 4,
      name: 'Stability Plains',
      phase: 'Final Phase',
      description: 'Master balance and prevent future injuries',
      icon: '🏜️',
      gradient: 'from-[#f59e0b] to-[#d97706]',
      unlocked: false,
      progress: 0,
      xpReward: 500,
    },
    {
      id: 5,
      name: 'Recovery Peak',
      phase: 'Completion',
      description: 'Achieve full recovery and unlock your potential',
      icon: '🏔️',
      gradient: 'from-[#ec4899] to-[#db2777]',
      unlocked: false,
      progress: 0,
      xpReward: 1000,
    },
  ];

  // Daily quests
  const dailyQuests = [
    {
      id: 1,
      title: 'Morning Mobility Quest',
      description: 'Complete 3 knee flexion exercises',
      type: 'exercise',
      difficulty: 'easy',
      xp: 50,
      icon: '🌅',
      completed: false,
      exercises: 3,
      currentProgress: 0,
    },
    {
      id: 2,
      title: 'Strength Builder',
      description: 'Perform 4 sets of straight leg raises',
      type: 'exercise',
      difficulty: 'medium',
      xp: 75,
      icon: '💪',
      completed: false,
      exercises: 4,
      currentProgress: 2,
    },
    {
      id: 3,
      title: 'Pain Logger',
      description: 'Record your pain level 3 times today',
      type: 'tracking',
      difficulty: 'easy',
      xp: 30,
      icon: '📝',
      completed: true,
      exercises: 3,
      currentProgress: 3,
    },
    {
      id: 4,
      title: 'Nutrition Champion',
      description: 'Meet your protein goal (60g)',
      type: 'nutrition',
      difficulty: 'medium',
      xp: 40,
      icon: '🍎',
      completed: false,
      exercises: 1,
      currentProgress: 0,
    },
  ];

  const updateGameState = (newData) => {
    const updatedState = { ...gameState, ...newData };
    setGameState(updatedState);
    // Sync to localStorage
    localStorage.setItem('gamifiedState', JSON.stringify(updatedState));
  };

  const completeQuest = (questId, xpEarned) => {
    // Show reward popup
    setShowRewardPopup({ xp: xpEarned, title: 'Quest Completed!' });
    
    // Update state
    updateGameState({
      totalXP: gameState.totalXP + xpEarned,
      completedQuests: [...gameState.completedQuests, questId],
    });

    // Hide popup after animation
    setTimeout(() => setShowRewardPopup(null), 3000);
  };

  const startQuest = (quest) => {
    setSelectedQuest(quest);
    setShowExerciseModal(true);
  };

  useEffect(() => {
    // Show welcome dialog on first visit
    const hasVisited = localStorage.getItem('gamifiedVisited');
    if (!hasVisited) {
      setShowNPCDialog(true);
      localStorage.setItem('gamifiedVisited', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#22d3ee]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/20 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-[#0f172a]/80 backdrop-blur-xl border-b border-[#22d3ee]/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo & Title */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm font-medium">Back to Dashboard</span>
              </motion.button>

              <div className="h-6 w-px bg-gray-700"></div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-lg flex items-center justify-center shadow-lg shadow-[#a855f7]/50">
                  <span className="text-white font-bold text-xl">⚔️</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Gamified Rehab Mode</h1>
                  <p className="text-xs text-gray-400">Level {gameState.level} • {gameState.totalXP} XP</p>
                </div>
              </div>
            </div>

            {/* Right: Quick Stats & Controls */}
            <div className="flex items-center gap-4">
              {/* Streak */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#f59e0b]/20 to-[#d97706]/20 rounded-full border border-[#f59e0b]/30"
              >
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-xs text-gray-400">Streak</p>
                  <p className="text-sm font-bold text-[#f59e0b]">{gameState.streak} Days</p>
                </div>
              </motion.div>

              {/* Music Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                className={`p-3 rounded-full transition-all ${
                  isMusicPlaying
                    ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] shadow-lg'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isMusicPlaying ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.button>

              {/* Profile */}
              <div className="w-10 h-10 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center text-xl cursor-pointer">
                👤
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Level {gameState.level} Progress</span>
              <span className="text-xs font-semibold text-[#22d3ee]">{gameState.totalXP}/500 XP</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(gameState.totalXP / 500) * 100}%` }}
                className="h-full bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#ec4899] relative"
              >
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#ec4899] rounded-2xl p-6 mb-8 text-white shadow-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Welcome to your Recovery Adventure, {userName}! 🎮
              </h2>
              <p className="text-white/90 text-lg">
                Complete quests, earn XP, and unlock new chapters in your healing journey
              </p>
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              ⚔️
            </motion.div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Story Map & Quests */}
          <div className="lg:col-span-2 space-y-8">
            {/* Story Map */}
            <StoryMap 
              chapters={chapters}
              currentChapter={gameState.currentChapter}
              userData={userData}
            />

            {/* Daily Quests */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-3xl">🎯</span>
                Today's Quests
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {dailyQuests.map((quest, index) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`relative rounded-2xl p-6 border-2 transition-all ${
                      quest.completed
                        ? 'bg-[#10b981]/10 border-[#10b981] opacity-75'
                        : 'bg-[#1e293b]/50 border-[#22d3ee]/30 hover:border-[#22d3ee] backdrop-blur-sm'
                    }`}
                  >
                    {quest.completed && (
                      <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{quest.icon}</span>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          quest.difficulty === 'easy'
                            ? 'bg-[#10b981]/20 text-[#10b981]'
                            : quest.difficulty === 'medium'
                            ? 'bg-[#f59e0b]/20 text-[#f59e0b]'
                            : 'bg-[#ef4444]/20 text-[#ef4444]'
                        }`}>
                          {quest.difficulty}
                        </span>
                        <span className="px-3 py-1 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-full text-xs font-semibold">
                          +{quest.xp} XP
                        </span>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2">{quest.title}</h4>
                    <p className="text-gray-400 text-sm mb-4">{quest.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">Progress</span>
                        <span className="text-xs font-semibold text-white">
                          {quest.currentProgress}/{quest.exercises}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(quest.currentProgress / quest.exercises) * 100}%` }}
                          className="h-full bg-gradient-to-r from-[#22d3ee] to-[#a855f7]"
                        />
                      </div>
                    </div>

                    {!quest.completed && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => startQuest(quest)}
                        className="w-full py-3 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-xl font-semibold shadow-lg hover:shadow-[#22d3ee]/50 transition-all"
                      >
                        Start Quest →
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Achievements & Leaderboard */}
          <div className="space-y-8">
            {/* Achievements Preview */}
            <AchievementSystem 
              gameState={gameState}
              updateGameState={updateGameState}
            />

            {/* Leaderboard & Avatar */}
            <LeaderboardAvatar 
              gameState={gameState}
              userName={userName}
            />
          </div>
        </div>
      </div>

      {/* Doctor NPC */}
      <DoctorNPC 
        show={showNPCDialog}
        setShow={setShowNPCDialog}
        gameState={gameState}
        userName={userName}
      />

      {/* Exercise Modal */}
      {showExerciseModal && selectedQuest && (
        <GameExerciseModal
          quest={selectedQuest}
          onComplete={completeQuest}
          onClose={() => setShowExerciseModal(false)}
          userData={userData}
        />
      )}

      {/* Reward Popup */}
      <AnimatePresence>
        {showRewardPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-3xl p-8 shadow-2xl border-4 border-[#f59e0b] text-center">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                🏆
              </motion.div>
              <h3 className="text-3xl font-bold text-[#0f172a] mb-2">{showRewardPopup.title}</h3>
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">
                +{showRewardPopup.xp} XP
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamifiedRehabPage;