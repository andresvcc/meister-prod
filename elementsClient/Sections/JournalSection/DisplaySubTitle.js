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

const TextEditor = ({ data }) => {
  const [editorState, setEditorState] = useState();

  const {
    containTextEditor,
    position,
    style,
    size,
  } = data;

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
          toolbarHidden
          readOnly
          // customStyleMap={styleMap}
          wrapperClassName="wrapper-class2"
          editorClassName="editor-class"
          // toolbarClassName="toolbar-class"
          editorStyle={{
            backgroundColor: 'transparent', width: '100% !important', padding: '0px', border: 'none', lineHeight: '2em'
          }}
        />

        <Div width="100%" horizontal={position}>
          <div style={{ width: size, borderTop: style }} />
        </Div>

      </Div>
    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
