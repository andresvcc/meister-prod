import React, { useEffect, useState, useRef } from 'react';
//
import { Button } from 'component';
import CachedIcon from '@material-ui/icons/Cached';

const Update = ({ useSocketHook, setReload }) => {
  const [emit, socket, admin] = useSocketHook;

  useEffect(() => {
    if (socket) {
      socket.on('refreshDataAdmin', () => setReload(false));
    }
  }, [socket]);

  const refreshUpdate = () => {
    setReload(true);
    emit('refreshDataAdmin', admin);
  };

  return (
    <Button onClick={refreshUpdate} justIcon color="facebook"><CachedIcon /></Button>
  );
};

export default Update;
