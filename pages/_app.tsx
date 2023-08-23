import { useEffect } from 'react';
import { AppProps } from 'next/app';
// import 'tailwindcss/tailwind.css';
import 'styles/globals.css';
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
