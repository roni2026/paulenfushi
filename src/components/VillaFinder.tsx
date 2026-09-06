import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavigateFn } from '../App';

const u = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

interface Villa {
  id: number;
  name: string;
  tagline: string;
  price: string;
  size: string;
  guests: number;
  pool: boolean;
  beach: boolean;
  sunset: boolean;
  water: boolean;
  privacy: boolean;
  img: string;
  features: string[];
}

const villas: Villa[] = [
  {
    id: 0, name: 'Beach Villa', tagline: 'Wake to the sound of the tide.',
    price: 'From $450', size: '120 sqm', guests: 2, pool: false, beach: true, sunset: false, water: false, privacy: false,
    img: '1609601546193-f558f1ebb385', features: ['Beach access', 'King bedroom', 'Rain shower', 'Ocean view'],
  },
  {
    id: 1, name: 'Beach Villa with Pool', tagline: 'Sand, palms, and your own pool.',
    price: 'From $750', size: '180 sqm', guests: 2, pool: true, beach: true, sunset: false, water: false, privacy: true,
    img: '1540541338287-41700207dee6', features: ['Private pool', 'Beach access', 'Sunset terrace', 'Garden'],
  },
  {
    id: 2, name: 'Water Villa', tagline: 'Wake above the lagoon.',
    price: 'From $850', size: '150 sqm', guests: 2, pool: false, beach: false, sunset: false, water: true, privacy: true,
    img: '1590523277543-a94d2e4eb00b', features: ['Lagoon access', 'Glass floor', 'Private deck', 'Bathtub'],
  },
  {
    id: 3, name: 'Water Villa with Pool', tagline: 'Infinity meets the horizon.',
    price: 'From $1,200', size: '210 sqm', guests: 3, pool: true, beach: false, sunset: true, water: true, privacy: true,
    img: '1561501900-3701fa6a0864', features: ['Infinity pool', 'Ocean access', 'Butler service', 'Sunset views'],
  },
  {
    id: 4, name: 'Sunset Water Villa', tagline: 'Golden hour, every evening.',
    price: 'From $1,400', size: '160 sqm', guests: 2, pool: false, beach: false, sunset: true, water: true, privacy: false,
    img: '1620483829312-71b2ec172fd0', features: ['Sunset-facing', 'Private deck', 'Outdoor dining', 'Bathtub'],
  },
  {
    id: 5, name: 'Two-Bedroom Residence', tagline: 'Space for those you love.',
    price: 'From $2,200', size: '350 sqm', guests: 4, pool: true, beach: true, sunset: false, water: false, privacy: true,
    img: '1595184979141-090792f6b578', features: ['2 bedrooms', 'Private pool', 'Large living', 'Host service'],
  },
  {
    id: 6, name: 'Private Residence', tagline: 'The island, entirely yours.',
    price: 'From $8,500', size: '600+ sqm', guests: 10, pool: true, beach: true, sunset: true, water: false, privacy: true,
    img: '1698726654908-834d3a5330d8', features: ['Private beach', 'Personal chef', 'Yacht charter', 'Dining pavilion'],
  },
];

const filters = [
  { key: 'beach', label: 'BEACH', sub: 'Steps from the sand' },
  { key: 'water', label: 'LAGOON', sub: 'Above the ocean' },
  { key: 'pool', label: 'PRIVATE POOL', sub: 'Your own infinity' },
  { key: 'sunset', label: 'SUNSET VIEWS', sub: 'Golden hour, every day' },
  { key: 'privacy', label: 'ULTIMATE PRIVACY', sub: 'Secluded sanctuaries' },
] as const;

const compareFields = [
  { key: 'size', label: 'Size' },
  { key: 'guests', label: 'Max Guests' },
  { key: 'pool', label: 'Private Pool' },
  { key: 'beach', label: 'Beach Access' },
  { key: 'water', label: 'Overwater' },
  { key: 'sunset', label: 'Sunset Views' },
  { key: 'privacy', label: 'Secluded' },
] as const;

