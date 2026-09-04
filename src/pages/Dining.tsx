const u = (id: string, w = 1920, h = 1080) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const restaurants = [
  {
    name: 'The Lagoon',
    type: 'Contemporary Island Cuisine',
    desc: 'Panoramic ocean views serve as the backdrop for inventive seasonal menus celebrating the finest catches of the day and the best of the Indian Ocean.',
    hours: 'Breakfast 7–10am · Dinner 7–10pm',
    img: '1777906718328-deb1ff1be508',
    seats: 60,
  },
  {
    name: 'Palm',
    type: 'All-Day Dining',
    desc: 'Relaxed, open-air dining surrounded by tropical gardens. A place for slow mornings, long lunches and afternoon refreshments beneath the swaying palms.',
    hours: 'Daily 7am–11pm',
    img: '1755493872646-5b64e70d6077',
    seats: 80,
  },
  {
    name: 'The Reef',
    type: 'Fresh Seafood & Maldivian Cuisine',
    desc: 'Fresh Maldivian-inspired dishes celebrate local flavours and seasonal ingredients. A barefoot dining experience where the ocean is never far from view.',
    hours: 'Lunch 12–3pm · Dinner 7–10pm',
    img: '1680956987771-243a7a47bc9c',
    seats: 40,
  },
  {
    name: 'Sunset Bar',
    type: 'Cocktails & Champagne',
    desc: 'Uninterrupted Indian Ocean horizons, signature cocktails and the finest champagnes. The perfect place to mark the end of another perfect day.',
    hours: 'Daily 4pm–midnight',
    img: '1620483829312-71b2ec172fd0',
    seats: 30,
  },
  {
    name: 'Private Dining',
    type: 'Exclusively For You',
    desc: 'A dining experience created entirely for you — on the beach, in your villa, or beneath the stars on a private sandbank. Every table is a memory.',
    hours: 'By arrangement',
    img: '1762961881563-66852e1e4527',
    seats: null,
  },
];

export default function Dining() {
  return (
    <div className="pt-16 lg:pt-[72px]">
      <section className="relative h-[65vh] overflow-hidden">
        <img src={u('1777906718328-deb1ff1be508', 2400, 1350)} alt="Dining at Paulenfushi" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/30 via-midnight/20 to-midnight/75" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-sans text-[10px] tracking-[0.45em] text-gold mb-5">CULINARY EXPERIENCES</p>
          <h1 className="font-serif text-5xl lg:text-7xl font-light text-softwhite italic">Taste the Maldives</h1>
          <p className="font-sans text-sm text-softwhite/60 mt-5 max-w-lg tracking-wide leading-relaxed">
            From barefoot breakfasts overlooking the lagoon to intimate dinners beneath the stars, every table at Paulenfushi tells a different story.
          </p>
        </div>
      </section>

      <section className="bg-softwhite py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col gap-0">
            {restaurants.map((r, i) => (
              <div key={r.name} className="grid grid-cols-1 lg:grid-cols-2">
                <div className={`relative aspect-[4/3] img-hover-zoom overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img src={u(r.img, 900, 680)} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div className={`bg-${i % 2 === 0 ? 'ivory' : 'sand'} flex flex-col justify-center px-10 lg:px-16 py-16 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="font-sans text-[10px] tracking-[0.35em] text-palm mb-4">{r.type}</p>
                  <h2 className="font-serif text-3xl lg:text-5xl font-light text-charcoal mb-5">{r.name}</h2>
                  <p className="font-sans text-base text-charcoal/60 leading-loose mb-6 max-w-md">{r.desc}</p>
                  <p className="font-sans text-xs text-charcoal/40 tracking-wide mb-6">{r.hours}</p>
                  {r.seats && (
                    <p className="font-sans text-xs text-charcoal/40 tracking-wide mb-8">{r.seats} covers</p>
                  )}
                  <button className="self-start font-sans text-[11px] tracking-[0.22em] text-charcoal border-b border-charcoal/30 pb-1 hover:border-gold hover:text-gold transition-all duration-300">
                    MAKE A RESERVATION &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ocean py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-sans text-[10px] tracking-[0.4em] text-gold mb-5">PRIVATE EXPERIENCES</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-softwhite italic mb-6">
            Dinner under the stars. Yours alone.
          </h2>
          <p className="font-sans text-sm text-softwhite/50 leading-loose mb-10">
            Our culinary team creates bespoke dining experiences for your table of two or your group &mdash; from sandbank picnics to seven-course meals on the water.
          </p>
          <button className="font-sans text-[11px] tracking-[0.25em] border border-softwhite/30 text-softwhite px-10 py-3.5 hover:bg-softwhite hover:text-midnight transition-all duration-300">
            ENQUIRE ABOUT PRIVATE DINING
          </button>
        </div>
      </section>
    </div>
  );
}
