import React, { memo } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import DialogSearch from '@/components/layouts/headerDescktop/DialogSearch';

const Menu = memo(() => (
  <div className="alignCenterDescktop" style={{ position: 'relative', zIndex: 2, top: 0 }}>
    <DialogSearch />
  </div>
));

Menu.propTypes = {};

export default Menu;
