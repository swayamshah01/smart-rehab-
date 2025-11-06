import React from 'react';
import { motion } from 'framer-motion';

const ProfileSummary = ({ data, onBack, onFinish }) => {
  const bodyAreas = {
    'neck': 'Neck',
    'shoulder-left': 'Left Shoulder',
    'shoulder-right': 'Right Shoulder',
    'spine': 'Spine',
    'elbow-left': 'Left Elbow',
    'elbow-right': 'Right Elbow',
    'lower-back': 'Lower Back',
    'hip': 'Hip',
    'knee-left': 'Left Knee',
    'knee-right': 'Right Knee',
    'ankle-left': 'Left Ankle',
    'ankle-right': 'Right Ankle',
  };

  const conditions = {
    'post-surgery': 'Post-Surgery Recovery',
    'sports-injury': 'Sports Injury',
    'chronic-pain': 'Chronic Pain',
    'arthritis': 'Arthritis',
    'stroke': 'Stroke Recovery',
    'other': 'Other Condition',
  };

  const activityLevels = {
    'sedentary': 'Sedentary',
    'light': 'Light Activity',
    'moderate': 'Moderate',
    'active': 'Very Active',
  };

  const recoveryStyles = {
    'guided': '🧭 Guided Mode',
    'self-paced': '🕒 Self-Paced Mode',
    'gamified': '🎮 Gamified Mode',
  };

  const goalLabels = {
    'pain-reduction': 'Pain Reduction',
    'mobility-improvement': 'Mobility Improvement',
    'strength-building': 'Strength Building',
    'flexibility': 'Flexibility',
    'balance': 'Balance & Stability',
    'daily-activities': 'Return to Daily Activities',
    'sports': 'Return to Sports',
    'independence': 'Independence',
  };

  const availabilityLabels = {
    '15-30': '15-30 minutes/day',
    '30-60': '30-60 minutes/day',
    '60-90': '60-90 minutes/day',
    '90+': '90+ minutes/day',
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50/30 backdrop-blur-xl rounded-3xl p-8 border border-blue-200 shadow-xl shadow-blue-200/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30"
        >
          <span className="text-4xl">✨</span>
        </motion.div>
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Your Personalized <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Profile</span>
        </h2>
        <p className="text-slate-600 text-lg">
          Review your information before we create your custom rehab plan
        </p>
      </motion.div>

      <div className="space-y-6 mb-8">
        {/* Condition Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h3 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🏥</span> Condition Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-slate-500 text-sm mb-1">Affected Area</p>
              <p className="text-slate-800 font-medium">{bodyAreas[data.affectedArea]}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-1">Condition Type</p>
              <p className="text-slate-800 font-medium">{conditions[data.condition]}</p>
            </div>
          </div>
          {data.medicalReports.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-slate-500 text-sm mb-2">Medical Reports Uploaded</p>
              <p className="text-blue-600 font-medium">{data.medicalReports.length} file(s)</p>
            </div>
          )}
        </motion.div>

        {/* Health Metrics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h3 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span> Health Assessment
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-500 text-sm mb-2">Pain Level</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.painLevel * 10}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-600"
                  />
                </div>
                <span className="text-slate-800 font-bold text-lg">{data.painLevel}/10</span>
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-2">Mobility Level</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.mobilityLevel * 10}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                  />
                </div>
                <span className="text-slate-800 font-bold text-lg">{data.mobilityLevel}/10</span>
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-1">Activity Level</p>
              <p className="text-slate-800 font-medium">{activityLevels[data.activityLevel]}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-1">Daily Availability</p>
              <p className="text-slate-800 font-medium">{availabilityLabels[data.dailyAvailability]}</p>
            </div>
          </div>
        </motion.div>

        {/* Recovery Plan */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h3 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span> Recovery Plan
          </h3>
          <div className="mb-4">
            <p className="text-slate-500 text-sm mb-2">Recovery Style</p>
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full shadow-sm">
              <p className="text-slate-800 font-medium">{recoveryStyles[data.recoveryStyle]}</p>
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-sm mb-3">Recovery Goals</p>
            <div className="flex flex-wrap gap-2">
              {data.goals.map((goal) => (
                <motion.span
                  key={goal}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg text-slate-700 text-sm font-medium shadow-sm"
                >
                  {goalLabels[goal]}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Recommendation Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-slate-800 font-semibold mb-2 flex items-center gap-2">
                AI Recommendation
                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">Beta</span>
              </h4>
              <p className="text-slate-600 text-sm mb-3">
                Based on your profile, we recommend starting with <strong className="text-slate-800">Level {Math.max(1, 5 - Math.floor(data.painLevel / 2))}</strong> exercises focusing on {data.goals.slice(0, 2).map(g => goalLabels[g]).join(' and ').toLowerCase()}. Your personalized plan will include:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {Math.floor(15 + data.dailyAvailability.split('-')[0] / 5)} exercises per week
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Estimated recovery time: {Math.floor(12 - data.mobilityLevel / 2)} weeks
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Daily progress tracking & AI feedback
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-6 text-center"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 border border-emerald-200 rounded-full shadow-sm">
          <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-emerald-600 font-semibold">Profile Complete! Ready to start your journey.</span>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-200">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="px-6 py-3 rounded-full font-semibold bg-white text-slate-800 border-2 border-slate-200 hover:bg-slate-50 hover:border-blue-300 transition-all"
        >
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onFinish}
          className="px-10 py-4 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all flex items-center gap-3 text-lg"
        >
          <span>Generate My Rehab Plan</span>
          <motion.svg
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </motion.svg>
        </motion.button>
      </div>
    </div>
  );
};

export default ProfileSummary;