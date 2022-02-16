import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// components
import { Div } from 'components';
import RegistreForm from 'elementsClient/Forms/registre';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Spam from '@/components/Typography/Spam';
// elements
// assets
import googleIcon from '@/assets/img/google.png';
import facebookIcon from '@/assets/img/facebook.png';
import Logo from './Logo';

// Bouton lien pour aller à la page "Terms of Service"
const LinkTo = (props) => {
  const { link, children } = props;
  const [hover, setHover] = useState(false);
  return (
    <span
      type="link2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer', fontWeight: hover ? 'bold' : null, color: '#18374C' }}
    >
      <Link href={link} passHref>
        <span>{children}</span>
      </Link>
    </span>
  );
};

// Boutons pour se connecter avec réseaux sociaux
const SocialButton = (props) => {
  const { title, image } = props;
  return (
    <Div width={['300px', '380px', '420px', '420px', '420px']} height="55px" style={{ borderRadius: '5px', border: '1px solid #00000050', backgroundColor: 'white' }}>
      <Div width="90%" height="90%" row horizontal="left">
        <Div width="20%">
          <Image src={image} alt="..." height="30px" width="30px" className="iconRound" />
        </Div>
        <Div width="60%" style={{ fontSize: '14px' }}>
          {title}
        </Div>
      </Div>
    </Div>
  );
};

const ErrorMsg = ({ message, i }) => <Spam type="subtitle4" color="danger">{message}</Spam>;

const ValidateMsg = ({ message, i }) => <Spam type="subtitle4Green">{message}</Spam>;

function RegisterElement(props) {
  const {
    goingTo, submit, user, errorsApi, validate, ...rest
  } = props;

  return (
    <Div width="100%" vertical="top" height="100%">

      <GridContainer spacing={0}>
        <GridItem num={[4, 4, 4, 4, 4]} />
        <GridItem num={[4, 4, 4, 4, 4]}>
          <Logo />
        </GridItem>
        <GridItem num={[4, 4, 4, 4, 4]}>
          <Div onClick={() => goingTo('login')} row horizontal="right" height={['95px', '120px', '120px', '120px', '120px']} width={['70%', '100%', '100%', '100%', '100%']} style={{ paddingRight: '20px' }}>
            <Spam type="subtitle4">LOG IN </Spam>
          </Div>
        </GridItem>
      </GridContainer>

      <Div height={['20px', '20px', '50px', '50px', '50px']} />

      <Div style={{ fontFamily: 'serif', fontSize: '20px', textTransform: 'capitalize' }}>
        Create Your Account
      </Div>
      <Div height={['20px', '20px', '100px', '100px', '100px']} />

      <Div vertical="top">

        {errorsApi.map((val, i) => <ErrorMsg message={val} i={i} key={`${i + 1}`} />)}
        <RegistreForm submit={submit} language="EN" />
        {validate.map((val, i) => <ValidateMsg message={val} i={i} key={`${i + 1}`} />)}

        <Div width={[300, 400, 400, 400, 400]} style={{ textAlign: 'center', fontSize: '14px' }}>
          By creating an account, you agree to our
          <Div style={{ fontSize: '14px', color: '#18374C' }}>
            <LinkTo link="/Information/termsConditions">
              Terms of Service
            </LinkTo>
          </Div>
        </Div>
      </Div>

      <Div height={20} />

      <Div width={[300, 380, 400, 400, 400]} row>
        <Div width="45%" style={{ borderTop: '1px solid #00000020' }} />
        <Div width="45%" style={{ fontFamily: 'GeorgiaLight', fontSize: '13px' }}>
          OR
        </Div>
        <Div width="45%" style={{ borderTop: '1px solid #00000020' }} />
      </Div>

      <Div height={20} />

      <Div height={130}>
        <SocialButton title="Continue with Facebook" image={facebookIcon} />
        <Div height="15px" />
        <SocialButton title="Continue with Google" image={googleIcon} />
      </Div>
      <Div width="100%">
        <Div width={400} height={35} />
      </Div>
      <Div height={['50px', '250px', '250px', '250px', '250px']} />
    </Div>

  );
}
export default RegisterElement;
