import Image from 'next/image';

const usFlag = require('@/assets/img/flags/US.png');
const deFlag = require('@/assets/img/flags/DE.png');
const auFlag = require('@/assets/img/flags/AU.png');
const gbFlag = require('@/assets/img/flags/GB.png');
const roFlag = require('@/assets/img/flags/RO.png');
const brFlag = require('@/assets/img/flags/BR.png');

const dbDashboard = {
// Nouveaux comptes utilisateurs la dernière semaine (7 jours)
  newUserAccount: 14,
  // le revenue des commandes depuis les dernières 24 heures
  lastRevenue: 200,
  // le nombre de nouvelles commandes (pas envoyées) depuis les dernières 24 heures
  lastOrders: 2,
  // le nombre de personnes connectées en temps réel
  connectedUsers: 5,
  // le nombre de commandes par pays
  // pourcentage d'augmentation des ventes dans les derniers 30 jours
  salesByLocation: [[
    <Image src={usFlag ?? 'photo/static/images/notPhoto.png'} alt="usFlag" key="flag" />,
    'USA',
    '2.920',
    '53.23%',
  ],
  [
    <Image src={deFlag ?? 'photo/static/images/notPhoto.png'} alt="usFlag" key="flag" />,
    'Germany',
    '1.300',
    '20.43%',
  ],
  [
    <Image src={auFlag ?? 'photo/static/images/notPhoto.png'} alt="usFlag" key="flag" />,
    'Australia',
    '760',
    '10.35%',
  ],

  ],
  // le nombre de nouveaux compte utilisateurs par mois
  newUserAccountMonthly: {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mai',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    series: [[1, 150, 120, 190, 12, 21, 42, 63, 76, 3, 97, 6]],
  },
  // le nombre de nouvelles commandes par mois
  newOrdersMonthly: {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mai',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    series: [[1, 150, 120, 190, 12, 21, 42, 63, 76, 3, 97, 6]],
  },
  // l'heure et le nombre d'utilisateurs qui se sont connectée aujourdhui
  connectedUsersToday: {
    labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
    series: [[1, 150, 120, 190, 12, 21, 42, 97]],
  }
};

export default dbDashboard;
