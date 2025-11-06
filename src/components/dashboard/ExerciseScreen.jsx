import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExerciseScreen = ({ userData, userProgress, updateProgress }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isExercising, setIsExercising] = useState(false);
  const [currentRep, setCurrentRep] = useState(0);
  const [painLevel, setPainLevel] = useState(5);
  const [showFeedback, setShowFeedback] = useState(false);

  const exercises = [
    {
      id: 1,
      name: 'Knee Flexion Stretch',
      duration: '3 sets × 10 reps',
      difficulty: 'Beginner',
      calories: 15,
      xp: 50,
      targetArea: 'Quadriceps',
      completed: false,
      icon: '🦵',
      instructions: [
        'Sit on a chair with your back straight',
        'Slowly bend your knee, bringing your heel toward your buttock',
        'Hold for 5 seconds',
        'Slowly lower your foot back down',
        'Repeat 10 times',
      ],
      videoUrl: null,
      safetyTips: [
        'Stop if you feel sharp pain',
        'Keep movements slow and controlled',
        'Breathe normally throughout',
      ],
    },
    {
      id: 2,
      name: 'Straight Leg Raises',
      duration: '3 sets × 12 reps',
      difficulty: 'Beginner',
      calories: 20,
      xp: 75,
      targetArea: 'Quadriceps',
      completed: false,
      icon: '🏋️',
      instructions: [
        'Lie on your back on a flat surface',
        'Keep one leg bent with foot flat on the floor',
        'Keep the other leg straight',
        'Slowly lift the straight leg 6-12 inches off the floor',
        'Hold for 3 seconds, then lower slowly',
      ],
      videoUrl: null,
      safetyTips: [
        'Keep your back flat against the floor',
        'Don\'t hold your breath',
        'Start with fewer reps if needed',
      ],
    },
    {
      id: 3,
      name: 'Ankle Pumps',
      duration: '2 sets × 15 reps',
      difficulty: 'Easy',
      calories: 10,
      xp: 30,
      targetArea: 'Ankle & Calf',
      completed: true,
      icon: '👟',
      instructions: [
        'Sit or lie down comfortably',
        'Point your toes forward as far as you can',
        'Hold for 3 seconds',
        'Pull your toes back toward you',
        'Hold for 3 seconds',
      ],
      videoUrl: null,
      safetyTips: [
        'Move only your ankle, not your whole leg',
        'Keep movements gentle',
      ],
    },
    {
      id: 4,
      name: 'Seated Knee Extension',
      duration: '3 sets × 10 reps',
      difficulty: 'Intermediate',
      calories: 25,
      xp: 100,
      targetArea: 'Quadriceps',
      completed: false,
      icon: '💪',
      instructions: [
        'Sit in a chair with your back straight',
        'Slowly straighten one knee',
        'Hold for 5 seconds at the top',
        'Slowly lower your foot back down',
        'Repeat with other leg',
      ],
      videoUrl: null,
      safetyTips: [
        'Keep your thigh on the chair',
        'Don\'t lock your knee at the top',
        'Control the movement on the way down',
      ],
    },
  ];

  const [exerciseList, setExerciseList] = useState(exercises);

  const startExercise = (exercise) => {
    setSelectedExercise(exercise);
    setIsExercising(true);
    setCurrentRep(0);
    setPainLevel(5);
  };

  const completeRep = () => {
    const totalReps = parseInt(selectedExercise.duration.split('×')[1]);
    if (currentRep < totalReps) {
      setCurrentRep(currentRep + 1);
      if (currentRep + 1 === totalReps) {
        setTimeout(() => {
          completeExercise();
        }, 1000);
      }
    }
  };

  const completeExercise = () => {
    setShowFeedback(true);
  };

  const submitFeedback = () => {
    // Update exercise as completed
    const updatedExercises = exerciseList.map(ex =>
      ex.id === selectedExercise.id ? { ...ex, completed: true } : ex
    );
    setExerciseList(updatedExercises);

    // Update user progress
    updateProgress({
      exercisesCompleted: userProgress.exercisesCompleted + 1,
      totalXP: userProgress.totalXP + selectedExercise.xp,
      painTrend: [...userProgress.painTrend, { date: new Date(), level: painLevel }],
    });

    // Reset state
    setShowFeedback(false);
    setIsExercising(false);
    setSelectedExercise(null);
    setCurrentRep(0);
  };

  const getPainEmoji = (level) => {
    if (level <= 2) return '😊';
    if (level <= 4) return '🙂';
    if (level <= 6) return '😐';
    if (level <= 8) return '😣';
    return '😰';
  };

  const completedCount = exerciseList.filter(ex => ex.completed).length;
  const totalCount = exerciseList.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div>
      {/* Header Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">🎯</span>
            <span className="text-sm font-semibold text-[#22d3ee]">Today</span>
          </div>
          <h3 className="text-2xl font-bold text-[#0f172a]">{completedCount}/{totalCount}</h3>
          <p className="text-sm text-gray-600">Exercises Completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">🔥</span>
            <span className="text-sm font-semibold text-[#f59e0b]">Streak</span>
          </div>
          <h3 className="text-2xl font-bold text-[#0f172a]">{userProgress.currentStreak} Days</h3>
          <p className="text-sm text-gray-600">Keep it up!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">⭐</span>
            <span className="text-sm font-semibold text-[#a855f7]">XP</span>
          </div>
          <h3 className="text-2xl font-bold text-[#0f172a]">{userProgress.totalXP}</h3>
          <p className="text-sm text-gray-600">Total Points</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">📈</span>
            <span className="text-sm font-semibold text-[#10b981]">Level</span>
          </div>
          <h3 className="text-2xl font-bold text-[#0f172a]">Level {userProgress.level}</h3>
          <p className="text-sm text-gray-600">Recovery Stage</p>
        </motion.div>
      </div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-[#22d3ee]/10 to-[#a855f7]/10 rounded-2xl p-6 border border-[#22d3ee]/20 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0f172a]">Today's Progress</h3>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="h-3 bg-white rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-[#22d3ee] to-[#a855f7]"
          />
        </div>
      </motion.div>

      {/* Exercise List */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0f172a] mb-6">Today's Exercise Plan</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {exerciseList.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all ${
                exercise.completed
                  ? 'border-[#10b981] bg-[#f0fdf4]'
                  : 'border-gray-200 hover:border-[#22d3ee]'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{exercise.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0f172a]">{exercise.name}</h3>
                    <p className="text-sm text-gray-600">{exercise.duration}</p>
                  </div>
                </div>
                {exercise.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 bg-[#10b981] rounded-full flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Difficulty</p>
                  <p className="text-sm font-semibold text-[#0f172a]">{exercise.difficulty}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Calories</p>
                  <p className="text-sm font-semibold text-[#0f172a]">{exercise.calories}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">XP</p>
                  <p className="text-sm font-semibold text-[#a855f7]">+{exercise.xp}</p>
                </div>
              </div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-[#22d3ee]/10 text-[#22d3ee] rounded-full text-xs font-semibold">
                  Target: {exercise.targetArea}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: exercise.completed ? 1 : 1.02 }}
                whileTap={{ scale: exercise.completed ? 1 : 0.98 }}
                onClick={() => !exercise.completed && startExercise(exercise)}
                disabled={exercise.completed}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  exercise.completed
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white hover:shadow-lg'
                }`}
              >
                {exercise.completed ? 'Completed ✓' : 'Start Exercise'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Exercise Modal */}
      <AnimatePresence>
        {isExercising && selectedExercise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => !showFeedback && setIsExercising(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              {!showFeedback ? (
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl">{selectedExercise.icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-[#0f172a]">{selectedExercise.name}</h2>
                        <p className="text-gray-600">{selectedExercise.duration}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsExercising(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Animated Exercise Visualization */}
                  <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-2xl p-12 mb-6 text-center">
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="text-9xl"
                    >
                      🦵
                    </motion.div>
                    <p className="text-lg font-semibold text-[#22d3ee] mt-4">Follow the movement</p>
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-600">Progress</span>
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">
                        {currentRep}/{parseInt(selectedExercise.duration.split('×')[1])}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: `${(currentRep / parseInt(selectedExercise.duration.split('×')[1])) * 100}%` }}
                        className="h-full bg-gradient-to-r from-[#22d3ee] to-[#a855f7]"
                      />
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#0f172a] mb-3">Instructions</h3>
                    <ol className="space-y-3">
                      {selectedExercise.instructions.map((instruction, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg"
                        >
                          <div className="w-6 h-6 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{instruction}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </div>

                  {/* Safety Tips */}
                  <div className="mb-6 bg-gradient-to-r from-[#fef2f2] to-[#fee2e2] rounded-xl p-4 border border-[#ef4444]/30">
                    <h4 className="font-semibold text-[#ef4444] mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Safety Tips
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {selectedExercise.safetyTips.map((tip, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-[#ef4444]">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={completeRep}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Complete Rep ({currentRep + 1}/{parseInt(selectedExercise.duration.split('×')[1])})
                  </motion.button>
                </div>
              ) : (
                <div className="p-8">
                  {/* Feedback Form */}
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                      className="w-20 h-20 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <span className="text-5xl">✅</span>
                    </motion.div>
                    <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Great Job!</h2>
                    <p className="text-gray-600">You've completed {selectedExercise.name}</p>
                  </div>

                  {/* Pain Level Feedback */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-[#0f172a]">How was your pain level?</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{getPainEmoji(painLevel)}</span>
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">
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
                      className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                        [&::-webkit-slider-thumb]:from-[#22d3ee] [&::-webkit-slider-thumb]:to-[#a855f7]
                        [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #22d3ee 30%, #f59e0b 60%, #ef4444 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>No Pain</span>
                      <span>Moderate</span>
                      <span>Severe</span>
                    </div>
                  </div>

                  {/* XP Earned */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-[#fef3c7] to-[#fde68a] rounded-xl p-6 mb-6 text-center border-2 border-[#f59e0b]"
                  >
                    <p className="text-sm text-gray-700 mb-2">XP Earned</p>
                    <p className="text-4xl font-bold text-[#f59e0b]">+{selectedExercise.xp} XP</p>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={submitFeedback}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white font-semibold text-lg shadow-lg"
                  >
                    Submit Feedback
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExerciseScreen;