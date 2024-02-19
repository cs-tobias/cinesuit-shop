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
import Link from "next/link";
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
import Footer from "./components/page-elements/Footer";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, redirectToCheckout } =
    useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await client.product.fetchAll();
      const adjustedProducts = fetchedProducts.map((product) => ({
        ...product,
        images: product.images.map(({ id, src }) => ({
          id: id ?? undefined,
          src,
        })),
        variants: product.variants.map((variant) => ({
          ...variant,
          price: { amount: variant.price.amount.toString() },
        })),
      })) as unknown as Product[];
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number
  ) => {
    console.log(`Updating product ${productId} to quantity ${newQuantity}`);
    await updateQuantity(productId, newQuantity);
    // No need to manually update cart state here if updateQuantity does it
  };

  const total = useMemo(() => {
    return cart.reduce((acc, item) => {
      // Sum quantities of all variants within the item
      const itemTotalQuantity = item.variants.reduce(
        (variantAcc, variant) => variantAcc + variant.quantity,
        0
      );
      // Assume item.product.variants[0].price.amount is the price for simplicity
      return (
        acc +
        itemTotalQuantity * parseFloat(item.product.variants[0].price.amount)
      );
    }, 0);
  }, [cart]);

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleCheckout = async () => {
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
      <div className="lg:w-full md:min-h-screen pb-10 md:pb-0 bg-neutral-50">
        <div className="mx-auto container md:max-w-[700px] tracking-tight lg:max-w-5xl lg:px-6">
          <section className="pt-24 md:pt-28 md:pb-12 flex-col">
            <h1 className="text-5xl tracking-tighter font-semibold mb-4 text-left">
              Review your bag
            </h1>
            <p>
              Standard customs duties, taxes and VAT for your local country
              applies.
            </p>
          </section>
          <div className="py-6">
            <Separator />
          </div>

          {cart.map((item, index) => (
            <div key={`cart-item-${item.product.id}-${index}`}>
              <h1 className="md:hidden text-2xl md:text-3xl font-medium tracking-tight">
                {item.product.title}
              </h1>
              <section className="flex w-full pt-4">
                <div className="lg:w-56"></div>
                <div className="lg:w-3/5 max-w-sm">
                  <h1 className="hidden md:block text-2xl md:text-3xl font-medium tracking-tight">
                    {item.product.title}
                  </h1>
                </div>

                <div className="absolute -translate-y-4 hidden lg:block">
                  <Image
                    src={`/images/${item.product.handle}/sm/image0.png`}
                    alt={item.product.title}
                    width={200}
                    height={200}
                    className="mx-auto"
                    priority
                  />
                </div>

                <div className="text-2xl mx-auto w-full md:w-16">
                  <QuantitySelector
                    initialQuantity={item.variants[0].quantity} // Assuming each item has at least one variant
                    maxQuantity={10}
                    onQuantityChange={(newQuantity) =>
                      handleQuantityChange(item.product.id, newQuantity)
                    }
                  />
                </div>

                <div className="ml-auto pl-8 text-right">
                  <h1 className="text-3xl font-medium">
                    ${item.product.variants[0].price.amount}
                  </h1>
                </div>
              </section>

              <section className="flex w-full">
                <div className="lg:w-56"></div>
                <div className="w-3/5 max-w-md">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="font-normal tracking-tight text-neutral-800">
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
                  <h3 className="text-lg font-light pt-4 text-neutral-700">
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
          ))}

          <section className="flex w-full pb-6">
            <div className="w-56"></div>
            <div className="w-3/5 max-w-md">
              <h5 className="text-lg text-neutral-600 font-normal">Subtotal</h5>
              <h5 className="text-basse text-neutral-600 font-normal pb-2">
                Shipping
              </h5>

              <h3 className="text-3xl font-medium mt-6 lg:mt-0">Total</h3>
            </div>

            <div className="text-2xl w-16"></div>

            <div className="flex-1 text-right">
              <h3 className="text-lg text-neutral-600 font-normal">
                ${total.toFixed(2)}
              </h3>
              <h3 className="text-base text-neutral-600 font-normal pb-2">
                Calculated at checkout
              </h3>

              <h3 className="text-3xl font-medium">${total.toFixed(2)}</h3>
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
              <div className="flex items-center justify-end mb-4">
                {/* Separate span for the text to open the AlertDialog */}
                <span
                  className="text-sm font-medium leading-none cursor-pointer mr-2 hover:underline "
                  onClick={handleLabelClick}
                >
                  Accept terms and conditions
                </span>

                {/* Checkbox for toggling its state */}
                <Checkbox
                  id="terms1"
                  checked={isTermsChecked}
                  onCheckedChange={(checked) => {
                    // Handle the case where checked might be "indeterminate"
                    if (checked === "indeterminate") {
                      // Decide how you want to handle the "indeterminate" state
                      setIsTermsChecked(false); // or true, based on your needs
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
                  disabled={!isTermsChecked || isLoading}
                  className={`bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-300 py-2 px-4 w-full rounded-2xl ${
                    !isTermsChecked || isLoading ? "disabled-button" : ""
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
                onOpenChange={() => setIsAlertDialogOpen(!isAlertDialogOpen)} // Assuming a prop like this exists for handling open state changes
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
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle></AlertDialogTitle>
              <AlertDialogDescription>
                <ul className="ulpolicy lipolicy">
                  <li>
                    <span className="font-medium text-black">Warranty:</span>{" "}
                    Installing Cinesuit may void Sigma&apos;s lens warranty.
                  </li>
                  <li>
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
                      className="text-neutral-800 hover:underline"
                    >
                      Installation Guide
                    </Link>
                  </li>
                </ul>
                <p className="mt-4 pl-5">
                  For full terms and conditions, please refer to our{" "}
                  <Link
                    href={"/shop"}
                    className="text-neutral-800 hover:underline"
                  >
                    comprehensive disclaimer.
                  </Link>
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {/* Cancel Button */}
              <AlertDialogCancel asChild>
                <button
                  onClick={() => setIsAlertDialogOpen(false)}
                  className="your-cancel-button-classes"
                >
                  Cancel
                </button>
              </AlertDialogCancel>
              {/* Agree Button */}
              <AlertDialogAction asChild>
                <button onClick={handleAgreeAction}>Accept</button>
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
