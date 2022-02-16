import React, {
  useState, useCallback, useRef, useMemo, useEffect
} from 'react';
import update from 'immutability-helper';
import { Div, hookDeviceInfo } from 'component';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Card from './Card';
import FinCard from './FinCard';

const style = {
  width: '100%',
};

const Container = ({ useCards, useNewComponent, open }) => {
  const [cards, setCards] = useCards;
  const [newComponent, setNewComponent] = useNewComponent;
  const { height } = hookDeviceInfo();

  const moveCard = useCallback(({ dragIndex, hoverIndex }) => {
    const dragCard = cards[dragIndex];
    if (dragCard) {
      setCards(update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      }));
    } else if (!newComponent.id) {
      const newDragCard = {
        id: cards.length > 0 ? cards.sort((a, b) => a.id - b.id)[cards.length - 1].id + 1 : 0,
        component: newComponent.component,
        editing: true,
        contain: newComponent.contain,
      };

      setCards(update(cards, {
        $splice: [
          [cards.length + 1, 1],
          [hoverIndex, 0, newDragCard],
        ],
      }));
    } else if (cards.filter((a) => a.id === newComponent.id).length === 0) {
      const newDragCard = {
        id: newComponent.id,
        component: newComponent.component,
        editing: true,
        contain: newComponent.contain,
      };

      setCards(update(cards, {
        $splice: [
          [cards.length + 1, 1],
          [hoverIndex, 0, newDragCard],
        ],
      }));
    } else {
      const newDragCard = {
        id: cards.length > 0 ? cards.sort((a, b) => a.id - b.id)[cards.length - 1].id + 1 : 0,
        component: newComponent.component,
        editing: true,
        contain: newComponent.contain,
      };

      setCards(update(cards, {
        $splice: [
          [cards.length + 1, 1],
          [hoverIndex, 0, newDragCard],
        ],
      }));
    }
  });

  const deleteCard = ({ index }) => {
    const newList = update(cards, { $splice: [[index, 1]] });
    setCards(newList);
  };

  const editCard = ({ index, editedDragCard }) => {
    const newList = update(cards, { [index]: { contain: { $set: editedDragCard }, editing: { $set: false } } });
    setCards(newList);
  };

  const setEditingProps = ({ value, index }) => {
    
    const newList = update(cards, { [index]: { editing: { $set: value } } });
    setCards(newList);
  };

  const renderCard = (card, index) => (
    <GridItem num={[12, 12, 12, 12, 12]} key={card.id}>
      <Card
        index={index}
        id={card.id}
        component={card.component}
        editing={card.editing}
        contain={card.contain}
        moveCard={moveCard}
        newComponent={card.id === newComponent.id}
        deleteCard={deleteCard}
        editCard={editCard}
        open={open}
        setEditing={(value) => setEditingProps({ value, index })}
      />
    </GridItem>
  );

  const ref = useRef(null);
  const divHeight = useMemo(() => (ref.current ? ref.current.clientHeight : 0), [cards, newComponent]);

  const mao = useMemo(() => cards.map((card, i) => renderCard(card, i)), [cards, newComponent]);

  return (
    <>
      <div ref={ref} style={style}>
        <GridContainer spacing={1} alignItems="flex-start">
          {mao}
        </GridContainer>
      </div>
      <FinCard index={mao.length} id={mao.length + 1} component={<Div dev widtht="100%" height={`${height - 200 - divHeight}px`}>FIN</Div>} moveCard={moveCard} />
    </>
  );
};

export default Container;
