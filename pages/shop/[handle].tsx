// [handle].tsx
import type { ProductProps, Product as ProductType } from "@/types/Types";
import { client } from "@/utils/shopifyClient";
import { GetStaticPaths } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useCart } from "../../components/contexts/CartContext";
import Lightbox from "../../components/ui/Lightbox";
import NavbarLight from "../../components/ui/NavbarLight";
import RestockNotificationForm from "@/components/page-elements/RestockNotificationForm";
import Footer from "@/components/page-elements/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { NextSeo } from "next-seo";

interface StaticPropsParams {
  params: {
    handle: string;
  };
}
const Product = ({
  mainProduct,
  associatedProducts,
  mainImagePaths,
  smallImagePaths = [], // Default to an empty array if undefined
  associatedProductsImages,
}: ProductProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    mainProduct
  );
  const [currentImagePath, setCurrentImagePath] = useState(mainImagePaths[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { addToCart } = useCart();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    console.log("Scroll position before carousel update:", window.scrollY);
    return () => {
      console.log("Scroll position after carousel update:", window.scrollY);
    };
  }, [selectedIndex]);

  const handleProductSelection = (product: ProductType) => {
    setSelectedProduct(product);
    console.log("Selected Product:", product); // Log the selected product data
    setIsTransitioning(true); // Start transition
    const newImagePath = `/images/${product.handle}/image0.png`;

    // Use a timeout to simulate the fade-out effect
    setTimeout(() => {
      setCurrentImagePath(newImagePath);
      setIsTransitioning(false); // End transition
    }, 300); // Adjust the timeout to match your CSS transition duration
  };
  const router = useRouter();

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
  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  return (
    <>
      <NextSeo title={`${mainProduct.title}`} />
      <NavbarLight />
      <div className="bg-neutral-100 w-full min-h-screen ">
        <div className="container mx-auto flex flex-col md:flex-row items-start md:items-stretch">
          <div
            id="image-container"
            className="rounded-xl hidden lg:block"
            style={{
              position: "sticky",
              top: "130px",
              height: "calc(80vh - 20px)",
            }}
          >
            <div
              className={`
 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
              style={{ transition: "opacity 0.5s ease-in-out" }}
            >
              <Image
                src={currentImagePath}
                alt={`Product Image ${selectedIndex}`}
                width={1237}
                height={1524}
                layout="fixed"
                className="hidden md:block w-full mx-auto h-full object-cover rounded-xl hover:cursor-pointer max-h-[860px] no-select"
                onClick={openLightbox}
                loading="eager"
                priority
              />
            </div>
            <p
              onClick={openLightbox}
              className="mt-6 text-lg flex justify-center mx-auto text-neutral-600 hover:text-black hover:cursor-pointer transition duration-300 rounded"
            >
              View Gallery
            </p>
          </div>
          <Lightbox
            isOpen={isLightboxOpen}
            images={
              selectedProduct && selectedProduct.handle === mainProduct.handle
                ? mainImagePaths
                : associatedProductsImages.find(
                    (p) => p.id === selectedProduct?.id
                  )?.images || []
            }
            onClose={closeLightbox}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
          <div className="flex-1 flex flex-col text-3xl lg:px-10 lg:pl-16 mt-20 lg:mt-28 ml-auto lg:max-w-[80%]">
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
            <div
              className={`lg:hidden rotate-90 -my-8 md:-my-20 px-6
 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
              style={{ transition: "opacity 0.5s ease-in-out" }}
            >
              <Image
                src={currentImagePath}
                alt={`Product Image ${selectedIndex}`}
                width={600}
                height={300}
                layout="fixed"
                className="flip-vertical mx-auto hover:cursor-pointer no-select"
                loading="eager"
              />
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
              {associatedProducts.map((associatedProduct) => (
                <div
                  key={associatedProduct.id}
                  onClick={() => handleProductSelection(associatedProduct)}
                  className={`p-4 border-[1px] bg-neutral-100 rounded-xl my-2 cursor-pointer hover:border-neutral-400 transition-colors duration-300 ${
                    selectedProduct?.id === associatedProduct.id
                      ? "border-neutral-600 hover:border-neutral-600"
                      : "border-gray-300 hover:border-neutral-400"
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
                className={`p-4 border-[1px] rounded-xl my-2 cursor-pointer hover:border-neutral-400 transition-colors duration-300 ${
                  selectedProduct?.id === mainProduct.id
                    ? "border-neutral-500 hover:border-neutral-600"
                    : "border-gray-300 hover:border-neutral-400"
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
                <div className="text-xl md:text-2xl font-medium tracking-tight">
                  <p
                    className={
                      selectedProduct?.availableForSale
                        ? "text-black"
                        : "text-neutral-700 text-lg md:text-xl"
                    }
                  >
                    {selectedProduct?.availableForSale ? "Total" : ""}
                  </p>
                </div>
                {selectedProduct?.availableForSale ? (
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
                      Add to Cart
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col w-full items-center gap-2 mt-2">
                    <p className="text-lg md:text-lg font-medium leading-11 text-neutral-500 mb-2">
                      <span className="text-black">Were out of stock!</span>{" "}
                      Sign up for notifications to get notified when its back in
                      stock and to help us learn how many people are interested!
                    </p>
                    <RestockNotificationForm />
                  </div>
                )}
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
                    <ul className="ulpolicy ulpolicy font-medium text-neutral-600">
                      <li className="lipolicy">
                        Make sure the inside of the Cinesuit, particularely the
                        rubber part is dust free. Especially if you take it on
                        and off over time.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Shipping and Returns</AccordionTrigger>
                  <AccordionContent>
                    <ul className="ulpolicy font-medium text-neutral-600">
                      <li className="lipolicy">
                        We offer fast and cheap shipping to most countries, you
                        get your final shipping options at checkout.{" "}
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
      <div className="">
        <Footer />
      </div>
    </>
  );
};

export async function getStaticProps({ params }: StaticPropsParams) {
  const handle = params.handle;
  const fetchedMainProduct = await client.product.fetchByHandle(handle);
  console.log("Fetched Main Product:", fetchedMainProduct); // Log the fetched product data

  const numberOfImages = 3;
  const mainImagePaths = Array.from(
    { length: numberOfImages },
    (_, index) => `/images/${handle}/image${index}.png`
  );
  const smallImagePaths = Array.from(
    { length: numberOfImages },
    (_, index) => `/images/${handle}/sm/image${index}.png`
  );

  const associatedProductType = `${fetchedMainProduct.title}_bundle`;
  const productsWithSpecificType = await client.product.fetchQuery({
    query: `productType:${associatedProductType}`,
    first: 3,
  });

  const associatedProducts = productsWithSpecificType.filter(
    (product) => product.id !== fetchedMainProduct.id
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
    revalidate: 3600,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allProducts = await client.product.fetchAll();
  const paths = allProducts.map((product) => ({
    params: { handle: product.handle },
  }));

  return { paths, fallback: "blocking" };
};

export default Product;
