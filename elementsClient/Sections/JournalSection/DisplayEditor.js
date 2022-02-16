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
    <Div width="100%" style={{ marginBottom: '20px' }}>
      <Div width={['100%', '100%', '700px', '900px', '1200px']} vertical="top" style={{ overflowX: 'hidden' }}>
        <div style={{ height: '20px' }} />
        <Editor
          editorKey="editor"
          editorState={editorState}
          toolbarHidden
          readOnly
          wrapperClassName="wrapper-class2"
          editorClassName="editor-class2"
          // toolbarClassName="toolbar-class"
          editorStyle={{
            backgroundColor: 'transparent', width: '100% !important', padding: '0px', border: 'none', overflowX: 'hidden'
          }}
        />
      </Div>
    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
