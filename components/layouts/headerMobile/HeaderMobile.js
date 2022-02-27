import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { hookDeviceInfo, redux } from 'component';
import Logo from '@/components/layouts/headerMobile/logo';
import Menu from '@/components/layouts/headerMobile/Menu';
import MobileIcons from '@/components/layouts/headerMobile/Icons';
import DesktopIcons from '@/components/layouts/headerDescktop/Icons';

const HeaderMobile = memo(({ useSocketHook }) => {
  const { type = 'browser', width } = hookDeviceInfo();

  return (
    <div className="contenCenter">
      <Menu />
      <Logo />
      {(type === 'mobile' || type === 'tablet') ? <MobileIcons useSocketHook={useSocketHook} /> : <DesktopIcons useSocketHook={useSocketHook} />}
    </div>
  );
});

HeaderMobile.propTypes = {};

export default HeaderMobile;
