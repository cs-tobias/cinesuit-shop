import React from "react";

type IconName = "chevron-right" | "chevron-left" | "x";

interface IconProps {
  icon: IconName;
  className?: string;
  width?: string;
  height?: string;
  strokeWidth?: string;
  stroke?: string;
}

const paths = {
  "chevron-right": <path d="M9 6l6 6l-6 6" />,
  "chevron-left": <path d="M15 6l-6 6l6 6" />,
  x: (
    <>
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </>
  ),
};

const Icons: React.FC<IconProps> = ({
  icon,
  className = "",
  width = "90",
  height = "90",
  strokeWidth = "1.2",
  stroke = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler ${className}`}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[icon]}
    </svg>
  );
};

export default Icons;
