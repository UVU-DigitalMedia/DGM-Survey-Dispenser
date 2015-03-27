'use strict';

var React = require('react');
var mui   = require('material-ui');

var TextField = mui.TextField;

var ShortAnswer = React.createClass({

  getValues: function () {
    return {
      id: this.props.choices[0].id,
      value: this.refs.choice.getValue()
    };
  },

  render: function() {
    return <TextField
      ref="choice"
      floatingLabelText={this.props.choices[0].label}/>;
  }

});

module.exports = ShortAnswer;
