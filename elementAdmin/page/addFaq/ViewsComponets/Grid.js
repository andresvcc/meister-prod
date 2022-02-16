import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

import {
  EditorState, convertToRaw, convertFromRaw,
} from 'draft-js';

import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const TextEditor = ({ contain, setEditingContain }) => {
  const style = {
    backgroundImage: `url('${contain.urlPhoto}')`,
    minHeight: contain.height,
    backgroundSize: contain.style,
    backgroundPosition: contain.position,
  };

  const [editorState, setEditorState] = useState();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const textConvert = convertToRaw(editorState.getCurrentContent());
    setEditingContain(textConvert);
  };

  useEffect(() => {
    if (contain.containTextEditor) {
      setEditorState(EditorState.createWithContent(
        convertFromRaw(contain.containTextEditor)
      ));
    } else setEditorState(EditorState.createEmpty());
  }, []);

  return (
    <GridContainer spacing={1} alignItems="flex-start">
      <GridItem num={[6, 6, 6, 6, 6].map((a) => contain.size)}>
        {
            !contain.reverse ? (
              <Div width="100%">
                <Div width="100%">
                  <div className="bannerCover" style={style} />
                </Div>
              </Div>
            ) : (
              <Editor
                editorKey="editor"
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarHidden
                readOnly
                wrapperClassName="wrapper-class2"
                editorClassName="editor-class2"
                // toolbarClassName="toolbar-class"
                editorStyle={{
                  backgroundColor: 'transparent', width: '100% !important', padding: '0px', border: 'none', lineHeight: '1.2em'
                }}
              />
            )
        }
      </GridItem>
      <GridItem num={[6, 6, 6, 6, 6].map((a) => 12 - contain.size)}>
        {
            contain.reverse ? (
              <Div width="100%">
                <Div width="100%">
                  <div className="bannerCover" style={style} />
                </Div>
              </Div>
            ) : (
              <Editor
                editorKey="editor"
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarHidden
                readOnly
                wrapperClassName="wrapper-class2"
                editorClassName="editor-class2"
                // toolbarClassName="toolbar-class"
                editorStyle={{
                  backgroundColor: 'transparent', width: '100% !important', padding: '0px', border: 'none', lineHeight: '1.2em'
                }}
              />
            )
        }
      </GridItem>
    </GridContainer>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
