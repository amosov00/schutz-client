export default async function ({store, redirect, app}) {
  return app.$userIsLoggedIn()
};
