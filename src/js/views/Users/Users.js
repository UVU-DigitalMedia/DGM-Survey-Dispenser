'use strict';

var React       = require('react');
var Reflux      = require('reflux');
var mui         = require('material-ui');

var UserActions = require('../../actions/UserActions');
var UserStore   = require('../../stores/UserStore');

var Menu        = mui.Menu;

var Users = React.createClass({
  mixins: [Reflux.connect(UserStore, 'userData')],

  getInitialState: function () {
    return {
      userData: {
        users: []
      }
    };
  },

  getUserMenu: function () {
    return this.state.userData.users.map(function (user, i) {
      return {
        payload: i,
        text: user.email
      };
    });
  },

  componentDidMount: function () {
    UserActions.read();
  },

  render: function () {
    return (
      <div>
        <Menu menuItems={this.getUserMenu()} />
      </div>
    );
  }
});

module.exports = Users;
