import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SelectCondition from '../components/OnBoarding/SelectCondition'
import UploadReports from '../components/OnBoarding/UploadReports';
import HealthQuestionnaire from '../components/OnBoarding/HealthQuestionnaire';
import RecoveryStyle from '../components/OnBoarding/RecoveryStyle';
import ProfileSummary from '../components/OnBoarding/ProfileSummary';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    affectedArea: null,
    condition: null,
    medicalReports: [],
    painLevel: 5,
    mobilityLevel: 5,
    activityLevel: 'moderate',
    dailyAvailability: '30-60',
    recoveryStyle: null,
    goals: [],
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

const handleFinish = () => {
  console.log('Final Form Data:', formData);
  // Navigate to medical report page with data
  navigate('/medical-report', { state: formData });
};

  const steps = [
    { id: 1, title: 'Select Condition' },
    { id: 2, title: 'Upload Reports' },
    { id: 3, title: 'Health Assessment' },
    { id: 4, title: 'Recovery Style' },
    { id: 5, title: 'Summary' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#581c87] to-[#0f172a] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#22d3ee]/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-[#a855f7]/20 bg-[#0f172a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-lg flex items-center justify-center shadow-lg shadow-[#a855f7]/50">
              <span className="text-white font-bold text-xl">R+</span>
            </div>
            <span className="text-white font-bold text-xl">RehabAI</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Exit
          </motion.button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="relative z-10 bg-[#1e293b]/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold text-lg">
              Step {currentStep} of {totalSteps}
            </h2>
            <span className="text-[#22d3ee] font-semibold">{Math.round(progress)}%</span>
          </div>

          {/* Progress Bar */}
          <div className="relative h-3 bg-[#334155] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#ec4899] rounded-full relative"
            >
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step.id < currentStep
                      ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white'
                      : step.id === currentStep
                      ? 'bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-lg shadow-[#a855f7]/50'
                      : 'bg-[#334155] text-gray-400'
                  }`}
                >
                  {step.id < currentStep ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step.id
                  )}
                </motion.div>
                <span className="text-xs text-gray-400 text-center hidden md:block max-w-[80px]">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 min-h-[calc(100vh-300px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <SelectCondition data={formData} onNext={handleNext} onBack={handleBack} isFirstStep={true} />
            )}
            {currentStep === 2 && (
              <UploadReports data={formData} onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === 3 && (
              <HealthQuestionnaire data={formData} onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === 4 && (
              <RecoveryStyle data={formData} onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === 5 && (
              <ProfileSummary data={formData} onBack={handleBack} onFinish={handleFinish} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingPage;