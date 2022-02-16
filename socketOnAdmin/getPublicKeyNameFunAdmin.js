const getPublicKeyNameFun = (io, socket) => {
  let keyName;
  let elements;
  const arrkey = io.sockets.adapter.rooms.forEach((element, key) => {
    if (element.has(socket.id) && key !== socket.id) {
      keyName = key;
      elements = Array.from(element);
    }
  });
  return [keyName, elements || []];
};

module.exports = getPublicKeyNameFun;
