import React, { useEffect, useState } from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
import { useRouter } from 'next/router';

// components
import { Div, redux, FlexDiv } from 'components';
import OrdersSection from 'elementsClient/Sections/ProfilSection/OrdersSections';
import ImageGenerator from 'elementsClient/ImageGenerator/ImageGenerator';
import RecoveryForm from 'elementsClient/Forms/changePassForm';
import Layout from '@/layouts/Default2';
// elements
import Spam from '@/components/Typography/Spam';
import UserInformation from '@/elementsClient/Sections/ProfilSection/userInformation';
import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components/Grid/GridContainer';

const imagine1 = '/static/images/cardImg_article_1.2.png';
const HoverBtn = (props) => {
  const { children } = props;
  const [hover, setHover] = useState(false);
  return (
    <span
      type="link2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: 'pointer', color: hover ? 'black' : null, textDecoration: hover ? 'underline' : null,
      }}
    >
      <Spam type="userProfile">
        {children}
      </Spam>
    </span>
  );
};

function Page(props) {
  const [buttonSwitch, setButtonSwitch] = useState(0);
  const { user, useSocketHook, recoverys } = props;
  // const [emit, socket] = useSocketHook;
  const [emit, socket] = useSocketHook;

  const [{ profilInfo }] = redux();
  // const router = useRouter();
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorsApiRecovery, setErrorApiRecovery] = useState([]);
  const [validateRecovery, setValidateRecovery] = useState([]);
  const router = useRouter();

  const recovery = async (data) => {
    if (data.email) {
      setLoading(true);
      await emit('recovery', data);
      setErrorApiRecovery([]);
    } else {
      const missingErrMsg = ['All the fields must be filled'];
      if (JSON.stringify(missingErrMsg) !== JSON.stringify(errorsApiRecovery)) setErrorApiRecovery(missingErrMsg);
    }
  };

  const recoveryRes = (data) => {
    if (data.err) {
      setErrorApiRecovery([data.err]);
    } else {
      setErrorApiRecovery([]);
      setLoading(false);
      const accountRecoveryPass = ['An email has been sent to your email address!'];
      setValidateRecovery(accountRecoveryPass);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('recoveryRes', recoveryRes);
    }
  }, [socket]);

  return (
    <Div width="100%" style={{ minHeight: '1200px' }} vertical="top">
      <Div height={['80px', '100px', '100px', '100px', '100px']} />

      <Div style={{ backgroundColor: '#00000005', borderBottom: '1px solid grey' }} height="100px" width="100%">
        <Div width={['80%', '60%', '55%', '50%', '50%']}>
          <GridContainer>
            <GridItem num={[6, 6, 6, 6, 6]}>
              <Div onClick={() => setButtonSwitch(0)}><HoverBtn>My Orders</HoverBtn></Div>
            </GridItem>
            <GridItem num={[6, 6, 6, 6, 6]}>
              <Div onClick={() => setButtonSwitch(1)}><HoverBtn>My Profile</HoverBtn></Div>
            </GridItem>
          </GridContainer>
        </Div>
      </Div>

      <Div width="100%">
        {buttonSwitch === 0
          ? (
            <OrdersSection />
          ) : <Div />}
        {buttonSwitch === 1
          ? (
            <Div width="100%">
              <UserInformation profil={profilInfo} recoverys={recovery} recoverysMess={validateRecovery} errorsApi={errorsApiRecovery} />
            </Div>
          ) : <Div />}
      </Div>
      <Div />
    </Div>
  );
}

function UserProfil(props) {
  const { user, recovery, ...rest } = props;
  const useSocketHook = useSocket(user);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Layout useSocketHook={useSocketHook}>
      <Page user={user} useSocketHook={useSocketHook} />
    </Layout>
  );
}

export default UserProfil;

export const getServerSideProps = (context) => {
  const { user } = nextCookies(context);
  if (!user) return { props: {} };
  return { props: { user } };
};
