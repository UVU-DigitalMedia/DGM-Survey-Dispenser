'use strict';

var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var mui    = require('material-ui');

var QuestionStore = require('../../stores/QuestionStore');

var Paper = mui.Paper;

var Question = React.createClass({
  mixins: [
    Router.State
  ],

  getStateFromStore: function () {
    return {
      question: QuestionStore.getById(this.getParams().questionId) || {}
    };
  },

  componentWillReceiveProps: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  renderChoices: function () {
    if (!this.state.question || !this.state.question.choices) { return; }
    return this.state.question.choices.map(function (choice) {
      return (
        <li key={choice.id}>
          {choice.label}
        </li>
      );
    });
  },

  render: function() {
    console.log(this.state.question);
    return (
      <Paper>
        <div className="question-view">
          <h3>{this.state.question.description}</h3>
          <ul>
            {this.renderChoices()}
          </ul>
        </div>
      </Paper>
    );
  }

});

module.exports = Question;
