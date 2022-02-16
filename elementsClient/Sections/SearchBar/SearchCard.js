import React, { memo } from 'react';
import { useRouter } from 'next/router';
// components
import {
  Div, FlexDiv, hookDeviceInfo
} from 'components';

import SearchCard from 'elementsClient/Cards/SearchCard';

const SearchBarCard = memo(({ productPilot }) => {
  const { width } = hookDeviceInfo();

  return (
    <FlexDiv height={['auto', 'auto', 'auto', 'calc(100% + 10px)', 'calc(100% + 10px)']} num={width < 410 ? [1, 2, 3, 4, 5] : [2, 4, 4, 4, 5]}>
      {productPilot.map((val, i) => (
        <Div key={`${i + 1}`}>
          <SearchCard product={val} />
        </Div>
      ))}
    </FlexDiv>
  );
});

export default SearchBarCard;
