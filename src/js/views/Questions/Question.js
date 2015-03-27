'use strict';

var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var mui    = require('material-ui');

var QuestionStore = require('../../stores/QuestionStore');
var MultipleAnswer = require('./answer-types/Multiple');
var ShortAnswerAnswer = require('./answer-types/ShortAnswer');

var Paper    = mui.Paper;

var mapping = {
  multipleChoice: MultipleAnswer,
  multipleCorrect: MultipleAnswer,
  shortAnswer: ShortAnswerAnswer
};

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
    if (!this.state.question || !this.state.question.choices) { return []; }
    return this.state.question.choices.map(function (choice) {
      return {
        payload: choice.id + '',
        text: choice.label,
        number: choice.answers.length + ''
      };
    });
  },

  render: function () {
    if (!this.state.question || !this.state.question.type) { return <span/>; }
    var AnswerRendering = mapping[this.state.question.type];
    return (
      <Paper zDepth={1}>
        <div className="question-view">
          <h3>{this.state.question.description}</h3>
          <AnswerRendering choices={this.state.question.choices}/>
        </div>
      </Paper>
    );
  }

});

module.exports = Question;
