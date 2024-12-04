import React from "react";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  imageUrl: string; // Add this prop
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, imageUrl } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__button"
      >
        <img
          src={imageUrl}
          alt={`Thumbnail ${index + 1}`}
          className="embla-thumbs__slide__img object-cover w-full h-full"
        />
      </button>
    </div>
  );
};
