// CookieBanner.js
import React, { useState } from "react";
import Button from "../Button"; // Adjust path as necessary
import { useConsent } from "../contexts/ConsentContext"; // Adjust path as necessary
import { loadGA } from "@/utils/gtag";

const CookieBanner = () => {
  // Temporary local state for debugging
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = (): void => {
    setIsVisible(false);
    // Other logic remains the same
  };

  if (!isVisible) return null;

  return (
    <div className="flex flex-col justify-between bottom-4 left-4 fixed w-[380px] border-[1px] backdrop-blur-md bg-black bg-opacity-65 border-neutral-400 border-opacity-30 z-50 rounded-3xl p-5">
      <h1 className="text-sm text-neutral-200 mb-4">
        This site uses tracking technologies. You may opt in or opt out of the
        use of these technologies.
      </h1>
      <div className="flex justify-between items-center">
        {/* The Consent Settings button appears to be non-functional in this snippet. */}
        <Button
          onClick={() => {}}
          className="text-white text-sm bg-black bg-opacity-0 border-[1px] border-neutral-400 border-opacity-30 hover:bg-opacity-30 transition-colors duration-300"
        >
          Consent Settings
        </Button>
        <div className="flex gap-2">
          {/* Attach the handleDeny function to the onClick event of the Deny button */}
          <Button className="text-black text-sm bg-neutral-200 hover:bg-neutral-50 transition-colors duration-300">
            Deny
          </Button>
          {/* Attach the handleAccept function to the onClick event of the Accept All button */}
          <Button
            onClick={handleAccept}
            className="text-black text-sm bg-neutral-200 hover:bg-neutral-50 transition-colors duration-300"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CookieBanner;
