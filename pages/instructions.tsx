import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import FooterDark from "../components/page-elements/FooterDark";
import Navbar from "../components/ui/Navbar";
import RotWrapper from "../components/animations/RotWrapper";
import { NextSeo } from "next-seo";

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
      <NextSeo title="Cinesuit - Instructions" />
      <Navbar />
      <div className="bg-black w-full pb-16 pt-16">
        <div className="max-w-[295px] md:max-w-[600px] text-center  mx-auto py-4 md:py-10 text-white">
          <h1 className="title-gradient-steel text-6xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
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
                      src="https://www.youtube.com/embed/YwF0ZCaCNyA"
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

      <div className="bg-black w-full text-xl font-medium leading-11 text-neutral-400">
        <div className="max-w-[295px] md:max-w-[600px] mx-auto py-4 md:py-10">
          <TextWrapper>
            <h1 className="title-gradient-steel  text-6xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
              Written Guide
            </h1>
          </TextWrapper>
          <TextWrapper>
            <p className="text-xl md:text-2xl leading-11 pb-2">
              First, gather everything you need: your Sigma ART lens, the
              Cinesuit rings, screws, a screwdriver, and the rubber removal
              tool.
            </p>
          </TextWrapper>
          <TextWrapper>
            <h1 className="text-white text-3xl md:text-3xl tracking-tight leading-11 font-semibold pt-14 mb-4">
              1. Removing the Rubber Ring
            </h1>
          </TextWrapper>
          <TextWrapper>
            <ul className="ulcustom">
              <li className="licustom">
                <span className="text-neutral-200">
                  Locate the rubber ring on your lens.
                </span>
              </li>
              <li className="licustom">
                <h3 className="text-neutral-200">
                  Push the pointy end of the rubber removal tool down at the
                  edge of the rubber ring. Then turn the rubber removal tool to
                  the side, to get the it underneath the rubber ring.
                </h3>
              </li>
              <li className="licustom">
                <span className="text-neutral-200">
                  Peel the ring off gradually.
                </span>{" "}
                Working around the lens. Go bit by bit until it&apos;s
                completely removed.
              </li>
              <li className="licustom">
                <span className="text-neutral-200">Keep the ring safe</span> in
                a clean spot in case you want to switch back later.
              </li>
            </ul>
          </TextWrapper>

          <TextWrapper>
            <h1 className="text-white text-3xl md:text-3xl tracking-tight leading-11 font-semibold pt-6 mb-4">
              2. Attaching the Cinesuit
            </h1>
          </TextWrapper>
          <TextWrapper>
            <ul className="ulcustom">
              <li className="licustom">
                <span className="text-neutral-200">
                  Position a Cinesuit half-ring
                </span>{" "}
                against the groove on your lens and press it on.
              </li>
              <li className="licustom">
                <span className="text-neutral-200">
                  Carefully place the second half
                </span>{" "}
                on the other side. Move slowly to avoid scratches; the rings are
                metal and could mark your lens.
              </li>
            </ul>
          </TextWrapper>

          <TextWrapper>
            <h1 className="text-white text-3xl md:text-3xl tracking-tight leading-11 font-semibold pt-6 mb-4">
              3. Securing with Screws
            </h1>
          </TextWrapper>
          <TextWrapper>
            <ul className="ulcustom">
              <li className="licustom">
                <span className="text-neutral-200">
                  The screws are inserted at a 45 degree angle.
                </span>
              </li>
              <li className="licustom">
                <span className="text-neutral-200">
                  Insert and partially tighten the first screw.
                </span>
              </li>
              <li className="licustom">
                <span className="text-neutral-200">
                  Then insert and tighten the other screw.
                </span>{" "}
                You may need to use a little force to push the two half rings
                together.
              </li>
              <li className="licustom">
                <span className="text-neutral-200">
                  Now make sure each screw is fully secured, but make sure not
                  to overtighten!
                </span>{" "}
              </li>
            </ul>
          </TextWrapper>

          <TextWrapper>
            <h1 className="text-white text-6xl md:text-5xl tracking-tight pt-7 mb-8">
              — And you&apos;re done!
            </h1>
          </TextWrapper>
          <TextWrapper>
            <p className="text-white text-xl md:text-2xl pb-2">
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
