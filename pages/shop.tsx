import { client } from "@/utils/shopifyClient";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import FeaturedProduct from "./components/page-elements/FeaturedProduct";
import Footer from "./components/page-elements/Footer";
import ShopComponent from "./components/page-elements/ShopComponent";
import ShopTitle2 from "./components/page-elements/ShopTitle2";
import Navbar from "./components/ui/Navbar";
import NavbarLight from "./components/ui/NavbarLight";
import { Product } from "@/types/Types";

const TextWrapper = dynamic(
  () => import("./components/animations/TextWrapper"),
  {
    ssr: false,
  }
);
// Define the props type for Shop component
interface ShopProps {
  featuredProduct: Product; // Adjust based on your actual Product type
}

// Use the ShopProps type to type the props parameter
export default function Shop({ featuredProduct }: ShopProps) {
  const [isLightNavbar, setIsLightNavbar] = useState<boolean>(false);
  // Introduce a state to manage screen width
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const shopTitle2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to update the state based on window width
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    // Call once to set initial state correctly in client-side
    checkMobileView();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobileView);

    const handleScroll = () => {
      if (shopTitle2Ref.current) {
        const shopTitle2Position =
          shopTitle2Ref.current.getBoundingClientRect().top +
          window.scrollY -
          60;
        if (window.scrollY >= shopTitle2Position) {
          setIsLightNavbar(true);
        } else {
          setIsLightNavbar(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  return (
    <>
      {isLightNavbar || isMobileView ? <NavbarLight /> : <Navbar />}
      <div className="hidden md:block">
        <FeaturedProduct featuredProduct={featuredProduct} />
      </div>
      <div className="w-full h-10 md:hidden"></div>
      <ShopTitle2 ref={shopTitle2Ref} />
      <ShopComponent />
      <Footer />
    </>
  );
}

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
