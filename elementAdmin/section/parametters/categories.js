import React, { useState } from 'react';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
  redux, Div, hookDeviceInfo, axios
} from 'components';
import Button from '@/components/CustomButtons/Button';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

import CropImage from './CropImage';
import DialogCategories from './dialogCategories';

const useStyles = makeStyles((theme) => ({
  bt: {
    '&:hover': {
      background: '#cacaca50'
    },
  },
}));

const BoitCategorie = ({
  data, children, title, onClick
}) => {
  const classes = useStyles();

  return (
    <GridItem num={[12, 6, 6, 4, 4]}>
      <Div width="100%" style={{ border: 'solid 1px grey', borderRadius: '10px' }}>
        <div style={{
          width: '100%', background: 'black', color: 'white', textAlign: 'left', borderRadius: '10px 10px 0px 0px', padding: '5px', paddingLeft: '10px'
        }}
        >
          {`Categories for ${title}`}
        </div>
        <div
          style={{
            width: '100%', height: '200px', overflowY: 'scroll', padding: '10px'
          }}
        >
          {data.map((val, i, arr) => (
            <Div
              key={val.key}
              width="100%"
              height="50px"
              style={{ borderBottom: arr.length - 1 === i ? 'none' : '1px solid #cacaca80' }}
              onClick={() => onClick({
                title, key: val.key, i, data: val
              })}
            >
              <div className={classes.bt} style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                <Div width="100%" height="100%">
                  {val.key}
                </Div>
              </div>
            </Div>
          ))}
        </div>
        <div style={{
          width: '100%', textAlign: 'center', borderRadius: '0px 0px 10px 10px', borderTop: 'solid 2px grey', padding: '20px'
        }}
        >
          <Div width="100%" horizontal="right">
            {children}
          </Div>
        </div>
      </Div>
    </GridItem>
  );
};

const GetFileBlobUsingURLP = (url) => new Promise((resolve) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.addEventListener('load', () => {
    resolve(xhr.response);
  });
  xhr.send();
});

export default function Parametters({ socketObj }) {
  const { width } = hookDeviceInfo();
  const [emit, socket] = socketObj;
  const [select, setSelect] = useState(null);

  const classes = useStyles();

  const [{
    globalSettings = {
      categories: {
        Pilot: {}, Motorcycle: {}, Parts: {}, Lifestyle: {}
      },
      categorieFilter: {
        Pilot: {}, Lifestyle: {}
      }
    },
  }, dispatch] = redux();

  const categoriesPilot = React.useMemo(() => Object.entries(globalSettings.categories.Pilot).map(([key, value]) => ({ key, subCategories: value })), [globalSettings]);
  // const categoriesMotorcycle = React.useMemo(() => Object.entries(globalSettings.categories.Motorcycle).map(([key, value]) => ({ key, subCategories: value })), [globalSettings]);
  const categoriesParts = React.useMemo(() => Object.entries(globalSettings.categories.Parts).map(([key, value]) => ({ key, subCategories: value })), [globalSettings]);
  const categoriesLifestyle = React.useMemo(() => Object.entries(globalSettings.categories.Lifestyle).map(([key, value]) => ({ key, subCategories: value })), [globalSettings]);
  const photosCategories = React.useMemo(() => globalSettings.categorieFilter, [globalSettings]);

  const addEmit = async () => {
    // await emit('globalSettings', { key: 'categories', value: newObjectList.categories });
    // setAddData(null);
    // setName('');
  };

  const onClick = ({
    title, key, i, data
  }) => {
    setSelect({
      title, key, i, data
    });
  };

  const upload = async (key, image) => {
    if (`${image}`.indexOf('blob:https://') !== -1) {
      const contents = await GetFileBlobUsingURLP(image);
      const uploadImage1 = await axios.upload({
        url: '/uploadCategorie/photo',
        file: contents
      });
      return `/static/categorie/${uploadImage1[0].filename}`;
    }
    return image;
  };

  const addPhoto = async ({ data, categorie, subCategories }) => {
    const namePhoto = await upload(0, data);
    
    await emit('globalSettings', { key: `categorieFilter.${categorie}.${subCategories}.img`, value: namePhoto });
  };

  return (
    <Div width="100%">
      <DialogCategories open={select} setOpen={setSelect}>
        <Div width="100%">
          <Div width="300px" height="300px" style={{ background: '#cacaca' }}>
            <Div
              height="50px"
              style={{
                position: 'absolute', top: '320px', right: '125px', color: '#106e9a', lineHeight: '12px'
              }}
            >
              <CropImage
                onUpload={(data) => addPhoto({ data, categorie: select.title, subCategories: select.key })}
                cropSize={{ width: 250, height: 250 }}
                aspect={4 / 4}
              />
            </Div>
            <img
              src={`${(photosCategories && select && select.title && photosCategories[select && select.title] && photosCategories[select.title][select.key] && photosCategories[select.title][select.key].img) || '/static/images/bg7.jpg'}`}
              alt={select && select.key}
              style={{
                width: '250px', height: '200px', objectFit: 'contain', background: '#cacaca'
              }}
            />
          </Div>
        </Div>
        <Div width="100%" style={{ paddingTop: '25px', paddingLeft: '10px' }}>
          <Div width="100%" horizontal="left"><h5>Sub-Categories:</h5></Div>
          <div
            style={{
              width: '100%', height: '200px', overflowY: 'scroll', padding: '10px', borderTop: 'solid 1px #cacaca', borderBottom: 'solid 1px #cacaca', borderLeft: 'solid 1px #cacaca'
            }}
          >
            {
              select && select.data && select.title && select.title !== 'Motorcycle' && select.data.subCategories && Object.keys(select.data.subCategories).map((val, i, arr) => (
                <Div key={val} width="100%">
                  <Div
                    key={val.key}
                    width="100%"
                    height="50px"
                    style={{ borderBottom: arr.length - 1 === i ? 'none' : '1px solid #cacaca80' }}
                  >
                    <div className={classes.bt} style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                      <Div width="100%" height="100%" row horizontal="at">
                        <p>{val}</p>
                      </Div>
                    </div>
                  </Div>
                </Div>
              ))
            }
          </div>
        </Div>
      </DialogCategories>
      <GridContainer spacing={2}>
        <BoitCategorie data={categoriesPilot} title="Pilot" onClick={onClick}>
          <Button color="primary">
            Add new Category
          </Button>
        </BoitCategorie>
        <BoitCategorie data={categoriesLifestyle} title="Lifestyle" onClick={onClick}>
          <Button
            color="primary"
            onClick={() => setSelect({
              title: 'Lifestyle', key: 'newCategorie', i: -1, data: ''
            })}
          >
            Add new Category
          </Button>
        </BoitCategorie>
        <BoitCategorie data={categoriesParts} title="Parts" onClick={onClick}>
          <Button color="primary">
            Add new Category
          </Button>
        </BoitCategorie>
      </GridContainer>
    </Div>
  );
}
