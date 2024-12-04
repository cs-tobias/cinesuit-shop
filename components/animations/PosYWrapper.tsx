"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface PosYWrapperProps {
  children: ReactNode;
}

const PosYWrapper: React.FC<PosYWrapperProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const image = React.useRef(null);

  // Always call hooks
  const { scrollYProgress } = useScroll({
    target: image,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 0.35, 1], ["-5%", "0%", "0%"]);

  // Set mounted state after mounting
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Only apply the motion effects after mounting
  return (
    <div ref={image}>
      {hasMounted ? (
        <motion.div style={{ x }}>{children}</motion.div> // Apply the rotation transformation
      ) : (
        <>{children}</> // Placeholder for SSR with initial color
      )}
    </div>
  );
};

export default PosYWrapper;
