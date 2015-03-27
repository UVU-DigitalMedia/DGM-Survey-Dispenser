'use strict';

var React = require('react');
var mui   = require('material-ui');

var Menu   = require('../../Components/Menu');
var Dialog = mui.Dialog;

var Multiple = React.createClass({

  getInitialState: function () {
    return {
      label: '',
      items: []
    };
  },

  onItemClick: function (event, i, item) {
    var choice = this.props.choices[i];
    this.setState({
      label: '"' + choice.label + '" entered values:',
      items: this.getAnswerList(choice.answers)
    });
    this.refs.answerDetails.show();
  },

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
    return (this.props.choices || []).map(function (choice, i) {
      var append = (choice.dynamicValue) ? ' (Click to view values)' : '';
      return {
        payload: i,
        text: choice.label + append,
        number: choice.answers.length + '',
        clickable: Boolean(choice.dynamicValue && choice.answers.length)
      };
    });
  },

  render: function() {
    var standardActions = [
      { text: 'Close' }
    ];
    return (
      <div>
        <Menu menuItems={this.getItems()} onItemClick={this.onItemClick} />
        <Dialog ref="answerDetails" title={this.state.label} actions={standardActions}>
          <Menu menuItems={this.state.items} />
        </Dialog>
      </div>
    );
  }

});

module.exports = Multiple;
