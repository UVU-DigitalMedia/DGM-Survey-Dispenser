'use strict';

var React = require('react');
var mui   = require('material-ui');

var Menu = mui.Menu;

var ShortAnswer = React.createClass({

  getItems: function () {
    if (!this.props.choices || !this.props.choices[0]) { return []; }
    return (this.props.choices[0].answers || []).map(function (answer) {
      return {
        payload: answer.id + '',
        text: answer.value
      };
    });
  },

  render: function() {
    return <Menu menuItems={this.getItems()} />;
  }

});

module.exports = ShortAnswer;
