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

const Carousel = memo(({ currentSubCategories, hanldeClick, filter }) => {
  const classes = useStyles();
  const { hookWidth, type } = hookDeviceInfo();
  const [currentSlide, setCurrentSlide] = useState(0);
  const widhtMArg = React.useMemo(() => (hookWidth < 960 ? hookWidth : hookWidth < 1500 ? hookWidth - 100 : 1500), [hookWidth]);
  const visibles = widhtMArg / 400;
  const sizeList = React.useMemo(() => currentSubCategories.length, [currentSubCategories]);

  const [hover, setHover] = useState({});
  /*
const handleHover = (newHover) => {
setHover(newHover);
};
*/

  return (
    <Div width="calc(100% - 35px)">

      {hookWidth < 800
        ? (
          <Div width="100%">
            <Button
// disabled={currentSlide <= 0}
              disableRipple
              color="transparent"
              onClick={() => (currentSlide <= 0 ? false : setCurrentSlide(currentSlide - 1))}
              style={{
                position: 'absolute',
                top: hookWidth > 600 ? '350px' : '210px',
                left: `${(hookWidth / 2.0) - (widhtMArg / 2)}px`,
                zIndex: 9,
                width: '1px',
                background: 'transparent'
              }}
            >
              <ArrowBackIosRoundedIcon />
            </Button>
            <Button
              color="transparent"
// disabled={currentSlide >= sizeList - visibles}
              onClick={() => (currentSlide >= 2 - visibles ? false : setCurrentSlide(currentSlide + 1))}
              disableRipple
              style={{
                position: 'absolute',
                right: `${(hookWidth / 2.02) - (widhtMArg / 2)}px`,
                zIndex: 9,
                top: hookWidth > 600 ? '350px' : '210px',
                width: '1px',
                background: 'transparent'
              }}
            >
              <ArrowForwardIosRoundedIcon />
            </Button>
          </Div>
        ) : <Div />}

      <CarouselProvider
        naturalSlideWidth={350}
        naturalSlideHeight={250}
        totalSlides={3}
        visibleSlides={hookWidth < 800 ? 1 : 3}
        currentSlide={currentSlide}
        isIntrinsicHeight
// touchEnabled={false}
// dragEnabled={false}
// infinite
        style={{ width: `${widhtMArg}px`, justifyItems: 'stretch' }}
      >
        <Slider>
          {
currentSubCategories.map((val, i) => (
  <Slide
    index={0}
    key={`${i + 1 - 1}`}
    style={{
      marginLeft: widhtMArg < 900 ? '2px' : '10px', marginRight: widhtMArg < 900 ? '2px' : '10px', height: widhtMArg < 900 ? '250px' : '300px', zIndex: 1
    }}
  >

    <Div pointer width="100%" height="100%" onClick={() => hanldeClick(val.categoryName)} style={{ background: '#f0f0f0' }} onHover={() => setHover({ [val.categoryName]: false })}>

      <Div width="100%" height="100%" onHover={() => setHover({ [val.categoryName]: true })}>
        {hover[val.categoryName] ? (
          <Div pointer width="100%" height="100%" style={{ zIndex: '2', background: '#00000010' }}>
            <Image
              src={val.img ?? '/static/images/notPhoto.png'}
              alt="..."
              width="250%"
              height="250%"
              objectFit="contain"
            />
            {' '}
            <br />
            {
filter.subcategorie === val.categoryName ? (
  <Div pointer style={{ fontWeight: 'bold', fontFamily: 'GeorgiaLight', fontSize: '18px' }} horizontal="center" width="100%">
    {val.categoryName}
  </Div>
) : (
  <Div pointer style={{ fontFamily: 'GeorgiaLight', fontSize: '18px' }}>
    {val.categoryName}
  </Div>
)
}
          </Div>
        ) : (
          <Div>
            <Image
              src={val.img ?? '/static/images/notPhoto.png'}
              alt="..."
              width="250%"
              height="250%"
              objectFit="contain"
            />
            {' '}
            <br />
            {
filter.subcategorie === val.categoryName ? (
  <Div style={{ fontWeight: 'bold', fontFamily: 'GeorgiaLight', fontSize: '18px' }} horizontal="center" width="100%">
    {val.categoryName}
  </Div>
) : (
  <Div style={{ fontFamily: 'GeorgiaLight', fontSize: '18px' }}>
    {val.categoryName}
  </Div>
)
}
          </Div>
        )}

      </Div>

    </Div>

  </Slide>
))
}

        </Slider>
      </CarouselProvider>
      <Div height={['20px', '40px', '70px', '70px', '70px']} />
      <Div style={{ borderBottom: '1px solid black' }} width="100%" />
    </Div>
  );
});

export default Carousel;

/*
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
<Image src={(val && val.img) || '/static/images/notPhoto.png'} alt={val && val.category} className={classes.photoProduct} width="100%" height="100%" />
<br />
<Spam type="shopNowBlack">
{val.categoryName}
</Spam>
</Div>
) : (
<Div>
<Image src={(val && val.img) || '/static/images/notPhoto.png'} alt={val && val.category} className={classes.photoProduct} width="100%" height="100%" />
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
} */
