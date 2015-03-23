'use strict';

var React       = require('react');
var mui         = require('material-ui');

var Multiple    = require('./types/Multiple');
var ShortAnswer = require('./types/ShortAnswer');

var Choices = React.createClass({

  getValues: function () {
    if (!this.refs.choices) { return []; }
    return this.refs.choices.getValues();
  },

  resetValues: function () {
    if (!this.refs.choices) { return; }
    this.refs.choices.resetValues();
  },

  render: function () {
    var rendered;
    switch (this.props.type) {
      case null:
        rendered = <p>Please select a type</p>;
        break;
      case 'multipleChoice':
      case 'multipleCorrect':
        rendered = <Multiple ref="choices" />;
        break;
      case 'shortAnswer':
        rendered = <ShortAnswer ref="choices" />;
        break;
      default:
        rendered = <p>That question type is not supported</p>;
        break;
    }
    return rendered;
  }

});

module.exports = Choices;
