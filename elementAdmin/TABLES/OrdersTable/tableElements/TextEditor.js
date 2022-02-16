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

const productToTable = ({ provider, order, products = [] }) => `
  <p>Hello ${provider.manager},</p>
  <br />
  <p>I am writing this message to place an order on behalf of ${`${order.fname}`.toUpperCase()} ${`${order.lname}`.toUpperCase()}, the list of products and shipping details are below.</p>
  <br />
  <p>${`${order.fname}`.toUpperCase()} ${`${order.lname}`.toUpperCase()}</p>
  <p>${order.address}</p>
  <p>${order.zipCode} ${order.zipArea}</p>
  <p>${order.country}</p>
  <p>${order.email}</p>
  <br />
  <p>In total are ${products?.length} product${products?.length > 1 ? 's' : ''}</p>
  <br />
  ${products?.map((val, i) => `
  <strong>${i + 1})</strong>
  <p><strong>Product:</strong> ${val.name}</p>
  <p><strong>Color:</strong> ${val.colorName} </p>
  <p><strong>Size:</strong> ${val.sizeName} </p>`)}
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
