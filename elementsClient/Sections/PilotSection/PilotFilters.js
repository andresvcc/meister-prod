import React, { memo, useState } from 'react';
import { Div, redux } from 'components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SliderPrice from './SliderPrice';

const CheckBox = ({ checked }) => (
  <Div
    width="20px"
    height="20px"
    style={{
      borderRadius: '50%',
      border: checked ? '6px solid #18374C' : '1px solid #cbcbcb',
      margin: '2px 6px 2px 2px',
      backgroundcolor: '#fff',
      outline: 'none',
      WebkitFontSmoothing: 'antialiased'
    }}
  />
);

const CheckBoxType2 = ({ checked, color }) => (
  <Div
    width="26px"
    height="26px"
    style={{
      border: checked ? '2px solid black' : '1px solid #cbcbcb',
      margin: '2px 6px 2px 2px',
      background: 'white',
    }}
  >
    <Div
      width={checked ? '20px' : '26px'}
      height={checked ? '20px' : '26px'}
      pointer
      style={{
        margin: checked ? '1px 2px 1px 2px' : '0px',
        background: `${color}`,
        outline: 'none',
        WebkitFontSmoothing: 'antialiased'
      }}
    />
  </Div>
);

const FilterPlace = ({
  title, value, selected, select, open, setOpen, keyName, mobile
}) => (
  <Div width="100%">
    <Div width="100%" row horizontal="at" style={{ marginBottom: '4px' }} onClick={() => setOpen(open === keyName ? '' : keyName)}>
      <Div horizontal="left" row>
        <span style={{ textTransform: 'capitalize', marginLeft: '15px', fontFamily: 'GorgiaLight' }}>{title}</span>
        <span style={{
          textTransform: 'capitalize', marginLeft: '15px', fontFamily: 'GorgiaLight', color: 'gray'
        }}
        >
          {selected === 'none' ? 'All' : `${selected}`.replaceAll('¦', ', ')}
        </span>
      </Div>
      <ExpandMoreIcon style={{ transform: open === keyName ? 'rotate(-180deg)' : 'rotate(0deg)', transition: 'transform ease .3s' }} />
    </Div>
    <Div width="100%" horizontal="left" vertical="top" height={open === keyName ? '180px' : '0px'} style={{ overflowY: open === keyName ? 'auto' : 'hidden', transition: 'height ease .3s', paddingLeft: '10px' }}>
      {
          keyName === 'color' ? (
            <div>
              <Div row width="100%" horizontal="left" height="30px" onClick={() => select('none')}>
                <CheckBoxType2 checked={selected === 'none'} color="white" />
                <p style={{ fontFamily: 'GorgiaLight' }}>All</p>
              </Div>
            </div>
          ) : (
            <div>
              <Div row width="100%" horizontal="left" height="30px" onClick={() => select('none')}>
                <CheckBox checked={selected === 'none'} />
                <p style={{ fontFamily: 'GorgiaLight' }}>All</p>
              </Div>
            </div>
          )
      }
      {
          value.filter((val) => ['', ' '].indexOf(val) === -1).map((val, i) => (
            keyName === 'color' ? (
              <div key={`${val.key}${i + 1}`}>
                <Div row key={val} width="100%" horizontal="left" height="30px" onClick={() => select(val.key)}>
                  <CheckBoxType2 checked={`${selected}`.split('¦').indexOf(val.key) !== -1} color={val.value} />
                  <p style={{ fontFamily: 'GorgiaLight', fontWeight: `${selected}`.split('¦').indexOf(val.key) !== -1 ? 'bold' : 'lighter' }}>{`${val.key}`}</p>
                </Div>
              </div>
            ) : (
              <div key={val}>
                <Div row key={val} width="100%" horizontal="left" height="30px" onClick={() => select(val)}>
                  <CheckBox checked={`${selected}`.split('¦').indexOf(val) !== -1} />
                  <p style={{ fontFamily: 'GorgiaLight' }}>{val}</p>
                </Div>
              </div>
            )
          ))
        }
    </Div>
  </Div>
);

const FilterPrice = ({
  priceMin, priceMax, select, maxPrix, open, setOpen, mobile
}) => (
  <Div width="100%">
    <Div width="100%" row horizontal="at" style={{ marginBottom: '3px' }} onClick={() => setOpen(open === 'price' ? '' : 'price')}>
      <Div horizontal="left" row>
        <span style={{ textTransform: 'capitalize', marginLeft: '15px', fontFamily: 'GorgiaLight' }}>Price</span>

        <span style={{
          textTransform: 'capitalize', color: '#9a9a9a', marginLeft: '15px', fontFamily: 'GorgiaLight'
        }}
        >
          {priceMin === 'none' && priceMax === 'none' ? 'All' : `${priceMin === 'none' ? 'All' : priceMin} - ${priceMax === 'none' ? 'All' : priceMax}`}
        </span>
      </Div>

      <ExpandMoreIcon style={{ transform: open === 'price' ? 'rotate(-180deg)' : 'rotate(0deg)', transition: 'transform ease .3s' }} />
    </Div>
    <Div width="100%" height={open === 'price' ? '90px' : '0px'} style={{ overflowY: 'hidden', transition: 'height ease .3s' }}>
      <SliderPrice minMax={priceMin === 'none' && priceMax === 'none'} maxPrix={maxPrix} onChange={select} defaultValue={[priceMin === 'none' || priceMin === undefined ? 0 : parseInt(`${priceMin}`, 10), priceMax === 'none' || priceMax === undefined ? 5000 : parseInt(`${priceMax}`, 10)]} />
    </Div>
  </Div>
);

