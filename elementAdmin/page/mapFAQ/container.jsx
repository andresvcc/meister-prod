import React, {
  useState, useCallback, useMemo, useEffect
} from 'react';
import { useRouter } from 'next/router';
import update from 'immutability-helper';
import { redux, Div, hookDeviceInfo } from 'component';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@/components/CustomButtons/Button';
import SaveIcon from '@material-ui/icons/Save';
import Card from './Card';

const maxWidth = 1600;
const elementsParSize = [1, 2, 3, 3, 3];

const styleAdd = {
  border: '1px dashed gray',
  margin: '.5rem',
  backgroundColor: 'white',
  cursor: 'pointer',
  width: '100%',
};

const CardElement = ({
  id, index, element, deleteCard
}) => {
  const { width } = hookDeviceInfo();
  const router = useRouter();

  const widthBox = useMemo(() => {
    if (width > maxWidth) return 250;
    if (width > 1280) return width / (elementsParSize[2] * 2);
    if (width > 960) return width / (elementsParSize[2] * 2);
    if (width > 600) return width / (elementsParSize[1] * 2);
    if (width < 600) return width / (elementsParSize[1]);

    return width;
  }, [width]);

  return (
    <div>
      <Div width="100%">
        <Div height={`${widthBox + 120}px`} width="100%" style={{ cursor: 'move' }}>
          <img src={element.photo} alt="s " className="boxCardImage" />
        </Div>

        <Div height="30px" width="100%" horizontal="left" style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '15px' }}>
          {element.category}
        </Div>

        <Div
          width="100%"
          horizontal="at"
          row
          style={{
            textTransform: 'capitalize', fontWeight: '500', fontFamily: 'Gorgia', fontSize: '25px', lineHeight: '25px'
          }}
        >
          {element.title}
          <Div row width="100px" horizontal="around">
            <Button justIcon color="success">
              <EditIcon
                style={{ width: '25px', height: '25px' }}
                onClick={() => router.push({
                  pathname: '/admin/addFaqArticle',
                  query: { article: element.title },
                })}
              />
            </Button>
            <Button justIcon color="danger" onClick={() => deleteCard({ title: element.title })}>
              <DeleteForeverIcon style={{ width: '25px', height: '25px' }} />
            </Button>
          </Div>
        </Div>
        <Div height="40px" width="100%" horizontal="left" style={{ textTransform: 'uppercase', fontSize: '11px' }}>
          <span>{`${element.time} Minutes Read`}</span>
        </Div>
      </Div>
    </div>
  );
};

const Container = ({ useSocketHook }) => {
  const [{ faqJournal = {} }] = redux();
  const { list = {}, order = [] } = faqJournal;
  const [cards, setCards] = useState([]);
  const [emit, socket] = useSocketHook;

  const { width } = hookDeviceInfo();
  const router = useRouter();

  const widthBox = useMemo(() => {
    if (width > maxWidth) return 250;
    if (width > 1280) return width / (elementsParSize[2] * 2);
    if (width > 960) return width / (elementsParSize[2] * 2);
    if (width > 600) return width / (elementsParSize[1] * 2);
    if (width < 600) return width / (elementsParSize[1]);
    return width;
  }, [width]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    // const dragCard = cards[dragIndex];
    // setCards(update(cards, {
    //   $splice: [
    //     [dragIndex, 1],
    //     [hoverIndex, 0, dragCard],
    //   ],
    // }));
  }, [cards]);

  const deleteCard = async ({ title }) => {
    await emit('faqJournalOrder', { value: order.filter((a) => a !== title) });
  };

  const end = useCallback(async ({ id, index }) => {
    const dragCard = cards[id];
    const hoverCard = cards[index];
    const newList = {
      ...cards,
      [id]: {
        ...hoverCard, index: dragCard.index, id: dragCard.id
      },
      [index]: {
        ...dragCard, index: hoverCard.index, id: hoverCard.id
      }
    };
    // setCards(Object.values(newList));
    const data = Object.values(newList).map((a, i) => a.title);
    await emit('faqJournalOrder', { value: data });
  }, [cards]);

  useEffect(() => {
    if (order.length > 0) {
      setCards(order.map((val, i) => ({
        ...list[val],
        index: i,
        id: i,
      })));
    }
  }, [list]);

  const renderCard = (card, index) => (<Card key={card.id} index={index} id={card.id} element={<CardElement index={index} id={card.id} element={card} deleteCard={deleteCard} />} moveCard={moveCard} end={end} />);

  return (
    <>
      <GridContainer>
        {cards.map((card, i) => renderCard(card, i))}
        <GridItem num={cards.length === 0 ? [12, 12, 12, 12, 12] : [4, 4, 4, 4, 4]}>
          <Div height={`${widthBox + 244}px`} style={{ ...styleAdd, opacity: 0.5 }} onClick={() => router.push('/admin/addFaqArticle')}>
            <AddIcon style={{ width: '50px', height: '50px' }} />
            <h5>Create new article</h5>
          </Div>
        </GridItem>
      </GridContainer>
    </>
  );
};

Container.propTypes = {};

export default Container;
