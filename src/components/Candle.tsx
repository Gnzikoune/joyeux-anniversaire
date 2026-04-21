import { motion } from 'motion/react';
import { useState } from 'react';
import confetti from 'canvas-confetti';

export const Candle = ({ onBlowOut }: { onBlowOut?: () => void }) => {
  const [isLit, setIsLit] = useState(true);

  const handleBlowout = () => {
    if (isLit) {
      setIsLit(false);
      
      // Small localized confetti from the candle
      const rect = document.getElementById('candle-flame')?.getBoundingClientRect();
      if (rect) {
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { x, y },
          colors: ['#ffeb3b', '#ff9800', '#f44336']
        });
      }
      
      if (onBlowOut) onBlowOut();
    }
  };

  return (
    <div className="relative group scale-[0.65] sm:scale-90 md:scale-100 origin-bottom">
      <div className="flex flex-col items-center cursor-pointer transform group-hover:scale-110 transition-transform" onClick={handleBlowout}>
        {/* Flame */}
      <motion.div 
        id="candle-flame"
        className="w-6 h-10 bg-gradient-to-t from-yellow-300 via-yellow-100 to-transparent rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[0_0_20px_#fbbf24] origin-bottom z-10 -mb-2"
        animate={isLit ? { 
          scale: [1, 1.05, 0.95, 1],
          rotate: [-2, 2, -1, 1, 0],
          opacity: 1
        } : { 
          scale: 0,
          opacity: 0,
          y: -20
        }}
        transition={{ 
          duration: isLit ? 1.5 : 0.5, 
          repeat: isLit ? Infinity : 0, 
          ease: "easeInOut" 
        }}
      />
      {/* Wick */}
      <div className="w-1.5 h-4 bg-gradient-to-b from-gray-800 to-gray-600 rounded-t-sm z-0 relative">
        <div className="absolute top-0 w-full h-1 bg-orange-500 rounded-t-sm"></div>
      </div>
      
      {/* Body */}
      <div className="w-10 h-28 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-sm shadow-xl border-b-4 border-teal-700 relative overflow-hidden">
        {/* Stripes */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(6)].map((_, i) => (
             <div key={i} className="h-3 w-full bg-white transform -skew-y-12 mt-4 block" />
          ))}
        </div>
        {/* Highlight inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent w-full h-6"></div>
      </div>
      
      {/* Base shadow */}
      <div className="w-12 h-2 bg-black/20 rounded-[100%] shadow-[0_0_10px_rgba(0,0,0,0.3)] mt-[-4px] z-[-1]"></div>

      {/* Smoke */}
      {!isLit && (
        <motion.div 
          className="w-4 h-4 bg-gray-300 rounded-full absolute top-2 filter blur-md mix-blend-screen"
          initial={{ opacity: 0, y: 0, scale: 1 }}
          animate={{ opacity: [0, 0.6, 0], y: -80, scale: 4, x: [0, -15, 20, -10] }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
      )}
      </div>
    </div>
  );
};
