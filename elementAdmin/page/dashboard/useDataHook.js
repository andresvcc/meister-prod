/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { redux } from 'component';

function groupByKey(array, key) {
  return array
    .reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) });
    }, {});
}

const deepFlatten = (array) => {
  let result = [];

  array.forEach((elem) => {
    if (Array.isArray(elem)) {
      result = result.concat(deepFlatten(elem)); // Fix here
    } else {
      result.push(elem);
    }
  });

  return result;
};

const countRepeat = (arr) => {
  const array = [...arr];

  const repetidos = {};

  array.forEach((numero) => {
    repetidos[numero] = (repetidos[numero] || 0) + 1;
  });

  return repetidos;
};

function getNumberOfWeek(todays) {
  const currentdate = new Date(todays);
  const oneJan = new Date(currentdate.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  const result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
  return result;
}

const filterRepeat = (arr) => arr.filter((item, index) => arr.indexOf(item) === index);

const monthNAmes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const useData = () => {
  const [{
    orders, users, productList, providers, dsa, profilInfo, usersSessions
  }, dispatch] = redux();

  // Users
  // 1. Nombre d'utilisateurs connectés inscrits (Live)
  const numUserAccountLogged = Object.values(usersSessions).filter(({ login }) => login).length;
  const todays = Object.values(usersSessions).map((item) => (item.ageUpdate !== '' ? { ...item, ageUpdate: new Date(item.ageUpdate).getUTCDay() } : { ...item }));
  // 2. Nombre d'utilisateurs non inscrits / visiteurs (Live)
  const userConnectedToday = todays.filter(({ ageUpdate }) => ageUpdate === new Date().getUTCDay()).length;

  // Commandes (completed / reception / traitement )
  // 1. Nombre de commandes recues - Chiffre
  const receivedOrders = Object.values(orders?.list).filter(({ status }) => status === 'reception').map(({ idBilling }) => idBilling).length;
  // 2. Nombre de commandes envoyées - Chiffre // utiliser plus tard
  const sentOrders = Object.values(orders?.list).filter(({ status }) => status === 'completed').map(({ idBilling }) => idBilling).length;
  // 3. Nombre de commandes traitées par mois
  const ordersCompleted = Object.values(orders?.list).map((item) => (item.payDate !== '' ? { ...item, payDate: new Date(item.payDate).getUTCMonth() } : { ...item })).map((stat) => (stat.status === 'reception' ? { ...stat, status: 1 } : { ...stat })).map(({ status, payDate }) => ({ status, payDate }));
  const monthOrders = [...Object.entries(groupByKey(ordersCompleted, 'payDate')).map(([key, value]) => ({ [key]: value.map(({ status }) => status).reduce((a, b) => a + b) })), {}, {}].reduce((a, b) => ({ ...a, ...b }));
  const monthOrdersTotal = monthNAmes.map((name, i) => ({ [name]: monthOrders[i] || 0 })).reduce((a, b) => ({ ...a, ...b }));
  // 4. Nombre de commandes traitées cette semaine
  const ordersCompletedDay = Object.values(orders?.list).filter(({ payDate }) => getNumberOfWeek(payDate) === getNumberOfWeek(new Date())).map((item) => (item.payDate !== '' ? { ...item, payDate: new Date(item.payDate).getUTCDay() } : { ...item })).map((stat) => (stat.status === 'reception' ? { ...stat, status: 1 } : { ...stat }))
    .map(({ status, payDate }) => ({ status, payDate }));
  const DaysOrders = [Object.entries(groupByKey(ordersCompletedDay, 'payDate')).map(([key, value]) => ({ [key]: value.map(({ status }) => status).reduce((a, b) => a + b) })), {}, {}].reduce((a, b) => ({ ...a, ...b }));
  const WeekOrdersTotal = [...weekNames.map((name, i) => ({ [name]: DaysOrders[i] || 0 })), {}, {}].reduce((a, b) => ({ ...a, ...b }));

  // Produits
  // 1. 10 produits les plus vendus
  const arrProductsInBillingsWithRepeat = deepFlatten(Object.values({ ...users }).map(({ billings }) => Object.values({ ...billings }).map(({ products = [] }) => products.map(({ name = '' }) => name))));
  const arrProductsInBillingsCount = countRepeat(arrProductsInBillingsWithRepeat); // ?.map(({ products }) => products)
  // sort - ten most bought products
  const tenMostProducts = [Object.entries(arrProductsInBillingsCount)
    .sort(([key, value], [key2, value2]) => value2 - value)
    .slice(0, 10)
    .map(([key, value]) => ({ [key]: value })),
  {}, {}].reduce((a, b) => ({ ...a, ...b }));
  const tenMostProductsKeys = Object.keys(tenMostProducts);
  // Cateorie
  const nbCategoriesInBillings = countRepeat(arrProductsInBillingsWithRepeat.map((nameProduct) => productList[nameProduct].categorie));
  const allCategoriesNames = Object.keys(nbCategoriesInBillings);

  // Marques
  const productSoldByBrand = countRepeat(arrProductsInBillingsWithRepeat.map((nameProduct) => productList[nameProduct].brand));
  const allBransNames = Object.keys(productSoldByBrand);

  // devise
  const productSoldByCurrency = countRepeat(arrProductsInBillingsWithRepeat.map((nameProduct) => productList[nameProduct].currency));
  const allCurrencyNames = Object.keys(productSoldByCurrency);

  // sales
  // 1. Chiffre d'affair par mois
  const sales = deepFlatten(Object.values(users).map(({ billings }) => Object.values(billings).map(({ products }) => products.map(({ qty, price, date }) => ({ month: new Date(date).getUTCMonth(), amount: qty * price })))));
  const monthSalesAide = Object.entries(groupByKey(sales, 'month')).map(([key, value]) => ({ [key]: [...value.map(({ amount }) => amount), 0, 0].reduce((a, b) => a + b) }));
  const monthSales = [...monthSalesAide, {}, {}].reduce((a, b) => ({ ...a, ...b }));
  const totalSales = [...deepFlatten(Object.values(users).map(({ billings }) => Object.values(billings).map(({ products }) => products.map(({ qty, price }) => qty * price)))), 0, 0].reduce((a, b) => a + b);
  const monthSalesTotal = monthNAmes.map((name, i) => ({ [name]: monthSales[i] || 0 })).reduce((a, b) => ({ ...a, ...b }));

  return {
    // users
    userConnectedToday,
    numUserAccountLogged,
    usersSessions,
    // orders
    monthNAmes,
    weekNames,
    monthOrdersTotal,
    WeekOrdersTotal,
    receivedOrders,
    sentOrders,
    // products
    arrProductsInBillingsCount,
    tenMostProductsKeys,
    tenMostProducts,
    productSoldByBrand,
    allBransNames,
    allCurrencyNames,
    productSoldByCurrency,

    // sales
    comparatif: monthSalesTotal,
    nbCategoriesInBillings,
    allCategoriesNames,
    sales,
    monthSales: monthSalesTotal,
    totalSales,

  };
};

export default useData;
