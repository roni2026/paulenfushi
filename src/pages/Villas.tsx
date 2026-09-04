import { useState } from 'react';
import type { NavigateFn } from '../App';

const u = (id: string, w = 1920, h = 1080) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const villas = [
  {
    num: '01', name: 'Beach Villa', tagline: 'Barefoot luxury, steps from the sea.',
    price: 450, size: '120 sqm', guests: 2, pool: false, beach: true, overwater: false,
    img: '1609601546193-f558f1ebb385',
    features: ['Direct beach access', 'King bedroom', 'Rain shower', 'Outdoor terrace', 'Ocean view', 'Private garden', 'Wi-Fi', 'Air conditioning'],
    desc: 'A private beachfront haven where warm sands meet cool ocean breezes. Every detail created around the natural beauty of the Maldivian coast.',
  },
  {
    num: '02', name: 'Beach Villa with Pool', tagline: 'Your own private pool, your own pristine shore.',
    price: 750, size: '180 sqm', guests: 2, pool: true, beach: true, overwater: false,
    img: '1540541338287-41700207dee6',
    features: ['Private pool', 'Direct beach access', 'Sunset terrace', 'Outdoor shower', 'King bedroom', 'Private garden', 'Wi-Fi', 'Air conditioning'],
    desc: "Step from your private pool to pristine white sand. Lush tropical gardens create a natural screen around your personal paradise.",
  },
  {
    num: '03', name: 'Water Villa', tagline: 'Suspended above the crystal-clear lagoon.',
    price: 850, size: '150 sqm', guests: 2, pool: false, beach: false, overwater: true,
    img: '1590523277543-a94d2e4eb00b',
    features: ['Direct lagoon access', 'Glass floor section', 'Private deck', 'Outdoor bathtub', 'Ocean views', 'Sunset terrace', 'Wi-Fi', 'Air conditioning'],
    desc: "Perched over the glass-still lagoon. A glass floor panel reveals the marine world below, while your private deck invites long evenings watching the sun descend.",
  },
  {
    num: '04', name: 'Water Villa with Pool', tagline: 'Where the infinity pool meets the horizon.',
    price: 1200, size: '210 sqm', guests: 3, pool: true, beach: false, overwater: true,
    img: '1561501900-3701fa6a0864',
    features: ['Private infinity pool', 'Direct ocean access', 'Overwater deck', 'Outdoor bathtub', 'Sunset views', 'Butler service', 'Wi-Fi', 'Air conditioning'],
    desc: "A signature overwater residence. The private infinity pool appears to merge with the horizon. Personalised butler service ensures every detail is curated with care.",
  },
  {
    num: '05', name: 'Sunset Water Villa', tagline: 'Designed for the Maldivian golden hour.',
    price: 1400, size: '160 sqm', guests: 2, pool: false, beach: false, overwater: true,
    img: '1620483829312-71b2ec172fd0',
    features: ['Sunset-facing', 'Private deck', 'Ocean access', 'Outdoor dining', 'King bedroom', 'Bathtub', 'Wi-Fi', 'Air conditioning'],
    desc: "Perfectly oriented to capture the most spectacular Maldivian sunsets. Each evening the sky transforms into a canvas of amber and rose.",
  },
  {
    num: '06', name: 'Two-Bedroom Beach Residence', tagline: 'More space. More time. More memories.',
    price: 2200, size: '350 sqm', guests: 4, pool: true, beach: true, overwater: false,
    img: '1595184979141-090792f6b578',
    features: ['Two bedrooms', 'Private pool', 'Large living room', 'Private garden', 'Direct beach access', 'Dedicated host', 'Wi-Fi', 'Air conditioning'],
    desc: "Generously proportioned for families and small groups. All the space and privacy of a private home, enhanced by the full Paulenfushi service experience.",
  },
  {
    num: '07', name: 'Paulenfushi Private Residence', tagline: 'The island is yours.',
    price: 8500, size: '600+ sqm', guests: 10, pool: true, beach: true, overwater: false,
    img: '1698726654908-834d3a5330d8',
    features: ['Multiple bedrooms', 'Private pool', 'Private beach', 'Personal host', 'Dining pavilion', 'Large outdoor living', 'Wi-Fi', 'Air conditioning'],
    desc: "The most exclusive address on the island. Multiple sleeping pavilions, a private stretch of beach and a dining pavilion for intimate evenings beneath the stars.",
  },
];

type Filter = 'ALL' | 'BEACH' | 'OVERWATER' | 'POOL';

