const u = (id: string, w = 1920, h = 1080) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const experiences = [
  { name: 'Sunrise Dolphin Cruise', tag: 'OCEAN', desc: 'Drift into the open ocean at dawn to meet Maldivian spinner dolphins in their natural habitat.', img: '1613895571415-90c5853c6e36', duration: '2–3 hours' },
  { name: 'Private Sandbank Picnic', tag: 'ISLAND', desc: 'A secluded sandbank appears at low tide — yours for the afternoon, with a champagne picnic prepared by our culinary team.', img: '1762961881563-66852e1e4527', duration: 'Half day' },
  { name: 'Sunset Sailing', tag: 'SAIL', desc: 'Board a traditional Maldivian dhoni and sail into a horizon painted in amber and rose.', img: '1531429957-9e7c26e39c84', duration: '2 hours' },
  { name: 'House Reef Snorkelling', tag: 'DIVE', desc: "Explore Paulenfushi's vibrant house reef, home to manta rays, turtles and iridescent reef fish.", img: '1609601546193-f558f1ebb385', duration: '1–2 hours' },
  { name: 'Island Hopping', tag: 'DISCOVER', desc: 'Venture beyond the horizon to discover local Maldivian islands, their culture and their people.', img: '1688949078626-a358f500e063', duration: 'Full day' },
  { name: 'Romantic Beach Dinner', tag: 'DINING', desc: "A table for two on the water's edge. The sound of the ocean, firelight and a menu created just for you.", img: '1777906718328-deb1ff1be508', duration: 'Evening' },
  { name: 'Cinema Under the Stars', tag: 'ESCAPE', desc: 'A private outdoor cinema on the beach, with blankets, cocktails and a film of your choosing.', img: '1575231902142-29aaec0bd547', duration: 'Evening' },
  { name: 'Private Yacht Charter', tag: 'SAIL', desc: 'Charter a private luxury yacht and explore the atolls of the Maldives entirely on your own terms.', img: '1607340696730-3a73c584dc92', duration: 'Full day' },
  { name: 'Paddleboarding', tag: 'EXPLORE', desc: 'Glide across the glassy lagoon at sunrise for a meditative start to the day.', img: '1582719508461-905c673771fd', duration: '1 hour' },
  { name: 'Deep Sea Fishing', tag: 'OCEAN', desc: "Head out to deeper waters with an experienced guide in search of the Maldives' finest gamefish.", img: '1621411539836-c514796aca4c', duration: 'Full day' },
  { name: 'Kayaking', tag: 'EXPLORE', desc: 'Explore the lagoon and mangroves at your own pace in a traditional kayak.', img: '1609601540898-52ca92508901', duration: '1–2 hours' },
  { name: 'Diving', tag: 'DIVE', desc: 'Our PADI-certified dive instructors guide you through some of the most spectacular dive sites in the Indian Ocean.', img: '1595184979141-090792f6b578', duration: 'Half / full day' },
];

export default function Experiences() {
  return (
    <div className="pt-16 lg:pt-[72px]">
      <section className="relative h-[70vh] overflow-hidden">
        <img src={u('1613895571415-90c5853c6e36', 2400, 1350)} alt="Experiences at Paulenfushi" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 via-midnight/25 to-midnight/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 text-center px-6">
          <p className="font-sans text-[10px] tracking-[0.45em] text-gold mb-5">ISLAND EXPERIENCES</p>
          <h1 className="font-serif text-5xl lg:text-7xl font-light text-softwhite italic">Beyond the horizon.</h1>
          <div className="flex gap-6 mt-8 flex-wrap justify-center">
            {['DIVE', 'SAIL', 'DISCOVER', 'EXPLORE', 'ESCAPE'].map((f) => (
              <span key={f} className="font-sans text-[11px] tracking-[0.25em] text-softwhite/60 hover:text-gold cursor-pointer transition-colors">
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-midnight py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-softwhite/5">
            {experiences.map((exp) => (
              <div key={exp.name} className="bg-midnight relative group cursor-pointer overflow-hidden">
                <div className="aspect-[4/5] img-hover-zoom overflow-hidden">
                  <img src={u(exp.img, 600, 750)} alt={exp.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans text-[9px] tracking-[0.3em] text-gold">{exp.tag}</span>
                    <span className="font-sans text-[9px] tracking-[0.15em] text-softwhite/40">{exp.duration}</span>
                  </div>
                  <h3 className="font-serif text-xl lg:text-2xl text-softwhite font-light mb-3 leading-snug">{exp.name}</h3>
                  <p className="font-sans text-xs text-softwhite/50 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400 max-h-0 group-hover:max-h-20 overflow-hidden" style={{ transition: 'opacity 0.4s ease, max-height 0.4s ease' }}>
                    {exp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ocean py-20 text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="font-sans text-[10px] tracking-[0.4em] text-gold mb-5">BESPOKE EXPERIENCES</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-softwhite mb-6">Every experience, tailored for you.</h2>
          <p className="font-sans text-sm text-softwhite/50 leading-loose mb-10">
            Our experiences team can arrange anything &mdash; from private dolphin charters to overnight island bivouacs. Tell us what you dream of.
          </p>
          <button className="font-sans text-[11px] tracking-[0.25em] border border-softwhite/30 text-softwhite px-10 py-3.5 hover:bg-softwhite hover:text-midnight transition-all duration-300">
            ENQUIRE NOW
          </button>
        </div>
      </section>
    </div>
  );
}
