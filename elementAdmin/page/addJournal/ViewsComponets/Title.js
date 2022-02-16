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

const TextEditor = ({ contain, setEditingContain }) => {
  const {
    urlPhoto,
    title,
    author,
    date,
  } = contain;

  const textDate = useMemo(() => (new Date(date)).toDateString(), [date]);

  return (
    <Div width="100%" style={{ marginBottom: '20px', marginTop: '10px' }}>
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
