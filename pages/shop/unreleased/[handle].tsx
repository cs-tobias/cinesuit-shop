import FooterDark from "@/pages/components/page-elements/FooterDark";
import GalleryPage from "@/pages/components/page-elements/ImageGallery";
import { ReactNode } from "react";
import { Product } from "@/types/Types";
import Navbar from "@/pages/components/ui/Navbar";
import { client } from "@/utils/shopifyClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "@/pages/components/ui/Button";

// Define the props interface
interface UnreleasedProductPageProps {
  product: Product; // Use the Product interface
  imagePaths: string[];
}

const UnreleasedProductPage: React.FC<UnreleasedProductPageProps> = ({
  product,
  imagePaths,
}) => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0); // Add state to manage selected image index

  const navigateCarousel = (direction: string) => {
    // Function to navigate through images
    if (direction === "left") {
      setSelectedIndex(
        (prevIndex) => (prevIndex - 1 + imagePaths.length) % imagePaths.length
      );
    } else {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    }
  };

  if (!product) {
    return <div>Loading...</div>; // Or any loading state
  }

  return (
    <div>
      <Navbar />
      <div className="bg-black w-full h-screen pt-10">
        <div className="max-w-[295px] md:max-w-[600px] text-center mx-auto py-4 md:py-10 text-white">
          <h1 className="text-6xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
            {product.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-500 mb-4">
            Decide which Cinesuits are released next by choosing from the poll
            on our Facebook page
          </p>
          <div className="flex justify-center pt-2 pb-4 gap-4">
            <Link target="_blank" href={"https://www.facebook.com"}>
              <Button
                size="large"
                className="flex bg-neutral-300 hover:bg-white transition-colors duration-300 text-black font-normal"
              >
                Request Lenses on Facebook
              </Button>
            </Link>
          </div>
        </div>
        <div className="-mt-4">
          <GalleryPage />
        </div>
        <FooterDark />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: { params: { handle: any } }) {
  const { handle } = context.params;
  const product = await client.product.fetchByHandle(handle);

  // Check if product is actually unreleased, redirect if not
  if (product.productType !== "unreleased") {
    return {
      redirect: {
        destination: `/shop/${handle}`,
        permanent: false,
      },
    };
  }

  // Dynamically generate image paths similar to your product details page
  const imageCount = 2; // Adjust based on your needs
  const imagePaths = Array.from(
    { length: imageCount },
    (_, index) => `/images/${handle}/image${index + 0}.png`
  );

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      imagePaths,
    },
  };
}

export default UnreleasedProductPage;
