import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import Icons from "../ui/Icons";
import RotWrapper from "../animations/RotWrapper";

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
          <p className="mb-4 text-xl md:text-2xl font-medium leading-11 text-neutral-500">
            Cinesuit is bridging the gap between photo and cinema lenses.
            Embrace the art of precision and design, as Cinesuit seamlessly
            melds with your Sigma ART lenses.
          </p>
        </TextWrapper>

        <div className="flex justify-center pt-6 pb-12 gap-4 md:hidden">
          <Link
            target="_blank"
            href={"https://www.youtube.com/watch?v=tIbT4HpLnNA"}
          >
            <Button className="flex bg-neutral-300 hover:bg-white transition-colors duration-300 text-black font-normal">
              Watch Launch Film
              <Icons
                icon="player-play-filled"
                width="18"
                height="18"
                className="my-auto ml-1"
              ></Icons>
            </Button>
          </Link>
        </div>
      </div>
      <div className="md:hidden overflow-hidden">
        <Image
          src="/images/cs-013-hero-lg.png"
          className="w-[325px] lg:w-[1000px] xl:w-[1400px] lg:pr-6 mx-auto"
          width={400}
          height={800}
          alt="Image for Mobile of Sigma 18-35 with Cinesuit"
        />
      </div>
      <RotWrapper>
        <div className="hidden md:block container max-w-7xl text-center mx-auto mt-4 mb-16">
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
                src="https://www.youtube.com/embed/ZWTzXrTRhE8"
                frameBorder="0"
                allowFullScreen
                title="Embedded youtube"
                className="rounded-3xl"
              />
            </div>
          </div>
        </div>
      </RotWrapper>

      <div className="max-w-[295px] md:max-w-[600px] text-center  mx-auto pb-4 md:py-4 text-white">
        {/* Wrap only the text elements */}
        <TextWrapper>
          <h1 className="text-5xl md:text-7xl tracking-tight leading-11 font-semibold mb-8">
            Quality over Quantity
          </h1>
        </TextWrapper>
        <TextWrapper>
          <p className="mb-4 text-xl md:text-2xl font-medium leading-11 text-neutral-500">
            Markings and other high-end specs often go unused in the indie
            filmmaking process.
            <span className="text-white">
              What&apos;s truly important? Solid gears with consitant placement.
            </span>{" "}
            Cinesuit provides a robust solution tailored for the needs of
            filmmakers for a fraction of the cost.
          </p>
        </TextWrapper>

        <div className="flex justify-center pt-6 pb-12 gap-4 md:hidden">
          <Link
            target="_blank"
            href={"https://www.youtube.com/watch?v=tIbT4HpLnNA"}
          >
            <Button className="flex bg-neutral-300 hover:bg-white transition-colors duration-300 text-black font-normal">
              Watch Launch Film
              <Icons
                icon="player-play-filled"
                width="18"
                height="18"
                className="my-auto ml-1"
              ></Icons>
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden md:block overflow-hidden px-20 no-select">
        <Image
          src="/images/1835-profile-hero-2.jpg"
          className="w-[660px] lg:w-[1000px] xl:w-[1800px] lg:pr-6 mx-auto no-select"
          width={1800}
          height={800}
          alt="Image of Sigma 18-35 with Cinesuit"
        />
      </div>
    </div>
  );
};

export default NextStep;
