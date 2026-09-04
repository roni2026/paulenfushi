import { useState } from 'react';
import type { NavigateFn } from '../App';

const u = (id: string, w = 1920, h = 1080) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const villas = [
  { num: '01', name: 'Beach Villa', tagline: 'Barefoot luxury, steps from the sea.', img: '1609601546193-f558f1ebb385', imgs: ['1609601546193-f558f1ebb385', '1582719508461-905c673771fd', '1611818830473-ab5d21f401ce', '1623137285532-ec3df3e9abc7'], features: ['Direct beach access', 'King bedroom', 'Rain shower', 'Ocean view', 'Outdoor terrace', 'Private garden', 'Air conditioning', 'Wi-Fi'], size: '120 sqm', guests: '2', desc: 'A private beachfront haven where warm sands meet cool ocean breezes. The Beach Villa at Paulenfushi is a sanctuary of understated luxury.' },
  { num: '02', name: 'Beach Villa with Pool', tagline: 'An expansive beachfront retreat.', img: '1540541338287-41700207dee6', imgs: ['1540541338287-41700207dee6', '1561501900-3701fa6a0864', '1532592068623-db1978e40df5', '1762961881563-66852e1e4527'], features: ['Private pool', 'Direct beach access', 'Sunset terrace', 'Outdoor shower', 'King bedroom', 'Private garden', 'Air conditioning', 'Wi-Fi'], size: '180 sqm', guests: '2', desc: 'Step from your private pool to pristine white sand. The Beach Villa with Pool offers an unmatched level of seclusion.' },
  { num: '03', name: 'Water Villa', tagline: 'Suspended above the lagoon.', img: '1590523277543-a94d2e4eb00b', imgs: ['1590523277543-a94d2e4eb00b', '1609601546193-f558f1ebb385', '1620483829312-71b2ec172fd0', '1595184979141-090792f6b578'], features: ['Direct lagoon access', 'Glass floor section', 'Private deck', 'Outdoor bathtub', 'Ocean views', 'Sunset-facing terrace', 'Air conditioning', 'Wi-Fi'], size: '150 sqm', guests: '2', desc: 'Perched over the glass-still lagoon, the Water Villa offers an extraordinary connection with the Indian Ocean.' },
  { num: '04', name: 'Water Villa with Pool', tagline: 'A signature overwater residence.', img: '1561501900-3701fa6a0864', imgs: ['1561501900-3701fa6a0864', '1590523277543-a94d2e4eb00b', '1551918120-9739cb430c6d', '1620483829312-71b2ec172fd0'], features: ['Private infinity pool', 'Direct ocean access', 'Overwater deck', 'Outdoor bathtub', 'Sunset views', 'Butler service', 'Air conditioning', 'Wi-Fi'], size: '210 sqm', guests: '2–3', desc: 'Our signature overwater experience. The private infinity pool appears to merge seamlessly with the horizon.' },
  { num: '05', name: 'Sunset Water Villa', tagline: 'Designed for the golden hour.', img: '1620483829312-71b2ec172fd0', imgs: ['1620483829312-71b2ec172fd0', '1590523277543-a94d2e4eb00b', '1613895571415-90c5853c6e36', '1755493872646-5b64e70d6077'], features: ['Sunset-facing', 'Private deck', 'Ocean access', 'Outdoor dining', 'King bedroom', 'Bathtub', 'Air conditioning', 'Wi-Fi'], size: '160 sqm', guests: '2', desc: 'Perfectly positioned to capture the Maldivian sunset in its full magnificence.' },
  { num: '06', name: 'Two-Bedroom Beach Residence', tagline: 'More space. More memories.', img: '1595184979141-090792f6b578', imgs: ['1595184979141-090792f6b578', '1609601546193-f558f1ebb385', '1540541338287-41700207dee6', '1777906718328-deb1ff1be508'], features: ['Two bedrooms', 'Private pool', 'Large living room', 'Private garden', 'Direct beach access', 'Dedicated host', 'Air conditioning', 'Wi-Fi'], size: '350 sqm', guests: '4', desc: 'Generously proportioned for families and small groups, the Two-Bedroom Beach Residence offers all the space and privacy of a private home.' },
  { num: '07', name: 'Paulenfushi Private Residence', tagline: 'The island is yours.', img: '1698726654908-834d3a5330d8', imgs: ['1698726654908-834d3a5330d8', '1595184979141-090792f6b578', '1561501900-3701fa6a0864', '1777906718328-deb1ff1be508'], features: ['Multiple bedrooms', 'Private pool', 'Private beach', 'Personal host', 'Dining pavilion', 'Large outdoor living', 'Air conditioning', 'Wi-Fi'], size: 'From 600 sqm', guests: 'Up to 10', desc: 'The most exclusive address on the island. The Paulenfushi Private Residence encompasses multiple sleeping pavilions and a private stretch of beach.' },
];

const tabs = ['OVERVIEW', 'AMENITIES', 'FLOOR PLAN', 'LOCATION'];

