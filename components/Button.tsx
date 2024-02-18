import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void; // Add an onClick event handler
  size?: "small" | "medium" | "large";
  className?: string; // Additional class names
  disabled?: boolean; // Add a disabled prop
}

const Button = ({
  children,
  onClick,
  size = "medium",
  className = "",
  disabled = false, // Default to false
}: ButtonProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "text-xs px-3 py-1";
      case "large":
        return "text-lg px-5 py-3";
      default: // medium
        return "text-base px-4 py-2";
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <button
      className={`font-light rounded-full ${sizeClasses} ${className}`}
      onClick={onClick} // Attach the onClick event handler
      disabled={disabled} // Apply the disabled prop to the button element
    >
      {children}
    </button>
  );
};

export default Button;
