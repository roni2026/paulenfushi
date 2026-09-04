import { useState } from 'react';

const u = (id: string, w = 1920, h = 1080) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

type Category = 'ALL' | 'VILLAS' | 'ISLAND' | 'DINING' | 'SPA' | 'EXPERIENCES' | 'PEOPLE';

const allImages: { id: string; cat: Category; alt: string; wide?: boolean }[] = [
  { id: '1514282401047-d79a71a590e8', cat: 'ISLAND', alt: 'Aerial view of the island', wide: true },
  { id: '1590523277543-a94d2e4eb00b', cat: 'VILLAS', alt: 'Overwater villa' },
  { id: '1609601546193-f558f1ebb385', cat: 'VILLAS', alt: 'Beach villa dock' },
  { id: '1777906718328-deb1ff1be508', cat: 'DINING', alt: 'Outdoor dining by the ocean' },
  { id: '1532592068623-db1978e40df5', cat: 'SPA', alt: 'Spa candlelight' },
  { id: '1623137285532-ec3df3e9abc7', cat: 'PEOPLE', alt: 'Couple walking the beach' },
  { id: '1561501900-3701fa6a0864', cat: 'VILLAS', alt: 'Infinity pool villa', wide: true },
  { id: '1613895571415-90c5853c6e36', cat: 'EXPERIENCES', alt: 'Sailboat at sunset' },
  { id: '1646166468261-b18339c92fda', cat: 'SPA', alt: 'Yoga on the beach' },
  { id: '1620483829312-71b2ec172fd0', cat: 'VILLAS', alt: 'Sunset overwater villa' },
  { id: '1762961881563-66852e1e4527', cat: 'PEOPLE', alt: 'Couple on sandbar' },
  { id: '1755493872646-5b64e70d6077', cat: 'DINING', alt: 'Beachside dining sunset' },
  { id: '1595184979141-090792f6b578', cat: 'VILLAS', alt: 'Overwater villas aerial' },
  { id: '1688949078626-a358f500e063', cat: 'ISLAND', alt: 'Island from above' },
  { id: '1698726654908-834d3a5330d8', cat: 'ISLAND', alt: 'Resort aerial view', wide: true },
  { id: '1611818830473-ab5d21f401ce', cat: 'SPA', alt: 'Spa flower detail' },
  { id: '1680956987771-243a7a47bc9c', cat: 'DINING', alt: 'Fine dining table setting' },
  { id: '1540541338287-41700207dee6', cat: 'VILLAS', alt: 'Villa pool ocean view' },
  { id: '1607340696730-3a73c584dc92', cat: 'EXPERIENCES', alt: 'Sunset silhouette' },
  { id: '1531429957-9e7c26e39c84', cat: 'EXPERIENCES', alt: 'Sailing on the sea' },
  { id: '1671211085251-c49156a49621', cat: 'SPA', alt: 'Beach yoga sunset' },
  { id: '1575231902142-29aaec0bd547', cat: 'ISLAND', alt: 'Seashore villa cabin' },
  { id: '1582719508461-905c673771fd', cat: 'ISLAND', alt: 'Lounge chairs on deck' },
  { id: '1551918120-9739cb430c6d', cat: 'VILLAS', alt: 'Villa pool woman' },
];

const categories: Category[] = ['ALL', 'VILLAS', 'ISLAND', 'DINING', 'SPA', 'EXPERIENCES', 'PEOPLE'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === 'ALL' ? allImages : allImages.filter((img) => img.cat === activeCategory);

  return (
    <div className="pt-16 lg:pt-[72px]">
      <section className="bg-ocean pt-20 pb-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 text-center">
          <p className="font-sans text-[10px] tracking-[0.45em] text-gold mb-5">PHOTOGRAPHY</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-light text-softwhite">The Gallery</h1>
          <p className="font-sans text-sm text-softwhite/50 mt-4">
            {allImages.length} photographs &middot; Paulenfushi Resort &amp; Spa
          </p>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 mt-10">
          <div className="flex gap-6 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-sans text-[11px] tracking-[0.22em] pb-2 border-b transition-all duration-300 ${
                  activeCategory === cat
                    ? 'text-gold border-gold'
                    : 'text-softwhite/50 border-transparent hover:text-softwhite/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-midnight py-4 px-4 lg:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3">
          {filtered.map((img, idx) => (
            <div
              key={img.id + idx}
              className="break-inside-avoid mb-3 cursor-pointer img-hover-zoom overflow-hidden relative group"
              onClick={() => setLightbox(idx)}
            >
              <img
                src={u(img.id, 600, img.wide ? 400 : 600)}
                alt={img.alt}
                className="w-full object-cover"
                style={{ aspectRatio: img.wide ? '4/3' : '3/4' }}
              />
              <div className="absolute inset-0 bg-midnight/0 group-hover:bg-midnight/20 transition-colors duration-300" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-sans text-[9px] tracking-[0.25em] text-softwhite/80 bg-midnight/60 px-2 py-1">
                  {img.cat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-midnight/97 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <img
            src={u(filtered[lightbox].id, 1600, 1000)}
            alt={filtered[lightbox].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-8 font-sans text-sm text-softwhite/60 hover:text-softwhite tracking-widest transition-colors"
            onClick={() => setLightbox(null)}
          >
            CLOSE ✕
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="font-sans text-[10px] tracking-[0.2em] text-softwhite/40">{filtered[lightbox].alt}</p>
            <p className="font-sans text-[9px] tracking-[0.2em] text-softwhite/25 mt-1">{lightbox + 1} / {filtered.length}</p>
          </div>
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-softwhite/50 hover:text-softwhite text-4xl transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length); }}
          >
            &lsaquo;
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-softwhite/50 hover:text-softwhite text-4xl transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length); }}
          >
            &rsaquo;
          </button>
        </div>
      )}
    </div>
  );
}
