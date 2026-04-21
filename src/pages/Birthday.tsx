import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import Lottie from 'lottie-react';
import { decodeBirthdayData } from '../utils/encode';
import { ThemeWrapper } from '../components/ThemeWrapper';
import { Candle } from '../components/Candle';
import { playHappyBirthday } from '../utils/audio';
import { Music, RotateCcw, AlertTriangle, ArrowLeft } from 'lucide-react';
import { ImmersiveVisuals } from '../components/ImmersiveVisuals';

// Public Lottie Animation URLs
const LOTTIE_URLS = {
  festive: 'https://assets3.lottiefiles.com/packages/lf20_touohxv0.json', // Happy birthday explosion
  elegant: 'https://assets9.lottiefiles.com/packages/lf20_U1v3b9.json', // Elegant gift
  kids: 'https://assets1.lottiefiles.com/packages/lf20_a2chheio.json', // Cute bear
  minimalist: 'https://assets5.lottiefiles.com/packages/lf20_yzoqyiqf.json' // Minimal balloons
};

export const Birthday = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState(id ? decodeBirthdayData(id) : null);
  const [seconds, setSeconds] = useState(0);
  const [candlesBlown, setCandlesBlown] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lottieAnimation, setLottieAnimation] = useState<any>(null);

  // Fetch Lottie JSON statically to avoid iframe/CORS issues
  useEffect(() => {
    if (data?.theme) {
      // Fallback to festive if URL is broken
      fetch(LOTTIE_URLS[data.theme] || LOTTIE_URLS.festive)
        .then(res => res.json())
        .then(json => setLottieAnimation(json))
        .catch(err => console.warn('Lottie failed to load', err));
    }
  }, [data]);

  const triggerConfetti = () => {
    // ... rest of confetti logic
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
         spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  useEffect(() => {
    if (data) {
      setTimeout(() => triggerConfetti(), 600);
      const interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data]);

  const handlePlayMusic = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      playHappyBirthday();
      setTimeout(() => setIsPlaying(false), 12000);
    }
  };

  const handleCandleBlown = () => {
    setCandlesBlown(prev => {
      const newVal = prev + 1;
      if (newVal === 3) {
        setTimeout(() => triggerConfetti(), 400);
      }
      return newVal;
    });
  };

  if (!data) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-gray-50 flex-col p-4 md:p-8 text-center font-minimalist">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Lien invalide ou expiré</h1>
        <p className="text-gray-500 mb-8 max-w-sm">Ce QR code ou ce lien semble incomplet.</p>
        <Link to="/" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <ThemeWrapper theme={data.theme} className="flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 relative overflow-hidden w-full h-[100dvh] perspective-[1200px]">
      
      {/* 3D Immersive Background Visuals */}
      <ImmersiveVisuals theme={data.theme} />
      
      {data.theme === 'festive' && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent mix-blend-overlay z-0"></div>
      )}
      {data.theme === 'elegant' && (
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent z-0"></div>
      )}
      
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, scale: 0.85, y: 40, rotateX: 15 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            rotateX: [5, -5, 5], 
            rotateY: [-2, 2, -2] 
          }}
          transition={{ 
            duration: 0.8, 
            type: "spring", 
            bounce: 0.5,
            rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ transformStyle: "preserve-3d" }}
          className={`w-full max-w-3xl flex flex-col justify-between items-center z-10 p-4 sm:p-8 rounded-2xl md:rounded-[2rem] max-h-[96vh] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-t border-b ${
            data.theme === 'minimalist' 
              ? 'bg-white/90 shadow-sm border-gray-100' 
              : data.theme === 'elegant'
              ? 'bg-[#111111]/80 backdrop-blur-xl border-amber-900/30'
              : 'bg-white/20 backdrop-blur-xl border-white/50'
          }`}
        >
          {/* Header & Lottie */}
          <div className="shrink-0 text-center mb-1 sm:mb-2 w-full flex flex-col items-center relative" style={{ transform: "translateZ(30px)" }}>
            
            {/* Lottie Animation Top Piece */}
            {lottieAnimation && (
              <div className="h-16 w-32 sm:h-24 sm:w-48 -mt-2 sm:-mt-4 mb-2 pointer-events-none">
                <Lottie animationData={lottieAnimation} loop={true} />
              </div>
            )}

            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`text-xl sm:text-3xl md:text-5xl font-black mb-0 sm:mb-1 ${data.theme === 'elegant' ? 'tracking-widest' : 'tracking-tight'} ${data.theme === 'kids' ? 'text-indigo-600' : ''}`}
            >
              Joyeux anniversaire
              <span className={`text-2xl sm:text-4xl md:text-7xl mt-0 sm:mt-1 block drop-shadow-sm break-words hyphens-auto ${data.theme === 'elegant' ? 'bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-600' : ''}`}>
                {data.name} 🎉
              </span>
            </motion.h1>

            {data.date && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xs sm:text-sm md:text-base opacity-80 font-medium tracking-wide font-minimalist"
              >
                {new Date(data.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </motion.div>
            )}
          </div>

          {/* Message Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{ transform: "translateZ(20px)" }}
            className={`w-full overflow-y-auto scrollbar-hide p-2 flex-1 min-h-0 sm:p-5 rounded-xl sm:rounded-2xl mb-2 sm:mb-4 text-sm sm:text-lg md:text-xl leading-snug sm:leading-relaxed whitespace-pre-wrap shadow-inner flex items-center justify-center text-center backdrop-blur-sm ${
              data.theme === 'minimalist' 
                ? 'bg-gray-50/80 text-gray-800' 
                : data.theme === 'elegant'
                ? 'bg-black/50 text-amber-100/90 font-serif italic border border-amber-900/50'
                : 'bg-white/40 text-gray-900 font-medium'
            }`}
          >
            <div>{data.message}</div>
          </motion.div>

          {/* Interactive Candles */}
          <div className="shrink-0 mb-1 sm:mb-4 flex flex-col items-center justify-center" style={{ transform: "translateZ(40px)" }}>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest opacity-70 mb-0 sm:mb-2 font-bold font-minimalist select-none text-center drop-shadow-sm">
              Souffle tes bougies
            </p>
            <div className="flex justify-center items-end gap-2 sm:gap-6 h-12 sm:h-20">
              <div className="scale-[0.45] sm:scale-[0.6] origin-bottom"><Candle onBlowOut={handleCandleBlown} /></div>
              <div className="scale-[0.45] sm:scale-[0.6] origin-bottom"><Candle onBlowOut={handleCandleBlown} /></div>
              <div className="scale-[0.45] sm:scale-[0.6] origin-bottom"><Candle onBlowOut={handleCandleBlown} /></div>
            </div>
            <div className="h-5 sm:h-8 flex items-center justify-center">
              <AnimatePresence>
                {candlesBlown === 3 && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="font-black text-xs sm:text-lg text-center drop-shadow-md text-white mix-blend-difference"
                  >
                    Fais un vœu ! 🌠
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick controls */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ transform: "translateZ(10px)" }}
            className="flex items-center justify-center w-full gap-2 sm:gap-4 font-minimalist shrink-0"
          >
            <button 
              onClick={handlePlayMusic}
              disabled={isPlaying}
              className={`flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                data.theme === 'minimalist' 
                ? 'bg-gray-900 text-white hover:shadow-xl' 
                : data.theme === 'elegant'
                ? 'bg-amber-200 text-black hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]'
                : 'bg-white text-gray-900 shadow-xl hover:shadow-2xl'
              } ${isPlaying ? 'opacity-80 scale-95 cursor-not-allowed transform-none hover:transform-none' : ''}`}
            >
              <Music className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isPlaying ? 'animate-bounce text-purple-500' : ''}`} />
              <span className="hidden sm:inline">{isPlaying ? 'En cours...' : 'Musique'}</span>
              <span className="sm:hidden">{isPlaying ? '...' : 'Musique'}</span>
            </button>
            <button 
              onClick={triggerConfetti}
              className={`flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                data.theme === 'minimalist' 
                ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200' 
                : 'bg-white/10 text-current border-2 border-current/30 hover:bg-white/20'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Confettis
            </button>
          </motion.div>

          {/* Subtle timer */}
          <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs opacity-40 font-mono tracking-wider font-medium shrink-0" style={{ transform: "translateZ(5px)" }}>
            Ouvert depuis {seconds}s
          </div>
        </motion.div>
      </AnimatePresence>
    </ThemeWrapper>
  );
};
