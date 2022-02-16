/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const session = io.connect();

function useSocket(cb) {
  const [activeSocket, setActiveSocket] = useState();

  useEffect(() => {
    setActiveSocket(session);
  }, []);

  useEffect(() => {
    // debug("Socket updated", { socket, activeSocket });
    if (activeSocket) return;

    return function cleanup() {
      if (activeSocket) {
        activeSocket.off('message.chat1', cb);
      }
    };
  }, [activeSocket]);

  return activeSocket;
}

export default useSocket;
