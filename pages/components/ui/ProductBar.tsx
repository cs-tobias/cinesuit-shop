"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import Button from "./Button";

const ProductBar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  return (
    
  );
};

export default ProductBar;
