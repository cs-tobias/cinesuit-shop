import dynamic from "next/dynamic";
import Button from "../Button";
import Image from "next/image";
import GalleryPage from "./ImageGallery";
import Link from "next/link";

const TextWrapper = dynamic(() => import("../animations/TextWrapper"), {
  ssr: false,
});
const RotWrapper = dynamic(() => import("../animations/RotWrapper"), {
  ssr: false,
});

const InstallUninstall = () => {
  return (
    <div className="bg-black w-full pt-2 pb-32">
      <div className="max-w-[295px] md:max-w-[600px] lg:max-w-[720px] text-center  mx-auto py-4 text-white">
        <TextWrapper>
          <h1 className="text-6xl md:text-7xl tracking-tight leading-11 font-semibold pt-4 mb-11">
            <span className="title-gradient-steel">Installed.</span>
            <br />
            <span className="title-gradient-steel">Uninstalled.</span>
            <br />
            <span className="title-gradient-steel">By you.</span>
          </h1>
        </TextWrapper>
        <RotWrapper>
          <TextWrapper>
            <p className="pt-3 mb-4 text-xl md:text-2xl font-medium leading-11 text-neutral-400">
              No need to send in your lenses.{" "}
              <span className="title-gradient-steel">
                Follow simple instructions to install Cinesuit yourself, and
                easily revert to the original setup if needed.
              </span>{" "}
              Enjoy flexibility and control over your gear.
            </p>
            <div className="flex justify-center pt-6 pb-12 gap-4">
              <Link href={"/instructions"}>
                <Button className="flex text-neutral-200 bg-transparent border border-neutral-200 hover:bg-neutral-200 hover:text-black transition-colors duration-300">
                  How to install
                </Button>
              </Link>
            </div>
          </TextWrapper>
        </RotWrapper>
      </div>

      <RotWrapper>
        <div className="flex justify-center w-full mx-auto pb-12 overflow-hidden">
          <Image
            src="/images/cs-top-install-01.jpg"
            className="max-w-none w-[985px] md:w-[1624px] lg:w-[2020px] 2xl:w-full"
            width={2400}
            height={760}
            alt="Descriptive Alt Text"
          />
        </div>
      </RotWrapper>
      <div>
        <GalleryPage />
      </div>
    </div>
  );
};

export default InstallUninstall;
