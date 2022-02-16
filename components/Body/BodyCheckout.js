import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Div from '@/components/Div/Div';

const makeComponentStyles = makeStyles((theme) => ({
  mainRaised: {
    background: '#F1EFEA',
    position: 'relative',
    zIndex: '0',
    margin: '-80px 0px 0px',
    borderRadius: '0px',
    width: '100%',
    height: '150vh',
  },
  insideLayout: {
    background: 'transparent',
    position: 'relative',
    zIndex: '3',
    margin: '-60px 0px 0px',
    borderRadius: '0px',
    width: 'calc(100% - 2px)',
    [theme.breakpoints.only('xs')]: {
      paddingLeft: '10px',
      paddingRight: '10px',
      width: 'calc(100% - 2px)',
    },
    [theme.breakpoints.only('sm')]: {
      width: 'calc(100% - 2px)',
    },
    [theme.breakpoints.only('md')]: {
      width: 'calc(100% - 2px)',
    },
    [theme.breakpoints.only('lg')]: {
      width: '1240px',
    },
    [theme.breakpoints.only('xl')]: {
      width: '1400px'
    },
    // '@media (max-width:1400px)': {
    //  width: '100%'
    // },
  },
}));

const Body = React.forwardRef((props, ref) => {
  const {
    children,
    ...rest
  } = props;

  const classes = makeComponentStyles();

  return (
    <div className={classes.mainRaised} {...rest}>
      <Div width="100%">
        <div className={classes.insideLayout}>
          <Div width="100%" horizontal="left">
            <Div height="140px" />
            <Div width="100%" style={{ background: '#d8d8d8' }}>
              <span style={{ fontSize: '0.7em', color: '#717171' }}>NEED ASSISTANCE? CALL ON 020 3950 3532 OR EMAIL INFO@MEISTER.COM</span>
            </Div>
            {children}
          </Div>
        </div>
      </Div>
    </div>
  );
});

export default Body;
