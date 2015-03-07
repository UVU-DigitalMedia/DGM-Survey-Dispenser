'use strict';

require('react-tap-event-plugin')();

var React  = require('react');
var Router = require('react-router');

var application = require('./App.jsx');

Router.run(application, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.body);
});
