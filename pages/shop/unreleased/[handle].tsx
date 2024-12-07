import ConvertkitEmailForm from "@/components/page-elements/ConvertkitEmailForm";
import FooterDark from "@/components/page-elements/FooterDark";
import LightboxDark from "@/components/ui/LightboxDark";
import Navbar from "@/components/ui/Navbar";
import { Product } from "@/types/Types";
import { client } from "@/utils/shopifyClient";
import fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import path from "path";
import React, { useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
}

interface UnreleasedProductPageProps {
  product: Product;
  images: ImageProps[];
}

const UnreleasedProductPage: React.FC<UnreleasedProductPageProps> = ({
  product,
  images,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NextSeo title={`${product.title}`} />
      <Navbar />
      <div
        className={`bg-black w-full min-h-screen text-white ${
          images.length === 0 ? "flex items-center justify-center" : "py-10"
        }`}
      >
        <div className="max-w-[295px] md:max-w-[650px] lg:max-w-[750px] mx-auto py-4 md:py-10 text-center">
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tight leading-11 pt-7 mb-8">
            {product.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-400 mb-4">
            Enter your email to let us know which lenses you want. This way we
            know which ones to prioritize! <br />{" "}
            <span className="font-semibold text-white">
              Your engagement directly influence which lenses we focus on.
            </span>
          </p>
          <div className="mt-4">
            <ConvertkitEmailForm productTitle={product.title} />
          </div>
        </div>

        {/* Conditionally render the image gallery if images exist */}
        {images.length > 0 && (
          <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-12 py-10">
            {images.map((img, index) => (
              <div
                key={index}
                className={`relative ${index === 0 ? "md:row-span-2" : ""}`}
                style={{
                  aspectRatio: index === 0 ? "3 / 4.35" : "4.35 / 3", // Maintain dynamic aspect ratio
                }}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  layout="fill"
                  objectFit="cover"
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}

        {/* Conditionally render the Lightbox if images exist */}
        {images.length > 0 && isLightboxOpen && (
          <LightboxDark
            isOpen={isLightboxOpen}
            images={images.map((img) => img.src)}
            onClose={closeLightbox}
            selectedIndex={selectedImageIndex}
            setSelectedIndex={setSelectedImageIndex}
          />
        )}
      </div>
      <FooterDark />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all products from Shopify
  const products: ShopifyBuy.Product[] = await client.product.fetchAll();

  // Filter products to include only "unreleased" types
  const unreleasedProducts = products.filter(
    (product) =>
      product.productType && product.productType.toLowerCase() === "unreleased"
  );

  // Generate paths for each product
  const paths = unreleasedProducts.map((product) => ({
    params: { handle: product.handle },
  }));

  return {
    paths, // Pre-generate these paths
    fallback: "blocking", // Generate new paths on demand
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const handle = params?.handle as string;

  // Fetch the product by handle
  const product: ShopifyBuy.Product = await client.product.fetchByHandle(
    handle
  );

  // Redirect if the product type is not "unreleased"
  if (!product || product.productType?.toLowerCase() !== "unreleased") {
    return {
      redirect: {
        destination: `/shop/${handle}`,
        permanent: false,
      },
    };
  }

  // Define the folder path
  const folderPath = path.join(process.cwd(), `public/images/${handle}/dark`);

  // Check if the directory exists and load images
  let images: ImageProps[] = [];
  if (fs.existsSync(folderPath)) {
    const imageFiles = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".png"))
      .sort((a, b) => {
        const indexA = parseInt(a.match(/image(\d+)/)?.[1] || "0", 10);
        const indexB = parseInt(b.match(/image(\d+)/)?.[1] || "0", 10);
        return indexA - indexB;
      });

    images = imageFiles.map((file) => ({
      src: `/images/${handle}/dark/${file}`,
      alt: `Image from ${file}`,
    }));
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)), // Serialize product to match custom `Product` type
      images, // Pass empty array if no images
    },
    revalidate: 10, // Revalidate every 10 seconds
  };
};

export default UnreleasedProductPage;
