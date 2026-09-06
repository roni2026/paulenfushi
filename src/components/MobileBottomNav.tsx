import { motion } from 'framer-motion';
import type { Page, NavigateFn } from '../App';

interface Props {
  currentPage: Page;
  onNavigate: NavigateFn;
  onConcierge?: () => void;
}

const items = [
  {
    label: 'EXPLORE',
    page: 'island' as Page,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="0.9" />
        <path d="M9 2v7l4 2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'VILLAS',
    page: 'villas' as Page,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 16h14M3 16V9l6-5 6 5v7" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
        <rect x="7" y="11" width="4" height="5" rx="0.5" stroke="currentColor" strokeWidth="0.9" />
      </svg>
    ),
  },
  {
    label: 'CONCIERGE',
    page: null,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="0.9" />
        <path d="M6 8h6M6 11h4" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'BOOK',
    page: 'book' as Page,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="0.9" />
        <path d="M6 2v3M12 2v3M2 8h14" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function MobileBottomNav({ currentPage, onNavigate, onConcierge }: Props) {
  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-[80] lg:hidden"
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
    >
      <div
        className="bg-midnight/95 border-t border-softwhite/8"
        style={{ backdropFilter: 'blur(20px)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-stretch">
          {items.map((item) => {
            const isActive = item.page !== null && currentPage === item.page;
            return (
              <button
                key={item.label}
                onClick={() => {
                  if (item.page === null) {
                    onConcierge?.();
                  } else {
                    onNavigate(item.page);
                  }
                }}
                className={`flex-1 flex flex-col items-center justify-center py-4 gap-1.5 transition-colors ${
                  isActive ? 'text-gold' : 'text-softwhite/30 hover:text-softwhite/60'
                }`}
              >
                <div>{item.icon}</div>
                <span className="font-sans text-[7px] tracking-[0.25em]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
