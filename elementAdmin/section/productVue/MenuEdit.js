import React, { useState } from 'react';
import { Div } from 'component';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const MenuEdit = (props) => {
    const { children } = props;
    const [open, setOpen] = useState(false);

    return (
      <Div
        style={{
          position: 'fixed', right: open ? 0 : -650, top: open ? 'calc(50% - 350px)' : '50%', background: open ? 'white' : '#33333350', transition: 'all 0.5s', borderTop: 'solid 1px #f0f0f0', borderBottom: 'solid 1px #f0f0f0'
        }}
        height={open ? '700px' : '50px'}
        width={[0, '650px', '650px', '650px', '650px']}
      >
        <Div>
          {children}
        </Div>
        <Div
          style={{
            position: 'fixed', right: open ? 650 : 0, top: open ? 'calc(50% - 350px)' : '50%', background: open ? 'white' : '#33333350', borderRadius: '50px 0px 0px 50px', transition: 'all 0.5s', borderLeft: open ? 'solid 1px #f0f0f0' : 'none', borderTop: open ? 'solid 1px #f0f0f0' : 'none', borderBottom: open ? 'solid 1px #f0f0f0' : 'none'
          }}
          height={open ? '700px' : '50px'}
          width={open ? '20px' : '60px'}
          onClick={() => setOpen(!open)}
        >
          {open ? <ArrowRightIcon style={{ color: '#333333' }} /> : <SettingsIcon style={{ color: 'white' }} />}
        </Div>
      </Div>
    );
};

export default MenuEdit;

