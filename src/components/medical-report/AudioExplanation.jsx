import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const AudioExplanation = ({ userData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isAudioSupported, setIsAudioSupported] = useState(true);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const languages = [
    { id: 'english', label: 'English', flag: '🇺🇸' },
    { id: 'hindi', label: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { id: 'spanish', label: 'Español', flag: '🇪🇸' },
    { id: 'french', label: 'Français', flag: '🇫🇷' },
    { id: 'mandarin', label: '中文 (Mandarin)', flag: '🇨🇳' },
  ];

  const speeds = [
    { value: 0.75, label: '0.75x' },
    { value: 1, label: '1x' },
    { value: 1.25, label: '1.25x' },
    { value: 1.5, label: '1.5x' },
  ];

  const chapters = [
    { time: 0, title: 'Introduction to Your Condition', duration: 30 },
    { time: 30, title: 'Understanding the Injury', duration: 45 },
    { time: 75, title: 'Recovery Timeline Explained', duration: 40 },
    { time: 115, title: 'Exercise Recommendations', duration: 40 },
    { time: 155, title: 'Next Steps and Support', duration: 25 },
  ];

  // Text-to-Speech Implementation
  const speakText = (text, lang = 'en-US') => {
    if (!('speechSynthesis' in window)) {
      setIsAudioSupported(false);
      alert('Sorry, your browser does not support text-to-speech. Please use a modern browser like Chrome, Firefox, or Edge.');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Language mapping
    const langMap = {
      'english': 'en-US',
      'hindi': 'hi-IN',
      'spanish': 'es-ES',
      'french': 'fr-FR',
      'mandarin': 'zh-CN',
    };

    utterance.lang = langMap[lang] || 'en-US';
    utterance.rate = playbackSpeed;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Medical report explanation text for each chapter
  const getChapterText = (chapterIndex) => {
    const texts = [
      // Chapter 1: Introduction
      `Hello and welcome to your personalized medical report explanation. 
      I'm here to help you understand your condition and recovery journey. 
      You have been diagnosed with a ${userData.affectedArea?.replace('-', ' ')} injury, 
      specifically ${userData.condition?.replace('-', ' ')}. 
      Don't worry, we're going to walk through everything step by step.`,

      // Chapter 2: Understanding the Injury
      `Let's talk about what's happening in your ${userData.affectedArea?.replace('-', ' ')}. 
      Based on your medical reports and AI analysis, the affected areas include the muscles, 
      ligaments, and surrounding tissues. The inflammation you're experiencing is a natural 
      part of the healing process. Your body is working hard to repair the damaged tissues. 
      The pain you feel is your body's way of protecting the injured area.`,

      // Chapter 3: Recovery Timeline
      `Your recovery will happen in three main phases. The early phase, which lasts 2 to 4 weeks, 
      focuses on pain reduction and protecting healing tissues. During this time, you'll do gentle 
      exercises and use ice therapy. The mid phase, from 4 to 8 weeks, is about restoring strength 
      and mobility. You'll gradually increase exercise intensity. The final phase, from 8 to 12 weeks, 
      focuses on performance reinforcement and preventing future injuries. Each person's recovery is 
      unique, so we'll adjust the timeline based on your progress.`,

      // Chapter 4: Exercise Recommendations
      `Your exercise program is carefully designed for your specific injury. We'll start with 
      gentle range-of-motion exercises, then progress to strengthening exercises, and finally 
      to functional movements. Remember, some discomfort is normal, but sharp pain means you 
      should stop and rest. Always warm up before exercises and cool down afterwards. 
      Consistency is more important than intensity at this stage.`,

      // Chapter 5: Next Steps
      `You're now ready to start your rehabilitation journey. Remember to complete your daily 
      pain and mood check-ins. This helps us track your progress and adjust your program. 
      Stay hydrated, eat nutritious foods, and get adequate sleep. These are just as important 
      as your exercises. If you experience unusual pain, swelling, or any concerns, don't hesitate 
      to contact your healthcare provider. You've got this, and we're here to support you every 
      step of the way. Let's begin your recovery journey together.`,
    ];

    return texts[chapterIndex] || texts[0];
  };

  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const currentChapterIndex = getCurrentChapter();
      const text = getChapterText(currentChapterIndex);
      speakText(text, selectedLanguage);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = Math.floor(percentage * 180); // 180 seconds total demo
    setCurrentTime(newTime);
    
    // Find and play the chapter at this time
    const chapterIndex = chapters.findIndex((chapter, index) => {
      const nextChapter = chapters[index + 1];
      return newTime >= chapter.time && (!nextChapter || newTime < nextChapter.time);
    });
    
    if (chapterIndex !== -1) {
      window.speechSynthesis.cancel();
      const text = getChapterText(chapterIndex);
      speakText(text, selectedLanguage);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentChapter = () => {
    return chapters.findIndex((chapter, index) => {
      const nextChapter = chapters[index + 1];
      return currentTime >= chapter.time && (!nextChapter || currentTime < nextChapter.time);
    });
  };

  const jumpToChapter = (chapterTime, chapterIndex) => {
    setCurrentTime(chapterTime);
    window.speechSynthesis.cancel();
    const text = getChapterText(chapterIndex);
    speakText(text, selectedLanguage);
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (isPlaying) {
      // Restart with new speed
      window.speechSynthesis.cancel();
      const currentChapterIndex = getCurrentChapter();
      const text = getChapterText(currentChapterIndex);
      speakText(text, selectedLanguage);
    }
  };

  const handleLanguageChange = (langId) => {
    setSelectedLanguage(langId);
    if (isPlaying) {
      // Restart with new language
      window.speechSynthesis.cancel();
      const currentChapterIndex = getCurrentChapter();
      const text = getChapterText(currentChapterIndex);
      speakText(text, langId);
    }
  };

  // Update current time when playing
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 180) {
            setIsPlaying(false);
            return 180;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0f172a] mb-2">
          Audio Explanation Guide
        </h2>
        <p className="text-gray-600">
          Listen to a detailed explanation of your medical report and recovery plan
        </p>
      </div>

      {/* Browser Support Warning */}
      {!isAudioSupported && (
        <div className="mb-6 bg-gradient-to-r from-[#fef2f2] to-[#fee2e2] border-2 border-[#ef4444] rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-[#ef4444] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-[#ef4444] mb-1">Audio Not Supported</h4>
              <p className="text-sm text-gray-700">
                Your browser doesn't support text-to-speech. Please use Chrome, Firefox, Edge, or Safari for the best experience.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Language Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6"
      >
        <h3 className="text-lg font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          Select Language
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {languages.map((lang) => (
            <motion.button
              key={lang.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLanguageChange(lang.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedLanguage === lang.id
                  ? 'bg-gradient-to-r from-[#22d3ee]/20 to-[#a855f7]/20 border-[#22d3ee] shadow-md'
                  : 'bg-gray-50 border-gray-200 hover:border-[#22d3ee]/50'
              }`}
            >
              <div className="text-3xl mb-2">{lang.flag}</div>
              <div className="text-sm font-medium text-gray-700">{lang.label}</div>
            </motion.button>
          ))}
        </div>
        <div className="mt-4 p-3 bg-[#f0f9ff] rounded-lg border border-[#22d3ee]/30">
          <p className="text-xs text-gray-700 flex items-start gap-2">
            <span className="text-lg">🔊</span>
            <span>Using browser's built-in text-to-speech. Audio quality may vary by language and device.</span>
          </p>
        </div>
      </motion.div>

      {/* Audio Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl p-8 shadow-xl border border-[#22d3ee]/30 mb-6"
      >
        {/* Waveform Visualization */}
        <div className="mb-6">
          <div className="flex items-end justify-center gap-1 h-24">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: isPlaying
                    ? `${Math.random() * 80 + 20}%`
                    : '30%',
                }}
                transition={{
                  duration: 0.3,
                  repeat: isPlaying ? Infinity : 0,
                  delay: i * 0.02,
                }}
                className={`flex-1 rounded-full ${
                  i < (currentTime / 180) * 50
                    ? 'bg-gradient-to-t from-[#22d3ee] to-[#a855f7]'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div
            onClick={handleSeek}
            className="relative h-2 bg-gray-700 rounded-full cursor-pointer group"
          >
            <motion.div
              className="absolute h-full bg-gradient-to-r from-[#22d3ee] to-[#a855f7] rounded-full"
              style={{ width: `${(currentTime / 180) * 100}%` }}
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${(currentTime / 180) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(180)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
            className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            disabled={!isAudioSupported}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all ${
              isAudioSupported
                ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] hover:shadow-lg hover:shadow-[#22d3ee]/50'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            {isPlaying ? (
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentTime(Math.min(180, currentTime + 10))}
            className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
            </svg>
          </motion.button>
        </div>

        {/* Playback Speed */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-gray-400">Speed:</span>
          {speeds.map((speed) => (
            <button
              key={speed.value}
              onClick={() => handleSpeedChange(speed.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                playbackSpeed === speed.value
                  ? 'bg-[#22d3ee] text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {speed.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Chapter List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
          <span className="text-2xl">📑</span>
          Audio Chapters
        </h3>
        <div className="space-y-3">
          {chapters.map((chapter, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => jumpToChapter(chapter.time, index)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                getCurrentChapter() === index
                  ? 'bg-gradient-to-r from-[#22d3ee]/20 to-[#a855f7]/20 border-[#22d3ee] shadow-md'
                  : 'bg-gray-50 border-gray-200 hover:border-[#22d3ee]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    getCurrentChapter() === index
                      ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0f172a]">{chapter.title}</h4>
                    <p className="text-sm text-gray-500">{formatTime(chapter.time)} - {formatTime(chapter.time + chapter.duration)}</p>
                  </div>
                </div>
                {getCurrentChapter() === index && isPlaying && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="flex gap-1"
                  >
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1 h-4 bg-[#22d3ee] rounded-full"
                        style={{
                          animation: `wave 1s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Accessibility Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 bg-gradient-to-r from-[#10b981]/10 to-[#22d3ee]/10 border border-[#10b981]/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-[#0f172a] mb-3 flex items-center gap-2">
          <span className="text-2xl">♿</span>
          Accessibility Features
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#22d3ee]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700">Multi-language support</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#22d3ee]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700">Adjustable playback speed</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#22d3ee]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700">Chapter navigation</span>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.5);
          }
        }
      `}</style>
    </div>
  );
};

export default AudioExplanation;