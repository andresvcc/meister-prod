const dbVisites = {
  // Nombre de sessions la dernière semaine (7 jours)
  numberSession: 15,
  // Nombre de pages vues de la dernière semaine (7 jours)
  pagesViewed: 200,
  // La durée de chaque session
  sessionDuration: 2,
  // La moyenne des ages des utilisateurs
  meanUserAge: 28,
  // Les différentes sources de traffic
  trafficSource: {
    labels: [
      'Direct',
      'Google',
      'Instagram',
      'Facebook',
    ],
    series: [[25, 150, 120, 190]],
  },
  // Les navigateurs source de traffic
  browserSource: {
    labels: [
      'Safari',
      'Chrome',
      'Other',
    ],
    series: [[25, 150, 120]],
  },
  osSource: {
    labels: [
      'Android',
      'IOS',
      'Other',
    ],
    series: [[25, 150, 120]],
  },
  // Source de traffic par téléphone ou ordinateur
  deviceSource: {
    labels: ['60%', '25%'],
    series: [60, 25],
  },
};
export default dbVisites;
