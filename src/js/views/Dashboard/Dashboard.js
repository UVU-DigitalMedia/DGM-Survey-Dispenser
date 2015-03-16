'use strict';

var React       = require('react');
var Reflux      = require('reflux');
var mui         = require('material-ui');

var AuthActions = require('../../actions/AuthActions');

var Header      = require('./Header');
var Users       = require('../Users/Users');
var Paper       = mui.Paper;

var Dashboard = React.createClass({
  mixins: [],

  componentDidMount: function () {
    AuthActions.login();
  },

  render: function () {
    return (
      <div>
        <Header />
        <Users />
      </div>
    );
  }
});

module.exports = Dashboard;
