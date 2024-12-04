import React, { useEffect, useState } from "react";

interface StickyAddToCartBarProps {
  onAddToCart: () => void;
}

const StickyAddToCartBar: React.FC<StickyAddToCartBarProps> = ({
  onAddToCart,
}) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const addToCartSection = document.getElementById("add-to-cart-section");
      const footerSection = document.getElementById("footer-section");
      const addToCartBar = document.getElementById("sticky-add-to-cart-bar");

      if (!addToCartSection || !footerSection || !addToCartBar) return;

      const footerTop = footerSection.getBoundingClientRect().top;
      const addToCartBottom = addToCartSection.getBoundingClientRect().bottom;

      if (addToCartBottom < 0 && footerTop > window.innerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="sticky-add-to-cart-bar"
      className={`w-full bg-blue-500 text-white text-center py-4 transition-transform duration-300 ${
        isSticky ? "fixed bottom-0" : "-bottom-full"
      }`}
    >
      <button onClick={onAddToCart} className="bg-red-500 p-2 rounded-lg">
        Add to Cart
      </button>
    </div>
  );
};

export default StickyAddToCartBar;
