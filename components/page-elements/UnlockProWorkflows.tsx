import { useState, useEffect, useRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import TextWrapper from "../animations/TextWrapper";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Icons from "../ui/Icons";

interface FocusPullerProps {
  numImages: number;
  pathPrefix: string;
  fileExtension: string;
  padLength: number;
}

const FocusPuller: React.FC<FocusPullerProps> = ({
  numImages,
  pathPrefix,
  fileExtension,
  padLength,
}) => {
  const middleIndex = Math.floor(numImages / 2);
  const [currentImage, setCurrentImage] = useState(middleIndex);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [direction, setDirection] = useState(1);
  const [loopCount, setLoopCount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const maxLoops = 2; // To play one more time before stopping
  const componentRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const getImagePaths = (
    numImages: number,
    pathPrefix: string,
    fileExtension: string,
    padLength: number
  ): string[] => {
    const paths = [];
    for (let i = 0; i < numImages; i++) {
      const paddedNumber = String(i).padStart(padLength, "0");
      paths.push(`${pathPrefix}${paddedNumber}${fileExtension}`);
    }
    return paths;
  };

  const images = getImagePaths(numImages, pathPrefix, fileExtension, padLength);
  const lastImage = images[images.length - 1];
  const firstImage = images[0];

  const handleSliderPrimitiveChange = (value: number[]) => {
    const index = value[0];
    setCurrentImage(index);
    setIsAutoPlaying(false); // Stop auto-playing when user interacts
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(event.target.value, 10);
    setCurrentImage(index);
    setIsAutoPlaying(false); // Stop auto-playing when user interacts
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAutoPlaying(true);
        }
      },
      { rootMargin: "100px" } // Start just before the component comes into view
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentImage((prev) => {
          let next = prev + direction;
          if (next >= numImages) {
            setDirection(-1); // Reverse direction to backward
            next = prev + direction;
          } else if (next < 0) {
            setDirection(1); // Reverse direction to forward
            next = prev + direction;
            setLoopCount((prevLoopCount) => {
              if (prevLoopCount >= maxLoops - 1) {
                clearInterval(intervalRef.current!);
                intervalRef.current = null;
                setIsAutoPlaying(false);
                return prevLoopCount;
              }
              return prevLoopCount + 1;
            });
          } else if (
            next === middleIndex &&
            direction === -1 &&
            loopCount >= maxLoops - 1
          ) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setIsAutoPlaying(false);
          }
          return next;
        });
      }, 1000 / 24); // Assuming 24 FPS for real-time speed
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [isAutoPlaying, direction, numImages, loopCount, middleIndex]);

  return (
    <>
      <div className="pt-4 md:pt-10 bg-neutral-100 relative">
        <div className="max-w-[295px] md:max-w-[600px] lg:max-w-[720px] text-center mx-auto py-4 md:py-10 text-black relative">
          <TextWrapper>
            <h1 className="text-6xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
              Focus
              <br />
              <span className="title-gradient-steel-inverted"> Wireless.</span>
            </h1>
          </TextWrapper>

          <TextWrapper>
            <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-500 relative z-10">
              With Cinesuit, you can focus remotely using <br />
              <AlertDialog
                open={isDialogOpen}
                onOpenChange={handleDialogOpenChange}
              >
                <AlertDialogTrigger asChild>
                  <span className="hover:underline text-black hover:cursor-pointer">
                    follow focus systems.
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white p-4 md:p-8 rounded-2xl max-w-3xl w-full mx-auto text-center flex flex-col custom-dialogbox-style">
                  <button
                    className="absolute top-4 right-4 md:top-6 md:right-6 rounded-full bg-neutral-200 text-black text-xl md:text-2xl font-bold p-2 hover:cursor-pointer hover:text-black transition-color duration-300"
                    onClick={() => handleDialogOpenChange(false)}
                  >
                    <Icons icon="x" width="20" height="20" strokeWidth="2" />
                  </button>
                  <div className="p-4 md:p-10 flex-grow">
                    <AlertDialogHeader className="relative">
                      <AlertDialogTitle className="text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-10 text-center tracking-tight font-semibold">
                        <p className="my-1 md:my-2 text-sm md:text-base tracking-normal font-normal">
                          General Information
                        </p>
                        Follow Focus Systems
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription className="text-left text-sm md:text-base lg:text-lg text-gray-700 leading-6 md:leading-7">
                      Follow focus systems are tools that allow you to control
                      the focus and zoom rings of your lens without physically
                      touching it. They are usually attached to 15mm rods and
                      allow for a longer and more precise focus throw, hard
                      stops and disc markings. Wireless versions provide the
                      same control, but remotely. Making them perfect for
                      situations where you cant be close to the camera while
                      filming.
                      <br />
                      <br />
                      <span className="text-black font-semibold">
                        Why not touch the lens?
                      </span>{" "}
                      Physically adjusting the lens can cause unwanted camera
                      movement, especially when using gimbals or shooting in
                      tight spaces. Remote control allows for smooth, precise
                      adjustments without disturbing your shot, ensuring
                      professional-quality results.
                    </AlertDialogDescription>
                  </div>
                  <div className="hidden md:block bg-neutral-100 py-4 px-4 md:px-8 -mx-4 md:-mx-8 -mb-8 md:-mb-8 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] rounded-b-2xl">
                    <p className="text-sm md:text-base py-4 text-neutral-600">
                      Disclaimer: Cinesuit is not a follow focus system.
                    </p>
                  </div>
                </AlertDialogContent>
              </AlertDialog>{" "}
              Perfect for gimbal work or when someone else handles focus,
              allowing you to concentrate on framing.{" "}
              <span className="title-gradient-steel-inverted">
                For any situation where hands on the lens isn’t practical.
              </span>
            </p>
          </TextWrapper>
        </div>
        <div className="hidden md:block mx-auto mb-14 my-4 flex w-full max-w-md h-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 z-20">
          <SliderPrimitive.Root
            min={0}
            max={images.length - 1}
            step={1}
            value={[currentImage]} // Pass value as an array
            onValueChange={handleSliderPrimitiveChange} // Use the updated handler
            className="relative flex w-full touch-none select-none items-center mx-14 md:mx-0 mx-auto"
          >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-300">
              <SliderPrimitive.Range className="absolute h-full bg-primary" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-black bg-black transition-colors focus:outline-none" />
          </SliderPrimitive.Root>
        </div>
        <div
          ref={componentRef}
          className="select-none relative z-0 w-full flex items-center mx-auto justify-center"
        >
          <div className="relative w-[340px] md:w-[666px] lg:w-[960px] xl:w-[1160px]">
            <img
              src={
                images[currentImage] ||
                (direction === 1 ? firstImage : lastImage)
              }
              alt="Focus"
              className="w-full h-auto"
              onError={(e) => {
                e.currentTarget.src = lastImage;
              }}
            />
          </div>
        </div>

        <div className="md:hidden mx-auto pt-12 px-20 flex w-full max-w-md h-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 z-20">
          <SliderPrimitive.Root
            min={0}
            max={images.length - 1}
            step={1}
            value={[currentImage]} // Pass value as an array
            onValueChange={handleSliderPrimitiveChange} // Use the updated handler
            className="relative flex w-full touch-none select-none items-center mx-14 md:mx-0 mx-auto"
          >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-300">
              <SliderPrimitive.Range className="absolute h-full bg-primary" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-black bg-black transition-colors focus:outline-none" />
          </SliderPrimitive.Root>
        </div>
      </div>
    </>
  );
};

export default FocusPuller;
