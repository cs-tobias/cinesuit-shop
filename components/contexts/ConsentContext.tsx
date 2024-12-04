import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ConsentContextType {
  consentGiven: boolean;
  setConsentGiven: (given: boolean) => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
};

export const ConsentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [consentGiven, setConsentGiven] = useState<boolean>(false);
  // Start with assuming we need to show the banner until we confirm otherwise
  const [showBanner, setShowBanner] = useState<boolean>(true);

  useEffect(() => {
    console.log("Checking localStorage for ga_consent");
    const consentStatus = localStorage.getItem("ga_consent");
    console.log(`Consent Status: ${consentStatus}`);
    const consentIsGranted = consentStatus === "granted";
    setConsentGiven(consentIsGranted);
    // If consent has been granted or denied, we should not show the banner
    setShowBanner(!consentIsGranted && consentStatus !== "denied");
  }, []);

  return (
    <ConsentContext.Provider
      value={{ consentGiven, setConsentGiven, showBanner, setShowBanner }}
    >
      {children}
    </ConsentContext.Provider>
  );
};
