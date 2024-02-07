"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextWrapperProps {
  children: ReactNode;
}

const TextWrapper: React.FC<TextWrapperProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const text = React.useRef(null);

  // Always call hooks
  const { scrollYProgress } = useScroll({
    target: text,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [1, 0.4, 0], [1, 1, 0]);

  // Transform for vertical position (Y-axis)
  const y = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["5%", "0%"] // Adjust these values as needed
  );

  // Set mounted state after mounting
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Only apply the motion effects after mounting
  return (
    <div ref={text}>
      {hasMounted ? (
        <motion.div style={{ opacity, y }}>{children}</motion.div>
      ) : (
        <>{children}</> // Placeholder for SSR with initial color
      )}
    </div>
  );
};

export default TextWrapper;
