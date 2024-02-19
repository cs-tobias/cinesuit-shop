import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  ConsentProvider,
  useConsent,
} from "@/components/contexts/ConsentContext";
import ErrorBoundary from "@/components/contexts/ErrorBoundary";
import { CartProvider } from "@/components/contexts/CartContext";
import { ScrollProvider } from "@/components/contexts/ScrollContext";
import CookieBanner from "@/components/ui/CookieBanner";
import GoogleAnalyticsInitializer from "@/components/contexts/GoogleAnalyticsInitializer";
import { pageview } from "@/utils/gtag"; // Import GA functions

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

// Custom hook for handling GA pageview tracking
const useGoogleAnalytics = () => {
  const { consentGiven } = useConsent();
  const router = useRouter();

  useEffect(() => {
    // Only add page view tracking if consent has been given
    if (consentGiven) {
      const handleRouteChange = (url: string) => {
        pageview(url);
      };

      // Track the initial page view
      pageview(window.location.pathname);

      // Add event listeners for route changes
      router.events.on("routeChangeComplete", handleRouteChange);

      // Clean up event listeners on component unmount
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [consentGiven, router.events]);
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <ConsentProvider>
        <ScrollProvider>
          <div className="flex flex-col min-h-screen">
            <main className={`flex-grow ${inter.className}`}>
              <CartProvider>
                <GoogleAnalyticsInitializer />
                <CookieBanner />
                <Component {...pageProps} />
                <SpeedInsights />
              </CartProvider>
            </main>
          </div>
        </ScrollProvider>
      </ConsentProvider>
    </ErrorBoundary>
  );
};

export default MyApp;
