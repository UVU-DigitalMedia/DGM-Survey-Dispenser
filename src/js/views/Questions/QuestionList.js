'use strict';

var React = require('react');

var QuestionListItem = require('./QuestionListItem');

var QuestionList = React.createClass({

  getQuestions: function () {
    return this.props.questions.map(function (question, i) {
      var classes = ['users-list-item'];
      classes.push((i % 2) ? 'even' : 'odd');
      return (
        <li key={i} className={classes.join(' ')}>
          <QuestionListItem question={question} />
        </li>
      )
    });
  },

  render: function() {
    return (
      <ul className="users-list">
        {this.getQuestions()}
      </ul>
    );
  }

});

module.exports = QuestionList;
