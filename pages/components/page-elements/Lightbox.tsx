import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Icons from "../ui/Icons";

const Lightbox = ({ images, isOpen, onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigate = (direction) => {
    setSelectedIndex((prevIndex) => {
      if (direction === "next") {
        return (prevIndex + 1) % images.length;
      } else {
        return (prevIndex - 1 + images.length) % images.length;
      }
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
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
              <button className="mr-4 text-neutral-600 font-light p-8 hover:cursor-pointer hover:text-black transition-color duration-300">
                <Icons icon="chevron-left"></Icons>
              </button>
            </div>

            {/* Image container */}
            <div className="no-select flex flex-col items-center justify-center z-30">
              <Image
                src={images[selectedIndex]}
                alt={`Image ${selectedIndex + 1}`}
                layout="responsive"
                width={1237}
                height={1524}
                className="w-auto mx-auto max-h-[1000px] mb-6"
              />

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

            {/* Right navigation area */}
            <div
              className="absolute hidden right-0 z-40 h-full w-1/2 md:flex p-8 items-center justify-end"
              onClick={() => navigate("next")}
            >
              <button className="mr-4 text-neutral-600 font-light p-2 hover:cursor-pointer hover:text-black transition-color duration-300">
                <Icons icon="chevron-right"></Icons>
              </button>
            </div>

            {/* Close button */}
            <button
              className="z-50 absolute top-2 md:top-10 right-2 md:right-8  text-black text-lg font-semibold p-2 hover:cursor-pointer hover:text-black transition-color duration-300"
              onClick={onClose}
            >
              <Icons icon="x" width="48" height="48" strokeWidth="1.5"></Icons>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
