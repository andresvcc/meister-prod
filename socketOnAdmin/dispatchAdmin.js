const getPublicKeyNameFun = require('./getPublicKeyNameFunAdmin');

const dispatchFun = (
  io,
  data,
  socket,
  publicsKeyJson,
) => {
  const [room] = getPublicKeyNameFun(io, socket);
  if (room) {
    if (data.state === 'adminProfilInfo' && data.value !== undefined) {
      
      const publickeyData = publicsKeyJson.get(room);
      const newProfileInfo = publickeyData.adminProfilInfo;
      const updatedProfileInfo = { ...newProfileInfo, ...data.value };
      publicsKeyJson.set(`${room}.adminProfilInfo`, updatedProfileInfo);
      publicsKeyJson.set(`${room}.ageUpdate`, new Date());
      io.to(room).emit('dispatch', { state: 'adminProfilInfo', value: updatedProfileInfo }); // publicsKey[room].adminProfilInfo
    } else {
      io.to(room).emit('dispatch', data);
    }
  }
};

module.exports = dispatchFun;
