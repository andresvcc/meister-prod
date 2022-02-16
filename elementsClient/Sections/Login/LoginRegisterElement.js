import React, { useState } from 'react';
// components
import { Div, hookDeviceInfo } from 'components';
import Link from 'next/link';
// elements
import LoginForm from 'elementsClient/Forms/loginClient';
// components
import RegistreForm from 'elementsClient/Forms/registre';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Spam from '@/components/Typography/Spam';
// assets
import googleIcon from '@/assets/img/google.png';
import facebookIcon from '@/assets/img/facebook.png';
import imagine3 from '@/assets/img/logo.svg';

// Link to pour MeisterIcon et Condition d'utilisation
const LinkTo = (props) => {
  const { link, children } = props;
  const [hover, setHover] = useState(false);
  return (
    <span
      type="link2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: 'pointer', fontWeight: hover ? 'bold' : null,
      }}
    >
      <Link href={link} passHref>
        <span>{children}</span>
      </Link>
    </span>
  );
};

// Divider line pour le OR entre formulaire et SocialButton
const DividerLine = () => {
  const { width } = hookDeviceInfo();
  return (
    <Div height="95%">
      {
        width > 959 ? (
          <Div height="95%" width="20px">
            <Div width="1px" height="40%" style={{ backgroundColor: '#00000020' }} />
            <Div width="20px" height="20%">
              <Spam type="subtitle3">OR</Spam>
            </Div>
            <Div width="1px" height="40%" style={{ backgroundColor: '#00000020' }} />
          </Div>
        ) : (
          <Div height="95%" width="320px" row>
            <Div width="45%" height="1%" style={{ backgroundColor: '#00000020' }} />
            <Div width="45%" height="100%">
              <Spam type="subtitle3">OR</Spam>
            </Div>
            <Div width="45%" height="1%" style={{ backgroundColor: '#00000020' }} />
          </Div>
        )
      }
    </Div>
  );
};

const ErrorMsg = ({ message, i }) => <Spam type="subtitle4" color="danger">{message}</Spam>;

function LoginElement(props) {
  const { goingTo, submit, errorsApi } = props;

  return (
    <Div width="95%" vertical="around">

      <Div width="98%" height="80px" horizontal="at" row>
        Shipping Payment and confirm
      </Div>

      <Div height={90} />

      <Div style={{ paddingTop: '50px' }}>
        <Div width={['90%', '90%', '1000px', '1000px', '1000px']}>

          <GridContainer spacing={2}>

            <GridItem num={[12, 12, 12, 12, 12]}>
              <GridContainer spacing={2}>
                <GridItem num={[12, 12, 5, 5, 5]}>
                  {errorsApi.map((val, i) => <ErrorMsg message={val} i={i} key={`${i + 1}`} />)}
                </GridItem>
              </GridContainer>
            </GridItem>

            <GridItem num={[12, 12, 5, 5, 5]}>
              <Div width="100%">
                <LoginForm submit={submit} language="FR" />
              </Div>
            </GridItem>

            <GridItem num={[12, 12, 2, 2, 2]}>
              <DividerLine />
            </GridItem>

            <GridItem num={[12, 12, 5, 5, 5]}>
              <Div vertical="top">
                {errorsApi.map((val, i) => <ErrorMsg message={val} i={i} key={`${i + 1}`} />)}
                <RegistreForm submit={submit} language="FR" />
              </Div>
            </GridItem>

          </GridContainer>
        </Div>

      </Div>

    </Div>

  );
}
export default LoginElement;
