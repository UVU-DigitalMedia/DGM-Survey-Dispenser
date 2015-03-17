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
    Reflux.connect(UserStore, 'userData')
  ],

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
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <Menu menuItems={this.getUserMenu()} />
          </div>
        </div>
        <CreateUser
          roles={this.props.roles}
          userRole={this.props.user && this.props.user.role}
          status={this.state.userData.create}/>
      </div>
    );
  }
});

module.exports = Users;
