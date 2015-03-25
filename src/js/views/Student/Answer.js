'use strict';

var React  = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var mui    = require('material-ui');

var StudentQuestionStore = require('../../stores/StudentQuestionStore');
var StudentActions       = require('../../actions/StudentActions');
var StudentStore         = require('../../stores/StudentStore');

var RaisedButton = mui.RaisedButton;
var Choices = require('./Choices');

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

  handleSubmit: function () {
    console.log(this.refs.choices.getValues());
  },

  render: function() {
    var question = this.state.question.question;
    if (!question) { return <span />; }
    return (
      <div>
        <h3>{question.description}</h3>
        <Choices ref="choices" type={question.type} choices={question.choices}/>
        <RaisedButton secondary={true} label="Submit" onClick={this.handleSubmit} />
      </div>
    );
  }

});

module.exports = Answer;
