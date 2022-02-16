import React, { useEffect, memo, useState } from 'react';
import { useRouter } from 'next/router';
// components
import { redux, Div, FlexDiv } from 'components';
import MotorcyclesCard from 'elementsClient/Cards/MotorcycleCard';
import CarouselTest1 from 'elementsClient/Sections/MotorcycleSection/CarouselTest1';
import Grid from '@material-ui/core/Grid';
import GridItem from '@/components/Grid/GridItem';

const MotorcycleSectionCard = memo(({ productPilot = [], filter }) => {
  const [{ profilInfo }, dispatch] = redux();
  const { cartItems } = profilInfo;
  const [productMotorcycle, setProductMotorcycle] = useState([]);
  const router = useRouter();

  const goToProduct = (product) => {
    router.push({
      pathname: `/product/motorcycle/${product}`,
    }).then(() => window.scrollTo(0, 0));
  };

  return (
    <Div width="100%" dev >
      <Div width="100%" />
      <Grid container alignItems="center" justifyContent="flex-start" spacing={5}>
        {productPilot.map((val, i) => (
          <GridItem width="100%" key={`${i + 1}`} num={[1, 2, 3, 3, 3]}>
            <Div width="100%" onClick={() => goToProduct(val.product)}>
              <MotorcyclesCard motorcycle={val} filter={filter} />
            </Div>
          </GridItem>
        ))}
      </Grid>
    </Div>
  );
});

export default MotorcycleSectionCard;
