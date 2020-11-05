export default function ({store, redirect, app}) {
  return app.$userIsManager() || app.$userIsSuperuser()
};
