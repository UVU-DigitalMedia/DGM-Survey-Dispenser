'use strict';

require('react-tap-event-plugin')();
require('fastclick').attach(document.body);

var React  = require('react');
var Router = require('react-router');

var routes = require('./routes');

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
