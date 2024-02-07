import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CartProvider } from "./components/contexts/CartContext";
import { ScrollProvider, useScroll } from "./components/contexts/ScrollContext";

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
  }, [
    router.asPath,
    router.events,
    setScrollPosition,
    scrollPositions,
    isBackNavigation,
  ]);

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
