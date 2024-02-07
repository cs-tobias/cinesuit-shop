import Image from "next/image";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import NextImageWithGradient from "../effects/ImageGradient";
import Button from "../ui/Button";

const TextWrapper = dynamic(() => import("../animations/TextWrapper"), {
  ssr: false,
});

const NextStep = () => {
  return (
    <div className="bg-black w-full pt-10">
      <div className="max-w-[295px] md:max-w-[600px] text-center  mx-auto pb-4 md:py-4 text-white">
        {/* Wrap only the text elements */}
        <TextWrapper>
          <h1 className="text-5xl md:text-7xl tracking-tight leading-11 font-semibold md:pt-4 mb-8">
            Cine-lens
            <br />
            <span className="text-4xl md:text-7xl">Transformation</span>
          </h1>
        </TextWrapper>
        <TextWrapper>
          <p className="mb-4 text-xl font-medium leading-11 text-neutral-500">
            Cinesuit is bridging the gap between photo and cinema lenses. —
            Embrace the art of precision and design, as Cinesuit seamlessly
            melds with your Sigma ART lenses.
          </p>
        </TextWrapper>

        <div className="flex justify-center pt-6 pb-12 gap-4">
          <Link
            target="_blank"
            href={"https://www.youtube.com/watch?v=tIbT4HpLnNA"}
          >
            <Button className="flex bg-neutral-300 hover:bg-white transition-colors duration-300 text-black font-normal">
              Watch Launch Film
              <img
                src="images/icons/play-circle.svg"
                className="w-4 h-4 my-auto ml-1 mb-1"
              />
            </Button>
          </Link>
        </div>
      </div>
      <div className="md:hidden overflow-hidden">
        <Image
          src="/images/cs-013-hero-lg.png"
          className="w-[325px] lg:w-[1000px] xl:w-[1400px] lg:pr-6 mx-auto"
          width={1800}
          height={800}
          alt="Descriptive Alt Text"
        />
      </div>
      <div className="hidden md:block overflow-hidden px-20">
        <Image
          src="/images/1835-profile-hero-1.png"
          className="w-[660px] lg:w-[1000px] xl:w-[1800px] lg:pr-6 mx-auto"
          width={1800}
          height={800}
          alt="Descriptive Alt Text"
        />
      </div>
    </div>
  );
};

export default NextStep;
