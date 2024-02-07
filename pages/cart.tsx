"use client";

import { client } from "@/utils/shopifyClient";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "./components/contexts/CartContext";
import FeaturedProduct from "./components/page-elements/FeaturedProduct";
import Footer from "./components/page-elements/Footer";
import ShopComponent from "./components/page-elements/ShopComponent";
import ShopTitle2 from "./components/page-elements/ShopTitle2";
import Button from "./components/ui/Button";
import Link from "next/link";
import NavbarLight from "./components/ui/NavbarLight";
import QuantitySelector from "./components/ui/QuantitySelector";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordionCustom";
import { Separator } from "./components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialogComponent } from "./components/ui/AlertDialogComponent";
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

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, redirectToCheckout } =
    useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const handleAgreeAction = () => {
    setIsTermsChecked(true);
    setIsAlertDialogOpen(false);
  };
  const handleLabelClick = (event) => {
    // Prevent the event from reaching the checkbox
    event.stopPropagation();
    setIsAlertDialogOpen(true);
  };
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleOverlayClick = () => {
    if (!isTermsChecked) {
      setIsAlertDialogOpen(true);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await client.product.fetchAll();
      const FEATURED_PRODUCT_ID = "gid://shopify/Product/7638832218270";
      const featured = fetchedProducts.find(
        (product) => product.id === FEATURED_PRODUCT_ID
      );

      setProducts(fetchedProducts);
      setFeaturedProduct(featured);
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

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

  const total = cart.reduce(
    (acc, item) =>
      acc + item.quantity * parseFloat(item.product.variants[0].priceV2.amount),
    0
  );

  if (cart.length === 0) {
    return (
      <>
        <NavbarLight />
        <FeaturedProduct featuredProduct={featuredProduct} />
        <ShopTitle2 />
        <ShopComponent products={products} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavbarLight />
      <div className=" lg:w-full md:h-screen pb-10 md:pb-0 bg-neutral-50">
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
                  {item.product.images && item.product.images[0] && (
                    <Image
                      key={item.product.id + item.product.images[0].id}
                      src={item.product.images[0].src}
                      alt={item.product.title}
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                  )}
                </div>

                <div className="text-2xl mx-auto w-full md:w-16">
                  <QuantitySelector
                    productId={item.product.id}
                    quantity={item.quantity}
                    maxQuantity={10} // Or any maximum limit you have
                    onQuantityChange={handleQuantityChange}
                  />
                </div>

                <div className="ml-auto pl-8 text-right">
                  <h1 className="text-3xl font-medium">
                    ${item.product.variants[0].priceV2.amount}
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
                  onCheckedChange={(checked) => setIsTermsChecked(checked)}
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
                isOpen={isAlertDialogOpen}
                onClose={() => setIsAlertDialogOpen(false)}
              />
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
      <div className="md:bottom-0 absolute w-full">
        <Footer />
      </div>
    </>
  );
};

export default CartPage;

export async function getServerSideProps() {
  const products = await client.product.fetchAll();
  const FEATURED_PRODUCT_ID = "gid://shopify/Product/7638832218270";
  const featuredProduct = products.find(
    (product) => product.id === FEATURED_PRODUCT_ID
  );

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
    },
  };
}
