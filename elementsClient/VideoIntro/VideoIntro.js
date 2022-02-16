/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Div, redux, hookDeviceInfo } from 'components';
import dynamic from 'next/dynamic';
import ReactPlayer from 'react-player/lazy';

import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';
import Spam from '@/components/Typography/Spam';

const grid = {
  width: '101vw',
  height: '60vw',
};

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 4,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 600 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: 'white',
  },
}))(LinearProgress);

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    width: '30%',
  },
});

function LinearWithValueLabel({ playVideoState }) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 90 ? prevProgress : prevProgress + 10));
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={playVideoState === 1 ? 100 : progress} />
    </div>
  );
}

export default function VideoIntro({ parallaxVideo }) {
  const [stateRedux, dispatch] = redux();
  const [mutedX, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [playVideoState, setPlayVideo] = useState(0);
  const { hookWidth } = hookDeviceInfo();

  const playVideo = async (as) => {
    if (playVideoState !== 1) {
      setPlayVideo(1);
    }
  };

  const reactPlayerProps = {
    ...grid,
    className: 'VideoIntro',
    playing: playVideoState === 1,
    autoPlay: true,
    controls: false,
    // loop: true,
    url: parallaxVideo,
    playsinline: true,
    volume: mutedX ? 0 : 1,
    muted: mutedX,
    pip: false,
    onReady: (as) => playVideo(as),
    onPlay: (as) => { /* console.log('onPlay', as); */ setLoading(false); },
    // onBuffer: (as) => { console.log('onBuffer', as); },
    onError: (err) => console.log('onError video parallax', err),
    // onEnded: () => stopSwitch(),
    loop: true,
    style: {
      maxWidth: '2000px'
    }
  };

  const loadingProps = {
    width: '100%',
    height: '100%',
    style: {
      color: 'white',
      position: 'absolute',
      bottom: '15',
      right: '0%',
      background: 'black'
    }
  };

  const photoIntro = {
    src: '/images/homepage.png',
    style: {
      ...grid,
      objectFit: 'cover',
    },
  };

  return (
    <>
      <Div>
        {
            loading ? (
              <Div {...loadingProps}>
                <Div height="50%" width="100%" vertical="bottom">
                  <LinearWithValueLabel playVideoState={playVideoState} />
                </Div>
              </Div>
            ) : null
          }
        <Div
          style={{
            position: 'absolute', zIndex: 9999, width: '70%', height: '70%', maxHeight: hookWidth > 1280 ? '500px' : '40vw'
          }}
          horizontal="left"
          vertical="bottom"
        >
          <Div onClick={() => setMuted(!mutedX)}>
            {mutedX ? <VolumeOffIcon style={{ width: '30px', height: '30px' }} /> : <VolumeUpIcon style={{ width: '30px', height: '30px' }} /> }
          </Div>
        </Div>
        <Div style={{ visibility: loading ? 'hidden' : 'visible' }}>
          <ReactPlayer {...reactPlayerProps} />
        </Div>
      </Div>
    </>
  );
}

// vimeoConfig={{ playerOptions: { fullscreen: 0 } }}
