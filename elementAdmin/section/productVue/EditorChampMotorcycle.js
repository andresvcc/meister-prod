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

const actions = [
  { icon: <AddPhotoAlternateIcon style={{ width: '30px', heignt: '30px' }} />, name: 'Image' },
  { icon: <PostAddIcon style={{ width: '30px', heignt: '30px' }} />, name: 'Text' },
  { icon: <AmpStoriesIcon style={{ width: '30px', heignt: '30px' }} />, name: 'Gallery' },
  { icon: <VideoCallIcon style={{ width: '30px', heignt: '30px' }} />, name: 'video' },
];

const BoxEditor = ({
  editSizeBlock, setContainBLock, deleteBlock, i, size, a, addBlock, readOnly
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

        <Div width="100%" style={{ background: 'white' }}>
          <Editor readOnly={readOnly} contain={a?.item} setEditingContain={(block) => setContainBLock(block, i)} variantUpdate={size} setHeight={(newHeight) => setHeight(newHeight + 55)} minHeight={150} i={i} />
        </Div>

      </div>

    </div>
  );
};

const EditorChamp = ({
  value, editSizeBlock, setContainBLock, deleteBlock, addBlock, readOnly
}) => (
  <>
    <GridItem num={[12, 12, 12, 12, 12]}>
      <BoxEditor {...{
        editSizeBlock, setContainBLock, deleteBlock, i: 0, size: 1, a: value?.content[0], addBlock, readOnly
      }}
      />
    </GridItem>
  </>
);

export default EditorChamp;
