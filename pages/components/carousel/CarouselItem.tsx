import React from "react";

export default function CarouselItem({ index, activeIndex, children }) {
  const offset = (index - activeIndex) / 4;
  const absOffset = Math.abs(offset);

  const cssTransformProperties = `
    translateZ(calc(${absOffset} * -55rem))
    translateY(calc(${index - activeIndex} * 50%)) 
    rotateX(calc(${offset} * -105deg)) 
    scaleY(calc(1 + ${absOffset} * -0.5))
    scale(${index === activeIndex ? 1 : 0.8})
  `;

  const cssOpacity = `${index === activeIndex ? "1" : "0.15"}`;
  const cssFilter = `${index === activeIndex ? "none" : "blur(10px)"}`;

  return (
    <div
      className="carousel-item"
      style={{
        transform: cssTransformProperties,
        opacity: cssOpacity,
        filter: cssFilter,
      }}
    >
      {children}
    </div>
  );
}
