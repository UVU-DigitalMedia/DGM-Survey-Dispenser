'use strict';

var AuthStore = require('../stores/AuthStore');

function loggedIn(transition) {
  var nextPath = transition.path;
  if (!AuthStore.state.user) {
    transition.redirect(
      '/login',
      {},
      {nextPath: nextPath}
    );
    return false;
  }
  return true;
}

module.exports = {
  loggedIn: function () {
    return {
      statics: {
        willTransitionTo: loggedIn
      }
    };
  },
  hasRole: function (role) {
    return {
      statics: {
        willTransitionTo: function (transition) {
          var isLoggedIn = loggedIn(transition);
          if (!isLoggedIn || AuthStore.state.user.role !== role) {
            transition.redirect('dashboard-default');
          }
        }
      }
    };
  }
};
