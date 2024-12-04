// utils/gtag.ts

// Extending the Window interface to include dataLayer and gtag
declare global {
    interface Window {
      gtag: Gtag;
      dataLayer: any[];
    }
  }
  
  interface Gtag {
    (command: 'config', targetId: string, config?: object): void;
    (command: 'event', action: string, params?: object): void;
    // Adding a more general signature to accept other commands like 'js'
    (command: string, ...args: any[]): void;
  }
  
  export const GA_TRACKING_ID = 'G-4YKDHLWCMD'; // Use your actual GA Tracking ID
  
  // Dynamically load Google Analytics
  export const loadGA = (): void => {
    console.log('Loading GA');
    if (typeof window !== 'undefined' && typeof window.gtag === 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(script);
  
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(...args: any[]) {
        window.dataLayer.push(arguments);
      };
  
      // Correctly initializes the gtag 'js' command with the new signature
      window.gtag('js', new Date());
      window.gtag('config', GA_TRACKING_ID);
    }
  };
  
  // Function to track page views
  export const pageview = (url: string): void => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
    }
  };
  