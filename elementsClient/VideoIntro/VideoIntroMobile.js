/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Div } from 'components';
import ReactPlayer from 'react-player/lazy';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

const grid = {
  width: '101vw',
  height: '58vw',
};

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 5,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: 'grey',
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
    width: '50%',
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

export default function VideoIntro({ parallaxVideo, parallaxImage }) {
  const [mutedX, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [playVideoState, setPlayVideo] = useState(0);

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
      position: 'relative',
      top: '12px'
    }
  };

  const muledButtonProps = {
    width: '100%',
    horizontal: 'left',
    onClick: () => setMuted(!mutedX),
    style: {
      color: 'white',
      position: 'absolute',
      bottom: 15,
      left: 5,
      zIndex: 10
    }
  };

  const loadingProps = {
    ...grid,
    height: `calc(${grid.height} - 20px)`,
    style: {
      color: 'white',
      position: 'absolute',
    }
  };

  return (
    <>
      <Div style={{ background: 'black', marginTop: '55px' }} {...grid}>
        {
          loading ? (
            <Div {...loadingProps} vertical="bottom">
              <LinearWithValueLabel playVideoState={playVideoState} />
            </Div>
          ) : null
        }
        <Div style={{
          visibility: loading ? 'hidden' : 'visible', position: 'relative', top: '12px', left: 0
        }}
        >
          <ReactPlayer {...reactPlayerProps} />
          {
                playVideoState === 1 ? (
                  <Div {...muledButtonProps}>
                    {mutedX ? <VolumeOffIcon style={{ width: '30px', height: '30px' }} /> : <VolumeUpIcon style={{ width: '30px', height: '30px' }} /> }
                  </Div>
                ) : null
              }
        </Div>
      </Div>
    </>
  );
}

// vimeoConfig={{ playerOptions: { fullscreen: 0 } }}
