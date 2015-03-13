'use strict';

var React   = require('react');
var Reflux  = require('reflux');
var mui     = require('material-ui');

var Header  = require('./Header');
var Users   = require('../Users/Users');
var Paper   = mui.Paper;

var Dashboard = React.createClass({
  mixins: [],

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
