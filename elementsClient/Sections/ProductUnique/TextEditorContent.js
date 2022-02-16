import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

import {
  EditorState, convertToRaw, convertFromRaw, convertFromHTML
} from 'draft-js';

import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const CustonOptions = ({ onClick, visible }) => {
  const a = 0;
  return (
    <Div style={{ padding: '2px 2px 5px 2px', margin: '0px 0px 2px 2px' }}>
      <Div onClick={onClick}>
        {visible ? (<VisibilityOffIcon />) : (<VisibilityIcon />)}
      </Div>
    </Div>
  );
};

const TextEditor = ({
  contain
}) => {
  const ref = React.useRef();
  const [edit, setEdit] = useState(true);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  useEffect(() => {
    if (typeof contain === 'string') {
      const textConvert = {
        blocks: [{
          data: { 'text-align': 'justify' },
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: 'h7tb',
          text: `${contain}`,
          type: 'unstyled',
        }],
        entityMap: {}
      };

      setEditorState(EditorState.createWithContent(
        convertFromRaw(textConvert)
      ));
    } else if (contain) {
      setEditorState(EditorState.createWithContent(
        convertFromRaw(contain)
      ));
    } else setEditorState(EditorState.createEmpty());
  }, [contain]);

  return (
    <div ref={ref} style={{ width: '100%' }}>
      <Editor
        editorKey="editor"
        editorState={editorState}
        toolbarHidden
        // toolbarHidden
        // readOnly
        // customStyleMap={styleMap}
        wrapperClassName="wrapper-class2"
        editorClassName="editor-class2"
        toolbarClassName="toolbar-class2"
        style={{ maxHeight: '300px', maxWidth: '90%' }}
        editorStyle={{
          backgroundColor: 'transparent', width: '100% !important', padding: '0px', border: 'none', lineHeight: '1.2em'
        }}
      />
    </div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
