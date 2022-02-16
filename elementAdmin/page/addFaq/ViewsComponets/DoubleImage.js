import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

const TextEditor = ({ contain, setEditingContain }) => {
  const style1 = {
    backgroundImage: `url('${contain.urlPhoto1}')`,
    minHeight: contain.height1,
    backgroundSize: contain.style1,
    backgroundPosition: contain.position1,
  };

  const style2 = {
    backgroundImage: `url('${contain.urlPhoto2}')`,
    minHeight: contain.height2,
    backgroundSize: contain.style2,
    backgroundPosition: contain.position2,
  };

  return (
    <GridContainer spacing={1} alignItems="flex-start">
      <GridItem num={[6, 6, 6, 6, 6]}>
        <Div width="100%">
          <Div width="100%">
            <div className="bannerCover" style={style1} />
          </Div>
        </Div>
      </GridItem>
      <GridItem num={[6, 6, 6, 6, 6]}>
        <Div width="100%">
          <Div width="100%">
            <div className="bannerCover" style={style2} />
          </Div>
        </Div>
      </GridItem>
    </GridContainer>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
