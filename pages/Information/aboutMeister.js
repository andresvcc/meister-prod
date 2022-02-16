import React from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
// components
import { redux, Div, hookDeviceInfo } from 'components';
// layout
import Layout from '@/layouts/Default2';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Spam from '@/components/Typography/Spam';

// images importés
const imagine1 = '/static/images/about_meister_1.jpg';
const imagine2 = '/static/images/about_meister_2.jpg';
const imagine3 = '/static/images/about_meister_3.jpg';

// Generateur d'images
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
// Contenu
const PageContent = {
  boxTitle1: 'Meister Engineering SA',
  boxDescription1: 'We offer a real tailor-made service in the modification and construction of prestige motorcycles from different eras, especially Scramblers and Café Racers.',
  boxTitle2: 'Motorcycle Experience ',
  boxDescription2_1: 'The passion and experience of unique and harmonious motorcycles as well as the desire to share. ',
  boxDescription2_2: 'We bring our specialized technical and administrative knowledge for Switzerland and beyond.',
  boxTitle3: 'The New experience is Here',
  boxDescription3: 'Whether you already have a motorcycle or choose one from our wide range of base motorcycles that are waiting to be transformed in our stock (BMW R/7, R Nine T, etc.)',
};

function Page(props) {
  const { user, ...rest } = props;
  const [emit, socket] = useSocket(user);
  const { width } = hookDeviceInfo();
  const [{ profilInfo }, dispatch] = redux();

  return (
    <Div width="100%" vertical="top">
      <Div height="55px" />
      <GridContainer>
        <GridItem num={[12, 12, 12, 12, 12]}>
          <ImageGenerator image={imagine1} width="100%" height={['50vw', '40vw', '45vw', '35vw', '35vw']} />
        </GridItem>

        <GridItem num={[12, 12, 12, 12, 12]}>
          <Div width="100%" height={['170px', '200px', '200px', '200px', '200px']} style={{ backgroundColor: '#273D48' }}>
            <Div width="90%" horizontal="left">
              <Div height="30%">
                <Spam type="TitleWhite">{PageContent.boxTitle1}</Spam>
              </Div>
              <Div height="70%">
                <Spam type="DescriptionWhite">{PageContent.boxDescription1}</Spam>
              </Div>
            </Div>
          </Div>
        </GridItem>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <Div
            width="100%"
            height={['65vw', '60vw', '50vw', '25vw', '25vw']}
            style={{
              backgroundColor: 'white'
            }}
          >
            <Div width={['100%', '90%', '90%', '90%', '90%']}>
              <Div>
                <Div height="20%" width="90%" horizontal="left">
                  <Spam type="TitleBlack">{PageContent.boxTitle2}</Spam>
                </Div>
                <Div height="80%" width="90%" horizontal="left">
                  <Spam type="DescriptionBlack">
                    {PageContent.boxDescription2_1}
                    {' '}
                    {PageContent.boxDescription2_2}
                  </Spam>
                </Div>
              </Div>
            </Div>
          </Div>
        </GridItem>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <ImageGenerator image={imagine2} width="100%" height={['0vw', '60vw', '50vw', '25vw', '25vw']} />
        </GridItem>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <ImageGenerator image={imagine3} width="100%" height={['60vw', '60vw', '50vw', '25vw', '25vw']} />
        </GridItem>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <Div
            width="100%"
            height={['65vw', '60vw', '50vw', '25vw', '25vw']}
            style={{
              backgroundColor: '#273D48'
            }}
          >
            <Div width="100%">
              <Div>
                <Div height="20%" width="90%" horizontal="left">
                  <Spam type="TitleWhite">{PageContent.boxTitle3}</Spam>
                </Div>
                <Div height="80%" width="90%" horizontal="left">
                  <Spam type="DescriptionWhite">{PageContent.boxDescription3}</Spam>
                </Div>
              </Div>
            </Div>
          </Div>
        </GridItem>
      </GridContainer>
    </Div>
  );
}

function AboutMeister(props) {
  const { user, ...rest } = props;
  const useSocketHook = useSocket(user);
  return (
    <Layout useSocketHook={useSocketHook}>
      <Page user={user} useSocketHook={useSocketHook} {...rest} />
    </Layout>
  );
}

export default AboutMeister;

export const getServerSideProps = (context) => {
  const { user } = nextCookies(context);
  if (!user) return { props: {} };
  return { props: { user } };
};
