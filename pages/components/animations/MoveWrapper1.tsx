import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const MoveWrapper = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const imageRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div ref={imageRef}>
      {hasMounted ? (
        <motion.div style={{}}>{children}</motion.div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default MoveWrapper;
