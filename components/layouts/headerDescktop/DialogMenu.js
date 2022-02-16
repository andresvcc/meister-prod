// React and modules
import React, {
  useState, useEffect
} from 'react';
import Link from 'next/link';
import { Div } from 'components';
import MenuIcon from '@material-ui/icons/Menu';

import Spam from '@/components/Typography/Spam';

const LinkTo = (props) => {
  const { link, children } = props;
  const [hover, setHover] = useState(false);
  return (
    <span
      type="link2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: 'pointer', fontWeight: hover ? 'bold' : null,
      }}
    >
      <Link href={link} passHref>
        <span>{children}</span>
      </Link>
    </span>
  );
};

const DialogMenu = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const open = () => {
    setOpenMobileMenu(true);
    document.body.style.overflow = 'hidden visible';
  };

  const close = () => {
    setOpenMobileMenu(false);
    document.body.style.overflow = 'initial';
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    return () => { document.body.style.overflow = originalStyle; };
  }, []);

  return (
    <>
      <MenuIcon onClick={open} />
      <Div
        style={{
          position: 'fixed', top: 0, left: openMobileMenu ? '-5%' : '-120%', background: 'white', zIndex: 9999, boxShadow: '3px 9px 13px 6px rgba(0,0,0,0.3)', color: 'black', transition: 'all ease .4s'
        }}
        width="105vw"
        height="105vh"
        horizontal="right"
        vertical="top"
      >
        <Div row width="93%" height="50px" horizontal="left">
          <Div row width="90%" height="50px" horizontal="at">
            <h6>{' '}</h6>
            <Div onClick={close}>
              <p>Close</p>
            </Div>
          </Div>
        </Div>
        <Div width="90%" height="80vh" horizontal="left" vertical="top">
          <Div height="35px" />
          <Spam type="drawerNavTitles">
            <LinkTo link="/Motorcycle">Motorcycles</LinkTo>

          </Spam>
          <Div width="90%" height="25px" style={{ borderTop: '1px solid #00000020' }} />

          <Spam type="drawerNavTitles">
            <LinkTo link="/Parts">Parts</LinkTo>
          </Spam>
          <Div width="90%" height="25px" style={{ borderTop: '1px solid #00000020' }} />

          <Spam type="drawerNavTitles">
            <LinkTo link="/Pilot">Pilot</LinkTo>
          </Spam>
          <Div width="90%" height="25px" style={{ borderTop: '1px solid #00000020' }} />

          <Spam type="drawerNavTitles">
            <LinkTo link="/configurator">Configurator</LinkTo>
          </Spam>
          <Div width="90%" height="25px" style={{ borderTop: '1px solid #00000020' }} />

          <Spam type="drawerNavTitles">
            <LinkTo link="/certifications">Certification</LinkTo>
          </Spam>
          <Div width="90%" height="25px" style={{ borderTop: '1px solid #00000020' }} />

          <Spam type="drawerNavTitles">
            <LinkTo link="/journal">Journal</LinkTo>
          </Spam>
          <Div width="90%" height="25px" style={{ borderTop: '1px solid #00000020' }} />
        </Div>
      </Div>
    </>
  );
};

export default DialogMenu;
