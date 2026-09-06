import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import type { NavigateFn } from '../App';
import IslandMap from '../components/IslandMap';
import VillaFinder from '../components/VillaFinder';
import ItineraryBuilder from '../components/ItineraryBuilder';

type IslandMode = 'discover' | 'escape' | 'explore';

const u = (id: string, w = 1920, h = 1080) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const HERO_SLIDES = [
  { id: '1514282401047-d79a71a590e8', loc: 'The Island' },
  { id: '1609601546193-f558f1ebb385', loc: 'Beach Villa' },
  { id: '1540541338287-41700207dee6', loc: 'Beach Villa with Pool' },
  { id: '1590523277543-a94d2e4eb00b', loc: 'Water Villa' },
  { id: '1561501900-3701fa6a0864', loc: 'Water Villa with Pool' },
  { id: '1762961881563-66852e1e4527', loc: 'Maldives' },
  { id: '1609601540898-52ca92508901', loc: 'Golden Hour' },
];

const SLIDE_DURATION = 7000;
const FADE_MS = 1500;

const IMGS = {
  couple: '1623137285532-ec3df3e9abc7',
  villaBeach: '1609601546193-f558f1ebb385',
  villaWater: '1590523277543-a94d2e4eb00b',
  villaSunset: '1620483829312-71b2ec172fd0',
  sailing: '1613895571415-90c5853c6e36',
  sandbar: '1762961881563-66852e1e4527',
  dining: '1777906718328-deb1ff1be508',
  dining2: '1755493872646-5b64e70d6077',
  spa: '1532592068623-db1978e40df5',
  yoga: '1646166468261-b18339c92fda',
  island: '1688949078626-a358f500e063',
  finalCta: '1609601540898-52ca92508901',
};

const villas = [
  { num: '01', name: 'Beach Villa', tagline: 'Steps from the sea', price: 'From $450', size: '120 sqm', guests: 2, pool: false, img: IMGS.villaBeach, features: ['Beach access', 'King bedroom', 'Rain shower', 'Ocean view'] },
  { num: '02', name: 'Beach Villa with Pool', tagline: 'Private pool, private paradise', price: 'From $750', size: '180 sqm', guests: 2, pool: true, img: '1540541338287-41700207dee6', features: ['Private pool', 'Beach access', 'Sunset terrace', 'Garden'] },
  { num: '03', name: 'Water Villa', tagline: 'Suspended above the lagoon', price: 'From $850', size: '150 sqm', guests: 2, pool: false, img: IMGS.villaWater, features: ['Lagoon access', 'Glass floor', 'Private deck', 'Bathtub'] },
  { num: '04', name: 'Water Villa with Pool', tagline: 'Infinity meets the horizon', price: 'From $1,200', size: '210 sqm', guests: 3, pool: true, img: IMGS.villaSunset, features: ['Infinity pool', 'Ocean access', 'Butler service', 'Sunset views'] },
  { num: '05', name: 'Sunset Water Villa', tagline: 'Golden hour, every evening', price: 'From $1,400', size: '160 sqm', guests: 2, pool: false, img: '1620483829312-71b2ec172fd0', features: ['Sunset-facing', 'Private deck', 'Outdoor dining', 'Bathtub'] },
  { num: '06', name: 'Two-Bedroom Residence', tagline: 'Space for those you love', price: 'From $2,200', size: '350 sqm', guests: 4, pool: true, img: '1595184979141-090792f6b578', features: ['2 bedrooms', 'Private pool', 'Large living', 'Host service'] },
  { num: '07', name: 'Private Residence', tagline: 'The island, entirely yours', price: 'From $8,500', size: '600+ sqm', guests: 10, pool: true, img: '1698726654908-834d3a5330d8', features: ['Private beach', 'Personal chef', 'Yacht charter', 'Dining pavilion'] },
];

const experiences = [
  { name: 'Sunrise Dolphin Cruise', tag: 'OCEAN', duration: '3 hrs', img: IMGS.sailing },
  { name: 'Private Sandbar Picnic', tag: 'ISLAND', duration: 'Half day', img: IMGS.sandbar },
  { name: 'Sunset Sailing', tag: 'SAIL', duration: '2 hrs', img: IMGS.finalCta },
  { name: 'House Reef Diving', tag: 'DIVE', duration: '2 hrs', img: IMGS.villaWater },
  { name: 'Romantic Beach Dinner', tag: 'DINING', duration: 'Evening', img: IMGS.dining },
  { name: 'Cinema Under the Stars', tag: 'ESCAPE', duration: 'Evening', img: IMGS.villaSunset },
];

