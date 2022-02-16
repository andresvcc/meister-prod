import React, { useState } from 'react';
import Link from 'next/link';
// components
import { Div, hookDeviceInfo } from 'components';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Spam from '@/components/Typography/Spam';
import Button from '@/components/CustomButtons/Button';
import Dialog from '@material-ui/core/Dialog';
import PolicyIcon from '@material-ui/icons/Policy';
// assets
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import imagine1 from '@/assets/img/motoImgHomePub.jpg';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Radio from '@material-ui/core/Radio';

// contenu textSection
const contenuTextSection = {
  title: 'Cookies Configuration',
  description: 'We use our own cookies, as well as those of third parties, for individual as well as repeated sessions, in order to make the navigation of our website easy and safe for our users. ',
};

const config2 = {
  style: {
    width: '35%',
    height: '45px',
    border: 'black',
    color: 'white',
  }
};

const config2Small = {
  style: {
    width: '90%',
    height: '45px',
    border: 'black',
    color: 'white',
  }
};
const config1Small = {
  style: {
    width: '90%',
    height: '45px',
    border: 'solid 2px #18374C'
  }
};
const config1 = {
  style: {
    width: '35%',
    height: '45px',
    border: 'solid 2px #18374C'
  },
};
const config4 = {
  style: {
    width: '35%',
    height: '45px',
  },
};
// Fonts
const variation = 0.0225;
const makeComponentStyles = makeStyles((theme) => ({
  titleFonts: {
    fontFamily: 'serif',
    fontSize: `calc(100vw * ${variation - 0.08})`,
    color: 'black',
    [theme.breakpoints.only('xs')]: {
      fontSize: `calc(100vw * ${variation + 0.02})`,
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

const configurationCookie = [

  { title: 'Visitor preferences' },
  { title: 'Analytics cookies' },
  { title: 'Advertising Cookies' }
];

const TextSection = () => {
  const { width } = hookDeviceInfo();
  const classes = makeComponentStyles();

  return (
    <Div horizontal="center" vertical="bottom" width="95%">
      <Div height="15px" />
      <Div width="95%" height="60px" horizontal="left" className={classes.titleFonts} row>
        <PolicyIcon />
        <Div width={20} />
        {contenuTextSection.title}
      </Div>

      <Div width="95%" height={['180px', '180px', '180px', '180px', '180px']} vertical="top" horizontal="left">
        <Spam type="testTypo3">
          {contenuTextSection.description}
        </Spam>
        <Spam type="testTypo3">
          {contenuTextSection.description2}
        </Spam>

        <Div width="100%" height="180px" row horizontal="at">
          <Div width="210px" row>
            <Div width="40px" horizontal="left">
              <ArrowForwardIosIcon style={{ fontSize: '15px' }} />
            </Div>
            <Div width="180px" horizontal="left">
              <Spam type="testTypo3Btn">
                Cookie configuration
              </Spam>
            </Div>

          </Div>
          <Spam type="testTypo3Btn">
            Always active
          </Spam>
        </Div>

        {configurationCookie.map((val, i) => (

          <Div width="100%" height="180px" row horizontal="at">
            <Div width="210px" row>
              <Div width="40px" horizontal="left">
                <ArrowForwardIosIcon style={{ fontSize: '15px' }} />
              </Div>
              <Div width="180px" horizontal="left">
                <Spam type="testTypo3Btn">
                  {val.title}
                </Spam>
              </Div>

            </Div>
            <Radio
              size="small"
              style={{ color: '#2B5878', }}
                          // onClick={BillingForm}
              checked
            />
          </Div>
        ))}

      </Div>

    </Div>
  );
};

function CookieConfiguration(props) {
  const { width } = hookDeviceInfo();
  const { closePopup, aceptAll } = props;

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <Div width="100%" height="100%" vertical="bottom">

      <Dialog
        open={!open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <Div
          style={{ background: 'red' }}
          width="100%"
          height="500px"
          onClick={handleClose}
          horizontal="left"
        >
          <Spam type="testTypo3Btn">
            Cookie configuration
          </Spam>
          <Div height={10} />

          <Spam type="testTypo3Btn">
            We use our own cookies, as well as those of third parties, for individual as well as repeated sessions, in order to make the navigation of our website easy and safe for our users.
            In turn, we use cookies to measure and obtain statistical data about the navigation of the users. You can configure and accept the use of cookies. You can read more information about our Cookie Policy.
          </Spam>
          <Div width="100%">
            <Spam type="testTypo3Btn">
              Cookie configuration
            </Spam>
          </Div>
        </Div>
      </Dialog>

      <GridContainer spacing={1}>

        <GridItem num={[12, 12, 12, 12, 12]}>
          <TextSection />
        </GridItem>

        <GridItem num={[12, 12, 12, 12, 12]}>

          <GridItem num={[12, 12, 10, 12, 12]}>

            {width < 1000

              ? (
                <Div width="100%" horizontal="center" style={{ paddingBottom: '5px', paddingTop: '5px' }}>

                  <Button
                    color="transparent"
                    {...config1Small}
                  >
                    <Spam type="testTypo3Btn">
                      Save Configuration
                    </Spam>
                  </Button>
                  <Button color="primary" {...config2Small} onClick={aceptAll}>
                    <Spam type="testTypo3Btn">
                      Accept Cookies
                    </Spam>
                  </Button>
                </Div>
              ) : (
                <Div width="100%" row horizontal="around" style={{ paddingBottom: '5px', paddingRight: '100px', paddingTop: '5px' }}>
                  <Button
                    color="transparent"
                    {...config4}
                    onClick={handleClose}
                  >
                    <Spam type="testTypo3Btn" />
                  </Button>

                  <Button
                    color="transparent"
                    {...config1}
                  >
                    <Spam type="testTypo3Btn">
                      Save Configuration
                    </Spam>
                  </Button>
                  <Button color="primary" {...config2} onClick={aceptAll}>
                    <Spam type="testTypo3Btn">
                      Accept Cookies
                    </Spam>
                  </Button>
                </Div>
              )}

          </GridItem>

        </GridItem>

      </GridContainer>
    </Div>
  );
}

export default CookieConfiguration;
