import Image from "next/image";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import NextImageWithGradient from "../effects/ImageGradient";
import Button from "../ui/Button";

const TextWrapper = dynamic(() => import("../animations/TextWrapper"), {
  ssr: false,
});

const End = () => {
  return (
    <div className="bg-neutral-100 w-full py-6 pt-16 pb-10">
      <div className="max-w-[295px] md:max-w-[600px] text-center  mx-auto text-black">
        {/* Wrap only the text elements */}
        <TextWrapper>
          <h1 className="text-5xl md:text-8xl tracking-tight leading-11 font-semibold md:pt-4 mb-8">
            Roadmap
          </h1>
        </TextWrapper>

        <div className="text-2xl font-medium leading-11 text-neutral-500">
          <p className="">
            Our mission is to support the entire Sigma ART range,{" "}
            <span className="text-black">
              to create a complete Cinesuit lens set.
            </span>{" "}
            However, we got to start somewhere.
          </p>
          <p className="py-10">
            <span className="text-black">
              You decide what lens models we support next
            </span>{" "}
            by showing your interest and request what lens(es) you want us to
            support.
          </p>
          <p className="t">
            Next we plan to release the 85, 40, 28 and 14mm primes. Pre-order is
            available.
          </p>
        </div>
        <div className="flex justify-center gap-3 py-6">
          <Link href={"/shop"}>
            <Button
              size="medium"
              className="text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
            >
              Buy
            </Button>
          </Link>
          <Link href={"/contact"}>
            <Button
              size="medium"
              className="text-white bg-neutral-800 hover:bg-black transition-colors duration-300"
            >
              Request Lenses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default End;
