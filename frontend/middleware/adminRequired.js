export default function ({store, redirect, app}) {
  return app.$userIsSuperuser()
};
