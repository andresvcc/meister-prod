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
import 'pure-react-carousel/dist/react-carousel.es.css';

const useStyles = makeStyles(styles);

const Carousel = memo(({ currentSubCategories, hanldeClick }) => {
  const classes = useStyles();
  const { hookWidth, type } = hookDeviceInfo();
  const [currentSlide, setCurrentSlide] = useState(0);
  const widhtMArg = React.useMemo(() => (hookWidth < 960 ? hookWidth : hookWidth < 1500 ? hookWidth - 100 : 1500), [hookWidth]);
  const sizeList = React.useMemo(() => currentSubCategories.length, [currentSubCategories]);
  const visibles = widhtMArg / 300;
  const [hover, setHover] = useState({});
  /*
    const handleHover = (newHover) => {
    setHover(newHover);
  };
  */

  if (currentSubCategories === undefined) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <Div width="calc(100% - 35px)">
      <Button
        disableRipple
        // disabled={currentSlide <= 0}
        color="transparent"
        onClick={() => (currentSlide <= 0 ? false : setCurrentSlide(currentSlide - 1))}
        style={{
          position: 'absolute',
          left: `${(hookWidth / 2.1) - (widhtMArg / 2)}px`,
          zIndex: 9,
          width: '1px',
          background: 'transparent'
        }}

      >
        <ArrowBackIosRoundedIcon />
      </Button>
      <Button
        color="transparent"
        disableRipple
        // disabled={currentSlide >= sizeList - visibles}
        onClick={() => (currentSlide >= sizeList - visibles ? false : setCurrentSlide(currentSlide + 1))}
        style={{
          position: 'absolute',
          right: `${(hookWidth / 2.1) - (widhtMArg / 2)}px`,
          zIndex: 9,
          width: '1px',
          backgroundColor: 'transparent',
        }}
      >
        <ArrowForwardIosRoundedIcon />
      </Button>
      <CarouselProvider
        naturalSlideWidth={255}
        naturalSlideHeight={240}
        totalSlides={sizeList}
        visibleSlides={visibles}
        currentSlide={currentSlide}
        isIntrinsicHeight
        // touchEnabled={false}
        // dragEnabled={false}
        // infinite
        style={{ width: `${widhtMArg}px`, justifyItems: 'start' }}
      >
        <Slider>
          {
            currentSubCategories.map((val, i) => (
              <Slide
                index={0}
                key={`${i + 1 - 1}`}
                style={{
                  marginLeft: '10px', marginRight: '10px', height: '240px', zIndex: 1
                }}
              >
                <Div width="100%" height="100%" onClick={() => hanldeClick(val.categoryName)} style={{ background: '#f0f0f0' }} onHover={() => setHover({ [val.categoryName]: false })}>

                  <Div width="100%" height="100%" onHover={() => setHover({ [val.categoryName]: true })}>
                    {hover[val.categoryName] ? (
                      <Div width="100%" height="100%" style={{ zIndex: '2', background: '#00000010' }}>
                        <Image src={(val && val.img) || '/static/images/notPhoto.png'} alt={val && val.category} className={classes.photoProduct} width="180%" height="180%" />
                        <br />
                        <Spam type="shopNowBlack">
                          {val.categoryName}
                        </Spam>
                      </Div>
                    ) : (
                      <Div>
                        <Image src={(val && val.img) || '/static/images/notPhoto.png'} alt={val && val.category} className={classes.photoProduct} width="180%" height="180%" />
                        <br />
                        <Spam type="shopNowBlack">
                          {val.categoryName}
                        </Spam>
                      </Div>
                    )}

                  </Div>

                </Div>
              </Slide>
            ))
          }
        </Slider>
      </CarouselProvider>

    </Div>
  );
}, (prevProps, nextProps) => (
  JSON.stringify(prevProps.currentSubCategories) === JSON.stringify(nextProps.currentSubCategories)
  && nextProps.currentSubCategories.length > 0
));

export default Carousel;
