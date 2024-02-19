// index.tsx
import { Product } from "@/types/Types";
import { client } from "@/utils/shopifyClient";
import Navbar from "../components/ui/Navbar";
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

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  return (
    <>
      <Navbar />
      <Hero />
      <NextStep />
      <UpgradeLens />
      <ThinProfile />
      <LessExpensive />
      <SizesStandardized />
      <InstallUninstall />
      <ShopTitle />
      <ShopComponent products={products} />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const products = await client.product.fetchAll();
  // Optionally apply filters here if needed, similar to what's done in shop.tsx
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
    revalidate: 3600, // Use ISR to update the page periodically
  };
}
