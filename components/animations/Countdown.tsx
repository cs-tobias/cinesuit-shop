import React, { useState, useEffect } from "react";

interface CountdownProps {
  startValue: number;
  endValue: number;
  duration: number;
  precision?: number; // Add a precision prop to handle decimal values
}

const easeOutCubic = (t: number) => {
  return 1 - Math.pow(0.85 - t, 5);
};

const Countdown: React.FC<CountdownProps> = ({
  startValue,
  endValue,
  duration,
  precision = 2, // Default precision to 2 decimal places
}) => {
  const [value, setValue] = useState<number>(startValue);

  useEffect(() => {
    const startTime = performance.now();
    const range = startValue - endValue;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      // Calculate the new value based on the progress and range
      const newValue = startValue - easedProgress * range;
      // Use toFixed to handle precision and convert it back to a number
      setValue(parseFloat(newValue.toFixed(precision)));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setValue(endValue);
      }
    };

    const animationId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationId);
  }, [startValue, endValue, duration, precision]);

  return <span>{value.toFixed(precision)}</span>;
};

export default Countdown;
