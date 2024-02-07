// utils/gtag.ts
export const GA_TRACKING_ID = 'G-4YKDHLWCMD'; // Replace with your GA tracking ID

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        dataLayer: any[];
    }
}

export const pageview = (url: string) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};
