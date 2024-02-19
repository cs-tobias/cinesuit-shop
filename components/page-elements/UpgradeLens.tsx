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
    <div className="bg-neutral-100 w-full pt-8">
      <div className="max-w-[295px] md:max-w-[600px] text-center  mx-auto py-4 md:py-10 text-black">
        <TextWrapper>
          <h1 className="text-6xl md:text-7xl tracking-tight leading-11 font-semibold pt-7 mb-8">
            Upgrade.
            <br />
            Your lens.
          </h1>
        </TextWrapper>
        <TextWrapper>
          <p className="mb-10 text-xl md:text-2xl font-medium leading-11 text-neutral-500">
            <span className="text-black">
              Cinesuit offers a professional alternative to the usual makeshift
              solutions.
            </span>{" "}
            It starts with a simple yet impactful step — removing the existing
            rubber rings from your lens, creating room for a true upgrade.
          </p>
        </TextWrapper>
      </div>
      <div className="max-w-[285px] md:max-w-[585px] lg:max-w-[820px] mx-auto">
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

          <div>
            <Image
              src="/images/cs-013-assemble-lens-main.jpg"
              className="w-full"
              width={660}
              height={960}
              alt="Descriptive Alt Text"
            />
          </div>
          <PosRtoL>
            <div>
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
