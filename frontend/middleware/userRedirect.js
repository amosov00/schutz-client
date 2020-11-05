export default function ({store, redirect, app}) {
  if (app.$userIsLoggedIn()) {
    return redirect('/profile/')
  }
};
