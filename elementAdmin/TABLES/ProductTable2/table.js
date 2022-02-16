/* eslint-disable @next/next/no-img-element */
import React, { useState, useMemo, useEffect } from 'react';
import LabelIcon from '@material-ui/icons/Label';
import { Div, redux } from 'components';
// material-ui components
import { makeStyles } from '@material-ui/core/styles';
// material-ui icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import EditIcon from '@material-ui/icons/Edit';
import SweetAlert from 'react-bootstrap-sweetalert';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// core components
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Select from '@material-ui/core/Select';
import Checkbox from '@/components/CustomInput/CustomCheckBox';
import Options from '@/components/CustomInput/CustomOptions';
import Table from '@/components/Table/Table';
import Button from '@/components/CustomButtons/Button';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/extendedTablesStyle';
import styles2 from '@/assets/jss/nextjs-material-dashboard-pro/views/sweetAlertStyle';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import TextField from '@/components/CustomInput/CustomInput';
import SliderPrice from './SliderPrice';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const useStyles2 = makeStyles(styles2);
const useStyles = makeStyles(styles);

const styleHeader = {
  paddingTop: '8px'
};

const RattingController = ({ val, setValue }) => {
  const [localValue, setLocalValue] = useState(val.rating || 0);

  const handleChange = (newValue) => {
    setLocalValue(newValue);
    setValue(val.product, newValue);
  };

  useEffect(() => {
    setLocalValue(val.rating || 0);
  }, [val.rating]);

  return (
    <Rating
      id={val.id}
      name={`rating ${val.product} ${val.id}`}
      value={localValue}
      onChange={(event, newValue) => {
        event.preventDefault();
        handleChange(newValue);
      }}
      emptyIcon={<StarBorderIcon fontSize="inherit" style={{ width: '25px', height: '25px' }} />}
      icon={<StarIcon fontSize="inherit" style={{ width: '25px', height: '25px', color: '#ffaf00' }} />}
    />
  );
};

