'use strict';

var React        = require('react');
var Reflux       = require('reflux');
var Router       = require('react-router');

var AuthActions  = require('../../actions/AuthActions');
var AuthStore    = require('../../stores/AuthStore');
var Authenticate = require('../../mixins/Authenticate');

var Header       = require('./Header');
var Users        = require('../Users/Users');
var RouteHandler = Router.RouteHandler;

var Dashboard = React.createClass({
  mixins: [
    Authenticate.loggedIn()
  ],

  componentDidMount: function () {
    AuthActions.login();
  },

  render: function () {
    return (
      <div>
        <Header user={this.props.user}/>
        <div className="dashboard-content">
          <RouteHandler {...this.props}/>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
