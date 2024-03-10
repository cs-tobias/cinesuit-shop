import Link from "next/link";
import Image from "next/image";
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  startTransition,
  useEffect,
  useState,
} from "react";
import Button from "../Button";

interface FeaturedProductProps {
  featuredProduct: {
    productType: string;
    title: string;
    handle: string;
  };
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({
  featuredProduct,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Assuming video loads quickly, otherwise consider more robust load detection
    setIsLoaded(true);
  }, []);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!featuredProduct) {
    return <div></div>;
  }

  return (
    <>
      <div className="relative w-full py-10 bg-black border-b border-neutral-200 overflow-hidden">
        <Image
          src="/images/featured-sm-013.jpg"
          alt="featured product image"
          layout="fill"
          objectFit="cover"
          className={`w-[400px] mx-auto ${isLoaded ? "animate-fadeIn" : ""}`}
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>
        <div className="relative z-10 max-w-[375px] md:max-w-[600px] text-center mx-auto pt-14 text-white">
          {featuredProduct.productType === "new" && (
            <h5 className="text-white text-xl">Available Now</h5>
          )}

          <h1 className="text-5xl md:text-7xl tracking-tighter leading-11 font-semibold mt-2 mb-6">
            Cinesuit for <br /> Sigma 18-35
          </h1>
          <div className="text-center my-3">
            <Link href={`/shop/${featuredProduct.handle}`}>
              <Button
                size="medium"
                className="text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
              >
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedProduct;
