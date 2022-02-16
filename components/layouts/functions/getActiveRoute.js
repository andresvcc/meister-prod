const getActiveRoute = (routes, route) => {
  const activeRoute = 'Default Brand Text';
  for (let i = 0; i < routes.length; i += 1) {
    if (routes[i].collapse) {
      const collapseActiveRoute = getActiveRoute(routes[i].views, route);
      if (collapseActiveRoute !== activeRoute) {
        return collapseActiveRoute;
      }
    } else if (route.indexOf(routes[i].layout + routes[i].path) !== -1) {
      return routes[i].name;
    }
  }
  return activeRoute;
};

export default getActiveRoute;
