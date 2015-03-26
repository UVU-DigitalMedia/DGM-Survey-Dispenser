'use strict';

var React     = require('react');
var mui       = require('material-ui');

var TextField = mui.TextField;

var ShortAnswer = React.createClass({

  getValues: function () {
    return [{
      label: this.refs.choice.getValue(),
      dynamicValue: true
    }];
  },

  resetValues: function () {
    this.refs.choice.setValue('');
  },

  render: function () {
    return (
      <div>
        <TextField
          floatingLabelText="Label"
          ref="choice"/>
      </div>
    );
  }

});

module.exports = ShortAnswer;
