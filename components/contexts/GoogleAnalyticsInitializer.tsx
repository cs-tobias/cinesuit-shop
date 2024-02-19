// components/GoogleAnalyticsInitializer.tsx

import React from "react";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics"; // Adjust the import path as necessary

const GoogleAnalyticsInitializer: React.FC = () => {
  useGoogleAnalytics(); // Invoke the custom hook to handle Google Analytics based on consent.
  return null; // This component does not render anything.
};

export default GoogleAnalyticsInitializer;
