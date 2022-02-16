/* eslint-disable @next/next/no-img-element */
import React, {
  memo, useState, useRef, useMemo
} from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Div, hookDeviceInfo } from 'component';
import Image from 'next/image';
import Span from '@/components/Typography/Spam';
import imagine1 from '@/assets/img/sidebar-1.jpg';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={className}
      style={{ ...style, display: 'block', color: 'gray' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIosIcon
      className={className}
      style={{ ...style, display: 'block', color: 'gray' }}
      onClick={onClick}
    />
  );
}

const SliderTouch = memo(({
  arr = [], onChange = () => false, div, slidesToShow = [1, 3, 3, 5, 5], little, ...rest
}) => {
  const [selectBrand, setBrand] = useState(0);

  const sliderRef = useRef(null);

  const gotoBrand = (val) => {
    sliderRef.current.slickGoTo(val);
  };

  const handleChange = (val) => {
    onChange(arr[val]);
    setBrand(val);
  };

  const { hookWidth } = hookDeviceInfo();

  const widthBox = useMemo(() => {
    const maxWidth = 1600;
    if (hookWidth > maxWidth) return slidesToShow[4];
    if (hookWidth > 1280) return slidesToShow[3];
    if (hookWidth > 960) return slidesToShow[2];
    if (hookWidth > 600) return slidesToShow[1];
    return slidesToShow[0];
  }, [hookWidth]);

  return (
    <Slider
      ref={sliderRef}
      style={{
        width: little
          ? (hookWidth <= 600 ? 'calc(90% - 40px)' : 'calc(70% - 150px)')
          : (hookWidth <= 600 ? 'calc(90% - 40px)' : 'calc(100% - 150px)'),
        height: '8vh'
      }}
      centerMode
      infinite
      centerPadding="20px"
      slidesToShow={widthBox}
      swipeToSlide
        // --------------
      className="center"
      dots={false}
      speed={350}
      nextArrow={<SampleNextArrow />}
      prevArrow={<SamplePrevArrow />}
      afterChange={handleChange}
      {...rest}
    >
      {
            [...arr].map((val, i) => (

              <Div key={`${1 + i}`} {...div} height="8vh">
                <Div
                  onClick={() => gotoBrand(i)}
                  width="250px"
                  height="8vh"
                >
                  <img
                    src={`/images/MotoLogo/${val}.png`}
                    alt={`/images/MotoLogo/${val}.png`}
                    style={{
                      height: selectBrand === i ? '7vh' : '5vh', width: selectBrand === i ? '250px' : '200px', objectFit: 'contain', transition: 'all 0.2s'
                    }}
                  />
                </Div>
              </Div>

            ))
      }
    </Slider>
  );
});

SliderTouch.propTypes = {};

export default SliderTouch;
