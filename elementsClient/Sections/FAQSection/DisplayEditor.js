import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';

import {
  EditorState, convertFromRaw,
} from 'draft-js';

import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const TextEditor = ({ data }) => {
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    if (data) {
      setEditorState(EditorState.createWithContent(
        convertFromRaw(data)
      ));
    } else setEditorState(EditorState.createEmpty());
  }, []);

  return (
    <Div width="100%" horizontal="left" vertical="top">
      <Div width="100%" vertical="top" style={{ overflowX: 'hidden' }}>
        <div style={{ height: '5px' }} />
        <Editor
          editorKey="editor"
          editorState={editorState}
          toolbarHidden
          readOnly
          wrapperClassName="wrapper-class2"
          editorClassName="editor-class2"
          // toolbarClassName="toolbar-class"
          editorStyle={{
            backgroundColor: 'transparent', width: '100% !important', padding: '0px', border: 'none', overflowX: 'hidden', overflowY: 'hidden', lineHeight: '25px'
          }}
        />
      </Div>
    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
