"use client";
import { useState } from 'react';
import { Bot, Send, X, Smile, Frown, Meh } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sentiment, setSentiment] = useState("neutral"); // neutral, happy, frustrated
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Identity confirmed. I am AlumnoBot. How can I assist your learning journey?' }
  ]);

  const analyzeSentiment = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("hard") || lowerText.includes("confused") || lowerText.includes("error")) return "frustrated";
    if (lowerText.includes("great") || lowerText.includes("thanks") || lowerText.includes("wow")) return "happy";
    return "neutral";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userSentiment = analyzeSentiment(input);
    setSentiment(userSentiment);
    
    setMessages([...messages, { role: 'user', text: input }]);
    setInput("");

    // Simulate AI response based on sentiment
    setTimeout(() => {
      let botResponse = "Processing your request...";
      if (userSentiment === "frustrated") botResponse = "I sense technical friction. Let me simplify this concept for you.";
      if (userSentiment === "happy") botResponse = "Optimal engagement detected! Glad you're enjoying the course.";
      
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-[#0A192F] border border-cyan-500/30 w-80 h-[450px] rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-cyan-950/50 p-4 border-b border-cyan-500/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={20} className="text-cyan-400" />
                <span className="text-xs font-bold tracking-widest text-cyan-400">ALUMNO_BOT v1.0</span>
              </div>
              <div className="flex items-center gap-2">
                {sentiment === "happy" && <Smile size={16} className="text-green-400" />}
                {sentiment === "frustrated" && <Frown size={16} className="text-red-400" />}
                <button onClick={() => setIsOpen(false)}><X size={18} /></button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm font-mono">
              {messages.map((m, i) => (
                <div key={i} className={`${m.role === 'bot' ? 'text-cyan-200' : 'text-slate-400 text-right'}`}>
                  <span className="opacity-50 text-[10px] block mb-1">[{m.role.toUpperCase()}]</span>
                  <p className="bg-cyan-900/10 p-2 rounded-lg inline-block max-w-full">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-cyan-500/20 bg-black/20 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type command..."
                className="bg-transparent border-none outline-none text-xs flex-1 text-cyan-400 placeholder:text-cyan-900"
              />
              <button onClick={handleSend} className="text-cyan-400"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-cyan-500 text-black p-4 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-110 transition-transform"
      >
        <Bot size={28} />
      </button>
    </div>
  );
}