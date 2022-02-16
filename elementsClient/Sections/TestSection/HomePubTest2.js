import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// components
import { Div, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Spam from '@/components/Typography/Spam';
import Button from '@/components/CustomButtons/Button';
// assets
import imagine1 from '@/assets/img/motoImgHomePub.jpg';
// contenu textSection
const contenuTextSection = {
  title: 'Transition to quality motorcycles',
  description: 'First the bike was stripped down and then powder coated  along with the wheels, with a custom shortened rear frame. The seat was handmade and covered in black.First the bike was stripped down and then powder coated  along with the wheels, with a custom shortened rear frame.The seat was handmade and covered in black.First the bike was stripped down and then powder coated  along with the wheels, with a custom shortened rear frame. The seat was handmade and covered in black.First the bike was stripped down and then powder coated  along with the wheels, with a custom shortened rear frame. The seat was handmade and covered in black.First the bike was stripped down and then powder coated  along with the wheels, with a custom shortened rear frame. The seat was handmade and covered in black.First the bike was stripped down and then powder coated  along with the wheels, with a custom shortened rear frame. The seat was handmade and covered in black.',
};

// Fonts
const variation = 0.0225;
const makeComponentStyles = makeStyles((theme) => ({
  titleFonts: {
    fontFamily: 'serif',
    fontSize: `calc(100vw * ${variation - 0.008})`,
    color: 'black',
    [theme.breakpoints.only('xs')]: {
      fontSize: `calc(100vw * ${variation + 0.03})`,
    },
    [theme.breakpoints.only('sm')]: {
      fontSize: `calc(100vw * ${variation + 0.008})`,
    },
    [theme.breakpoints.only('md')]: {
      fontSize: `calc(100vw * ${variation + 0.004})`,
    },
    [theme.breakpoints.only('lg')]: {
      fontSize: '30px',
    },
    [theme.breakpoints.only('xl')]: {
      fontSize: '30px',
    },
  }
}));

const TextSection = () => {
  const { width } = hookDeviceInfo();
  const classes = makeComponentStyles();

  return (
    <Div height={['500px', '500px', '500px', '500px', '500px']} horizontal="center" width="80%">
      <Div height={100} />
      <Div width="95%" height="30px" horizontal="left" className={classes.titleFonts} >
        {contenuTextSection.title}
      </Div>
      <Div width="95%" height={['300px', '300px', '300px', '300px', '300px']} vertical="top">
        <Spam type="testTypo">
          {contenuTextSection.description}
        </Spam>
      </Div>

    </Div>
  );
};

function HomePub() {
  return (
    <Div width="100%" height={['300px', '400px', '380px', '380px', '350px']} style={{ background: 'white' }} vertical="bottom">

      <GridContainer spacing={3}>

        <GridItem num={[12, 12, 12, 12, 12]}>
          <TextSection />
        </GridItem>

      </GridContainer>
    </Div>
  );
}

export default HomePub;
