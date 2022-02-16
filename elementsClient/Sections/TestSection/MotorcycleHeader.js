import React, { useState, memo } from 'react';
import Image from 'next/image';
import { Div, hookDeviceInfo } from 'component';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {
  CarouselProvider, Slider, Slide
} from 'pure-react-carousel';
import Button from '@/components/CustomButtons/Button';
import Spam from '@/components/Typography/Spam';
import styles from './cardStyle';
import HomePub from './HomePubTest';
import HomePub2 from './HomePubTest2';

import 'pure-react-carousel/dist/react-carousel.es.css';

const useStyles = makeStyles(styles);

const Carousel = memo(({ hanldeClick }) => {
  const classes = useStyles();
  const { hookWidth, type } = hookDeviceInfo();
  const [currentSlide, setCurrentSlide] = useState(0);
  const widhtMArg = React.useMemo(() => (hookWidth < 960 ? hookWidth : hookWidth < 1500 ? hookWidth - 100 : 1500), [hookWidth]);
  const visibles = widhtMArg / 300;
  const [hover, setHover] = useState({});
  /*
    const handleHover = (newHover) => {
    setHover(newHover);
  };
  */

  const currentSubCategories = [1, 2, 3, 4];

  return (
    <Div width="100%">

      <Image src="/static/images/MotoTest.png" alt="..." width="1200px" height="550px" className={classes.photoProduct} />
      <HomePub2 />
      <HomePub />

    </Div>
  );
});

export default Carousel;
