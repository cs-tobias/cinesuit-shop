"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface RotWrapperProps {
  children: ReactNode;
}

const RotWrapper: React.FC<RotWrapperProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const image = React.useRef(null);

  // Always call hooks
  const { scrollYProgress } = useScroll({
    target: image,
    offset: ["start end", "end start"],
  });

  // Transform for rotation
  const rotate = useTransform(
    scrollYProgress,
    [0, 1], // Represents the scroll progress (0 to 1)
    [0, 0] // Adjust these values to control the rotation range (e.g., 0 to 360 degrees)
  );

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const y = useTransform(scrollYProgress, [0, 0.7, 1], ["0%", "0%", "-4%"]);

  const opacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);

  // Set mounted state after mounting
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Only apply the motion effects after mounting
  return (
    <div ref={image}>
      {hasMounted ? (
        <motion.div style={{ rotate, scale, y, opacity }}>
          {children}
        </motion.div> // Apply the rotation transformation
      ) : (
        <>{children}</> // Placeholder for SSR with initial color
      )}
    </div>
  );
};

export default RotWrapper;
