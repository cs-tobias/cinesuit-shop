// ConsentContext.js
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
  const [showBanner, setShowBanner] = useState<boolean>(true); // Assume true initially

  useEffect(() => {
    const consent = localStorage.getItem("ga_consent");
    setConsentGiven(consent === "granted");
    setShowBanner(consent !== "granted" && consent !== "denied"); // Only show if not explicitly granted or denied
  }, []);

  return (
    <ConsentContext.Provider
      value={{ consentGiven, setConsentGiven, showBanner, setShowBanner }}
    >
      {children}
    </ConsentContext.Provider>
  );
};
