/* eslint-disable jsx-a11y/no-autofocus */
import React, {
  useState,
} from 'react';
import Search from '@material-ui/icons/Search';
import {
  redux, Div, FlexDiv, hookDeviceInfo
} from 'components';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@/components/CustomButtons/Button';

const style1 = {
  width: 'calc(100vw - 10px)',
  height: '70px',
  position: 'absolute',
  zIndex: 9,
  top: 5,
  left: 5,
  border: 'solid 1px #c9c9c9',
  backgroundColor: 'white'
};

const style2 = {
  width: 'auto',
  height: 'auto',
  position: 'absolute',
  top: 15,
  left: 'auto'
};

export default function BagCardDialog(props) {
  const {
    setOpenMobileSearch, openMobileSearch, onChange, value,
  } = props;

  const submit = (e) => {
    if (e) e.preventDefault();

    const el = document.querySelector(':focus');
    if (el) el.blur();
  };

  return (
    <Div width="100%">
      <Div
        style={openMobileSearch ? style1 : style2}
      >
        {openMobileSearch ? (
          <Div width="90%" horizontal="at" row>
            <Div width="75%" horizontal="left">
              <form onSubmit={submit}>
                <input
                  placeholder="Search custom pieces"
                  className="inputSearch2"
                  type="text"
                  name="firstname"
                  id="firstname"
                  autoComplete="off"
                  autoFocus
                // onFocus={() => setOpenSearch(true)}
                  value={value}
                  onChange={(e) => onChange(e.currentTarget.value)}
                  style={{
                    border: 'none',
                    width: '90%',
                    fontSize: '.9em',
                    background: 'transparent',
                    // color: colorTextInput,
                    padding: '4px',
                    borderBottom: 'solid 2px #aba7a7'
                  }}
                />
              </form>
            </Div>
            <Div row>
              <CloseIcon onClick={() => setOpenMobileSearch(false)} />
              <div style={{ width: '15px' }} />
              <Search onClick={submit} />
            </Div>
          </Div>
        ) : (
          <Search onClick={() => setOpenMobileSearch(!openMobileSearch)} style={{ width: '25px', height: '25px' }} />
        )}
      </Div>
    </Div>
  );
}
