import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Inter } from "next/font/google";
import { CartProvider } from "./components/contexts/CartContext";
import { ScrollProvider, useScroll } from "./components/contexts/ScrollContext";
import Footer from "./components/page-elements/Footer";
import { Toaster } from "./components/sonner";
import Navbar from "./components/ui/Navbar";
import CookieConsentBanner from "./components/page-elements/CookieConsentBanner";
import Script from "next/script";
import { GA_TRACKING_ID } from "@/utils/gtag";
import { getCookieConsentValue } from "react-cookie-consent";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const ScrollManager: React.FC = ({ children }) => {
  const router = useRouter();
  const { setScrollPosition, scrollPositions } = useScroll();
  const [isBackNavigation, setIsBackNavigation] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setIsBackNavigation(true);
    };

    window.addEventListener("popstate", handlePopState);

    const handleRouteChangeStart = () => {
      if (!isBackNavigation) {
        setScrollPosition(router.asPath, window.scrollY);
      }
    };

    const handleRouteChangeComplete = (url: string) => {
      if (isBackNavigation) {
        const savedPosition = scrollPositions[url] || 0;
        window.scrollTo(0, savedPosition);
      }
      setIsBackNavigation(false); // Reset the flag
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events, setScrollPosition, scrollPositions, isBackNavigation]);

  return <>{children}</>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <ScrollProvider>
        {/* Set the title of the webpage */}
        <Head>
          <title>Cinesuit</title>
          {/* You can also include other head elements like meta tags here */}
        </Head>
        <div className="flex flex-col min-h-screen">
          {/* Main content with Inter font */}
          <main className={`flex-grow ${inter.className}`}>
            <ScrollManager>
              <CartProvider>
                <Component {...pageProps} />
              </CartProvider>
            </ScrollManager>
          </main>
          {/* Footer with Inter font */}
        </div>
      </ScrollProvider>
    </NextUIProvider>
  );
}
