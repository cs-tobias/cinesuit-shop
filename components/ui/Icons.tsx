import React from "react";

// Update the IconName type to include "hand-heart" and "package"
type IconName =
  | "chevron-right"
  | "chevron-left"
  | "x"
  | "shopping-cart"
  | "player-play-filled"
  | "garden-cart"
  | "package"
  | "hand-heart";

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
  "shopping-cart": (
    <>
      <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M17 17h-11v-14h-2" />
      <path d="M6 5l14 1l-1 7h-13" />
    </>
  ),
  "player-play-filled": (
    <>
      <path
        d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
        fill="currentColor"
      />
    </>
  ),
  "garden-cart": (
    <>
      <path d="M17.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
      <path d="M6 8v11a1 1 0 0 0 1.806 .591l3.694 -5.091v.055" />
      <path d="M6 8h15l-3.5 7l-7.1 -.747a4 4 0 0 1 -3.296 -2.493l-2.853 -7.13a1 1 0 0 0 -.928 -.63h-1.323" />
    </>
  ),
  package: (
    <>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </>
  ),
  "hand-heart": (
    <>
      <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
      <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 15 6 6" />
      <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
    </>
  ),
};

const Icons: React.FC<IconProps> = ({
  icon,
  className = "",
  width = "24", // Adjust default width as per your SVG viewbox
  height = "24", // Adjust default height as per your SVG viewbox
  strokeWidth = "2", // Adjusted to match your icons' stroke-width
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
