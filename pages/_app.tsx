//_app.tsx
import { CartProvider } from "@/components/contexts/CartContext";
import {
  ConsentProvider,
  useConsent,
} from "@/components/contexts/ConsentContext";
import ErrorBoundary from "@/components/contexts/ErrorBoundary";
import GoogleAnalyticsInitializer from "@/components/contexts/GoogleAnalyticsInitializer";
import { ScrollProvider } from "@/components/contexts/ScrollContext";
import CookieBanner from "@/components/ui/CookieBanner";
import { Toaster } from "@/components/ui/sonner";
import { pageview } from "@/utils/gtag"; // Import GA functions
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SEO from "../next-seo.config"; // Adjust the path as necessary

import "@/styles/globals.css";
import ComingSoon from "@/components/page-elements/ComingSoon";
import FullPageAlert from "@/components/page-elements/FullPageAlert";

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
                <DefaultSeo {...SEO} />
                <GoogleAnalyticsInitializer />
                <CookieBanner />
                <Component {...pageProps} />
                <FullPageAlert />
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
