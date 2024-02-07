import React, { useState, useEffect, useRef } from "react";
import ShopComponent from "./components/page-elements/ShopComponent";
import { client } from "@/utils/shopifyClient";
import NavbarLight from "./components/ui/NavbarLight";
import FeaturedProduct from "./components/page-elements/FeaturedProduct";
import dynamic from "next/dynamic";
import ShopTitle from "./components/page-elements/ShopTitle";
import ShopTitle2 from "./components/page-elements/ShopTitle2";
import Footer from "./components/page-elements/Footer";
import Navbar from "./components/ui/Navbar";

const TextWrapper = dynamic(
  () => import("./components/animations/TextWrapper"),
  {
    ssr: false,
  }
);

export default function Shop({ products, featuredProduct }) {
  const [isLightNavbar, setIsLightNavbar] = useState<boolean>(false);
  const shopTitle2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (shopTitle2Ref.current) {
        // Adjust the position check to account for 10px from the top
        const shopTitle2Position =
          shopTitle2Ref.current.getBoundingClientRect().top +
          window.scrollY -
          60;

        // Determine if ShopTitle2 is at or less than 10px from the top of the viewport
        if (window.scrollY >= shopTitle2Position) {
          setIsLightNavbar(true);
        } else {
          setIsLightNavbar(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isLightNavbar ? <NavbarLight /> : <Navbar />}
      <div className="hidden md:block">
        <FeaturedProduct featuredProduct={featuredProduct} />
      </div>
      <div className="w-full h-10 md:hidden"></div>
      <ShopTitle2 ref={shopTitle2Ref} />
      <ShopComponent products={products} />
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
