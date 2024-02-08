import dynamic from "next/dynamic";
import Image from "next/image";
import { ImageProps } from "../../../components/interfaces/ImageProps";

const TextWrapper = dynamic(
  () => import("../../../components/animations/TextWrapper"),
  {
    ssr: false,
  }
);
const MoveWrapper1 = dynamic(
  () => import("../../../components/animations/MoveWrapper1"),
  {
    ssr: false,
  }
);

const GalleryPage = () => {
  const images: ImageProps[] = [
    {
      src: "/images/gallery/image15.png",
      alt: "Descriptive Alt Text",
      aspectRatio: "square",
      bgColor: "#f2f2f2",
    },
    {
      src: "/images/gallery/image6.png",
      alt: "Descriptive Alt Text",
      aspectRatio: "wide",
    },
    {
      src: "/images/gallery/image1.png",
      alt: "Descriptive Alt Text",
      aspectRatio: "wide",
    },
    {
      src: "/images/gallery/image11.png",
      alt: "Descriptive Alt Text",
      aspectRatio: "wide",
    },
    {
      src: "/images/gallery/image7.png",
      alt: "Descriptive Alt Text",
      aspectRatio: "wide",
    },
    {
      src: "/images/gallery/image5.png",
      alt: "Descriptive Alt Text",
      aspectRatio: "wide",
    },
    {
      src: "/images/gallery/image9.png",
      alt: "Descriptive Alt Text",
      aspectRatio: "wide",
    },
    // Add other images here
  ];

  const wideImageHeight = 350; // Set the height for wide images
  const gapSize = 6; // Gap size in pixels

  return (
    <div className="bg-black w-full">
      <div className="container mx-auto p-6 grid grid-cols-2 gap-6">
        {images.map((img, index) => {
          const isSquare = img.aspectRatio === "square";
          const height = isSquare
            ? `calc(${2 * wideImageHeight}px + ${gapSize}px)`
            : `${wideImageHeight}px`;

          const imageComponent = (
            <Image
              src={img.src}
              alt={img.alt}
              layout="fill"
              className="object-cover"
            />
          );

          return (
            <div
              key={index}
              className={`rounded-xl overflow-hidden relative ${
                img.aspectRatio === "square" ? "row-span-2" : ""
              }`}
              style={{ height: height, width: "100%" }}
            >
              {img.bgColor && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: img.bgColor,
                    opacity: img.opacity,
                  }}
                ></div>
              )}

              {index === 0 ? (
                <MoveWrapper1>{imageComponent}</MoveWrapper1>
              ) : (
                imageComponent
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
