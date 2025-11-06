import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = ({ show, setShow, userData, userProgress }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm your AI Recovery Assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickActions = [
    { id: 1, text: 'Show my progress this week', icon: '📊' },
    { id: 2, text: 'What exercises should I do today?', icon: '🏋️' },
    { id: 3, text: 'Tips to reduce pain', icon: '💊' },
    { id: 4, text: 'Nutrition recommendations', icon: '🍎' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('progress') || lowerMessage.includes('week')) {
      return `Great question! This week you've completed ${userProgress.exercisesCompleted || 25} exercises with a ${userProgress.currentStreak || 7}-day streak! Your pain level has decreased from 6/10 to 3.5/10. Keep up the excellent work! 💪`;
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout')) {
      return `Based on your ${userData.affectedArea || 'knee'} injury and current recovery stage, I recommend:\n\n1. Knee Flexion Stretch (3 sets × 10 reps)\n2. Straight Leg Raises (3 sets × 12 reps)\n3. Ankle Pumps (2 sets × 15 reps)\n\nRemember to warm up first and stop if you feel sharp pain! 🏋️`;
    } else if (lowerMessage.includes('pain')) {
      return `Here are some tips to manage pain:\n\n1. Apply ice for 15-20 minutes after exercises\n2. Practice deep breathing exercises\n3. Maintain proper posture\n4. Stay hydrated (aim for 8-10 glasses)\n5. Get adequate sleep (7-8 hours)\n\nIf pain increases or persists, please consult your doctor. 💊`;
    } else if (lowerMessage.includes('nutrition') || lowerMessage.includes('food') || lowerMessage.includes('diet')) {
      return `For optimal recovery, focus on:\n\n🥩 Protein: 60-80g/day (chicken, paneer, dal)\n🥛 Calcium: 1200mg/day (dairy, leafy greens)\n☀️ Vitamin D: 800 IU/day (sunlight, supplements)\n🐟 Omega-3: 1-2g/day (fish, walnuts)\n\nAvoid processed foods and stay hydrated! 🍎`;
    } else if (lowerMessage.includes('mood') || lowerMessage.includes('stress') || lowerMessage.includes('mental')) {
      return `Mental wellness is crucial for recovery! Try:\n\n1. 10-minute meditation daily\n2. Deep breathing exercises\n3. Gratitude journaling\n4. Stay connected with loved ones\n5. Celebrate small wins\n\nYour mind-body connection is powerful! 🧘`;
    } else if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return `I can help you with:\n\n📊 Track and analyze your progress\n🏋️ Recommend exercises\n💊 Provide pain management tips\n🍎 Suggest nutrition plans\n🧘 Mental wellness guidance\n\nJust ask me anything!`;
    } else {
      return `I understand you're asking about "${userMessage}". While I can provide general guidance, for specific medical concerns, please consult your healthcare provider. Is there anything else I can help you with regarding your exercises, nutrition, or progress tracking?`;
    }
  };

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: getBotResponse(inputMessage),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    setInputMessage(action.text);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-40"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#22d3ee] to-[#a855f7] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-white">AI Assistant</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/90">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShow(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <p className="text-xs text-gray-600 mb-2">Quick Actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <motion.button
                  key={action.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickAction(action)}
                  className="px-3 py-2 bg-white hover:bg-gray-100 rounded-full text-xs font-medium text-gray-700 border border-gray-200 transition-all flex items-center gap-1"
                >
                  <span>{action.icon}</span>
                  <span>{action.text}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 rounded-2xl p-3">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#22d3ee] text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                disabled={inputMessage.trim() === ''}
                className={`p-3 rounded-full transition-all ${
                  inputMessage.trim() === ''
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] hover:shadow-lg'
                }`}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIAssistant;