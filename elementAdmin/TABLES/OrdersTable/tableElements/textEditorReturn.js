import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';

import {
  EditorState, convertToRaw, convertFromRaw,
} from 'draft-js';

import { convertToHTML, convertFromHTML } from 'draft-convert';

import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <p style={{
        width: '100%',
        height: '280px',
        textAlign: 'center',
        verticalAlign: 'center',
        display: 'inline-block',
      }}
      >
        Loading...
      </p>
    )
  }
);

const productToTable = ({ product, order }) => `
  <p>Hello ${order.fname} ${order.lname}, </p>
  <br />
  <p>We have received your report, and we want to act as quickly as possible to resolve this issue in the best possible way.</p>
  <br />
  <p>concerning the product: ${product.name.replace(/_[0-9]*/, '')}, ${product.colorName}${product.sizeName.replaceAll('-', ',')}</p>
  <p>amounting to ${product.currency} ${product.price}</p>
  <p>reason: ${product.report.reason} x ${product.report.qty}</p>
  <br />
  <p>We will proceed to send you a new ${product.name.replace(/_[0-9]*/, '')}</p>
  <br />
`;

const TextEditor = ({ contain, setEditingContain }) => {
  const [editorState, setEditorState] = useState();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const textConvert = convertToHTML(editorState.getCurrentContent());
    setEditingContain(JSON.stringify(textConvert));
  };

  useEffect(() => {
    if (contain) {
      setEditorState(EditorState.createWithContent(
        convertFromHTML(productToTable(contain))
      ));
    } else setEditorState(EditorState.createEmpty());
  }, []);

  if (editorState === undefined) {
    return (<div>Loading...</div>);
  }

  return (
    <Div width="100%" vertical="top">
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
          backgroundColor: '#f7f6f7', minHeight: '300px', maxHeight: '350px', width: '100% !important', padding: '0px', border: 'none', lineHeight: '1.2em'
        }}
      />
    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
