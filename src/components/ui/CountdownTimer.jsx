import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (num) => String(num).padStart(2, '0');

  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <div className="flex flex-col items-center bg-surface border border-line px-3 py-1.5 rounded-lg">
        <span className="font-bold text-primary text-base">{formatNum(timeLeft.hours)}</span>
        <span className="text-[10px] text-muted font-sans uppercase">Hours</span>
      </div>
      <span className="text-primary font-bold">:</span>
      <div className="flex flex-col items-center bg-surface border border-line px-3 py-1.5 rounded-lg">
        <span className="font-bold text-primary text-base">{formatNum(timeLeft.minutes)}</span>
        <span className="text-[10px] text-muted font-sans uppercase">Mins</span>
      </div>
      <span className="text-primary font-bold">:</span>
      <div className="flex flex-col items-center bg-surface border border-line px-3 py-1.5 rounded-lg">
        <span className="font-bold text-accent-2 text-base">{formatNum(timeLeft.seconds)}</span>
        <span className="text-[10px] text-muted font-sans uppercase">Secs</span>
      </div>
    </div>
  );
}
