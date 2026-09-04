const u = (id: string, w = 1920, h = 1080) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const treatments = [
  { category: 'Massages', items: ['Paulenfushi Signature Massage', 'Deep Tissue Therapy', 'Couples Ritual', 'Hot Stone Journey', 'Island Aromatherapy'] },
  { category: 'Facials', items: ['Ocean Renewal Facial', 'Anti-Ageing Treatment', 'Deep Hydration Ritual', 'Natural Island Glow', 'Brightening Serum Facial'] },
  { category: 'Body Rituals', items: ['Coconut & Sea Salt Scrub', 'Detox Wrap', 'After-Sun Treatment', 'Full Body Polish', 'Mineral Mud Ritual'] },
  { category: 'Wellness', items: ['Sunrise Yoga', 'Lagoon Meditation', 'Breathwork Session', 'Sound Healing', 'Wellness Consultation'] },
];

export default function Spa() {
  return (
    <div className="pt-16 lg:pt-[72px]">
      <section className="relative h-[70vh] overflow-hidden">
        <img src={u('1532592068623-db1978e40df5', 2400, 1350)} alt="Paulenfushi Spa" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/20 via-midnight/30 to-midnight/75" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-sans text-[10px] tracking-[0.45em] text-gold mb-5">SPA &amp; WELLNESS</p>
          <h1 className="font-serif text-5xl lg:text-7xl font-light text-softwhite italic leading-tight">Return to yourself.</h1>
          <p className="font-sans text-sm text-softwhite/60 mt-5 max-w-md tracking-wide leading-relaxed">
            A sanctuary of quiet rituals, restorative treatments and ancient wellness traditions inspired by the natural rhythms of the island.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-24 lg:py-36">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">
            <div>
              <p className="font-sans text-[10px] tracking-[0.4em] text-gold mb-6">THE SPA</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal leading-[1.15] mb-8">
                Ancient wisdom, island ingredients, extraordinary stillness.
              </h2>
              <p className="font-sans text-base text-charcoal/60 leading-loose mb-6">
                Our spa draws from centuries of Maldivian healing tradition, combined with globally sourced botanicals and modern therapeutic techniques. Treatments are performed in open-air pavilions surrounded by the sounds of the ocean.
              </p>
              <p className="font-sans text-base text-charcoal/60 leading-loose">
                The spa houses five treatment rooms including a dedicated couples suite, two outdoor pavilions and a hydrotherapy pool overlooking the lagoon.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] img-hover-zoom overflow-hidden">
                <img src={u('1611818830473-ab5d21f401ce', 500, 700)} alt="Spa detail" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] img-hover-zoom overflow-hidden mt-10">
                <img src={u('1532592068623-db1978e40df5', 500, 700)} alt="Spa ambiance" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
            <div className="relative aspect-video lg:h-96 img-hover-zoom overflow-hidden">
              <img src={u('1646166468261-b18339c92fda', 900, 600)} alt="Sunrise yoga" className="w-full h-full object-cover" />
            </div>
            <div className="bg-ocean flex flex-col justify-center px-10 lg:px-16 py-16">
              <p className="font-sans text-[10px] tracking-[0.4em] text-gold mb-5">WELLNESS PROGRAMME</p>
              <h3 className="font-serif text-3xl lg:text-4xl text-softwhite font-light italic mb-6">Wake with the island.</h3>
              <div className="flex flex-col gap-3 mb-10">
                {['Yoga at sunrise over the lagoon.', 'Guided meditation by the water\'s edge.', 'Breathwork beneath the tropical palms.', 'Daily sound healing sessions.'].map((line) => (
                  <p key={line} className="font-sans text-sm text-softwhite/60">{line}</p>
                ))}
              </div>
              <button className="self-start font-sans text-[11px] tracking-[0.22em] border border-softwhite/30 text-softwhite px-7 py-3 hover:bg-softwhite hover:text-midnight transition-all duration-300">
                VIEW SCHEDULE
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <p className="font-sans text-[10px] tracking-[0.4em] text-palm mb-5">TREATMENTS</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal">Signature Treatments</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {treatments.map((cat) => (
              <div key={cat.category}>
                <h3 className="font-sans text-[11px] tracking-[0.25em] text-palm border-b border-palm/30 pb-3 mb-6">
                  {cat.category.toUpperCase()}
                </h3>
                <ul className="flex flex-col gap-3">
                  {cat.items.map((item) => (
                    <li key={item} className="font-sans text-sm text-charcoal/70 hover:text-charcoal cursor-pointer transition-colors">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <button className="font-sans text-[11px] tracking-[0.25em] bg-ocean text-softwhite px-10 py-3.5 hover:bg-gold transition-colors duration-300">
              BOOK A TREATMENT
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
