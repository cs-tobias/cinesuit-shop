// shop.tsx
import ShopComponent from "../components/page-elements/ShopComponent";
import { Product } from "@/types/Types";
import { useState, useRef, useEffect } from "react";
import { client } from "@/utils/shopifyClient";
import Navbar from "../components/ui/Navbar";
import NavbarLight from "../components/ui/NavbarLight";
import FeaturedProduct from "../components/page-elements/FeaturedProduct";
import Footer from "../components/page-elements/Footer";
import ShopTitle2 from "../components/page-elements/ShopTitle2";
import { NextSeo } from "next-seo";
import RequestLenses from "@/components/page-elements/RequestLenses";

interface ShopProps {
  featuredProduct: Product;
  products: Product[]; // Ensuring products are included in the props
}

export default function Shop({ featuredProduct, products }: ShopProps) {
  const [isLightNavbar, setIsLightNavbar] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const shopTitle2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobileView = () => setIsMobileView(window.innerWidth <= 768);
    const handleScroll = () => {
      const shopTitle2Position = shopTitle2Ref.current
        ? shopTitle2Ref.current.getBoundingClientRect().top +
          window.scrollY -
          60
        : 0;
      setIsLightNavbar(window.scrollY >= shopTitle2Position);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobileView);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <NextSeo title="Cinesuit - Shop" />
      {isLightNavbar || isMobileView ? <NavbarLight /> : <Navbar />}
      <div className="hidden md:block">
        <FeaturedProduct featuredProduct={featuredProduct} />
      </div>
      <div className="w-full h-10 md:hidden"></div>
      <ShopTitle2 ref={shopTitle2Ref} />
      <ShopComponent products={products} />
      <RequestLenses />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  // Fetch all products
  const fetchedProducts = await client.product.fetchAll();

  // Filter out "bundle" products and prepare them for the ShopComponent
  let products = fetchedProducts
    .filter((product) => !product.productType.includes("bundle"))
    .map((product) => ({
      ...product,
      images: product.images.map(({ id, src }) => ({
        id: id ?? undefined,
        src,
      })),
    }));

  // Sort products to ensure "new" products come first
  products.sort((a, b) => {
    if (a.productType === "new" && b.productType !== "new") {
      return -1; // 'a' (new product) comes before 'b'
    } else if (a.productType !== "new" && b.productType === "new") {
      return 1; // 'b' (new product) comes before 'a'
    }
    return 0; // Keep original order if neither is "new"
  });

  // Find the featured product using its ID
  const FEATURED_PRODUCT_ID = "gid://shopify/Product/7638832218270";
  const featuredProduct = fetchedProducts.find(
    (product) => product.id === FEATURED_PRODUCT_ID
  );

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
    },
    revalidate: 3600, // Optional: Revalidate at most once per hour for updates
  };
}
