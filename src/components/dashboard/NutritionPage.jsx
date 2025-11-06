import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NutritionPage = ({ userData, userProgress, updateProgress }) => {
  const [waterIntake, setWaterIntake] = useState(6);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const dailyTargets = {
    water: 10, // glasses
    protein: 80, // grams
    calories: 2000,
    calcium: 1200, // mg
    vitaminD: 800, // IU
  };

  const [currentIntake, setCurrentIntake] = useState({
    protein: 45,
    calories: 1200,
    calcium: 600,
    vitaminD: 400,
  });

  const mealPlan = [
    {
      id: 1,
      meal: 'Breakfast',
      time: '8:00 AM',
      icon: '🌅',
      gradient: 'from-[#f59e0b] to-[#d97706]',
      items: [
        { name: 'Moong Dal Chilla', protein: 12, calories: 180, icon: '🥞' },
        { name: 'Greek Yogurt', protein: 10, calories: 100, icon: '🥛' },
        { name: 'Mixed Nuts', protein: 6, calories: 160, icon: '🥜' },
        { name: 'Orange Juice', protein: 1, calories: 110, icon: '🍊' },
      ],
      completed: true,
    },
    {
      id: 2,
      meal: 'Mid-Morning Snack',
      time: '11:00 AM',
      icon: '☕',
      gradient: 'from-[#10b981] to-[#059669]',
      items: [
        { name: 'Banana', protein: 1, calories: 105, icon: '🍌' },
        { name: 'Almonds (10 pieces)', protein: 5, calories: 70, icon: '🌰' },
      ],
      completed: true,
    },
    {
      id: 3,
      meal: 'Lunch',
      time: '1:00 PM',
      icon: '🍱',
      gradient: 'from-[#22d3ee] to-[#06b6d4]',
      items: [
        { name: 'Brown Rice', protein: 5, calories: 215, icon: '🍚' },
        { name: 'Dal Tadka', protein: 12, calories: 180, icon: '🥘' },
        { name: 'Grilled Chicken', protein: 25, calories: 165, icon: '🍗' },
        { name: 'Mixed Vegetables', protein: 3, calories: 80, icon: '🥗' },
        { name: 'Curd', protein: 6, calories: 60, icon: '🥛' },
      ],
      completed: false,
    },
    {
      id: 4,
      meal: 'Evening Snack',
      time: '5:00 PM',
      icon: '🍵',
      gradient: 'from-[#a855f7] to-[#9333ea]',
      items: [
        { name: 'Sprouted Moong', protein: 8, calories: 120, icon: '🌱' },
        { name: 'Green Tea', protein: 0, calories: 0, icon: '🍵' },
      ],
      completed: false,
    },
    {
      id: 5,
      meal: 'Dinner',
      time: '8:00 PM',
      icon: '🌙',
      gradient: 'from-[#ec4899] to-[#db2777]',
      items: [
        { name: 'Roti (2 pieces)', protein: 6, calories: 160, icon: '🫓' },
        { name: 'Paneer Bhurji', protein: 18, calories: 265, icon: '🧈' },
        { name: 'Palak (Spinach)', protein: 5, calories: 40, icon: '🥬' },
        { name: 'Raita', protein: 4, calories: 50, icon: '🥛' },
      ],
      completed: false,
    },
  ];

  const supplements = [
    { name: 'Vitamin D3', dosage: '800 IU', time: 'Morning', icon: '☀️', taken: true },
    { name: 'Calcium', dosage: '500 mg', time: 'Afternoon', icon: '🦴', taken: true },
    { name: 'Omega-3', dosage: '1000 mg', time: 'Evening', icon: '🐟', taken: false },
    { name: 'Multivitamin', dosage: '1 tablet', time: 'Morning', icon: '💊', taken: true },
  ];

  const groceryList = [
    { category: 'Proteins', items: ['Chicken breast', 'Paneer', 'Eggs', 'Moong dal', 'Greek yogurt'] },
    { category: 'Vegetables', items: ['Spinach', 'Broccoli', 'Carrots', 'Tomatoes', 'Bell peppers'] },
    { category: 'Fruits', items: ['Bananas', 'Oranges', 'Apples', 'Berries'] },
    { category: 'Grains', items: ['Brown rice', 'Whole wheat flour', 'Oats', 'Quinoa'] },
    { category: 'Dairy', items: ['Milk', 'Curd', 'Cheese', 'Butter'] },
  ];

  const addWater = () => {
    if (waterIntake < dailyTargets.water) {
      setWaterIntake(waterIntake + 1);
    }
  };

  const getProgressColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage < 50) return 'from-[#ef4444] to-[#dc2626]';
    if (percentage < 80) return 'from-[#f59e0b] to-[#d97706]';
    return 'from-[#10b981] to-[#059669]';
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#0f172a] mb-3">
          Nutrition <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#059669]">Plan</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Personalized nutrition guidance for faster recovery and optimal healing
        </p>
      </div>

      {/* Daily Nutrition Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">🥩</span>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              currentIntake.protein / dailyTargets.protein >= 0.8 ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#f59e0b]/20 text-[#f59e0b]'
            }`}>
              {Math.round((currentIntake.protein / dailyTargets.protein) * 100)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#0f172a] mb-1">{currentIntake.protein}g</h3>
          <p className="text-sm text-gray-600 mb-3">of {dailyTargets.protein}g Protein</p>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentIntake.protein / dailyTargets.protein) * 100}%` }}
              className={`h-full bg-gradient-to-r ${getProgressColor(currentIntake.protein, dailyTargets.protein)}`}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">🔥</span>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              currentIntake.calories / dailyTargets.calories >= 0.8 ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#f59e0b]/20 text-[#f59e0b]'
            }`}>
              {Math.round((currentIntake.calories / dailyTargets.calories) * 100)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#0f172a] mb-1">{currentIntake.calories}</h3>
          <p className="text-sm text-gray-600 mb-3">of {dailyTargets.calories} Calories</p>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentIntake.calories / dailyTargets.calories) * 100}%` }}
              className={`h-full bg-gradient-to-r ${getProgressColor(currentIntake.calories, dailyTargets.calories)}`}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">🥛</span>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              currentIntake.calcium / dailyTargets.calcium >= 0.8 ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#f59e0b]/20 text-[#f59e0b]'
            }`}>
              {Math.round((currentIntake.calcium / dailyTargets.calcium) * 100)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#0f172a] mb-1">{currentIntake.calcium}mg</h3>
          <p className="text-sm text-gray-600 mb-3">of {dailyTargets.calcium}mg Calcium</p>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentIntake.calcium / dailyTargets.calcium) * 100}%` }}
              className={`h-full bg-gradient-to-r ${getProgressColor(currentIntake.calcium, dailyTargets.calcium)}`}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">💧</span>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              waterIntake / dailyTargets.water >= 0.8 ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#22d3ee]/20 text-[#22d3ee]'
            }`}>
              {Math.round((waterIntake / dailyTargets.water) * 100)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#0f172a] mb-1">{waterIntake} glasses</h3>
          <p className="text-sm text-gray-600 mb-3">of {dailyTargets.water} glasses Water</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addWater}
            className="w-full py-2 bg-gradient-to-r from-[#22d3ee] to-[#06b6d4] text-white rounded-lg font-semibold text-sm"
          >
            + Add Glass
          </motion.button>
        </motion.div>
      </div>

      {/* Meal Plan */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Today's Meal Plan</h3>
        <div className="space-y-4">
          {mealPlan.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all ${
                meal.completed ? 'border-[#10b981] bg-[#f0fdf4]' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${meal.gradient} rounded-xl flex items-center justify-center text-3xl`}>
                    {meal.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#0f172a]">{meal.meal}</h4>
                    <p className="text-gray-600">{meal.time}</p>
                  </div>
                </div>
                {meal.completed && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#10b981]/20 text-[#10b981] rounded-full font-semibold">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Completed
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {meal.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h5 className="font-semibold text-[#0f172a] text-sm">{item.name}</h5>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="text-gray-600">Protein: <strong>{item.protein}g</strong></span>
                      <span className="text-gray-600">Cal: <strong>{item.calories}</strong></span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {!meal.completed && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full py-3 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-xl font-semibold"
                >
                  Mark as Completed
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Supplements */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Daily Supplements</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {supplements.map((supplement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl border-2 ${
                supplement.taken
                  ? 'bg-[#f0fdf4] border-[#10b981]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="text-center mb-4">
                <span className="text-5xl">{supplement.icon}</span>
              </div>
              <h4 className="text-lg font-bold text-[#0f172a] text-center mb-1">{supplement.name}</h4>
              <p className="text-sm text-gray-600 text-center mb-2">{supplement.dosage}</p>
              <p className="text-xs text-gray-500 text-center mb-4">{supplement.time}</p>
              {supplement.taken ? (
                <div className="flex items-center justify-center gap-2 text-[#10b981] font-semibold">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Taken
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm transition-all"
                >
                  Mark Taken
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Grocery List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#0f172a]">Weekly Grocery List</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-lg font-semibold text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download List
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {groceryList.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-4 border border-[#22d3ee]/20"
            >
              <h4 className="font-bold text-[#0f172a] mb-3">{category.category}</h4>
              <ul className="space-y-2">
                {category.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NutritionPage;