import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Div } from 'components';

const TextEditor = ({ data }) => {
  const {
    position,
    style,
    size,
    margin
  } = data;

  return (
    <Div width="100%">

      <Div width={['100%', '100%', '700px', '900px', '1200px']} vertical="top" style={{ marginBottom: margin, paddingTop: margin }}>
        <Div width="100%" horizontal={position}>
          <div style={{ width: size, borderTop: style }} />
        </Div>
      </Div>

    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
