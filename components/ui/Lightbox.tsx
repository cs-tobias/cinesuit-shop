{
  /* Updated Lightbox */
}
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Icons from "./Icons";

interface LightboxProps {
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

const Lightbox: React.FC<LightboxProps> = ({
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
        <div style={{ scale: 0.75 }} className="transform scale-75">
          <Image
            src={src}
            alt={alt}
            width={1237}
            height={1524}
            layout="intrinsic"
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

    document.body.style.overflow = isOpen ? "hidden" : "";

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
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
          className="fixed inset-0 bg-neutral-50 z-50 flex items-center justify-center"
          onClick={onClose} // Allow clicking the background to close
        >
          <div
            className="relative flex h-full w-full justify-center items-center"
            onClick={(e) => e.stopPropagation()} // Prevent propagation to background
          >
            {/* Left arrow button */}
            <div className="absolute hidden left-0 z-40 h-full w-1/2 md:flex items-center justify-start">
              <button
                onClick={() => navigate("prev")}
                className="mr-4 text-neutral-600 font-light p-8 hover:cursor-pointer hover:text-black transition-color duration-300"
              >
                <Icons icon="chevron-left" width="80" height="80" />
              </button>
            </div>

            {/* Image container */}
            <div className="no-select flex flex-col items-center justify-center z-30">
              <div className="">
                <AnimatePresence>
                  <AnimatedImage
                    key={images[selectedIndex]} // Ensure this key changes to trigger animations
                    src={images[selectedIndex]}
                    alt={`Image ${selectedIndex + 1}`}
                  />
                </AnimatePresence>
              </div>

              {/* Indicators */}
              <div className="hidden absolute bottom-8 md:flex justify-center p-4 mt-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`inline-block h-3 w-3 mx-1 rounded-full ${
                      selectedIndex === index ? "bg-black" : "bg-gray-400"
                    }`}
                    onClick={() => setSelectedIndex(index)}
                  ></button>
                ))}
              </div>

              <div className="absolute bottom-4 flex md:hidden justify-center p-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`inline-block h-4 w-12 mx-1 rounded-full ${
                      selectedIndex === index ? "bg-black" : "bg-gray-400"
                    }`}
                    onClick={() => setSelectedIndex(index)}
                  ></button>
                ))}
              </div>
            </div>

            {/* Right arrow button */}
            <div className="absolute hidden right-0 z-40 h-full w-1/2 md:flex p-8 items-center justify-end">
              <button
                onClick={() => navigate("next")}
                className="mr-4 text-neutral-600 font-light p-2 hover:cursor-pointer hover:text-black transition-color duration-300"
              >
                <Icons icon="chevron-right" width="80" height="80" />
              </button>
            </div>

            {/* Close button */}
            <button
              className="z-50 absolute top-2 md:top-10 right-2 md:right-8 text-black text-lg font-semibold p-2 hover:cursor-pointer hover:text-black transition-color duration-300"
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

export default Lightbox;
