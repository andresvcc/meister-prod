import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';
import FlexForm from '@/components/FlexForm/FlexForm';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import ImageIcon from '@material-ui/icons/Image';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import {
  EditorState, convertToRaw, convertFromRaw,
} from 'draft-js';

import dynamic from 'next/dynamic';
import CropImage from './uploaderCrop';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(100% - 20px)',
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const positions = [
  'left top',
  'left center',
  'left bottom',
  'right top',
  'right center',
  'right bottom',
  'center top',
  'center center',
  'center bottom',
];

const types = {
  style: {
    size: [6, 6, 6, 6, 6],
    type: 'option',
    required: true,
    options: {
      EN: [{ value: 'cover', title: 'Cover' }, { value: '150% auto', title: 'Cover 2x' }, { value: '80% auto', title: 'Ajust' }, { value: 'auto', title: 'Auto' }, { value: 'auto 100%', title: 'Contain' }],
      FR: [{ value: 'cover', title: 'Cover' }, { value: 'auto', title: 'Auto' }, { value: 'auto 100%', title: 'Contain' }],
    },
    justify: 'center',
    pathData: { 0: 'style' },
    languages: {
      EN: {
        label: 'Style',
      },
      FR: {
        label: 'Style',
      }
    },
  },
  position: {
    size: [6, 6, 6, 6, 6],
    type: 'option',
    required: true,
    options: {
      EN: positions.map((a) => ({ value: a, title: `${a}`.toUpperCase() })),
      FR: positions.map((a) => ({ value: a, title: `${a}`.toUpperCase() })),
    },
    justify: 'center',
    pathData: { 0: 'position' },
    languages: {
      EN: {
        label: 'Position',
      },
      FR: {
        label: 'Position',
      }
    },
  },
};

function LoginForm({ language, submit, formDataMaster }) {
  return (
    <FlexForm
      buttonWidth="100%"
      width="100%"
      title=""
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Log in', FR: 'Log in' }}
      types={types}
      elements={['style', 'position']}
      submit={submit}
      formDataMaster={formDataMaster}
      masterChange={(data) => submit(data)}
      buttonChild={<div />}
    />
  );
}

const marks = [
  {
    value: 33,
    label: '30%',
    size: 4
  },
  {
    value: 42,
    label: '40%',
    size: 5
  },
  {
    value: 50,
    label: '50%',
    size: 6
  },
  {
    value: 58,
    label: '60%',
    size: 7
  },
  {
    value: 67,
    label: '70%',
    size: 8
  },
];

function valuetext(value) {
  return `${value}°C`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

const FullImageEditor = ({ contain, setEditingContain }) => {
  const { containTextEditor, size } = contain;
  const classes = useStyles();
  const style = {
    backgroundImage: `url('${contain.urlPhoto}')`,
    height: contain.height,
    backgroundSize: contain.style,
    backgroundPosition: contain.position,
  };

  const [editorState, setEditorState] = useState();

  const addPhoto = ({ data }) => {
    setEditingContain({ ...contain, urlPhoto: `${data}` });
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const textConvert = convertToRaw(editorState.getCurrentContent());
    setEditingContain({ ...contain, containTextEditor: textConvert });
  };

  useEffect(() => {
    if (containTextEditor) {
      setEditorState(EditorState.createWithContent(
        convertFromRaw(containTextEditor)
      ));
    } else setEditorState(EditorState.createEmpty());
  }, []);

  const changeSize = (event, newValue) => {
    const index = marks.findIndex((mark) => mark.value === newValue);
    setEditingContain({ ...contain, size: marks[index].size });
  };

  const defaultSize = useMemo(() => {
    const index = marks.findIndex((mark) => mark.size === contain.size);
    return marks[index].value;
  }, []);

  const setReverse = () => {
    setEditingContain({ ...contain, reverse: !contain.reverse });
  };

  return (
    <GridContainer spacing={1} alignItems="flex-start">
      <GridItem num={[12, 12, 12, 12, 12]}>
        <div className={classes.root}>
          {
            contain.reverse ? (
              <Div row onClick={setReverse}>
                <ViewHeadlineIcon />
                <ArrowRightAltIcon />
                <ImageIcon />
              </Div>
            ) : (
              <Div row onClick={setReverse}>
                <ImageIcon />
                <ArrowRightAltIcon />
                <ViewHeadlineIcon />
              </Div>
            )
          }
          <Slider
            defaultValue={defaultSize}
            // value={defaultSize || 6}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-restrict"
            step={null}
            valueLabelDisplay="auto"
            marks={marks}
            onChangeCommitted={changeSize}
          />
        </div>
      </GridItem>
      <GridItem num={[6, 6, 6, 6, 6].map((a) => size)}>
        {
            !contain.reverse ? (
              <Div width="100%">
                <Div width="100%">
                  <Div width="100%" row vertical="top" horizontal="left" height="115px">
                    <Div width="100%">
                      <LoginForm submit={(data) => setEditingContain({ ...contain, [data.id]: data.value })} formDataMaster={[contain, setEditingContain]} />
                    </Div>
                    <Div>
                      <CropImage
                        onUpload={(data) => addPhoto({ data })}
                        cropSize={{ width: 990, height: 540 }}
                        aspect={16 / 9}
                      />
                    </Div>
                  </Div>
                  <Div width="100%" height="380px">
                    <div className="bannerCover" style={style} />
                  </Div>
                </Div>
              </Div>
            ) : (
              <Div width="100%" vertical="top" height="495px">
                <Editor
                  editorKey="editor"
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
              // toolbarHidden
              // readOnly
              // customStyleMap={styleMap}
                  wrapperClassName="wrapper-class2"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class2"
                  toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: false, options: ['unordered', 'ordered'] },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                  }}
                  editorStyle={{
                    backgroundColor: '#f7f6f7', minHeight: contain.height, width: '100% !important', padding: '0px', border: 'none', lineHeight: '1.2em'
                  }}
                />
              </Div>
            )
          }
      </GridItem>
      <GridItem num={[6, 6, 6, 6, 6].map((a) => 12 - size)}>
        {
            contain.reverse ? (
              <Div width="100%">
                <Div width="100%">
                  <Div width="100%" row vertical="top" horizontal="left" height="115px">
                    <Div width="100%">
                      <LoginForm submit={(data) => setEditingContain({ ...contain, [data.id]: data.value })} formDataMaster={[contain, setEditingContain]} />
                    </Div>
                    <Div>
                      <CropImage
                        onUpload={(data) => addPhoto({ data })}
                        cropSize={{ width: 990, height: 540 }}
                        aspect={16 / 9}
                      />
                    </Div>
                  </Div>
                  <Div width="100%" height="380px">
                    <div className="bannerCover" style={style} />
                  </Div>
                </Div>
              </Div>
            ) : (
              <Div width="100%" vertical="top" height="495px">
                <Editor
                  editorKey="editor"
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
              // toolbarHidden
              // readOnly
              // customStyleMap={styleMap}
                  wrapperClassName="wrapper-class2"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class2"
                  toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true, options: ['unordered', 'ordered'] },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                  }}
                  editorStyle={{
                    backgroundColor: '#f7f6f7', minHeight: contain.height, width: '100% !important', padding: '0px', border: 'none', lineHeight: '1.2em'
                  }}
                />
              </Div>
            )
          }
      </GridItem>
    </GridContainer>
  );
};

FullImageEditor.propTypes = {};

export default FullImageEditor;
