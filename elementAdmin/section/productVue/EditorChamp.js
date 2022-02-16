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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import Image from 'next/image';

// components
import { redux, Div, Button } from 'components';
import BlockIcon from '@material-ui/icons/Block';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import ImageIcon from '@material-ui/icons/Image';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VideoCallIcon from '@material-ui/icons/VideoCall';
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

const useStyles = makeStyles((theme) => ({
  root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const actions = [
  { icon: <AddPhotoAlternateIcon style={{ width: '30px', heignt: '30px' }} />, name: 'Image' },
  { icon: <PostAddIcon style={{ width: '30px', heignt: '30px' }} />, name: 'Text' },
  { icon: <AmpStoriesIcon style={{ width: '30px', heignt: '30px' }} />, name: 'Gallery' },
  { icon: <VideoCallIcon style={{ width: '30px', heignt: '30px' }} />, name: 'video' },
];

const BoxEditor = ({
  editSizeBlock, setContainBLock, deleteBlock, i, size, a, addBlock
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
        <Div width="20px" height={height} onHover={setVisibleLeft} vertical="center" horizontal="center" row style={{ background: 'transparent' }}>
          <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            icon={<AddCircleOutlineIcon onClick={() => setBtVisibleLeft(true)} style={{ width: bTvisibleLeft ? '35px' : '30px', height: bTvisibleLeft ? '35px' : '30px', transition: 'all ease 0.2s' }} />}
            onClose={() => setBtVisibleLeft(false)}
            onOpen={() => setBtVisibleLeft(true)}
            FabProps={{
              style: {
                background: 'white',
                color: '#2e5e80',
                width: '35px',
                height: '35px',
                transform: 'translateX(-9px)'
              }
            }}
            hidden
            direction="down"
            open={visibleLeft}
            style={{ position: 'absolute' }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => addBlock({ i, action: action.name })}
                FabProps={{
                  style: {
                    background: 'white',
                    color: '#2e5e80',
                    width: '35px',
                    height: '35px',
                    transform: 'translateX(-9px)'
                  }
                }}
              />
            ))}
          </SpeedDial>
        </Div>

        <Div width="100%" style={{ background: 'white', border: 'dashed 1px #c3c3c3' }} dev>
          <Div width="100%" horizontal="right" row>
            <DialogOption onAcept={(size) => editSizeBlock(size, i)} size={a.size} />
            <DialogDelete onAcept={() => deleteBlock(i)} />
          </Div>
          <Editor contain={a.item} setEditingContain={(block) => setContainBLock(block, i)} variantUpdate={size} setHeight={(newHeight) => setHeight(newHeight + 55)} minHeight={305} i={i} />
        </Div>

        <Div width="20px" height={height} onHover={setVisibleRight} vertical="center" horizontal="center" row style={{ background: 'transparent' }}>
          <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            icon={<AddCircleOutlineIcon onClick={() => setBtVisibleRight(true)} style={{ width: bTvisibleRight ? '35px' : '30px', height: bTvisibleRight ? '35px' : '30px', transition: 'all ease 0.2s' }} />}
            onClose={() => setBtVisibleRight(false)}
            onOpen={() => setBtVisibleRight(true)}
            FabProps={{
              style: {
                background: 'white',
                color: '#2e5e80',
                width: '35px',
                height: '35px',
                position: 'absolute',
                transform: 'translateX(9px)'
              }
            }}
            hidden
            direction="down"
            open={visibleRight}
            style={{ position: 'absolute' }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => addBlock({ i: i + 1, action: action.name })}
                FabProps={{
                  style: {
                    background: 'white',
                    color: '#2e5e80',
                    width: '35px',
                    height: '35px',
                    transform: 'translateX(9px)'
                  }
                }}
              />
            ))}
          </SpeedDial>
        </Div>
      </div>

    </div>
  );
};

const EditorChamp = ({
  value, editSizeBlock, setContainBLock, deleteBlock, addBlock
}) => (
  <>
    {
      value?.content?.map((a, i, arr) => (
        <GridItem num={[a.size, a.size, a.size, a.size, a.size]} key={`${i + 1}`}>
          <BoxEditor {...{
            editSizeBlock, setContainBLock, deleteBlock, i, size: [...arr].length, a, addBlock
          }}
          />
        </GridItem>
      ))
    }
  </>
);

export default EditorChamp;
