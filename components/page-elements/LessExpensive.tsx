import dynamic from "next/dynamic";
import Image from "next/image";

const TextWrapper = dynamic(() => import("../animations/TextWrapper"), {
  ssr: false,
});
const RotWrapper = dynamic(() => import("../animations/RotWrapper"), {
  ssr: false,
});

const LessExpensive = () => {
  return (
    <div className="bg-black w-full -mt-4 lg:-mt-10 xl:-mt-32">
      <div className="max-w-[295px] md:max-w-[620px] lg:max-w-[700px] text-center  mx-auto py-4 text-white">
        <TextWrapper>
          <h1 className="text-6xl md:text-7xl tracking-tight leading-11 font-semibold pt-4 mb-11">
            5x less
            <br />
            <span className="text-transparent bg-gradient-to-b from-white via-white to-neutral-300 bg-clip-text">
              Expensive.
            </span>
          </h1>
        </TextWrapper>
        <TextWrapper>
          <p className="mb-4 text-xl md:text-2xl font-medium leading-11 text-neutral-400">
            Cinema lenses with good optics cost thousands of dollars. With
            Cinesuit, you can transform your existing lenses into professional
            tools for just $129,{" "}
            <span className="title-gradient-steel">
              making high quality cinematography accessible to everyone.
            </span>
          </p>
        </TextWrapper>
      </div>
      <RotWrapper>
        <div className="max-w-[285px] md:max-w-[585px] lg:max-w-[768px] xl:max-w-[860px] py-4 pt-10 mx-auto">
          <Image
            src="/images/cs-013_less-expensive-hero_5.jpg"
            className="w-full"
            width={860}
            height={1160}
            alt="Descriptive Alt Text"
          />
        </div>
      </RotWrapper>
    </div>
  );
};

export default LessExpensive;
