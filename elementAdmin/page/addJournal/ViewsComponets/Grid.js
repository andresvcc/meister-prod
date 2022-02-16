import React, {
  useState, useEffect, useMemo, useRef
} from 'react';
import PropTypes from 'prop-types';
import { redux, Div, hookDeviceInfo } from 'components';
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

const TextEditor = ({ contain, setEditingContain }) => {
  const { type, hookWidth } = hookDeviceInfo();
  const [editorState, setEditorState] = useState();
  const [mainHeight, setMainHeight] = useState();
  const [mainHeightEditor, setMainHeightEditor] = useState();

  const ref = useRef();

  useEffect(() => {
    if (contain.containTextEditor) {
      setEditorState(EditorState.createWithContent(
        convertFromRaw(contain.containTextEditor)
      ));
    } else setEditorState(EditorState.createEmpty());
  }, []);

  const setEditorReference = (ref) => {
    const height = ref?.editorContainer?.clientHeight;
    if (height) {
      if (height > 100) setMainHeightEditor(height);
    }
  };

  const EditorMemo = React.memo(() => {
    if (editorState === undefined) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div>
        <Div>
          <Div>
            <Editor
              editorRef={setEditorReference}
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
      </div>
    );
  });

  useEffect(() => {
    const height = ref?.current?.clientHeight;
    if (height > 100) {
      setMainHeight(height);
    }
  }, [hookWidth, ref]);

  const style = useMemo(() => ({
    backgroundImage: `url('${contain.urlPhoto}')`,
    // backgroundColor: 'red',
    maxHeight: '300px',
    minHeight: type === 'mobile' && hookWidth < 600 ? '40vh' : `${(mainHeight || mainHeightEditor) < 299 ? 300 : (mainHeight || mainHeightEditor || 300)}px`,
    backgroundSize: contain.style,
    backgroundPosition: contain.position,
  }), [mainHeight, mainHeightEditor]);

  if (contain.reverse) {
    return (
      <Div width="100%" style={{ marginBottom: '20px', marginTop: '20px' }}>
        <Div width={['100%', '100%', '700px', '900px', '1200px']}>
          <GridContainer spacing={3} alignItems="center">
            <GridItem num={[12, 6, 6, 6, 6].map((a, i) => (i < 1 ? 12 : contain.size))}>
              <div ref={ref}>
                <EditorMemo />
              </div>
            </GridItem>
            <GridItem num={[12, 6, 6, 6, 6].map((a, i) => (i < 1 ? 12 : 12 - contain.size))}>
              <div className="bannerCover" style={{ ...style }} />
            </GridItem>
          </GridContainer>
        </Div>
      </Div>
    );
  }

  return (
    <Div width="100%" style={{ marginBottom: '20px', marginTop: '20px' }}>
      <Div width={['100%', '100%', '700px', '900px', '1200px']}>
        <GridContainer spacing={3} alignItems="center">
          <GridItem num={[12, 6, 6, 6, 6].map((a, i) => (i < 1 ? 12 : contain.size))}>
            <div className="bannerCover" style={{ ...style }} />
          </GridItem>
          <GridItem num={[12, 6, 6, 6, 6].map((a, i) => (i < 1 ? 12 : 12 - contain.size))}>
            <div ref={ref}>
              <EditorMemo />
            </div>
          </GridItem>
        </GridContainer>
      </Div>
    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
