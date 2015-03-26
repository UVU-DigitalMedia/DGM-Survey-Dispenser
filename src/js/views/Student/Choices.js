'use strict';

var React = require('react');

var mapping = {
  multipleCorrect: require('./MultipleCorrect'),
  multipleChoice: require('./MultipleChoice'),
  shortAnswer: require('./ShortAnswer')
};

var Choices = React.createClass({

  getValues: function () {
    if (!this.refs.choices) { return []; }
    return this.refs.choices.getValues();
  },

  render: function() {
    var ChoiceType = mapping[this.props.type];
    if (!ChoiceType) { return <p>Question type not supported. Please inform an admin.</p>; }
    return <ChoiceType ref="choices" choices={this.props.choices}/>
  }

});

module.exports = Choices;
