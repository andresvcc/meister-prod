/*eslint-disable*/
import React from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// core components
import { infoColor, title } from '@/assets/jss/nextjs-material-dashboard-pro';
import {LinearProgress} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

const useStyles = makeStyles({
  progress: {
    color: 'white',
    width: '6rem !important',
    height: '4px !important',
  },
  wrapperDiv: {
    margin: '100px auto',
    padding: '0px',
    maxWidth: '360px',
    textAlign: 'center',
    position: 'relative',
    zIndex: '9999',
    top: '0',
  },
  iconWrapper: {
    display: 'block',
  },
  title: {
    ...title,
    color: '#FFFFFF',
  },
});

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 4,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: 'black',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: 'white',
  },
}))(LinearProgress);

function PageChange1() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.wrapperDiv}>
        <div className={classes.iconWrapper}>
          <BorderLinearProgress className={classes.progress} />
        </div>
      </div>
    </div>
  );
}

function PageChange2() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.wrapperDiv}>
        <div className={classes.iconWrapper}>
          <CircularProgress className={classes.progress} />
        </div>
      </div>
    </div>
  );
}

function PageChange3() {
  return (
    <div>
    </div>
  );
}


export default PageChange1