import React, { useState } from 'react';
import Link from 'next/link';
// components
import { Div } from 'components';
// components
import RecoveryForm from 'elementsClient/Forms/changePassForm';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Spam from '@/components/Typography/Spam';
// elements
// assets
import Logo from './Logo';

// Link to pour MeisterIcon et Condition d'utilisation
const LinkTo = (props) => {
  const { link, children } = props;
  const [hover, setHover] = useState(false);
  return (
    <span
      type="link2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer' }}
    >
      <Link href={link} passHref>
        <span>{children}</span>
      </Link>
    </span>
  );
};

const ErrorMsg = ({ message, i }) => <Spam type="subtitle4" color="danger">{message}</Spam>;

const ValidateMsg = ({ message, i }) => <Spam type="subtitle4Green">{message}</Spam>;

function ForgotPasswordElement(props) {
  const {
    goingTo, submit, errorsApi, validate
  } = props;

  return (
    <Div width="95%" vertical="top" height="99vh" style={{ backgroundColor: 'white' }}>

      <GridContainer spacing={0}>
        <GridItem num={[4, 4, 4, 4, 4]} />
        <GridItem num={[4, 4, 4, 4, 4]}>
          <Logo />
        </GridItem>
        <GridItem num={[4, 4, 4, 4, 4]}>
          <Div onClick={() => goingTo('login')} row horizontal="right" height={['95px', '120px', '120px', '120px', '120px']} width="100%" style={{ paddingRight: '20px' }}>
            <Spam type="subtitle4">LOG IN </Spam>
          </Div>
        </GridItem>
      </GridContainer>

      <Div style={{ fontFamily: 'serif', fontSize: '20px', textTransform: 'capitalize' }}>
        Forgot Password
      </Div>

      <Div
        width="290px"
        style={{
          paddingTop: '20px', textAlign: 'center', fontFamily: 'NovaLight', fontSize: '16px'
        }}
      >
        {`${"Enter your account's email and we'll send you an email to reset the password"}`}
      </Div>

      <Div style={{ paddingTop: '50px' }}>
        <Div width={['900px', '900px', '1000px', '1000px', '1000px']}>

          <GridContainer spacing={2}>

            <GridItem num={[12, 12, 12, 12, 12]}>
              <GridContainer spacing={2}>
                <GridItem num={[12, 12, 12, 12, 12]}>
                  {validate.map((val, i) => <ValidateMsg message={val} i={i} key={`${i + 1}`} />)}
                  {errorsApi.map((val, i) => <ErrorMsg message={val} i={i} key={`${i + 1}`} />)}
                </GridItem>
              </GridContainer>
            </GridItem>

            <GridItem num={[12, 12, 12, 12, 12]}>
              <RecoveryForm submit={submit} language="EN" />
            </GridItem>

          </GridContainer>
        </Div>
      </Div>

      <Div height={['50px', '250px', '250px', '250px', '250px']} />
    </Div>

  );
}
export default ForgotPasswordElement;
