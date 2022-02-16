/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import ImageIcon from '@material-ui/icons/Image';
import CodeIcon from '@material-ui/icons/Code';
import SaveIcon from '@material-ui/icons/Save';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// core components
import { Div, axios, redux } from 'components';
import Button from '@/components/CustomButtons/Button';
import { simpleShadow } from '@/assets/jss/nextjs-material-dashboard-pro';

// local components
import SectionMap from './SectionsMap';
import PageView from './PageView';
import SubmitDialog from './DialogFormSubmit';

const contens = [];

const GetFileBlobUsingURLP = (url) => new Promise((resolve) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.addEventListener('load', () => {
    resolve(xhr.response);
  });
  xhr.send();
});

function AddJournal({ useSocketHook }) {
  const [{ articlesJournal = {} }] = redux();
  const { list = {}, order = [] } = articlesJournal;
  const router = useRouter();
  // states
  const [open, setOpen] = useState(true);
  const [option, setOption] = useState(0);
  const useCards = useState([]); // router.query.article ? list[router.query.article].content  :
  const [cards, setCards] = useCards;
  const useNewComponent = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  // socket
  const [emit, socket] = useSocketHook;

  const articleData = React.useMemo(() => (router.query.article ? (list[router.query.article] ? list[router.query.article] : {}) : {}), [list]);

  const upload = async (key, image) => {
    if (`${image}`.indexOf('blob:https://') !== -1) {
      const contents = await GetFileBlobUsingURLP(image);

      const uploadImage1 = await axios.upload({
        url: '/uploadimage/photo',
        file: contents
      });
      return `/static/images/${uploadImage1[0].filename}`;
    }
    return image;
  };

  const prepareToSave = async () => {
    const result = await Promise.all(cards.map(async (val, i) => ({
      ...val,
      contain: {
        ...val.contain,
        ...(await Promise.all(Object.keys(val.contain).map(async (val2, i2) => (`${val2}`.indexOf('urlPhoto') !== -1 ? ({ [val2]: await upload(val2, val.contain[val2]) }) : null)))).reduce((a, b) => ({ ...a, ...b }))
      }
    })));

    if (result) {
      setCards(result);
      setOpenDialog(true);
    }
  };

  const saveToDatabase = async (dataForm) => {
    const value = { ...dataForm, content: cards };
    const firtPhoto = value.content.filter((section) => Object.keys(section.contain).join(' ').indexOf('urlPhoto') !== -1);
    const keyFirstPhoto = firtPhoto.length > 0 ? Object.keys(firtPhoto[0].contain).filter((a) => a.indexOf('urlPhoto') !== -1) : [];
    const photo = keyFirstPhoto.length > 0 ? firtPhoto[0].contain[keyFirstPhoto[0]] : '';
    await emit('articlesJournalOrder', { value: [...new Set([value.title, ...order])] });
    await emit('articlesJournal', { key: value.title, value: { ...value, photo } });
  };

  useEffect(() => {
    if (socket) {
      socket.on('articlesJournal', (data) => router.push('/admin/journal/'));
    }
  }, [socket]);

  useEffect(() => {
    setCards([...(articleData.content ? articleData.content.map((a, i) => ({ ...a, id: i })) : [] || [])]);
  }, [articleData]);

  return (
    <Div width="100%" row horizontal="left" vertical="top">
      <SubmitDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        submit={(data) => saveToDatabase(data)}
        articleData={articleData}
      />
      <Div width={open ? 'calc(70% - 5px)' : 'calc(100% - 30px)'} style={{ transition: 'all ease 0.5s' }}>
        <Div height="20px" />
        <Div width="100%">
          <Div width="100%" style={{ maxHeight: 'calc(100vh - 40px)' }} vertical="top">
            <Div width="100%" vertical="top" style={{ overflowY: 'scroll', minHeight: 'calc(100vh - 40px)' }}>
              <div style={{ width: 'calc(100% - 20px)', maxWidth: '1600px' }}>
                <Div height="30px" />
                {option === 0 ? <PageView useCards={useCards} useNewComponent={useNewComponent} open={open} /> : null}
                {option === 1 ? <Div>Cards</Div> : null}
                {option === 2 ? <Div>SEO</Div> : null}
                {option === 3 ? <Div horizontal="left" vertical="top"><pre>{JSON.stringify(cards, null, 2)}</pre></Div> : null}
              </div>
            </Div>
            <Div height="40px" />
          </Div>
        </Div>
      </Div>

      <Div
        style={{
          position: 'fixed', left: 0, top: 0, zIndex: 9, background: 'white', transition: 'all ease 0.5s', ...simpleShadow
        }}
        width={open ? '70%' : '98%'}
        height="60px"
        row
        horizontal="at"
      >
        <Div row>
          <Div
            style={{
              borderBottom: 'solid 3px red', borderRadius: 0, position: 'absolute', bottom: '15px', left: 20 + (110 * option), transition: 'left 1s'
            }}
            width="100px"
          />
          <Div width="20px" />
          <Button
            color="primary"
            simple
            style={{ width: '100px' }}
            onClick={() => setOption(0)}
          >
            Page Vue
            &nbsp;
            <ArtTrackIcon />
          </Button>
          <Div width="20px" style={{ transition: 'all ease 0.5s' }} />
          <Div
            width="30%"
            height="100%"
            vertical="top"
            style={{
              position: 'fixed', right: open ? 0 : 'calc(-30% + 25px)', top: 0, background: '#EFEEE960', transition: 'all ease 0.5s'
            }}
          >
            <Div style={{ position: 'absolute', left: -5, background: '#2e5e80' }} height="100%" onClick={() => setOpen(!open)}>
              <ArrowRightIcon
                style={{
                  color: 'white', fontSize: '35px', transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'all .5s'
                }}
              />
            </Div>
            <Div width="100%" height="100%" vertical="top" horizontal="center">
              <SectionMap useCards={useCards} useNewComponent={useNewComponent} />
            </Div>
          </Div>

          <Button
            color="primary"
            simple
            link
            style={{ width: '100px' }}
            onClick={() => setOption(1)}
          >
            Card
            &nbsp;
            <ImageIcon />
          </Button>

          <Button
            color="primary"
            simple
            style={{ width: '100px' }}
            onClick={() => setOption(2)}
          >
            Seo
            &nbsp;
            <MultilineChartIcon />
          </Button>

          <Button
            color="primary"
            simple
            style={{ width: '100px' }}
            onClick={() => setOption(3)}
          >
            Data
            &nbsp;
            <CodeIcon />
          </Button>
        </Div>

        <Div row width="120px" horizontal="at">
          <Div onClick={prepareToSave}>
            <SaveIcon />
          </Div>
          <Div onClick={() => router.push('/admin/journal')}>
            <CancelPresentationIcon />
          </Div>
          <Div width="20px" />
        </Div>
      </Div>
    </Div>
  );
}

export default AddJournal;
