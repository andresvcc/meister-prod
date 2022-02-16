import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

import {
  EditorState, convertFromRaw,
} from 'draft-js';

import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const TextEditor = ({ data }) => {
  const style1 = {
    backgroundImage: `url('${data.urlPhoto1}')`,
    minHeight: data.height1,
    backgroundSize: data.style1,
    backgroundPosition: data.position1,
  };

  const style2 = {
    backgroundImage: `url('${data.urlPhoto2}')`,
    minHeight: data.height2,
    backgroundSize: data.style2,
    backgroundPosition: data.position2,
  };

  return (
    <Div width="100%">
      <Div width="100%" vertical="top" style={{ overflowX: 'hidden' }}>
        <GridContainer spacing={0} alignItems="flex-start">
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
      </Div>
    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
