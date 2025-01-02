import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      // Ensuring that all necessary measurements are taken before showing the image
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

      // Only apply these dimensions on medium screens and above, and mark as loaded
      if (window.innerWidth >= 768) {
        setImageDimensions({ width: imageWidth, height: availableHeight });
      } else {
        // For smaller screens, you might want to adjust or maintain a specific handling
        // This example sets a default/fallback, adjust as necessary for your design
        setImageDimensions({ width: 600, height: 400 }); // Default values for smaller screens
      }
      setIsLoaded(true); // This now marks the end of calculations and adjustments
    };

    window.addEventListener("resize", calculateImageDimensions);
    calculateImageDimensions(); // Initial call to ensure everything is set before the first render

    // Cleanup listener when component unmounts
    return () => window.removeEventListener("resize", calculateImageDimensions);
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

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
            alt="Cinesuit landing page image"
            width={imageDimensions.width}
            height={imageDimensions.height}
            priority
          />
        </div>
      </div>
      <div className="absolute bottom-14 w-full text-center text-neutral-500 font-semibold text-lg">
        <p>Coming soon</p>
      </div>
    </div>
  );
};

export default ComingSoon;