const restaurantCards = [
  { name: 'The Lagoon', type: 'Contemporary island cuisine', hours: 'Dinner 7–10pm', seats: 60, img: IMGS.dining },
  { name: 'Palm', type: 'All-day garden dining', hours: 'Daily 7am–11pm', seats: 80, img: IMGS.dining2 },
  { name: 'The Reef', type: 'Fresh seafood & Maldivian', hours: 'Lunch & dinner', seats: 40, img: IMGS.sandbar },
  { name: 'Sunset Bar', type: 'Cocktails & champagne', hours: 'Daily 4pm–midnight', seats: 30, img: IMGS.villaSunset },
];

const sustainabilityStats = [
  { num: '01', stat: '100%', label: 'Responsible water management' },
  { num: '02', stat: 'LOCAL', label: 'Community partnerships' },
  { num: '03', stat: 'REEF', label: 'Conservation programme' },
  { num: '04', stat: 'ZERO', label: 'Single-use plastic' },
];

const journalItems = [
  { title: 'Five ways to experience the Maldives differently', tag: 'TRAVEL', date: 'Sep 2026', img: IMGS.island },
  { title: 'Inside the art of barefoot luxury', tag: 'CULTURE', date: 'Aug 2026', img: IMGS.villaWater },
  { title: 'The quiet luxury of doing absolutely nothing', tag: 'WELLNESS', date: 'Jul 2026', img: IMGS.spa },
];

