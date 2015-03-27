'use strict';

var React = require('react');
var mui   = require('material-ui');

var Menu = require('../../Components/Menu');

var ShortAnswer = React.createClass({

  getAnswerList: function (answers) {
    answers = answers || [];
    var answerData = answers.reduce(function (data, answer) {
      data[answer.value] = (data[answer.value] || 0) + 1;
      return data;
    }, {});
    return Object.keys(answerData)
      .map(function (value, i) {
        return {
          payload: i,
          text: value,
          number: answerData[value] + ''
        };
      })
      .sort(function (a, b) {
        return a.number < b.number;
      });
  },

  getItems: function () {
    if (!this.props.choices || !this.props.choices[0]) { return []; }
    return this.getAnswerList(this.props.choices[0].answers);
  },

  render: function() {
    return <Menu menuItems={this.getItems()} />;
  }

});

module.exports = ShortAnswer;
