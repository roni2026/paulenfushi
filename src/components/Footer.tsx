import type { Page } from '../App';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const colLinks = [
  { label: 'Villas', page: 'villas' as Page },
  { label: 'Dining', page: 'dining' as Page },
  { label: 'Spa', page: 'spa' as Page },
  { label: 'Experiences', page: 'experiences' as Page },
  { label: 'Island', page: 'island' as Page },
  { label: 'Offers', page: 'offers' as Page },
  { label: 'Gallery', page: 'gallery' as Page },
  { label: 'Journal', page: 'journal' as Page },
];

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-midnight text-softwhite">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-20 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pb-16 border-b border-softwhite/10">
          {/* Brand */}
          <div>
            <div className="font-serif text-3xl tracking-[0.3em] text-softwhite mb-1">
              PAULENFUSHI
            </div>
            <div className="font-sans text-[11px] tracking-[0.25em] text-gold mb-8">
              RESORT &amp; SPA
            </div>
            <p className="font-sans text-sm text-softwhite/50 leading-relaxed max-w-xs">
              A private island sanctuary in the heart of the Maldives, created for those who seek extraordinary stillness.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {colLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className="font-sans text-sm text-softwhite/60 hover:text-gold transition-colors text-left"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Contact + Newsletter */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-sans text-[10px] tracking-[0.25em] text-gold mb-4 uppercase">
                Reservations
              </p>
              <p className="font-sans text-sm text-softwhite/70">+960 400 7000</p>
              <a
                href="mailto:reservations@paulenfushi.com"
                className="font-sans text-sm text-softwhite/70 hover:text-gold transition-colors"
              >
                reservations@paulenfushi.com
              </a>
              <p className="font-sans text-sm text-softwhite/50 mt-2">Maldives</p>
              <div className="mt-6 pt-5 border-t border-softwhite/10">
                <p className="font-sans text-[10px] tracking-[0.25em] text-gold mb-2 uppercase">Contact US</p>
                <p className="font-sans text-sm text-softwhite/70">Biju Paul</p>
                <p className="font-sans text-sm text-softwhite/45 mt-0.5">+1 (555) 000-0000</p>
              </div>
            </div>
            <div>
              <p className="font-serif italic text-base text-softwhite/60 mb-4">
                Stories from the island, occasionally.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="bg-transparent border border-softwhite/20 font-sans text-[11px] tracking-[0.15em] text-softwhite placeholder:text-softwhite/30 px-4 py-2.5 flex-1 outline-none focus:border-gold transition-colors"
                />
                <button className="font-sans text-[11px] tracking-[0.2em] bg-gold text-midnight px-5 py-2.5 hover:bg-softwhite transition-colors duration-300">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-sans text-[11px] text-softwhite/30 tracking-wide">
            &copy; 2026 Paulenfushi Resort &amp; Spa. All rights reserved.
          </p>
          <div className="flex gap-8 items-center">
            <div className="flex gap-6">
              {['INSTAGRAM', 'FACEBOOK', 'YOUTUBE'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-sans text-[11px] tracking-[0.15em] text-softwhite/40 hover:text-gold transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
            <div className="flex gap-5 ml-4">
              {['Privacy', 'Terms', 'Cookies'].map((t) => (
                <a
                  key={t}
                  href="#"
                  className="font-sans text-[11px] text-softwhite/30 hover:text-softwhite/60 transition-colors"
                >
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
