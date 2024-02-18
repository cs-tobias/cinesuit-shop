import CookieBanner from "@/components/ui/CookieBanner";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CartProvider } from "../components/contexts/CartContext";
import {
  ScrollProvider,
  useScroll,
} from "../components/contexts/ScrollContext";
import { GA_TRACKING_ID, pageview } from "../utils/gtag"; // Import GA functions
import { ConsentProvider } from "@/components/contexts/ConsentContext";
import { useConsent } from "@/components/contexts/ConsentContext";

interface ScrollManagerProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

const ScrollManager: React.FC<ScrollManagerProps> = ({ children }) => {
  const router = useRouter();
  const { setScrollPosition, scrollPositions } = useScroll();
  const [isBackNavigation, setIsBackNavigation] = useState(false);

  useEffect(() => {
    // Your existing code for scroll position management
    // ...

    // Extend to include GA tracking after consent is verified
    const handleConsentGiven = () => {
      // Assuming `localStorage` is used to store consent
      const hasConsent = localStorage.getItem("ga_consent") === "granted";
      if (hasConsent) {
        // Initialize GA tracking here. This could be adding the GA script dynamically
        // or simply ensuring you're ready to track page views.

        // Track the initial page
        pageview(window.location.pathname);

        // Track pages on route change
        const handleRouteChange = (url: string) => {
          pageview(url);
        };

        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
          router.events.off("routeChangeComplete", handleRouteChange);
        };
      }
    };

    handleConsentGiven();
  }, [router.events, setScrollPosition, scrollPositions, isBackNavigation]);

  return <>{children}</>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConsentProvider>
      <ScrollProvider>
        <div className="flex flex-col min-h-screen">
          <main className={`flex-grow ${inter.className}`}>
            <ScrollManager>
              <CartProvider>
                {/* Conditionally render CookieBanner inside its definition based on consent */}
                <CookieBanner />
                <Component {...pageProps} />
              </CartProvider>
            </ScrollManager>
          </main>
        </div>
      </ScrollProvider>
    </ConsentProvider>
  );
}
