import React, { useState, useEffect } from "react";

interface QuantitySelectorProps {
  initialQuantity: number;
  maxQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity,
  maxQuantity,
  onQuantityChange,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(initialQuantity);

  useEffect(() => {
    setSelectedQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setSelectedQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <select
      value={selectedQuantity}
      onChange={handleChange}
      className="border border-gray-300 rounded-md p-2 pr-6 pl-4 bg-transparent appearance-none relative"
      style={{
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="%236b7280" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.5rem center",
      }}
    >
      {Array.from({ length: maxQuantity }, (_, i) => i + 1).map((qty) => (
        <option key={qty} value={qty}>
          {qty}
        </option>
      ))}
    </select>
  );
};

export default QuantitySelector;
