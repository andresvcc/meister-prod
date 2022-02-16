import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Script from 'next/script';
import PageChange from '@/components/PageChange/PageChange';

import '@/assets/scss/nextjs-material-dashboard-pro.scss?v=1.0.0';
import '@/assets/css/nextjs-material-dashboard-pro.css';
import '@/assets/css/global.css';
import '@/assets/css/editor.css';

// import LogRocket from 'logrocket';
// import setupLogRocketReact from 'logrocket-react';
import { useStore } from '../components/redux/store';

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  const [isOnline, setIsOnline] = useState(true);
  const router = useRouter();

  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   router.events.on('routeChangeStart', (url) => {
  //     setIsLoading(true);
  //   });

  //   router.events.on('routeChangeComplete', (url) => {
  //     setIsLoading(false);
  //   });

  //   router.events.on('routeChangeError', (url) => {
  //
  //     setIsLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    // LogRocket.identify('it3rac/devmeiste', {
    //   name: 'James Morrison',
    //   email: 'jamesmorrison@example.com',
    //
    //   // Add your own custom user variables here, ie:
    //   subscriptionType: 'pro'
    // });
    // setupLogRocketReact(LogRocket.init('it3rac/devmeister'));

    if (typeof window !== 'undefined' && 'ononline' in window && 'onoffline' in window) {
      setIsOnline(window.navigator.onLine);
      if (!window.ononline) {
        window.addEventListener('online', () => {
          setIsOnline(true);
        });
      }
      if (!window.onoffline) {
        window.addEventListener('offline', () => {
          setIsOnline(false);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined && isOnline) {
      // skip index route, because it's already cached under `start-url` caching object
      if (router.route !== '/') {
        const wb = window.workbox;
        wb.active.then((worker) => {
          wb.messageSW({ action: 'CACHE_NEW_ROUTE' });
        });
      }
    }
  }, [isOnline, router.route]);

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1.0, initial-scale=1.0, maximum-scale=1.0, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
        <title>Meister Engineering</title>
      </Head>
      <Provider store={store}>
        <Script id="my-script" async>
          {`
            window.fbAsyncInit = function() {
              FB.init({
                appId      : "404888517690599",
                cookie     : true,
                xfbml      : true,
                version    : "v12.0"
              });
                
              FB.AppEvents.logPageView();   
                
            };
          
            (function(d, s, id){
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) {return;}
              js = d.createElement(s); js.id = id;
              js.src = "https://connect.facebook.net/en_US/sdk.js";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `}
        </Script>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default MyApp;
