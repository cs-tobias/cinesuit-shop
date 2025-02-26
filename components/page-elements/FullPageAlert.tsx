import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const FullPageAlert = () => {
  return (
    <div className=" py-2 bg-black w-full bg-opacity-85 backdrop-filter backdrop-blur text-white border-b border-neutral-900 fixed bottom-0">
      <div className="text-center text-white">
        <p className="text-xl py-2 font-medium leading-11 text-neutral-100">
          <span className="text-neutral-300 font-normal">Note:</span> We are
          working on a new version with Hard-stops!
        </p>
      </div>
    </div>
  );
};

export default FullPageAlert;
