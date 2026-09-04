const u = (id: string, w = 1920, h = 1080) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const mapLocations = [
  { name: 'Reception', x: 50, y: 45 },
  { name: 'Main Pool', x: 45, y: 55 },
  { name: 'The Lagoon', x: 38, y: 62 },
  { name: 'Palm', x: 52, y: 60 },
  { name: 'Spa', x: 62, y: 50 },
  { name: 'Water Villas', x: 70, y: 65 },
  { name: 'Beach Villas', x: 35, y: 75 },
  { name: 'Dive Centre', x: 60, y: 38 },
  { name: 'Jetty', x: 42, y: 35 },
  { name: 'Sunset Bar', x: 78, y: 55 },
];

const islandFacts = [
  { stat: '18 ha', label: 'Island size' },
  { stat: '2 km', label: 'House reef' },
  { stat: '52', label: 'Villas & residences' },
  { stat: '32°C', label: 'Average water temperature' },
];

export default function Island() {
  return (
    <div className="pt-16 lg:pt-[72px]">
      <section className="relative h-[70vh] overflow-hidden">
        <img src={u('1514282401047-d79a71a590e8', 2400, 1350)} alt="Paulenfushi Island from above" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/30 via-midnight/15 to-midnight/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-sans text-[10px] tracking-[0.45em] text-gold mb-5">THE ISLAND</p>
          <h1 className="font-serif text-5xl lg:text-7xl font-light text-softwhite leading-none">
            An island shaped<br />by the sea.
          </h1>
        </div>
      </section>

      <div className="bg-charcoal py-0">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-softwhite/10">
          {islandFacts.map((f) => (
            <div key={f.label} className="py-10 px-10 text-center">
              <p className="font-serif text-4xl text-softwhite font-light">{f.stat}</p>
              <p className="font-sans text-[10px] tracking-[0.2em] text-softwhite/40 mt-2">{f.label.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-ivory py-24 lg:py-36">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
            <div>
              <p className="font-sans text-[10px] tracking-[0.4em] text-gold mb-6">NATURAL ENVIRONMENT</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal leading-[1.15] mb-8">
                A living reef, ancient palms and water so clear you can count the fish.
              </h2>
              <p className="font-sans text-base text-charcoal/60 leading-loose mb-6">
                Paulenfushi sits within a pristine atoll lagoon, ringed by a living house reef teeming with marine life. Beyond the reef, the Indian Ocean stretches to the horizon in every shade of blue.
              </p>
              <p className="font-sans text-base text-charcoal/60 leading-loose">
                The island itself is lush with indigenous tropical vegetation &mdash; breadfruit trees, bougainvillea, coconut palms &mdash; creating a natural canopy that filters the golden light.
              </p>
            </div>
            <div className="relative img-hover-zoom aspect-[4/5] overflow-hidden">
              <img src={u('1688949078626-a358f500e063', 900, 1100)} alt="Paulenfushi island aerial" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-28 border-t border-charcoal/10 pt-20">
            {[
              { icon: '⬡', title: 'House Reef', desc: 'A two-kilometre living reef directly accessible from the beach, home to turtles, rays and hundreds of fish species.' },
              { icon: '◯', title: 'Lagoon', desc: 'The island lagoon offers calm, warm water in extraordinary shades of turquoise — a natural swimming pool.' },
              { icon: '△', title: 'Marine Life', desc: 'Maldivian waters host manta rays, whale sharks, spinner dolphins and some of the richest coral in the Indian Ocean.' },
              { icon: '□', title: 'Conservation', desc: 'Paulenfushi partners with leading marine biologists to protect and restore the island reef for future generations.' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-4">
                <span className="text-gold text-2xl font-light">{item.icon}</span>
                <h3 className="font-serif text-2xl text-charcoal">{item.title}</h3>
                <p className="font-sans text-sm text-charcoal/60 leading-loose">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <p className="font-sans text-[10px] tracking-[0.4em] text-gold mb-5">ISLAND MAP</p>
              <h2 className="font-serif text-4xl font-light text-charcoal">Find your way</h2>
            </div>
            <div className="relative bg-ocean aspect-[16/9] overflow-hidden">
              <img src={u('1514282401047-d79a71a590e8', 1440, 810)} alt="Island map" className="w-full h-full object-cover opacity-30" />
              {mapLocations.map((loc) => (
                <div
                  key={loc.name}
                  className="absolute group cursor-pointer"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-gold border-2 border-softwhite shadow-lg" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-midnight/90 px-3 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <p className="font-sans text-[10px] tracking-[0.15em] text-softwhite">{loc.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              {mapLocations.map((loc) => (
                <span key={loc.name} className="flex items-center gap-2 font-sans text-[11px] text-charcoal/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  {loc.name}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative img-hover-zoom aspect-[4/3] overflow-hidden">
              <img src={u('1623137285532-ec3df3e9abc7', 900, 680)} alt="Local Maldivian culture" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-[0.4em] text-gold mb-6">LOCAL CULTURE</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-light text-charcoal leading-[1.2] mb-8">
                A place shaped by the Maldivian spirit of hospitality.
              </h2>
              <p className="font-sans text-base text-charcoal/60 leading-loose mb-5">
                The heart of Paulenfushi is its people — a team drawn from across the Maldives, bringing centuries of island wisdom, warmth and craftsmanship to every interaction.
              </p>
              <p className="font-sans text-base text-charcoal/60 leading-loose">
                Our island hopping experiences introduce guests to authentic Maldivian villages, where local fishermen, artisans and families share their stories.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
