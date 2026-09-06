import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const ringSpringX = useSpring(ringX, { damping: 35, stiffness: 160 });
  const ringSpringY = useSpring(ringY, { damping: 35, stiffness: 160 });

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [onImage, setOnImage] = useState(false);
  const [hidden, setHidden] = useState(false);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia('(hover: none)').matches;
    if (isMobile.current) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const enter = () => setHidden(false);
    const leave = () => setHidden(true);

    const checkTarget = (e: MouseEvent) => {
      const el = e.target as Element;
      const interactive = el.closest('button, a, [role="button"], input, select, textarea, label');
      const image = el.closest('img, [data-cursor-image]');
      setHovered(!!interactive);
      setOnImage(!!image && !interactive);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', checkTarget);
    document.addEventListener('mouseenter', enter);
    document.addEventListener('mouseleave', leave);
    window.addEventListener('mousedown', () => setClicked(true));
    window.addEventListener('mouseup', () => setClicked(false));

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', checkTarget);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  const ringSize = hovered ? 52 : onImage ? 72 : clicked ? 20 : 36;
  const dotSize = hovered ? 4 : clicked ? 12 : 6;
  const ringOpacity = hidden ? 0 : hovered ? 0.9 : onImage ? 0.35 : 0.5;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[200] rounded-full border"
        style={{
          x: ringSpringX,
          y: ringSpringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderColor: onImage ? 'rgba(252,251,247,0.6)' : 'rgba(181,154,104,0.6)',
          opacity: ringOpacity,
          transition: 'width 0.35s ease, height 0.35s ease, margin 0.35s ease, opacity 0.2s ease, border-color 0.3s ease',
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[200] rounded-full bg-gold"
        style={{
          x: springX,
          y: springY,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          opacity: hidden ? 0 : 1,
          backgroundColor: onImage ? 'rgba(252,251,247,0.9)' : 'rgba(181,154,104,0.9)',
          transition: 'width 0.25s ease, height 0.25s ease, margin 0.25s ease, opacity 0.15s ease',
        }}
      />
    </>
  );
}
