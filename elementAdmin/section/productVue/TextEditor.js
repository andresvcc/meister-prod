import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
  style, readOnly = false, toolbarHidden, maxCaracter = 700, contain, variantUpdate, setEditingContain, setHeight = () => false, minHeight = 300, i, superFancyBlockquote, titleBlockquote
}) => {
  const ref = React.useRef();
  const [edit, setEdit] = useState(true);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();

    if (type === 'unstyled') {
      return 'superFancyBlockquote';
    }
  }

  function myBlockStyleFnTitle(contentBlock) {
    const type = contentBlock.getType();

    if (type === 'unstyled') {
      return 'superFancyTitle';
    }
  }

  useEffect(() => {
    const height = ref?.current?.clientHeight;
    if (setHeight && height > 0) {
      setHeight(height);
    }
  }, [ref?.current?.clientHeight, editorState, contain]);

  const onBlur = () => {
    const textConvert = convertToRaw(editorState.getCurrentContent());
    if (setEditingContain) setEditingContain(textConvert);
  };

  useEffect(() => {
    if (typeof contain === 'string') {
      const textConvert = {
        blocks: [{
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: 'h7tb',
          text: `${contain}`,
          type: 'unstyled'
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
  }, [variantUpdate]);

  const minHeigth = React.useMemo(() => {
    if (typeof contain === 'string') {
      return '30px';
    }

    return `${contain?.blocks.lenght}px`;
  }, [contain]);

  if (readOnly === true) {
    return (
      <div ref={ref} style={{ width: '100%' }}>
        <Editor
          editorKey={`editor ${i}`}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbarHidden={toolbarHidden || readOnly}
          readOnly={readOnly}
      // readOnly
      // customStyleMap={styleMap}
          wrapperClassName="wrapper-class2"
          editorClassName="editor-class2"
          toolbarClassName="toolbar-class2"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: false, options: ['unordered', 'ordered'] },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            fontFamily: {
              options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'Roboto', 'NovaLight', 'GeorgiaLight', 'Taviraj', 'Ubuntu', 'Taviraj', 'PT Serif Caption', 'GorgiaBold'],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
            },
          }}
          style={{ maxWidth: '90%' }}
          editorStyle={{
            backgroundColor: readOnly ? 'transparent' : ref?.current?.clientHeight > maxCaracter ? '#ffb3b3' : edit ? '#f7f6f7' : 'transparent', minHeight: `${minHeight + (readOnly ? 100 : 0)}px`, width: '100% !important', padding: '0px', border: 'none', lineHeight: '1.2em', overflow: 'hidden', ...style
          }}
          handleBeforeInput={() => ref?.current?.clientHeight > maxCaracter}
          toolbarCustomButtons={[<CustonOptions visible={edit} onClick={() => setEdit(!edit)} />]}
          onBlur={onBlur}
          {...superFancyBlockquote ? { blockStyleFn: myBlockStyleFn } : {}}
          {...titleBlockquote ? { blockStyleFn: myBlockStyleFnTitle } : {}}
        />
      </div>
    );
  }

  return (
    <div ref={ref} style={{ width: '100%' }}>
      <Editor
        editorKey={`editor ${i}`}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarHidden={toolbarHidden}
        // readOnly
        // customStyleMap={styleMap}
        wrapperClassName="wrapper-class2"
        editorClassName="editor-class2"
        toolbarClassName="toolbar-class2"
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: false, options: ['unordered', 'ordered'] },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          fontFamily: {
            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'Roboto', 'NovaLight', 'GeorgiaLight', 'Taviraj', 'Ubuntu', 'Taviraj', 'PT Serif Caption', 'GorgiaBold'],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
        }}
        style={{ maxWidth: '90%' }}
        editorStyle={{
          backgroundColor: ref?.current?.clientHeight > maxCaracter ? '#ffb3b3' : edit ? '#f7f6f7' : 'transparent', minHeight: `${minHeight + (readOnly ? 100 : 0)}px`, width: '100% !important', padding: '0px', border: 'none', lineHeight: '1.2em', overflow: 'hidden', ...style
        }}
        handleBeforeInput={() => ref?.current?.clientHeight > maxCaracter}
        toolbarCustomButtons={[<CustonOptions visible={edit} onClick={() => setEdit(!edit)} />]}
        onBlur={onBlur}
        {...superFancyBlockquote ? { blockStyleFn: myBlockStyleFn } : {}}
        {...titleBlockquote ? { blockStyleFn: myBlockStyleFnTitle } : {}}
      />
    </div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
