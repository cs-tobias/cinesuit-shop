import dynamic from "next/dynamic";
import Button from "../ui/Button";
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
      <div className="max-w-[295px] md:max-w-[600px] text-center  mx-auto py-4 text-white">
        <TextWrapper>
          <h1 className="text-6xl md:text-7xl tracking-tight leading-11 font-semibold pt-4 mb-11">
            Installed.
            <br />
            Uninstalled.
            <br />
            By you.
          </h1>
        </TextWrapper>
        <RotWrapper>
          <TextWrapper>
            <p className="pt-3 mb-4 text-xl md:text-2xl font-medium leading-11 text-neutral-500">
              No need to send in your lens.{" "}
              <span className="text-white">
                Follow the installation instructions to do it yourself.
              </span>{" "}
              Its just as easy to install, as it is to go back to normal.
            </p>
            <div className="flex justify-center pt-6 pb-12 gap-4">
              <Link href={"/instructions"}>
                <Button className="flex bg-neutral-300 hover:bg-white transition-colors duration-300 text-black font-normal">
                  How to install
                  <img
                    src="images/icons/play-circle.svg"
                    className="w-4 h-4 my-auto ml-1 mb-1"
                  />
                </Button>
              </Link>
            </div>
          </TextWrapper>
        </RotWrapper>
      </div>

      <RotWrapper>
        <div className="flex justify-center w-full mx-auto pb-12 overflow-hidden">
          <Image
            src="/images/top-3.png"
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
