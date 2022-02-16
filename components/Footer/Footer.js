import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// components
import { Div, FlexDiv, hookDeviceInfo } from 'components';
import Spam from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
// Images des journaux
import imagine1 from '@/assets/img/footer_img_1.png';
import imagine2 from '@/assets/img/footer_img_2.png';
import imagine3 from '@/assets/img/footer_img_3.png';

// Images des réseaux sociaux
import imagine4 from '@/assets/img/linkedIn_icon.png';
import imagine5 from '@/assets/img/instagram_footer_icon.png';
import imagine6 from '@/assets/img/facebook_footer_icon.png';
// import { Store } from '@material-ui/icons';

const link1 = 'https://www.google.com/maps/place/Meister+Engineering+SA/@46.2437724,6.2205624,16.05z/data=!4m5!3m4!1s0x478c6f36743605d3:0xd980424fe7e5d52!8m2!3d46.2448713!4d6.2226469';
const link2 = 'https://www.google.com/maps/place/Meister+Engineering+Showroom/@46.2030078,6.1588146,17z/data=!3m1!4b1!4m5!3m4!1s0x478c65c7187924f7:0xae7f241e5fc8194c!8m2!3d46.203009!4d6.1610129';

const LinkTo = (props) => {
  const { link, children } = props;
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
      <Link href={link} passHref>
        <span>{children}</span>
      </Link>
    </span>
  );
};

const LinkToOutside = (props) => {
  const { link, children } = props;
  const [hover, setHover] = useState(false);
  return (

    <a
      href={link}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      target="_blank"
      rel="noreferrer"
      style={{
        cursor: 'pointer', color: hover ? 'black' : 'grey', textDecoration: hover ? 'underline' : null,
      }}
    >
      <span>{children}</span>
    </a>
  );
};

