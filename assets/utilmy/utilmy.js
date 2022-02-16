/* eslint-disable no-useless-escape */
const colorC = require('ansi-colors');

// return true si un Json est vide
const isVide = (obj) => Object.keys(obj).length === 0;

// transforme un Json en string, utile pour imprimer en console
const jsonToString = (obj) => (Object.keys(obj).map((k) => obj[k])).toString();

// imprimer un message d'alerte dans la console
const printY = (consoleMsg, msgConsole) => {
  console.log(colorC.yellow(consoleMsg), msgConsole);
};

// imprime un message d'information dans la console
const printB = (consoleMsg, msgConsole) => {
  console.log(colorC.blue(consoleMsg), msgConsole);
};

// imprime un message de succes de couleur vert dans la console
const printC = (consoleMsg, msgConsole) => {
  console.log(colorC.green(consoleMsg), msgConsole);
};

// imprime un message d'error dans la console
const printR = (consoleMsg, msgConsole) => {
  console.log(colorC.red(consoleMsg), msgConsole);
};

const validEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const API = 'http://localhost:3001';

const toSqlDatetime = (inputDate) => {
  const date = new Date(inputDate);
  const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return dateWithOffest
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');
};

module.exports = {
  isVide,
  jsonToString,
  printY,
  printB,
  printC,
  printR,
  validEmail,
  API,
  toSqlDatetime,
};
