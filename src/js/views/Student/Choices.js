'use strict';

var React = require('react');

var mapping = {
  multipleCorrect: require('./MultipleCorrect')
};

var Choices = React.createClass({

  getValues: function () {
    if (!this.refs.choices) { return []; }
    return this.refs.choices.getValues();
  },

  render: function() {
    var ChoiceType = mapping[this.props.type];
    if (!ChoiceType) { return <span/>; }
    return <ChoiceType ref="choices" choices={this.props.choices}/>
  }

});

module.exports = Choices;
