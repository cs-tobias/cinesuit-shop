import React, { useEffect, useState } from "react";
import Head from "next/head";
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
import { Toaster } from "@/components/ui/sonner";
import { DefaultSeo } from "next-seo";
import SEO from "../pages/next-seo.config"; // Adjust the path as necessary

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cinesuit",
  description:
    "Custom lens gears for Sigma lenses, transforming your lenses into cinema lenses.",
  verification: {
    google:
      "google-site-verification=uHowOxlHDGt_Xy9ojuB1p3Y0M-bSiu2WahUTGMwXIX0",
  },
};

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
                <DefaultSeo {...SEO} />
                <GoogleAnalyticsInitializer />
                <CookieBanner />
                <Component {...pageProps} />
                <Toaster />
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
