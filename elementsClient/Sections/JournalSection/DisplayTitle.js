import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';

import {
  EditorState, convertToRaw, convertFromRaw,
} from 'draft-js';

import dynamic from 'next/dynamic';
import Span from '@/components/Typography/Spam';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const TextEditor = ({ data }) => {
  const {
    urlPhoto,
    title,
    author,
    date,
  } = data;

  const textDate = useMemo(() => (new Date(date)).toDateString(), [date]);

  return (
    <Div width="100%" style={{ marginBottom: '50px', marginTop: '50px' }}>
      <Div width={['100%', '100%', '700px', '900px', '1200px']} vertical="top">
        <div style={{ height: '20px' }} />
        <Span type="JournalTitleDocument">
          {title}
        </Span>
        <Span type="JournalAuthorDocument">
          {`Word by ${author}`}
        </Span>
        <Span type="JournalDateDocument">
          {`${textDate}`}
        </Span>
      </Div>
    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
