const getPublicKeyNameFun = require('./getPublicKeyNameFun');

const dispatchFun = (
  io,
  data,
  socket,
  publicsKeyJson,
  users
) => {
  const [room] = getPublicKeyNameFun(io, socket);
  if (room) {
    if (data.state === 'profilInfo' && data.value !== undefined) {
      const publickeyData = publicsKeyJson.get(room);
      if (publickeyData.login) {
        const newProfileInfo = users.get(publickeyData.login);
        const updatedProfileInfo = { ...newProfileInfo, ...data.value, registered: true, };
        users.set(`${publickeyData.login}`, updatedProfileInfo);
        publicsKeyJson.set(`${room}.ageUpdate`, new Date());
        io.to(room).emit('dispatch', { state: 'profilInfo', value: updatedProfileInfo }); // publicsKey[room].profilInfo
      } else {
        const newProfileInfo = publickeyData.profilInfo;
        const updatedProfileInfo = { ...newProfileInfo, ...data.value };
        publicsKeyJson.set(`${room}.profilInfo`, updatedProfileInfo);
        publicsKeyJson.set(`${room}.ageUpdate`, new Date());
        io.to(room).emit('dispatch', { state: 'profilInfo', value: updatedProfileInfo }); // publicsKey[room].profilInfo
      }
    } else {
      io.to(room).emit('dispatch', data);
    }
  }
};

module.exports = dispatchFun;
