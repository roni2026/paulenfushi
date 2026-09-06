import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function getMaldivesTime() {
  const now = new Date();
  const maldives = new Date(now.toLocaleString('en-US', { timeZone: 'Indian/Maldives' }));
  return maldives;
}

function getSunsetTime() {
  return '18:22';
}

function getLagoonCondition(hour: number) {
  if (hour >= 5 && hour < 8) return 'MORNING CALM';
  if (hour >= 8 && hour < 12) return 'LAGOON CLEAR';
  if (hour >= 12 && hour < 15) return 'GENTLE SWELL';
  if (hour >= 15 && hour < 18) return 'GOLDEN HOUR';
  if (hour >= 18 && hour < 20) return 'SUNSET GLOW';
  return 'NIGHT TIDE';
}

function formatTime(d: Date) {
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export default function OceanAtmosphere({ visible }: { visible: boolean }) {
  const [time, setTime] = useState(getMaldivesTime());

  useEffect(() => {
    const t = setInterval(() => setTime(getMaldivesTime()), 60000);
    return () => clearInterval(t);
  }, []);

  const condition = getLagoonCondition(time.getHours());

  return (
    <motion.div
      className="fixed top-20 right-4 lg:right-8 z-[50] hidden lg:flex flex-col items-end gap-0.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <p className="font-sans text-[8px] tracking-[0.35em] text-softwhite/25">
        MALDIVES · {formatTime(time)} GMT+5
      </p>
      <p className="font-sans text-[8px] tracking-[0.25em] text-gold/50">
        {condition}
      </p>
      <p className="font-sans text-[8px] tracking-[0.25em] text-softwhite/20">
        SUNSET {getSunsetTime()}
      </p>
    </motion.div>
  );
}
