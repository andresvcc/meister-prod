const validate = async (io, socket, data, users, publicsKeyJson, validateCodes) => {
  const code = await data;
  const idUser = await validateCodes.get(code);
  const userData = await users.get(idUser);
  if (userData.verified) {
    await socket.emit('validateRes', { ok: false, msg: 'Error de validation' });
    await validateCodes.set(code, undefined);
  } else {
    await users.set(`${idUser}.verified`, true);
    await validateCodes.set(code, undefined);
    await socket.emit('validateRes', { ok: true, msg: 'compte déjà activée' });
  }
};

module.exports = validate;
