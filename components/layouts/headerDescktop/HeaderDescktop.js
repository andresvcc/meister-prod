import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Div } from 'component';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '@/components/layouts/headerDescktop/logo';
import Menu from '@/components/layouts/headerDescktop/Menu';
import Icons from '@/components/layouts/headerDescktop/Icons';
import Spam from '@/components/Typography/Spam';

const arrayHeaderLeft = [
  { title: 'MOTORCYCLES', link: '/Motorcycle' },
  { title: 'PARTS', link: '/Parts' },
  { title: 'PILOT', link: '/Pilot' },
];

const arrayHeaderRight = [
  { title: 'CONFIGURATOR', link: '/configurator' },
  { title: 'CERTIFICATIONS', link: '/certifications' },
  { title: 'THE JOURNAL', link: '/journal' },
];

const LinkTo = (props) => {
  const { link, children, select } = props;
  const [hover, setHover] = useState(false);
  return (
    <span
      type="link2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: 'pointer', fontWeight: hover || select ? 'bold' : null,
      }}
    >
      <Link href={link} passHref>
        <span>{children}</span>
      </Link>
    </span>
  );
};

const headerDescktop = memo(({ useSocketHook }) => {
  const router = useRouter();
  return (
    <Div width="100%" vertical="bottom" height="110px">
      <div className="contenCenterDescktop1">
        <Menu />
        <Icons useSocketHook={useSocketHook} />
      </div>
      <div className="contenCenterDescktop2">
        {
          arrayHeaderLeft.map((val, i) => (
            <Div key={`${i + 1}`} vertical="bottom" width="160px" height="20px" style={{ borderRight: '1px solid grey', fontFamily: 'NovaLight, sans serif' }}>
              <Spam type="subtitle3">
                <LinkTo link={`${val.link}`} select={router.pathname === val.link}>{val.title}</LinkTo>
              </Spam>
            </Div>
          ))
        }
        <Logo />
        {
          arrayHeaderRight.map((val, i) => (
            <Div key={`${i + 1}`} vertical="bottom" width="160px" height="20px" style={{ borderLeft: '1px solid grey', fontFamily: 'NovaLight, sans serif' }}>
              <Spam type="subtitle3">
                <LinkTo link={`${val.link}`} select={router.pathname === val.link}>{val.title}</LinkTo>
              </Spam>
            </Div>
          ))
        }
      </div>
    </Div>
  );
});

headerDescktop.propTypes = {};

export default headerDescktop;
