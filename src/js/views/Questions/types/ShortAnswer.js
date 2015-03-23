'use strict';

var React     = require('react');
var mui       = require('material-ui');

var TextField = mui.TextField;

var ShortAnswer = React.createClass({

  getInitialState: function () {
    return {choices: [{
      label: '',
      dynamicValue: true
    }]};
  },

  getValues: function () {
    return this.state.choices;
  },

  resetValues: function () {
    this.setState(this.getInitialState());
  },

  changeLabelValue: function (event, value) {
    var choices = this.state.choices;
    choices[0].label = value;
    this.setState({choices: choices});
  },

  render: function () {
    return (
      <div>
        <TextField
          floatingLabelText="Label"
          onChange={this.changLabelValue} />
      </div>
    );
  }

});

module.exports = ShortAnswer;
