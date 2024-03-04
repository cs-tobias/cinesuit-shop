import Link from "next/link";
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
        {!isMobile && (
          <video
            src="/videos/ShopBanner1.mov"
            autoPlay
            muted
            loop
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 min-h-full min-w-full object-cover ${
              isLoaded ? "animate-fadeIn" : ""
            }`}
          ></video>
        )}

        {/* Text Content */}
        <div className="relative z-10 max-w-[375px] md:max-w-[600px] text-center mx-auto pt-16 pb-4 text-white">
          {featuredProduct.productType === "new" && (
            <div className="text-white text-xl">Available Now</div>
          )}
          <h1 className="text-5xl md:text-7xl tracking-tighter leading-11 font-semibold mt-2 mb-6">
            {featuredProduct.title
              .split(" ")
              .slice(0, 4)
              .map(
                (
                  word:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | PromiseLikeOfReactNode
                    | null
                    | undefined,
                  index: Key | null | undefined
                ) => (
                  <span key={index}>
                    {word} {index === 1 ? <br /> : " "}
                  </span>
                )
              )}
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
