import React, { memo } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { redux } from 'component';
import DialogSearch from '@/components/layouts/headerMobile/DialogSearch';
import DialogMenu from '@/components/layouts/headerMobile/DialogMenu';

const Menu = memo(() => {
  const [{ dialogBag = 'false' }] = redux();
  return (
    <div className="alignCenter" style={{ position: 'relative', zIndex: dialogBag === 'true' ? 0 : 1, top: 0 }}>
      <DialogMenu />
      <DialogSearch />
      <CloseIcon style={{ color: 'white' }} />
    </div>
  );
});

Menu.propTypes = {};

export default Menu;
