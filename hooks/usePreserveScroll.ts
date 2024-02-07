import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const usePreserveScroll = (): void => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      sessionStorage.setItem(`scrollPosition:${router.asPath}`, window.scrollY.toString());
    };

    const handleRouteChangeComplete = (url: string) => {
      const scrollPositionKey = `scrollPosition:${url}`;
      const savedPosition = sessionStorage.getItem(scrollPositionKey);

      if (savedPosition) {
        const restoreScroll = () => {
          const yPos = parseInt(savedPosition, 10);
          if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            window.scrollTo(0, yPos);
            sessionStorage.removeItem(scrollPositionKey);
          } else {
            setTimeout(restoreScroll, 100);
          }
        };

        restoreScroll();
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.asPath, router.events]);
};
