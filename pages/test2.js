/* eslint-disable @next/next/no-sync-scripts */
import {
  useState, useEffect, useMemo, memo, useContext
} from 'react';
import io from 'socket.io-client';
import Head from 'next/head';
import Script from 'next/script';

export default function Index() {
  const [status, setStatus] = useState({});

  function show(event) {
    setStatus(status);
    if (event.state) fetch(`/api/event/${event.state}`);
  }

  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="https://homologation-payment.cdn.payline.com/cdn/styles/widget-min.css" rel="stylesheet" />
      </Head>
      <Script
        id="widget-min"
        src="https://homologation-payment.cdn.payline.com/cdn/scripts/widget-min.js"
        onLoad={(data) => {
          console.log('---->', data);
        }}
      />
      <Script id="widget">
        {show.toString()}
      </Script>
      <main style={{
        padding: '1rem 0',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <div
          id="PaylineWidget"
          data-token="1REPcBZi01U9bCRIam2M1640624404773"
          data-template="tab"
          data-embeddedredirectionallowed="true"
          data-event-willdisplaymessage="show"
          data-event-beforepayment="show"
          data-event-willinit="show"
          data-event-finalstatehasbeenreached="show"
          data-event-didshowstate="show"
          data-event-willremovemessage="show"
        />
      </main>
    </>
  );
}
