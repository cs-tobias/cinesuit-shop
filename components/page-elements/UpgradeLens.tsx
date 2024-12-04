import dynamic from "next/dynamic";
import Image from "next/image";

const TextWrapper = dynamic(() => import("../animations/TextWrapper"), {
  ssr: false,
});
const PosLtoR = dynamic(() => import("../animations/PosLtoR"), {
  ssr: false,
});
const PosRtoL = dynamic(() => import("../animations/PosRtoL"), {
  ssr: false,
});

const UpgradeLens = () => {
  return (
    <div className="bg-neutral-100 w-full psafat-6">
      <div className="max-w-[295px] md:max-w-[620px] text-center mx-auto py-4 md:py-10 text-black">
        <TextWrapper>
          <h1 className="text-6xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
            Upgrade.
            <br />
            <span className="title-gradient-steel-inverted">Your lens.</span>
          </h1>
        </TextWrapper>
        <TextWrapper>
          <p className="mb-10 text-xl md:text-2xl font-medium leading-11 text-neutral-500">
            Cinesuit offers a new solution.{" "}
            <span className="title-gradient-steel-inverted">
              Replace the rubber rings on your lens with Cinesuit&apos;s
              custom-designed metal gear rings
            </span>{" "}
            with rubber lining for a rock solid fit. — A new suit for your lens,
            making it cinema-ready.
          </p>
        </TextWrapper>
      </div>
      <div className="select-none max-w-[285px] md:max-w-[585px] lg:max-w-[820px] mx-auto">
        <div className="flex items-center justify-center">
          <PosLtoR>
            <div>
              <Image
                src="/images/cs-013-assemble-left-main.jpg"
                className="w-full"
                width={660}
                height={960}
                alt="Descriptive Alt Text"
              />
            </div>
          </PosLtoR>

          <div className="select-none">
            <Image
              src="/images/cs-013-assemble-lens-main.jpg"
              className="w-full"
              width={660}
              height={960}
              alt="Descriptive Alt Text"
            />
          </div>
          <PosRtoL>
            <div className="select-none">
              <Image
                src="/images/cs-013-assemble-right-main.jpg"
                className="w-full"
                width={660}
                height={960}
                alt="Descriptive Alt Text"
              />
            </div>
          </PosRtoL>
        </div>
      </div>
    </div>
  );
};

export default UpgradeLens;
