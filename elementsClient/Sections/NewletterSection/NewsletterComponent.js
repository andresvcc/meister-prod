import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  EditorState, convertToRaw, convertFromRaw
} from 'draft-js';
// slides pour la mettre horizontal
// components
import { Div, hookDeviceInfo, redux } from 'component';
import RecoveryForm from 'elementsClient/Forms/changePassForm';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
import { useRouter } from 'next/router';

import Dialog from '@material-ui/core/Dialog';
import Cookies from 'js-cookie';
import CookieMessage from '@/elementsClient/Sections/NewletterSection/NewsletterMessage';

// import test cookies
import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components/Grid/GridContainer';

export default function Testlogin() {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const alertPolici = Cookies.get('alertPolici');
    if (alertPolici === undefined) {
      setOpen(true);
    }

    // Cookies.remove('alertPolici');
    // Cookies.set('alertPolici', 'ok', { expires: 30 });
  }, []);

  const aceptAll = () => {
    Cookies.set('alertPolici', 'ok', { expires: 30 });
    setOpen(false);
  };

  return (
    <Div>
      <Div>
        {
        open ? (
          <Div
            style={{
              position: 'fixed', background: 'white', zIndex: 9999, top: 0
            }}
            height="100%"
            width="100%"
            dev
          >
            <CookieMessage aceptAll={aceptAll} />
          </Div>
        ) : null
      }
      </Div>
    </Div>
  );
}
