import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';

const TextEditor = ({ contain, setEditingContain }) => {
  const style = {
    backgroundImage: `url('${contain.urlPhoto}')`,
    minHeight: contain.height,
    backgroundSize: contain.style,
    backgroundPosition: contain.position,
  };

  return (
    <Div width="100%" style={{ marginBottom: '20px', marginTop: '20px' }}>
      <Div width={['100%', '100%', '700px', '900px', '1200px']}>
        <Div width="100%">
          <div className="bannerCover" style={style} />
        </Div>
      </Div>
    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
