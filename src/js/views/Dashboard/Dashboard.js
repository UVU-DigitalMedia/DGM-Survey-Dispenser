'use strict';

var React        = require('react');
var Reflux       = require('reflux');
var Router       = require('react-router');

var AuthActions  = require('../../actions/AuthActions');
var AuthStore    = require('../../stores/AuthStore');

var Header       = require('./Header');
var Users        = require('../Users/Users');
var RouteHandler = Router.RouteHandler;

var Dashboard = React.createClass({
  mixins: [
    Reflux.connect(AuthStore, 'auth')
  ],

  componentDidMount: function () {
    AuthActions.login();
  },

  render: function () {
    var user = this.state.auth ? this.state.auth.user : {};
    var roles = this.state.auth ? this.state.auth.roles : [];
    return (
      <div>
        <Header />
        <RouteHandler user={user} roles={roles}/>
      </div>
    );
  }
});

module.exports = Dashboard;
