"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Button from "../Button";
import { useCart } from "../contexts/CartContext";
import { client } from "@/utils/shopifyClient";
import { Product } from "@/types/Types"; // Use your custom Product type
import Counter from "../animations/Counter";
import Countdown from "../animations/Countdown";

const LightWeight: React.FC = () => {
  const [toolProducts, setToolProducts] = useState<Product[]>([]);
  const [isVisibleWeight, setIsVisibleWeight] = useState(false);
  const [isVisibleTolerance, setIsVisibleTolerance] = useState(false);
  const refWeight = useRef(null);
  const refTolerance = useRef(null);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const observerWeight = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisibleWeight(true);
          observerWeight.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const observerTolerance = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisibleTolerance(true);
          observerTolerance.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (refWeight.current) {
      observerWeight.observe(refWeight.current);
    }

    if (refTolerance.current) {
      observerTolerance.observe(refTolerance.current);
    }

    return () => {
      if (refWeight.current) {
        observerWeight.unobserve(refWeight.current);
      }
      if (refTolerance.current) {
        observerTolerance.unobserve(refTolerance.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await client.product.fetchAll();

      const tools = fetchedProducts
        .filter(
          (product: any) =>
            product.productType === "tool" &&
            (product.title.includes("Rubber Removal Tool") ||
              product.title.includes("Precision Screwdriver"))
        )
        .map(
          (product: any): Product => ({
            id: product.id,
            handle: product.handle,
            availableForSale: product.availableForSale,
            productType: product.productType,
            title: product.title,
            description: product.description,
            vendor: product.vendor,
            images: product.images.map((image: any) => ({
              id: image.id ?? undefined,
              src: image.src,
            })),
            variants: product.variants.map((variant: any) => ({
              compareAtPrice: variant.compareAtPrice
                ? {
                    ...variant.compareAtPrice,
                    amount: parseFloat(variant.compareAtPrice.amount),
                  }
                : null,
              id: variant.id,
              price: { amount: parseFloat(variant.price.amount) },
            })),
          })
        );

      setToolProducts(tools);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    const product = toolProducts.find((p) => p.id === productId);

    if (!product || !product.variants || product.variants.length === 0) {
      console.error("Product variants are not defined or empty.");
      return;
    }

    const variantId = product.variants[0].id;
    const quantity = 1;

    const productForCart = {
      ...product,
      variants: product.variants.map((variant) => ({
        ...variant,
        price: {
          ...variant.price,
          amount: variant.price.amount.toString(),
        },
      })),
      images: product.images.map(({ id, src }) => ({
        id: id ?? "default-id", // Ensure id is a string
        src,
      })),
    };

    addToCart(productForCart, variantId, quantity);
  };

  const isInCart = (productId: string) => {
    return cart.some((item) => item.product.id === productId);
  };

  return (
    <div className="w-full h-full bg-neutral-50 px-8 md:px-20">
      {/* Industry Standard */}
      <div className="py-10">
        <div className="container pl-0 mx-auto py-10">
          <h1 className="py-6 text-5xl md:text-6xl font-medium tracking-tighter">
            Industry Standard.
          </h1>
        </div>

        <div className="container mx-auto bg-neutral-150 rounded-3xl flex items-center px-10 justify-between lg:bg-cover bg-center bg-[url('/images/cs-013-sm.jpg')] lg:bg-[url('/images/001_photo-1.jpg')]">
          <div className="hidden lg:block text-white text-center flex-1 max-w-lg mx-auto">
            <p className="text-lg md:text-4xl font-medium tracking-tighter">
              Industry Standard 0.8 mod gears <br />
              <span className="md:text-lg font-extralight tracking-normal">
                Compatible with all standard follow focus systems.
              </span>
            </p>
          </div>

          {/* Placeholder to maintain layout */}
          <div className="w-[250px] md:w-[450px] lg:w-[500px] xl:w-[650px] h-[500px] flex-shrink-0"></div>
        </div>
      </div>

      {/* Materials */}
      <div className="py-10" ref={refTolerance}>
        <div className="container pl-0 mx-auto py-10">
          <h1 className="text-right py-6 text-5xl md:text-6xl font-medium tracking-tighter">
            Solid. Reliable.
          </h1>
        </div>

        <div className="container mx-auto bg-neutral-150 rounded-3xl flex items-center px-10 justify-between lg:bg-cover bg-center bg-[url('/images/cs-013-sm.jpg')] lg:bg-[url('/images/001_photo-1.jpg')]">
          {/* Placeholder to maintain layout */}
          <div className="w-[250px] md:w-[450px] lg:w-[500px] xl:w-[650px] h-[500px] flex-shrink-0"></div>

          {/* Text Section */}
          <div className="hidden lg:block text-white text-center flex-1 max-w-xl mx-auto">
            <h3 className="text-lg md:text-4xl font-medium tracking-tighter">
              Machined with{" "}
              {isVisibleTolerance && (
                <Countdown
                  startValue={1}
                  endValue={0.02}
                  duration={1500}
                  precision={2}
                />
              )}
              mm tolerances.
            </h3>
            <h5 className="my-4 font-extralight tracking-normal leading-normal">
              Only the best is enough. Cinesuit fits perfectly, and is held in
              place with the rubber component. Making it rock solid when
              installed, but easily removed if you want.
            </h5>
          </div>
        </div>
      </div>

      {/* Ultra Lightweight */}
      <div className="py-10" ref={refWeight}>
        <div className="container pl-0 mx-auto py-10">
          <h1 className="py-6 text-5xl md:text-6xl font-medium tracking-tighter">
            Ultra Lightweight.
          </h1>
        </div>

        <div className="container mx-auto bg-neutral-150 rounded-3xl flex items-center px-10 justify-between lg:bg-cover bg-center bg-[url('/images/cs-013-sm.jpg')] lg:bg-[url('/images/001_photo-1.jpg')]">
          <div className="hidden lg:block text-white text-center flex-1 max-w-lg mx-auto">
            <p className="text-lg md:text-4xl font-medium tracking-tighter">
              Adding only{" "}
              {isVisibleWeight && (
                <Counter startValue={240} endValue={273} duration={1500} />
              )}
              g to your lens
              <br />{" "}
              <span className="md:text-lg font-extralight tracking-normal">
                More text about the weight, useful for setups.
              </span>
            </p>
          </div>

          {/* Placeholder to maintain layout */}
          <div className="w-[250px] md:w-[450px] lg:w-[500px] xl:w-[650px] h-[500px] flex-shrink-0"></div>
        </div>
      </div>

      {/* Whats in the box */}
      <div className="py-10">
        <div className="container pl-0 mx-auto py-10">
          <h1 className="text-center py-6 text-4xl md:text-5xl font-medium tracking-tighter">
            Whats in the box
          </h1>
        </div>

        <div className="container max-w-6xl mx-auto bg-neutral-100 rounded-3xl px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/cinesuit-for-sigma-1835/image0.png" // Replace with your actual image path
                width={400}
                height={300}
                alt="Cinesuit image"
                className="object-contain my-6"
              />
              <p className="text-md md:text-lg font-light tracking-tight">
                Cinesuit geared rings <br />{" "}
                <span className="text-sm font-bold tracking-normal">
                  (Two half rings)
                </span>
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/cinesuit-for-sigma-1835/image0.png" // Replace with your actual image path
                width={400}
                height={300}
                alt="Cinesuit image"
                className="object-contain my-6"
              />
              <p className="text-md md:text-lg font-light tracking-tight">
                Screws <br />{" "}
                <span className="text-sm font-bold tracking-normal">
                  2 screws (+2 backups screws)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Installation essentials */}
      <div className="my-16">
        <div className="container px-0 mx-auto py-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="py-10 text-5xl md:text-6xl font-medium tracking-tighter">
              Installation Essentials.
            </h2>

            <a
              href="/instructions"
              target="_blank"
              className="text-blue-2 text-lg font-light hover:underline"
            >
              Installation Guide &gt;
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {toolProducts.map((product) => {
              const alreadyInCart = cart.some(
                (item) => item.product.id === product.id
              );

              return (
                <div
                  key={product.id}
                  className="bg-neutral-150 p-8 rounded-3xl flex flex-col items-center text-center"
                >
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 tracking-tight mt-4">
                    {product.title}
                  </h3>
                  <p className="text-md md:text-lg font-light mb-4 mx-8">
                    {product.description}
                  </p>
                  <div className="flex flex-col items-center mt-2">
                    <p className="text-lg font-medium mb-1">
                      ${product.variants[0].price.amount.toFixed(2)}
                    </p>
                    <h3
                      className={`text-blue-1 text-sm font-medium ${
                        alreadyInCart
                          ? "text-neutral-400 cursor-default"
                          : "hover:underline hover:cursor-pointer"
                      }`}
                      onClick={() => handleAddToCart(product.id)}
                    >
                      {alreadyInCart ? "Added to Cart" : "Add to Cart"}
                    </h3>
                  </div>
                  <Image
                    src={`/images/${product.handle}/image0.png`} // Replace with the correct image path
                    width={300}
                    height={200}
                    alt={product.title}
                    className="object-contain mt-4"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightWeight;
