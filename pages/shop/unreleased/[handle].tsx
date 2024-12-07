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
          images.length === 0 ? "flex items-center justify-center" : "pt-10"
        }`}
      >
        <div className="max-w-[295px] md:max-w-[650px] mx-auto py-4 md:py-10 text-center">
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tight leading-11 pt-7 mb-8">
            {product.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-400 mb-4">
            Influence and Save: Secure your spot on our waiting list and get a
            20% discount on the {product.title}. Limited spots available!
          </p>
          <div className="mt-4">
            <ConvertkitEmailForm productTitle={product.title} />
          </div>
        </div>

        {/* Conditionally render the image gallery if images exist */}
        {images.length > 0 && (
          <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-12">
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

  const folderPath = path.join(process.cwd(), `public/images/${handle}/dark`);
  const imageFiles = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".png"))
    .sort((a, b) => {
      const indexA = parseInt(a.match(/image(\d+)/)?.[1] || "0", 10);
      const indexB = parseInt(b.match(/image(\d+)/)?.[1] || "0", 10);
      return indexA - indexB;
    });

  const images = imageFiles.map((file) => ({
    src: `/images/${handle}/dark/${file}`,
    alt: `Image from ${file}`,
  }));

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      images,
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
