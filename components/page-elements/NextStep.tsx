import React, { forwardRef } from "react"; // Make sure to import React and forwardRef
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import Icons from "../ui/Icons";
import RotWrapper from "../animations/RotWrapper";

const TextWrapper = dynamic(() => import("../animations/TextWrapper"), {
  ssr: false,
});

// Define the component with forwardRef
// eslint-disable-next-line react/display-name
const NextStep = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref}>
      <div className="bg-black w-full pt-10">
        <div className="max-w-[295px] md:max-w-[600px] lg:max-w-[700px] text-center mx-auto pb-4 md:py-4">
          <TextWrapper>
            <h1 className="title-gradient-steel text-5xl md:text-7xl tracking-tight leading-11 font-semibold md:pt-4 mb-8">
              Cine-lens
              <br />
              <span className="title-gradient-steel text-4xl md:text-7xl">
                Transformation
              </span>
            </h1>
          </TextWrapper>
          <TextWrapper>
            <p className="mb-4 text-xl md:text-2xl font-medium leading-11 text-neutral-400">
              <span className="title-gradient-steel">
                Cinesuit takes Sigma ART lenses closer to cinema lenses.{" "}
              </span>
              Experience precision engineering and superior design that deliver
              professional-grade results without the hefty price tag. Taking the
              next step to bridge the gap between photo and cinema lenses.
            </p>
          </TextWrapper>

          <div className="flex justify-center pt-6 pb-12 gap-4 md:hidden">
            <Link
              target="_blank"
              href="https://www.youtube.com/watch?v=YwF0ZCaCNyA"
            >
              <Button className="flex bg-neutral-300 hover:bg-white transition-colors duration-300 text-black font-normal">
                Watch Launch Film
                <Icons
                  icon="player-play-filled"
                  width="18"
                  height="18"
                  className="my-auto ml-1"
                />
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:hidden overflow-hidden">
          <Image
            src="/images/cs-013-hero-lg.png"
            width={400}
            height={800}
            className="w-[325px] lg:w-[1000px] xl:w-[1400px] lg:pr-6 mx-auto"
            alt="Image for Mobile of Sigma 18-35 with Cinesuit"
          />
        </div>
        <RotWrapper>
          <div className="hidden md:block container max-w-7xl text-center mx-auto mt-4 pb-36">
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
                  className="rounded-3xl mb-16"
                />
              </div>
            </div>
          </div>
        </RotWrapper>
      </div>
    </div>
  );
});

export default NextStep;