export default function VillaFinder({ onNavigate }: { onNavigate: NavigateFn }) {
  const [selected, setSelected] = useState<Set<keyof Villa>>(new Set());
  const [compareMode, setCompareMode] = useState(false);
  const [comparing, setComparing] = useState<number[]>([]);

  const toggle = (key: keyof Villa) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const filtered = villas.filter(v => {
    if (selected.size === 0) return true;
    return Array.from(selected).every(k => v[k] === true);
  });

  const toggleCompare = (id: number) => {
    setComparing(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const compareVillas = villas.filter(v => comparing.includes(v.id));

  return (
    <section className="bg-ivory py-24 lg:py-36">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-5">
            <span className="w-8 h-px bg-gold" />
            <p className="font-sans text-[10px] tracking-[0.45em] text-gold">VILLA DISCOVERY</p>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal leading-tight mb-3">
            Where would you like<br />to wake up?
          </h2>
          <p className="font-sans text-sm text-charcoal/50 leading-relaxed">Select what matters most to you.</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map(f => {
            const active = selected.has(f.key as keyof Villa);
            return (
              <motion.button
                key={f.key}
                onClick={() => toggle(f.key as keyof Villa)}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-3 border font-sans text-[10px] tracking-[0.25em] transition-all duration-400 flex flex-col items-start gap-0.5 ${
                  active
                    ? 'bg-ocean border-ocean text-softwhite'
                    : 'bg-transparent border-charcoal/20 text-charcoal/70 hover:border-gold hover:text-charcoal'
                }`}
              >
                <span>{f.label}</span>
                <span className={`text-[9px] tracking-normal font-normal ${active ? 'text-softwhite/50' : 'text-charcoal/35'}`}>
                  {f.sub}
                </span>
              </motion.button>
            );
          })}
          {selected.size > 0 && (
            <button onClick={() => setSelected(new Set())} className="px-4 py-3 font-sans text-[9px] tracking-[0.2em] text-charcoal/35 hover:text-gold transition-colors border border-transparent hover:border-charcoal/10">
              CLEAR ALL ×
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mb-8">
          <p className="font-sans text-[10px] tracking-[0.2em] text-charcoal/40">
            {filtered.length} {filtered.length === 1 ? 'VILLA' : 'VILLAS'} FOUND
          </p>
          <button
            onClick={() => { setCompareMode(!compareMode); setComparing([]); }}
            className={`font-sans text-[10px] tracking-[0.25em] px-4 py-2 border transition-all duration-300 ${
              compareMode ? 'bg-ocean border-ocean text-softwhite' : 'border-charcoal/20 text-charcoal/50 hover:border-gold hover:text-charcoal'
            }`}
          >
            COMPARE VILLAS {compareMode && comparing.length > 0 ? `(${comparing.length})` : ''}
          </button>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map(v => {
              const isInCompare = comparing.includes(v.id);
              return (
                <motion.div
                  key={v.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`bg-softwhite group cursor-pointer border-2 transition-all duration-300 ${
                    isInCompare ? 'border-gold' : 'border-transparent'
                  }`}
                  onClick={() => compareMode ? toggleCompare(v.id) : onNavigate('villa-detail', v.id)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={u(v.img)} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {v.pool && (
                      <div className="absolute top-3 left-3 bg-gold text-midnight font-sans text-[8px] tracking-[0.2em] px-2 py-1">POOL</div>
                    )}
                    {compareMode && (
                      <div className={`absolute top-3 right-3 w-6 h-6 border flex items-center justify-center transition-all duration-200 ${
                        isInCompare ? 'bg-gold border-gold' : 'bg-midnight/50 border-softwhite/40'
                      }`}>
                        {isInCompare && <span className="text-midnight text-xs font-bold">✓</span>}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-charcoal mb-1">{v.name}</h3>
                    <p className="font-sans text-xs text-charcoal/45 italic mb-4">{v.tagline}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {v.features.slice(0, 3).map(f => (
                        <span key={f} className="font-sans text-[9px] tracking-[0.05em] text-charcoal/50 bg-sand px-2 py-1">{f}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-charcoal/8">
                      <div>
                        <p className="font-sans text-[8px] tracking-[0.2em] text-charcoal/35">FROM</p>
                        <p className="font-serif text-lg text-charcoal">{v.price}<span className="font-sans text-xs text-charcoal/35 ml-1">/ night</span></p>
                      </div>
                      <span className="font-sans text-[9px] tracking-[0.2em] text-ocean/60 group-hover:text-gold transition-colors">
                        {compareMode ? (isInCompare ? 'SELECTED' : 'SELECT') : 'VIEW VILLA →'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {compareMode && comparing.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="mt-16 bg-softwhite border border-charcoal/8 overflow-x-auto"
            >
              <div className="p-8 border-b border-charcoal/8">
                <p className="font-sans text-[10px] tracking-[0.35em] text-gold">COMPARISON</p>
                <h3 className="font-serif text-2xl text-charcoal mt-1">Side by side</h3>
              </div>
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-charcoal/8">
                    <th className="text-left p-6 font-sans text-[9px] tracking-[0.3em] text-charcoal/40 font-normal w-40">FEATURE</th>
                    {compareVillas.map(v => (
                      <th key={v.id} className="p-6 font-serif text-base text-charcoal font-light text-left">{v.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareFields.map(f => (
                    <tr key={f.key} className="border-b border-charcoal/5">
                      <td className="p-6 font-sans text-[10px] tracking-[0.2em] text-charcoal/40">{f.label}</td>
                      {compareVillas.map(v => {
                        const val = v[f.key as keyof Villa];
                        return (
                          <td key={v.id} className="p-6 font-sans text-sm text-charcoal">
                            {typeof val === 'boolean' ? (
                              val
                                ? <span className="text-gold">✓</span>
                                : <span className="text-charcoal/20">—</span>
                            ) : String(val)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-6" />
                    {compareVillas.map(v => (
                      <td key={v.id} className="p-6">
                        <button
                          onClick={() => onNavigate('book')}
                          className="font-sans text-[10px] tracking-[0.22em] bg-ocean text-softwhite px-5 py-2.5 hover:bg-gold transition-colors duration-300"
                        >
                          BOOK
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
