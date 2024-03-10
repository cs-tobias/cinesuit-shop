import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Image from "next/image";
import FooterDark from "../components/page-elements/FooterDark";
import Navbar from "../components/ui/Navbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TextWrapper = dynamic(
  () => import("../components/animations/TextWrapper"),
  {
    ssr: false,
  }
);
const PosLtoR = dynamic(() => import("../components/animations/PosLtoR"), {
  ssr: false,
});
const PosRtoL = dynamic(() => import("../components/animations/PosRtoL"), {
  ssr: false,
});
const RotWrapper = dynamic(
  () => import("../components/animations/RotWrapper"),
  {
    ssr: false,
  }
);

const Instructions = () => {
  return (
    <>
      <NextSeo title="Cinesuit - About" />
      <Navbar />
      <div className="bg-black w-full pb-16 pt-16">
        <div className="max-w-[295px] md:max-w-[600px] lg:max-w-[960px] text-center mx-auto py-4 md:pt-10 text-white">
          <h3 className="text-4xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
            <span className="">By Filmmakers.</span>
            <br />
            For Filmmakers.
          </h3>
          <TooltipProvider>
            <Tooltip>
              <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-400">
                Cinesuit emerged from founder{" "}
                <TooltipTrigger asChild>
                  <span className="font-serif italic text-neutral-300 hover:text-neutral-50 transition-colors duration-300">
                    Tobias Eek&apos;s
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filmmaker and Designer.</p>
                </TooltipContent>{" "}
                profound love for filmmaking. His journey through the intricate
                world of lenses — exploring the nuances of bokeh, color
                rendition, chromatic aberration, distortion, sharpness and
                softness — has been driven by an eagerness to discover how
                different lenses influence a scene. <br />
                <br /> From the unique swirl of a Helios 44-2&apos;s bokeh and
                the warm colors of a Leica R, to the unmatched clarity offered
                by modern glass like Sigma ART and ARRI Master Primes, each step
                has deepened his understanding of cinematic imagery. <br />
                <br /> Cinesuit is more than just a brand. it&apos;s the
                embodiment of a filmmaker dedicated to overcoming the obstacles
                in our creative processes. This journey, from fascination to
                invention, highlights Cinesuit&apos;s foundational principle:
                it&apos;s about empowering filmmakers at every level with tools
                that were once deemed unreachable.
              </p>
            </Tooltip>
          </TooltipProvider>

          <TextWrapper>
            <RotWrapper>
              <Image
                src="/images/bts/sm/cs-eek-1.jpg"
                className="rounded-xl mt-14 mb-10 mx-auto w-full"
                width={800}
                height={1000}
                alt="Descriptive Alt Text"
              />
            </RotWrapper>
          </TextWrapper>

          <h3 className="text-4xl md:text-7xl tracking-tight leading-10 font-semibold pt-7 mb-8">
            Bridging The Gap
          </h3>
          <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-400">
            On our quest to quality cinematography, we ultimately discover a
            financial challenge:{" "}
            <span className="text-white">
              The lenses we dream of are almost always financially out of reach.
            </span>{" "}
            Sigma ART lenses promised a solution with their blend of quality and
            affordability, yet their cine versions introduced a massive cost
            barrier. <br />
            <br />
            On the other side, you have 3D printed follow focus gears, which,
            while popular due to their low cost, feel like a compromise and lack
            the professional feel and reliability filmmakers need. <br />
            <br /> This situation exposed{" "}
            <span className="text-white">
              a gap in the market—a need for high-quality optics in a
              cinema-friendly package that didn&apos;t break the bank.
            </span>
          </p>

          <TextWrapper>
            <RotWrapper>
              <Image
                src="/images/bts/sm/cs1835-bts4.jpg"
                className="rounded-xl mt-14 mb-10 mx-auto w-full"
                width={800}
                height={1000}
                alt="Descriptive Alt Text"
              />
            </RotWrapper>
          </TextWrapper>

          <h3 className="text-4xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
            A New Solution
          </h3>
          <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-400">
            In response to this dilemma, Cinesuit offers a third path. Unlike 3D
            printed follow focus gears that are slid over the lens&apos;s rubber
            ring{" "}
            <span className="text-white">
              Cinesuit provides a seamlessly integrated, professional-grade
              modification.
            </span>{" "}
            Our approach transcends the common perception of &apos;cheap
            solutions&apos;, offering filmmakers a sense of pride and confidence
            in their gear. With Cinesuit, the focus isn&apos;t just on
            affordability but on providing what is necessary for most
            filmmakers, without the accompanying price tag.
          </p>

          <TextWrapper>
            <RotWrapper>
              <Image
                src="/images/bts/sm/cs40-bts1-1.jpg"
                className="rounded-xl mt-14 mb-10 mx-auto w-full"
                width={800}
                height={1000}
                alt="Descriptive Alt Text"
              />
            </RotWrapper>
          </TextWrapper>

          <h3 className="text-4xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
            Introducing Cinesuit
          </h3>
          <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-400">
            Focusing on Sigma ART lenses, Cinesuit transforms these lenses into
            film-ready tools that somewhat rival their high-cost counterparts in
            functionality and feel. This isn&apos;t about makeshift adjustments;{" "}
            <span className="text-white">
              it&apos;s about a durable, thoughtfully designed enhancement that
              respects the lens&apos;s essence while significantly improving its
              utility for filmmaking.
            </span>
          </p>

          <TextWrapper>
            <RotWrapper>
              <Image
                src="/images/bts/sm/cs40-bts3.jpg"
                className="rounded-xl mt-14 mb-10 mx-auto w-full"
                width={800}
                height={1000}
                alt="Descriptive Alt Text"
              />
            </RotWrapper>
          </TextWrapper>

          <h3 className="text-4xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
            Empowering Filmmakers
            <br />
            Everywhere
          </h3>
          <p className="text-xl md:text-2xl font-medium leading-11 text-neutral-400">
            Cinesuit is more than just a product — it&apos;s a movement towards
            democratizing filmmaking tools. While other options exist, from
            high-end cinema lenses to budget-friendly but less satisfying
            alternatives, Cinesuit stands out by providing a balance of quality,
            affordability, and professional functionality. Our mission is to
            support the creative vision of filmmakers by offering a solution
            that feels genuine and is technically sound, enabling more stories
            to be told in <br />
            visually compelling ways.
          </p>
          <TextWrapper>
            <RotWrapper>
              <Image
                src="/images/bts/sm/cs40-bts3.jpg"
                className="rounded-xl mt-14 mb-10 mx-auto w-full"
                width={800}
                height={1000}
                alt="Descriptive Alt Text"
              />
            </RotWrapper>
          </TextWrapper>

          <h3 className="text-4xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-2">
            Images From
            <br />
            The Journey
          </h3>
        </div>
        <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Image
            src="/images/bts/sm/cs24-bts1.jpg"
            className="rounded-xl mt-8"
            width={800}
            height={1000}
            alt="Descriptive Alt Text"
          />
          <Image
            src="/images/bts/sm/cs1835-bts2-1.jpg"
            className="rounded-xl mt-8"
            width={800}
            height={1000}
            alt="Descriptive Alt Text"
          />
          <Image
            src="/images/bts/sm/cs1835-bts01.jpg"
            className="rounded-xl mt-8"
            width={800}
            height={1000}
            alt="Descriptive Alt Text"
          />
          <Image
            src="/images/bts/sm/cs24-bts1.jpg"
            className="rounded-xl mt-8"
            width={800}
            height={1000}
            alt="Descriptive Alt Text"
          />
          <Image
            src="/images/bts/sm/cs1835-bts2-1.jpg"
            className="rounded-xl mt-8"
            width={800}
            height={1000}
            alt="Descriptive Alt Text"
          />
          <Image
            src="/images/bts/sm/cs1835-bts01.jpg"
            className="rounded-xl mt-8"
            width={800}
            height={1000}
            alt="Descriptive Alt Text"
          />
          <Image
            src="/images/bts/sm/cs24-bts1.jpg"
            className="rounded-xl mt-8"
            width={800}
            height={1000}
            alt="Descriptive Alt Text"
          />
          <Image
            src="/images/bts/sm/cs1835-bts2-1.jpg"
            className="rounded-xl mt-8"
            width={800}
            height={1000}
            alt="Descriptive Alt Text"
          />
          <Image
            src="/images/bts/sm/cs1835-bts01.jpg"
            className="rounded-xl mt-8"
            width={800}
            height={1000}
            alt="Descriptive Alt Text"
          />
          <Image
            src="/images/bts/sm/cs24-bts1.jpg"
            className="rounded-xl mt-8"
            width={800}
            height={1000}
            alt="Descriptive Alt Text"
          />
          <Image
            src="/images/bts/sm/cs1835-bts2-1.jpg"
            className="rounded-xl mt-8"
            width={800}
            height={1000}
            alt="Descriptive Alt Text"
          />
          <Image
            src="/images/bts/sm/cs1835-bts01.jpg"
            className="rounded-xl mt-8"
            width={800}
            height={1000}
            alt="Descriptive Alt Text"
          />
        </div>
      </div>

      <FooterDark />
    </>
  );
};

export default Instructions;
