import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import UserFeedbackInterface from '../components/feedback-adaptive/UserFeedbackInterface';
import AIAdaptiveAnalysis from '../components/feedback-adaptive/AIAdaptiveAnalysis';
import PlanAdjustmentSection from '../components/feedback-adaptive/PlanAdjustmentSection';
import AdaptationHistory from '../components/feedback-adaptive/AdaptationHistory';

const FeedbackAdaptivePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentDate = new Date('2025-11-06T11:04:11Z');
  const userLogin = 'swayamshah01';
  
  // Get userData from location state or localStorage
  const [userData] = useState(() => {
    const savedUserData = localStorage.getItem('rehabUserData');
    return location.state || (savedUserData ? JSON.parse(savedUserData) : {});
  });

  const [userProgress] = useState(() => {
    const savedProgress = localStorage.getItem('rehabProgress');
    return savedProgress ? JSON.parse(savedProgress) : {
      currentStreak: 7,
      totalXP: 350,
      level: 3,
      exercisesCompleted: 25,
      painImprovement: 56,
      mobilityChange: 60,
      strengthGain: 45,
      consistencyRate: 92,
      nutritionScore: 85,
      mentalWellnessScore: 88,
    };
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [feedbackData, setFeedbackData] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [adjustedPlan, setAdjustedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { id: 1, label: 'User Feedback', icon: '🗣️', color: 'from-[#22d3ee] to-[#06b6d4]' },
    { id: 2, label: 'AI Analysis', icon: '🧠', color: 'from-[#a855f7] to-[#9333ea]' },
    { id: 3, label: 'Plan Adjustment', icon: '🧭', color: 'from-[#10b981] to-[#059669]' },
  ];

  const handleFeedbackSubmit = (data) => {
    setFeedbackData(data);
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(2);
      
      // Generate AI analysis based on feedback
      const analysis = generateAIAnalysis(data, userProgress);
      setAiAnalysis(analysis);
    }, 2000);
  };

  const handleAnalysisComplete = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(3);
      
      // Generate adjusted plan
      const plan = generateAdjustedPlan(feedbackData, aiAnalysis, userProgress);
      setAdjustedPlan(plan);
    }, 1500);
  };

  const handlePlanConfirm = () => {
    // Save adjusted plan to localStorage
    const updatedProgress = {
      ...userProgress,
      planUpdated: true,
      lastAdjustment: currentDate.toISOString(),
      adjustedPlan: adjustedPlan,
    };
    
    localStorage.setItem('rehabProgress', JSON.stringify(updatedProgress));
    
    // Navigate back to dashboard
    navigate('/dashboard', { 
      state: { 
        ...userData, 
        planUpdated: true,
        message: 'Your recovery plan has been successfully updated!' 
      } 
    });
  };

  const generateAIAnalysis = (feedback, progress) => {
    return {
      riskLevel: feedback.painLevel > 7 ? 'high' : feedback.painLevel > 4 ? 'medium' : 'low',
      recommendations: [
        {
          category: 'Exercise Intensity',
          current: '10 reps × 3 sets',
          suggested: feedback.difficulty === 'too-hard' ? '8 reps × 3 sets' : '12 reps × 3 sets',
          reason: feedback.difficulty === 'too-hard' 
            ? 'Decrease repetitions by 20% due to reported high difficulty and fatigue'
            : 'Increase repetitions by 20% as current level is too easy',
          priority: 'high',
        },
        {
          category: 'Mental Wellness',
          current: '2 sessions/week',
          suggested: feedback.mood <= 5 ? '4 sessions/week' : '3 sessions/week',
          reason: feedback.mood <= 5
            ? 'Add 2 more mindfulness sessions to stabilize mood and reduce stress'
            : 'Maintain current wellness schedule with one additional session',
          priority: feedback.mood <= 5 ? 'high' : 'medium',
        },
        {
          category: 'Nutrition',
          current: '68g protein/day',
          suggested: '78g protein/day',
          reason: 'Increase protein intake by 15% for better muscle regeneration based on strength training progress',
          priority: 'medium',
        },
        {
          category: 'Recovery Days',
          current: '1 day/week',
          suggested: feedback.fatigue === 'high' ? '2 days/week' : '1 day/week',
          reason: feedback.fatigue === 'high'
            ? 'Add one additional rest day to prevent overtraining'
            : 'Current recovery schedule is optimal',
          priority: feedback.fatigue === 'high' ? 'high' : 'low',
        },
      ],
      performanceTrends: {
        painTrend: progress.painImprovement > 50 ? 'improving' : 'stable',
        mobilityTrend: progress.mobilityChange > 50 ? 'excellent' : 'good',
        adherenceTrend: progress.consistencyRate > 85 ? 'excellent' : 'good',
      },
      alerts: feedback.painLevel > 7 ? [
        'Pain level reported as high (8/10). Consider medical consultation if pain persists.',
        'Recommend reducing exercise intensity by 30% for next 3 days.',
      ] : [],
    };
  };

  const generateAdjustedPlan = (feedback, analysis, progress) => {
    return {
      weekNumber: 7,
      startDate: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      exercises: {
        before: [
          { name: 'Knee Flexion', reps: 10, sets: 3, duration: '15 min' },
          { name: 'Straight Leg Raise', reps: 10, sets: 3, duration: '12 min' },
          { name: 'Quad Sets', reps: 15, sets: 2, duration: '10 min' },
        ],
        after: [
          { 
            name: 'Knee Flexion', 
            reps: feedback.difficulty === 'too-hard' ? 8 : 12, 
            sets: 3, 
            duration: '15 min',
            changed: true,
          },
          { 
            name: 'Straight Leg Raise', 
            reps: 10, 
            sets: 3, 
            duration: '12 min',
            changed: false,
          },
          { 
            name: 'Quad Sets', 
            reps: 15, 
            sets: 2, 
            duration: '10 min',
            changed: false,
          },
          {
            name: 'Side-Lying Leg Raise',
            reps: 8,
            sets: 2,
            duration: '10 min',
            new: true,
          },
        ],
      },
      nutrition: {
        before: { protein: 68, calories: 2000, water: 10 },
        after: { protein: 78, calories: 2100, water: 10 },
      },
      wellness: {
        before: { meditation: 2, journaling: 3, breathing: 5 },
        after: { 
          meditation: feedback.mood <= 5 ? 4 : 3, 
          journaling: 3, 
          breathing: 5 
        },
      },
      restDays: {
        before: 1,
        after: feedback.fatigue === 'high' ? 2 : 1,
      },
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#dbeafe] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-[#22d3ee]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#a855f7]/20 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-[#0f172a] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Back to Dashboard</span>
              </motion.button>

              <div className="h-6 w-px bg-gray-300"></div>

              <div>
                <h1 className="text-2xl font-bold text-[#0f172a]">
                  Adaptive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">Recovery Optimizer</span>
                </h1>
                <p className="text-sm text-gray-600">
                  AI-Powered Plan Adjustment • {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-full text-sm font-semibold">
                Week 6 Complete
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div
                    className={`w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all ${
                      currentStep === step.id
                        ? `bg-gradient-to-br ${step.color} shadow-2xl scale-110`
                        : currentStep > step.id
                        ? 'bg-[#10b981] shadow-lg'
                        : 'bg-gray-200'
                    }`}
                  >
                    <span className="text-4xl mb-1">{step.icon}</span>
                    <span className={`text-xs font-bold ${currentStep >= step.id ? 'text-white' : 'text-gray-500'}`}>
                      Step {step.id}
                    </span>
                  </div>
                  {currentStep === step.id && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-2 border-4 border-dashed border-[#22d3ee] rounded-full"
                    />
                  )}
                </motion.div>
                
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden max-w-[150px]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-[#22d3ee] to-[#10b981]"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            {steps.map((step) => (
              <div key={step.id} className="text-center min-w-[120px]">
                <p className={`text-sm font-semibold ${currentStep === step.id ? 'text-[#0f172a]' : 'text-gray-500'}`}>
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <UserFeedbackInterface
              key="feedback"
              onSubmit={handleFeedbackSubmit}
              userData={userData}
              userProgress={userProgress}
              currentDate={currentDate}
              userLogin={userLogin}
            />
          )}

          {currentStep === 2 && (
            <AIAdaptiveAnalysis
              key="analysis"
              feedbackData={feedbackData}
              aiAnalysis={aiAnalysis}
              userProgress={userProgress}
              onComplete={handleAnalysisComplete}
              isProcessing={isProcessing}
              currentDate={currentDate}
            />
          )}

          {currentStep === 3 && (
            <PlanAdjustmentSection
              key="adjustment"
              adjustedPlan={adjustedPlan}
              feedbackData={feedbackData}
              aiAnalysis={aiAnalysis}
              onConfirm={handlePlanConfirm}
              onBack={() => setCurrentStep(1)}
              currentDate={currentDate}
              userLogin={userLogin}
            />
          )}
        </AnimatePresence>

        {/* Adaptation History */}
        <AdaptationHistory
          userProgress={userProgress}
          currentDate={currentDate}
        />
      </div>

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-3xl p-8 shadow-2xl max-w-md text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 mx-auto mb-6"
              >
                <div className="w-full h-full border-4 border-[#22d3ee] border-t-transparent rounded-full"></div>
              </motion.div>
              <h3 className="text-2xl font-bold text-[#0f172a] mb-2">
                AI is Analyzing...
              </h3>
              <p className="text-gray-600">
                {currentStep === 1 ? 'Processing your feedback and performance data' : 'Generating optimized recovery plan'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackAdaptivePage;