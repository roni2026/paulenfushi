import { motion, AnimatePresence } from 'framer-motion';

export type IslandMode = 'discover' | 'escape' | 'explore';

interface Props {
  mode: IslandMode;
  onChange: (m: IslandMode) => void;
  visible: boolean;
}

const modes: { key: IslandMode; label: string; sub: string }[] = [
  { key: 'discover', label: 'DISCOVER', sub: 'First time on the island' },
  { key: 'escape', label: 'ESCAPE', sub: 'Romance & serenity' },
  { key: 'explore', label: 'EXPLORE', sub: 'Adventure & experiences' },
];

export default function IslandModeSelector({ mode, onChange, visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[45] hidden lg:flex items-center gap-0 bg-midnight/80 border border-softwhite/8"
          style={{ backdropFilter: 'blur(16px)' }}
        >
          {modes.map(m => (
            <button
              key={m.key}
              onClick={() => onChange(m.key)}
              className={`relative px-6 py-2.5 flex flex-col items-center gap-0.5 transition-all duration-300 group ${
                mode === m.key ? '' : 'hover:bg-softwhite/5'
              }`}
            >
              {mode === m.key && (
                <motion.div
                  layoutId="mode-active"
                  className="absolute inset-0 bg-gold/15 border-b border-gold"
                  transition={{ duration: 0.3 }}
                />
              )}
              <span className={`relative font-sans text-[9px] tracking-[0.35em] transition-colors duration-300 ${
                mode === m.key ? 'text-gold' : 'text-softwhite/35 group-hover:text-softwhite/60'
              }`}>
                {m.label}
              </span>
              <span className={`relative font-sans text-[7px] tracking-[0.1em] transition-colors duration-300 ${
                mode === m.key ? 'text-softwhite/40' : 'text-softwhite/15'
              }`}>
                {m.sub}
              </span>
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
