import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onEnter: () => void;
}

export default function OpeningExperience({ onEnter }: Props) {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'enter' | 'exit'>('loading');
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 800);
    const t2 = setTimeout(() => setPhase('enter'), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleEnter = () => {
    setPhase('exit');
    setTimeout(onEnter, 1200);
  };

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="opening"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Subtle image reveal */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'reveal' || phase === 'enter' ? 0.18 : 0 }}
            transition={{ duration: 3, ease: 'easeOut' }}
          >
            <img
              src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=2400&h=1350&fit=crop&auto=format&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Grain overlay */}
          <div className="absolute inset-0 pointer-events-none grain-overlay opacity-30" />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center text-center px-8">
            {/* Loading bar */}
            <motion.div
              className="mb-16 w-px overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: phase === 'loading' ? 40 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="w-px bg-gold"
                initial={{ height: 0 }}
                animate={{ height: 40 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase !== 'loading' ? 1 : 0, y: phase !== 'loading' ? 0 : 20 }}
              transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div
                className="font-serif tracking-[0.45em] text-softwhite"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)', fontWeight: 300 }}
              >
                PAULENFUSHI
              </div>
              <motion.div
                className="font-sans text-[10px] tracking-[0.55em] text-gold mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase !== 'loading' ? 1 : 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                RESORT &amp; SPA · MALDIVES
              </motion.div>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="w-px bg-softwhite/20 my-10"
              initial={{ height: 0 }}
              animate={{ height: phase === 'enter' ? 48 : 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />

            {/* Enter CTA */}
            <motion.button
              onClick={handleEnter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: phase === 'enter' ? 1 : 0, y: phase === 'enter' ? 0 : 12 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="group font-sans text-[10px] tracking-[0.5em] text-softwhite/50 hover:text-softwhite transition-colors duration-700 flex items-center gap-4"
            >
              <span className="w-6 h-px bg-softwhite/20 group-hover:w-10 group-hover:bg-gold transition-all duration-700" />
              ENTER THE ISLAND
              <span className="w-6 h-px bg-softwhite/20 group-hover:w-10 group-hover:bg-gold transition-all duration-700" />
            </motion.button>
          </div>

          {/* Sound toggle */}
          <motion.button
            onClick={() => setSoundOn(!soundOn)}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'enter' ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-8 right-8 font-sans text-[9px] tracking-[0.3em] text-softwhite/25 hover:text-softwhite/60 transition-colors flex items-center gap-2"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              {soundOn ? (
                <>
                  <path d="M1 4.5h2l3-3v9l-3-3H1z" stroke="currentColor" strokeWidth="0.8" fill="none" />
                  <path d="M8 3.5c1.1.8 1.8 2 1.8 2.5s-.7 1.7-1.8 2.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                  <path d="M9.5 2c1.8 1.2 2.5 3 2.5 4s-.7 2.8-2.5 4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <path d="M1 4.5h2l3-3v9l-3-3H1z" stroke="currentColor" strokeWidth="0.8" fill="none" />
                  <path d="M9 4l-3 4M6 4l3 4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                </>
              )}
            </svg>
            {soundOn ? 'SOUND ON' : 'SOUND OFF'}
          </motion.button>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sans text-[8px] tracking-[0.4em] text-softwhite/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'enter' ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            2026
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
