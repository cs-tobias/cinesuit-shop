import React, { useState, useEffect } from "react";

interface CounterProps {
  startValue?: number;
  endValue: number;
  duration: number;
}

const easeOutCubic = (t: number) => {
  return 1 - Math.pow(1 - t, 3);
};

const Counter: React.FC<CounterProps> = ({
  startValue = 0,
  endValue,
  duration,
}) => {
  const [value, setValue] = useState<number>(startValue);

  useEffect(() => {
    const startTime = performance.now();
    const range = endValue - startValue;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setValue(Math.floor(startValue + easedProgress * range));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setValue(endValue);
      }
    };

    const animationId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationId);
  }, [startValue, endValue, duration]);

  return <span>{value}</span>;
};

export default Counter;
