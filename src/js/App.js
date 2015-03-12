'use strict';

var React  = require('react');
var Router = require('react-router');

// var DefaultRoute = Router.DefaultRoute;
// var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Header = require('./views/Header');

var App = React.createClass({
  render: function () {
    return (
      <div className='App'>
        <Header />
        <main>
          <RouteHandler />
        </main>
      </div>
    );
  }
});

var routes = (
  <Route name='app' path='/' handler={App}>
  </Route>
);

module.exports = routes;
