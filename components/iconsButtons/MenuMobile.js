import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Div } from 'components';

export default function MenuMobileIcon(props) {
  const { setOpenMobileMenu } = props;

  return (
    <Div width="100%">
      <Div onClick={() => setOpenMobileMenu()}>
        <MenuIcon style={{ position: 'absolute', top: 15 }} />
      </Div>
    </Div>
  );
}
