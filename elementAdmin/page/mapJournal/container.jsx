import React, {
  useState, useCallback, useMemo, useEffect
} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import update from 'immutability-helper';
import { redux, Div, hookDeviceInfo } from 'component';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@/components/CustomButtons/Button';
import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components/Grid/GridContainer';
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
        <Div height={`${widthBox + 120}px`} width="100%" style={{ cursor: 'move', position: 'relative' }}>
          <Image src={element.photo} alt="s " className="boxCardImage" layout="fill" quality={100} placeholder={() => <div style={{ width: '100%', height: '250px', background: 'grey' }}>Loading...</div>} />
        </Div>

        <Div
          height="30px"
          width="100%"
          horizontal="left"
          style={{
            textTransform: 'uppercase', fontWeight: 'bold', fontSize: '15px', marginLeft: '10px'
          }}
        >
          {element.category}
        </Div>

        <Div
          width="100%"
          horizontal="at"
          row
        >
          <Div
            width="calc(100% - 60px)"
            height="60px"
            style={{
              textTransform: 'capitalize', fontWeight: '500', fontFamily: 'Gorgia', fontSize: '25px', lineHeight: '23px', marginLeft: '5px'
            }}
          >
            {`${`${element.title}`.slice(0, 65)}${[...element.title].length > 65 ? '...' : ''} `}
          </Div>
        </Div>
        <Div
          height="60px"
          width="100%"
          horizontal="at"
          style={{
            textTransform: 'uppercase', fontSize: '11px', paddingLeft: '10px', paddingRight: '10px'
          }}
          row
        >
          <span>{`${element.time} Minutes Read`}</span>
          <Div row width="100px" horizontal="around">
            <Button justIcon color="success">
              <EditIcon
                style={{ width: '25px', height: '25px' }}
                onClick={() => router.push({
                  pathname: '/admin/addJournalArticle',
                  query: { article: element.title },
                })}
              />
            </Button>
            <Button justIcon color="danger" onClick={() => deleteCard({ title: element.title })}>
              <DeleteForeverIcon style={{ width: '25px', height: '25px' }} />
            </Button>
          </Div>
        </Div>
      </Div>
    </div>
  );
};

const Container = ({ useSocketHook }) => {
  const [{ articlesJournal = {} }] = redux();
  const { list = {}, order = [] } = articlesJournal;
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
    await emit('articlesJournalOrder', { value: order.filter((a) => a !== title) });
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
    await emit('articlesJournalOrder', { value: data });
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
          <Div height={`${widthBox + 274}px`} style={{ ...styleAdd, opacity: 0.5 }} onClick={() => router.push('/admin/addJournalArticle')}>
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
