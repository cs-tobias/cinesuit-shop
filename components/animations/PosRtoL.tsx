"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface PosRtoLProps {
  children: ReactNode;
}

const PosRtoL: React.FC<PosRtoLProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const image = React.useRef(null);

  // Always call hooks
  const { scrollYProgress } = useScroll({
    target: image,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["40%", "-5%"]);

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

export default PosRtoL;