const Categorie = memo(({
  categories, setFilter, filter, products, productPilot = [], mobile
}) => {
  const categoriesFilters = [...new Set(products.map((val) => val.subcategorie))];

  const productFiltered = filter.subcategorie === 'none' ? products : products.filter((a) => `${filter.subcategorie}`.replaceAll(' ', '').split('¦').indexOf(a.subcategorie) !== -1);
  const brand = [...new Set(productFiltered.map((val) => val.brand))];
  const genre = [...new Set(productFiltered.map((val) => val.genre))];
  // const size = [...new Set(products.filter((a) => a.subcategorie === filter.subcategorie && a.sizesType !== ' ' && a.sizesType !== undefined).map((val) => val.sizesType))];
  const size = [...new Set(productFiltered.map((val) => val.sizesType))];
  const size2 = [...new Set([...size.map((a) => a.replaceAll(' ', '').split(',')).flat()])];
  const color = productFiltered.map((val) => Object.values(val.colors).filter((a) => a.colorName !== '').map((a) => ({ key: a.colorName, value: a.color }))).flat(1).filter((v, i, a) => a.findIndex((t) => (t.key === v.key)) === i);
  const maxPrix = productFiltered.length > 0 ? (productFiltered.sort((a, b) => a?.price - b?.price))[productFiltered.length - 1]?.price : 0;

  const selectFilter = ({ key, value }) => {
    if (key === 'subcategorie') {
      const arrSizes = filter[key].split('¦');
      const newSizeListSelected = [...new Set([...arrSizes])];
      const selectedList = newSizeListSelected.indexOf(value) !== -1 ? [...newSizeListSelected.filter((size) => size !== value)] : [...newSizeListSelected, value];
      const newSizeFilter = filter[key] === 'none' ? `${value}` : value === 'none' ? 'none' : selectedList.length > 0 ? selectedList.join('¦') : 'none';
      setFilter({
        ...filter, [key]: newSizeFilter, genre: 'none', priceMin: 'none', priceMax: 'none'
      });
    } else if (key === 'color') {
      const arrColors = filter[key].split('¦');
      const newColorListSelected = [...new Set([...arrColors])];
      const selectedList = newColorListSelected.indexOf(value) !== -1 ? [...newColorListSelected.filter((color) => color !== value)] : [...newColorListSelected, value];
      const newColorFilter = filter[key] === 'none' ? `${value}` : value === 'none' ? 'none' : selectedList.length > 0 ? selectedList.join('¦') : 'none';
      setFilter({
        ...filter, [key]: newColorFilter, genre: 'none', priceMin: 'none', priceMax: 'none'
      });
    } else if (key === 'size') {
      const arrSizes = filter[key].split('¦');
      const newSizeListSelected = [...new Set([...arrSizes])];
      const selectedList = newSizeListSelected.indexOf(value) !== -1 ? [...newSizeListSelected.filter((size) => size !== value)] : [...newSizeListSelected, value];
      const newSizeFilter = filter[key] === 'none' ? `${value}` : value === 'none' ? 'none' : selectedList.length > 0 ? selectedList.join('¦') : 'none';
      setFilter({
        ...filter, [key]: newSizeFilter, genre: 'none', priceMin: 'none', priceMax: 'none'
      });
    } else if (key === 'brand') {
      const arrSizes = filter[key].split('¦');
      const newSizeListSelected = [...new Set([...arrSizes])];
      const selectedList = newSizeListSelected.indexOf(value) !== -1 ? [...newSizeListSelected.filter((size) => size !== value)] : [...newSizeListSelected, value];
      const newSizeFilter = filter[key] === 'none' ? `${value}` : value === 'none' ? 'none' : selectedList.length > 0 ? selectedList.join('¦') : 'none';
      setFilter({
        ...filter, [key]: newSizeFilter, genre: 'none', priceMin: 'none', priceMax: 'none'
      });
    } else {
      setFilter({
        ...filter, [key]: value, priceMin: 'none', priceMax: 'none'
      });
    }
  };

  const selectPrice = ({ min, max }) => {
    setFilter({ ...filter, priceMin: min, priceMax: max });
  };

  const filters = {
    subcategorie: { title: 'Categorie', value: categoriesFilters },
    genre: { title: 'Sub Categorie', value: genre },
    brand: { title: 'Brand', value: brand },
    size: { title: 'Sizes', value: size2.length > 0 ? size2 : [] },
    color: { title: 'Colors', value: color },
  };

  const [open, setOpen] = useState('');

  const closeOnScroll = () => {
    if (open !== '') setOpen('');
  };

  React.useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', closeOnScroll);
    }
    watchScroll();
    return () => {
      window.removeEventListener('scroll', closeOnScroll);
    };
  });

  return (
    <Div width="100%" vertical="top">
      <Div
        width="100%"
        horizontal="left"
        style={{
          marginBottom: '6px', borderBottom: '1px solid #d4d4d4', paddingTop: '10px', paddingBottom: '15px', paddingLeft: '15px', fontFamily: 'GorgiaLight'
        }}
      >
        {`${productPilot.length} Results`}
      </Div>
      {
        Object.entries(filters).map(([key, value], i) => (
          <Div key={key} width="100%" style={{ marginBottom: '6px', borderBottom: '1px solid #d4d4d4' }}>
            <FilterPlace title={value.title} keyName={key} open={open} setOpen={setOpen} value={value.value} selected={filter[key]} select={(value) => selectFilter({ key, value })} mobile={mobile} />
            <Div height={5} />
          </Div>
        ))
      }
      <Div width="100%" style={{ marginBottom: '6px', borderBottom: '1px solid #d4d4d4' }}>
        <FilterPrice open={open} setOpen={setOpen} priceMin={filter?.priceMin} priceMax={filter?.priceMax} select={selectPrice} maxPrix={maxPrix} mobile={mobile} />
      </Div>
    </Div>
  );
});

export default Categorie;
