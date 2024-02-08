import { client } from "@/utils/shopifyClient";
import Footer from "./components/page-elements/Footer";
import Hero from "./components/page-elements/Hero";
import InstallUninstall from "./components/page-elements/InstallUninstall";
import LessExpensive from "./components/page-elements/LessExpensive";
import NextStep from "./components/page-elements/NextStep";
import ShopComponent from "./components/page-elements/ShopComponent";
import ShopTitle from "./components/page-elements/ShopTitle";
import SizesStandardized from "./components/page-elements/SizesStandardized";
import ThinProfile from "./components/page-elements/ThinProfile";
import UpgradeLens from "./components/page-elements/UpgradeLens";
import Navbar from "./components/ui/Navbar";
import { Product } from "@/types/Types";

export default function Home({ products }) {
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

export async function getServerSideProps() {
  const products = await client.product.fetchAll();
  // Ensure the structure of products matches what ShopComponent expects
  return {
    props: { products: JSON.parse(JSON.stringify(products)) as Product[] },
  }; // Make sure the cast is correct based on your types
}