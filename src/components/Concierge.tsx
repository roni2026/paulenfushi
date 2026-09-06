import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavigateFn } from '../App';

interface Props {
  onNavigate: NavigateFn;
}

const options = [
  { icon: '✦', label: 'Plan my stay', sub: 'Tailored itinerary creation' },
  { icon: '◇', label: 'Find my perfect villa', sub: 'Personalised villa matching' },
  { icon: '→', label: 'Arrange a transfer', sub: 'Seaplane, speedboat or helicopter' },
  { icon: '◈', label: 'Book a private dinner', sub: 'Exclusive dining experiences' },
  { icon: '◉', label: 'Explore experiences', sub: 'Ocean, island & wellness' },
  { icon: '◎', label: 'Speak with our team', sub: 'Live concierge service' },
];

type Step = 'menu' | 'form' | 'success';

export default function Concierge({ onNavigate }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('menu');
  const [selected, setSelected] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSelect = (label: string) => {
    if (label === 'Explore experiences') { onNavigate('experiences'); setOpen(false); return; }
    if (label === 'Find my perfect villa') { onNavigate('villas'); setOpen(false); return; }
    setSelected(label);
    setStep('form');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => { setStep('menu'); setForm({ name: '', email: '', message: '' }); }, 400);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 lg:bottom-8 right-6 z-[90] bg-ocean text-softwhite font-sans text-[9px] tracking-[0.35em] flex items-center gap-2.5 px-5 py-3.5 hover:bg-gold transition-colors duration-500 shadow-2xl"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7, ease: 'easeOut' }}
        whileHover={{ y: -2 }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="0.8" />
          <path d="M4 5h4M4 7h2.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
        CONCIERGE
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[91] bg-midnight/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />
            <motion.div
              className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[92] w-full sm:w-[420px] bg-midnight border border-softwhite/8 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Header */}
              <div className="px-8 pt-8 pb-6 border-b border-softwhite/8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.4em] text-gold mb-2">PAULENFUSHI</p>
                    <h3 className="font-serif text-2xl font-light text-softwhite leading-snug">
                      How may we make<br />your island yours?
                    </h3>
                  </div>
                  <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center text-softwhite/30 hover:text-softwhite transition-colors">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto hide-scrollbar">
                <AnimatePresence mode="wait">
                  {step === 'menu' && (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-1"
                    >
                      {options.map((opt, i) => (
                        <motion.button
                          key={opt.label}
                          onClick={() => handleSelect(opt.label)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="group flex items-center gap-4 px-4 py-4 text-left hover:bg-softwhite/5 transition-colors border border-transparent hover:border-softwhite/8 rounded-none"
                        >
                          <span className="text-gold/50 text-xs group-hover:text-gold transition-colors w-4 text-center flex-shrink-0">{opt.icon}</span>
                          <div>
                            <p className="font-sans text-[11px] tracking-[0.15em] text-softwhite/80 group-hover:text-softwhite transition-colors">{opt.label}</p>
                            <p className="font-sans text-[10px] text-softwhite/30 mt-0.5">{opt.sub}</p>
                          </div>
                          <span className="ml-auto text-softwhite/20 group-hover:text-gold/40 transition-colors text-sm">→</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  {step === 'form' && (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <button type="button" onClick={() => setStep('menu')} className="flex items-center gap-2 font-sans text-[9px] tracking-[0.3em] text-softwhite/30 hover:text-gold transition-colors mb-2">
                        ← BACK
                      </button>
                      <p className="font-sans text-[9px] tracking-[0.3em] text-gold mb-1">{selected.toUpperCase()}</p>
                      {[
                        { key: 'name', label: 'YOUR NAME', type: 'text', placeholder: '—' },
                        { key: 'email', label: 'EMAIL', type: 'email', placeholder: 'your@email.com' },
                      ].map(f => (
                        <div key={f.key} className="border border-softwhite/15 hover:border-softwhite/30 transition-colors">
                          <label className="font-sans text-[8px] tracking-[0.3em] text-softwhite/30 px-4 pt-3 block">{f.label}</label>
                          <input
                            type={f.type}
                            value={form[f.key as keyof typeof form]}
                            onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                            placeholder={f.placeholder}
                            required
                            className="w-full bg-transparent font-sans text-sm text-softwhite px-4 pb-3 outline-none placeholder:text-softwhite/20"
                          />
                        </div>
                      ))}
                      <div className="border border-softwhite/15 hover:border-softwhite/30 transition-colors">
                        <label className="font-sans text-[8px] tracking-[0.3em] text-softwhite/30 px-4 pt-3 block">MESSAGE</label>
                        <textarea
                          rows={3}
                          value={form.message}
                          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                          placeholder="How can we help you..."
                          className="w-full bg-transparent font-sans text-sm text-softwhite px-4 pb-3 outline-none resize-none placeholder:text-softwhite/20"
                        />
                      </div>
                      <button type="submit" className="w-full bg-gold text-midnight font-sans text-[11px] tracking-[0.28em] py-4 hover:bg-softwhite transition-colors duration-300 mt-2">
                        SEND REQUEST
                      </button>
                    </motion.form>
                  )}

                  {step === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center text-center py-8 gap-5"
                    >
                      <div className="w-12 h-12 border border-gold/40 rounded-full flex items-center justify-center">
                        <span className="text-gold text-xl">✦</span>
                      </div>
                      <p className="font-sans text-[9px] tracking-[0.4em] text-gold">REQUEST RECEIVED</p>
                      <p className="font-serif text-2xl font-light text-softwhite leading-snug">
                        Your island<br />awaits.
                      </p>
                      <p className="font-sans text-sm text-softwhite/40 leading-relaxed max-w-[260px]">
                        Our concierge team will be in touch within the hour.
                      </p>
                      <button onClick={handleClose} className="font-sans text-[10px] tracking-[0.3em] text-softwhite/30 hover:text-gold transition-colors mt-4">
                        CLOSE
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
