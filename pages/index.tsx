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
    revalidate: 3600, // Optional: Revalidate at most once per hour for updates
  };
}
