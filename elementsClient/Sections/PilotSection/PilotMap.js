import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// material ui
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
// components
import { Div, redux, hookDeviceInfo } from 'components';
import styles from 'elementsClient/Cards/cardStyle';
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';
import CardAvatar from '@/components/Card/CardAvatar';
import Button from '@/components/CustomButtons/Button';
import Typography from '@/components/Typography/Spam';
import GridItem from '@/components/Grid/GridItem';

// elements

const useStyles = makeStyles(styles);

function ProducCard({ data }) {
  const [{ profilInfo }, dispatch] = redux();
  const { cartItems } = profilInfo;

  const {
    product,
    router,
    masterLoading,
  } = data;

  const [indexPhoto, setPhoto] = useState(0);
  const [indexColor, setColor] = useState(0);
  const [indexSize, setSize] = useState(0);
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const photo = product.colors[indexColor].photos[indexPhoto ? 1 : 0];
  const device = hookDeviceInfo();
  const classes = useStyles();

  const alReadyInBag = cartItems[`${product.id}¦${indexColor}¦${indexSize}`] === undefined;

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

  useEffect(() => (() => {
    setLoading(true);
  }), []);

  if (loading || masterLoading) {
    return (
      <Div>
        Loading...
      </Div>
    );
  }
  const handleHover = (hover) => {
    setHover(hover);
    if (!hover) {
      setColor(0);
      setSize(0);
    }
  };

  return (
    <Card>
      <Div onHover={(hover) => handleHover(hover)} horizontal="left" dev>
        <CardAvatar>
          <Div vertical="bottom" onClick={() => console.log('go to product id:', product.id)}>
            <Div width="100%" style={{ position: 'absolute', background: '#f7f6f470' }}>
              {hover ? (
                <Div row horizontal="at" width="100%">
                  <Div row>
                    {product.colors.map((val, i) => <Button onClick={() => setColor(i)} round justIcon className={classes.colorBt} key={val.color} style={{ background: val.color }} />)}
                  </Div>
                  <Div row />
                </Div>
              ) : null}
            </Div>
            <img src={product.colors[indexColor].photos[hover ? 1 : 0]} alt="..." className={classes.photoProduct} />
          </Div>
        </CardAvatar>
        {hover ? (
          <Button color="primary" className={classes.addToBagButton} onClick={addToBag}>
            {!alReadyInBag ? <span>alReadyInBag</span> : <span>add to bag</span>}
          </Button>
        ) : <Div height="24px" />}
        <CardBody className={classes.bodyCardProduct}>
          <h6>
            <Typography type="h6">
              {product.brand}
            </Typography>
          </h6>
          <h4>
            <Typography type="h4">
              {product.languages.EN.nameProduct}
            </Typography>
          </h4>
          <h5>
            <Typography type="h5">
              {product?.currency === '€' ? `${product.prix} €` : null }
              {product?.currency === '$' ? `$ ${product.prix}` : null }
              {product?.currency === 'CHF' ? `${product.prix} CHF` : null }
            </Typography>
          </h5>
        </CardBody>
      </Div>
    </Card>
  );
}

const option = ['JACKETS', '|', 'HELMETS', '|', 'GLOVES', '|', 'VISORS', '|', 'ALL'];
const sortOption = ['Lowest Price', 'Highest Price', 'Featured Items'];

export default function PilotMap(props) {
  const classes = useStyles();
  const { user, ...rest } = props;
  const [{ products }, dispatch] = redux();
  const [selectOption, setOption] = useState('ALL');
  const [brand, setBrand] = useState(null);
  const [sort, setSort] = useState(null);
  const [listProduct, setlistProduct] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const device = hookDeviceInfo();

  useEffect(() => {
    setLoading(true);
    setlistProduct([]);
    setBrands([]);
    setBrand(null);
    const listProductX = products.filter((val) => val.categorie === 'Motorcycle' && (selectOption === 'ALL' ? true : val.subcategorie.toUpperCase() === selectOption));
    const brandsX = [...new Set(listProductX.map((val, i) => val.genre))];
    setlistProduct(listProductX);
    setBrands(brandsX);
    setLoading(false);
  }, [selectOption]);

  useEffect(() => {
    if (brand === 'ALL') {
      const listProductX = products
        .filter((val) => val.categorie === 'Motorcycle' && (selectOption === 'ALL' ? true : val.subcategorie.toUpperCase() === selectOption));
      setlistProduct(listProductX);
    } else {
      const listProductX = products
        .filter((val) => val.categorie === 'Motorcycle' && (selectOption === 'ALL' ? true : val.subcategorie.toUpperCase() === selectOption))
        .filter((val) => val.genre === brand);
      setlistProduct(listProductX);
    }
  }, [brand]);

  const handleChangeFilter = (event) => {
    setBrand(event.target.value);
  };

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

  const changeCategorie = (val) => {
    if (!loading) {
      setBrand(null);
      setOption(val);
    }
  };

  const toHome = () => {
    router.push({
      pathname: '/',
      query: { ...(router.query || {}) },
    }).then(() => window.scrollTo({ top: 0, left: 0 }));
  };

  return (
    <Div width="100%">

      <Div width="100%" horizontal="left">
        <Breadcrumbs separator={<NavigateBeforeIcon fontSize="small" />}>
          <Div onClick={toHome}>
            <Typography type="subtitle2">
              Home
            </Typography>
          </Div>
          <Typography type="subtitle2">
            Pilot
          </Typography>
        </Breadcrumbs>
      </Div>

      <Div row width="80%" horizontal="at">
        {
          option.map((val, i) => (
            <Div key={`${i + 1}`} width={val === '|' ? 'auto' : '18%'} dev>
              <Div
                onClick={() => changeCategorie(val)}
                type={val === selectOption ? 'header1' : 'header2'}
              >

                <Typography type="subtitle2">
                  {val}
                </Typography>

              </Div>

            </Div>
          ))
        }
      </Div>

      <Div width="100%" height="15px" style={{ borderBottom: 'solid 1px grey' }} />

      <Div width="100%" horizontal="left" height="100px" row>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="FILTERBYBRAND">Brand</InputLabel>
          <Select
            labelId="select brand"
            id="select brand options"
            value={brand || 'ALL'}
            onChange={handleChangeFilter}
            label="Brand"
            MenuProps={{
              disableScrollLock: true,
            }}
          >
            <MenuItem value="ALL">
              <Typography type="subtitle2">ALL</Typography>
            </MenuItem>
            {brands.map((name) => (
              <MenuItem key={name} value={name}>
                <Typography type="subtitle2">{name}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
              <Typography type="subtitle2">Newest items</Typography>
            </MenuItem>
            {sortOption.map((name) => (
              <MenuItem key={name} value={name}>
                <Typography type="subtitle2">{name}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Div>

      <Div height={4} />
      <Div width="100%" row dev>
        {
            listProduct.map((product, i) => (
              <Div width="100px" key={`${i + 1}`}>
                List product
              </Div>
            ))
          }
      </Div>

    </Div>

  );
}
