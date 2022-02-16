import React, {
  memo, useState, useRef, useMemo, useEffect
} from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Div, hookDeviceInfo } from 'component';
import Span from '@/components/Typography/Spam';

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
  arr = [], onChange = () => false, div, slidesToShow = [1, 3, 3, 5, 5], little, selected, ...rest
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

  useEffect(() => {
    const indexSelected = arr.indexOf(selected);
    if (indexSelected !== -1 && indexSelected !== selectBrand) {
      gotoBrand(indexSelected);
    }
  }, [selected]);

  return (
    <Slider
      ref={sliderRef}
      style={{
        width: little
          ? (hookWidth <= 600 ? 'calc(90% - 40px)' : 'calc(70% - 150px)')
          : (hookWidth <= 600 ? 'calc(90% - 40px)' : 'calc(100% - 150px)'),
        height: '6vh'
      }}
      centerMode
      infinite
      centerPadding="20px"
      slidesToShow={widthBox}
      swipeToSlide
      // --------------
      className="center"
      dots={false}
      speed={400}
      nextArrow={<SampleNextArrow />}
      prevArrow={<SamplePrevArrow />}
      afterChange={handleChange}
      {...rest}
    >
      {
          [...arr].map((val, i) => (
            <Div key={`${1 + i}`} {...div}>
              <Div height="6vh" onClick={() => gotoBrand(i)}>
                <Span type={selectBrand === i ? 'serifTitleBold' : 'serifTitle'} style={{ ...hookWidth <= 960 ? { fontSize: '20px' } : {} }}>
                  {val}
                </Span>
              </Div>
            </Div>
          ))
       }
    </Slider>
  );
});

SliderTouch.propTypes = {};

export default SliderTouch;
