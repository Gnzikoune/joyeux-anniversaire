import { motion } from 'motion/react';
import { Theme } from '../utils/encode';

const getThemeElements = (theme: Theme) => {
  switch (theme) {
    case 'kids':
      return ['🦄', '🦖', '🧸', '🎈', '⭐', '🚀', '🎨', '🎪'];
    case 'festive':
      return ['🥳', '🎁', '🎊', '🎂', '🎈', '✨', '🎉', '🎸'];
    case 'elegant':
      return ['✨', '🥂', '💎', '🌟', '🎭', '🍾', '🎻', '🌙'];
    case 'minimalist':
      return ['🤍', '🕊️', '☁️', '🎈', '🫧', '✨', '🪴', '🎐'];
    default:
      return ['🎈', '🎁', '✨'];
  }
};

const Floating3DChar = ({ char, index }: { char: string, index: number }) => {
  const randomXInit = (Math.random() * 80) - 40; // -40vw to 40vw
  const randomYInit = (Math.random() * 80) - 40; // -40vh to 40vh
  
  const randomXDest = randomXInit + (Math.random() * 40 - 20);
  const randomYDest = randomYInit - (Math.random() * 80 + 20); // Always float upwards
  
  const delay = Math.random() * 5;
  const duration = 15 + Math.random() * 10; // 15 to 25s
  
  // 3D Text shadow for depth (simulates a solid 3D object)
  const textShadow3D = `
    0px 1px 0px #cccccc,
    0px 2px 0px #c2c2c2,
    0px 3px 0px #b8b8b8,
    0px 4px 0px #adadad,
    0px 5px 0px #a3a3a3,
    0px 6px 1px rgba(0,0,0,0.1),
    0px 0px 5px rgba(0,0,0,0.1),
    0px 1px 3px rgba(0,0,0,0.3),
    0px 3px 5px rgba(0,0,0,0.2),
    0px 5px 10px rgba(0,0,0,0.25),
    0px 10px 10px rgba(0,0,0,0.2),
    0px 20px 20px rgba(0,0,0,0.15)
  `;

  return (
    <motion.div
      initial={{ 
        x: `${randomXInit}vw`, 
        y: `${randomYInit + 100}vh`, 
        scale: 0, 
        opacity: 0, 
        rotateX: 0, 
        rotateY: 0,
        rotateZ: Math.random() * 90 - 45
      }}
      animate={{ 
        x: [`${randomXInit}vw`, `${randomXDest}vw`], 
        y: [`${randomYInit + 50}vh`, `${randomYDest}vh`],
        scale: [0, 1.5, 1.5, 0],
        opacity: [0, 1, 1, 0],
        rotateX: [0, 360],
        rotateY: [0, 360],
        rotateZ: [Math.random() * 90 - 45, Math.random() * 180 - 90]
      }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        delay: delay,
        ease: "linear",
        times: [0, 0.2, 0.8, 1] // Fade in quickly, stay, fade out at end
      }}
      className="absolute text-5xl sm:text-7xl pointer-events-none will-change-transform"
      style={{
        transformStyle: 'preserve-3d',
        textShadow: textShadow3D,
        left: '50%',
        top: '10%'
      }}
    >
      {char}
    </motion.div>
  );
}

const AnimatedSVGShape = ({ delay, color, type }: { delay: number, color: string, type: 'star' | 'circle' | 'blob' }) => {
  const paths = {
    star: "M50 0L61.2 34.5H97.5L68.2 55.8L79.4 90.3L50 69L20.6 90.3L31.8 55.8L2.5 34.5H38.8L50 0Z",
    circle: "M50,10 A40,40 0 1,1 49.9,10",
    blob: "M67.7,-64.1C83.4,-48.9,89.5,-24.4,85.5,-4C81.5,16.5,67.3,33,51.6,45.3C35.9,57.6,18,65.8,0.2,65.6C-17.6,65.4,-35.1,56.8,-49.2,44.5C-63.3,32.2,-74,16.1,-75.7,-1.7C-77.5,-19.5,-70.2,-39.1,-56.1,-54.3C-42,-69.5,-21,-80.4,1.7,-82.1C24.4,-83.8,48.8,-76.3,67.7,-64.1Z"
  };

  const startX = Math.random() * 100;
  const startY = Math.random() * 100;

  return (
    <motion.svg 
      width="150" height="150" viewBox="0 0 100 100" 
      className="absolute pointer-events-none opacity-[0.03] sm:opacity-[0.05] will-change-transform mix-blend-overlay"
      style={{ left: `${startX}vw`, top: `${startY}vh` }}
      initial={{ scale: 0, rotate: 0 }}
      animate={{ 
        scale: [1, 2.5, 1], 
        rotate: [0, 180, 360],
        x: [0, Math.random() * 200 - 100, 0],
        y: [0, Math.random() * 200 - 100, 0]
      }}
      transition={{ duration: 25, repeat: Infinity, delay: delay, ease: "easeInOut" }}
    >
      <path 
        d={paths[type]} 
        fill={color} 
        transform={type === 'blob' ? 'translate(50,50) scale(0.5)' : ''}
      />
    </motion.svg>
  );
}

export const ImmersiveVisuals = ({ theme }: { theme: Theme }) => {
  const chars = getThemeElements(theme);
  
  const themeSpecs = {
    'kids': { color: '#8b5cf6', shapes: ['blob', 'star', 'circle'] },
    'festive': { color: '#f59e0b', shapes: ['star', 'circle', 'blob'] },
    'elegant': { color: '#fbbf24', shapes: ['star', 'star', 'star'] },
    'minimalist': { color: '#9ca3af', shapes: ['circle', 'blob', 'circle'] }
  }[theme];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 perspective-[1000px]">
      {/* 3D Emojis mimicking physical balloons/characters */}
      {chars.map((char, i) => (
        <Floating3DChar key={`char-${i}`} char={char} index={i} />
      ))}
      
      {/* Majestic animated SVGs in background */}
      {Array.from({ length: 6 }).map((_, i) => (
        <AnimatedSVGShape 
          key={`svg-${i}`} 
          delay={i * 3} 
          color={themeSpecs.color} 
          type={themeSpecs.shapes[i % 3] as any} 
        />
      ))}
    </div>
  );
};
