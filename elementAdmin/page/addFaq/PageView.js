import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Div } from 'component';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Contains from './Container';

const PageView = ({ useCards, useNewComponent, open }) => (
  <Div width="100%" horizontal="center">
    <DndProvider backend={HTML5Backend}>
      <Contains useCards={useCards} useNewComponent={useNewComponent} open={open} />
    </DndProvider>
  </Div>
);

PageView.propTypes = {};

export default PageView;
