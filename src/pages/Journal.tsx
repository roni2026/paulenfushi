const u = (id: string, w = 1920, h = 1080) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const articles = [
  {
    title: 'Five ways to experience the Maldives differently',
    tag: 'TRAVEL',
    excerpt: "Most visitors see only the postcard version. Here, we show you how to venture beyond the beach into the living culture, marine ecosystem and quiet corners of the Maldivian archipelago.",
    author: 'The Paulenfushi Team',
    date: 'September 2026',
    read: '6 min read',
    img: '1688949078626-a358f500e063',
    featured: true,
  },
  {
    title: 'Inside the art of barefoot luxury',
    tag: 'CULTURE',
    excerpt: "Luxury, in the Maldives, means something different. It means silence, space, the absence of effort. We explore what makes this island approach to hospitality so enduring.",
    author: 'Editorial',
    date: 'August 2026',
    read: '5 min read',
    img: '1590523277543-a94d2e4eb00b',
    featured: false,
  },
  {
    title: 'Where to find the best sunsets on Paulenfushi',
    tag: 'ISLAND',
    excerpt: "Every evening, the western sky transforms into something extraordinary. Our guide to the island's finest sunset positions.",
    author: 'Island Team',
    date: 'August 2026',
    read: '4 min read',
    img: '1620483829312-71b2ec172fd0',
    featured: false,
  },
  {
    title: 'The quiet luxury of doing absolutely nothing',
    tag: 'WELLNESS',
    excerpt: "In a world of itineraries and schedules, the most radical thing a Paulenfushi guest can do is nothing at all. We celebrate the art of stillness.",
    author: 'Spa Team',
    date: 'July 2026',
    read: '4 min read',
    img: '1611818830473-ab5d21f401ce',
    featured: false,
  },
  {
    title: 'A guide to the Maldivian house reef',
    tag: 'EXPERIENCES',
    excerpt: "The Paulenfushi house reef is one of the richest ecosystems in the North Malé Atoll. Our dive instructors share what to look for.",
    author: 'Dive Centre',
    date: 'July 2026',
    read: '7 min read',
    img: '1595184979141-090792f6b578',
    featured: false,
  },
  {
    title: 'How to spend 24 hours on a private sandbank',
    tag: 'EXPERIENCES',
    excerpt: "One of the world's more extraordinary privileges — a sandbank that appears at low tide, accessible only by boat. We plan the perfect day.",
    author: 'Concierge Team',
    date: 'June 2026',
    read: '5 min read',
    img: '1762961881563-66852e1e4527',
    featured: false,
  },
];

export default function Journal() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="pt-16 lg:pt-[72px]">
      <section className="bg-ivory py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <p className="font-sans text-[10px] tracking-[0.45em] text-gold mb-5">EDITORIAL</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="font-serif text-5xl lg:text-7xl font-light text-charcoal leading-none">
              The Paulenfushi<br />Journal
            </h1>
            <p className="font-sans text-sm text-charcoal/50 max-w-sm leading-loose">
              Stories, guides and ideas from a private island in the heart of the Indian Ocean.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-charcoal">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto img-hover-zoom overflow-hidden">
              <img src={u(featured.img, 900, 680)} alt={featured.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center px-10 lg:px-16 py-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-sans text-[10px] tracking-[0.3em] text-gold">{featured.tag}</span>
                <span className="font-sans text-[10px] text-softwhite/30">{featured.date}</span>
                <span className="font-sans text-[10px] text-softwhite/30">{featured.read}</span>
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl text-softwhite font-light leading-[1.15] mb-6">
                {featured.title}
              </h2>
              <p className="font-sans text-base text-softwhite/55 leading-loose mb-10 max-w-md">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <button className="font-sans text-[11px] tracking-[0.22em] text-softwhite border-b border-softwhite/30 pb-1 hover:border-gold hover:text-gold transition-all duration-300">
                  READ ARTICLE &rarr;
                </button>
                <span className="font-sans text-xs text-softwhite/30">&mdash; {featured.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-softwhite py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {rest.map((article) => (
              <article key={article.title} className="cursor-pointer group">
                <div className="aspect-[4/3] img-hover-zoom overflow-hidden mb-6">
                  <img src={u(article.img, 700, 530)} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-sans text-[10px] tracking-[0.3em] text-gold">{article.tag}</span>
                  <span className="font-sans text-[10px] text-charcoal/30">{article.read}</span>
                </div>
                <h3 className="font-serif text-2xl text-charcoal group-hover:text-ocean transition-colors font-light leading-snug mb-4">
                  {article.title}
                </h3>
                <p className="font-sans text-sm text-charcoal/55 leading-relaxed mb-5 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs text-charcoal/40">{article.date}</span>
                  <span className="font-sans text-[11px] tracking-[0.18em] text-charcoal/40 group-hover:text-gold transition-colors">
                    READ &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ocean py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="font-sans text-[10px] tracking-[0.4em] text-gold mb-4">NEWSLETTER</p>
          <h2 className="font-serif text-4xl text-softwhite font-light italic mb-4">Stories from the island.</h2>
          <p className="font-sans text-sm text-softwhite/50 mb-8">Occasional dispatches from Paulenfushi, arriving when the light is just right.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-1 bg-transparent border border-softwhite/20 font-sans text-[11px] tracking-[0.1em] text-softwhite placeholder:text-softwhite/25 px-5 py-3.5 outline-none focus:border-gold transition-colors"
            />
            <button className="font-sans text-[11px] tracking-[0.2em] bg-gold text-midnight px-7 py-3.5 hover:bg-softwhite transition-colors duration-300">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
