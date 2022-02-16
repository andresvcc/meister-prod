import React, { useState } from 'react';
import Link from 'next/link';
// components
import Spam from '@/components/Typography/Spam';
import { Div, FlexDiv } from 'components';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
// Images à ajouter (instagram...)
import imagine1 from '@/assets/img/logo.svg';

const LinkTo = (props) => {
  const { link, children } = props;
  const [hover, setHover] = useState(false);
  return (
    <span
      type="link2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: 'pointer', color: hover ? '#026eb1' : null, textDecoration: hover ? 'underline' : null,
      }}
    >
      <Link href={link} passHref>
        <span>{children}</span>
      </Link>
    </span>
  );
};

function Footer() {
  return (
    <Div style={{ backgroundColor: '#2E5E8020' }}>

      <Div width={['80%', '60%', '50%', '50%', '50%']}>
        <GridContainer spacing={3}>
          <GridItem num={[12, 12, 12, 12, 12]}>
            <Spam type="subtitle3">As featured in</Spam>
          </GridItem>

          <GridItem num={[4, 4, 4, 4, 4]}>
            <Div width="150px" height="100px">
              {' '}
              <img src={imagine1} alt="..." />
            </Div>
          </GridItem>
          <GridItem num={[4, 4, 4, 4, 4]}>
            <Div width="150px" height="100px">
              {' '}
              <img src={imagine1} alt="..." />
            </Div>
          </GridItem>
          <GridItem num={[4, 4, 4, 4, 4]}>
            <Div width="150px" height="100px">
              {' '}
              <img src={imagine1} alt="..." />
            </Div>
          </GridItem>
        </GridContainer>
      </Div>

      <Div width={['95%', '95%', '95%', '98%', '98%']}>
        <FlexDiv height={[150, 150, 180, 180, 180]} num={[1, 1, 4, 4, 4]}>

          <Div width="100%">
            <Div width="90%" horizontal="left" height="120px" vertical="at">
              <Spam type="subtitle1">HELP</Spam>
              <Spam type="subtitle3">+41 (0)79 336 61 29</Spam>
              <Spam type="subtitle3"><LinkTo link="/">moto@meister-engineering.com</LinkTo></Spam>
              <Spam type="subtitle3">Route de Compois 24 </Spam>
              <Spam type="subtitle3">1252 Menier</Spam>

            </Div>
          </Div>

          <Div width="100%">
            <Div width="90%" horizontal="left" height="120px" vertical="at">
              <Spam type="subtitle1">INFORMATION</Spam>
              <Spam type="subtitle3"><LinkTo link="/">About Meister Engineering</LinkTo></Spam>
              <Spam type="subtitle3"><LinkTo link="/">Terms and conditions</LinkTo></Spam>
              <Spam type="subtitle3"><LinkTo link="/">Shipping</LinkTo></Spam>
              <Spam type="subtitle3" />
            </Div>
          </Div>

          <Div width="100%">
            <Div width="90%" horizontal="left" height="120px" vertical="at">
              <Spam type="subtitle1">ABOUT</Spam>
              <Spam type="subtitle3"><LinkTo link="/">Privacy policy</LinkTo></Spam>
              <Spam type="subtitle3"><LinkTo link="/">Return policy</LinkTo></Spam>
              <Spam type="subtitle3"><LinkTo link="/">Cookies policy</LinkTo></Spam>
              <Spam type="subtitle3" />

            </Div>
          </Div>

          <Div width="100%">
            <Div width="90%" horizontal="left" height="120px" vertical="top">
              <Spam type="subtitle1">FOLLOW US</Spam>
              <Div row height={70} width={['200px', '200px', '80%', '70%', '60%']} horizontal="at">
                <img src={imagine1} alt="..." style={{ height: '50px', width: '50px' }} />
                <img src={imagine1} alt="..." style={{ height: '50px', width: '50px' }} />
                <img src={imagine1} alt="..." style={{ height: '50px', width: '50px' }} />
              </Div>
            </Div>
          </Div>

        </FlexDiv>
      </Div>
    </Div>
  );
}

export default Footer;
