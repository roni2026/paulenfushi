import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const locations = [
  {
    id: 'villas',
    label: 'Beach Villas',
    x: 30, y: 55,
    img: '1609601546193-f558f1ebb385',
    desc: 'Twelve secluded beach villas nestled between lush palms and the turquoise shore.',
    detail: 'Direct beach access · Private terrace · Outdoor shower',
  },
  {
    id: 'water-villas',
    label: 'Water Villas',
    x: 70, y: 35,
    img: '1590523277543-a94d2e4eb00b',
    desc: 'Overwater sanctuaries extending above the lagoon, where the ocean is your floor.',
    detail: 'Glass floor panel · Private deck · Lagoon access',
  },
  {
    id: 'spa',
    label: 'The Spa',
    x: 45, y: 38,
    img: '1532592068623-db1978e40df5',
    desc: 'A sanctuary of quiet rituals suspended over the water, open to the ocean breeze.',
    detail: 'Treatment rooms · Yoga pavilion · Steam & sauna',
  },
  {
    id: 'lagoon',
    label: 'The Lagoon',
    x: 62, y: 68,
    img: '1514282401047-d79a71a590e8',
    desc: 'Crystal-clear shallow waters stretching to the horizon — ideal for swimming and snorkelling.',
    detail: 'House reef · Marine life · Sandbank nearby',
  },
  {
    id: 'dining',
    label: 'Restaurants',
    x: 38, y: 30,
    img: '1777906718328-deb1ff1be508',
    desc: 'Four dining venues, from barefoot beach dinners to intimate candlelit meals.',
    detail: 'The Lagoon · Palm · The Reef · Sunset Bar',
  },
  {
    id: 'reef',
    label: 'House Reef',
    x: 80, y: 58,
    img: '1762961881563-66852e1e4527',
    desc: 'Our pristine house reef teems with colour and life, accessible directly from your villa.',
    detail: 'Snorkelling · Diving · Manta ray season',
  },
  {
    id: 'pool',
    label: 'Main Pool',
    x: 48, y: 55,
    img: '1561501900-3701fa6a0864',
    desc: "The island's centrepiece — a long infinity pool reflecting the endless sky.",
    detail: 'Poolside service · Sundeck · Cocktail bar',
  },
  {
    id: 'jetty',
    label: 'Jetty',
    x: 22, y: 35,
    img: '1688949078626-a358f500e063',
    desc: 'Arrivals and departures by seaplane or speedboat from your private overwater jetty.',
    detail: 'Seaplane transfers · Sunset departures',
  },
];

export default function IslandMap() {
  const [active, setActive] = useState<typeof locations[0] | null>(null);

  return (
    <section className="bg-midnight py-24 lg:py-36 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-5">
            <span className="w-8 h-px bg-gold" />
            <p className="font-sans text-[10px] tracking-[0.45em] text-gold">EXPLORE THE ISLAND</p>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-softwhite leading-tight max-w-xl">
            Your island, mapped.
          </h2>
          <p className="font-sans text-sm text-softwhite/40 mt-4 max-w-md leading-relaxed">
            Tap any location to discover what awaits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Map SVG */}
          <div className="relative w-full" style={{ paddingBottom: '85%' }}>
            <svg
              viewBox="0 0 100 85"
              className="absolute inset-0 w-full h-full"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <radialGradient id="lagoon-grad" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="#0a4a5e" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#071E24" stopOpacity="0.1" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <ellipse cx="50" cy="48" rx="44" ry="34" fill="url(#lagoon-grad)" />

              <path
                d="M 25 52 C 20 44 22 32 30 28 C 38 22 48 20 55 22 C 65 24 72 28 74 36 C 77 44 74 54 68 60 C 62 66 52 70 42 68 C 32 66 26 60 25 52 Z"
                fill="#1a3a2a"
                stroke="#2a5a3a"
                strokeWidth="0.3"
              />

              <path
                d="M 25 52 C 23 50 22 46 23 44 C 25 46 26 50 25 52 Z"
                fill="#c8a96e"
                opacity="0.6"
              />
              <path
                d="M 60 68 C 56 70 52 70 48 68 C 50 65 56 65 60 68 Z"
                fill="#c8a96e"
                opacity="0.5"
              />

              {[
                [38, 35], [43, 32], [50, 34], [55, 36], [45, 48], [52, 52],
                [40, 58], [48, 60], [35, 50], [60, 44], [55, 46],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="1.2" fill="#2a5a3a" opacity="0.7" />
              ))}

              <line x1="22" y1="35" x2="15" y2="30" stroke="#B59A68" strokeWidth="0.4" opacity="0.6" />
              <line x1="68" y1="38" x2="80" y2="32" stroke="#B59A68" strokeWidth="0.3" opacity="0.4" />
              <line x1="70" y1="40" x2="82" y2="36" stroke="#B59A68" strokeWidth="0.3" opacity="0.4" />

              {locations.map((loc) => {
                const isActive = active?.id === loc.id;
                return (
                  <g
                    key={loc.id}
                    onClick={() => setActive(isActive ? null : loc)}
                    style={{ cursor: 'pointer' }}
                  >
                    {isActive && (
                      <circle
                        cx={loc.x}
                        cy={loc.y}
                        r="4"
                        fill="none"
                        stroke="#B59A68"
                        strokeWidth="0.5"
                        opacity="0.4"
                        className="animate-ping"
                        style={{ transformOrigin: `${loc.x}px ${loc.y}px` }}
                      />
                    )}
                    <circle
                      cx={loc.x}
                      cy={loc.y}
                      r={isActive ? 2 : 1.5}
                      fill={isActive ? '#B59A68' : '#B59A6870'}
                      stroke={isActive ? '#B59A68' : '#B59A6840'}
                      strokeWidth="0.5"
                      style={{ transition: 'all 0.3s ease' }}
                    />
                    <text
                      x={loc.x}
                      y={loc.y - 3.5}
                      textAnchor="middle"
                      fontSize="3"
                      fill={isActive ? '#B59A68' : '#FCFBF760'}
                      fontFamily="system-ui, sans-serif"
                      letterSpacing="0.5"
                      style={{ transition: 'fill 0.3s ease', userSelect: 'none', pointerEvents: 'none' }}
                    >
                      {loc.label.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-full"
                >
                  <div className="aspect-[16/9] overflow-hidden mb-7">
                    <img
                      src={`https://images.unsplash.com/photo-${active.img}?w=900&h=510&fit=crop&auto=format&q=80`}
                      alt={active.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-sans text-[9px] tracking-[0.4em] text-gold mb-3">{active.label.toUpperCase()}</p>
                  <p className="font-serif text-2xl lg:text-3xl font-light text-softwhite leading-snug mb-4">{active.desc}</p>
                  <p className="font-sans text-xs text-softwhite/35 leading-relaxed border-l border-gold/30 pl-4">{active.detail}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center w-full"
                >
                  <div className="w-16 h-px bg-softwhite/10 mx-auto mb-6" />
                  <p className="font-serif text-2xl font-light text-softwhite/20 italic">
                    Select a location
                  </p>
                  <p className="font-sans text-xs text-softwhite/15 mt-3 tracking-[0.2em]">
                    to explore the island
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
