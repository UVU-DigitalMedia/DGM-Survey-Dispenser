'use strict';

var React           = require('react');
var Reflux          = require('reflux');
var Router          = require('react-router');
var mui             = require('material-ui');

var Authenticate    = require('../../mixins/Authenticate');
var QuestionStore   = require('../../stores/QuestionStore');
var QuestionActions = require('../../actions/QuestionActions');

var RouteHandler    = Router.RouteHandler;
var CreateQuestion  = require('./CreateQuestion');
var QuestionList    = require('./QuestionList');

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
        <div className="row">
          <div className="col-cs-12 col-md-6">
            <QuestionList questions={this.state.questionData.questions} />
          </div>
          <div className="col-xs-12 col-md-6">
            <RouteHandler {...this.props} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Questions;
