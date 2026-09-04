import type { NavigateFn } from '../App';

const u = (id: string, w = 1920, h = 1080) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const offers = [
  {
    code: 'LONGER-SLOWER',
    name: 'Longer, Slower',
    tagline: 'Stay 5 nights and enjoy exclusive benefits.',
    desc: 'Some places deserve more than a weekend. Stay five nights and receive complimentary spa treatments, a private sunset sailing experience and a candlelit beach dinner.',
    includes: ['Daily breakfast included', 'Complimentary sunset sailing', '60-minute spa treatment each', 'Private beach dinner (one evening)', 'Complimentary room upgrade'],
    img: '1590523277543-a94d2e4eb00b',
    badge: 'MOST POPULAR',
  },
  {
    code: 'ISLAND-ROMANCE',
    name: 'Island Romance',
    tagline: 'A private-island escape designed for two.',
    desc: 'Created for couples seeking the Maldives at its most intimate. A Water Villa, private pool, in-villa dining and a bespoke spa ritual for two.',
    includes: ['Water Villa with pool', 'Daily champagne breakfast in villa', 'Couples spa ritual', 'Romantic private beach dinner', 'Rose petals & turndown each evening'],
    img: '1620483829312-71b2ec172fd0',
    badge: 'ROMANTIC',
  },
  {
    code: 'FAMILY-ESCAPE',
    name: 'Family Escape',
    tagline: 'More space, more time, more memories.',
    desc: 'The Two-Bedroom Beach Residence becomes your family home for the week. Spacious, private and perfect for those who want to explore the island together.',
    includes: ['Two-Bedroom Residence', 'Daily breakfast included', 'Snorkelling lesson for children', 'Island hopping day trip', 'Kids welcome amenities'],
    img: '1595184979141-090792f6b578',
    badge: 'FAMILIES',
  },
  {
    code: 'ULTIMATE',
    name: 'Ultimate Paulenfushi',
    tagline: 'The complete private-island experience.',
    desc: 'The Paulenfushi Private Residence for a minimum of 7 nights. A personal host, private chef, daily yacht charter and the full spa programme. The island, entirely yours.',
    includes: ['Private Residence', 'Personal host & chef', 'Daily yacht or dhoni charter', 'Full spa programme', 'All experiences included', 'Airport transfer by seaplane'],
    img: '1698726654908-834d3a5330d8',
    badge: 'EXCLUSIVE',
  },
];

export default function Offers({ onNavigate }: { onNavigate: NavigateFn }) {
  return (
    <div className="pt-16 lg:pt-[72px]">
      <section className="relative h-[55vh] overflow-hidden">
        <img src={u('1609601540898-52ca92508901', 2400, 1080)} alt="Special offers at Paulenfushi" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 to-midnight/75" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-sans text-[10px] tracking-[0.45em] text-gold mb-5">SPECIAL OFFERS</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-light text-softwhite">Exceptional stays.</h1>
          <p className="font-sans text-sm text-softwhite/60 mt-4 tracking-wide">Curated packages for every kind of island escape.</p>
        </div>
      </section>

      <section className="bg-softwhite py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col gap-0">
            {offers.map((offer, i) => (
              <div key={offer.code} className="grid grid-cols-1 lg:grid-cols-2">
                <div className={`relative aspect-[4/3] img-hover-zoom overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img src={u(offer.img, 900, 680)} alt={offer.name} className="w-full h-full object-cover" />
                  <div className="absolute top-5 left-5 bg-gold px-4 py-2">
                    <p className="font-sans text-[9px] tracking-[0.25em] text-midnight">{offer.badge}</p>
                  </div>
                </div>
                <div className={`bg-${i % 2 === 0 ? 'ivory' : 'sand'} px-10 lg:px-16 py-16 flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="font-sans text-[10px] tracking-[0.35em] text-gold mb-4">{offer.code}</p>
                  <h2 className="font-serif text-3xl lg:text-4xl font-light text-charcoal mb-3">{offer.name}</h2>
                  <p className="font-serif italic text-lg text-palm mb-5">{offer.tagline}</p>
                  <p className="font-sans text-sm text-charcoal/60 leading-loose mb-8 max-w-md">{offer.desc}</p>
                  <div className="flex flex-col gap-2.5 mb-10">
                    <p className="font-sans text-[10px] tracking-[0.25em] text-charcoal/40 mb-1">WHAT&apos;S INCLUDED</p>
                    {offer.includes.map((inc) => (
                      <div key={inc} className="flex items-start gap-3">
                        <span className="w-4 h-px bg-gold mt-2 flex-shrink-0" />
                        <span className="font-sans text-sm text-charcoal/70">{inc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => onNavigate('book')}
                      className="font-sans text-[11px] tracking-[0.22em] bg-ocean text-softwhite px-8 py-3 hover:bg-gold transition-colors duration-300"
                    >
                      ENQUIRE NOW
                    </button>
                    <button className="font-sans text-[11px] tracking-[0.22em] text-charcoal border-b border-charcoal/30 pb-1 hover:border-gold hover:text-gold transition-all duration-300">
                      VIEW DETAILS &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-sand py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <p className="font-sans text-xs text-charcoal/40 leading-relaxed text-center max-w-2xl mx-auto">
            All offers are subject to availability and valid for new reservations only. Rates are per villa per night and include applicable taxes. Minimum stay requirements may apply.
          </p>
        </div>
      </div>
    </div>
  );
}
