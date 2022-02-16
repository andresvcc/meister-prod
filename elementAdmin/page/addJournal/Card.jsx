import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Div } from 'component';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@/components/CustomButtons/Button';
import ViewComponent from './ViewComponent';
import EditorComponent from './EditorComponent';

const ItemTypes = {
  CARD: 'card',
};

const style = {
  padding: 0,
  backgroundColor: 'white',
  width: '100%'
};

const styleIcon = {
  width: '28px',
  height: '28px'
};

const styleIcon2 = {
  width: '35px',
  height: '35px'
};

const Card = ({
  id, component, index, moveCard, newComponent, deleteCard, editCard, open, editing, contain, setEditing
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
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action

      moveCard({ dragIndex, hoverIndex });
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging || newComponent ? 0 : 1;
  const [editingContain, setEditingContain] = useState(contain);

  drag(drop(ref));
  return (
    <div style={{
      width: '100%', opacity, border: '1px dashed gray', marginBottom: '.5rem', paddingBottom: '.3rem'
    }}
    >
      <div
        ref={ref}
        data-handler-id={handlerId}
        style={{
          width: '100%', transition: 'all ease 0.5s',
        }}
      >
        <Div width="100%" horizontal="at" style={{ paddingRight: 15, background: '#b7871a17' }} row>
          <Div width="125px" style={{ background: '#cd9e3121', marginLeft: '10px' }}>
            {`N° ${index}`}
          </Div>
          <Div>{`${component}`}</Div>
          <Div row>

            {
            editing ? (
              <Button
                justIcon
                color="transparent"
                onClick={() => editCard({ index, editedDragCard: editingContain })}
              >
                <SaveIcon style={styleIcon} />
              </Button>
            ) : (
              <Button
                justIcon
                color="transparent"
                onClick={() => setEditing(true)}
              >
                <EditIcon style={styleIcon} />
              </Button>
            )
          }

            <Button
              justIcon
              color="transparent"
              onClick={() => deleteCard({ index })}
            >
              <DeleteIcon style={styleIcon} />
            </Button>

            <SwapVertIcon style={{ ...styleIcon2, cursor: 'move' }} />

          </Div>
        </Div>
      </div>
      <div
        style={{
          ...style
        }}
      >
        {editing ? (EditorComponent[component] ? EditorComponent[component]({ contain: editingContain, setEditingContain }) : 'pas encore developée') : (ViewComponent[component] ? ViewComponent[component]({ contain: editingContain, setEditingContain }) : 'pas encore developée') }
      </div>
    </div>
  );
};

export default Card;
