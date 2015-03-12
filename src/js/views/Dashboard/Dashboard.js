'use strict';

var React   = require('react');
var Reflux  = require('reflux');
var mui     = require('material-ui');

var Header  = require('./Header');
var Paper   = mui.Paper;

var Dashboard = React.createClass({
  mixins: [],

  render: function () {
    return (
      <div>
        <Header />
      </div>
    );
  }
});

module.exports = Dashboard;
