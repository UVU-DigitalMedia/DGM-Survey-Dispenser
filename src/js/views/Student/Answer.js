'use strict';

var React  = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var mui    = require('material-ui');

var StudentQuestionStore = require('../../stores/StudentQuestionStore');
var StudentActions       = require('../../actions/StudentActions');
var StudentStore         = require('../../stores/StudentStore');

var Answer = React.createClass({
  mixins: [
    Reflux.connect(StudentQuestionStore, 'question'),
    Router.Navigation
  ],

  getInitialState: function () {
    return {
      question: {}
    };
  },

  componentDidMount: function() {
    if (!StudentStore.state.student) {
      return this.transitionTo('student-login');
    }
    StudentActions.getQuestion(StudentStore.state.student);
  },

  render: function() {
    var question = this.state.question.question;
    if (!question) { return <span /> }
    return (
      <div>
        <h3>{question.description}</h3>
      </div>
    );
  }

});

module.exports = Answer;
