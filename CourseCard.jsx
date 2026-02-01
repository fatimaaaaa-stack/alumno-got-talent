import { Bot, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CourseCard({ title, price, description }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-cyber-navy/50 border border-robot-blue/30 p-6 rounded-2xl backdrop-blur-md relative group"
    >
      {/* The "Floating Bot" for this specific course */}
      <div className="absolute -top-8 -right-4 text-robot-blue opacity-0 group-hover:opacity-100 transition-opacity">
        <Bot size={40} className="animate-bounce" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-robot-blue font-mono font-bold text-lg">{price}</span>
        <button className="flex items-center gap-1 text-xs bg-robot-blue/10 text-robot-blue border border-robot-blue/50 px-3 py-1 rounded-lg hover:bg-robot-blue hover:text-black transition-all">
          <Zap size={14} /> View Details
        </button>
      </div>
    </motion.div>
  );
}