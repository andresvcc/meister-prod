import { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Div } from 'component';

const ItemTypes = {
  CARD: 'card',
};

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  width: 'calc(100% - 50px)',
  marginLeft: '30px'
};

const Card = ({
  id, component, index, setNewComponent, contain, height = '100px'
}) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (isDragging) {
      setNewComponent({
        id,
        component,
        contain,
      });
    } else {
      setNewComponent({});
    }
  }, [isDragging]);

  drag(drop(ref));
  const opacity = isDragging ? 0 : 1;
  return (
    <div
      ref={ref}
      style={{
        ...style, opacity
      }}
      data-handler-id={handlerId}
    >
      <Div height={height}>
        {component}
      </Div>
    </div>
  );
};

export default Card;
