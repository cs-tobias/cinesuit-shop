import { client } from "@/utils/shopifyClient";
import CineVsSuit from "./components/page-elements/CineVsSuit";
import Hero from "./components/page-elements/Hero";
import InstallUninstall from "./components/page-elements/InstallUninstall";
import NextStep from "./components/page-elements/NextStep";
import ShopComponent from "./components/page-elements/ShopComponent";
import ShopTitle from "./components/page-elements/ShopTitle";
import SizesStandardized from "./components/page-elements/SizesStandardized";
import ThinProfile from "./components/page-elements/ThinProfile";
import ThisIs from "./components/page-elements/ThisIs";
import UpgradeLens from "./components/page-elements/UpgradeLens";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/page-elements/Footer";

export default function Home({ products }) {
  return (
    <>
      <Navbar />
      <Hero />
      <NextStep />
      <ThisIs />
      <UpgradeLens />
      <ThinProfile />
      <CineVsSuit />
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
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
