import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const TextWrapper = dynamic(() => import("../animations/TextWrapper"), {
  ssr: false,
});
const RotWrapper = dynamic(() => import("../animations/RotWrapper"), {
  ssr: false,
});

const SizesStandardized = () => {
  return (
    <div className="bg-black w-full pt-6 overflow-hidden pb-2">
      <div className="max-w-[295px] md:max-w-[600px] text-center mx-auto py-4 text-white">
        <TextWrapper>
          <h1 className="text-6xl md:text-7xl tracking-tight leading-11 font-semibold pt-4 mb-8">
            <span className="title-gradient-steel">Standard.</span>
            <br />
            <span className="title-gradient-steel">Sizes.</span>
          </h1>
        </TextWrapper>
        <TextWrapper>
          <p className="pt-3 mb-4 text-xl md:text-2xl font-medium leading-11 text-neutral-400">
            Across the Prime lineup — with Cinesuit, every lens has gears placed
            at the same distance from the lens mount.{" "}
            <span className="title-gradient-steel">
              Allowing more convenient and faster workflows.
            </span>
          </p>
        </TextWrapper>
      </div>

      <RotWrapper>
        <div className="flex justify-center w-full mx-auto pb-12">
          <Image
            src="/images/cs-prime-lineup_2.jpg"
            className="max-w-none w-[885px] md:w-[1024px] xl:w-[1424px]"
            width={1920}
            height={760}
            alt="Standard-Sizes-Image"
          />
        </div>
      </RotWrapper>
    </div>
  );
};

export default SizesStandardized;
