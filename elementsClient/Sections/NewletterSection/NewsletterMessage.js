import React, { useState } from 'react';
import Link from 'next/link';
// components
import { Div, hookDeviceInfo } from 'components';
import Iframe from 'react-iframe';
// assets

function CookieSection(props) {
  const { width } = hookDeviceInfo();
  const { closePopup, aceptAll } = props;

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <Div>j</Div>
  );
}

export default CookieSection;
