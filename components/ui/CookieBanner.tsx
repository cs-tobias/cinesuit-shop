import React, { useEffect, useState } from "react";
import Button from "../Button"; // Adjust path as necessary
import { useConsent } from "../contexts/ConsentContext"; // Adjust path as necessary
import { loadGA } from "@/utils/gtag"; // Ensure this path matches your project structure

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false); // Start with false to avoid flash
  const { setConsentGiven, setShowBanner } = useConsent();

  useEffect(() => {
    // Introduce a delay before showing the banner
    const delay = 100; // Delay in milliseconds
    const timer = setTimeout(() => {
      const consent = localStorage.getItem("ga_consent");
      const shouldShowBanner = !(consent === "granted" || consent === "denied");
      setIsVisible(shouldShowBanner);
      setShowBanner(shouldShowBanner);
      if (consent === "granted") {
        setConsentGiven(true);
        loadGA(); // Load Google Analytics if consent was already given
      }
    }, delay);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [setConsentGiven, setShowBanner]);

  const handleAccept = (): void => {
    localStorage.setItem("ga_consent", "granted");
    setIsVisible(false);
    setConsentGiven(true);
    setShowBanner(false);
    loadGA(); // Initialize Google Analytics now that consent has been given
  };

  const handleDeny = (): void => {
    localStorage.setItem("ga_consent", "denied");
    setIsVisible(false);
    setConsentGiven(false);
    setShowBanner(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`flex flex-col justify-between bottom-4 md:left-4 fixed md:w-[380px] border-[1px] backdrop-blur-md bg-black bg-opacity-65 border-neutral-400 border-opacity-30 z-50 rounded-3xl p-5 ${
        isVisible ? "animate-fadeIn" : ""
      }`}
    >
      <h1 className="text-sm text-neutral-200 mb-4">
        This site uses tracking technologies. You may opt in or opt out of the
        use of these technologies.
      </h1>
      <div className="flex justify-between items-center">
        {/* Consent Settings Button - Consider implementing its functionality */}
        <Button
          onClick={() => {}}
          className="text-white text-sm bg-black bg-opacity-0 border-[1px] border-neutral-400 border-opacity-30 hover:bg-opacity-30 transition-colors duration-300"
        >
          Consent Settings
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={handleDeny}
            className="text-black text-sm bg-neutral-300 hover:bg-neutral-50 transition-colors duration-300"
          >
            Deny
          </Button>
          <Button
            onClick={handleAccept}
            className="text-black text-sm bg-neutral-300 hover:bg-neutral-50 transition-colors duration-300"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
