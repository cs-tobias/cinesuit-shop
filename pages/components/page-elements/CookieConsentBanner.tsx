import React from "react";
import CookieConsent from "react-cookie-consent";
import { GA_TRACKING_ID, pageview } from "@/utils/gtag";
import Link from "next/link";

const CookieConsentBanner = () => {
  // Handle accept and decline actions
  const handleAccept = () => {
    /* Your accept code */
  };

  const handleDecline = () => {
    /* Your decline code */
  };

  const bannerStyle = {
    position: "fixed",
    bottom: "20px", // Adjust as needed
    right: "20px", // Adjust as needed
    maxWidth: "300px", // Adjust the width as needed
    zIndex: 9999, // Ensure it's above other elements
  };

  const contentStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "#FFF",
    padding: "20px",
    borderRadius: "10px",
  };

  return (
    <div style={bannerStyle}>
      <CookieConsent
        buttonText="Accept"
        declineButtonText="Decline"
        onAccept={handleAccept}
        onDecline={handleDecline}
        enableDeclineButton
        expires={150}
      >
        <div style={contentStyle}>
          <p>
            We use necessary cookies for basic functionality and optional
            cookies for analytics. By using our site, you agree to our use of
            necessary cookies.
          </p>
        </div>
      </CookieConsent>
    </div>
  );
};

export default CookieConsentBanner;
