import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import GridItem from '@/components/Grid/GridItem';

const ItemTypes = {
  CARD: 'card',
};

const style = {
  border: '1px dashed gray',
  margin: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  width: '100%',
};

const Card = ({
  id, element, index, moveCard, end
}) => {
  const ref = useRef(null);

  const [{ handlerId, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
      };
    },
    hover(item, monitor) {
      // Don't replace items with themselves
      if ((!ref.current) || (item.index === index)) {
        return;
      }
      moveCard(item.index, index);
      // eslint-disable-next-line no-param-reassign
      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end(item, monitor) {
      const { id, index } = item;
      end(item);
    },
  });

  const opacity = isDragging ? 0 : isOver ? 0.3 : 1;

  drag(drop(ref));

  return (
    <GridItem num={index === 0 ? [12, 12, 12, 12, 12] : [4, 4, 4, 4, 4]}>
      <div ref={ref} data-handler-id={handlerId} style={{ ...style, opacity }}>
        {element}
      </div>
    </GridItem>
  );
};

export default Card;
