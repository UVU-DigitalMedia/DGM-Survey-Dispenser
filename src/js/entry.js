'use strict';

require('react-tap-event-plugin')();

var React  = require('react');
var Router = require('react-router');

var App = require('./App');

Router.run(App, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.body);
});
