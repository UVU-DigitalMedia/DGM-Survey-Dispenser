'use strict';

var React     = require('react');
var Router    = require('react-router');

var Route = Router.Route;

var App       = require('./App.js');
var LoginForm = require('./views/LoginForm/LoginForm');
var Dashboard = require('./views/Dashboard/Dashboard');
var Users     = require('./views/Users/Users');
var User      = require('./views/Users/User');

module.exports = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" path="/login" handler={LoginForm} />
    <Route name="dashboard" path="/dashboard" handler={Dashboard}>
      <Route name="users" path="/dashboard/users" handler={Users}>
        <Route name="user" path="/dashboard/users/:userId" handler={User} />
      </Route>
    </Route>
  </Route>
);
