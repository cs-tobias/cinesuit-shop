import React from "react";
import ConvertkitCustomMessage from "@/components/page-elements/ConvertkitCustomMessage";

const RequestLenses: React.FC = () => {
  return (
    <div className="bg-neutral-50 text-black flex flex-col pb-14">
      <div className="container max-w-6xl mx-auto md:px-24">
        <div className="justify-center items-center w-full text-black flex flex-col p-6 rounded-xl">
          <h1 className="text-5xl md:text-7xl tracking-tighter leading-11 font-semibold pt-6">
            Request Lenses
          </h1>
          <h3 className="md:text-center mt-6 md:max-w-[650px] tracking-normal mx-auto text-xl md:text-2xl font-medium leading-11 text-neutral-500">
            Is your preferred lens not featured in our store?{" "}
            <span className="text-black">
              We&apos;re always looking to expand our range.
            </span>{" "}
            Please let us know which lenses you&apos;d like to see Cinesuit gear
            rings for, and we might just make it happen!
          </h3>
          <ConvertkitCustomMessage />
        </div>
      </div>
    </div>
  );
};

export default RequestLenses;
