import React, { useState, useEffect } from 'react';
// components
import { redux, Div } from 'components';
// assets
import { useRouter } from 'next/router';
import Span from '@/components/Typography/Spam';
import DisplayEditor from '@/elementsClient/Sections/FAQSection/DisplayEditor';
import DisplayGrid from '@/elementsClient/Sections/FAQSection/DisplayGrid';
import DoubleImage from '@/elementsClient/Sections/FAQSection/DoubleImage';
// Link to pour MeisterIcon et Condition d'utilisation

const FullImageRender = ({ data }) => (
  <Div
    height={['40vh', '400px', '500px', '700px', '700px']}
    style={{
      width: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${data.style}`,
      backgroundPosition: `${data.position}`,
      backgroundImage: `url('${data.urlPhoto}')`,
    }}
  />
);

const render = {
  'Text Editor': (data, i) => <DisplayEditor key={`${i + 1}`} data={data} />,
  'Full Image': (data, i) => <FullImageRender key={`${i + 1}`} data={data} />,
  'Image with Text': (data, i) => <DisplayGrid key={`${i + 1}`} data={data} />,
  'Double Image': (data, i) => <DoubleImage key={`${i + 1}`} data={data} />,
};

function actu(prev, next) {
  return prev.title === next.title;
}

const QuestionReponse = React.memo(({ title = '', description = '', content = [] }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [title]);

  return (
    <Div width="100%" horizontal="left" vertical="top" style={{ paddingRight: '15px' }}>
      <Span type="serifTitleBold" style={{ lineHeight: '25px', paddingBottom: '10px' }}>
        {title}
      </Span>
      <Span type="serifDescription" style={{ lineHeight: '25px', textAlign: 'justify', textJustify: 'inter-word', }}>
        {description}
        &nbsp;
        {
         content.length === 0 ? <span />
           : <span role="button" tabIndex={0} aria-hidden="true" onClick={() => setOpen(!open)} style={{ color: '#18374C', fontWeight: 'bold', cursor: 'pointer' }}>Read more...</span>
}
      </Span>
      <Div
        width="100%"
        height={open ? '100%' : '0px'}
        horizontal="left"
        vertical="top"
        style={{
          overflowY: 'hidden', paddingBottom: '10px',
          // background: '#FaFaFa',
        }}
      >
        {
              content.map((a, i) => render[a.component] && render[a.component](a.contain, i))
        }
      </Div>
    </Div>
  );
}, actu);

function GeneralElement(props) {
  const router = useRouter();
  const params = router.query.option;
  const [{ faqJournal = { list: {}, order: [] } }, dispatch] = redux();
  const { list, order } = faqJournal;
  const [articles, setArticles] = useState([]);
  const [tempOrder, setTempOrder] = useState([]);
  const [tempParams, setTempParams] = useState('');

  useEffect(() => {
    if (order.length > 0) {
      if (JSON.stringify(order) !== JSON.stringify(tempOrder)) {
        setArticles([...order].map((a) => list[a]).filter((a) => a.category === params));
        setTempOrder(order);
        setTempParams(params);
      } else if (params !== tempParams) {
        setArticles([...order].map((a) => list[a]).filter((a) => a.category === params));
        setTempOrder(order);
        setTempParams(params);
      }
    }
  }, [order, params]);

  // article.content[0].contain.blocks[0].text;
  const [click, setClick] = useState(false);

  if (!articles) {
    return (
      <div style={{
        minHeight: '75vh', color: 'black', display: 'flex', alignItems: 'center'
      }}
      >
        Loading...
      </div>
    );
  }

  return (
    <Div width="100%" height="auto" vertical="top" style={{ marginLeft: '0px' }}>
      {
        articles.map((article, j) => (
          <Div key={`${j + 1}`} height="auto" width="100%" vertical="top" style={{ marginBottom: '30px' }}>
            <QuestionReponse {...article} />
          </Div>
        ))
      }
    </Div>
  );
}
export default GeneralElement;

/*

      {
        articles.map((article, j) => (
          <Div key={`${j + 1}`} height="100%" width="100%" vertical="top">

          </Div>
        ))
      }

*/
