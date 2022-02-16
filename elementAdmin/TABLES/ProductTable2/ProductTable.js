import React, { useEffect, useState } from 'react';
import { Div, redux } from 'components';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import Table from './table';

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    background: 'white',
  },
  iconButton: {
    padding: 4,
    background: 'white',
    borderRadius: 0,
  },
  iconButton2: {
    padding: 4,
  },
  icon: {
    background: 'white',
  },
  icon2: {
    background: 'transparent',
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const OrdersTables = React.memo(({
  list, delRow, onVisibility, onRecomendation, setStock, setTags
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [minimal, setMinimal] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [filtered, setFiltered] = useState(false);

  const addRow = (data) => {
    router.push({
      pathname: '/admin/addProduct/',
    }).then(() => window.scrollTo({ top: 0, left: 0 }));
  };

  const editRow = (productName) => {
    router.push({
      pathname: `/admin/editProduct/${productName}`,
      query: { productName }
    }).then(() => window.scrollTo({ top: 0, left: 0 }));
  };

  return (
    <Div width={['100%', '100%', '100%', '100%', '100%']}>
      <Div width="100%" row horizontal="at" style={{ background: '#fafafa', borderBottom: 'solid 1px #dcdcdc', maxWidth: '1800px' }}>
        <Div width="40%" style={{ padding: '20px 0px 5px 0px' }} row horizontal="at">
          <Div width="5px" />
          <IconButton className={classes.iconButton2} aria-label="list" onClick={() => setFiltered(!filtered)}>
            <FilterListIcon className={classes.icon2} />
          </IconButton>
          <Div width="5px" />
          <Divider className={classes.divider} orientation="vertical" />
          <InputBase
            className={classes.input}
            placeholder="Search Products"
            inputProps={{ 'aria-label': 'search products' }}
            value={searchText}
            onChange={(evt) => setSearchText(evt.target.value)}
          />
          {searchText !== '' ? (
            <IconButton className={classes.iconButton} aria-label="list" onClick={() => setSearchText('')}>
              <CloseIcon className={classes.icon} />
            </IconButton>
          ) : <SearchIcon className={classes.icon} />}
          <Div width="10px" />
          <Divider className={classes.divider} orientation="vertical" />
        </Div>
        <Div row style={{ padding: '0px 20px' }}>
          <IconButton className={classes.iconButton} aria-label="list" onClick={() => setMinimal(0)}>
            <ViewModuleIcon />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="list" onClick={() => setMinimal(1)}>
            <ViewListIcon />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="list" onClick={() => setMinimal(2)}>
            <ViewHeadlineIcon />
          </IconButton>
        </Div>
      </Div>
      <Table list={list} editRow={editRow} delRow={delRow} onVisibility={onVisibility} onRecomendation={onRecomendation} setStock={setStock} setTags={setTags} addRow={addRow} minimal={minimal} searchText={searchText} resetFilter={filtered} />
    </Div>
  );
}, (propPred, propNext) => propPred.list === propNext.list);

export default OrdersTables;
