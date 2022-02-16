import React from 'react';
import PropTypes from 'prop-types';
import { Div } from 'component';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NewCard from './newCard';

const containFullImage = {
  height: '500px', style: 'cover', position: 'center top', urlPhoto: '/static/images/bg7.jpg',
};

const containSubTitle = {
  style: 'solid 2px black', position: 'left', size: '50px', containTextEditor: undefined
};

const containDivider = {
  style: 'solid 2px black', position: 'center', size: '100%', margin: '20px'
};

const containDoubleImage = {
  height1: '500px',
  style1: 'cover',
  position1: 'center top',
  urlPhoto1: '/static/images/bg7.jpg',
  height2: '500px',
  style2: 'cover',
  position2: 'center top',
  urlPhoto2: '/static/images/bg7.jpg'
};

const containGrid = {
  ...containFullImage,
  // height: '400px',
  size: 6,
  containTextEditor: undefined,
  reverse: false
};

const containerTitle = {
  urlPhoto: '/static/images/bg7.jpg',
  title: 'Title',
  author: 'Author',
  date: new Date()
};

const SectionMap = ({ useCards, useNewComponent }) => {
  const [cards, setCards] = useCards;
  const [newComponent, setNewComponent] = useNewComponent;

  return (
    <Div width="100%" horizontal="center" vertical="top" style={{ maxHeight: 'calc(100vh)', overflowY: 'scroll', paddingTop: '5px' }}>
      <DndProvider backend={HTML5Backend}>
        <NewCard index={cards.length} setNewComponent={setNewComponent} contain={containerTitle} component="Title" height="80px" />
        <NewCard index={cards.length} setNewComponent={setNewComponent} contain={containSubTitle} component="Sub Title" height="80px" />
        <NewCard index={cards.length} setNewComponent={setNewComponent} contain={containDivider} component="Divider" height="80px" />
        <NewCard index={cards.length} setNewComponent={setNewComponent} contain={undefined} component="Text Editor" height="80px" />
        <NewCard index={cards.length} setNewComponent={setNewComponent} contain={containFullImage} component="Full Image" height="80px" />
        <NewCard index={cards.length} setNewComponent={setNewComponent} contain={containDoubleImage} component="Double Image" height="80px" />
        <NewCard index={cards.length} setNewComponent={setNewComponent} contain={containGrid} component="Image with Text" height="80px" />
        <NewCard index={cards.length} setNewComponent={setNewComponent} contain={containGrid} component="Image with Text and Button" height="80px" />
      </DndProvider>
    </Div>
  );
};

SectionMap.propTypes = {};

export default SectionMap;
