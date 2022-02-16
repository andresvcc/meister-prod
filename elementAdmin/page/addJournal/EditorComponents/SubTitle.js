import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';
import {
  EditorState, convertToRaw, convertFromRaw,
} from 'draft-js';

import dynamic from 'next/dynamic';
import FlexForm from '@/components/FlexForm/FlexForm';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const positions = [
  'left',
  'center',
  'right',
];

const sizes = [
  '50px',
  '100px',
  '150px',
  '25%',
  '50%',
  '75%',
  '100%',
];

const types = {
  style: {
    size: [4, 4, 3, 3, 2],
    type: 'option',
    required: true,
    options: {
      EN: [{ value: 'solid 2px black', title: 'Simple' }, { value: 'solid 4px black', title: 'Bolder' }, { value: 'double 6px black', title: 'Double' }, { value: 'none', title: 'None' }],
      FR: [{ value: 'solid 2px black', title: 'Simple' }, { value: 'solid 4px black', title: 'Bolder' }, { value: 'double 6px black', title: 'Double' }, { value: 'none', title: 'None' }],
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
    size: [4, 4, 3, 3, 2],
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
  size: {
    size: [4, 4, 3, 3, 2],
    type: 'option',
    required: true,
    options: {
      EN: sizes.map((a) => ({ value: a, title: `${a}`.toUpperCase() })),
      FR: sizes.map((a) => ({ value: a, title: `${a}`.toUpperCase() })),
    },
    justify: 'center',
    pathData: { 0: 'sizes' },
    languages: {
      EN: {
        label: 'Size',
      },
      FR: {
        label: 'Size',
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
      elements={['style', 'position', 'size']}
      submit={submit}
      formDataMaster={formDataMaster}
      masterChange={(data) => submit(data)}
      buttonChild={<div />}
    />
  );
}

const TextEditor = ({ contain, setEditingContain }) => {
  const [editorState, setEditorState] = useState();

  const {
    containTextEditor,
    position,
    style,
    size,
  } = contain;

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

  return (
    <Div width="100%" style={{ marginBottom: '20px', paddingTop: '20px' }}>
      <Div width={['100%', '100%', '700px', '900px', '1200px']} vertical="top">
        <Editor
          editorKey="editor"
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          // toolbarHidden
          // readOnly
          // customStyleMap={styleMap}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            // inline: { inDropdown: true },
            list: { inDropdown: false, options: ['unordered', 'ordered'] },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            fontSize: {
              options: [22, 24, 26],
              className: 'fontSizeMenu',
            },
          }}
          editorStyle={{
            backgroundColor: '#f7f6f7', minHeight: '100px', width: '100% !important', padding: '15px', border: 'none', lineHeight: '2em'
          }}
        />

        <Div width="100%" horizontal={position} style={{ paddingBottom: '20px' }}>
          <div style={{ width: size, borderTop: style }} />
        </Div>

        <Div width="100%">
          <LoginForm submit={(data) => setEditingContain({ ...contain, [data.id]: data.value })} formDataMaster={[contain, setEditingContain]} />
        </Div>

      </Div>

    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
