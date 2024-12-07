import Footer from "@/components/page-elements/Footer";
import LightWeight from "@/components/page-elements/LightWeight";
import RestockNotificationForm from "@/components/page-elements/RestockNotificationForm";
import FreeShipping from "@/components/ui/freeShipping";
import MoneyBack from "@/components/ui/moneyBack";
import type { ProductProps, Product as ProductType } from "@/types/Types";
import { client } from "@/utils/shopifyClient";
import { EmblaOptionsType } from "embla-carousel";
import { GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useCart } from "../../components/contexts/CartContext";
import Lightbox from "../../components/ui/Lightbox";
import NavbarLight from "../../components/ui/NavbarLight";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import EmblaCarousel from "@/components/ui/EmblaCarousel";
import StickyAddToCartBar from "@/components/page-elements/StickyAddToCart";

// Fetching related products and handling props for the product page
interface StaticPropsParams {
  params: {
    handle: string;
  };
}

// Function to get the default product if the main product is not available
const getDefaultProduct = (
  mainProduct: ProductType,
  associatedProducts: ProductType[]
): ProductType => {
  if (mainProduct.availableForSale) {
    return mainProduct;
  }
  const inStockProduct = associatedProducts.find(
    (product) => product.availableForSale
  );
  return inStockProduct || mainProduct; // Fall back to mainProduct if no associated product is in stock
};

