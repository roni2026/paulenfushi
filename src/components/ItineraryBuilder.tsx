import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const activities = [
  { id: 'sunrise-yoga', label: 'Sunrise Yoga', tag: 'WELLNESS', time: '06:30' },
  { id: 'beach-breakfast', label: 'Private Beach Breakfast', tag: 'DINING', time: '08:00' },
  { id: 'snorkelling', label: 'House Reef Snorkelling', tag: 'OCEAN', time: '09:30' },
  { id: 'spa', label: 'Signature Spa Treatment', tag: 'WELLNESS', time: '11:00' },
  { id: 'lagoon-lunch', label: 'Lagoon Lunch', tag: 'DINING', time: '13:00' },
  { id: 'dolphin-cruise', label: 'Dolphin Cruise', tag: 'OCEAN', time: '15:30' },
  { id: 'sandbar-picnic', label: 'Private Sandbar Picnic', tag: 'ISLAND', time: '14:00' },
  { id: 'sunset-sailing', label: 'Sunset Sailing', tag: 'OCEAN', time: '17:30' },
  { id: 'private-dinner', label: 'Private Beach Dinner', tag: 'DINING', time: '19:30' },
  { id: 'diving', label: 'Scuba Diving', tag: 'OCEAN', time: '08:00' },
  { id: 'cinema', label: 'Cinema Under the Stars', tag: 'ESCAPE', time: '21:00' },
  { id: 'fishing', label: 'Traditional Fishing', tag: 'ISLAND', time: '16:00' },
  { id: 'meditation', label: 'Overwater Meditation', tag: 'WELLNESS', time: '07:00' },
  { id: 'cocktail', label: 'Sunset Cocktails', tag: 'DINING', time: '18:00' },
  { id: 'cooking', label: 'Maldivian Cooking Class', tag: 'DINING', time: '10:00' },
];

const tagColors: Record<string, string> = {
  WELLNESS: 'text-palm bg-palm/10',
  DINING: 'text-gold bg-gold/10',
  OCEAN: 'text-ocean bg-ocean/10',
  ISLAND: 'text-charcoal/60 bg-charcoal/8',
  ESCAPE: 'text-charcoal/50 bg-charcoal/6',
};

const DEFAULT_DAYS = [
  {
    day: 1,
    label: 'ARRIVAL DAY',
    items: ['beach-breakfast', 'lagoon-lunch', 'sunset-cocktail', 'private-dinner'],
  },
  {
    day: 2,
    label: 'ISLAND EXPLORER',
    items: ['sunrise-yoga', 'beach-breakfast', 'snorkelling', 'spa', 'sunset-sailing'],
  },
  {
    day: 3,
    label: 'OCEAN & ADVENTURE',
    items: ['diving', 'sandbar-picnic', 'fishing', 'cinema'],
  },
];

