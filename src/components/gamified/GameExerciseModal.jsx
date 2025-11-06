import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GameExerciseModal = ({ quest, onComplete, onClose, userData }) => {
  const [currentSet, setCurrentSet] = useState(1);
  const [repsCompleted, setRepsCompleted] = useState(0);
  const [isExercising, setIsExercising] = useState(false);
  const [painLevel, setPainLevel] = useState(5);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showPowerUp, setShowPowerUp] = useState(false);
  const [combo, setCombo] = useState(0);

  const totalSets = quest.exercises;
  const repsPerSet = 10;

  const exerciseAnimations = {
    exercise: '🦵',
    tracking: '📝',
    nutrition: '🍎',
  };

  const powerUpMessages = [
    'Mobility +3! 💪',
    'Strength Increased! ⚡',
    'Pain Resistance +2! 🛡️',
    'Flexibility Boost! 🌟',
    'Endurance Enhanced! 🔥',
  ];

  useEffect(() => {
    if (isExercising) {
      const interval = setInterval(() => {
        setRepsCompleted((prev) => {
          if (prev >= repsPerSet) {
            setIsExercising(false);
            if (currentSet < totalSets) {
              // Show power-up message
              setShowPowerUp(true);
              setTimeout(() => setShowPowerUp(false), 2000);
              setCombo(combo + 1);
            } else {
              // All sets completed
              setShowFeedback(true);
            }
            return prev;
          }
          return prev + 1;
        });
      }, 1500); // Simulate rep completion every 1.5 seconds

      return () => clearInterval(interval);
    }
  }, [isExercising, currentSet, totalSets, combo]);

  const startSet = () => {
    setRepsCompleted(0);
    setIsExercising(true);
  };

  const nextSet = () => {
    setCurrentSet(currentSet + 1);
    setRepsCompleted(0);
  };

  const completeQuest = () => {
    onComplete(quest.id, quest.xp + (combo * 10)); // Bonus XP for combo
    onClose();
  };

  const getPainEmoji = (level) => {
    if (level <= 2) return '😊';
    if (level <= 4) return '🙂';
    if (level <= 6) return '😐';
    if (level <= 8) return '😣';
    return '😰';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#22d3ee] shadow-2xl"
        >
          {!showFeedback ? (
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-6xl">{quest.icon}</span>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">{quest.title}</h2>
                    <p className="text-gray-400">{quest.description}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold">
                    Set {currentSet} of {totalSets}
                  </span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">
                    {repsCompleted}/{repsPerSet} reps
                  </span>
                </div>
                <div className="h-4 bg-[#0f172a] rounded-full overflow-hidden border border-[#22d3ee]/30">
                  <motion.div
                    animate={{ width: `${(repsCompleted / repsPerSet) * 100}%` }}
                    className="h-full bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#ec4899] relative"
                  >
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Exercise Animation */}
              <div className="bg-gradient-to-br from-[#22d3ee]/10 to-[#a855f7]/10 rounded-2xl p-12 mb-6 text-center border border-[#22d3ee]/30">
                <motion.div
                  animate={isExercising ? {
                    y: [0, -30, 0],
                    rotate: [0, 10, -10, 0],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: isExercising ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                  className="text-9xl mb-6"
                >
                  {exerciseAnimations[quest.type]}
                </motion.div>
                
                {isExercising ? (
                  <div>
                    <p className="text-2xl font-bold text-white mb-2">Keep Going! 💪</p>
                    <p className="text-gray-400">Follow the movement rhythm</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xl font-bold text-white mb-2">Ready for Set {currentSet}?</p>
                    <p className="text-gray-400">{repsPerSet} reps • Focus on form</p>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-[#0f172a]/50 rounded-xl p-6 mb-6 border border-[#22d3ee]/20">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span className="text-xl">📋</span>
                  Exercise Instructions
                </h4>
                <ol className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</span>
                    <span>Start in a comfortable position with your back straight</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</span>
                    <span>Move slowly and controlled through the full range of motion</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</span>
                    <span>Breathe normally throughout the exercise</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</span>
                    <span>Stop if you feel sharp pain</span>
                  </li>
                </ol>
              </div>

              {/* Safety Warning */}
              <div className="bg-gradient-to-r from-[#fef2f2] to-[#fee2e2] rounded-xl p-4 mb-6 border border-[#ef4444]/30">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#ef4444] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-gray-800">
                    <strong className="text-[#ef4444]">Safety First:</strong> If you experience sharp or increasing pain, stop immediately and consult your healthcare provider.
                  </div>
                </div>
              </div>

              {/* Combo Counter */}
              {combo > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-r from-[#fef3c7] to-[#fde68a] rounded-xl p-4 mb-6 border-2 border-[#f59e0b]"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-3xl">🔥</span>
                    <div>
                      <p className="text-sm text-gray-700">Combo Streak!</p>
                      <p className="text-2xl font-bold text-[#f59e0b]">{combo}x Multiplier</p>
                    </div>
                    <span className="text-sm text-gray-700">+{combo * 10} Bonus XP</span>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              {!isExercising && repsCompleted < repsPerSet && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={startSet}
                  className="w-full py-4 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-[#22d3ee]/50 transition-all flex items-center justify-center gap-3"
                >
                  <span>Start Set {currentSet}</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
              )}

              {!isExercising && repsCompleted >= repsPerSet && currentSet < totalSets && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextSet}
                  className="w-full py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-semibold text-lg shadow-lg"
                >
                  Continue to Set {currentSet + 1} →
                </motion.button>
              )}
            </div>
          ) : (
            /* Feedback Screen */
            <div className="p-8">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: 'spring', duration: 1 }}
                  className="w-32 h-32 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                >
                  <span className="text-7xl">✅</span>
                </motion.div>
                <h2 className="text-4xl font-bold text-white mb-3">Quest Complete!</h2>
                <p className="text-xl text-gray-400">Amazing work! You've completed all sets.</p>
              </div>

              {/* XP Reward */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-[#fef3c7] to-[#fde68a] rounded-2xl p-8 mb-6 text-center border-2 border-[#f59e0b]"
              >
                <p className="text-lg text-gray-700 mb-2">XP Earned</p>
                <motion.p
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]"
                >
                  +{quest.xp + (combo * 10)} XP
                </motion.p>
                {combo > 0 && (
                  <p className="text-sm text-gray-700 mt-2">
                    Base: {quest.xp} XP + {combo * 10} Combo Bonus 🔥
                  </p>
                )}
              </motion.div>

              {/* Pain Level Feedback */}
              <div className="bg-[#1e293b] rounded-2xl p-6 mb-6 border border-[#22d3ee]/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">How was your pain level?</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl">{getPainEmoji(painLevel)}</span>
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">
                      {painLevel}/10
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                    [&::-webkit-slider-thumb]:from-[#22d3ee] [&::-webkit-slider-thumb]:to-[#a855f7]
                    [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>No Pain</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#1e293b] rounded-xl p-4 text-center border border-[#22d3ee]/20">
                  <p className="text-gray-400 text-sm mb-1">Sets</p>
                  <p className="text-2xl font-bold text-white">{totalSets}</p>
                </div>
                <div className="bg-[#1e293b] rounded-xl p-4 text-center border border-[#22d3ee]/20">
                  <p className="text-gray-400 text-sm mb-1">Total Reps</p>
                  <p className="text-2xl font-bold text-white">{totalSets * repsPerSet}</p>
                </div>
                <div className="bg-[#1e293b] rounded-xl p-4 text-center border border-[#22d3ee]/20">
                  <p className="text-gray-400 text-sm mb-1">Duration</p>
                  <p className="text-2xl font-bold text-white">~{Math.ceil((totalSets * repsPerSet * 1.5) / 60)}min</p>
                </div>
              </div>

              {/* Complete Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={completeQuest}
                className="w-full py-4 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-xl font-semibold text-lg shadow-lg"
              >
                Claim Rewards & Continue
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Power-Up Popup */}
        <AnimatePresence>
          {showPowerUp && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60]"
            >
              <div className="bg-gradient-to-r from-[#22d3ee] to-[#a855f7] rounded-2xl p-6 shadow-2xl border-2 border-white">
                <motion.p
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  className="text-3xl font-bold text-white text-center"
                >
                  {powerUpMessages[Math.floor(Math.random() * powerUpMessages.length)]}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameExerciseModal;