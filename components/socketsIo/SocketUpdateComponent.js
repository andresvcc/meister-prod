/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { redux, axios } from 'components';
import useSocket from './useSocket';

function useHome(user) {
  const router = useRouter();
  const socket = useSocket();
  const [stateRedux, dispatch, dispatchsocket] = redux();
  const [sessionState, setSession] = useState({ state: 'off' });

  const socketDispatch = React.useCallback((data) => {
    if (socket) {
      socket.emit('dispatch', data);
    }
  });

  const update = async (data) => {
    await dispatchsocket(data);
  };

  useEffect(() => {
    socketDispatch({ state: 'profilInfo', value: stateRedux.profileTemps });
  }, [stateRedux.profileTemps]);

  const refresh = async () => {
    router.push({
      pathname: router.pathname,
      query: { ...(router.query || {}) },
    });
  };

  const setPublicKey = (data) => {
    Cookies.set('user', `${data}`, { expires: 30 });
    router.push({
      pathname: router.pathname,
      query: { ...(router.query || {}) },
    });
  };

  const removePublicKey = () => {
    Cookies.remove('user');
  };

  const verifyPublicKey = async () => {
    const keyPublic = await user;
    if (socket) {
      if (keyPublic === undefined) socket.emit('getPublicKey');
      else socket.emit('joinToPublicKey', user);
    } else console.log('error not socket');
  };

  useEffect(() => {
    if (sessionState.state === 'on') verifyPublicKey();
  }, [sessionState.state]);

  useEffect(() => {
    if (socket) {
      socket.on('dispatch', update);
      socket.on('refresh', refresh);
      socket.on('setPublicKey', setPublicKey);
      socket.on('removePublicKey', removePublicKey);
    }
  }, [socket]);

  const getRates = async () => {
    // onst getCurrencyRates = await axios.get({ url: 'https://api.exchangeratesapi.io/latest?base=USD' });
    // onst { rates } = getCurrencyRates;
    // wait dispatch({ state: 'currencyRates', value: { ...rates } });
  };

  useEffect(() => {
    const startSocket = setTimeout(() => setSession({ state: 'on' }), 300);
    if (stateRedux?.currencyRates === undefined || JSON.stringify(stateRedux?.currencyRates) === '{}') getRates();
    return () => {
      clearTimeout(startSocket);
    };
  }, []);

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { ...(router.query || {}) },
    });
  }, [user]);

  const emit = (name, data) => {
    if (socket) {
      socket.emit(name, data);
    }
  };

  return [
    emit,
    socket
  ];
}

export default useHome;
