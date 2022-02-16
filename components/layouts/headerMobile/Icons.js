import React, { memo } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { redux } from 'component';
import CurrencyMobile from '@/components/iconsButtons/CurrencyMobile';
import ProfilMobile from '@/components/iconsButtons/profilMobile';
import CartMobile from '@/components/iconsButtons/CartMobile';

const Icons = memo(({ useSocketHook }) => {
  const [{ dialogBag = 'false' }] = redux();
  return (
    <div
      className="alignCenter"
      style={{
        position: 'relative', zIndex: dialogBag === 'true' ? 1 : 0, top: -12, left: 10
      }}
    >
      <CurrencyMobile />
      <ProfilMobile useSocketHook={useSocketHook} />
      <CartMobile useSocketHook={useSocketHook} />
    </div>
  );
});

Icons.propTypes = {};

export default Icons;