const TagsController = ({
  val, setTags, classes, box = false
}) => {
  const {
    id
  } = val;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorElColor, setAnchorElColor] = useState(null);
  const openColor = Boolean(anchorElColor);

  const [selectColor, setSelectColor] = useState(val?.tag?.color ?? 'red');
  const [textTag, setTextTag] = useState(val?.tag?.label ?? '');
  const [check, setCheck] = useState(val?.tag?.actif ?? false);

  const handleOpen = (currentTarget) => {
    setAnchorEl(currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenColor = (currentTarget) => {
    setAnchorElColor(currentTarget);
  };

  const handleCloseColor = () => {
    setAnchorElColor(null);
  };

  const select = (option) => {
    setAnchorElColor(null);
    setSelectColor(option);
  };

  const apply = () => {
    setAnchorElColor(null);
    setAnchorEl(null);
    setTags(val.product, { color: selectColor, label: textTag, actif: check });
  };

  const notApply = () => {
    setAnchorElColor(null);
    setAnchorEl(null);
  };

  return (
    <>
      {box ? (
        <Button className={classes.actionButton} color="info" onClick={(event) => handleOpen(event.currentTarget)} style={{ width: 'calc(100% - 5px)' }}>
          <LocalOfferIcon className={classes.icon} />
        </Button>
      ) : (
        <Button
          color="info"
          size="sm"
          round
          className={classes.middleButton}
          style={{ width: '20px' }}
          onClick={(event) => handleOpen(event.currentTarget)}
        >
          <LocalOfferIcon className={classes.icon} />
        </Button>
      )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <Div width="100%" style={{ padding: '5px 10px 5px 10px', background: '#18374C', color: 'white' }} horizontal="at" row>
          <span>Tags settings </span>
          <Div
            width="20px"
            height="20px"
            onClick={handleClose}
            style={{ background: 'red', borderRadius: '50%', padding: '12px' }}
          >
            <CloseIcon style={{ width: '18px', height: '18px' }} />
          </Div>
        </Div>
        <Div width="310px" horizontal="left" vertical="top" style={{ padding: '5px' }}>
          <Div width="calc(100% - 5px)" row horizontal="left" height="80px">
            <Div width="10%">
              <Checkbox label="" labelPlacement="end" center onChange={(check) => setCheck(check)} initialValue={check} style={{ marginLeft: '10px' }} />
            </Div>

            {
              check === true ? (
                <>
                  <Div height="75px" width="20%">
                    <Button className={classes.actionButton} color="white" link onClick={(event) => handleOpenColor(event.currentTarget)}>
                      <div style={{
                        width: '25px', height: '25px', background: selectColor, borderRadius: '50%', margin: '3px 3px 0px 3px', padding: '2px 2px 0px 2px'
                      }}
                      />
                      <ArrowDropDownIcon style={{ width: '20px', height: '20px' }} />
                    </Button>
                    <Popover
                      id={`${id} color`}
                      open={openColor}
                      anchorEl={anchorElColor}
                      onClose={handleCloseColor}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <Div style={{ padding: '4px' }}>
                        {
                  ['red', 'blue', 'green', 'pink', 'orange', 'violet'].map((option, i) => (
                    <Div key={`${option} ${i + 1}`}>
                      <Div onClick={() => select(option)}>
                        <div style={{
                          width: '25px', height: '25px', background: option, borderRadius: '50%', margin: '3px', padding: '2px'
                        }}
                        />
                      </Div>
                    </Div>
                  ))
                }
                      </Div>
                    </Popover>
                  </Div>
                  <Div height="75px" width="70%" row>
                    <TextField
                      label="Tag Label"
                      id={`tang text ${val.product}`}
                      initialValue={textTag}
                      onChange={({ value }) => setTextTag(value)}
                    />
                  </Div>
                </>
              ) : (
                <Div height="75px" width="70%">
                  not Tag
                </Div>
              )
            }

          </Div>
          <Div width="calc(100% - 5px)" row horizontal="around">
            <Button color="transparent" link style={{ width: '100%' }} onClick={notApply}>
              Close
            </Button>
            <Button color="info" style={{ width: '100%' }} onClick={apply}>
              Apply
            </Button>
          </Div>
        </Div>
      </Popover>
    </>
  );
};

const StockController = ({
  val, setStock, classes, box = false
}) => {
  const {
    id, Provider = [], stock = {}, colors = [], sizesType = '',
  } = val;

  const [anchorElproduct, setAnchorElProduct] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedStock, setSelectedStock] = useState({ ...stock });
  const [colorSelected, setColorSelected] = useState(null);
  const openproduct = Boolean(anchorElproduct);

  const handleOpen = (currentTarget) => {
    setAnchorElProduct(currentTarget);
  };

  const handleClose = () => {
    setAnchorElProduct(null);
    setSelected(null);
    setColorSelected(null);
  };

  const handleSelect = (selected) => {
    setSelected(selected);
    if (colors.length > 0) setColorSelected(colors[0].colorName);
  };

  const changeSizeValue = ({ size, value }) => {
    

    setSelectedStock({
      ...selectedStock,
      [selected]: {
        ...selectedStock?.[selected],
        [colorSelected]: {
          ...selectedStock?.[selected]?.[colorSelected],
          [size]: value
        }
      }
    });
  };

  const activeSize = ({ size, check }) => {
    if (check === false) {
      return setSelectedStock({
        ...selectedStock,
        [selected]: {
          ...selectedStock?.[selected],
          [colorSelected]: {
            ...selectedStock?.[selected]?.[colorSelected],
            [size]: undefined
          }
        }
      });
    }
    setSelectedStock({
      ...selectedStock,
      [selected]: {
        ...selectedStock?.[selected],
        [colorSelected]: {
          ...selectedStock?.[selected]?.[colorSelected],
          [size]: 0
        }
      }
    });
  };

  const apply = () => {
    setSelected(null);
    setColorSelected(null);
    setStock(val.product, selectedStock);
  };

  const notApply = () => {
    setSelected(null);
    setColorSelected(null);
  };

  return (
    <>
      {box ? (
        <Button className={classes.actionButton} color="info" onClick={(event) => handleOpen(event.currentTarget)}>
          <GroupWorkIcon className={classes.icon} />
        </Button>
      ) : (
        <Button
          color="info"
          size="sm"
          round
          className={classes.lastButton}
          style={{ width: '20px' }}
          onClick={(event) => handleOpen(event.currentTarget)}
        >
          <GroupWorkIcon className={classes.icon} />
        </Button>
      )}

      <Popover
        id={id}
        open={openproduct}
        anchorEl={anchorElproduct}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <Div width="100%" horizontal="left" vertical="top">

          <Div width="100%" style={{ padding: '5px 10px 5px 10px', background: '#18374C', color: 'white' }} horizontal="at" row>
            <span>Stock</span>
            <Div
              width="20px"
              height="20px"
              onClick={handleClose}
              style={{ background: 'red', borderRadius: '50%', padding: '12px' }}
            >
              <CloseIcon style={{ width: '18px', height: '18px' }} />
            </Div>
          </Div>

          <Div style={{ padding: '10px 10px 10px 10px', minWidth: '330px', minHeight: '435px' }} vertical="top">
            {
              selected !== null ? (
                <Div width="100%" horizontal="left">
                  {selected}

                  <Div width="100%" row horizontal="at">
                    <Div>
                      <span>{capitalize(`${colorSelected ?? 'Color'}`)}</span>
                    </Div>

                    <Div row>
                      {colors.map(({ color, colorName }, i) => {
                        if (colorName === 'colourless') {
                          return (
                            <Div
                              key={`${colorName} ${i + 1}`}
                              style={{
                                background: color, borderRadius: '50%', width: '25px', height: '25px', padding: '2px', margin: '3px', border: colorSelected === colorName ? 'solid 3px black' : 'none'
                              }}
                              onClick={() => setColorSelected(colorName)}
                            >
                              <NotInterestedIcon style={{ color: 'red', width: '23px', height: '23px' }} />
                            </Div>
                          );
                        }

                        if (colorName === 'transparent') {
                          return (
                            <Div
                              key={`${colorName} ${i + 1}`}
                              style={{
                                background: color, borderRadius: '50%', width: '25px', height: '25px', border: colorSelected === colorName ? 'solid 3px black' : 'solid 1px #e4e4e4', padding: '2px', margin: '3px'
                              }}
                              onClick={() => setColorSelected(colorName)}
                            />
                          );
                        }

                        if (colorName === 'multicolor') {
                          return (
                            <Div
                              key={`${colorName} ${i + 1}`}
                              style={{
                                background: color, borderRadius: '50%', width: '25px', height: '25px', border: colorSelected === colorName ? 'solid 3px black' : 'solid 1px #e4e4e4', padding: '2px', margin: '3px'
                              }}
                              onClick={() => setColorSelected(colorName)}
                            />
                          );
                        }

                        return (
                          <Div
                            key={`${colorName} ${i + 1}`}
                            style={{
                              background: color, borderRadius: '50%', width: '25px', height: '25px', border: colorSelected === colorName ? 'solid 3px black' : 'solid 1px #e4e4e4', padding: '2px', margin: '3px'
                            }}
                            onClick={() => setColorSelected(colorName)}
                          />
                        );
                      })}

                    </Div>
                  </Div>

                  <div style={{
                    width: '100%', minHeight: '300px', maxHeight: '300px', overflowY: 'auto'
                  }}
                  >

                    {
                      `${`${sizesType}`.replaceAll(' ', '')}`.split(',').map((val, i) => (
                        <Div
                          key={`${val}${i + 1}`}
                          width="100%"
                          style={{
                            margin: '2px 0px 2px 0px', padding: '0px 5px 0px 0px', background: '#f6f6f6', borderRadius: '5px'
                          }}
                          row
                          horizontal="at"
                        >
                          <Div width="40%" horizontal="left">
                            <Checkbox label={`${val} : `} center onChange={(check) => activeSize({ size: val, check })} initialValue={parseFloat(`${selectedStock?.[selected]?.[colorSelected]?.[val]}`, 10) >= 0} />
                          </Div>

                          <Div width="60%" style={{ padding: '5px 0px 5px 0px' }}>
                            { parseFloat(`${selectedStock?.[selected]?.[colorSelected]?.[val]}`, 10) >= 0
                              ? (
                                <Div height="75px" width="calc(100% - 16px)">
                                  <TextField
                                    label="Quantity"
                                    id={`quantity ${val} ${i}`}
                                    initialValue={`${selectedStock?.[selected]?.[colorSelected]?.[val]}`}
                                    onChange={({ value }) => changeSizeValue({ size: val, value: parseFloat(value.replaceAll(',', '.'), 10) || 0 })}
                                  />
                                </Div>
                              )
                              : (
                                <Options
                                  onBlur={({ value }) => changeSizeValue({ size: val, value })}
                                  value={selectedStock?.[selected]?.[colorSelected]?.[val] || 'Infinite'}
                                  options={['Infinite', 'Not available', 'API management'].map((op) => ({ title: op, value: op }))}
                                />
                              )}
                          </Div>
                        </Div>
                      ))
                    }
                  </div>

                  <Div width="100%" row horizontal="around">
                    <Button color="transparent" link style={{ width: '100%' }} onClick={notApply}>
                      Close
                    </Button>
                    <Button color="info" style={{ width: '100%' }} onClick={apply}>
                      Apply
                    </Button>
                  </Div>
                </Div>
              ) : (
                [...val?.Provider].length <= 0 ? (
                  <Div width="100%">
                    <span>Provider not defined</span>
                  </Div>
                ) : (
                  <Div width="100%">
                    <span>{`${'Configure supplier\'s stock'}`}</span>
                    {
                      [...Provider].map((provider, i) => (
                        <Div
                          width="100%"
                          key={`${provider} ${i + 1}`}
                          style={{ padding: '2px', border: 'solid 1px #00acc1', margin: '3px' }}
                          onClick={() => handleSelect(provider)}
                        >
                          <span>{provider}</span>
                        </Div>
                      ))
                    }
                  </Div>
                )
              )
            }
          </Div>
        </Div>
      </Popover>
    </>
  );
};

const rowGenerator = (val, editRow, delRow, onVisibility, onRecomendation, setStock, setTags, classes) => [
  <div className={classes.imgContainer}>
    <span style={{ position: 'absolute', top: 10, left: 0 }}>
      {val.id}
    </span>
    <img src={val?.colors[0]?.photos[0] || '/static/images/notPhoto.png'} alt="..." className={classes.img} />
  </div>,
  <div>
    <div className={classes.ratingContainer}>
      <RattingController val={val} setValue={onRecomendation} />
    </div>
    <span>
      <a href="#jacket" className={classes.tdNameAnchor}>
        {val.languages?.EN.nameProduct}
      </a>
      <br />
      <small className={classes.tdNameSmall}>
        {`by ${val.brand}`}
      </small>
    </span>
  </div>,
  <span>
    <a href="#jacket" className={classes.tdNameAnchor}>
      {val.categorie}
    </a>
    <br />
    <small className={classes.tdNameSmall}>
      {`${val.subcategorie} - ${val.genre}`}
    </small>
  </span>,
  <Div width="100%" style={{ minWidth: '100px' }}>
    <Div width="100px">
      <Grid container alignItems="center" justifyContent={val.colors.length <= 4 ? 'center' : 'flex-start'}>
        {val.colors.map(({ color, colorName }, i) => (
          <GridItem key={`${colorName} ${i + 1}`} num={[3, 3, 3, 3, 3]}>
            <div
              style={{
                width: '20px', height: '20px', borderRadius: '50%', border: 'solid 1px grey', margin: '2px', padding: '2px', background: color
              }}
            />
          </GridItem>
        ))}
      </Grid>
    </Div>
    <div className={classes.buttonGroup} style={{ minWidth: '80px' }}>
      <Button
        color="info"
        size="sm"
        round
        className={classes.firstButton}
        onClick={() => onVisibility(val.product, val.visibility)}
        style={{ width: '20px' }}
      >
        {val.visibility ? <VisibilityIcon className={classes.icon} /> : <VisibilityOffIcon className={classes.icon} />}
      </Button>
      <TagsController val={val} classes={classes} setTags={setTags} />
      <StockController val={val} classes={classes} setStock={setStock} />
    </div>
  </Div>,
  <span>
    <small className={classes.tdNumberSmall}>{val?.currency}</small>
    {`${val?.price}`}
  </span>,
  <div className={classes.buttonGroup}>
    <Button className={classes.actionButton} color="primary" onClick={() => editRow(val.product)}>
      <EditIcon className={classes.icon} />
    </Button>
    <Button className={classes.actionButton} color="danger" onClick={() => delRow(val.product)}>
      <DeleteOutlineIcon className={classes.icon} />
    </Button>
  </div>,
  <span />
];

const rowGenerator2 = (val, editRow, delRow, onVisibility, onRecomendation, setStock, setTags, classes) => [
  <div className={classes.imgContainer3}>
    <Div width="100%" row horizontal="at">
      <span>
        {val.id}
      </span>
      <div className={classes.ratingContainer}>
        <RattingController val={val} setValue={onRecomendation} />
      </div>
    </Div>
  </div>,
  <div>
    <span>
      <a href="#jacket" className={classes.tdNameAnchor}>
        {val.languages?.EN.nameProduct}
      </a>
      <br />
      <small className={classes.tdNameSmall}>
        {`by ${val.brand}`}
      </small>
    </span>
  </div>,
  <span>
    <a href="#jacket" className={classes.tdNameAnchor}>
      {val.categorie}
    </a>
    <br />
    <small className={classes.tdNameSmall}>
      {`${val?.subcategorie} - ${val?.genre}`}
    </small>
  </span>,
  <span>
    <div className={classes.buttonGroup} style={{ minWidth: '80px' }}>
      <Button
        color="info"
        size="sm"
        round
        className={classes.firstButton}
        onClick={() => onVisibility(val?.product, val?.visibility)}
        style={{ width: '20px' }}
      >
        {val.visibility ? <VisibilityIcon className={classes.icon} /> : <VisibilityOffIcon className={classes.icon} />}
      </Button>
      <TagsController val={val} classes={classes} setTags={setTags} />
      <StockController val={val} classes={classes} setStock={setStock} />
    </div>
  </span>,
  <span>
    <small className={classes.tdNumberSmall}>{val?.currency}</small>
    {`${val?.price}`}
  </span>,
  <div className={classes.buttonGroup}>
    <Button className={classes.actionButton} color="primary" onClick={() => editRow(val.product)}>
      <EditIcon className={classes.icon} />
    </Button>
    <Button className={classes.actionButton} color="danger" onClick={() => delRow(val.product)}>
      <DeleteOutlineIcon className={classes.icon} />
    </Button>
  </div>,
  <span />
];

const elementsParSize = [2, 2, 2, 3, 4];

const BoxGenerator = ({
  val, i, editRow, delRow, onVisibility, onRecomendation, classes, setStock, setTags
}) => (
  <GridItem num={elementsParSize.map((val) => 12 / val)}>
    <Div width="100%" height="490px" vertical="top">
      <Paper className={classes.paper} elevation={3} style={{ marginTop: '10px', width: 'calc(100% - 20px)' }}>
        <Div width="100%" height="470px" vertical="at" horizontal="left" style={{ padding: '10px', background: '#00000008' }}>

          <Div width="100%" row horizontal="at">
            <span>
              <a href="#jacket" className={classes.tdNameAnchor}>
                {`${val.languages?.EN.nameProduct.substring(0, 30)}${val.languages?.EN.nameProduct.length > 30 ? '...' : ''}`}
              </a>
            </span>
            <span className={classes.tdNameAnchor}>
              {`${val.id}`}
            </span>
          </Div>

          <Div width="100%" height="250px">
            <img src={val?.colors[0]?.photos[0] || '/static/images/notPhoto.png'} alt="..." className={classes.img2} />
          </Div>

          <Div width="140px">
            <Div width="100%">
              <Grid container alignItems="center" justifyContent="flex-start">
                {val.colors.map(({ color, colorName }, i) => (
                  <GridItem key={`${colorName} ${i + 1}`} num={[2, 2, 2, 2, 2]}>
                    <div
                      style={{
                        width: '20px', height: '20px', borderRadius: '50%', border: 'solid 1px grey', margin: '2px', padding: '2px', background: color
                      }}
                    />
                  </GridItem>
                ))}
              </Grid>
            </Div>
          </Div>

          <span className={classes.tdNameSmall}>
            {`by ${val.brand}`}
          </span>

          <small className={classes.tdNameSmall}>
            <span className={classes.tdNameAnchor}>
              {val.categorie}
            </span>
            {` - ${val.subcategorie} ${val.genre && val.genre !== '' && `- ${val.genre}`}`}
          </small>

          <Div width="100%" row horizontal="at" vertical="bottom">
            <div className={classes.ratingContainer}>
              <RattingController val={val} setValue={onRecomendation} />
              <span>
                <small className={classes.tdNumberSmall}>{val?.currency}</small>
                {`${val?.price}`}
              </span>
            </div>
            <Div style={{ padding: '5px' }}>
              <TagsController val={val} classes={classes} setTags={setTags} box />
              <Div row style={{ marginTop: '5px' }}>
                <Button className={classes.actionButton} color="info" onClick={() => onVisibility(val.product, val.visibility)}>
                  {val.visibility ? <VisibilityIcon className={classes.icon} /> : <VisibilityOffIcon className={classes.icon} />}
                </Button>
                <StockController val={val} classes={classes} setStock={setStock} box />
              </Div>
              <Div row style={{ marginTop: '5px' }}>
                <Button className={classes.actionButton} color="primary" onClick={() => editRow(val.product)}>
                  <EditIcon className={classes.icon} />
                </Button>
                <Button className={classes.actionButton} color="danger" onClick={() => delRow(val.product)}>
                  <DeleteOutlineIcon className={classes.icon} />
                </Button>
              </Div>
            </Div>
          </Div>
        </Div>
      </Paper>
    </Div>
  </GridItem>
);

const FilterHeader = ({
  list, filtersOptions, setFilterOptions, listFiltred
}) => {
  const [sort, setSort] = useState({ name: false });

  const sortBy = (key) => {
    setSort({ [key]: !sort[key] });
    setFilterOptions({
      ...filtersOptions,
      sort: {
        [key]: !filtersOptions?.sort[key]
      }
    });
  };

  const [anchorElproduct, setAnchorElProduct] = useState(null);
  const openproduct = Boolean(anchorElproduct);
  const idproduct = openproduct ? 'simple-popover brands' : undefined;

  const brands = useMemo(() => [...new Set(list.map((a) => a.brand))].filter((val) => val !== ' ' && val !== ''), [list]);

  const product = (
    <Div width="100%" row horizontal="left" style={styleHeader}>
      <Div onClick={(event) => setAnchorElProduct(event.currentTarget)}>
        <span className="headerFilterProductList">PRODUCTS</span>
      </Div>
      <Div width="30px" onClick={() => sortBy('name')}>
        <TrendingFlatIcon style={{ transform: sort?.name ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'all ease 1s' }} />
      </Div>
      <Popover
        id={idproduct}
        open={openproduct}
        anchorEl={anchorElproduct}
        onClose={() => setAnchorElProduct(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Div width="100%" horizontal="left" style={{ padding: '0px 10px 10px 10px' }}>
          <span>By Brand</span>
          <Div
            style={{
              height: '300px', overflowY: 'auto', paddingTop: '10px', paddingBottom: '10px'
            }}
            vertical="top"
          >
            <Checkbox
              label="All"
              id="All"
              labelPlacement="end"
              onChange={(checked) => setFilterOptions({
                ...filtersOptions, price: undefined, sort: { name: false }, brand: {}
              })}
              initialValue={Object.values(filtersOptions?.brand).filter((val) => val === true).length === 0}
              style={{ minHeight: '30px' }}
            />
            {
              brands.map((val, i) => (
                <Checkbox
                  label={val}
                  id={val}
                  key={`${i + 1}`}
                  labelPlacement="end"
                  onChange={(checked) => setFilterOptions({
                    ...filtersOptions, price: undefined, sort: { name: false }, brand: { ...filtersOptions.brand, [val]: checked }
                  })}
                  initialValue={filtersOptions?.brand[val] || false}
                  style={{ minHeight: '30px' }}
                />
              ))
            }
          </Div>

          <Button color="primary" style={{ width: '100%', marginTop: '20px' }} onClick={() => setAnchorElProduct(null)}>
            Apply
          </Button>
        </Div>
      </Popover>
    </Div>
  );

  const [anchorElClassification, setAnchorElClassification] = useState(null);
  const openClassification = Boolean(anchorElClassification);
  const idClassification = openClassification ? 'simple-popover classification' : undefined;

  const categorie = useMemo(() => [...new Set(list.map((a) => a.categorie))].filter((val) => val !== ' ' && val !== '' && val !== undefined), [list]);
  const activeCategories = useMemo(() => Object.keys(filtersOptions?.categorie).filter((val) => filtersOptions?.categorie[val] === true), [filtersOptions, list]);
  const subcategorie = useMemo(() => [...new Set(list.filter((val) => val.categorie !== '' && val.categorie !== ' ' && activeCategories.indexOf(val.categorie) !== -1).map((a) => a.subcategorie))].filter((val) => val !== ' ' && val !== ''), [filtersOptions, list]);

  const classification = (
    <Div width="100%" row style={styleHeader}>
      <Div onClick={(event) => setAnchorElClassification(event.currentTarget)}>
        <span className="headerFilterProductList">CLASSIFICATION</span>
      </Div>
      <Div width="30px" onClick={() => sortBy('categorie')}>
        <TrendingFlatIcon style={{ transform: sort?.categorie ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'all ease 1s' }} />
      </Div>
      <Popover
        id={idClassification}
        open={openClassification}
        anchorEl={anchorElClassification}
        onClose={() => setAnchorElClassification(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Div horizontal="left" style={{ padding: '0px 10px 10px 10px' }}>
          <Div horizontal="left" row>
            <Div horizontal="left" style={{ borderRight: 'solid 1px #e4e4e4', paddingRight: '30px' }}>
              <span>By Categories</span>
              <Div
                style={{
                  height: '300px', overflowY: 'auto', paddingTop: '10px', paddingBottom: '10px'
                }}
                vertical="top"
              >
                <Checkbox
                  label="All"
                  id="All"
                  labelPlacement="end"
                  onChange={(checked) => setFilterOptions({
                    ...filtersOptions, price: undefined, sort: { name: false }, categorie: {}, subcategorie: {}
                  })}
                  initialValue={Object.values(filtersOptions?.categorie).filter((val) => val === true).length === 0}
                  style={{ minHeight: '30px' }}
                />
                {
                  categorie.map((val, i) => (
                    <Checkbox
                      label={val}
                      id={val}
                      key={`${i + 1}`}
                      labelPlacement="end"
                      onChange={(checked) => setFilterOptions({
                        ...filtersOptions, price: undefined, sort: { name: false }, categorie: { ...filtersOptions.categorie, [val]: checked }, subcategorie: {}
                      })}
                      initialValue={filtersOptions?.categorie[val] || false}
                      style={{ minHeight: '30px' }}
                    />
                  ))
                }
              </Div>
            </Div>

            <Div horizontal="left" style={{ paddingLeft: '15px' }}>
              <span>By Sub-Categorie</span>
              <Div
                style={{
                  height: '300px', overflowY: 'auto', paddingTop: '10px', paddingBottom: '10px'
                }}
                vertical="top"
              >
                <Checkbox
                  label="All"
                  id="All"
                  labelPlacement="end"
                  onChange={(checked) => setFilterOptions({
                    ...filtersOptions, price: undefined, subcategorie: {}, sort: { name: false }
                  })}
                  initialValue={Object.values(filtersOptions?.subcategorie).filter((val) => val === true).length === 0}
                  style={{ minHeight: '30px' }}
                />
                {
                  subcategorie.map((val, i) => (
                    <Checkbox
                      label={val}
                      id={val}
                      key={`${i + 1}`}
                      labelPlacement="end"
                      onChange={(checked) => setFilterOptions({
                        ...filtersOptions, sort: { name: false }, price: undefined, subcategorie: { ...filtersOptions.subcategorie, [val]: checked }
                      })}
                      initialValue={filtersOptions?.subcategorie[val] || false}
                      style={{ minHeight: '30px' }}
                    />
                  ))
                }
              </Div>
            </Div>
          </Div>

          <Button color="primary" style={{ width: '100%', marginTop: '20px' }} onClick={() => setAnchorElClassification(null)}>
            Apply
          </Button>
        </Div>
      </Popover>
    </Div>
  );

  const [anchorElprice, setAnchorElprice] = useState(null);
  const openprice = Boolean(anchorElprice);
  const idprice = openprice ? 'simple-popover price' : undefined;

  const maxPrice = useMemo(() => listFiltred.map((val) => parseFloat(val.price, 10)).sort((a, b) => b - a), [listFiltred]);

  const price = (
    <Div width="100%" row horizontal="center" style={styleHeader}>
      <Div onClick={(event) => setAnchorElprice(event.currentTarget)}>
        <span className="headerFilterProductList">PRICE</span>
      </Div>
      <Div width="30px" onClick={() => sortBy('price')}>
        <TrendingFlatIcon style={{ transform: sort?.price ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'all ease 1s' }} />
      </Div>
      <Popover
        id={idprice}
        open={openprice}
        anchorEl={anchorElprice}
        onClose={() => setAnchorElprice(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Div width="100%" horizontal="left" style={{ padding: '0px 10px 10px 10px' }}>
          <span>Price rang</span>
          <Div
            width="20vw"
            style={{
              height: '100px', overflowY: 'auto', paddingTop: '40px', paddingBottom: '5px'
            }}
            vertical="top"
          >
            <SliderPrice initialValue={filtersOptions?.price} max={maxPrice[0] || 5000} onChange={(v) => setFilterOptions({ ...filtersOptions, price: v })} />
          </Div>
          <Button color="primary" style={{ width: '100%', marginTop: '5px' }} onClick={() => setAnchorElprice(null)}>
            Apply
          </Button>
        </Div>
      </Popover>
    </Div>
  );

  const rating = (
    <Div width="100%" row horizontal="left" style={styleHeader}>
      <Div width="100%" row horizontal="left">
        <Div>
          <span className="headerFilter">AGE</span>
        </Div>
        <Div width="30px" onClick={() => sortBy('id')}>
          <TrendingFlatIcon style={{ transform: sort?.id ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'all ease 1s' }} />
        </Div>
      </Div>
      <Div width="100%" row horizontal="left">
        <Div>
          <span className="headerFilter">RATING</span>
        </Div>
        <Div width="30px" onClick={() => sortBy('rating')}>
          <TrendingFlatIcon style={{ transform: sort?.rating ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'all ease 1s' }} />
        </Div>
      </Div>
    </Div>
  );

  return [
    rating,
    product,
    classification,
    <Div width="100%">STOCK</Div>,
    price,
    ''
  ];
};

export default function DemoTables({
  list, editRow, delRow, onVisibility, onRecomendation, setStock, setTags, addRow, minimal, searchText, resetFilter
}) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [alert, setAlert] = React.useState(null);
  const [filtersOptions, setFilterOptions] = useState({
    brand: {}, categorie: {}, subcategorie: {}, sort: { id: false }
  });

  useEffect(() => {
    setFilterOptions({
      brand: {}, categorie: {}, subcategorie: {}, sort: { id: false }
    });
  }, [resetFilter]);

  const listFiltred = useMemo(() => {
    const filtredBrand = Object.values(filtersOptions?.brand).filter((val) => val === true).length === 0 ? list : list.filter((val) => Object.entries(filtersOptions.brand).filter(([key, value]) => value === true && val.brand === key).length > 0);
    const filtredCategorie = Object.values(filtersOptions?.categorie).filter((val) => val === true).length === 0 ? filtredBrand : filtredBrand.filter((val) => Object.entries(filtersOptions.categorie).filter(([key, value]) => value === true && val.categorie === key).length > 0);
    const filtredSubCategorie = Object.values(filtersOptions?.subcategorie).filter((val) => val === true).length === 0 ? filtredCategorie : filtredCategorie.filter((val) => Object.entries(filtersOptions.subcategorie).filter(([key, value]) => value === true && val.subcategorie === key).length > 0);
    return filtredSubCategorie;
  }, [list, filtersOptions]);

  const listFiltredByInput = useMemo(() => listFiltred.filter((val) => `${val.languages?.EN.nameProduct}`.toLowerCase().indexOf(`${searchText}`.toLowerCase()) !== -1 || `${val.brand}`.toLowerCase().indexOf(`${searchText}`.toLowerCase()) !== -1), [listFiltred, searchText]);

  const listFiltredPrice = useMemo(() => {
    const filterPrice = filtersOptions.price === undefined ? listFiltredByInput : listFiltredByInput.filter((val) => {
      const value = parseFloat(val.price, 10);
      return value >= filtersOptions?.price[0] && value <= filtersOptions?.price[1];
    });

    return filterPrice;
  }, [filtersOptions, listFiltredByInput]);

  const listSorted = useMemo(() => {
    if (filtersOptions?.sort?.categorie !== undefined) {
      const sortedCategorie = filtersOptions?.sort?.categorie === true ? listFiltredPrice.sort((b, a) => `${a.categorie}`.toLowerCase().localeCompare(`${b.categorie}`.toLowerCase())) : listFiltredPrice.sort((a, b) => `${a.categorie}`.toLowerCase().localeCompare(`${b.categorie}`.toLowerCase())); //
      return sortedCategorie;
    }

    if (filtersOptions?.sort?.price !== undefined) {
      const sortedCategorie = filtersOptions?.sort?.price === true ? listFiltredPrice.sort((a, b) => parseFloat(a.price, 10) - parseFloat(b.price, 10)) : listFiltredPrice.sort((a, b) => parseFloat(b.price, 10) - parseFloat(a.price, 10));
      return sortedCategorie;
    }

    if (filtersOptions?.sort?.rating !== undefined) {
      const sortedCategorie = !filtersOptions?.sort?.rating === true ? listFiltredPrice.sort((a, b) => parseInt(`${a.rating || 0}`, 10) - parseInt(`${b.rating || 0}`, 10)) : listFiltredPrice.sort((a, b) => parseInt(`${b.rating || 0}`, 10) - parseInt(`${a.rating || 0}`, 10));
      return sortedCategorie;
    }

    if (filtersOptions?.sort?.name !== undefined) {
      const sortedName = filtersOptions.sort.name === true ? listFiltredPrice.sort((b, a) => `${a.languages?.EN.nameProduct}`.toLowerCase().localeCompare(`${b.languages?.EN.nameProduct}`.toLowerCase())) : listFiltredPrice.sort((a, b) => `${a.languages?.EN.nameProduct}`.toLowerCase().localeCompare(`${b.languages?.EN.nameProduct}`.toLowerCase())); //
      return sortedName;
    }

    const sortedCategorie = !filtersOptions?.sort?.id === true ? listFiltredPrice.sort((a, b) => parseInt(`${a.id || 0}`, 10) - parseInt(`${b.id || 0}`, 10)) : listFiltredPrice.sort((a, b) => parseInt(`${b.id || 0}`, 10) - parseInt(`${a.id || 0}`, 10));
    return sortedCategorie;
  }, [listFiltredPrice, filtersOptions.sort]);

  const delConfirmation = (data) => {
    setAlert(
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => { delRow(data); setAlert(null); }}
        onCancel={() => { setAlert(null); }}
        focusCancelBtn
        confirmBtnCssClass={`${classes2.button} ${classes2.danger}`}
      >
        You will not be able to recover this file!
      </SweetAlert>
    );
  };

  const [index, serIndex] = useState([0, 12]);
  const [indexGropup, serIndexGroup] = useState([0, 5]);
  const [groupSelector, setGroupSelector] = useState(1);
  const sliceProducPilot = useMemo(() => [...listSorted].slice(index[0], index[1]), [index, listSorted, filtersOptions.sort]);
  const groups = useMemo(() => Math.round(listSorted.length / 12), [index, listSorted, filtersOptions.sort]);

  const indexChange = (newIndex) => {
    window.scrollTo(0, 400);
    setGroupSelector(newIndex + 1);

    if (newIndex === 0) {
      return serIndex([0, 12]);
    }
    return serIndex([(12 * newIndex), (12 * newIndex) + 12]);
  };

  const backToInit = () => {
    window.scrollTo(0, 400);
    setGroupSelector(1);
    serIndexGroup([0, 5]);
    serIndex([0, 12]);
  };

  const backIndex = () => {
    window.scrollTo(0, 400);
    const groupSelectorTemp = groupSelector - 1;
    setGroupSelector(groupSelectorTemp);

    if (indexGropup[0] > 0) {
      serIndexGroup([indexGropup[0] - 1, indexGropup[1] - 1]);
    }

    if (groupSelectorTemp === 1) {
      return serIndex([0, 12]);
    }
    serIndex([index[0] - 12, index[1] - 12]);
  };

  const nextIndex = () => {
    window.scrollTo(0, 400);
    const groupSelectorTemp = groupSelector + 1;
    setGroupSelector(groupSelectorTemp);

    if (indexGropup[1] < groups && groupSelectorTemp > (indexGropup[1] / 2) + 1) serIndexGroup([indexGropup[0] + 1, indexGropup[1] + 1]);

    if (groupSelectorTemp === 1) {
      return serIndex([0, 12]);
    }
    serIndex([index[0] + 12, index[1] + 12]);
  };

  const nextToEnd = () => {
    window.scrollTo(0, 400);
    setGroupSelector(groups);
    serIndexGroup([groups - (groups >= 5 ? 5 : groups), groups]);
    serIndex([(12 * groups) - 11, (12 * groups) + 1]);
  };

  useEffect(() => {
    setGroupSelector(1);
    serIndexGroup([0, 5]);
    serIndex([0, 12]);
  }, [listSorted]);

  return (
    <>
      {alert}
      <Div width="100%" style={{ maxWidth: '1800px' }}>
        <Table
        // stickyHeader
          startRowsPerPage={25}
          tableHead={FilterHeader({
            list, filtersOptions, setFilterOptions, listFiltred: listFiltredByInput
          })}
          tableShopping
          notPagination
          notbody
          minimal
          customHeadCellClasses={[
            classes.photoHeader, // 0 photo
            classes.productHeader, // 1 product
            classes.classificationHeader, // 2 classification
            classes.stockHeader, // 3 stock
            classes.priceHeader, // 4 price
            classes.right, // 5 button
          ]}
          customHeadClassesForCells={[0, 1, 2, 3, 4, 5]}
        />
      </Div>
      {
        minimal === 0 ? (
          <Div width="100%">
            <Div width="100%" style={{ maxWidth: '1800px' }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                style={{
                  paddingTop: '30px', maxHeight: '65vh', overflowY: 'scroll', width: '100%'
                }}
              >
                {
                  sliceProducPilot.map((val, i) => (
                    <BoxGenerator
                      setStock={setStock}
                      setTags={setTags}
                      key={`${val.component} ${i + 1}`}
                      val={val}
                      i={i}
                      editRow={editRow}
                      delConfirmation={delConfirmation}
                      onVisibility={onVisibility}
                      onRecomendation={onRecomendation}
                      classes={classes}
                    />
                  ))
                }
              </Grid>
              <Div width="100%">
                {
                  groups > 1 ? (

                    <Div width="100%" row style={{ padding: '10px 10px 10px 10px', marginTop: '10px' }}>

                      <Button color="white" justIcon disabled={index[0] === 0} onClick={backToInit}>
                        {'<<'}
                      </Button>

                      <Button color="white" disabled={index[0] === 0} onClick={backIndex}>
                      Back
                      </Button>

                      <Div row style={{ marginLeft: '10px', marginRight: '10px', padding: '10px 10px 10px 10px' }}>
                        {
                          [...new Array(groups)].map((val, i) => i).slice(indexGropup[0], indexGropup[1]).map((val) => (
                            <Button color={(val + 1) === groupSelector ? 'primary' : 'white'} key={`${val + 1}`} style={{ marginLeft: '5px', marginRight: '5px' }} onClick={() => indexChange(val)}>
                              {val + 1}
                            </Button>
                          ))
                        }
                      </Div>

                      <Button color="white" onClick={nextIndex} disabled={groupSelector >= groups}>
                        Next
                      </Button>

                      <Button color="white" justIcon disabled={groupSelector >= groups} onClick={nextToEnd}>
                        {'>>'}
                      </Button>
                    </Div>

                  ) : null
                }
              </Div>
            </Div>
          </Div>
        ) : (
          <Div width="100%" style={{ maxWidth: '1800px' }}>
            <Table
          // stickyHeader
              startRowsPerPage={25}
              tableData={listSorted.map((val, i) => (minimal === 2 ? rowGenerator2(val, editRow, delConfirmation, onVisibility, onRecomendation, setStock, setTags, classes) : rowGenerator(val, editRow, delConfirmation, onVisibility, onRecomendation, setStock, setTags, classes)))}
              addRow={addRow}
              maxHeight="65vh"
              tableShopping
              minimal={minimal === 2}
        // 0 is for classes.center, 2 is for classes.description, 3 is for classes.description
        // 4 is for classes.right, 5 is for classes.right, 6 is for classes.right
              customCellClasses={[
                classes.left, // 0 photo
                classes.tdName, // 1 product
                classes.tdName2, // 2 clasification
                classes.center, // 3 stock
                `${classes.tdNumber} ${classes.tdNumberAndButtonGroup}`, // 4 price
                classes.right, // 6 action
              ]}
        // 1 is for classes.tdName, 4 is for classes.tdNumber, 6 is for classes.tdNumber
        // 5 is for classes.tdNumber + " " + classes.tdNumberAndButtonGroup
              customClassesForCells={[0, 1, 2, 3, 4, 5]}
            />
          </Div>
        )
      }

    </>
  );
}
