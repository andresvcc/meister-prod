/* eslint-disable @next/next/no-img-element */
import React from 'react';

// components
import { Div } from 'components';
import ContactForm from 'elementsClient/Forms/ProfilForm/ContactForm';
import Spam from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

function DialogMotorcycleContact(props) {
  const { motorcycle } = props;
  const imageMotorcycle1 = motorcycle.colors[0].photos[0];
  const imageMotorcycle2 = motorcycle.colors[0].photos[1];

  return (
    <Div width="90%" height="100%" style={{ backgroundColor: 'white' }} vertical="top">
      <Div width="100%" horizontal="left" height="100px">
        <Spam type="successPayment3">Please Feel free to Contact Us:</Spam>
      </Div>
      <GridContainer>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <Div
            width="100%"
            height={['60vw', '25vw', '20vw', '20vw', '20vw']}
          >
            <img src={imageMotorcycle2} alt="sadlkfj" height="95%" />
          </Div>

        </GridItem>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <Div
            width="100%"
            height={['95vw', '55vw', '55vw', '55vw', '55vw']}
          >

            <ContactForm />
          </Div>
        </GridItem>

        <GridItem num={[6, 6, 6, 6, 6]}>

          <Div
            width="100%"
            height={['0px', '60vw', '30vw', '20vw', '20vw']}
            style={{
            }}
          >
            <Div height="50px" width="90%" horizontal="left">
              <Spam type="successPayment3">
                {motorcycle.nameProduct}
                :
                {' '}
                {' '}
                {motorcycle?.price}
                {' '}
                {motorcycle?.currency}
              </Spam>
            </Div>
            <Div width="90%" horizontal="left">
              <Spam type="successPayment3">{motorcycle.description}</Spam>
            </Div>
          </Div>
        </GridItem>

      </GridContainer>
    </Div>
  );
}
export default DialogMotorcycleContact;
