import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import dynamic from "next/dynamic";

const RotWrapper = dynamic(() => import("../animations/RotWrapper"), {
  ssr: false,
});

const ComingSoon = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const callToActionRef = useRef<HTMLDivElement>(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 600, // Default width for small screens
    height: 400, // Default height for small screens
  });
  const [titleHeight, setTitleHeight] = useState(0);
  const paddingTop = 60;
  const paddingBottom = 0;
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Assuming video loads quickly, otherwise consider more robust load detection
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const calculateImageDimensions = () => {
      const titleHeightValue = titleRef.current?.offsetHeight ?? 0;
      const callToActionHeight = callToActionRef.current?.offsetHeight ?? 0;
      const availableHeight =
        window.innerHeight -
        titleHeightValue -
        callToActionHeight -
        paddingTop -
        paddingBottom;

      setTitleHeight(titleHeightValue);
      const aspectRatio = 16 / 9;
      const imageWidth = availableHeight * aspectRatio;

      // Apply these dimensions only on medium screens and above
      if (window.innerWidth >= 768) {
        // Tailwind's default breakpoint for medium screens
        setImageDimensions({ width: imageWidth, height: availableHeight });
      }
    };

    calculateImageDimensions();
    window.addEventListener("resize", calculateImageDimensions);

    return () => window.removeEventListener("resize", calculateImageDimensions);
  }, []);

  return (
    <div className="bg-black h-screen w-full overflow-hidden relative">
      <div ref={titleRef} className="text-center text-white pt-24 md:pt-28">
        <h1 className="text-7xl md:text-9xl tracking-tighter leading-11 font-semibold">
          Cinesuit
        </h1>
        <p className="ml-4 text-2xl font-medium leading-11 text-neutral-500">
          Building a future of accessible cinematography.
        </p>
      </div>

      <div
        className={`w-full ${isLoaded ? "animate-fadeIn" : ""}`}
        onLoadedData={() => setIsLoaded(true)}
      >
        <div
          className="absolute -mt-5 md:-mt-8 left-1/2"
          style={{
            top: `calc(${titleHeight}px + ${paddingTop}px)`,
            height: `${imageDimensions.height}px`,
            width: `${imageDimensions.width}px`,
            transform: "translateX(-50%)",
          }}
        >
          <Image
            src="/images/cs-hero-lg-1_02.jpg"
            alt="Hero Image"
            width={imageDimensions.width}
            height={imageDimensions.height}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
