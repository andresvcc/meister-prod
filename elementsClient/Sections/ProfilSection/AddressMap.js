import React from 'react';
// components
import { Div } from 'components';
import Spam from '@/components/Typography/Spam';
// elements

function AddressSection(props) {
    const { title, address, postal } = props;

  return (
    <Div width="100%">
      <Div horizontal="left" width="100%">
        <Spam type="successPayment3">
          {title}
        </Spam>
        <Spam type="successPayment3">
          {address}
        </Spam>

        <Spam type="successPayment3">
          {postal}
        </Spam>
      </Div>
    </Div>
  );
}

export default AddressSection;

