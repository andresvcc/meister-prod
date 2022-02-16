import React, {
  useState, useEffect, useMemo, useRef
} from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

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

  const ref = useRef(null);

  useEffect(() => {
    if (data.containTextEditor) {
      setEditorState(EditorState.createWithContent(
        convertFromRaw(data.containTextEditor)
      ));
    } else setEditorState(EditorState.createEmpty());
  }, []);

  const divHeight = useMemo(() => (ref.current ? ref.current.clientHeight : 0), [data, editorState]);

  const style = {
    backgroundImage: `url('${data.urlPhoto}')`,
    // backgroundColor: 'red',
    minHeight: '300px',
    maxHeight: '300px',
    backgroundSize: data.style,
    backgroundPosition: data.position,
  };

  return (
    <Div width="100%">
      <Div width="100%" vertical="top" style={{ overflowX: 'hidden' }}>
        <GridContainer spacing={0} alignItems="center">
          <GridItem num={[12, 6, 6, 6, 6].map((a, i) => (i < 2 ? 12 : data.size))}>
            {
                data.reverse ? (
                  <Div width="calc(100% - 10px)" height="400px">
                    <Div width="100%">
                      <Editor
                        editorKey="editor"
                        editorState={editorState}
                        toolbarHidden
                        readOnly
                        wrapperClassName="wrapper-class2"
                        editorClassName="editor-class2"
                        // toolbarClassName="toolbar-class"
                        editorStyle={{
                          backgroundColor: 'transparent', width: '100% !important', padding: '0px', border: 'none'
                        }}
                      />
                    </Div>
                  </Div>
                ) : (
                  <Div width="100%" height="400px">
                    <Div width="100%">
                      <div className="bannerCover" style={{ ...style, }} />
                    </Div>
                  </Div>
                )
            }
          </GridItem>
          <GridItem num={[12, 6, 6, 6, 6].map((a, i) => (i < 2 ? 12 : 12 - data.size))}>
            {
                !data.reverse ? (
                  <Div width="calc(100% - 10px)" height="400px">
                    <Div width="100%">
                      <Editor
                        editorKey="editor"
                        editorState={editorState}
                        toolbarHidden
                        readOnly
                        wrapperClassName="wrapper-class2"
                        editorClassName="editor-class2"
                        // toolbarClassName="toolbar-class"
                        editorStyle={{
                          backgroundColor: 'transparent', width: '100% !important', padding: '0px', border: 'none'
                        }}
                      />
                    </Div>
                  </Div>
                ) : (
                  <Div width="100%" height="400px">
                    <Div width="100%">
                      <div className="bannerCover" style={{ ...style }} />
                    </Div>
                  </Div>
                )
            }
          </GridItem>
        </GridContainer>
      </Div>
    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
