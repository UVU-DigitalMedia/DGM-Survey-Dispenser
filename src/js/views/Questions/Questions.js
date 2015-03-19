'use strict';

var React           = require('react');
var Reflux          = require('reflux');
var Router          = require('react-router');
var mui             = require('material-ui');

var Authenticate    = require('../../mixins/Authenticate');
var QuestionStore   = require('../../stores/QuestionStore');
var QuestionActions = require('../../actions/QuestionActions');

var CreateQuestion  = require('./CreateQuestion');

var Questions = React.createClass({
  mixins: [
    Reflux.connect(QuestionStore, 'questionData'),
    Authenticate.loggedIn()
  ],

  getInitialState: function () {
    return {
      questionData: {
        questions: [],
        types: {}
      }
    };
  },

  componentDidMount: function () {
    QuestionActions.read();
  },

  render: function() {
    return (
      <div>
        <CreateQuestion types={this.state.questionData.types} />
      </div>
    );
  }

});

module.exports = Questions;