export default function ItineraryBuilder() {
  const [days, setDays] = useState(DEFAULT_DAYS.map(d => ({ ...d, items: [...d.items] })));
  const [nights, setNights] = useState(3);
  const [saved, setSaved] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState(0);

  const addDay = () => {
    if (days.length >= 7) return;
    setDays(prev => [...prev, { day: prev.length + 1, label: `DAY ${prev.length + 1}`, items: [] }]);
    setNights(prev => prev + 1);
  };

  const toggleActivity = (dayIdx: number, actId: string) => {
    setDays(prev => prev.map((d, i) => {
      if (i !== dayIdx) return d;
      const items = d.items.includes(actId)
        ? d.items.filter(x => x !== actId)
        : [...d.items, actId];
      return { ...d, items };
    }));
  };

  const actMap = Object.fromEntries(activities.map(a => [a.id, a]));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <section className="bg-charcoal py-24 lg:py-36">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-5">
            <span className="w-8 h-px bg-gold" />
            <p className="font-sans text-[10px] tracking-[0.45em] text-gold">PLAN YOUR ISLAND</p>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-softwhite leading-tight mb-3">
            YOUR PAULENFUSHI
          </h2>
          <p className="font-sans text-sm text-softwhite/40 leading-relaxed max-w-lg">
            Design your perfect escape day by day. Select activities, build your rhythm, and let the island unfold.
          </p>
        </div>

        <div className="flex items-center gap-4 mb-12">
          <p className="font-sans text-[10px] tracking-[0.3em] text-softwhite/40">{nights} NIGHTS</p>
          <div className="flex items-center gap-2">
            <button onClick={() => nights > 1 && setNights(n => n - 1)} className="w-8 h-8 border border-softwhite/15 text-softwhite/40 hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-lg leading-none">−</button>
            <button onClick={addDay} className="w-8 h-8 border border-softwhite/15 text-softwhite/40 hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-lg leading-none">+</button>
          </div>
        </div>

        <div className="flex gap-0 mb-8 overflow-x-auto hide-scrollbar border-b border-softwhite/8">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 px-6 py-4 font-sans text-[10px] tracking-[0.25em] border-b-2 transition-all duration-300 ${
                activeDay === i
                  ? 'text-gold border-gold'
                  : 'text-softwhite/30 border-transparent hover:text-softwhite/60'
              }`}
            >
              DAY {String(d.day).padStart(2, '0')}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {days[activeDay] && (
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            >
              <div>
                <p className="font-serif text-2xl text-softwhite font-light italic mb-6">{days[activeDay].label}</p>
                {days[activeDay].items.length === 0 ? (
                  <p className="font-sans text-sm text-softwhite/20 italic">Select activities from the list →</p>
                ) : (
                  <div className="flex flex-col gap-0">
                    {days[activeDay].items.map((id, idx) => {
                      const act = actMap[id];
                      if (!act) return null;
                      return (
                        <motion.div
                          key={id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ delay: idx * 0.04 }}
                          className="group flex items-center gap-5 py-4 border-b border-softwhite/6"
                        >
                          <span className="font-sans text-[9px] text-softwhite/25 w-10 flex-shrink-0">{act.time}</span>
                          <div className="w-px h-5 bg-gold/25 flex-shrink-0" />
                          <span className="font-sans text-sm text-softwhite/80 flex-1">{act.label}</span>
                          <span className={`font-sans text-[8px] tracking-[0.2em] px-2 py-0.5 ${tagColors[act.tag]}`}>{act.tag}</span>
                          <button
                            onClick={() => toggleActivity(activeDay, id)}
                            className="opacity-0 group-hover:opacity-100 text-softwhite/20 hover:text-softwhite/60 transition-all font-sans text-xs"
                          >
                            ×
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <p className="font-sans text-[9px] tracking-[0.35em] text-softwhite/30 mb-5">ADD ACTIVITIES</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activities.map(act => {
                    const inDay = days[activeDay].items.includes(act.id);
                    return (
                      <button
                        key={act.id}
                        onClick={() => toggleActivity(activeDay, act.id)}
                        className={`group text-left px-4 py-3 border transition-all duration-200 flex items-center gap-3 ${
                          inDay
                            ? 'border-gold/30 bg-gold/5'
                            : 'border-softwhite/8 hover:border-softwhite/20'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${inDay ? 'bg-gold' : 'bg-softwhite/15'}`} />
                        <div>
                          <p className={`font-sans text-[11px] transition-colors ${inDay ? 'text-softwhite' : 'text-softwhite/50 group-hover:text-softwhite/80'}`}>{act.label}</p>
                          <p className={`font-sans text-[8px] ${tagColors[act.tag]} mt-0.5 inline-block px-1.5 py-0.5`}>{act.tag}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16 flex items-center gap-6">
          <motion.button
            onClick={handleSave}
            whileTap={{ scale: 0.97 }}
            className="font-sans text-[11px] tracking-[0.28em] bg-gold text-midnight px-10 py-4 hover:bg-softwhite transition-colors duration-300"
          >
            {saved ? 'JOURNEY SAVED ✓' : 'SAVE YOUR JOURNEY'}
          </motion.button>
          <p className="font-sans text-[10px] text-softwhite/25">
            {days.reduce((acc, d) => acc + d.items.length, 0)} activities across {days.length} days
          </p>
        </div>
      </div>
    </section>
  );
}
