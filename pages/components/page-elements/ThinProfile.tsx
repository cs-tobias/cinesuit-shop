import Image from "next/image";
import dynamic from "next/dynamic";

const TextWrapper = dynamic(() => import("../animations/TextWrapper"), {
  ssr: false,
});

const ThinProfile = () => {
  return (
    <div className="bg-neutral-100 w-full overflow-hidden pt-8">
      <div className="max-w-[295px] md:max-w-[600px] text-center  mx-auto py-8 md:py-16 text-black overflow-hidden">
        <TextWrapper>
          <h1 className="text-5xl md:text-7xl tracking-tight leading-11 font-semibold pt-6 mb-8">
            Thoughtfully
            <br />
            Designed.
          </h1>
        </TextWrapper>
        <TextWrapper>
          <p className="md:-mb-16 text-xl md:text-2xl font-medium leading-11 text-neutral-500">
            Borrowing design DNA from Sigma CINE lenses, Cinesuit is{" "}
            <span className="text-black">
              designed to complement and enhance the natural beauty of your
              lens.
            </span>{" "}
            Unlike most lens gears that look mismatched and clumsy, Cinesuit
            dont just sit on top of your lens. <br />
            It becomes a part of it.
          </p>
        </TextWrapper>
      </div>
      <div className="mx-auto w-full overflow-hidden relative gradient-overlay">
        <Image
          src="/images/hero/lg/cs1835-long-lg-3.png"
          width={1675}
          height={774}
          className="w-full mx-auto"
          alt="Sigma 18-35 image"
        />
      </div>
    </div>
  );
};

export default ThinProfile;
