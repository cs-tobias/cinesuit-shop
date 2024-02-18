import FooterDark from "@/pages/components/page-elements/FooterDark";
import Navbar from "@/components/ui/Navbar";
import { client } from "@/utils/shopifyClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox"; // Assuming you have a Lightbox component

// Assuming Product type is correctly defined in "@/types/Types"
import { Product } from "@/types/Types";

interface UnreleasedProductPageProps {
  product: Product;
  imagePaths: string[];
}

const UnreleasedProductPage: React.FC<UnreleasedProductPageProps> = ({
  product,
  imagePaths,
}) => {
  const router = useRouter();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="bg-black w-full min-h-screen pt-10 text-white">
        <div className="max-w-[295px] md:max-w-[600px] mx-auto py-4 md:py-10 text-center">
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tight leading-11 pt-7 mb-8">
            {product.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-500 mb-4">
            Decide which Cinesuits are released next by choosing from the poll
            on our Facebook page.
          </p>
          <div className="flex justify-center pt-2 pb-4 gap-4">
            <Link href="https://www.facebook.com" passHref>
              <Button
                size="large"
                className="flex bg-neutral-300 hover:bg-white transition-colors duration-300 text-black font-normal"
              >
                Request Lenses on Facebook
              </Button>
            </Link>
          </div>
        </div>
        <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imagePaths.map((src, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={src}
                alt={`Image ${index}`}
                width={400}
                height={300}
                layout="responsive"
              />
            </div>
          ))}
        </div>
        {isLightboxOpen && (
          <Lightbox
            images={imagePaths}
            selectedIndex={selectedImageIndex}
            onClose={() => setIsLightboxOpen(false)}
            isOpen={false}
          />
        )}
        <FooterDark />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: {
  params: { handle: string };
}) {
  const { handle } = context.params;
  const product = await client.product.fetchByHandle(handle);

  if (product.productType !== "unreleased") {
    return {
      redirect: {
        destination: `/shop/${handle}`,
        permanent: false,
      },
    };
  }

  const imageCount = 5; // Adjust based on your actual needs for the gallery
  const imagePaths = Array.from(
    { length: imageCount },
    (_, index) => `/images/${handle}/image${index + 1}.png`
  );

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      imagePaths,
    },
  };
}

export default UnreleasedProductPage;
