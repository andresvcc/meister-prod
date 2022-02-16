// 1.4 JounralHoraires
import React, { useState } from 'react';
// components
import { Div, hookDeviceInfo } from 'components';
// Material UI
import { makeStyles } from '@material-ui/core/styles';

// Fonts
const makeComponentStyles = makeStyles((theme) => ({
  titleFonts: {
    fontFamily: 'GeorgiaLight',
    fontSize: '23px',
    color: 'white',
    [theme.breakpoints.only('xs')]: {
      fontSize: '13px',
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
      fontSize: '13px',
    },
    [theme.breakpoints.only('sm')]: {
      lineHeight: '25px'
    },
    [theme.breakpoints.only('xl')]: {
      lineHeight: '25px'
    },
  }
}));

function JournalHoraires(props) {
  const {
    image, title
  } = props;
  const [hover, setHover] = useState(false);
  const { width } = hookDeviceInfo();
  const classes = makeComponentStyles();

  const handleHover = (newHover) => {
    setHover(newHover);
  };

  return (
    <Div
      onHover={(hover) => handleHover(hover)}
      width="100%"
      dev
      height={['250px', '350px', '420px', '420px', '420px']}
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: '#cccccc',
        backgroundPosition: 'center',
      }}
    >
      {width > 800 ? (
        <Div width="100%">

          {hover ? (
            <Div
              width="100%"
              height={['250px', '350px', '420px', '420px', '420px']}
              style={{ background: '#00000099', transition: 'background ease 500ms' }}
            >
              <Div width="100%" height="80%" row>
                <Div width="100%" height="100%" vertical="top" className={classes.titleFonts}>
                  {title}
                </Div>

                <Div width="100%" vertical="top" height="100%">
                  <Div horizontal="left">

                    <Div className={classes.titleFonts}>
                      Address
                    </Div>

                    <Div className={classes.titleFonts2}>
                      Rue maunoir 30
                    </Div>

                    <Div className={classes.titleFonts2}>
                      1207 Geneva
                    </Div>

                  </Div>
                </Div>

                <Div width="100%" horizontal="left" height="100%" vertical="top">
                  <Div className={classes.titleFonts}>
                    Opening hours
                  </Div>

                  <Div className={classes.titleFonts2}>
                    Mon: Closed
                  </Div>

                  <Div className={classes.titleFonts2}>
                    Tues: 10am - 7pm
                  </Div>

                  <Div className={classes.titleFonts2}>
                    Wed: 10am - 7pm
                  </Div>

                  <Div className={classes.titleFonts2}>
                    Thurs: 10am - 7:30pm
                  </Div>

                  <Div className={classes.titleFonts2}>
                    Fri: 10am - 7pm
                  </Div>

                  <Div className={classes.titleFonts2}>
                    Sat: 11am - 6pm
                  </Div>

                  <Div className={classes.titleFonts2}>
                    Sun: Closed
                  </Div>

                </Div>
              </Div>

            </Div>
          ) : <Div />}

        </Div>
      ) : (
        <Div width="100%">

          <Div
            width="100%"
            height={['300px', '350px', '420px', '420px', '420px']}
            style={{ background: '#00000099', transition: 'background ease 500ms' }}
          >
            <Div width="100%" height="70%" row>
              <Div width="100%" height="100%" vertical="top">
                <Div className={classes.titleFonts}>
                  {title}
                </Div>
              </Div>

              <Div width="100%" vertical="top" height="100%">
                <Div horizontal="left">

                  <Div className={classes.titleFonts}>
                    Address
                  </Div>

                  <Div className={classes.titleFonts2}>
                    Rue maunoir 30
                  </Div>

                  <Div className={classes.titleFonts2}>
                    1207 Geneva
                  </Div>

                </Div>
              </Div>

              <Div width="100%" horizontal="left" vertical="top" height="100%">

                <Div className={classes.titleFonts}>
                  Opening hours
                </Div>

                <Div className={classes.titleFonts2}>
                  Mon: Closed
                </Div>

                <Div className={classes.titleFonts2}>
                  Tues: 10am - 7pm
                </Div>

                <Div className={classes.titleFonts2}>
                  Wed: 10am - 7pm
                </Div>

                <Div className={classes.titleFonts2}>
                  Thurs: 10am - 7:30pm
                </Div>

                <Div className={classes.titleFonts2}>
                  Fri: 10am - 7pm
                </Div>

                <Div className={classes.titleFonts2}>
                  Sat: 11am - 6pm
                </Div>

                <Div className={classes.titleFonts2}>
                  Sun: Closed
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      )}
    </Div>
  );
}

export default JournalHoraires;