const ISLAND_JOURNEY = [
  { num: '01', label: 'ARRIVE', desc: 'Seaplane or speedboat transfer from Malé. Your island welcome awaits.' },
  { num: '02', label: 'DISCOVER', desc: 'A private island sanctuary. Seven villa categories. One private reef.' },
  { num: '03', label: 'CHOOSE YOUR VILLA', desc: 'Beachfront, overwater, or ultimate privacy. Each villa is your own world.' },
  { num: '04', label: 'EXPLORE THE ISLAND', desc: 'The reef, the sandbar, the spa, the restaurants. Everything is yours.' },
  { num: '05', label: 'DESIGN YOUR DAYS', desc: 'Build your perfect days from sunrise yoga to cinema under the stars.' },
  { num: '06', label: 'MEET THE OCEAN', desc: 'Snorkel, dive, sail, swim. The Maldives is most beautiful beneath the surface.' },
  { num: '07', label: 'RESERVE YOUR ESCAPE', desc: 'When will the island be yours?' },
];

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function CinematicHero({ onNavigate }: { onNavigate: NavigateFn }) {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const rafRef = useRef<number>(0);
  const startRef = useRef(Date.now());
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.65]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  const goTo = (idx: number) => {
    setActive(idx);
    setAnimKey(k => k + 1);
    startRef.current = Date.now();
    setProgress(0);
  };

  useEffect(() => {
    const t = setTimeout(() => goTo((active + 1) % HERO_SLIDES.length), SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    startRef.current = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      setProgress(Math.min(elapsed / SLIDE_DURATION, 1));
      if (elapsed < SLIDE_DURATION) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  const slide = HERO_SLIDES[active];
  const pad = (n: number) => String(n + 1).padStart(2, '0');

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: '100svh' }}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{ opacity: i === active ? 1 : 0, transition: `opacity ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1)` }}
        >
          <img
            key={i === active ? animKey : -i}
            src={`https://images.unsplash.com/photo-${s.id}?w=2400&h=1350&fit=crop&auto=format&q=80`}
            alt={s.loc}
            className={`absolute inset-0 w-full h-full object-cover ${i === active ? 'ken-burns' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      <motion.div className="absolute inset-0 bg-midnight pointer-events-none" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 via-transparent to-midnight/65 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/20 to-transparent pointer-events-none" />

      <motion.div
        style={{ y: textY }}
        className="absolute bottom-[150px] sm:bottom-[168px] left-6 sm:left-10 lg:left-14 z-10 max-w-[92vw] lg:max-w-2xl"
      >
        <motion.p
          className="font-sans text-[9px] sm:text-[10px] tracking-[0.5em] text-gold mb-3 sm:mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          RESORT &amp; SPA · MALDIVES
        </motion.p>
        <motion.h1
          className="font-serif font-light leading-[0.9] tracking-[0.07em] text-softwhite"
          style={{ fontSize: 'clamp(3rem, 9vw, 8.5rem)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.1 }}
        >
          PAULENFUSHI
        </motion.h1>
        <motion.div
          className="flex items-center gap-5 sm:gap-7 mt-5 sm:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <button
            onClick={() => onNavigate('book')}
            className="font-sans text-[10px] sm:text-[11px] tracking-[0.35em] text-softwhite/75 hover:text-gold transition-colors duration-500 flex items-center gap-2 group"
          >
            <span className="border-b border-softwhite/20 group-hover:border-gold pb-px transition-colors duration-500">BOOK YOUR STAY</span>
            <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
          </button>
          <span className="w-px h-3 bg-softwhite/15 hidden sm:block" />
          <button
            onClick={() => onNavigate('villas')}
            className="font-sans text-[10px] sm:text-[11px] tracking-[0.35em] text-softwhite/30 hover:text-softwhite/65 transition-colors duration-500 hidden sm:block"
          >
            VILLAS
          </button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-[88px] sm:bottom-[100px] right-6 sm:right-10 z-10 flex flex-col items-end gap-2">
        <div className="font-sans text-[10px] tracking-[0.2em]">
          <span className="text-softwhite/60">{pad(active)}</span>
          <span className="text-softwhite/20"> / {pad(HERO_SLIDES.length - 1)}</span>
        </div>
        <div className="relative h-px w-14 sm:w-20 bg-softwhite/15">
          <div className="absolute inset-y-0 left-0 bg-gold" style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="font-sans text-[8px] tracking-[0.25em] text-softwhite/30 uppercase">{slide.loc}</p>
      </div>

      <div className="absolute bottom-[88px] sm:bottom-[100px] left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`h-px transition-all duration-500 ${i === active ? 'w-8 bg-gold' : 'w-2 bg-softwhite/25 hover:bg-softwhite/50'}`} />
        ))}
      </div>

      <div
        className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:px-5 z-10 pointer-events-none"
        style={{ opacity: showArrows ? 1 : 0, transition: 'opacity 0.6s ease' }}
      >
        <button onClick={() => goTo((active - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} className="pointer-events-auto text-softwhite/25 hover:text-softwhite/70 transition-colors duration-300 p-4 font-sans text-sm" aria-label="Previous image">←</button>
        <button onClick={() => goTo((active + 1) % HERO_SLIDES.length)} className="pointer-events-auto text-softwhite/25 hover:text-softwhite/70 transition-colors duration-300 p-4 font-sans text-sm" aria-label="Next image">→</button>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-sans text-[8px] tracking-[0.4em] text-softwhite/25">SCROLL</span>
        <div className="w-px h-8 bg-softwhite/15 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gold animate-scroll-pulse" />
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <BookingBar onBook={() => onNavigate('book')} />
      </div>
    </section>
  );
}

function BookingBar({ onBook }: { onBook: () => void }) {
  const [adults, setAdults] = useState(2);
  const [villa, setVilla] = useState('');

  return (
    <div className="bg-softwhite" style={{ boxShadow: '0 8px 40px rgba(7,30,36,0.25)' }}>
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:flex">
        <div className="px-5 py-4 lg:flex-1 border-b border-r lg:border-b-0 lg:border-r border-charcoal/10">
          <p className="font-sans text-[9px] tracking-[0.35em] text-charcoal/40 mb-1.5">CHECK-IN</p>
          <input type="date" className="w-full font-sans text-sm text-charcoal bg-transparent outline-none cursor-pointer" />
        </div>
        <div className="px-5 py-4 lg:flex-1 border-b lg:border-b-0 lg:border-r border-charcoal/10">
          <p className="font-sans text-[9px] tracking-[0.35em] text-charcoal/40 mb-1.5">CHECK-OUT</p>
          <input type="date" className="w-full font-sans text-sm text-charcoal bg-transparent outline-none cursor-pointer" />
        </div>
        <div className="px-5 py-4 lg:flex-none border-r border-charcoal/10">
          <p className="font-sans text-[9px] tracking-[0.35em] text-charcoal/40 mb-1.5">GUESTS</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-7 h-7 border border-charcoal/20 text-charcoal/60 hover:border-gold hover:text-gold transition-colors flex items-center justify-center">−</button>
            <span className="font-sans text-sm text-charcoal w-5 text-center">{adults}</span>
            <button onClick={() => setAdults(adults + 1)} className="w-7 h-7 border border-charcoal/20 text-charcoal/60 hover:border-gold hover:text-gold transition-colors flex items-center justify-center">+</button>
          </div>
        </div>
        <div className="px-5 py-4 lg:flex-1 lg:border-r border-charcoal/10">
          <p className="font-sans text-[9px] tracking-[0.35em] text-charcoal/40 mb-1.5">VILLA TYPE</p>
          <select value={villa} onChange={e => setVilla(e.target.value)} className="w-full font-sans text-sm text-charcoal bg-transparent outline-none cursor-pointer appearance-none">
            <option value="">Any villa</option>
            {villas.map(v => <option key={v.num} value={v.num}>{v.name}</option>)}
          </select>
        </div>
        <button onClick={onBook} className="col-span-2 lg:col-span-1 bg-ocean text-softwhite font-sans text-[11px] tracking-[0.28em] px-8 py-4 hover:bg-gold transition-colors duration-300 whitespace-nowrap border-t lg:border-t-0 border-charcoal/10">
          CHECK AVAILABILITY
        </button>
      </div>
    </div>
  );
}

function IslandJourney({ onNavigate }: { onNavigate: NavigateFn }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="bg-midnight py-24 lg:py-36">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <FadeIn>
          <div className="flex items-center gap-4 mb-5">
            <span className="w-8 h-px bg-gold" />
            <p className="font-sans text-[10px] tracking-[0.45em] text-gold">THE JOURNEY</p>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-softwhite leading-tight mb-16 max-w-lg">
            Your island experience, beginning to end.
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col gap-0">
            {ISLAND_JOURNEY.map((step, i) => (
              <motion.button
                key={step.num}
                onClick={() => setActiveStep(i)}
                className={`group text-left py-5 border-b flex items-start gap-5 transition-all duration-400 ${activeStep === i ? 'border-gold/40' : 'border-softwhite/8 hover:border-softwhite/20'}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <span className={`font-sans text-[9px] tracking-[0.3em] mt-1 transition-colors flex-shrink-0 ${activeStep === i ? 'text-gold' : 'text-softwhite/20'}`}>{step.num}</span>
                <div>
                  <p className={`font-serif text-xl transition-colors duration-300 ${activeStep === i ? 'text-softwhite' : 'text-softwhite/40 group-hover:text-softwhite/70'}`}>{step.label}</p>
                  <AnimatePresence>
                    {activeStep === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="font-sans text-sm text-softwhite/40 mt-2 leading-relaxed overflow-hidden"
                      >
                        {step.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
            <div className="pt-8">
              <button onClick={() => onNavigate('book')} className="font-sans text-[11px] tracking-[0.28em] bg-gold text-midnight px-10 py-4 hover:bg-softwhite transition-colors duration-300">
                BEGIN YOUR JOURNEY
              </button>
            </div>
          </div>
          <div className="hidden lg:flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={u([IMGS.island, IMGS.villaBeach, IMGS.villaWater, IMGS.sandbar, IMGS.yoga, IMGS.sailing, IMGS.finalCta][activeStep], 900, 680)}
                    alt={ISLAND_JOURNEY[activeStep].label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="font-sans text-[9px] tracking-[0.4em] text-gold">{ISLAND_JOURNEY[activeStep].num}</span>
                  <span className="w-8 h-px bg-softwhite/15" />
                  <span className="font-sans text-[10px] tracking-[0.25em] text-softwhite/30">{ISLAND_JOURNEY[activeStep].label}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function VillaCard({ villa, idx, onNavigate }: { villa: typeof villas[0]; idx: number; onNavigate: NavigateFn }) {
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[340px] lg:w-[380px] bg-softwhite flex flex-col" style={{ scrollSnapAlign: 'start' }}>
      <div className="relative aspect-[4/3] overflow-hidden group">
        <img src={u(villa.img, 800, 600)} alt={villa.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        {villa.pool && <div className="absolute top-4 left-4 bg-gold text-midnight font-sans text-[9px] tracking-[0.2em] px-2.5 py-1.5">PRIVATE POOL</div>}
        <div className="absolute top-4 right-4 bg-midnight/70 backdrop-blur-sm text-softwhite font-sans text-[9px] tracking-[0.15em] px-2.5 py-1.5">{villa.num}</div>
      </div>
      <div className="p-6 flex flex-col flex-1 border border-charcoal/8 border-t-0">
        <h3 className="font-serif text-xl text-charcoal mb-1">{villa.name}</h3>
        <p className="font-sans text-xs text-charcoal/50 mb-4">{villa.tagline}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {villa.features.slice(0, 3).map(f => (
            <span key={f} className="font-sans text-[10px] text-charcoal/60 bg-sand px-2.5 py-1">{f}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-charcoal/8">
          <div>
            <p className="font-sans text-[9px] tracking-[0.2em] text-charcoal/40">FROM</p>
            <p className="font-serif text-xl text-charcoal">{villa.price}<span className="font-sans text-xs text-charcoal/40 ml-1">/ night</span></p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onNavigate('villa-detail', idx)} className="font-sans text-[10px] tracking-[0.18em] text-ocean border border-ocean/30 px-4 py-2 hover:bg-ocean hover:text-softwhite transition-all duration-300">DETAILS</button>
            <button onClick={() => onNavigate('book')} className="font-sans text-[10px] tracking-[0.18em] bg-ocean text-softwhite px-4 py-2 hover:bg-gold transition-colors duration-300">BOOK</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WakeUpTo({ islandMode, onNavigate }: { islandMode: IslandMode; onNavigate: NavigateFn }) {
  const recs: Record<IslandMode, { tagline: string; caption: string; villaIdxs: number[] }> = {
    discover: { tagline: 'Begin your Maldives story.', caption: 'DISCOVER MODE', villaIdxs: [0, 2, 4] },
    escape: { tagline: 'Made for those who arrive together.', caption: 'ESCAPE MODE', villaIdxs: [1, 3, 4] },
    explore: { tagline: 'For those who want it all.', caption: 'EXPLORE MODE', villaIdxs: [2, 5, 6] },
  };
  const rec = recs[islandMode];

  return (
    <section className="bg-softwhite py-24 lg:py-36 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <FadeIn>
          <div className="flex items-center gap-4 mb-3">
            <span className="w-8 h-px bg-gold" />
            <p className="font-sans text-[10px] tracking-[0.45em] text-gold">{rec.caption}</p>
          </div>
          <h2 className="font-serif text-4xl lg:text-6xl font-light text-charcoal leading-tight mb-4">Wake up to...</h2>
          <p className="font-sans text-sm text-charcoal/50 italic mb-14">{rec.tagline}</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rec.villaIdxs.map((vi, i) => {
            const v = villas[vi];
            return (
              <motion.div
                key={`${islandMode}-${vi}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="group cursor-pointer"
                onClick={() => onNavigate('villa-detail', vi)}
              >
                <div className="aspect-[3/4] overflow-hidden mb-5 relative">
                  <img src={u(v.img, 700, 950)} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-serif text-2xl text-softwhite font-light leading-tight">{v.name}</p>
                    <p className="font-sans text-[10px] tracking-[0.2em] text-softwhite/50 mt-1">{v.tagline}</p>
                  </div>
                  {v.pool && <div className="absolute top-4 left-4 bg-gold/90 text-midnight font-sans text-[8px] tracking-[0.2em] px-2 py-1">POOL</div>}
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 group-hover:text-gold transition-colors">{v.price} / NIGHT</p>
                  <span className="font-sans text-[9px] tracking-[0.2em] text-ocean group-hover:text-gold transition-colors">VIEW →</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home({ onNavigate, islandMode }: { onNavigate: NavigateFn; islandMode: IslandMode }) {
  return (
    <div className="w-full">
      <CinematicHero onNavigate={onNavigate} />
      <IslandJourney onNavigate={onNavigate} />

      {/* Editorial intro */}
      <section className="bg-ivory py-24 lg:py-36">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn>
            <div className="flex items-center gap-4 mb-8"><span className="w-8 h-px bg-gold" /><p className="font-sans text-[10px] tracking-[0.45em] text-gold">THE ISLAND</p></div>
            <h2 className="font-serif text-3xl lg:text-5xl font-light leading-[1.2] text-charcoal mb-7">
              &ldquo;Somewhere between the sky and the sea, there is an island that feels entirely yours.&rdquo;
            </h2>
            <p className="font-sans text-[15px] text-charcoal/60 leading-[1.8] mb-10">
              Paulenfushi is a secluded Maldivian sanctuary where barefoot days, turquoise horizons and effortless hospitality come together.
            </p>
            <div className="flex gap-6 flex-wrap">
              <button onClick={() => onNavigate('island')} className="font-sans text-[11px] tracking-[0.25em] text-ocean border border-ocean px-7 py-3 hover:bg-ocean hover:text-softwhite transition-all duration-300">EXPLORE THE ISLAND</button>
              <button onClick={() => onNavigate('gallery')} className="font-sans text-[11px] tracking-[0.25em] text-charcoal/50 hover:text-gold border-b border-charcoal/20 pb-px hover:border-gold transition-all duration-300">VIEW GALLERY →</button>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={u(IMGS.couple, 900, 1200)} alt="Couple at Paulenfushi" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-ocean px-6 py-5 hidden lg:block">
                <p className="font-sans text-[9px] tracking-[0.3em] text-gold mb-1">PAULENFUSHI</p>
                <p className="font-serif text-2xl text-softwhite font-light">Since 2018</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <WakeUpTo islandMode={islandMode} onNavigate={onNavigate} />
      <VillaFinder onNavigate={onNavigate} />

      {/* Villa rail */}
      <section className="bg-ocean pt-20 pb-0">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 mb-10">
          <FadeIn>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-4 mb-6"><span className="w-8 h-px bg-gold" /><p className="font-sans text-[10px] tracking-[0.45em] text-gold">ACCOMMODATIONS</p></div>
                <h2 className="font-serif text-4xl lg:text-5xl font-light text-softwhite leading-none">Stay Where the Ocean<br />Meets the Sky</h2>
              </div>
              <button onClick={() => onNavigate('villas')} className="font-sans text-[11px] tracking-[0.22em] text-softwhite border border-softwhite/25 px-7 py-2.5 hover:bg-softwhite hover:text-midnight transition-all duration-300 self-start lg:self-end">ALL 7 VILLAS →</button>
            </div>
          </FadeIn>
        </div>
        <div className="flex gap-4 pl-6 lg:pl-16 pr-4 overflow-x-auto hide-scrollbar pb-12" style={{ scrollSnapType: 'x mandatory' }}>
          {villas.map((v, i) => <VillaCard key={v.num} villa={v} idx={i} onNavigate={onNavigate} />)}
          <div className="flex-shrink-0 w-2" />
        </div>
      </section>

      <IslandMap />

      {/* Experiences */}
      <section className="bg-midnight py-24 lg:py-36">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="flex items-center gap-4 mb-4"><span className="w-8 h-px bg-gold" /><p className="font-sans text-[10px] tracking-[0.45em] text-gold">EXPERIENCES</p></div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-softwhite italic leading-tight max-w-xl">&ldquo;The island is yours to discover.&rdquo;</h2>
              <button onClick={() => onNavigate('experiences')} className="font-sans text-[11px] tracking-[0.22em] text-softwhite border border-softwhite/25 px-7 py-2.5 hover:bg-softwhite hover:text-midnight transition-all duration-300 self-start lg:self-end">ALL EXPERIENCES →</button>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {experiences.map((exp, i) => (
              <motion.div key={exp.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="relative cursor-pointer group overflow-hidden" onClick={() => onNavigate('experiences')}>
                <div className="aspect-[4/5]">
                  <img src={u(exp.img, 600, 750)} alt={exp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans text-[9px] tracking-[0.3em] text-gold">{exp.tag}</span>
                    <span className="font-sans text-[9px] text-softwhite/40">{exp.duration}</span>
                  </div>
                  <h3 className="font-serif text-lg lg:text-xl text-softwhite font-light leading-snug">{exp.name}</h3>
                  <div className="mt-3 h-px bg-gold/0 group-hover:bg-gold/60 transition-all duration-500 w-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining */}
      <section className="bg-sand py-24 lg:py-36">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="flex items-center gap-4 mb-5"><span className="w-8 h-px bg-palm" /><p className="font-sans text-[10px] tracking-[0.45em] text-palm">DINING</p></div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal leading-tight max-w-lg">Taste the Maldives</h2>
              <button onClick={() => onNavigate('dining')} className="font-sans text-[11px] tracking-[0.22em] text-charcoal border border-charcoal/30 px-7 py-2.5 hover:bg-charcoal hover:text-softwhite transition-all duration-300">ALL RESTAURANTS →</button>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {restaurantCards.map((r, i) => (
              <motion.div key={r.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-softwhite cursor-pointer group flex flex-col" onClick={() => onNavigate('dining')}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={u(r.img, 600, 450)} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="font-sans text-[9px] tracking-[0.25em] text-palm mb-2">{r.type.toUpperCase()}</p>
                  <h3 className="font-serif text-xl text-charcoal group-hover:text-ocean transition-colors mb-2">{r.name}</h3>
                  <p className="font-sans text-xs text-charcoal/45 mb-4 flex-1">{r.hours} · {r.seats} covers</p>
                  <div className="flex items-center gap-2 pt-4 border-t border-charcoal/8">
                    <span className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 group-hover:text-gold transition-colors">RESERVE A TABLE</span>
                    <span className="text-charcoal/30 group-hover:text-gold transition-colors text-sm">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spa */}
      <section className="bg-ivory py-24 lg:py-36">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
            <div className="relative aspect-[4/5] lg:aspect-auto overflow-hidden">
              <img src={u(IMGS.spa, 900, 1100)} alt="Paulenfushi Spa" className="w-full h-full object-cover" />
            </div>
            <div className="bg-ocean px-10 lg:px-16 py-16 flex flex-col justify-center">
              <FadeIn>
                <div className="flex items-center gap-4 mb-6"><span className="w-8 h-px bg-gold" /><p className="font-sans text-[10px] tracking-[0.45em] text-gold">SPA &amp; WELLNESS</p></div>
                <h2 className="font-serif text-4xl lg:text-5xl font-light text-softwhite italic mb-6 leading-tight">Return to yourself.</h2>
                <p className="font-sans text-[15px] text-softwhite/55 leading-[1.8] mb-10">A sanctuary of quiet rituals, restorative treatments and ancient wellness traditions.</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-10">
                  {['Signature massages', 'Couples treatments', 'Yoga at sunrise', 'Meditation', 'Sound healing', 'Body rituals', 'Breathwork', 'Facials'].map(s => (
                    <div key={s} className="flex items-center gap-2.5">
                      <span className="w-4 h-px bg-gold flex-shrink-0" />
                      <span className="font-sans text-sm text-softwhite/60">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => onNavigate('spa')} className="font-sans text-[11px] tracking-[0.25em] bg-softwhite text-midnight px-7 py-3 hover:bg-gold hover:text-softwhite transition-all duration-300">DISCOVER THE SPA</button>
                  <button onClick={() => onNavigate('book')} className="font-sans text-[11px] tracking-[0.25em] text-softwhite border border-softwhite/25 px-7 py-3 hover:bg-softwhite/10 transition-all duration-300">BOOK NOW</button>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <ItineraryBuilder />

      {/* Sustainability */}
      <section className="bg-charcoal py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6"><span className="w-8 h-px bg-gold" /><p className="font-sans text-[10px] tracking-[0.45em] text-gold">OUR COMMITMENT</p></div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-softwhite leading-tight max-w-xl">Luxury that leaves a lighter footprint.</h2>
              <p className="font-sans text-sm text-softwhite/40 max-w-sm leading-relaxed">At Paulenfushi, protecting the most beautiful places on earth is part of what we offer.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-softwhite/8">
            {sustainabilityStats.map((item, i) => (
              <motion.div key={item.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-charcoal p-10 group hover:bg-ocean transition-colors duration-500">
                <span className="font-sans text-[10px] tracking-[0.3em] text-gold block mb-5">{item.num}</span>
                <span className="font-serif text-4xl lg:text-5xl text-softwhite font-light block mb-4">{item.stat}</span>
                <span className="font-sans text-xs text-softwhite/40 tracking-wide leading-snug">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className="bg-softwhite py-24 lg:py-36">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="flex items-center gap-4 mb-5"><span className="w-8 h-px bg-gold" /><p className="font-sans text-[10px] tracking-[0.45em] text-gold">EDITORIAL</p></div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal">The Paulenfushi Journal</h2>
              <button onClick={() => onNavigate('journal')} className="font-sans text-[11px] tracking-[0.22em] text-charcoal/50 hover:text-gold border-b border-charcoal/20 pb-px hover:border-gold transition-all duration-300 self-start lg:self-end">ALL ARTICLES →</button>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {journalItems.map((art, i) => (
              <motion.article key={art.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="cursor-pointer group" onClick={() => onNavigate('journal')}>
                <div className="aspect-[4/3] overflow-hidden bg-sand mb-5">
                  <img src={u(art.img, 700, 530)} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-sans text-[9px] tracking-[0.3em] text-gold bg-gold/10 px-2.5 py-1">{art.tag}</span>
                  <span className="font-sans text-[10px] text-charcoal/35">{art.date}</span>
                </div>
                <h3 className="font-serif text-xl lg:text-2xl text-charcoal group-hover:text-ocean transition-colors font-light leading-snug">{art.title}</h3>
                <p className="mt-3 font-sans text-[10px] tracking-[0.2em] text-charcoal/40 group-hover:text-gold transition-colors">READ MORE →</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-sand py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8"><span className="w-8 h-px bg-palm" /><p className="font-sans text-[10px] tracking-[0.45em] text-palm">CONTACT US</p></div>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal leading-tight mb-10">We are here to help you plan the perfect escape.</h2>
              <div className="border-t border-charcoal/10 pt-8 mb-8">
                <p className="font-sans text-[9px] tracking-[0.35em] text-gold mb-3">CONTACT US</p>
                <p className="font-serif text-3xl text-charcoal mb-6">Biju Paul</p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4"><span className="w-5 h-px bg-gold flex-shrink-0" /><a href="tel:+15550000000" className="font-sans text-sm text-charcoal/70 hover:text-gold transition-colors">+1 (555) 000-0000</a></div>
                  <div className="flex items-center gap-4"><span className="w-5 h-px bg-gold flex-shrink-0" /><a href="mailto:biju.paul@paulenfushi.com" className="font-sans text-sm text-charcoal/70 hover:text-gold transition-colors">biju.paul@paulenfushi.com</a></div>
                  <div className="flex items-start gap-4"><span className="w-5 h-px bg-gold flex-shrink-0 mt-2" /><span className="font-sans text-sm text-charcoal/70 leading-relaxed">Paulenfushi Island, North Malé Atoll, Maldives</span></div>
                </div>
              </div>
              <div className="bg-ivory border-l-2 border-gold px-6 py-5">
                <p className="font-sans text-[10px] tracking-[0.25em] text-gold mb-2">RESERVATIONS HOURS</p>
                <p className="font-sans text-sm text-charcoal/60 leading-relaxed">Daily 8:00 AM – 10:00 PM (Maldives Time, GMT+5)</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="bg-softwhite p-7 lg:p-10">
                <p className="font-sans text-[10px] tracking-[0.35em] text-charcoal/40 mb-8">SEND A MESSAGE</p>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    {['FIRST NAME', 'LAST NAME'].map(l => (
                      <div key={l} className="border border-charcoal/15">
                        <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">{l}</label>
                        <input type="text" className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none" placeholder="—" />
                      </div>
                    ))}
                  </div>
                  <div className="border border-charcoal/15">
                    <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">EMAIL ADDRESS</label>
                    <input type="email" className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none" placeholder="your@email.com" />
                  </div>
                  <div className="border border-charcoal/15">
                    <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">SUBJECT</label>
                    <select className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none appearance-none">
                      <option value="">Select a topic</option>
                      <option>Reservation Enquiry</option>
                      <option>Villa Information</option>
                      <option>Special Occasions</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                  <div className="border border-charcoal/15">
                    <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">MESSAGE</label>
                    <textarea rows={4} className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none resize-none" placeholder="How can we help you..." />
                  </div>
                  <button className="w-full bg-ocean text-softwhite font-sans text-[11px] tracking-[0.25em] py-4 hover:bg-gold transition-colors duration-300">SEND MESSAGE</button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={u(IMGS.finalCta, 2400, 1350)} alt="Leave the ordinary behind" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/25 via-midnight/45 to-midnight/75" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="font-sans text-[10px] tracking-[0.5em] text-gold mb-6">PAULENFUSHI RESORT &amp; SPA · MALDIVES</p>
          <h2 className="font-serif font-light text-5xl lg:text-7xl xl:text-8xl italic text-softwhite mb-8 leading-tight">&ldquo;Leave the ordinary behind.&rdquo;</h2>
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <button onClick={() => onNavigate('book')} className="font-sans text-[11px] tracking-[0.28em] bg-softwhite text-midnight px-12 py-4 hover:bg-gold hover:text-softwhite transition-all duration-300">BOOK YOUR STAY</button>
            <button onClick={() => onNavigate('villas')} className="font-sans text-[11px] tracking-[0.28em] border border-softwhite/40 text-softwhite px-12 py-4 hover:bg-softwhite hover:text-midnight transition-all duration-300">EXPLORE VILLAS</button>
          </div>
        </div>
      </section>
    </div>
  );
}
