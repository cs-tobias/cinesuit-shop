import dynamic from "next/dynamic";
import Image from "next/image";

const TextWrapper = dynamic(() => import("../animations/TextWrapper"), {
  ssr: false,
});
const RotWrapper = dynamic(() => import("../animations/RotWrapper"), {
  ssr: false,
});

const CineVsSuit = () => {
  return (
    <div className="bg-black w-full -mt-4 lg:-mt-10 xl:-mt-32">
      <div className="max-w-[295px] md:max-w-[600px] text-center  mx-auto py-4 text-white">
        <TextWrapper>
          <h1 className="text-6xl md:text-7xl tracking-tight leading-11 font-semibold pt-4 mb-11">
            5x less
            <br />
            Expensive.
          </h1>
        </TextWrapper>
        <TextWrapper>
          <p className="mb-4 text-xl md:text-2xl font-medium leading-11 text-neutral-500">
            Cinema lenses are often priced at{" "}
            <span className="text-neutral-400">$3000-$30000.</span> With your
            existing lenses — buy Cinesuit and get your own compact cinema
            lenses, for only <span className="text-white">$99.</span>
          </p>
        </TextWrapper>
      </div>
      <RotWrapper>
        <div className="max-w-[285px] md:max-w-[585px] lg:max-w-[768px] xl:max-w-[860px] py-4 pt-10 mx-auto">
          <Image
            src="/images/cs-013-showcase-lg.png"
            className="w-full"
            width={660}
            height={960}
            alt="Descriptive Alt Text"
          />
        </div>
      </RotWrapper>
    </div>
  );
};

export default CineVsSuit;
