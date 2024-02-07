import Link from "next/link";
import FooterDark from "./components/page-elements/FooterDark";
import Navbar from "./components/ui/Navbar";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TextWrapper = dynamic(
  () => import("./components/animations/TextWrapper"),
  {
    ssr: false,
  }
);
const PosLtoR = dynamic(() => import("./components/animations/PosLtoR"), {
  ssr: false,
});
const PosRtoL = dynamic(() => import("./components/animations/PosRtoL"), {
  ssr: false,
});
const RotWrapper = dynamic(() => import("./components/animations/RotWrapper"), {
  ssr: false,
});

const Instructions = () => {
  return (
    <>
      <Navbar />
      <div className="bg-black w-full pb-16 pt-16">
        <div className="max-w-[295px] md:max-w-[600px] text-center mx-auto py-4 md:pt-10 text-white">
          <h1 className="text-4xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
            By Filmmakers.
            <br />
            For Filmmakers.
          </h1>
          <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-500">
            Cinesuit was created from the desire of wanting to use and own
            cinema lenses, by Filmmmaker and 3D Artist, Tobias Eek. No longer
            wanting to deal with the typical budget solutions and at the same
            time not being able to afford the real deal.
          </p>
        </div>
        <RotWrapper>
          <div className="flex justify-center w-full mx-auto pb-12">
            <Image
              src="/images/cs-prime-lineup.jpg"
              className="max-w-none w-[885px] md:w-[1024px] xl:w-[1424px]"
              width={1920}
              height={760}
              alt="Descriptive Alt Text"
            />
          </div>
        </RotWrapper>
        <div className="max-w-[295px] md:max-w-[600px] text-center mx-auto py-4 md:pt-10 text-white">
          <h1 className="text-4xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
            Introducing Cinesuit
          </h1>
          <TooltipProvider>
            <Tooltip>
              <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-500">
                After one day trying to dissassemble a Sigma ART 24mm, starting
                with the rubber ring, Tobias got an ephiphony
              </p>
            </Tooltip>
          </TooltipProvider>
        </div>
        <RotWrapper>
          <div className="flex justify-center w-full mx-auto pb-12">
            <Image
              src="/images/cs-prime-lineup.jpg"
              className="max-w-none w-[885px] md:w-[1024px] xl:w-[1424px]"
              width={1920}
              height={760}
              alt="Descriptive Alt Text"
            />
          </div>
        </RotWrapper>
        <div className="max-w-[295px] md:max-w-[600px] text-center mx-auto py-4 md:pt-10 text-white">
          <h1 className="text-4xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
            Why Sigma
          </h1>
          <TooltipProvider>
            <Tooltip>
              <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-500">
                Sigma ART lenses are some of the best lenses on the market. Both
                in image, build, price — and with Cinesuit, they&apos;re
                practically perfect. Cinesuit does not{" "}
                <TooltipTrigger asChild>
                  <span className="font-serif text-neutral-300 hover:text-neutral-50 transition-colors duration-300">
                    yet
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Plans for the future...</p>
                </TooltipContent>{" "}
                provide hard-stops or manual aperture, but rather, Cinesuit
                gives you a consitant, reliable and streamlined set of great
                lenses for use with follow focus systems.
              </p>
            </Tooltip>
          </TooltipProvider>
        </div>
        <RotWrapper>
          <div className="flex justify-center w-full mx-auto pb-12">
            <Image
              src="/images/cs-prime-lineup.jpg"
              className="max-w-none w-[885px] md:w-[1024px] xl:w-[1424px]"
              width={1920}
              height={760}
              alt="Descriptive Alt Text"
            />
          </div>
        </RotWrapper>
      </div>

      <FooterDark />
    </>
  );
};

export default Instructions;
