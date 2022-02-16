const dateNow = () => {
  const d = new Date();
  const dformat = `${[d.getMonth() + 1,
    d.getDate(),
    d.getFullYear()].join('/')} ${
    [d.getHours(),
      d.getMinutes(),
      d.getSeconds()].join(':')}`;

  return dformat;
};

module.exports = dateNow;