export default function Villas({ onNavigate }: { onNavigate: NavigateFn }) {
  const [filter, setFilter] = useState<Filter>('ALL');

  const filtered = villas.filter((v) => {
    if (filter === 'BEACH') return v.beach;
    if (filter === 'OVERWATER') return v.overwater;
    if (filter === 'POOL') return v.pool;
    return true;
  });

  return (
    <div className="pt-16 lg:pt-[72px]">
      <section className="relative h-[60vh] overflow-hidden">
        <img src={u('1514282401047-d79a71a590e8', 2400, 1350)} alt="Paulenfushi villas" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/50 via-midnight/25 to-midnight/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-sans text-[10px] tracking-[0.5em] text-gold mb-4">ACCOMMODATIONS</p>
          <h1 className="font-serif text-5xl lg:text-7xl font-light text-softwhite leading-none mb-4">Villas &amp; Suites</h1>
          <p className="font-sans text-sm text-softwhite/50 max-w-md tracking-wide">
            Seven distinct residences on one pristine private island.
          </p>
        </div>
      </section>

      <div className="bg-ivory sticky top-[72px] lg:top-[102px] z-20 border-b border-charcoal/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-1">
            {(['ALL', 'BEACH', 'OVERWATER', 'POOL'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-sans text-[10px] tracking-[0.22em] px-4 py-2 transition-all duration-300 ${
                  filter === f
                    ? 'bg-ocean text-softwhite'
                    : 'text-charcoal/50 hover:text-charcoal hover:bg-sand'
                }`}
              >
                {f === 'ALL' ? `ALL (${villas.length})` : f}
              </button>
            ))}
          </div>
          <p className="font-sans text-xs text-charcoal/40 hidden sm:block">
            {filtered.length} villa{filtered.length !== 1 ? 's' : ''} &middot; Paulenfushi, Maldives
          </p>
        </div>
      </div>

      <section className="bg-softwhite py-0">
        <div className="max-w-[1440px] mx-auto">
          {filtered.map((v, idx) => {
            const realIdx = villas.indexOf(v);
            return (
              <div key={v.num} className={`grid grid-cols-1 lg:grid-cols-2 border-b border-charcoal/8 ${idx % 2 === 1 ? 'bg-ivory' : 'bg-softwhite'}`}>
                <div className={`relative img-hover-zoom overflow-hidden ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[16/11]">
                    <img src={u(v.img, 900, 620)} alt={v.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-5 left-5 flex gap-2">
                    {v.pool && <span className="bg-gold text-midnight font-sans text-[9px] tracking-[0.2em] px-2.5 py-1.5">POOL</span>}
                    {v.overwater && <span className="bg-ocean text-softwhite font-sans text-[9px] tracking-[0.2em] px-2.5 py-1.5">OVERWATER</span>}
                    {v.beach && !v.overwater && <span className="bg-palm text-softwhite font-sans text-[9px] tracking-[0.2em] px-2.5 py-1.5">BEACHFRONT</span>}
                  </div>
                  <div className="absolute bottom-5 left-5 bg-midnight/70 backdrop-blur-sm px-3 py-1.5">
                    <span className="font-sans text-[10px] tracking-[0.2em] text-softwhite/60">{v.num}</span>
                  </div>
                </div>

                <div className={`px-8 lg:px-14 py-12 flex flex-col justify-center ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-start justify-between mb-1">
                    <h2 className="font-serif text-3xl lg:text-4xl font-light text-charcoal">{v.name}</h2>
                  </div>
                  <p className="font-serif italic text-base text-palm mb-6">{v.tagline}</p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-1.5 bg-sand px-3 py-2">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="10" height="10" rx="1" stroke="#53665A" strokeWidth="1.2"/></svg>
                      <span className="font-sans text-[10px] tracking-[0.1em] text-charcoal/60">{v.size}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-sand px-3 py-2">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2.5" stroke="#53665A" strokeWidth="1.2"/><path d="M2 11c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#53665A" strokeWidth="1.2"/></svg>
                      <span className="font-sans text-[10px] tracking-[0.1em] text-charcoal/60">Up to {v.guests} guests</span>
                    </div>
                    {v.pool && (
                      <div className="flex items-center gap-1.5 bg-gold/10 px-3 py-2">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 7.5c1-1 2-1 3 0s2 1 3 0 2-1 3 0" stroke="#B59A68" strokeWidth="1.2" strokeLinecap="round"/><rect x="1" y="3" width="10" height="5" rx="1" stroke="#B59A68" strokeWidth="1.2"/></svg>
                        <span className="font-sans text-[10px] tracking-[0.1em] text-gold">Private pool</span>
                      </div>
                    )}
                  </div>

                  <p className="font-sans text-[14px] text-charcoal/60 leading-[1.8] mb-7 max-w-md">{v.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {v.features.slice(0, 6).map((f) => (
                      <span key={f} className="font-sans text-[10px] tracking-[0.05em] text-charcoal/55 border border-charcoal/15 px-3 py-1.5">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-charcoal/10">
                    <div>
                      <p className="font-sans text-[9px] tracking-[0.25em] text-charcoal/35 mb-0.5">FROM</p>
                      <p className="font-serif text-2xl text-charcoal">
                        ${v.price.toLocaleString()}
                        <span className="font-sans text-xs text-charcoal/40 ml-1">/ night</span>
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => onNavigate('villa-detail', realIdx)}
                        className="font-sans text-[10px] tracking-[0.2em] text-ocean border border-ocean/40 px-5 py-2.5 hover:bg-ocean hover:text-softwhite transition-all duration-300"
                      >
                        VIEW DETAILS
                      </button>
                      <button
                        onClick={() => onNavigate('book')}
                        className="font-sans text-[10px] tracking-[0.2em] bg-ocean text-softwhite px-5 py-2.5 hover:bg-gold transition-colors duration-300"
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-ocean py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl lg:text-3xl text-softwhite font-light mb-2">Not sure which villa is right for you?</h3>
            <p className="font-sans text-sm text-softwhite/50">Our reservations team will help you choose the perfect residence for your stay.</p>
          </div>
          <div className="flex gap-4 flex-none">
            <button onClick={() => onNavigate('book')} className="font-sans text-[11px] tracking-[0.25em] bg-gold text-midnight px-8 py-3 hover:bg-softwhite transition-colors duration-300">
              ENQUIRE NOW
            </button>
            <a href="tel:+9604007000" className="font-sans text-[11px] tracking-[0.25em] border border-softwhite/25 text-softwhite px-8 py-3 hover:bg-softwhite hover:text-midnight transition-all duration-300">
              CALL US
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
