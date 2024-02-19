import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import FooterDark from "../components/page-elements/FooterDark";
import Navbar from "../components/ui/Navbar";
import RotWrapper from "../components/animations/RotWrapper";

const TextWrapper = dynamic(
  () => import("../components/animations/TextWrapper"),
  {
    ssr: false,
  }
);
const PosLtoR = dynamic(() => import("../components/animations/RotWrapper"), {
  ssr: false,
});

const Instructions: React.FC = (products, featuredProduct) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Assuming video loads quickly, otherwise consider more robust load detection
    setIsLoaded(true);
  }, []);

  const videoSkeleton = (
    <div
      className="w-full mx-auto rounded-5xl"
      style={{ position: "relative", paddingBottom: "56.25%" }}
    >
      <Skeleton className="absolute top-0 bg-neutral-800 left-0 w-full h-full rounded-3xl" />
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-black w-full pb-16 pt-16">
        <div className="max-w-[295px] md:max-w-[600px] text-center  mx-auto py-4 md:py-10 text-white">
          <h1 className="text-6xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
            How to Install
          </h1>

          <TextWrapper>
            <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-500">
              Installation is easy, but make sure to follow the guide so you
              dont make any mistakes. Watch our how-to video, or follow the
              written guide below.
            </p>
          </TextWrapper>
        </div>
        <RotWrapper>
          <div className="container max-w-5xl text-center mx-auto">
            <div
              className={`w-full ${isLoaded ? "animate-fadeIn" : ""}`}
              onLoadedData={() => setIsLoaded(true)}
            >
              {!isLoaded ? (
                videoSkeleton
              ) : (
                <div className="mx-auto">
                  <div
                    className="w-full mx-auto rounded-5xl"
                    style={{ position: "relative", paddingBottom: "56.25%" }}
                  >
                    <iframe
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      src="https://www.youtube.com/embed/qNAEtyBosbM"
                      frameBorder="0"
                      allowFullScreen
                      title="Embedded youtube"
                      className="rounded-3xl"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </RotWrapper>
      </div>

      <div className="bg-black w-full">
        <div className="max-w-[295px] md:max-w-[600px] text-center  mx-auto py-4 md:py-10 text-white">
          <TextWrapper>
            <h1 className="text-6xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
              Written Guide
            </h1>
          </TextWrapper>
          <TextWrapper>
            <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-500 pb-2">
              <span className="text-white">
                Make sure you have all nessecary components.
              </span>{" "}
              Your Simga ART lens, Cinesuit rings, screws, screwdriver and the
              rubber removal tool.
            </p>
          </TextWrapper>
          <TextWrapper>
            <h1 className="text-3xl md:text-3xl tracking-tight leading-11 font-semibold pt-14">
              1. Remove rubber ring(s)
            </h1>
          </TextWrapper>
          <TextWrapper>
            <p className="my-4 text-xl md:text-xl font-medium leading-11 text-neutral-500">
              Get your lens and identify the rubber ring. Use your finger to
              slightly lift up the edge of the rubber ring, then slide the
              rubber removal tool underneath. This gives room for you to put
              your finger(s) under the rubber ring and to pull it down. Pull a
              little on one side, then repeat the process, little by little, all
              around the lens. Once its taken off, make sure to store it in a
              clean and safe place where you wont loose it in case you want to
              revert back to original.
            </p>
          </TextWrapper>
          <TextWrapper>
            <h1 className="text-3xl md:text-3xl tracking-tight leading-11 font-semibold pt-8">
              2. Slide on Cinesuit
            </h1>
          </TextWrapper>
          <TextWrapper>
            <p className="my-4 text-xl md:text-xl font-medium leading-11 text-neutral-500">
              Start with one of the Cinesuit half rings. Line it up with the
              grouve in the lens, and push it onto the lens. Next, do the same
              for the other side, but make sure to go slowly, as to not to
              scratch your lens. Cinesuit rings are metal and can easily scratch
              the metal part of your lens.
            </p>
          </TextWrapper>
          <TextWrapper>
            <h1 className="text-3xl md:text-3xl tracking-tight leading-11 font-semibold pt-8">
              3. Insert the screws
            </h1>
          </TextWrapper>
          <TextWrapper>
            <p className="my-4 text-xl md:text-xl font-medium leading-11 text-neutral-500">
              Lastly, Insert the screws. Insert the first screw and secure it.
              Next, lightly squeeze the two half-rings together in order to
              insert and secure the next screw. A little pressure is nessecary,
              but careful not to damage your lens.
            </p>
          </TextWrapper>
          <TextWrapper>
            <h1 className="text-6xl md:text-5xl tracking-tight leading-11 font-semibold pt-7 mb-8">
              — And thats it.
            </h1>
          </TextWrapper>
          <TextWrapper>
            <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-50 pb-2">
              Enjoy your new compact cinema lens!
            </p>
          </TextWrapper>
        </div>
      </div>

      <FooterDark />
    </>
  );
};

export default Instructions;
