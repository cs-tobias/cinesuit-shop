import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import RestockNotificationForm from "./RestockNotificationForm";
import { Product as ProductType } from "@/types/Types";

interface FixedAddToCartBarProps {
  productTitle: string;
  productPrice: string;
  onAddToCart: () => void;
  isVisible: boolean;
  isStopped: boolean; // New prop to control the stopping behavior
  mainProduct: ProductType;
  associatedProducts: ProductType[];
  selectedProduct: ProductType | null;
  handleProductSelection: (product: ProductType) => void;
}

const FixedAddToCartBar: React.FC<FixedAddToCartBarProps> = ({
  productTitle,
  productPrice,
  onAddToCart,
  isVisible,
  isStopped, // Use the new prop here
  mainProduct,
  associatedProducts,
  selectedProduct,
  handleProductSelection,
}) => {
  const [showClass, setShowClass] = useState("");

  useEffect(() => {
    if (isVisible) {
      setShowClass("show");
    } else {
      setShowClass("hide");
    }
  }, [isVisible]);

  return (
    <div
      className={`${
        isStopped ? "absolute bottom-auto" : "fixed bottom-0"
      } fixed-add-to-cart-bar bg-neutral-150 border-t border-gray-200 py-4 px-4 ${showClass}`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Product Information */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight">
            {mainProduct.title.split(" ").slice(0, 4).join(" ")}
          </h3>
          {selectedProduct && (
            <span className="text-md md:text-xl text-gray-700 font-light">
              <span className="mr-3.5">|</span>
              <span>
                {selectedProduct.title.split(" ").slice(-1).join(" ")}
              </span>
            </span>
          )}
        </div>

        {/* Product Selection */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-2 md:space-x-4">
          {associatedProducts.map((associatedProduct) => (
            <div
              key={associatedProduct.id}
              onClick={() => handleProductSelection(associatedProduct)}
              className={`p-2 px-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors duration-300 ${
                selectedProduct?.id === associatedProduct.id
                  ? "border-gray-600"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-2 text-md">
                <h3 className="select-none font-medium text-gray-800">
                  {associatedProduct.title.split(" ").slice(-1).join(" ")}
                </h3>
                <span className="select-none font-medium text-gray-600">
                  $
                  {associatedProduct.variants[0].price.amount
                    .toString()
                    .slice(0, -2)}
                </span>
              </div>
            </div>
          ))}
          <div
            onClick={() => handleProductSelection(mainProduct)}
            className={`p-2 px-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors duration-300 ${
              selectedProduct?.id === mainProduct.id ? "border-gray-600" : ""
            }`}
          >
            <div className="flex items-center space-x-2 text-md">
              <h3 className="select-none font-medium text-gray-800">
                {associatedProducts.length > 0 ? "Focus & Zoom" : "Focus"}
              </h3>
              <div className="flex items-center space-x-1">
                {mainProduct.variants[0].compareAtPrice && (
                  <span className="text-gray-500 pr-1 text-[13px] line-through select-none">
                    $
                    {mainProduct.variants[0].compareAtPrice.amount
                      .toString()
                      .slice(0, -2)}
                  </span>
                )}
                <span className="select-none font-medium text-gray-600">
                  $
                  {mainProduct.variants[0].price.amount.toString().slice(0, -2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 tracking-tight">
          <div className="text-xl md:text-2xl font-medium text-gray-900 flex gap-2">
            <p>Total</p>${productPrice}
          </div>
          <Button
            size="large"
            className="text-white bg-blue-1 hover:bg-blue-700 transition-colors duration-300 rounded-2xl px-6 py-2"
            onClick={onAddToCart}
          >
            Add to Cart
          </Button>
        </div>

        {/* Out of Stock Handling */}
        {!selectedProduct?.availableForSale && (
          <div className="flex flex-col items-center space-y-2 mt-2">
            <p className="text-lg font-medium text-gray-500">
              <span className="text-gray-900">We&apos;re out of stock!</span>{" "}
              Sign up for notifications to get notified when it&apos;s back in
              stock and to help us learn how many people are interested!
            </p>
            <RestockNotificationForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default FixedAddToCartBar;
