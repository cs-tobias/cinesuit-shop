import React, { useState } from "react";
import CarouselItem from "./CarouselItem";
import { IoIosArrowBack } from "react-icons/io";

export default function Carousel({ items }) {
  const [activeIndex, setActiveIndex] = useState(0); // Keeping your original activeIndex

  const handleNextItem = () => {
    setActiveIndex((prev) => (prev + 1 < items.length ? prev + 1 : prev));
  };

  const handlePrevItem = () => {
    setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  return (
    <div className="carousel-container">
      {activeIndex > 0 && (
        <button
          className="carousel-btn-switch-card-left"
          onClick={handlePrevItem}
        >
          <IoIosArrowBack />
        </button>
      )}
      {items?.map((item, index) => (
        <CarouselItem key={index} index={index} activeIndex={activeIndex}>
          {item}
        </CarouselItem>
      ))}
      {activeIndex < items.length - 1 && (
        <button
          className="carousel-btn-switch-card-right"
          onClick={handleNextItem}
        >
          <IoIosArrowBack />
        </button>
      )}
    </div>
  );
}
