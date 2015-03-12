'use strict';

var React  = require('react');
var Router = require('react-router');

var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function () {
    return (
      <div className='App'>
        <main>
          <RouteHandler />
        </main>
      </div>
    );
  }
});

module.exports = App;
