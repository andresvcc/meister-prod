import React from 'react';
import { useRouter } from 'next/router';
// components
import {
  redux, Div, FlexDiv, hookDeviceInfo
} from 'components';
import JournalCard from 'elementsClient/Cards/JournalCard';

import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Spam from '@/components/Typography/Spam';
// images importés
const imagine1 = '/static/images/about_meister_1.jpg';
const imagine2 = '/static/images/test_2.png';
const imagine3 = '/static/images/about_meister_1.jpg';

const ImageGenerator = (props) => {
  const { image, height, width } = props;
  return (
    <Div
      width={width}
      height={height}
      style={{
        backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat, repeat', backgroundSize: 'cover', backgroundPosition: 'center'
      }}
    />
  );
};

const PageContent = {
  boxTitle1: 'Meister Engineering SA',
  boxDescription1: 'An authentic style, meticulous know-how and top-of-the-range production. Our Lifestyle collection combines bold biker aesthetics with timeless lines. You will find that lambskin bombers, wax cotton jackets or selvedge jeans sit alongside vintage-inspired printed t-shirts, sweatshirts or classic herringbone shirts. These clothes are designed for the pleasure of riding… and everything in between.',
  boxTitle2: 'Motorcycle Experience ',
  boxDescription2_1: 'An authentic style, meticulous know-how and top-of-the-range production. Our Lifestyle collection combines bold biker aesthetics with timeless lines. You will find that lambskin bombers, wax cotton jackets or selvedge jeans sit alongside vintage-inspired printed t-shirts, sweatshirts or classic herringbone shirts. These clothes are designed for the pleasure of riding… and everything in between..',
  boxTitle3: 'The New experience is Here',
  boxDescription3: 'Whether you already have a motorcycle or choose one from our wide range of base motorcycles that are waiting to be transformed in our stock (BMW R/7, R Nine T, etc.)',
};
function JournalMainArticles() {
  const router = useRouter();
  const [{ products }] = redux();
  const [{ JournalItems }, dispatch] = redux();
  const { width } = hookDeviceInfo();

  const goToProduct = (id) => {
    router.push({
      pathname: `/product/${id}`,
    }).then(() => window.scrollTo(0, 0));
  };

  return (
    <Div width="100%">
      <GridContainer>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <ImageGenerator image={imagine1} width="100%" height={['75vw', '60vw', '48vw', '40vw', '40vw']} />
        </GridItem>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <Div
            width="100%"
            height={['90vw', '60vw', '50vw', '25vw', '25vw']}
            style={{
              backgroundColor: '#Fafafa'
            }}
          >
            {width < 400
              ? (
                <Div width="100%" height="500px">
                  <Div height="90%" width="98%">
                    <Div horizontal="left" width="95%">
                      <Spam type="txtJournalTitle2">{PageContent.boxTitle2}</Spam>
                    </Div>
                    <Div height="15px" />
                    <Div width="95%">
                      <Spam type="txtJournal2">{PageContent.boxDescription2_1}</Spam>
                      <Spam type="txtJournal2">{PageContent.boxDescription2_2}</Spam>
                    </Div>
                  </Div>
                </Div>
              ) : (
                <Div width="95%" height="500px">
                  <Div height="90%" width="90%" horizontal="left" vertical="top">
                    <Spam type="txtJournalTitle">{PageContent.boxTitle2}</Spam>
                    <Div height="15px" />
                    <Div width="90%" horizontal="left">
                      <Spam type="txtJournal1">{PageContent.boxDescription2_1}</Spam>
                      <Spam type="txtJournal1">{PageContent.boxDescription2_2}</Spam>
                    </Div>
                  </Div>
                </Div>
              )}

          </Div>
        </GridItem>

        {width > 450
          ? (
            <GridContainer>

              <GridItem num={[12, 6, 6, 6, 6]}>
                <Div
                  width="100%"
                  height={['60vw', '60vw', '50vw', '25vw', '35vw']}
                  style={{
                    backgroundColor: '#Fafafa'
                  }}
                >
                  <Div width="95%" height="500px">
                    <Div height="90%" width="90%" horizontal="left" vertical="top">
                      <Spam type="txtJournalTitle">{PageContent.boxTitle2}</Spam>
                      <Div height="15px" />
                      <Div width="90%" horizontal="left">
                        <Spam type="txtJournal1">{PageContent.boxDescription2_1}</Spam>
                        <Spam type="txtJournal1">{PageContent.boxDescription2_2}</Spam>
                      </Div>
                    </Div>
                  </Div>
                </Div>
              </GridItem>

              <GridItem num={[12, 6, 6, 6, 6]}>
                <ImageGenerator image={imagine2} width="100%" height={['75vw', '60vw', '48vw', '40vw', '40vw']} />
              </GridItem>
            </GridContainer>

          )

          : (
            <GridContainer>

              <GridItem num={[12, 6, 6, 6, 6]}>
                <ImageGenerator image={imagine2} width="100%" height={['75vw', '60vw', '48vw', '40vw', '40vw']} />
              </GridItem>
              <GridItem num={[12, 6, 6, 6, 6]}>
                <Div
                  width="100%"
                  height={['90vw', '60vw', '50vw', '25vw', '35vw']}
                  style={{
                    backgroundColor: '#Fafafa'
                  }}
                >
                  <Div width="100%" height="500px">
                    <Div height="90%" width="98%">
                      <Div horizontal="left" width="95%">
                        <Spam type="txtJournalTitle2">{PageContent.boxTitle2}</Spam>
                      </Div>
                      <Div height="15px" />
                      <Div width="95%">
                        <Spam type="txtJournal2">{PageContent.boxDescription2_1}</Spam>
                        <Spam type="txtJournal2">{PageContent.boxDescription2_2}</Spam>
                      </Div>
                    </Div>
                  </Div>
                </Div>
              </GridItem>
            </GridContainer>

          )}

        <GridItem num={[12, 6, 6, 6, 6]}>
          <ImageGenerator image={imagine3} width="100%" height={['75vw', '60vw', '48vw', '40vw', '40vw']} />
        </GridItem>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <Div
            width="100%"
            height={['90vw', '60vw', '50vw', '25vw', '25vw']}
            style={{
              backgroundColor: '#Fafafa'
            }}
          >
            {width < 450
              ? (
                <Div width="100%" height="500px">
                  <Div height="90%" width="98%">
                    <Div horizontal="left" width="95%">
                      <Spam type="txtJournalTitle2">{PageContent.boxTitle2}</Spam>
                    </Div>
                    <Div height="15px" />
                    <Div width="95%">
                      <Spam type="txtJournal2">{PageContent.boxDescription2_1}</Spam>
                      <Spam type="txtJournal2">{PageContent.boxDescription2_2}</Spam>
                    </Div>
                  </Div>
                </Div>
              ) : (
                <Div width="95%" height="500px">
                  <Div height="90%" width="90%" horizontal="left" vertical="top">
                    <Spam type="txtJournalTitle">{PageContent.boxTitle2}</Spam>
                    <Div height="15px" />
                    <Div width="90%" horizontal="left">
                      <Spam type="txtJournal1">{PageContent.boxDescription2_1}</Spam>
                      <Spam type="txtJournal1">{PageContent.boxDescription2_2}</Spam>
                    </Div>
                  </Div>
                </Div>
              )}
          </Div>
        </GridItem>
      </GridContainer>
    </Div>
  );
}

export default JournalMainArticles;
