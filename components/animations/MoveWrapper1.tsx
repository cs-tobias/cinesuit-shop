import { motion, useScroll } from "framer-motion";
import React, { ReactNode, useEffect, useState } from "react";

interface MoveWrapperProps {
  children: ReactNode;
}

const MoveWrapper: React.FC<MoveWrapperProps> = ({ children }) => {
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
