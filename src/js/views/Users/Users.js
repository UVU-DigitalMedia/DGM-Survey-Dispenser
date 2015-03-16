'use strict';

var React       = require('react');
var Reflux      = require('reflux');
var mui         = require('material-ui');

var UserActions = require('../../actions/UserActions');
var UserStore   = require('../../stores/UserStore');
var AuthStore   = require('../../stores/AuthStore');

var CreateUser  = require('./CreateUser');

var Menu        = mui.Menu;

var Users = React.createClass({
  mixins: [
    Reflux.connect(UserStore, 'userData'),
    Reflux.connect(AuthStore, 'authData')
  ],

  getInitialState: function () {
    return {
      userData: {
        users: []
      },
      authData: {
        user: {}
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
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <Menu menuItems={this.getUserMenu()} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <CreateUser />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Users;