function Footer() {
  const { width, hookWidth = 0 } = hookDeviceInfo();

  return (
    <Div width="100%" style={{ backgroundColor: '#fbf9f4' }}>
      <Div height="15px" />
      <Div width={['80%', '60%', '60%', '60%', '60%']} row style={{ maxWidth: '1400px' }}>
        {width > 960

          ? (
            <GridContainer spacing={2}>

              <GridItem num={[12, 12, 12, 12, 12]}>
                <Div style={{ marginTop: '10px' }}>
                  <Spam type="heading2">As featured in</Spam>
                </Div>
              </GridItem>

              <GridItem num={[4, 4, 4, 4, 4]}>
                <Div width="200px" height="80px">
                  <LinkToOutside link="https://www.meister-engineering.com/press_bmw_motorrad">
                    <Image src={imagine1} alt="..." width="200px" height="90px" />
                  </LinkToOutside>
                </Div>

              </GridItem>
              <GridItem num={[4, 4, 4, 4, 4]}>
                <Div width="170px" height="80px">
                  <LinkToOutside link="https://bikeshedmoto.com/blogs/blog/meister-engineering-r80-gs-geneva-dakar?_pos=1&_sid=a23c9a58c&_ss=r">
                    <Image src={imagine2} alt="..." width="150px" height="90px" />
                  </LinkToOutside>
                </Div>
              </GridItem>

              <GridItem num={[4, 4, 4, 4, 4]}>
                <Div width="170px" height="80px">
                  <LinkToOutside link="https://www.bikeexif.com/custom-bikes-week-25">
                    <Image src={imagine3} alt="..." width="130px" height="90px" />
                  </LinkToOutside>
                </Div>
              </GridItem>

            </GridContainer>
          )
          : null}
      </Div>

      {width > 1000 ? (
        <Div width="95vw" row horizontal="around" style={{ maxWidth: '1700px', marginTop: '40px', marginBottom: '40px' }}>

          <Div width={['100%', '35%', '35%', '35%', '30%']}>
            <Div width="95%" horizontal="left" height="140px" vertical="at">
              <Spam type="heading1">CONTACT</Spam>
              <Spam type="heading2"><LinkTo link="tel:+41 (0)79 336 61 29">+41 (0)79 336 61 29</LinkTo></Spam>
              <Spam type="heading2"><LinkTo link="mailto: moto@meister-engineering.com">moto@meister-engineering.com</LinkTo></Spam>
              <Spam type="heading2"><LinkToOutside link={link1}>Workshop: Route de Compois 24, 1252 Meinier</LinkToOutside></Spam>
              <Spam type="heading2"><LinkToOutside link={link2}>Store & Showroom: Rue Maunoir 30, 1207 Genève</LinkToOutside></Spam>
            </Div>
          </Div>
          <Div width={['100%', '40%', '45%', '40%', '40%']}>

            <Div width="50%" horizontal="left" height="140px" vertical="at">

              <Spam type="heading1">INFORMATION</Spam>
              <Spam type="heading2"><LinkTo link="/Information/aboutMeister">About Meister Engineering</LinkTo></Spam>
              <Spam type="heading2"><LinkTo link="/Information/termsConditions">Terms and conditions</LinkTo></Spam>
              <Spam type="heading2"><LinkTo link="/Information/FAQs?option=general">FAQs</LinkTo></Spam>
              <Spam type="heading2" />
            </Div>
          </Div>

          <Div width="20%">
            <Div width="90%" horizontal="right" height="130px" vertical="top">
              <Spam type="heading1">FOLLOW US</Spam>
              <Div row height={70} width={['100px', '100px', '60%', '50%', '40%']} horizontal="at">
                <LinkToOutside link="https://www.instagram.com/meisterengineering/?hl=fr">
                  <Image src={imagine5} alt="..." height="30px" width="30px" />
                </LinkToOutside>
                <LinkToOutside link="https://www.facebook.com/meisterengineering/">
                  <Image src={imagine6} alt="..." height="30px" width="30px" />
                </LinkToOutside>
                <LinkToOutside link="https://www.linkedin.com/in/antoine-meister-2596a3136/?originalSubdomain=ch">
                  <Image src={imagine4} alt="..." height="30px" width="30px" />
                </LinkToOutside>
              </Div>
            </Div>
          </Div>

        </Div>
      ) : (
        width > 600 ? (
          <Div width="95vw" style={{ maxWidth: '1700px' }}>
            <Div width="95vw" row horizontal="around" style={{ maxWidth: '1700px' }}>
              <Div width={['100%', '40%', '40%', '35%', '30%']}>
                <Div width="95%" horizontal="left" height="160px" vertical="at">
                  <Spam type="heading1">CONTACT</Spam>
                  <Spam type="heading2"><LinkTo link="tel:+41 (0)79 336 61 29">+41 (0)79 336 61 29</LinkTo></Spam>
                  <Spam type="heading2"><LinkTo link="mailto: moto@meister-engineering.com">moto@meister-engineering.com</LinkTo></Spam>
                  <Spam type="heading2"><LinkToOutside link={link1}>Workshop: Route de Compois 24, 1252 Meinier</LinkToOutside></Spam>
                  <Spam type="heading2"><LinkToOutside link={link2}>Store & Showroom: Rue Maunoir 30, 1207 Genève</LinkToOutside></Spam>
                </Div>
              </Div>

              <Div width={['100%', '20%', '20%', '25%', '25%']}>
                <Div width="90%" horizontal="left" height="160px" vertical="at">
                  <Spam type="heading1">INFORMATION</Spam>
                  <Spam type="heading2"><LinkTo link="/Information/Meister">About Meister Engineering</LinkTo></Spam>
                  <Spam type="heading2"><LinkTo link="/Information/termsConditions">Terms and conditions</LinkTo></Spam>
                  <Spam type="heading2"><LinkTo link="/Information/FAQs?option=general">FAQs</LinkTo></Spam>
                  <Spam type="heading2" />
                </Div>
              </Div>
            </Div>

            <Div height="20px" />

            <Div width="95vw" row horizontal="around" style={{ maxWidth: '1700px' }}>
              <Div width={['100%', '40%', '40%', '35%', '30%']} />

              <Div width={['100%', '20%', '20%', '25%', '25%']}>
                <Div width="90%" horizontal="left" height="130px" vertical="top">
                  <Spam type="heading1">FOLLOW US</Spam>
                  <Div row height={70} width={['100px', '100px', '60%', '50%', '50%']} horizontal="at">
                    <LinkToOutside link="https://www.instagram.com/meisterengineering/?hl=fr">
                      <Image src={imagine5} alt="..." height="30px" width="30px" />
                    </LinkToOutside>
                    <LinkToOutside link="https://www.facebook.com/meisterengineering/">
                      <Image src={imagine6} alt="..." height="30px" width="30px" />
                    </LinkToOutside>
                    <LinkToOutside link="https://www.linkedin.com/in/antoine-meister-2596a3136/?originalSubdomain=ch">
                      <Image src={imagine4} alt="..." height="30px" width="30px" />
                    </LinkToOutside>
                  </Div>
                </Div>
              </Div>
            </Div>
          </Div>
        ) : (
          <Div width="95vw" style={{ maxWidth: '1700px' }}>
            <Div width="95vw" style={{ maxWidth: '1700px' }}>
              <Div width={['100%', '40%', '40%', '35%', '30%']}>
                <Div width="95%" horizontal="left" vertical="at">
                  <Spam type="heading1">CONTACT</Spam>
                  <Spam type="heading2"><LinkTo link="tel:+41 (0)79 336 61 29">+41 (0)79 336 61 29</LinkTo></Spam>
                  <Spam type="heading2"><LinkTo link="mailto: moto@meister-engineering.com">moto@meister-engineering.com</LinkTo></Spam>
                  <Spam type="heading2">Workshop:</Spam>
                  <Spam type="heading2"><LinkTo link={link1}>Route de Compois 24, 1252 Meinier</LinkTo></Spam>
                  <Spam type="heading2">Store & Showroom:</Spam>
                  <Spam type="heading2"><LinkTo link={link2}>Rue Maunoir 30, 1207 Genève</LinkTo></Spam>
                </Div>
              </Div>

              <Div height="20px" />

              <Div width={['100%', '20%', '20%', '25%', '25%']}>
                <Div width="95%" horizontal="left">
                  <Spam type="heading1">INFORMATION</Spam>
                  <Spam type="heading2"><LinkTo link="/Information/aboutMeister">About Meister Engineering</LinkTo></Spam>
                  <Spam type="heading2"><LinkTo link="/Information/termsConditions">Terms and conditions</LinkTo></Spam>
                  <Spam type="heading2"><LinkTo link="/Information/FAQs?option=general">FAQs</LinkTo></Spam>

                  <Spam type="heading2" />
                </Div>
              </Div>
            </Div>

            <Div height="20px" />

            <Div width="95vw" style={{ maxWidth: '1700px' }}>
              <Div width={['100%', '40%', '40%', '35%', '30%']} />

              <Div height="20px" />

              <Div width={['100%', '20%', '20%', '25%', '25%']}>
                <Div width="95%" horizontal="left" vertical="top">
                  <Spam type="heading1">FOLLOW US</Spam>
                  <Div row height={70} width={['100px', '100px', '50%', '50%', '50%']} horizontal="at">
                    <LinkTo link="https://www.instagram.com/meisterengineering/?hl=fr">
                      <Image src={imagine5} alt="..." height="30px" width="30px" />
                    </LinkTo>
                    <LinkTo link="https://www.facebook.com/meisterengineering/">
                      <Image src={imagine6} alt="..." height="30px" width="30px" />
                    </LinkTo>
                    <LinkTo link="https://www.linkedin.com/in/antoine-meister-2596a3136/?originalSubdomain=ch">
                      <Image src={imagine4} alt="..." height="30px" width="30px" />
                    </LinkTo>
                  </Div>
                </Div>
              </Div>
            </Div>
          </Div>
        )

      )}

    </Div>
  );
}

export default Footer;