// Main Product component
const Product = ({
  mainProduct,
  associatedProducts,
  mainImagePaths,
  smallImagePaths = [],
  associatedProductsImages,
}: ProductProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    getDefaultProduct(mainProduct, associatedProducts)
  );
  const [currentImagePath, setCurrentImagePath] = useState(mainImagePaths[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); // Shared index state
  const { addToCart } = useCart();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const OPTIONS: EmblaOptionsType = {}; // Options for EmblaCarousel

  // Determine the images to display in the carousel
  const imagesForCarousel =
    selectedProduct && selectedProduct.handle === mainProduct.handle
      ? mainImagePaths
      : associatedProductsImages.find((p) => p.id === selectedProduct?.id)
          ?.images || [];

  // Handle product selection and image transition
  const handleProductSelection = (product: ProductType) => {
    setSelectedProduct(product);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const variantId = selectedProduct.variants[0].id;
      const quantity = 1;

      const productForCart = {
        ...selectedProduct,
        variants: selectedProduct.variants.map((variant) => ({
          ...variant,
          price: {
            ...variant.price,
            amount: variant.price.amount.toString(),
          },
        })),
        images: selectedProduct.images.map(({ id, src }) => ({
          id: id ?? "default-id",
          src,
        })),
      };
      addToCart(productForCart, variantId, quantity);
      router.push("/cart");
    }
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index); // Set the index of the clicked image
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  return (
    <>
      <NextSeo title={`${mainProduct.title}`} />

      <NavbarLight />

      <div className="bg-neutral-50 w-full h-full">
        <div className="container mx-auto flex flex-col md:flex-row items-start md:items-stretch px-8 xl:px-0">
          <div className="hidden lg:block ml-4 flex-1 mt-36 ">
            <div
              className={`
                ${isTransitioning ? "opacity-100" : "opacity-100"}`}
              style={{ transition: "" }}
            >
              <EmblaCarousel
                slides={imagesForCarousel.map((url, index) => ({
                  url,
                  onClick: () => openLightbox(index), // Pass the index on click
                }))}
                options={OPTIONS}
              />
            </div>

            {mainProduct.productType !== "tool" && (
              <div className="mt-3 flex justify-center items-center space-x-4">
                <FreeShipping />
                <div className="h-6 w-[1px] bg-neutral-700"></div>
                <MoneyBack />
              </div>
            )}
          </div>

          <Lightbox
            isOpen={isLightboxOpen}
            images={imagesForCarousel}
            onClose={closeLightbox}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex} // Sync with EmblaCarousel
          />

          <div className="flex-1 flex-col text-3xl lg:px-10 lg:pl-16 mt-20 lg:mt-28 ml-auto lg:max-w-1/2 md:px-16">
            {mainProduct.productType === "new" && (
              <div className="text-red-700 pl-2 text-xl md:text-center lg:text-left">
                New
              </div>
            )}

            <div className="text-5xl md:text-center lg:text-left md:text-7xl lg:text-7xl tracking-tighter leading-11 font-semibold lg:pt-4 lg:mb-8">
              {mainProduct.title
                .split(" ")
                .slice(0, 5)
                .map((word, index) => (
                  <React.Fragment key={index}>
                    <span>{word}</span>
                    {index === 1 && <br />}
                    {index !== 1 && " "}
                  </React.Fragment>
                ))}
            </div>

            {/* Replace Mobile Product Image with EmblaCarousel */}
            <div className={`lg:hidden px-6 mt-6`}>
              <EmblaCarousel
                slides={imagesForCarousel.map((url, index) => ({
                  url,
                }))}
                options={OPTIONS}
              />
            </div>

            <p className="hidden md:block text-base lg:text-lg font-medium tracking-tight">
              {mainProduct.description}
            </p>

            {mainProduct.productType !== "tool" && (
              <p className="mt-8 mb-2 text-2xl font-semibold leading-11 text-neutral-900 tracking-tight">
                Configure your Cinesuit
              </p>
            )}

            <div className="w-full">
              {associatedProducts.map((associatedProduct) => (
                <div
                  key={associatedProduct.id}
                  onClick={() => handleProductSelection(associatedProduct)}
                  className={`p-4 border-2 bg-neutral-50 rounded-xl my-2 cursor-pointer hover:border-blue-2 transition-colors duration-300 ${
                    selectedProduct?.id === associatedProduct.id
                      ? "border-blue-1 hover:border-blue-2"
                      : "border-gray-300 hover:border-neutral-400"
                  }`}
                >
                  <div className="flex justify-between items-center text-lg">
                    <h3 className="select-none">
                      {associatedProduct.title.split(" ").slice(-1).join(" ")}
                    </h3>

                    <span className="select-none">
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
                className={`p-4 border-2 rounded-xl my-2 cursor-pointer hover:border-blue-2 transition-colors duration-300 ${
                  selectedProduct?.id === mainProduct.id
                    ? "border-blue-1 hover:border-blue-2"
                    : "border-gray-300 hover:border-neutral-400"
                }`}
              >
                <div className="flex justify-between items-center text-lg">
                  <h3 className="select-none">
                    {mainProduct.productType === "tool"
                      ? mainProduct.title
                      : associatedProducts.length > 0
                      ? "Focus & Zoom"
                      : "Focus"}
                  </h3>
                  <div>
                    {mainProduct.variants[0].compareAtPrice && (
                      <span className="text-gray-500 pr-1 text-[15px] line-through select-none">
                        $
                        {mainProduct.variants[0].compareAtPrice.amount
                          .toString()
                          .slice(0, -2)}
                      </span>
                    )}
                    <span className="select-none">
                      $
                      {mainProduct.variants[0].price.amount
                        .toString()
                        .slice(0, -2)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="flex justify-center text-sm text-neutral-500 mt-4">
                Lens not included.
              </p>

              <div className="flex items-center justify-between py-2 px-1 mx-auto max-w-5xl">
                <div className="text-xl md:text-2xl font-medium tracking-tight">
                  <p
                    className={
                      selectedProduct?.availableForSale
                        ? "text-black select-none"
                        : "text-neutral-700 text-lg md:text-xl select-none"
                    }
                  >
                    {selectedProduct?.availableForSale ? "Total" : ""}
                  </p>
                </div>
                {selectedProduct?.availableForSale ? (
                  <div className="flex items-center gap-4">
                    <div>
                      {selectedProduct.variants[0].compareAtPrice && (
                        <span className="text-gray-500 pr-1 text-[19px] line-through">
                          $
                          {selectedProduct.variants[0].compareAtPrice.amount
                            .toString()
                            .slice(0, -2)}
                        </span>
                      )}
                      <span className="text-xl md:text-2xl font-medium text-black">
                        $
                        {selectedProduct.variants[0].price.amount
                          .toString()
                          .slice(0, -2)}
                      </span>
                    </div>

                    <Button
                      size="large"
                      className="text-white bg-blue-1 hover:bg-blue-600 transition-colors duration-300 rounded-2xl px-12"
                      onClick={handleAddToCart}
                    >
                      Pre-order
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col w-full items-center gap-2 mt-2">
                    <p className="text-lg md:text-lg font-medium leading-11 text-neutral-500 mb-2">
                      <span className="text-black">
                        We&apos;re out of stock!
                      </span>{" "}
                      Sign up for notifications to get notified when it&apos;s
                      back in stock and to help us learn how many people are
                      interested!
                    </p>
                    <RestockNotificationForm />
                  </div>
                )}
              </div>
              <div>
                <h1 className="my-2 text-base md:text-lg tracking-tight font-semibold md:text-right mx-1">
                  Pre-orders are expected to ship in 1-2 months
                </h1>
              </div>

              <div className="py-2">
                <div className="w-full h-[1px] bg-neutral-300"></div>
              </div>
            </div>

            <div className="text-lg pt-2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How Cinesuit Works</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Cinesuit rings feature an inner rubber lining. When the
                      screws are tightened, the rubber makes contact with the
                      barrel, generating friction that holds the ring firmly in
                      place without slipping. This creates a seamless extension
                      of your lens.
                    </p>
                    <h4 className="font-medium mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside pl-4">
                      <li className="mb-2">
                        <strong>Solid Aluminum Construction:</strong> Machined
                        from solid aluminium with very high tolerances, reaching
                        as high as 0.02mm.
                      </li>
                      <li className="mb-2">
                        <strong>Matched Surface:</strong> Having studied Sigmas
                        surface treatment, we have eumulated it, creating a
                        seamless look, where Cinesuit merges visually with your
                        lens.
                      </li>
                      <li>
                        <strong>Precision Fit:</strong> The rubber lining grips
                        the barrel securely, preventing any movement.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Shipping &amp; Taxes</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      We offer <strong>FREE shipping</strong> to most countries,
                      with a standard delivery time of 7-11 days. In many
                      locations, VAT is covered by us—no additional fees for
                      you.
                    </p>
                    <h4 className="font-medium mb-2">Important Notes:</h4>
                    <ul className="list-disc list-inside pl-4">
                      <li className="mb-2">
                        <strong>Import Charges:</strong> Depending on your
                        country, there may be import taxes or other fees that
                        are not covered by us and are the customer&apos;s
                        responsibility.
                      </li>
                      <li className="mb-2">
                        <strong>Expedited Shipping:</strong> If you choose DHL,
                        FedEx, or UPS for faster delivery, be aware that VAT may
                        apply as per your country&rsquo;s regulations.
                      </li>
                      <li>
                        <strong>Check Eligibility:</strong> Not sure if your
                        country qualifies for free shipping? Enter your address
                        at checkout to view the available options.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How to Install</AccordionTrigger>
                  <AccordionContent>
                    <a href="/instructions" target="_blank">
                      <p className="text-blue-1 font-medium hover:underline hover:cursor-pointer">
                        Click to watch the Installation Video
                      </p>
                    </a>
                    <ol className="list-decimal list-inside pl-4 mt-2">
                      <li className="mb-2">
                        <strong>Remove the Rubber Ring:</strong> Use the Rubber
                        Removal Tool to gently slide under the lens&apos;s
                        rubber ring and pull it off. The tool&apos;s
                        carbon-reinforced plastic ensures it doesnt scratch your
                        lens.
                      </li>
                      <li className="mb-2">
                        <strong>Attach the Cinesuit Half-Rings:</strong>{" "}
                        Position each half-ring on the lens, aligning them
                        carefully. Insert the screws provided; we&apos;ve
                        included 2 extras just in case.
                      </li>
                      <li className="mb-2">
                        <strong>Tighten the Screws:</strong> Use a small
                        Phillips-head precision screwdriver to tighten the
                        screws securely.{" "}
                        <strong>!!Make sure not to overtighten!!</strong>
                      </li>
                      <li>
                        <strong>Finalize Installation:</strong> Ensure
                        everything is securely in place, and you&apos;re all
                        set!
                      </li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        <LightWeight />

        <div className="bg-neutral-50 w-full h-full">
          <div className="container mx-auto flex flex-col md:flex-row items-start md:items-stretch px-8 xl:px-0">
            <div className="hidden lg:block ml-4 flex-1 mt-36 ">
              <div
                className={`
                ${isTransitioning ? "opacity-100" : "opacity-100"}`}
                style={{ transition: "" }}
              >
                <EmblaCarousel
                  slides={imagesForCarousel.map((url, index) => ({
                    url,
                    onClick: () => openLightbox(index), // Pass the index on click
                  }))}
                  options={OPTIONS}
                />
              </div>

              {mainProduct.productType !== "tool" && (
                <div className="mt-3 flex justify-center items-center space-x-4">
                  <FreeShipping />
                  <div className="h-6 w-[1px] bg-neutral-700"></div>
                  <MoneyBack />
                </div>
              )}
            </div>

            <Lightbox
              isOpen={isLightboxOpen}
              images={imagesForCarousel}
              onClose={closeLightbox}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex} // Sync with EmblaCarousel
            />

            <div className="flex-1 flex-col text-3xl lg:px-10 lg:pl-16 mt-20 lg:mt-28 ml-auto lg:max-w-1/2 md:px-16">
              {mainProduct.productType === "new" && (
                <div className="text-red-700 pl-2 text-xl md:text-center lg:text-left">
                  New
                </div>
              )}

              <div className="text-5xl md:text-center lg:text-left md:text-7xl lg:text-7xl tracking-tighter leading-11 font-semibold lg:pt-4 lg:mb-8">
                {mainProduct.title
                  .split(" ")
                  .slice(0, 5)
                  .map((word, index) => (
                    <React.Fragment key={index}>
                      <span>{word}</span>
                      {index === 1 && <br />}
                      {index !== 1 && " "}
                    </React.Fragment>
                  ))}
              </div>

              {/* Replace Mobile Product Image with EmblaCarousel */}
              <div className={`lg:hidden px-6`}>
                <EmblaCarousel
                  slides={imagesForCarousel.map((url, index) => ({
                    url,
                  }))}
                  options={OPTIONS}
                />
              </div>

              <p className="hidden md:block text-base lg:text-lg font-medium tracking-tight">
                {mainProduct.description}
              </p>

              {mainProduct.productType !== "tool" && (
                <p className="mt-8 mb-2 text-2xl font-semibold leading-11 text-neutral-900 tracking-tight">
                  Configure your Cinesuit
                </p>
              )}

              <div className="w-full">
                {associatedProducts.map((associatedProduct) => (
                  <div
                    key={associatedProduct.id}
                    onClick={() => handleProductSelection(associatedProduct)}
                    className={`p-4 border-2 bg-neutral-50 rounded-xl my-2 cursor-pointer hover:border-blue-2 transition-colors duration-300 ${
                      selectedProduct?.id === associatedProduct.id
                        ? "border-blue-1 hover:border-blue-2"
                        : "border-gray-300 hover:border-neutral-400"
                    }`}
                  >
                    <div className="flex justify-between items-center text-lg">
                      <h3 className="select-none">
                        {associatedProduct.title.split(" ").slice(-1).join(" ")}
                      </h3>

                      <span className="select-none">
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
                  className={`p-4 border-2 rounded-xl my-2 cursor-pointer hover:border-blue-2 transition-colors duration-300 ${
                    selectedProduct?.id === mainProduct.id
                      ? "border-blue-1 hover:border-blue-2"
                      : "border-gray-300 hover:border-neutral-400"
                  }`}
                >
                  <div className="flex justify-between items-center text-lg">
                    <h3 className="select-none">
                      {mainProduct.productType === "tool"
                        ? mainProduct.title
                        : associatedProducts.length > 0
                        ? "Focus & Zoom"
                        : "Focus"}
                    </h3>
                    <div>
                      {mainProduct.variants[0].compareAtPrice && (
                        <span className="text-gray-500 pr-1 text-[15px] line-through select-none">
                          $
                          {mainProduct.variants[0].compareAtPrice.amount
                            .toString()
                            .slice(0, -2)}
                        </span>
                      )}
                      <span className="select-none">
                        $
                        {mainProduct.variants[0].price.amount
                          .toString()
                          .slice(0, -2)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="flex justify-center text-sm text-neutral-500 mt-4">
                  Lens not included.
                </p>

                <div className="flex items-center justify-between py-2 px-1 mx-auto max-w-5xl">
                  <div className="text-xl md:text-2xl font-medium tracking-tight">
                    <p
                      className={
                        selectedProduct?.availableForSale
                          ? "text-black select-none"
                          : "text-neutral-700 text-lg md:text-xl select-none"
                      }
                    >
                      {selectedProduct?.availableForSale ? "Total" : ""}
                    </p>
                  </div>
                  {selectedProduct?.availableForSale ? (
                    <div className="flex items-center gap-4">
                      <div>
                        {selectedProduct.variants[0].compareAtPrice && (
                          <span className="text-gray-500 pr-1 text-[19px] line-through">
                            $
                            {selectedProduct.variants[0].compareAtPrice.amount
                              .toString()
                              .slice(0, -2)}
                          </span>
                        )}
                        <span className="text-xl md:text-2xl font-medium text-black">
                          $
                          {selectedProduct.variants[0].price.amount
                            .toString()
                            .slice(0, -2)}
                        </span>
                      </div>

                      <Button
                        size="large"
                        className="text-white bg-blue-1 hover:bg-blue-600 transition-colors duration-300 rounded-2xl px-12"
                        onClick={handleAddToCart}
                      >
                        Pre-order
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col w-full items-center gap-2 mt-2">
                      <p className="text-lg md:text-lg font-medium leading-11 text-neutral-500 mb-2">
                        <span className="text-black">
                          We&apos;re out of stock!
                        </span>{" "}
                        Sign up for notifications to get notified when it&apos;s
                        back in stock and to help us learn how many people are
                        interested!
                      </p>
                      <RestockNotificationForm />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="my-2 mb-32 text-base md:text-lg tracking-tight font-semibold text-center md:text-right mx-1">
                    Pre-orders are expected to ship in 1-2 months
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Fetching data for the product page
export async function getStaticProps({ params }: StaticPropsParams) {
  const handle = params.handle;

  const fetchedMainProduct = await client.product.fetchByHandle(handle);

  const associatedProductType = `${fetchedMainProduct.title}_bundle`;
  const productsWithSpecificType = await client.product.fetchQuery({
    query: `productType:${associatedProductType}`,
    first: 4,
  });

  const associatedProducts = productsWithSpecificType.filter(
    (product) => product.id !== fetchedMainProduct.id
  );

  const numberOfImages = 5;
  const mainImagePaths = Array.from(
    { length: numberOfImages },
    (_, index) => `/images/${handle}/image${index}.png`
  );

  const associatedProductsImages = associatedProducts.map((product) => ({
    id: product.id,
    images: Array.from(
      { length: numberOfImages },
      (_, index) => `/images/${product.handle}/image${index}.png`
    ),
  }));

  return {
    props: {
      mainProduct: JSON.parse(JSON.stringify(fetchedMainProduct)),
      associatedProducts: JSON.parse(JSON.stringify(associatedProducts)),
      mainImagePaths,
      associatedProductsImages,
    },
    revalidate: 10,
  };
}

// Generating paths for each product page
export const getStaticPaths: GetStaticPaths = async () => {
  const allProducts = await client.product.fetchAll();
  const paths = allProducts.map((product) => ({
    params: { handle: product.handle },
  }));

  return { paths, fallback: "blocking" };
};

export default Product;
