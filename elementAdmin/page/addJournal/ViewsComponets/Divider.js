import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Div } from 'components';

const TextEditor = ({ contain, setEditingContain }) => {
  const {
    position,
    style,
    size,
    margin
  } = contain;

  return (
    <Div width="100%">

      <Div width={['100%', '100%', '700px', '900px', '1200px']} vertical="top" style={{ marginBottom: margin, paddingTop: margin }}>
        <Div width="100%" horizontal={position} style={{ paddingBottom: '20px' }}>
          <div style={{ width: size, borderTop: style }} />
        </Div>
      </Div>

    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
