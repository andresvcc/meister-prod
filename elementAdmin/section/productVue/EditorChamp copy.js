/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
// material ui
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import { Dialog } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import Image from 'next/image';

// components
import { redux, Div, Button } from 'components';
import BlockIcon from '@material-ui/icons/Block';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Spam from '@/components/Typography/Spam';
import { grayColor, primaryColor } from '@/assets/jss/nextjs-material-dashboard-pro';
import CustomOptions from '@/components/CustomInput/CustomOptions';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Langues from '@/components/iconsButtons/langues';
import DialogOption from './dialogOption';
import DialogDelete from './dialogDeleteBlock';
import DialogDescriptionEdit from './dialogDescriptionEdit';
import Editor from './TextEditor';

// Config
import config from './ProductUniqueCofig';

// Mui Theme
const theme = createTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.2)'
      }
    }
  }
});

// Use styles dialog
const useStyles = makeStyles({
  dialog: {
  }
});

const BoxEditor = ({
  editSizeBlock, setContainBLock, deleteBlock, i, size, a
}) => {
  const [height, setHeight] = useState(466);
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [bTvisibleLeft, setBtVisibleLeft] = useState(false);
  const [bTvisibleRight, setBtVisibleRight] = useState(false);

  return (
    <div
      style={{
        width: '100%', display: 'flex', flexDirection: 'row', position: 'relative'
      }}
    >
      <div
        style={{
          width: '100%', display: 'flex', flexDirection: 'row', position: 'relative'
        }}
      >
        <Div width="8px" height={height} onHover={setVisibleLeft} vertical="center" horizontal="center" row style={{ background: visibleLeft ? '#ababab80' : 'transparent', borderRadius: '15px' }}>
          {visibleLeft ? (
            <Div
              onHover={setBtVisibleLeft}
              style={{
                transition: 'all ease 0.2s', color: 'grey', position: 'absolute', left: bTvisibleLeft ? -24 : -12, background: 'white', borderRadius: '50%'
              }}
            >
              <AddCircleOutlineIcon style={{ transition: 'all ease 0.2s', width: bTvisibleLeft ? '50px' : '30px', height: bTvisibleLeft ? '50px' : '30px' }} />
            </Div>
          ) : null}
        </Div>

        <Div width="calc(100% - 30px)" style={{ background: 'white' }}>
          <Div width="100%" horizontal="right" row>
            <DialogOption onAcept={(size) => editSizeBlock(size, i)} size={a.size} />
            <DialogDelete onAcept={() => deleteBlock(i)} />
          </Div>
          <Editor contain={a.item} setEditingContain={(block) => setContainBLock(block, i)} variantUpdate={size} setHeight={(newHeight) => setHeight(newHeight + 55)} minHeight={305} i={i} />
        </Div>

        <Div width="8px" height={height} onHover={setVisibleRight} vertical="center" horizontal="center" row style={{ background: visibleRight ? '#ababab80' : 'transparent', borderRadius: '15px' }}>
          {visibleRight ? (
            <Div
              onHover={setBtVisibleRight}
              style={{
                transition: 'all ease 0.2s', color: 'grey', position: 'absolute', right: bTvisibleRight ? -6 : 3, background: 'white', borderRadius: '50%'
              }}
            >
              <AddCircleOutlineIcon style={{ transition: 'all ease 0.2s', width: bTvisibleRight ? '50px' : '30px', height: bTvisibleRight ? '50px' : '30px' }} />
            </Div>
          ) : null}
        </Div>
      </div>

    </div>
  );
};

const EditorChamp = ({
  value, editSizeBlock, setContainBLock, deleteBlock
}) => (
  value?.content?.map((a, i, arr) => (
    <GridItem num={[a.size, a.size, a.size, a.size, a.size]} key={`${i + 1}`}>
      <BoxEditor {...{
        editSizeBlock, setContainBLock, deleteBlock, i, size: [...arr].length, a
      }}
      />
    </GridItem>
  ))
);

export default EditorChamp;
