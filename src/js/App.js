'use strict';

var React  = require('react');
var Reflux = require('reflux');
var Router = require('react-router');

var AuthStore = require('./stores/AuthStore');

var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  mixins: [
    Reflux.connect(AuthStore, 'auth')
  ],
  render: function () {
    var user  = this.state.auth ? this.state.auth.user : {};
    var roles = this.state.auth ? this.state.auth.roles : [];
    return (
      <div className='App'>
        <main>
          <RouteHandler user={user} roles={roles}/>
        </main>
      </div>
    );
  }
});

module.exports = App;
