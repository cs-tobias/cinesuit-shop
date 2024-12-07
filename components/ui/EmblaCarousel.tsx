import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";

type SlideType = {
  url: string;
  alt?: string;
  onClick?: () => void; // Allow passing an onClick handler
};

type PropType = {
  slides: SlideType[];
  options?: EmblaOptionsType;
  setSelectedIndex?: (index: number) => void; // Allow controlling selectedIndex externally
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, setSelectedIndex } = props;
  const [selectedIndex, setLocalSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    const newIndex = emblaMainApi.selectedScrollSnap();
    setLocalSelectedIndex(newIndex);
    setSelectedIndex && setSelectedIndex(newIndex); // Update external selectedIndex if provided
    emblaThumbsApi.scrollTo(newIndex);
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container hover:cursor-pointer rounded-full">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <img
                src={slide.url}
                alt={slide.alt || `Slide ${index + 1}`}
                className="embla__slide__img object-contain max-w-full h-auto mx-auto rounded-3xl mb-4"
                onClick={slide.onClick} // Trigger the onClick handler if provided
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container flex md:justify-center">
            {slides.map((slide, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imageUrl={slide.url} // Pass the image URL to the thumb component
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
