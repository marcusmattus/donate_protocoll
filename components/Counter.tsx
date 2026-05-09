'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function Counter({ end, prefix = '', suffix = '', duration = 2000 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing function for smooth deceleration
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  const formattedCount = count.toLocaleString();

  return (
    <span ref={ref}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
}
