import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// components
import { Div, hookDeviceInfo } from 'components';
import LoginForm from 'elementsClient/Forms/loginClient';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Spam from '@/components/Typography/Spam';
// elements
// assets
import googleIcon from '@/assets/img/google.png';
import facebookIcon from '@/assets/img/facebook.png';
import Logo from './Logo';

// Divider line pour le OR entre formulaire et SocialButton
const DividerLine = () => {
  const { width } = hookDeviceInfo();
  return (
    <Div height="95%" width="100%">
      {
        width > 960 ? (
          <Div height="150px" width="150px">
            <Div width="1px" height="40%" style={{ backgroundColor: '#00000010' }} />
            <Div width="20px" height="20%" style={{ fontFamily: 'GeorgiaLight', fontSize: '13px' }}>
              OR
            </Div>
            <Div width="1px" height="40%" style={{ backgroundColor: '#00000010' }} />
          </Div>
        ) : (
          <Div />
        )
      }
      {
        width < 940 ? (
          <Div height="95%" width="280px" row>
            <Div width="45%" style={{ borderTop: '1px solid #00000010' }} />
            <Div width="45%" height="100%" style={{ fontFamily: 'GeorgiaLight', fontSize: '13px' }}>
              OR
            </Div>
            <Div width="45%" style={{ borderTop: '1px solid #00000010' }} />
          </Div>
        ) : (
          <Div />
        )
      }
    </Div>
  );
};

// Boutons pour se connecter avec réseaux sociaux
const SocialButton = (props) => {
  const { title, image } = props;

  return (
    <Div width="100%" height="55px" style={{ borderRadius: '5px', border: '1px solid #00000050', backgroundColor: 'white' }}>
      <Div width="90%" height="90%" row horizontal="left">
        <Div width="20%">
          <Image src={image} alt="..." height="30px" width="30px" className="iconRound" />
        </Div>
        <Div width="70%" horizontal="left" style={{ fontSize: '14px' }}>
          {title}
        </Div>
      </Div>
    </Div>
  );
};

const ErrorMsg = ({ message, i }) => <Spam type="subtitle4" color="danger">{message}</Spam>;

function LoginElement(props) {
  const { goingTo, submit, errorsApi } = props;

  return (
    <Div width="100%" height="100%">

      <GridContainer spacing={0}>
        <GridItem num={[4, 4, 4, 4, 4]} />
        <GridItem num={[4, 4, 4, 4, 4]}>
          <Logo />
        </GridItem>
        <GridItem num={[4, 4, 4, 4, 4]}>
          <Div onClick={() => goingTo('register')} row horizontal="right" height={['95px', '120px', '120px', '120px', '120px']} width="100%" style={{ paddingRight: '20px' }}>
            <Spam type="subtitle4">CREATE ACCOUNT </Spam>
          </Div>
        </GridItem>
      </GridContainer>

      <Div height={['20px', '20px', '100px', '100px', '100px']} />

      <Div style={{ fontFamily: 'serif', fontSize: '20px', textTransform: 'capitalize' }}>
        Log in to Meister Engineering
      </Div>

      <Div height={['0px', '20px', '100px', '100px', '100px']} />

      <Div style={{ paddingTop: '20px' }}>
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
                <LoginForm submit={submit} language="EN" />
              </Div>
            </GridItem>

            <GridItem num={[12, 12, 2, 2, 2]}>
              <DividerLine />
            </GridItem>

            <GridItem num={[12, 12, 5, 5, 5]}>
              <Div vertical="top" width={[280, 280, 280, 280, 280]} height="100%" style={{ paddingTop: '3px' }}>
                <SocialButton title="Continue with Facebook" image={facebookIcon} />
                <Div height="15px" />
                <SocialButton title="Continue with Google" image={googleIcon} />
              </Div>
            </GridItem>

          </GridContainer>
        </Div>

      </Div>

      <Div width="400px" height="80px">
        <Div
          onClick={() => goingTo('recovery')}
          row
          horizontal="left"
          style={{ fontSize: '13px', fontWeight: '500' }}
        >
          {`${"CAN'T LOG IN ? "}`}
        </Div>
      </Div>

    </Div>

  );
}
export default LoginElement;
