import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Icons from "./Icons";

interface LightboxDarkProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

interface AnimatedImageProps {
  src: string;
  alt: string;
}

const LightboxDark: React.FC<LightboxDarkProps> = ({
  images,
  isOpen,
  onClose,
  selectedIndex,
  setSelectedIndex,
}) => {
  const AnimatedImage: React.FC<AnimatedImageProps> = ({ src, alt }) => {
    return (
      <motion.div
        key={src}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="flex items-center justify-center max-w-full max-h-full w-[90vw] h-[90vh] overflow-hidden bg-black rounded-lg"
          style={{ aspectRatio: "16/9" }}
        >
          <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="contain" // Ensure images maintain their aspect ratio and fit within the container
          />
        </div>
      </motion.div>
    );
  };

  const navigate = useCallback(
    (direction: "next" | "prev") => {
      const newIndex =
        direction === "next"
          ? (selectedIndex + 1) % images.length
          : (selectedIndex - 1 + images.length) % images.length;
      setSelectedIndex(newIndex);
    },
    [images.length, selectedIndex, setSelectedIndex]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight") {
        navigate("next");
      } else if (event.key === "ArrowLeft") {
        navigate("prev");
      }
    };

    document.body.style.overflow = isOpen ? "hidden" : "auto";

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, navigate]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <div
            className="relative flex h-full w-full justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left navigation area */}
            <div
              className="absolute hidden left-0 z-40 h-full w-1/2 md:flex items-center justify-start"
              onClick={() => navigate("prev")}
            >
              <button className="mr-4 text-neutral-400 font-light p-8 hover:cursor-pointer hover:text-white transition-color duration-300">
                <Icons icon="chevron-left" width="80" height="80" />
              </button>
            </div>

            {/* Image container */}
            <div className="no-select flex flex-col items-center justify-center z-30">
              <AnimatePresence>
                <AnimatedImage
                  key={images[selectedIndex]}
                  src={images[selectedIndex]}
                  alt={`Image ${selectedIndex + 1}`}
                />
              </AnimatePresence>
            </div>

            {/* Right navigation area */}
            <div
              className="absolute hidden right-0 z-40 h-full w-1/2 md:flex p-8 items-center justify-end"
              onClick={() => navigate("next")}
            >
              <button className="mr-4 text-neutral-400 font-light p-2 hover:cursor-pointer hover:text-white transition-color duration-300">
                <Icons icon="chevron-right" width="80" height="80" />
              </button>
            </div>

            {/* Close button */}
            <button
              className="z-50 absolute top-2 md:top-10 right-2 md:right-8 text-neutral-400 text-lg font-semibold p-2 hover:cursor-pointer hover:text-white transition-color duration-300"
              onClick={onClose}
            >
              <Icons icon="x" width="48" height="48" strokeWidth="1.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LightboxDark;
