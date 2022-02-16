import React from 'react';
// components
import { Div, hookDeviceInfo } from 'components';
import Spam from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

// informaiton de l'article en haut
const InfoArticle = (props) => {
  const { content, info } = props;
  return (
    <GridItem num={[12, 12, 12, 12, 12]}>
      <Div horizontal="left" width="95%">
        {' '}
        <Spam type="JournalDescription2">
          {content}
          {' '}
          {info}
        </Spam>
      </Div>
    </GridItem>
  );
};

export default function InitialJournal(props) {
  const {
    mainTitle, author, readingTime, date, text, tags
  } = props;

  return (

    <Div>

      <GridContainer>

        <GridItem num={[12, 12, 12, 12, 12]}>
          <Div
            width="90%"
            height={['65vw', '40vw', '30vw', '20vw', '20vw']}
            style={{ backgroundColor: '#273D48' }}
          >
            <Div width="95%">
              <Div height="120px" width="95%" horizontal="left">
                <Spam type="aboutTitle1">{mainTitle}</Spam>
              </Div>

              <Div height={['4px', '20px', '40px', '40px', '40px']} />
              <InfoArticle content="Author: " info={author} />
              <InfoArticle content="Reading time: " info={readingTime} />
              <InfoArticle content="" info={date} />

            </Div>
          </Div>
        </GridItem>

        <GridItem num={[12, 12, 12, 12, 12]}>
          <Div width="90%" style={{ backgroundColor: '#daeef340' }}>
            {
        text.map((val, i) => (
          <Div key={`${i + 1}`}>
            <Div width="90%" height="80px" horizontal="left" style={{ paddingTop: '20px' }}>
              <Spam type="produitUniqueTitle">
                {val.title}
              </Spam>
            </Div>
            <Div horizontal="left" style={{ justify: 'center' }} width="90%">
              {
                val.description.map((parragraphe, i) => (
                  <Div key={`${i + 1}`}>
                    <Spam type="JournalDescription1">
                      {parragraphe}
                    </Spam>
                    <Div height="15px" />
                  </Div>
                ))
              }
            </Div>
          </Div>
        ))
      }
          </Div>
        </GridItem>

        <GridItem num={[12, 12, 12, 12, 12]}>
          <Div width="90%" style={{ paddingBottom: '70px' }}>
            <Div width="100%" height="80px" style={{ borderTop: '1px solid #00000050' }}>
              <Div width="95%" row horizontal="left">
                {tags.map((val, i) => (
                  <Div key={`${i + 1}`}>
                    <Div height="50px" width="120px">
                      <Div height="70%" width="100px" style={{ borderRadius: '10px', backgroundColor: '#273D48' }}>
                        <Spam type="produitUniqueSmall">
                          {val.tagName}
                        </Spam>
                      </Div>
                    </Div>
                  </Div>
                ))}
              </Div>
            </Div>
          </Div>
        </GridItem>

      </GridContainer>
    </Div>
  );
}
