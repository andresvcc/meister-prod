import React, { useState, useEffect } from 'react';
import nextCookies from 'next-cookies';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slider from 'react-slick';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import { Div, redux, hookDeviceInfo } from 'component';
import Span from '@/components/Typography/Spam';
import Moto from './motoSVG';

const colors = {
  darkGrey: '#343434',
  grey: '#2f2f2f',
  lighGrey: '#707070',
  ultraLighGrey: '#E7E7E7',
  red: 'red',
  white: 'white',
  blue: '#2E5E80'
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ProducCard({ data }) {
  const [{ profilInfo }, dispatch] = redux();
  const { cartItems } = profilInfo;
  const {
    product,
    i,
    router,
    small
  } = data;
  const [indexPhoto, setPhoto] = useState(0);
  const [indexColor, setColor] = useState(0);
  const [indexSize, setSize] = useState(0);
  const photo = product.color[indexColor].colorPhoto[indexPhoto ? 1 : 0];
  const device = hookDeviceInfo();

  const alReadyInBag = cartItems[`${product.id}¦${indexColor}¦${indexSize}`] === undefined;

  const change = (value) => {
    setPhoto(value);
  };

  const toProduct = () => {
    router.push({
      pathname: `/product/${product.id}`,
      query: { ...(router.query || {}) },
    }).then(() => window.scrollTo({ top: 0, left: 0 }));
  };

  const addToBag = async () => {
    const temp = {
      id: product.id,
      color: indexColor,
      size: indexSize,
      qty: 1,
      date: new Date(),
      pathname: router.pathname,
      photo
    };

    if (cartItems[alReadyInBag] === undefined) {
      await dispatch({
        state: 'profilInfo',
        value: {
          cartItems: {
            ...cartItems,
            [`${product.id}¦${indexColor}¦${indexSize}`]: temp
          }
        }
      });

      await dispatch({
        state: 'dialogBag',
        value: 'true',
      });
    }
  };

  return (
    <Div width={device.width > 950 ? '25%' : '33%'} onHover={change}>
      <Div width={device.width <= 950 ? '90%' : '95%'} style={{ backgroundColor: '#FaFaFa' }} vertical="top">
        <Div width="100%" height={device.width <= 950 ? '35vw' : '12vw'} onClick={toProduct}>
          <img
            src={`/images/${photo}`}
            alt="product motorcycle"
            style={{
              width: '100%',
              maxWidth: '100%',
              height: device.width <= 950 ? '35vw' : '12vw',
              objectFit: 'cover',
            }}
          />
        </Div>
        <div
          style={{
            position: 'relative',
            width: '100%'
          }}
        >
          <div
            style={{
              width: '100%',
              position: 'absolute',
              top: device.width > 950 ? '-50px' : '-40px',
              background: '#FFFFFF80'
            }}
          >
            <Div width="100%">
              {indexPhoto || device.width <= 950 ? (
                <Div
                  width="100%"
                >
                  {
                    device.width > 950 ? (
                      <Div width="99%" row>
                        <Div width="30%" heigth="38px" horizontal="left" row>
                          {
                          product.color.map((val, i) => (
                            <Div width="30px" key={`${i + val.colorRef}`}>
                              <Div
                                onClick={() => setColor(i)}
                                horizontal="left"
                                width="26px"
                                heigth="26px"
                                style={{
                                  height: '17px',
                                  width: '17px',
                                  borderRadius: '100%',
                                  backgroundColor: val.colorRef,
                                }}
                              />
                            </Div>
                          ))
                        }
                        </Div>
                        <Div width="70%" horizontal="right" vertical="top" row>
                          {
                            product.sizes.map((val, i) => (
                              <Div key={`${i + val.label}`} row>
                                <Span
                                  onClick={() => setSize(i)}
                                  type={indexSize === i ? 'link1A' : 'link1AB'}
                                >
                                  {val.label}
                                </Span>
                                <Div width="0.5vw" />
                              </Div>
                            ))
                          }
                        </Div>
                      </Div>
                    ) : null
                  }
                  <Div
                    onClick={addToBag}
                    style={{ backgroundColor: alReadyInBag ? '#2E5E80' : colors.lighGrey }}
                    width="100%"
                    height="5vh"
                  >
                    <Span onClick={addToBag} type="link6">
                      {alReadyInBag ? 'Add to Bag' : 'ALREADY IN BAG'}
                    </Span>
                  </Div>
                </Div>
              ) : null}
            </Div>
          </div>
        </div>
        <Div height="1vw" />
        <Div width="90%" horizontal="left">
          <Span type="link3A">
            {product.marque}
          </Span>
        </Div>
        <Div width="90%" horizontal="left">
          <Span type="link1A">
            {product.name}
          </Span>
        </Div>
        <Div width="90%" horizontal="left">
          <Span type="link1AB">
            {`${product.prix} CHF`}
          </Span>
        </Div>
        <Div height="5px" />
      </Div>
      <Div height="1vw" />
    </Div>
  );
}

const sortOption = ['Lowest Price', 'Highest Price', 'Featured Items'];
const brand = [
  {
    label: 'Hyundai'
  },
  {
    label: 'Honda'
  },
  {
    label: 'Bmw'
  },
  {
    label: 'Triumph'
  },
  {
    label: 'Ducati'
  },
  {
    label: 'Zuzuki'
  }
];

const iniCategorie = [
  {
    label: 'ENGINE',
    subCategorie: [
      {
        label: 'EXHAUST'
      },
      {
        label: 'POWER KIT PARTS'
      },
      {
        label: 'AIR FILTERS'
      },
      {
        label: 'OTHERS'
      }
    ]
  },
  {
    label: 'ELECTRICS',
    subCategorie: [
      {
        label: 'sub ELECTRICS 1'
      },
      {
        label: 'sub ELECTRICS 2'
      },
      {
        label: 'sub ELECTRICS 3'
      },
      {
        label: 'sub ELECTRICS 4'
      }
    ]
  },
  {
    label: 'CHASSIS',
    subCategorie: [
      {
        label: 'sub CHASSIS 1'
      },
      {
        label: 'sub CHASSIS 2'
      },
      {
        label: 'sub CHASSIS 3'
      },
      {
        label: 'sub CHASSIS 4'
      }
    ]
  },
  {
    label: 'COCKPIT',
    subCategorie: [
      {
        label: 'sub COCKPIT 1'
      },
      {
        label: 'sub COCKPIT 2'
      },
      {
        label: 'sub COCKPIT 3'
      },
      {
        label: 'sub COCKPIT 4'
      }
    ]
  },
  {
    label: 'LUGGAGE',
    subCategorie: [
      {
        label: 'sub LUGGAGE 1'
      },
      {
        label: 'sub LUGGAGE 2'
      },
      {
        label: 'sub LUGGAGE 3'
      },
      {
        label: 'sub LUGGAGE 4'
      }
    ]
  },
  {
    label: 'OTHER',
    subCategorie: [
      {
        label: 'sub LAST 1'
      },
      {
        label: 'sub LAST 2'
      },
      {
        label: 'sub LAST 3'
      },
      {
        label: 'sub LAST 4'
      }
    ]
  },
  {
    label: 'BAGS',
    subCategorie: [
      {
        label: 'sub BAGS 1'
      },
      {
        label: 'sub BAGS 2'
      },
      {
        label: 'sub BAGS 3'
      },
      {
        label: 'sub BAGS 4'
      }
    ]
  },
];

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

export default function PartMap(props) {
  const classes = useStyles();
  const { user, ...rest } = props;
  const [{ productList }, dispatch] = redux();
  const [sort, setSort] = useState(null);
  const [listProduct, setlistProduct] = useState([]);
  const router = useRouter();
  const device = hookDeviceInfo();
  const [selectBrand, setBrand] = useState(0);
  const [selectCategorie, setCategorie] = useState(0);
  const [selectSubCategorie, setSubCategorie] = useState(0);

  const settingsCategorie = {
    className: 'center',
    centerMode: true,
    dots: false,
    infinite: true,
    // centerPadding: '60px',
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 400,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (current) => setCategorie(current)
  };

  const settingsSubCategorie = {
    className: 'center',
    centerMode: true,
    dots: false,
    infinite: true,
    // centerPadding: '60px',
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (current) => setSubCategorie(current)
  };

  const settingsBrand = {
    className: 'center',
    centerMode: true,
    dots: false,
    infinite: true,
    // centerPadding: '60px',
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 400,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (current) => setBrand(current)
  };

  useEffect(() => {
    const listProductX = [...Object.values(productList)].filter((val) => val.categorie === 'Parts');
    setlistProduct(listProductX);
  }, []);

  const handleChangeSort = (event) => {
    const sortBy = event.target.value;
    setSort(sortBy);
    if (sortBy === 'Lowest Price') {
      const tempList = listProduct.sort((a, b) => a.prix - b.prix);
      setlistProduct(tempList);
    } else if (sortBy === 'Highest Price') {
      const tempList = listProduct.sort((a, b) => b.prix - a.prix);
      setlistProduct(tempList);
    } else if (sortBy === 'Featured Items') {
      const tempList = listProduct.sort((a, b) => a.popularity - b.popularity);
      setlistProduct(tempList);
    } else if (sortBy === 'Newest items') {
      const tempList = listProduct.sort((a, b) => a.newest - b.newest);
      setlistProduct(tempList);
    }
  };

  const toHome = () => {
    router.push({
      pathname: '/',
      query: { ...(router.query || {}) },
    }).then(() => window.scrollTo({ top: 0, left: 0 }));
  };

  let sliderCategorie;
  let sliderSubCategorie;
  let sliderBrand;

  const goToCategorie = (val) => {
    if (selectCategorie === val) {
      router.push({
        pathname: router.pathname,
        query: { ...(router.query || {}) },
      }).then(() => window.scrollTo({ top: (device.height / 100) * 80, left: 0, behavior: 'smooth' }));
    } else {
      sliderCategorie.slickGoTo(val);
      setTimeout(() => {
        router.push({
          pathname: router.pathname,
          query: { ...(router.query || {}) },
        }).then(() => window.scrollTo({ top: (device.height / 100) * 80, left: 0, behavior: 'smooth' }));
      }, 700);
    }
  };

  const goToSubCategorie = (val) => {
    sliderSubCategorie.slickGoTo(val);
  };

  const gotoBrand = (val) => {
    sliderBrand.slickGoTo(val);
  };

  return (
    <Div width="100%">
      <Div width="100%" horizontal="left">
        <Breadcrumbs separator={<NavigateBeforeIcon fontSize="small" />}>
          <Span type="link4" onClick={toHome}>
            Home
          </Span>
          <Span type="link2">
            Parts
          </Span>
        </Breadcrumbs>
      </Div>

      <Div width="100%" height="1vw" />

      <Slider {...settingsBrand} ref={(c) => { sliderBrand = c; }} style={{ width: '94%', height: '6vh' }}>
        {
          brand.map((val, i) => (
            <Div key={`${1 + i}`}>
              <Div>
                <Div width="95%" height="6vh">
                  <Span type={selectBrand === i ? 'link1A' : 'link1AB'} onClick={() => gotoBrand(i)}>
                    {val.label}
                  </Span>
                </Div>
              </Div>
            </Div>
          ))
        }
      </Slider>

      <Div width="100%" height="2vh" />

      <Moto data={{
        goToCategorie,
        goToSubCategorie
      }}
      />

      <Div width="85%" height="5px" style={{ borderBottom: 'solid 1px #707070' }} />
      <Slider {...settingsCategorie} ref={(c) => { sliderCategorie = c; }} style={{ width: '94%', height: '6vh' }}>
        {
          iniCategorie.map((val, i) => (
            <Div key={`${1 + i}`}>
              <Div>
                <Div width="95%" height="6vh">
                  <Span type={selectCategorie === i ? 'link1A' : 'link1AB'} onClick={() => goToCategorie(i)}>
                    {val.label}
                  </Span>
                </Div>
              </Div>
            </Div>
          ))
        }
      </Slider>

      <Div width="85%" height="5px" row>
        <Div width="45%" height="5px" style={{ borderTop: 'solid 1px #707070' }} />
        <Div width="10%" height="5px" />
        <Div width="45%" height="5px" style={{ borderTop: 'solid 1px #707070' }} />
      </Div>

      <Slider {...settingsSubCategorie} ref={(c) => { sliderSubCategorie = c; }} style={{ width: '55%', height: '4vh' }}>
        {
          iniCategorie[selectCategorie].subCategorie.map((val, i) => (
            <Div key={`${1 + i}`}>
              <Div>
                <Div width="90%" height="4vh">
                  <Span type={selectSubCategorie === i ? 'link4A' : 'link5'} onClick={() => goToSubCategorie(i)}>
                    {val.label}
                  </Span>
                </Div>
              </Div>
            </Div>
          ))
        }
      </Slider>

      <Div width="100%" height="3vw" style={{ borderBottom: `solid 1px ${colors.ultraLighGrey}` }} />
      <Div width="100%" horizontal="left" row>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="SORTBY">Sort by:</InputLabel>
          <Select
            labelId="select sort"
            id="select sort options"
            value={sort || 'Newest items'}
            onChange={handleChangeSort}
            label="Sort"
            MenuProps={{
              disableScrollLock: true,
            }}
          >
            <MenuItem value="Newest items">
              <Span type="link4">Newest items</Span>
            </MenuItem>
            {sortOption.map((name) => (
              <MenuItem key={name} value={name}>
                <Span type="link4">{name}</Span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Div>
      <Div height="10px" />
      <div style={{ width: '100%', minHeight: '40vh' }}>
        <Div width="100%" flexBox>
          {
            listProduct.map((product, i) => (
              <Div>
                {i}
              </Div>
            ))
          }
        </Div>
      </div>
    </Div>

  );
}
