import { useState, useEffect, useRef } from 'react';
import type { Page } from '../App';

interface NavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks: { label: string; page: Page; sub?: string[] }[] = [
  { label: 'VILLAS', page: 'villas', sub: ['Beach Villas', 'Water Villas', 'Private Residence'] },
  { label: 'DINING', page: 'dining', sub: ['The Lagoon', 'Palm', 'The Reef', 'Sunset Bar'] },
  { label: 'SPA', page: 'spa', sub: ['Treatments', 'Wellness', 'Yoga'] },
  { label: 'EXPERIENCES', page: 'experiences', sub: ['Ocean', 'Island', 'Dining'] },
  { label: 'ISLAND', page: 'island' },
  { label: 'OFFERS', page: 'offers' },
];

export default function Nav({ currentPage, onNavigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      if (y > lastScrollY.current && y > 220) {
        setNavHidden(true);
      } else if (y < lastScrollY.current) {
        setNavHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setHovered(null);
    setNavHidden(false);
    window.scrollTo(0, 0);
  }, [currentPage]);

  const isHome = currentPage === 'home';
  const solid = scrolled || !isHome || menuOpen;
  const shouldHide = navHidden && !menuOpen;

  return (
    <>
      {/* Sliding nav wrapper — hides on scroll down, shows on scroll up */}
      <div
        className="fixed left-0 right-0 z-40"
        style={{
          transform: shouldHide ? 'translateY(-110%)' : 'translateY(0)',
          transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Top utility bar */}
        <div
          style={{
            maxHeight: solid ? '36px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease',
          }}
        >
          <div className="bg-midnight border-b border-softwhite/5 py-1.5">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <a
                  href="tel:+9604007000"
                  className="hidden lg:flex items-center gap-2 font-sans text-[10px] tracking-[0.15em] text-softwhite/40 hover:text-gold transition-colors"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 1h2l1 2.5-1 1a6 6 0 002.5 2.5l1-1L10 7v2a1 1 0 01-1 1A9 9 0 011 2a1 1 0 011-1z" fill="currentColor" />
                  </svg>
                  +960 400 7000
                </a>
                <span className="hidden lg:block w-px h-3 bg-softwhite/15" />
                <a
                  href="mailto:reservations@paulenfushi.com"
                  className="hidden lg:block font-sans text-[10px] tracking-[0.1em] text-softwhite/35 hover:text-gold transition-colors"
                >
                  reservations@paulenfushi.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                {['EN', 'USD'].map((item, i) => (
                  <button
                    key={item}
                    className={`font-sans text-[10px] tracking-[0.2em] text-softwhite/40 hover:text-gold transition-colors ${i === 0 ? 'border-r border-softwhite/15 pr-4' : ''}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main nav bar */}
        <nav
          className="h-16 lg:h-[72px]"
          style={{
            backgroundColor: solid ? 'rgba(7,30,36,0.97)' : 'transparent',
            backdropFilter: solid ? 'blur(12px)' : 'none',
            transition: 'background-color 0.5s ease, backdrop-filter 0.5s ease',
          }}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-full flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => onNavigate('home')} className="flex flex-col items-start">
              <span className="font-serif text-base lg:text-lg tracking-[0.3em] text-softwhite hover:text-gold transition-colors duration-300 leading-none">
                PAULENFUSHI
              </span>
              <span className="font-sans text-[8px] tracking-[0.3em] text-gold/70 leading-none mt-0.5">
                RESORT &amp; SPA
              </span>
            </button>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.page}
                  className="relative"
                  onMouseEnter={() => setHovered(link.page)}
                >
                  <button
                    onClick={() => onNavigate(link.page)}
                    className={`font-sans text-[11px] tracking-[0.22em] transition-colors duration-300 flex items-center gap-1 ${
                      currentPage === link.page ? 'text-gold' : 'text-softwhite/70 hover:text-softwhite'
                    }`}
                  >
                    {link.label}
                    {link.sub && (
                      <svg width="8" height="5" viewBox="0 0 8 5" className="opacity-40">
                        <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                  {link.sub && hovered === link.page && (
                    <div className="absolute top-full left-0 mt-3 bg-midnight border border-softwhite/10 min-w-[180px] py-2 shadow-2xl">
                      {link.sub.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => onNavigate(link.page)}
                          className="w-full text-left font-sans text-[11px] tracking-[0.15em] text-softwhite/60 hover:text-gold hover:bg-softwhite/5 px-5 py-2.5 transition-colors"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('gallery')}
                className="hidden xl:block font-sans text-[11px] tracking-[0.22em] text-softwhite/50 hover:text-softwhite transition-colors"
              >
                GALLERY
              </button>
              <button
                onClick={() => onNavigate('book')}
                className="hidden lg:flex items-center gap-2 font-sans text-[11px] tracking-[0.22em] bg-gold text-midnight px-6 py-2.5 hover:bg-softwhite transition-colors duration-300"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1.5" y="2.5" width="9" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
                  <path d="M4 1.5v2M8 1.5v2M1.5 5.5h9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
                BOOK YOUR STAY
              </button>
              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex flex-col justify-center items-center w-10 h-10 cursor-pointer gap-[5px]"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                <span
                  className="block h-px bg-softwhite transition-all duration-300 origin-center"
                  style={{ width: 22, transform: menuOpen ? 'rotate(45deg) translate(4px, 3.5px)' : 'none' }}
                />
                <span
                  className="block h-px bg-softwhite transition-all duration-300"
                  style={{ width: 16, opacity: menuOpen ? 0 : 1 }}
                />
                <span
                  className="block h-px bg-softwhite transition-all duration-300 origin-center"
                  style={{ width: 22, transform: menuOpen ? 'rotate(-45deg) translate(4px, -3.5px)' : 'none' }}
                />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Full-screen overlay menu — z-50 so it appears above the sliding nav */}
      <div
        className="fixed inset-0 z-50 bg-midnight"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-6 pb-10 h-full flex flex-col overflow-y-auto">
          {/* Overlay top bar */}
          <div className="flex justify-between items-center mb-8 lg:mb-6 h-16 lg:h-[72px]">
            <button onClick={() => { onNavigate('home'); setMenuOpen(false); }} className="flex flex-col items-start">
              <span className="font-serif text-base lg:text-lg tracking-[0.3em] text-softwhite leading-none">PAULENFUSHI</span>
              <span className="font-sans text-[8px] tracking-[0.3em] text-gold/70 leading-none mt-0.5">RESORT &amp; SPA</span>
            </button>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center relative"
              aria-label="Close menu"
            >
              <span className="absolute block h-px w-6 bg-softwhite" style={{ transform: 'rotate(45deg)' }} />
              <span className="absolute block h-px w-6 bg-softwhite" style={{ transform: 'rotate(-45deg)' }} />
            </button>
          </div>

          {/* Nav items */}
          <div className="flex flex-col gap-0 flex-1">
            {[
              ...navLinks,
              { label: 'GALLERY', page: 'gallery' as Page },
              { label: 'JOURNAL', page: 'journal' as Page },
            ].map((link, i) => (
              <button
                key={link.page}
                onClick={() => { onNavigate(link.page); setMenuOpen(false); }}
                className="font-serif text-3xl sm:text-5xl lg:text-6xl text-softwhite text-left py-3 sm:py-4 border-b border-softwhite/8 hover:text-gold transition-colors duration-300 group flex items-center justify-between"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `opacity 0.5s ease ${i * 55}ms, transform 0.5s ease ${i * 55}ms, color 0.3s ease`,
                }}
              >
                <span className="font-light">{link.label}</span>
                <span className="text-xl text-softwhite/20 group-hover:text-gold/40 transition-colors">→</span>
              </button>
            ))}
          </div>

          {/* Bottom actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <button
              onClick={() => { onNavigate('book'); setMenuOpen(false); }}
              className="font-sans text-[11px] tracking-[0.28em] bg-gold text-midnight px-10 py-4 hover:bg-softwhite transition-colors duration-300 w-full sm:w-auto text-center"
            >
              BOOK YOUR STAY
            </button>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              <a href="tel:+9604007000" className="font-sans text-sm text-softwhite/40 hover:text-gold transition-colors">
                +960 400 7000
              </a>
              <a href="mailto:reservations@paulenfushi.com" className="font-sans text-sm text-softwhite/40 hover:text-gold transition-colors hidden sm:block">
                reservations@paulenfushi.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
