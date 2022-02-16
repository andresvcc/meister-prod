// 1.2 : CategoriesImages
import React, { useState } from 'react';
import Link from 'next/link';
// components
import { Div } from 'components';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Spam from '@/components/Typography/Spam';
import Button from '@/components/CustomButtons/Button';
// assets
const imagine1 = '/static/images/Home_temporaire_2.jpg';
const imagine2 = '/static/images/Home_temporaire_1.jpg';

// Lien pour les boutons
const LinkTo = (props) => {
  const { link, children } = props;
  const [hover, setHover] = useState(false);
  return (
    <span
      type="link2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: 'pointer',
      }}
    >
      <Button color="primary">
        <Link href={link} passHref>
          <span>{children}</span>
        </Link>
      </Button>

    </span>
  );
};

// Titres + boutons
const TextSection = (props) => {
  const { title, link } = props;
  return (
    <Div height={['200px', '250px', '230px', '230px', '250px']} width="100%">
      <Div
        width="95%"
        height="40%"
        vertical="bottom"
        style={{ fontFamily: 'GeorgiaLight', fontSize: '35px', color: 'white' }}
      >
        {title}
      </Div>
      <Div height="50px" />
      <Div>
        <LinkTo link={link}>
          <Spam type="shopNow">
            Shop now
          </Spam>
        </LinkTo>
      </Div>

    </Div>
  );
};

function CategoriesImages() {
  return (
    <Div width="100%" height={['550px', '250px', '470px', '470px', '470px']}>

      <GridContainer style={{ background: '#EFEEEA60' }} spacing={1}>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <Div
            width="100%"
            height={['250px', '250px', '470px', '470px', '470px']}
            style={{
              backgroundImage: `url(${imagine2})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >

            <Div
              width="100%"
              height={['250px', '250px', '470px', '470px', '470px']}
              style={{ backgroundColor: '#00000080', paddingBottom: '20px' }}
            >
              <TextSection title="Motorcycle Parts" link="/Parts"> </TextSection>
            </Div>
          </Div>
        </GridItem>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <Div
            width="100%"
            height={['250px', '250px', '470px', '470px', '470px']}
            style={{
              backgroundImage: `url(${imagine1})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Div
              width="100%"
              height={['250px', '250px', '470px', '470px', '470px']}
              style={{
                backgroundColor: '#00000080', paddingBottom: '20px'
              }}
            >
              <TextSection title="Pilot Gear" link="/Pilot"> </TextSection>
            </Div>
          </Div>

        </GridItem>
      </GridContainer>
    </Div>
  );
}

export default CategoriesImages;
