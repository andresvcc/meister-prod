import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';

import {
  EditorState, convertToRaw, convertFromRaw,
} from 'draft-js';

import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const TextEditor = ({ contain, setEditingContain }) => {
  const [editorState, setEditorState] = useState();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const textConvert = convertToRaw(editorState.getCurrentContent());
    setEditingContain(textConvert);
  };

  useEffect(() => {
    if (contain) {
      setEditorState(EditorState.createWithContent(
        convertFromRaw(contain)
      ));
    } else setEditorState(EditorState.createEmpty());
  }, []);

  return (
    <Div width="100%" dev>
      <Div width={['100%', '100%', '700px', '900px', '1200px']} vertical="top">
        <div style={{ height: '20px' }} />
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
            inline: { inDropdown: true },
            list: { inDropdown: false, options: ['unordered', 'ordered'] },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
          editorStyle={{
            backgroundColor: '#f7f6f7', minHeight: '300px', width: '100% !important', padding: '0px', border: 'none', lineHeight: '1.2em'
          }}
        />
      </Div>
    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
