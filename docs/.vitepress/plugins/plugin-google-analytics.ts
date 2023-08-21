declare const dataLayer: any[];
declare const gtag: (...args: any[]) => void;
declare global {
  interface Window {
    dataLayer?: typeof dataLayer;
    gtag?: typeof gtag;
  }
}

const idKey = "G-K4H04LETJ2";

function registerGoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return;
  if (window.dataLayer && window.gtag) return;

  const gtagScript = document.createElement("script");
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${idKey}`;
  gtagScript.async = true;
  document.head.appendChild(gtagScript);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    dataLayer.push(arguments);
  };
  gtag("js", new Date());
  gtag("config", idKey);
}
export default registerGoogleAnalytics;
