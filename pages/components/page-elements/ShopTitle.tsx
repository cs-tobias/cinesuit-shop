import dynamic from "next/dynamic";

const TextWrapper = dynamic(
  () => import("../../../components/animations/TextWrapper"),
  {
    ssr: false,
  }
);

const ShopTitle = () => {
  return (
    <div className="bg-neutral-50 w-full py-6 pt-16">
      <div className="container text-center mx-auto text-black">
        <h1 className="text-5xl md:text-7xl tracking-tighter leading-11 font-semibold pt-6">
          Choose your Cinesuit
        </h1>
        <h3 className="max-w-[295px] md:max-w-[650px] tracking-normal text-center mx-auto text-xl md:text-2xl font-medium leading-11 text-neutral-500">
          <br /> Become a part of the cinema lens club, today.
        </h3>
      </div>
    </div>
  );
};

export default ShopTitle;
