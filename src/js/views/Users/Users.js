'use strict';

var React        = require('react');
var Reflux       = require('reflux');
var Router       = require('react-router');
var mui          = require('material-ui');

var UserActions  = require('../../actions/UserActions');
var UserStore    = require('../../stores/UserStore');
var AuthStore    = require('../../stores/AuthStore');
var Authenticate = require('../../mixins/Authenticate');

var CreateUser   = require('./CreateUser');
var UserList     = require('./UserList');
var RouteHandler = Router.RouteHandler;

var Users = React.createClass({
  mixins: [
    Reflux.connect(UserStore, 'userData'),
    Authenticate.hasRole('admin')
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
        text: user.email + ' (' + user.role + ')'
      };
    });
  },

  componentDidMount: function () {
    UserActions.read();
  },

  render: function () {
    return (
      <div>
        <h1 className="heading">Users</h1>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <CreateUser
              roles={this.props.roles}
              userRole={this.props.user && this.props.user.role} />
            <UserList users={this.state.userData.users} />
          </div>
          <div className="col-xs-12 col-md-6">
            <RouteHandler {...this.props} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Users;
