import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Logo from '@/components/layouts/headerMobile/logo';
import Menu from '@/components/layouts/headerMobile/Menu';
import Icons from '@/components/layouts/headerMobile/Icons';

const HeaderMobile = memo(({ useSocketHook }) => {
  const y = 0;
  return (
    <div className="contenCenter">
      <Menu />
      <Logo />
      <Icons useSocketHook={useSocketHook} />
    </div>
  );
});

HeaderMobile.propTypes = {};

export default HeaderMobile;
