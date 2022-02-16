import React from 'react';
// components
import { Div, redux } from 'components';
import Spam from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

// images importés
const imagine1 = '/static/images/about_meister_1.jpg';
const imagine2 = '/static/images/about_meister_2.jpg';
const imagine3 = '/static/images/about_meister_3.jpg';

// Generateur d'images
const ImageGenerator = (props) => {
  const {
    image, height, width
  } = props;
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

function MotorcycleImages(props) {
  const { motorcycle } = props;
  const imageMotorcycle1 = motorcycle.colors[0].photos[0];
  const imageMotorcycle2 = motorcycle.colors[0].photos[1];
  
  return (
    <Div width="100%" style={{ minHeight: '600px' }} vertical="top">
      <Div height="100px" />
      <GridContainer>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <Div
            width="100%"
            height={['25vw', '25vw', '20vw', '15vw', '15vw']}
          >
            <img src={imageMotorcycle2} alt="sadlkfj" height="95%" />
          </Div>

        </GridItem>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <Div
            width="100%"
            height={['25vw', '25vw', '20vw', '15vw', '15vw']}
            style={{
              backgroundColor: '#273D4890'
            }}
          >
            <Div height="50px" width="90%" horizontal="left">
             {motorcycle.nameProduct}
            </Div>
            <Div width="90%" horizontal="left">
              {motorcycle.description}
            </Div>
          </Div>
        </GridItem>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <Div
            width="100%"
            height={['25vw', '25vw', '20vw', '15vw', '15vw']}
            style={{
              backgroundColor: '#273D4390'
            }}
          >
            <Div height="50px" width="90%" horizontal="left">
              <Spam type="aboutSmallTitle1">{motorcycle.nameProduct}</Spam>
            </Div>
            <Div width="90%" horizontal="left">
              {motorcycle.description}
            </Div>
          </Div>
        </GridItem>

        <GridItem num={[12, 6, 6, 6, 6]}>
          <Div width="100%" height={['25vw', '25vw', '20vw', '15vw', '15vw']}>
            <img src={imageMotorcycle1} alt="sadlkfj" height="95%" />
          </Div>

        </GridItem>
      </GridContainer>
    </Div>
  );
}
export default MotorcycleImages;
