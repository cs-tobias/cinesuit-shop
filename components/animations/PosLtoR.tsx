"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface PosLtoRProps {
  children: ReactNode;
}

const PosLtoR: React.FC<PosLtoRProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const image = React.useRef(null);

  // Always call hooks
  const { scrollYProgress } = useScroll({
    target: image,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-35%", "10%"]);

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

export default PosLtoR;
