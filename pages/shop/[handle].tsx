import type { Product as ProductType, ProductProps } from "@/types/Types";
import { client } from "@/utils/shopifyClient";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCart } from "../../components/contexts/CartContext";
import Footer from "../components/page-elements/Footer";
import WhatsIncluded from "../components/page-elements/WhatsIncluded";
import Button from "../../components/Button";
import Lightbox from "../../components/ui/Lightbox";
import NavbarLight from "../../components/ui/NavbarLight";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

const Product = ({
  mainProduct,
  associatedProducts,
  imagePaths,
  smImagePaths,
}: ProductProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    mainProduct
  );

  const [currentImagePath, setCurrentImagePath] = useState(imagePaths[0]);

  // State to manage lightbox visibility
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Function to open the lightbox
  const openLightbox = () => setIsLightboxOpen(true);

  // Function to close the lightbox
  const closeLightbox = () => setIsLightboxOpen(false);
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { addToCart } = useCart();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Assuming video loads quickly, otherwise consider more robust load detection
    setIsLoaded(true);
  }, []);
  // Debugging useEffect for scroll position
  useEffect(() => {
    console.log("Scroll position before carousel update:", window.scrollY);

    // This function will run when the component unmounts or before the next re-render
    return () => {
      console.log("Scroll position after carousel update:", window.scrollY);
    };
  }, [selectedIndex]); // This effect depends on selectedIndex, so it runs before and after it changes

  const handleProductSelection = (product: ProductType) => {
    setSelectedProduct(product);

    // Assuming each product variant has a unique handle and images are named after the variant's handle.
    // Update this logic based on how your images are named and stored.
    const variantImagePath = `/images/${product.handle}/image0.png`; // Adjust according to how you store and name your variant images.
    setCurrentImagePath(variantImagePath);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const variantId = selectedProduct.variants[0].id; // Assuming you want to add the first variant
      const quantity = 1; // The quantity you want to add to the cart
      const productWithCorrectedAmount = {
        ...selectedProduct,
        variants: selectedProduct.variants.map((variant) => ({
          ...variant,
          price: {
            ...variant.price,
            amount: variant.price.amount.toString(), // Ensure amount is a string
          },
        })),
        images: selectedProduct.images.map(({ id, src }) => ({
          id: id ?? "default-id", // Provide a default id if undefined
          src,
        })),
      };

      // Now call addToCart with the required three arguments
      addToCart(productWithCorrectedAmount, variantId, quantity);
      router.push("/cart");
    }
  };

  const navigateCarousel = (
    direction: string,
    event: { preventDefault: () => void }
  ) => {
    event.preventDefault(); // Prevent default action

    if (direction === "left") {
      setSelectedIndex(
        (prevIndex) => (prevIndex - 1 + imagePaths.length) % imagePaths.length
      );
    } else {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    }
  };

  const TextWrapper = dynamic(
    () => import("../../components/animations/TextWrapper"),
    {
      ssr: false,
    }
  );
  const RotWrapper = dynamic(
    () => import("../../components/animations/RotWrapper"),
    {
      ssr: false,
    }
  );

  // Component rendering
  return (
    <>
      <NavbarLight />
      <div className="bg-neutral-100 w-full min-h-screen ">
        <div className="container mx-auto flex flex-col md:flex-row items-start md:items-stretch">
          <div
            id="image-container"
            className="rounded-xl hidden lg:block"
            style={{
              position: "sticky",
              top: "180px",
              height: "calc(70vh - 5px)",
            }}
          >
            <Image
              src={currentImagePath}
              alt={`Product Image ${selectedIndex}`}
              width={1237}
              height={1524}
              layout="fixed"
              className="w-full mx-auto h-full object-cover rounded-xl hover:cursor-pointer max-h-[860px] no-select"
              onClick={openLightbox} // This line triggers the lightbox on click
              priority
            />
            <p
              onClick={openLightbox}
              className="mt-6 text-lg flex justify-center mx-auto text-neutral-600 hover:text-black hover:cursor-pointer transition duration-300 rounded"
            >
              View Gallery
            </p>
          </div>

          <Lightbox
            isOpen={isLightboxOpen}
            images={imagePaths}
            onClose={closeLightbox}
            selectedIndex={0}
          />
          <div
            className="flex-1 flex flex-col text-3xl lg:px-10 lg:pl-16 mt-20 lg:mt-32 ml-auto lg:max-w-[80%]"
            // Removed inline style, added Tailwind's responsive utility class
          >
            {mainProduct.productType === "new" && (
              <div className="text-red-700 pl-2 text-xl md:text-center lg:text-left">
                New
              </div>
            )}
            <div className="text-5xl md:text-center lg:text-left md:text-8xl lg:text-7xl tracking-tighter leading-11 font-semibold lg:pt-4 lg:mb-8 no-extra-breaks">
              {mainProduct.title
                .split(" ")
                .slice(0, 4)
                .map((word, index) => (
                  <React.Fragment key={index}>
                    <span>{word}</span>
                    {index === 1 && <br />}
                    {index !== 1 && " "}
                  </React.Fragment>
                ))}
            </div>
            <div className="lg:hidden py-3">
              <Image
                src={smImagePaths[selectedIndex]}
                alt={`Product Image ${selectedIndex}`}
                width={1500}
                height={700}
                className="mx-auto rounded-2xl"
                onClick={openLightbox} // This line triggers the lightbox on click
                priority
              />

              {/* Navigation Buttons */}
            </div>
            <p className="hidden md:block mb-8 text-lg lg:text-xl font-medium leading-7 text-neutral-500">
              {(() => {
                const words = mainProduct.description.split(" ");
                const lastTenWordsStartIndex = Math.max(words.length - 11, 0);
                return (
                  <>
                    {words.slice(0, lastTenWordsStartIndex).join(" ")}
                    {lastTenWordsStartIndex < words.length && (
                      <span className="">
                        {" " + words.slice(lastTenWordsStartIndex).join(" ")}
                      </span>
                    )}
                  </>
                );
              })()}
            </p>

            <p className="mb-2 text-2xl font-semibold leading-11 text-neutral-900 tracking-tight">
              Configure your Cinesuit
            </p>

            <div className="w-full">
              {/* Associated Products */}
              {associatedProducts.map((associatedProduct) => (
                <div
                  key={associatedProduct.id}
                  onClick={() => handleProductSelection(associatedProduct)}
                  className={`p-4 border-[1px] bg-neutral-100 rounded-2xl my-2 cursor-pointer hover:border-neutral-400 transition-colors duration-300 ${
                    selectedProduct?.id === associatedProduct.id
                      ? "border-neutral-600 hover:border-neutral-600" // Apply no-hover class to the selected item
                      : "border-gray-300 hover:border-neutral-400" // Keep hover effect for unselected items
                  }`}
                >
                  <div className="flex justify-between items-center text-lg">
                    <h3 className="">
                      {associatedProduct.title.split(" ").slice(-1).join(" ")}
                    </h3>
                    <span>
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
                className={`p-4 border-[1px] rounded-2xl my-2 cursor-pointer hover:border-neutral-400 transition-colors duration-300 ${
                  selectedProduct?.id === mainProduct.id
                    ? "border-neutral-500 hover:border-neutral-600" // Apply no-hover class to the selected item
                    : "border-gray-300 hover:border-neutral-400" // Keep hover effect for unselected items
                }`}
              >
                <div className="flex justify-between items-center text-lg">
                  <h3 className="">
                    {associatedProducts.length > 0 ? "Focus & Zoom" : "Focus"}
                  </h3>
                  <span>
                    $
                    {mainProduct.variants[0].price.amount
                      .toString()
                      .slice(0, -2)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 px-1 mx-auto max-w-5xl">
                <div className="text-xl md:text-2xl font-medium tracking-tight text-black">
                  <p>Total</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xl md:text-2xl font-medium text-black">
                    <p>
                      $
                      {selectedProduct
                        ? selectedProduct.variants[0].price.amount
                        : "0.00"}
                    </p>
                  </div>
                  <Button
                    size="large"
                    className="text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300 rounded-2xl px-12"
                    onClick={handleAddToCart}
                  >
                    Add to bag
                  </Button>
                </div>
              </div>
              <div className="py-2">
                <div className="w-full h-[1px] bg-neutral-300"></div>
              </div>
            </div>

            <p className="mt-8 mb-2 text-2xl font-semibold leading-11 text-neutral-900 tracking-tight">
              Whats in the box?
            </p>
            <div className="text-base font-normal leading-11 text-neutral-500">
              <li className="">Cinesuit gear rings</li>
              <li className="">Screws (+Backup screws)</li>
              <li className="">Rubber removal tool</li>
              <p className="py-2 font-semibold text-neutral-600">
                Add the screwdriver to your cart at checkout, if you need it.
              </p>
            </div>

            <div className="text-base">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Install Guide</AccordionTrigger>
                  <AccordionContent>
                    <ul className="font-medium text-neutral-500">
                      <li>
                        <span className="text-black">
                          1. Remove your lens&apos; rubber rings
                        </span>
                        , either by hand or with the included rubber removal
                        tool.
                      </li>
                      <li className="text-black">
                        {" "}
                        2. Slide on Cinesuit, one by one.
                      </li>
                      <li className="text-black">
                        3. Insert and tighten the screws <br />
                        <span className="text-black font-bold">
                          DO NOT OVERTIGHTEN
                        </span>
                      </li>
                    </ul>
                    <div className="py-4">
                      <Link
                        href={"/shop"}
                        className="text-neutral-800 font-medium hover:underline"
                      >
                        Click here to watch the Installation Video Guide
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Care guide</AccordionTrigger>
                  <AccordionContent>
                    Make sure the inside of the Cinesuit, particularely the
                    rubber part is dust free. Especially if you take it on and
                    off over time.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Shipping and Returns</AccordionTrigger>
                  <AccordionContent>
                    <ul className="ulpolicy font-medium text-neutral-500">
                      <li className="lipolicy">
                        We offer{" "}
                        <span className="text-black">free shipping</span> to
                        most countries, you get your final shipping options at
                        checkout.{" "}
                      </li>
                      <li className="lipolicy">
                        Standard VAT and Import charges applies for your local
                        country, it is your responsibility.
                      </li>
                      <li className="lipolicy">Something about returns</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className=" pb-10">
              <div>
                <p className="mt-8 mb-2 text-2xl font-semibold leading-11 text-neutral-900 tracking-tight">
                  Industry Standard
                </p>
                <p className="mb-8 text-base font-normal leading-11 text-neutral-500">
                  Cinesuit uses standard 0.8 mod gears,{" "}
                  <span className="text-black">
                    compatible with all standard follow focus systems.
                  </span>
                </p>
              </div>

              <p className="mt-8 mb-2 text-2xl font-semibold leading-11 text-neutral-900 tracking-tight">
                Lightweight
              </p>
              <p className="mb-2 text-base font-normal leading-11 text-neutral-500">
                Cinesuit bearly adds weight to your setup.
              </p>
              <div className="text-base font-normal leading-11 text-neutral-500">
                <li className="">
                  Sigma 18-35{" "}
                  <span className="text-black">default weight: 800g</span>
                </li>
                <li className="">
                  Sigma 18-35 with{" "}
                  <span className="text-black">Cinesuit weight: 950g</span>
                </li>
              </div>

              <p className="mt-8 mb-2 text-2xl font-semibold leading-11 text-neutral-900 tracking-tight">
                Low Profile
              </p>
              <p className="-mb-10 text-base font-normal leading-11 text-neutral-500">
                Staying true to the size of the lens, Cinesuit doesnt add any
                unnessecary bulk. It simply follows the shape of the lens, and
                adds only what it needs, to provide you a secure and reliable
                solution.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] py-12 bg-neutral-100"></div>
      <WhatsIncluded />
      <div className="">
        <Footer />
      </div>
    </>
  );
};

export async function getServerSideProps(context: { params: { handle: any } }) {
  const handle = context.params.handle;
  const fetchedMainProduct = await client.product.fetchByHandle(handle);
  const associatedProductType = `${fetchedMainProduct.title}_bundle`;

  const productsWithSpecificType = await client.product.fetchQuery({
    query: `productType:${associatedProductType}`,
    first: 3,
  });

  const imageCount = 3; // Adjust this number based on how many images you expect per product
  const imagePaths = Array.from(
    { length: imageCount },
    (_, index) => `/images/${handle}/image${index + 0}.png`
  );

  // New array for images from the 'sm' folder
  const smImagePaths = Array.from(
    { length: imageCount },
    (_, index) => `/images/${handle}/sm/image${index + 0}.png`
  );

  const associatedProducts = productsWithSpecificType.filter(
    (product) => product.id !== fetchedMainProduct.id
  );

  return {
    props: {
      mainProduct: JSON.parse(JSON.stringify(fetchedMainProduct)),
      associatedProducts: JSON.parse(JSON.stringify(associatedProducts)),
      imagePaths,
      smImagePaths, // Include smImagePaths in the props
    },
  };
}

export default Product;
