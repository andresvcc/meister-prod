// 1.5 PhotoSection
import React, { useState } from 'react';
import { useRouter } from 'next/router';
// material UI
import { makeStyles } from '@material-ui/core/styles';
// components
import { Div, hookDeviceInfo } from 'components';
import Spam from '@/components/Typography/Spam';
import Button from '@/components/CustomButtons/Button';
// material ui

// Fonts
const makeComponentStyles = makeStyles((theme) => ({
  titleFonts: {
    fontFamily: 'GeorgiaLight',
    fontSize: '23px',
    color: 'white',
    [theme.breakpoints.only('xs')]: {
      fontSize: '15px',
    },
    [theme.breakpoints.only('sm')]: {
      lineHeight: '25px'
    },
    [theme.breakpoints.only('xl')]: {
      lineHeight: '25px'
    },
  },
  titleFonts2: {
    fontFamily: 'NovaLight, sans serif',
    fontSize: '17px',
    color: 'white',
    [theme.breakpoints.only('xs')]: {
      fontSize: '14px',
    },
    [theme.breakpoints.only('sm')]: {
      lineHeight: '25px'
    },
    [theme.breakpoints.only('xl')]: {
      lineHeight: '25px'
    },
  }
}));

function PhotoSection(props) {
  const {
    image, title, buttonTitle, link, titleArticle
  } = props;
  const [hover, setHover] = useState(false);
  const { width } = hookDeviceInfo();
  const classes = makeComponentStyles();
  const router = useRouter();

  const handleHover = (newHover) => {
    setHover(newHover);
  };

  const goingTo = (link) => {
    router.push({
      pathname: `${link}`,
    });
  };

  return (
    <Div
      onHover={(hover) => handleHover(hover)}
      width="100%"
      height={['250px', '250px', '520px', '520px', '520px']}
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: '#cccccc',
        backgroundPosition: 'center',
      }}
    >
      {width > 800
        ? (
          <div style={{ width: '100%' }}>

            {hover ? (
              <Div
                width="100%"
                height={['250px', '250px', '520px', '520px', '520px']}
                style={{ background: '#00000090', transition: 'background ease 500ms' }}
              >
                <Div width="100%">
                  <Div width="90%" horizontal="left" className={classes.titleFonts}>
                    {title}
                  </Div>

                  <Div height={20} />

                  <Div width="90%" horizontal="left" className={classes.titleFonts2}>
                    {titleArticle}
                  </Div>

                  <Div height={40} />

                  <Div width="90%" horizontal="left">
                    <Button color="primary" onClick={() => goingTo(link)}>
                      <Spam type="shopNow">{buttonTitle}</Spam>
                    </Button>
                  </Div>
                </Div>
              </Div>
            ) : <Div />}
          </div>
        ) : (
          <div style={{ width: '100%' }}>
            <Div
              width="100%"
              height={['250px', '250px', '520px', '520px', '520px']}
              style={{ background: '#00000090', transition: 'background ease 500ms' }}
            >
              <Div width="100%">

                <Div width="90%" horizontal="left" className={classes.titleFonts}>
                  {title}
                </Div>

                <Div height={20} />

                <Div width="90%" horizontal="left" className={classes.titleFonts2}>
                  {titleArticle}
                </Div>

                <Div height={40} />

                <Div width="90%" horizontal="left">
                  <Div style={{ width: '110px' }}>
                    <Button color="primary" onClick={() => goingTo(link)}>
                      <Spam type="shopNow">{buttonTitle}</Spam>
                    </Button>
                  </Div>
                </Div>
              </Div>
            </Div>
          </div>
        )}
    </Div>
  );
}

export default PhotoSection;
