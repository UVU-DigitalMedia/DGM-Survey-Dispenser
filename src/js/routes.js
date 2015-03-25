'use strict';

var React         = require('react');
var Router        = require('react-router');

var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var Redirect      = Router.Redirect;
var NotFoundRoute = Router.NotFoundRoute;

var App           = require('./App.js');
var LoginForm     = require('./views/LoginForm/LoginForm');
var Dashboard     = require('./views/Dashboard/Dashboard');
var Users         = require('./views/Users/Users');
var User          = require('./views/Users/User');
var Questions     = require('./views/Questions/Questions');
var Question      = require('./views/Questions/Question');
var StudentLogin  = require('./views/Student/StudentLogin');
var Answer        = require('./views/Student/Answer');
var FourOhFour    = require('./views/Static/FourOhFour');

module.exports = (
  <Route name="app" handler={App}>
    <Route name="student-login" path="/" handler={StudentLogin} />
    <Route name="answer" path="/answer" handler={Answer} />
    <Route name="login" path="/login" handler={LoginForm} />
    <Route name="dashboard" path="/dashboard" handler={Dashboard}>
      <Route name="users" path="/dashboard/users" handler={Users}>
        <Route name="user" path="/dashboard/users/:userId" handler={User} ignoreScrollBehavior={true}/>
      </Route>
      <Route name="questions" path="/dashboard/questions" handler={Questions}>
        <Route name="question" path="/dashboard/question/:questionId" handler={Question} ignoreScrollBehavior={true} />
      </Route>
      <Redirect from="/dashboard/*" to="dashboard" />
    </Route>
    <NotFoundRoute handler={FourOhFour} />
  </Route>
);
