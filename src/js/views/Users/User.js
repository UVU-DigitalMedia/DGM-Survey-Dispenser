'use strict';

var React  = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var mui    = require('material-ui');

var UserStore    = require('../../stores/UserStore');
var Authenticate = require('../../mixins/Authenticate');

var User = React.createClass({
  mixins: [
    Router.State,
    Authenticate.hasRole('admin')
  ],
  getUser: function () {
    var userId = this.getParams().userId;
    var foundUser = {};
    UserStore.state.users.some(function (user) {
      if (user.id == userId) {
        foundUser = user;
        return true;
      }
    });
    return foundUser;
  },
  render: function () {
    var user = this.getUser();
    return (
      <div>
        <p>{user.email}</p>
        <p>{user.role}</p>
      </div>
    );
  }
});

module.exports = User;
