import React from "react";

interface QuantitySelectorProps {
  productId: string;
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (productId: string, newQuantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  productId,
  quantity,
  maxQuantity,
  onQuantityChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onQuantityChange(productId, Number(event.target.value));
  };

  const quantities = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  return (
    <select
      className="quantity-dropdown"
      value={quantity}
      onChange={handleChange}
    >
      {quantities.map((qty) => (
        <option key={qty} value={qty}>
          {qty}
        </option>
      ))}
    </select>
  );
};

export default QuantitySelector;
