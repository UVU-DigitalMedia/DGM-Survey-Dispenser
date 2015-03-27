'use strict';

var React = require('react');
var mui   = require('material-ui');

var Menu = mui.Menu;

var Multiple = React.createClass({

  getItems: function () {
    return (this.props.choices || []).map(function (choice) {
      return {
        payload: choice.id + '',
        text: choice.label,
        number: choice.answers.length + ''
      };
    });
  },

  render: function() {
    return <Menu menuItems={this.getItems()} />;
  }

});

module.exports = Multiple;