export default function VillaDetail({ villaId, onNavigate }: { villaId: number; onNavigate: NavigateFn }) {
  const villa = villas[villaId] || villas[0];
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <div className="pt-16 lg:pt-[72px]">
      <section className="relative h-[70vh] overflow-hidden">
        <img src={u(villa.img, 2400, 1350)} alt={villa.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/30 to-midnight/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-sans text-[10px] tracking-[0.4em] text-gold mb-3">{villa.num} — VILLA</p>
          <h1 className="font-serif text-4xl lg:text-6xl xl:text-7xl font-light text-softwhite mb-4">{villa.name}</h1>
          <p className="font-serif italic text-xl text-softwhite/80">{villa.tagline}</p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="flex gap-8 border-b border-charcoal/10 mb-10">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-sans text-[11px] tracking-[0.2em] pb-4 border-b-2 transition-all duration-300 ${activeTab === tab ? 'border-gold text-charcoal' : 'border-transparent text-charcoal/40 hover:text-charcoal/70'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'OVERVIEW' && (
              <div>
                <div className="flex gap-8 mb-8">
                  <div><p className="font-sans text-[10px] tracking-[0.25em] text-gold">SIZE</p><p className="font-serif text-xl text-charcoal mt-1">{villa.size}</p></div>
                  <div><p className="font-sans text-[10px] tracking-[0.25em] text-gold">GUESTS</p><p className="font-serif text-xl text-charcoal mt-1">{villa.guests}</p></div>
                  <div><p className="font-sans text-[10px] tracking-[0.25em] text-gold">VILLA</p><p className="font-serif text-xl text-charcoal mt-1">{villa.num}</p></div>
                </div>
                <p className="font-sans text-base text-charcoal/60 leading-loose mb-8">{villa.desc}</p>
                <div className="grid grid-cols-2 gap-4">
                  {villa.imgs.map((imgId, idx) => (
                    <div
                      key={idx}
                      className={`img-hover-zoom cursor-pointer ${idx === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
                      onClick={() => setLightboxIdx(idx)}
                    >
                      <img src={u(imgId, 800, 600)} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'AMENITIES' && (
              <div className="grid grid-cols-2 gap-4">
                {villa.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 py-3 border-b border-charcoal/10">
                    <span className="w-5 h-px bg-gold flex-shrink-0" />
                    <span className="font-sans text-sm text-charcoal/70">{f}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'FLOOR PLAN' && (
              <div className="bg-sand aspect-video flex items-center justify-center">
                <div className="text-center">
                  <p className="font-sans text-[10px] tracking-[0.3em] text-gold mb-2">FLOOR PLAN</p>
                  <p className="font-serif text-2xl text-charcoal">{villa.name}</p>
                  <p className="font-sans text-sm text-charcoal/50 mt-2">{villa.size}</p>
                </div>
              </div>
            )}

            {activeTab === 'LOCATION' && (
              <div className="bg-ocean aspect-video flex items-center justify-center relative overflow-hidden">
                <img src={u('1688949078626-a358f500e063', 900, 500)} alt="Island map" className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-sans text-[10px] tracking-[0.3em] text-gold mb-2">LOCATION</p>
                    <p className="font-serif text-2xl text-softwhite">Paulenfushi Island</p>
                    <p className="font-sans text-sm text-softwhite/50 mt-2">North Malé Atoll, Maldives</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-ivory p-8">
              <p className="font-sans text-[10px] tracking-[0.35em] text-gold mb-5">RESERVE YOUR VILLA</p>
              <h3 className="font-serif text-2xl text-charcoal mb-6">{villa.name}</h3>
              <div className="flex flex-col gap-3 mb-6">
                {[{ label: 'CHECK-IN', placeholder: 'Select date' }, { label: 'CHECK-OUT', placeholder: 'Select date' }].map((f) => (
                  <div key={f.label} className="border border-charcoal/15">
                    <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">{f.label}</label>
                    <input type="date" className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none" />
                  </div>
                ))}
                <div className="border border-charcoal/15">
                  <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">GUESTS</label>
                  <select className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none appearance-none">
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => onNavigate('book')}
                className="w-full bg-ocean text-softwhite font-sans text-[11px] tracking-[0.25em] py-4 hover:bg-gold transition-colors duration-300 mb-5"
              >
                CHECK AVAILABILITY
              </button>
              <p className="font-sans text-xs text-charcoal/40 text-center leading-relaxed">
                Or contact our reservations team for tailored assistance.
              </p>
              <a href="mailto:reservations@paulenfushi.com" className="block font-sans text-xs text-gold text-center mt-1 hover:underline">
                reservations@paulenfushi.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-10 border-t border-charcoal/10">
        <div className="flex justify-between items-center">
          {villaId > 0 && (
            <button onClick={() => onNavigate('villa-detail', villaId - 1)} className="font-sans text-[11px] tracking-[0.2em] text-charcoal/50 hover:text-charcoal transition-colors">
              &larr; PREVIOUS VILLA
            </button>
          )}
          <button onClick={() => onNavigate('villas')} className="font-sans text-[11px] tracking-[0.2em] text-charcoal/50 hover:text-charcoal transition-colors mx-auto">
            ALL VILLAS
          </button>
          {villaId < villas.length - 1 && (
            <button onClick={() => onNavigate('villa-detail', villaId + 1)} className="font-sans text-[11px] tracking-[0.2em] text-charcoal/50 hover:text-charcoal transition-colors">
              NEXT VILLA &rarr;
            </button>
          )}
        </div>
      </div>

      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-midnight/95 flex items-center justify-center"
          onClick={() => setLightboxIdx(null)}
        >
          <img
            src={u(villa.imgs[lightboxIdx], 1600, 1000)}
            alt=""
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-8 font-sans text-sm text-softwhite/60 hover:text-softwhite tracking-widest"
            onClick={() => setLightboxIdx(null)}
          >
            CLOSE ✕
          </button>
          <button
            className="absolute left-8 top-1/2 -translate-y-1/2 text-softwhite/60 hover:text-softwhite text-3xl"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + villa.imgs.length) % villa.imgs.length); }}
          >
            &lsaquo;
          </button>
          <button
            className="absolute right-8 top-1/2 -translate-y-1/2 text-softwhite/60 hover:text-softwhite text-3xl"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % villa.imgs.length); }}
          >
            &rsaquo;
          </button>
        </div>
      )}
    </div>
  );
}
