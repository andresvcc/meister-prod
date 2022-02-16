import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';
import {
  EditorState, convertFromRaw,
} from 'draft-js';
import dynamic from 'next/dynamic';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

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
    <Div width="100%">
      <GridContainer spacing={2}>

        <GridItem num={[12, 6, 6, 6, 6]}>

          <Div width={['100%', '100%', '700px', '900px', '1200px']} vertical="top" dev>
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
                backgroundColor: 'transparent', width: '100% !important', padding: '0px', border: 'none', lineHeight: '1.4em'
              }}
            />

          </Div>

        </GridItem>

        <GridItem num={[12, 6, 6, 6, 6]}>

          <Div
            style={{
              height: data.height,
              width: '100%',
              backgroundRepeat: 'no-repeat',
              backgroundSize: `${data.style}`,
              backgroundPosition: `${data.position}`,
              backgroundImage: `url('${data.urlPhoto}')`,
            }}
          />
        </GridItem>

      </GridContainer>
    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
