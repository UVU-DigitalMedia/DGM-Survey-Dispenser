'use strict';

var React = require('react');

var Choices = React.createClass({

  multipleCorrect: function () {
    return this.props.choices.map(function (choice) {
      return (
        <li key={choice.id}>

        </li>
      )
    });
  },

  render: function() {
    return (
      <div>

      </div>
    );
  }

});

module.exports = Choices;
