import React, { useRef } from "react";
import { Product } from "@/types/Types";
import { client } from "@/utils/shopifyClient";
import Footer from "../components/page-elements/Footer";
import Hero from "../components/page-elements/Hero";
import InstallUninstall from "../components/page-elements/InstallUninstall";
import LessExpensive from "../components/page-elements/LessExpensive";
import NextStep from "../components/page-elements/NextStep";
import ShopComponent from "../components/page-elements/ShopComponent";
import ShopTitle from "../components/page-elements/ShopTitle";
import SizesStandardized from "../components/page-elements/SizesStandardized";
import ThinProfile from "../components/page-elements/ThinProfile";
import UpgradeLens from "../components/page-elements/UpgradeLens";
import Navbar from "../components/ui/Navbar";
import RequestLenses from "@/components/page-elements/RequestLenses";
import ComingSoon from "@/components/page-elements/ComingSoon";
import UnlockProWorkflows from "@/components/page-elements/UnlockProWorkflows";
import FocusPuller from "@/components/page-elements/UnlockProWorkflows";

interface HomeProps {
  products: Product[];
}

export const metadata = {
  title: "Cinesuit",
};

export default function Home({ products }: HomeProps) {
  const nextStepRef = useRef(null);
  return (
    <>
      {/* <ComingSoon />*/}
      <Navbar />
      <Hero scrollRef={nextStepRef} />
      <NextStep ref={nextStepRef} />

      <UpgradeLens />
      <FocusPuller
        numImages={79}
        pathPrefix="/images/focus-puller-09/001_Cinesuit_FocusDemo_v003-v2_0"
        fileExtension=".jpg"
        padLength={3} // Adjust this if your padding is different
      />
      <ThinProfile />

      <LessExpensive />
      <SizesStandardized />
      <InstallUninstall />
      <ShopTitle />
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

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
    revalidate: 24, // Optional: Revalidate at most once per hour for updates
  };
}
