'use strict';

var React = require('react');
var mui   = require('material-ui');

var Checkbox  = mui.Checkbox;
var TextField = mui.TextField;

var CHOICE_PREFIX = 'choice-';
var VALUE_PREFIX = 'value-';

var MultipleCorrect = React.createClass({

  getValues: function () {

  },

  renderChoices: function () {
    return this.props.choices.map(function (choice) {

    });
  },

  render: function() {
    return (
      <div>

      </div>
    );
  }

});

module.exports = MultipleCorrect;
