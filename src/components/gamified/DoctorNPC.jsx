import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DoctorNPC = ({ show, setShow, gameState, userName }) => {
  const [dialogIndex, setDialogIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const dialogs = [
    {
      text: `Welcome to the Gamified Rehab Mode, ${userName}! I'm Dr. Recovery, your AI companion on this journey. 🩺`,
      emotion: 'happy',
    },
    {
      text: `I see you're on Day ${gameState.streak} of your streak! That's fantastic dedication. Let's keep that momentum going! 💪`,
      emotion: 'excited',
    },
    {
      text: `Remember: Complete your daily quests, earn XP, and unlock new chapters. Each quest is designed specifically for your ${gameState.currentChapter === 1 ? 'early' : gameState.currentChapter === 2 ? 'mid' : 'advanced'} recovery stage.`,
      emotion: 'info',
    },
    {
      text: `Don't forget to hydrate and rest between exercises. Your body recovers faster when it's well-nourished! 💧`,
      emotion: 'tip',
    },
    {
      text: `Ready to start today's adventure? Let's do this! 🎮`,
      emotion: 'ready',
    },
  ];

  const currentDialog = dialogs[dialogIndex];

  const handleNext = () => {
    if (dialogIndex < dialogs.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        setDialogIndex(dialogIndex + 1);
        setIsTyping(false);
      }, 300);
    } else {
      setShow(false);
    }
  };

  const getEmotionIcon = (emotion) => {
    switch (emotion) {
      case 'happy':
        return '😊';
      case 'excited':
        return '🎉';
      case 'info':
        return '💡';
      case 'tip':
        return '✨';
      case 'ready':
        return '🚀';
      default:
        return '😊';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setShow(false)}
          />

          {/* NPC Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-8 right-8 z-50 max-w-md"
          >
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border-2 border-[#22d3ee] shadow-2xl">
              {/* Doctor Avatar */}
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="w-20 h-20 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center text-5xl shadow-lg flex-shrink-0"
                >
                  👨‍⚕️
                </motion.div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold text-white">Dr. Recovery</h4>
                    <button
                      onClick={() => setShow(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400">AI Companion • Level {gameState.level}</span>
                  </div>
                </div>
              </div>

              {/* Dialog Box */}
              <div className="bg-[#0f172a]/50 rounded-2xl p-4 border border-[#22d3ee]/30 mb-4">
                <div className="flex items-start gap-3">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-3xl"
                  >
                    {getEmotionIcon(currentDialog.emotion)}
                  </motion.span>
                  <div className="flex-1">
                    <AnimatePresence mode="wait">
                      {!isTyping && (
                        <motion.p
                          key={dialogIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-white leading-relaxed"
                        >
                          {currentDialog.text}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {dialogs.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all ${
                      index === dialogIndex
                        ? 'w-8 bg-gradient-to-r from-[#22d3ee] to-[#a855f7]'
                        : index < dialogIndex
                        ? 'w-1.5 bg-[#10b981]'
                        : 'w-1.5 bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {dialogIndex < dialogs.length - 1 ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShow(false)}
                      className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all"
                    >
                      Skip
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNext}
                      className="flex-1 py-3 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
                    >
                      Next
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="w-full py-3 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-xl font-semibold shadow-lg"
                  >
                    Let's Begin! 🚀
                  </motion.button>
                )}
              </div>
            </div>

            {/* Floating Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 bg-gradient-to-r from-[#10b981]/20 to-[#22d3ee]/20 rounded-xl p-4 border border-[#10b981]/30"
            >
              <p className="text-sm text-white flex items-start gap-2">
                <span className="text-lg flex-shrink-0">💡</span>
                <span><strong>Pro Tip:</strong> Complete quests early in the day for maximum energy and better recovery results!</span>
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DoctorNPC;