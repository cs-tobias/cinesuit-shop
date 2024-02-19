import dynamic from "next/dynamic";
import React, { ForwardedRef } from "react";

const TextWrapper = dynamic(() => import("../animations/TextWrapper"), {
  ssr: false,
});

interface ShopTitle2Props {
  // Props definitions, if any
}

const ShopTitle2 = React.forwardRef<HTMLDivElement, ShopTitle2Props>(
  (props, ref) => {
    return (
      <div ref={ref} className="bg-neutral-50 w-full pt-8 md:pb-4">
        <div className="container mx-auto text-black">
          <h1 className="md:text-center text-5xl md:text-7xl tracking-tighter leading-11 font-semibold pt-6">
            Choose your Cinesuit
          </h1>
          <h3 className="md:text-center mt-6 md:max-w-[650px] tracking-normal mx-auto text-xl md:text-2xl font-medium leading-11 text-neutral-500">
            Become a part of the cinema lens club, today.
          </h3>
        </div>
      </div>
    );
  }
);

// Explicitly set the displayName for the component
ShopTitle2.displayName = "ShopTitle2";

export default ShopTitle2;
