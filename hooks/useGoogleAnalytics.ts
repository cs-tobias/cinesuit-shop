// hooks/useGoogleAnalytics.ts

import { useEffect } from 'react';
import { useConsent } from '@/components/contexts/ConsentContext'; // Adjust the import path as necessary
import { pageview } from '../utils/gtag'; // Adjust the import path as necessary

export const useGoogleAnalytics = () => {
  const { consentGiven } = useConsent();

  useEffect(() => {
    if (consentGiven) {
      // If consent is given, initialize Google Analytics tracking.
      // For example, track the initial page view:
      pageview(window.location.pathname);

      // Handle route changes to track page views, etc.
      // Your Google Analytics initialization logic goes here.
    }
  }, [consentGiven]); // Rerun this effect when consentGiven changes.
};
