"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types/Types"; // Adjust the import path as necessary
import { client } from "@/utils/shopifyClient";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { useCart } from "../components/contexts/CartContext";
import NavbarLight from "../components/ui/NavbarLight";
import QuantitySelector from "../components/ui/QuantitySelector";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordionCustom";
import { Separator } from "../components/ui/separator";
import Footer from "../components/page-elements/Footer";
import { NextSeo } from "next-seo";
import FreeShipping from "@/components/ui/freeShipping";
import MoneyBack from "@/components/ui/moneyBack";
import Icons from "@/components/ui/Icons";
import Link from "next/link";

const CartPage = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    redirectToCheckout,
    addToCart: originalAddToCart,
  } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [toolProducts, setToolProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await client.product.fetchAll();
      const tools = fetchedProducts.filter(
        (product) => product.productType === "tool"
      );

      // Ensure images property conforms to the expected type
      const adjustedTools = tools.map((product) => ({
        ...product,
        images: product.images.map((image) => ({
          id: image.id ?? undefined,
          src: image.src,
        })),
      }));

      // Filter out tools already in the cart
      const toolsNotInCart = adjustedTools.filter(
        (tool) => !cart.some((cartItem) => cartItem.product.id === tool.id)
      );

      setToolProducts(toolsNotInCart);
    };

    fetchProducts();
  }, [cart]); // Re-run the effect whenever the cart changes

  const total = useMemo(() => {
    return cart.reduce((acc, item) => {
      const itemTotalQuantity = item.variants.reduce(
        (variantAcc, variant) => variantAcc + variant.quantity,
        0
      );
      return (
        acc +
        itemTotalQuantity * parseFloat(item.product.variants[0].price.amount)
      );
    }, 0);
  }, [cart]);

  const compareAtTotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const itemTotalQuantity = item.variants.reduce(
        (variantAcc, variant) => variantAcc + variant.quantity,
        0
      );
      return (
        acc +
        itemTotalQuantity *
          parseFloat(
            item.product.variants[0].compareAtPrice?.amount ||
              item.product.variants[0].price.amount
          )
      );
    }, 0);
  }, [cart]);

  const savings = compareAtTotal - total;

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number
  ) => {
    // Find the item in the cart
    const cartItem = cart.find((item) => item.product.id === productId);

    // If it's a tool and the user tries to set quantity above 1, clamp it to 1
    if (
      cartItem &&
      cartItem.product.productType.toLowerCase() === "tool" &&
      newQuantity > 1
    ) {
      newQuantity = 1;
    }

    console.log(`Updating product ${productId} to quantity ${newQuantity}`);
    await updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    const removedProduct = cart.find(
      (item) => item.product.id === productId
    )?.product;
    if (removedProduct && removedProduct.productType === "tool") {
      const completeRemovedProduct = {
        ...removedProduct,
        variants: removedProduct.variants.map((variant) => ({
          ...variant,
          price: {
            amount: parseFloat(variant.price.amount),
          },
        })),
      };
      setToolProducts((prevTools) => [...prevTools, completeRemovedProduct]);
    }
  };

  const handleAddToCart = (productId: string) => {
    // Check if the cart already has this tool
    const existingToolInCart = cart.find(
      (item) =>
        item.product.id === productId &&
        item.product.productType.toLowerCase() === "tool"
    );

    // If the user already has this tool, don't add more
    // or optionally throw an alert, toast, etc.
    if (existingToolInCart) {
      console.warn("You can only have one of this tool in your cart.");
      return;
    }

    const product = toolProducts.find((p) => p.id === productId);
    if (!product || !product.variants || product.variants.length === 0) {
      console.error("Product variants are not defined or empty.");
      return;
    }

    const completeProduct = {
      ...product,
      images: product.images.map((image) => ({
        id: image.id || "",
        src: image.src,
      })),
      variants: product.variants.map((variant) => ({
        ...variant,
        price: {
          amount: variant.price.amount.toString(),
        },
      })),
    };

    const variantId = completeProduct.variants[0].id;
    const quantity = 1;

    // Add the tool with quantity = 1
    originalAddToCart(completeProduct, variantId, quantity);

    // Remove from the toolProducts array so user can't add it again
    setToolProducts((prevTools) => prevTools.filter((p) => p.id !== productId));
  };

  // Check if the cart is empty or if all items are tools
  const onlyToolsInCart =
    cart.length > 0 &&
    cart.every((item) => item.product.productType.toLowerCase() === "tool");

  // Compute whether checkout should be disabled
  const isCheckoutDisabled =
    !isTermsChecked || isLoading || cart.length === 0 || onlyToolsInCart;

  const handleCheckout = async () => {
    // If conditions aren't met, don't proceed
    if (isCheckoutDisabled) {
      console.warn("Checkout is disabled due to conditions not met.");
      return;
    }

    try {
      setIsLoading(true);
      await redirectToCheckout();
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgreeAction = () => {
    setIsTermsChecked(true);
    setIsAlertDialogOpen(false);
  };

  const handleLabelClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setIsAlertDialogOpen(true);
  };

  const handleOverlayClick = () => {
    if (!isTermsChecked) {
      setIsAlertDialogOpen(true);
    }
  };

  return (
    <>
      <NavbarLight />
      <NextSeo title="Cinesuit - Cart" />
      <div className="lg:w-full md:min-h-screen pb-10 md:pb-0 bg-neutral-50">
        <div className="mx-auto container tracking-tight lg:max-w-5xl lg:px-6">
          <section className="pt-24 md:pt-28 md:pb-12 flex-col">
            <h1 className="text-5xl tracking-tighter font-semibold mb-4 text-left">
              Review your bag
            </h1>
            <p>
              Standard customs duties, taxes and VAT for your local country
              applies.
            </p>
            <p className="font-semibold">Note: The lens is not included.</p>
            <div className="mt-3 flex items-center space-x-4 text-base">
              <FreeShipping />
              <div className="h-6 w-[1px] bg-neutral-700"></div>
              <MoneyBack />
            </div>
          </section>

          <div className="py-6">
            <Separator />
          </div>

          {cart.map((item, index) => {
            const itemTotalPrice =
              item.variants[0].quantity *
              parseFloat(item.product.variants[0].price.amount);
            const itemCompareAtPrice = item.product.variants[0].compareAtPrice
              ? item.variants[0].quantity *
                parseFloat(item.product.variants[0].compareAtPrice.amount)
              : null;
            return (
              <div key={`cart-item-${item.product.id}-${index}`}>
                <div className="md:hidden w-full">
                  <Image
                    src={`/images/${item.product.handle}/image0.png`}
                    alt={item.product.title}
                    width={640}
                    height={320}
                    className="mx-auto pb-8"
                    priority
                  />
                </div>
                <p className="md:hidden text-2xl md:text-3xl font-medium tracking-tight">
                  {item.product.title}
                </p>
                <section className="flex w-full pt-4">
                  <div className="md:w-56"></div>
                  <div className="lg:w-3/5 max-w-sm">
                    <p className="hidden md:block text-2xl md:text-3xl font-medium tracking-tight">
                      {item.product.title}
                    </p>
                  </div>
                  <div className="absolute -translate-y-3 hidden md:block">
                    <Image
                      src={`/images/${item.product.handle}/image0.png`}
                      alt={item.product.title}
                      width={185}
                      height={120}
                      className="mx-auto"
                      priority
                    />
                  </div>

                  <div className="text-2xl mx-auto w-full md:w-16">
                    <QuantitySelector
                      initialQuantity={item.variants[0].quantity}
                      maxQuantity={
                        item.product.productType.toLowerCase() === "tool"
                          ? 1
                          : 10
                      }
                      onQuantityChange={(newQuantity) =>
                        handleQuantityChange(item.product.id, newQuantity)
                      }
                      isToolProduct={
                        item.product.productType.toLowerCase() === "tool"
                      } // <-- pass the boolean
                    />
                  </div>

                  <div className="ml-auto pl-8 text-right flex items-center">
                    {itemCompareAtPrice && (
                      <span className="text-gray-500 pr-1 text-[19px] line-through">
                        ${itemCompareAtPrice.toFixed(2)}
                      </span>
                    )}
                    <h1 className="text-3xl font-medium">
                      ${itemTotalPrice.toFixed(2)}
                    </h1>
                  </div>
                </section>

                <section className="flex w-full">
                  <div className="md:w-56"></div>
                  <div className="w-3/5 max-w-md">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="font-normal tracking-tight text-neutral-700">
                          Show product details
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.product.description}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="text-2xl w-16"></div>

                  <div className="flex-1 text-right">
                    <h3 className="text-lg font-light pt-4 text-blue-1">
                      <span
                        className="hover:underline hover:cursor-pointer"
                        onClick={() => handleRemoveItem(item.product.id)}
                      >
                        Remove
                      </span>
                    </h3>
                  </div>
                </section>

                <div className="py-6">
                  <Separator />
                </div>
              </div>
            );
          })}

          {/* {toolProducts.length > 0 && (
            <section className="flex w-full pb-6 ">
              <div className="w-56 hidden md:block"></div>
              <div className="flex-1 max-w-5xl mx-auto md:px-6">
                <h2 className="ml-4 text-2xl font-semibold mt-4">
                  Essential Installation Tools
                </h2>
                <h5 className="ml-4 my-2 mb-4 text-neutral-700">
                  A small screwdriver is required for installing Cinesuit. The
                  Rubber Removal Tool makes installation easier. See our{" "}
                  <Link
                    href={"/instructions"}
                    target="_blank"
                    className="font-medium text-blue-1 hover:underline"
                  >
                    Installation Guide
                  </Link>{" "}
                  for step-by-step videos.
                </h5>
                {toolProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex md:flex-row items-center justify-between p-4 border-b w-full"
                  >
                    <div className="flex items-center w-full">
                      <div className="mr-4">
                        <Image
                          src={`/images/${product.handle}/image0.png`}
                          alt={`${product.title} Image`}
                          width={120}
                          height={80}
                          className="rounded"
                          priority
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold">{product.title}</p>

                        {product.variants && product.variants.length > 0 && (
                          <p className="text-base text-gray-500">FREE</p>
                        )}
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-1">
                            <AccordionTrigger className="font-normal tracking-tight text-neutral-800 text-sm">
                              Show product details
                            </AccordionTrigger>
                            <AccordionContent>
                              {product.description}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 md:mt-0 md:ml-4">
                      <span
                        className="hover:underline hover:cursor-pointer text-blue-1"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        Add
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}*/}

          <section className="flex w-full pb-6 mt-2">
            <div className="w-56"></div>

            <div className="w-3/5 max-w-md">
              <h5 className="text-lg text-neutral-600 font-normal">Subtotal</h5>
              <h5 className="text-base text-neutral-600 font-normal">
                Shipping
              </h5>
              <h5 className="text-base text-neutral-600 font-normal pb-2">
                Tax
              </h5>

              <h3 className="text-3xl font-medium mt-2">Total</h3>
            </div>

            <div className="text-2xl w-16"></div>

            <div className="flex-1 text-right">
              <h3 className="text-lg text-neutral-600 font-normal">
                ${total.toFixed(2)}
              </h3>
              {cart.length === 0 ||
              cart.some((item) => item.product.productType !== "tool") ? (
                <h3 className="text-base text-neutral-600 font-normal">FREE</h3>
              ) : (
                <h3 className="text-base text-neutral-600 font-normal">
                  Calculated at checkout
                </h3>
              )}
              <h3 className="text-base text-neutral-600 font-normal pb-2">
                Calculated at checkout
              </h3>

              <h3 className="text-3xl font-medium ">
                {compareAtTotal > total && (
                  <span className="text-gray-500 pr-2 text-[19px] line-through">
                    ${compareAtTotal.toFixed(2)}
                  </span>
                )}
                ${total.toFixed(2)}
              </h3>
            </div>
          </section>

          <section className="flex w-full pb-6">
            <div className="w-64"></div>
            <div className="w-full">
              <div>
                <Separator />
              </div>
            </div>
          </section>

          <section className="flex w-full pb-6 justify-end">
            <div className="w-3/5 max-w-md"></div>

            <div className="flex flex-col items-end">
              <h1 className="my-2 -mt-2 text-base md:text-lg tracking-tight font-semibold md:text-right mx-1">
                Pre-orders are expected to ship in 2 months
              </h1>

              <div className="flex items-center justify-end mb-4">
                <span
                  className="text-sm font-medium leading-none cursor-pointer mr-2 hover:underline "
                  onClick={handleLabelClick}
                >
                  Accept terms and conditions
                </span>
                <Checkbox
                  id="terms1"
                  checked={isTermsChecked}
                  onCheckedChange={(checked) => {
                    if (checked === "indeterminate") {
                      setIsTermsChecked(false);
                    } else {
                      setIsTermsChecked(checked);
                    }
                  }}
                />
              </div>
              <div className="relative" onClick={handleOverlayClick}>
                <Button
                  size="large"
                  onClick={handleCheckout}
                  // Use our computed isCheckoutDisabled
                  disabled={isCheckoutDisabled}
                  className={`bg-blue-1 text-white hover:bg-blue-500 transition-colors duration-300 py-2 px-4 w-full rounded-2xl ${
                    isCheckoutDisabled ? "disabled-button" : ""
                  }`}
                >
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    "Checkout"
                  )}
                </Button>

                {!isTermsChecked && (
                  <div className="absolute inset-0" aria-hidden="true"></div>
                )}
              </div>

              <AlertDialog
                open={isAlertDialogOpen}
                onOpenChange={() => setIsAlertDialogOpen(!isAlertDialogOpen)}
              >
                {/* Dialog content */}
              </AlertDialog>
            </div>
          </section>
        </div>
        {/* AlertDialog Component */}
        <AlertDialog
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
        >
          <AlertDialogContent className="bg-white rounded-2xl p-8 lg:p-12 text-center custom-dialogbox-style">
            <div className="flex justify-between items-center">
              <button
                className="absolute top-4 right-4 md:top-6 md:right-6 rounded-full bg-neutral-200 text-black text-xl md:text-2xl font-bold p-2 hover:cursor-pointer hover:text-black transition-color duration-300"
                onClick={() => setIsAlertDialogOpen(false)}
              >
                <Icons icon="x" width="20" height="20" strokeWidth="2" />
              </button>
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 lg:mb-10 text-center tracking-tight font-semibold">
                <p className="my-1 md:my-2 text-sm md:text-base tracking-normal font-normal">
                  Summarized
                </p>
                Terms and Conditions
              </AlertDialogTitle>
              <AlertDialogDescription className="text-left text-sm md:text-base lg:text-lg text-gray-700 leading-6 md:leading-7">
                <ul className="list-disc pl-4 md:pl-5 mb-4 md:mb-6">
                  <li className="mb-3 md:mb-4">
                    <span className="font-medium text-black">Warranty:</span>{" "}
                    Installing Cinesuit may void Sigma&apos;s lens warranty.
                  </li>
                  <li className="mb-3 md:mb-4">
                    <span className="font-medium text-black">
                      Installation:
                    </span>{" "}
                    You are responsible for installing Cinesuit. Incorrect
                    installation may damage your lens, for which Cinesuit is not
                    liable. Nor is Cinesuit liable for indirect damages or
                    losses resulting from product use.{" "}
                    <Link
                      href={"/instructions"}
                      target="_blank"
                      className="text-blue-1 hover:underline"
                    >
                      Installation Guide
                    </Link>
                  </li>
                </ul>
                <p className="mb-4 md:mb-6 text-center text-black">
                  For full terms and conditions, please refer to our{" "}
                  <Link
                    href={"/terms-of-service"}
                    target="_blank"
                    className="text-blue-1 hover:underline"
                  >
                    comprehensive disclaimer.
                  </Link>
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 md:mt-6">
              <AlertDialogAction asChild>
                <button
                  onClick={handleAgreeAction}
                  className="text-sm md:text-lg w-full py-3 md:py-7 lg:py-7 rounded-xl transition-colors duration-200"
                >
                  Accept
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </>
  );
};

export default CartPage;
