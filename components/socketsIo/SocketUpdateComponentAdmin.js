/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { redux } from 'components';
import useSocket from './useSocket';

function useHome(admin, key) {
  const router = useRouter();
  const socket = useSocket();
  const [stateRedux, dispatch, dispatchsocket] = redux();
  const [sessionState, setSession] = useState({ state: 'off' });

  const socketDispatch = (data) => {
    if (socket) {
      socket.emit('dispatchAdmin', data);
    }
  };

  const update = async (data) => {
    await dispatchsocket(data);
  };

  useEffect(() => {
    socketDispatch({ state: 'adminProfilInfo', value: stateRedux.profileTemps });
  }, [stateRedux.profileTemps]);

  const refresh = async () => {
    router.push({
      pathname: router.pathname,
      query: { ...(router.query || {}) },
    });
  };

  const setPublicKey = (data) => {
    Cookies.set('admin', `${data}`, { expires: 30 });
    router.push({
      pathname: router.pathname,
      query: { ...(router.query || {}) },
    });
  };

  const removePublicKey = () => {
    Cookies.remove('admin');
  };

  const verifyPublicKey = () => {
    const keyPublic = admin;
    if (socket && (key || admin)) {
      if (keyPublic === undefined || keyPublic === 'null') {
        socket.emit('getPublicKeyAdmin', key ?? admin);
      } else {
        socket.emit('joinToPublicKeyAdmin', admin ?? key);
      }
    }
  };

  useEffect(() => {
    if (sessionState.state === 'on') verifyPublicKey();
  }, [sessionState]);

  useEffect(() => {
    if (socket) {
      socket.on('dispatch', update);
      socket.on('refresh', refresh);
      socket.on('setPublicKey', setPublicKey);
      socket.on('removePublicKey', removePublicKey);
    }
  }, [socket]);

  useEffect(() => {
    setSession({ state: 'on' });
  }, []);

  const emit = async (name, data) => {
    const fData = await data;

    if (socket) {
      socket.emit(name, fData);

      return fData;
    }
  };

  return [
    emit,
    socket,
    admin
  ];
}

export default useHome;
