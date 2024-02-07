import React, { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";

const LightboxComponent = ({ images, initialIndex, onClose }) => {
  const [emblaRef, embla] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    if (embla) {
      embla.scrollTo(initialIndex);
      const onSelect = () => {
        setSelectedIndex(embla.selectedScrollSnap());
      };
      embla.on("select", onSelect);
      return () => embla.off("select", onSelect);
    }
  }, [embla, initialIndex]);

  // Functions to navigate carousel
  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {images.map((image, index) => (
            <div className="embla__slide" key={index}>
              <img
                src={image.src}
                alt={`Image ${index}`}
                className="max-w-full max-h-full"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Navigation buttons */}
      <button
        onClick={scrollPrev}
        className="lightbox__nav lightbox__nav--prev"
      >
        ‹
      </button>
      <button
        onClick={scrollNext}
        className="lightbox__nav lightbox__nav--next"
      >
        ›
      </button>
      {/* Close button */}
      <button onClick={onClose} className="lightbox__close">
        X
      </button>
    </div>
  );
};

export default LightboxComponent;
