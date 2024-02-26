import React, { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import FooterDark from "@/components/page-elements/FooterDark";
import Navbar from "@/components/ui/Navbar";
import Button from "@/components/Button";
import LightboxDark from "@/components/ui/LightboxDark";
import { client } from "@/utils/shopifyClient";
import { Product } from "@/types/Types";

interface UnreleasedProductPageProps {
  product: Product;
  imagePaths: string[];
}

const UnreleasedProductPage: React.FC<UnreleasedProductPageProps> = ({
  product,
  imagePaths,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Dynamically adjust the path for high-resolution images
  const highResImagePaths = imagePaths.map((path) =>
    path.replace(`/images/${product.handle}/`, `/images/${product.handle}/lg/`)
  );

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
        <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {imagePaths.map((src, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={src}
                alt={`Image ${index}`}
                width={1920}
                height={1080}
                layout="responsive"
                className="rounded-xl"
              />
            </div>
          ))}
        </div>
        {isLightboxOpen && (
          <LightboxDark
            isOpen={isLightboxOpen}
            images={highResImagePaths} // Pass high-resolution images for Lightbox
            onClose={() => setIsLightboxOpen(false)}
            selectedIndex={selectedImageIndex}
            setSelectedIndex={setSelectedImageIndex}
          />
        )}
        <div className="h-[40px] w-full hidden xl:block"></div>
        <FooterDark />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const handle = params?.handle as string;
  const product = await client.product.fetchByHandle(handle);
  if (product.productType !== "unreleased") {
    return {
      redirect: {
        destination: `/shop/${handle}`,
        permanent: false,
      },
    };
  }
  const imagePaths = Array.from(
    { length: 6 },
    (_, index) => `/images/${handle}/image${index + 1}.jpg`
  );
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      imagePaths,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default UnreleasedProductPage;
