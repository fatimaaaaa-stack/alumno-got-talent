import { Bot, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-cyber-black overflow-hidden">
      {/* Background "Video" Placeholder / Gradient */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-robot-blue/20 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
            ALUMNO <span className="text-robot-blue">GOT TALENT</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
            The future of learning, guided by sentient AI.
          </p>
          
          <div className="flex gap-4 justify-center">
            <button className="bg-robot-blue hover:bg-blue-400 text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all">
              <Play size={20} /> View Courses
            </button>
            <button className="border border-robot-blue text-robot-blue px-8 py-3 rounded-full font-bold hover:bg-robot-blue/10 transition-all">
              About Us
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Robot Animation Placeholder */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute bottom-10 right-10 text-robot-blue opacity-50"
      >
        <Bot size={100} />
      </motion.div>
    </section>
  );
}