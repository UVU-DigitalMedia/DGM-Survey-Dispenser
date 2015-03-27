'use strict';

var React  = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var mui    = require('material-ui');

var StudentQuestionStore = require('../../stores/StudentQuestionStore');
var StudentActions       = require('../../actions/StudentActions');
var StudentStore         = require('../../stores/StudentStore');

var RaisedButton = mui.RaisedButton;
var Dialog       = mui.Dialog;
var Choices      = require('./Choices');

var Answer = React.createClass({
  mixins: [
    Reflux.listenTo(StudentQuestionStore, 'questionUpdate'),
    Router.Navigation
  ],

  questionUpdate: function (question) {
    this.setState({question: question});
    if (question.getSuccess && !question.question) {
      return this.setState({empty: true});
    }
    if (question.answerSuccess) {
      this.refs.thankYouDialog.show();
    }
  },

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
    var values = this.refs.choices.getValues();
    if (!values) { return; }
    StudentActions.answerQuestion(
      StudentStore.state.student,
      this.state.question.question,
      values
    );
  },

  closeDialog: function () {
    if (this.refs.thankYouDialog) {
      this.refs.thankYouDialog.dismiss();
    }
    StudentActions.logout();
    this.transitionTo('student-login');
  },

  render: function() {
    var question = this.state.question.question;
    if (this.state.empty) {
      return (
        <div style={{textAlign: 'center', marginTop: 30, padding: 15}}>
          <h4>
            There are no more surveys for you to respond to. Come back soon!
          </h4>
          <RaisedButton secondary={true} label="Go Back" onClick={this.closeDialog} />
        </div>
      );
    }
    return (
      <div>
        { !question ? <span /> :
          <div className="row center-xs">
            <div className="col-xs-12 col-sm-4">
              <div style={{textAlign: 'left', padding: 15}}>
                <h3>{question.description}</h3>
                <Choices ref="choices" type={question.type} choices={question.choices}/>
                <br/><br/>
                <RaisedButton secondary={true} label="Submit" onClick={this.handleSubmit} />
              </div>
            </div>
          </div>
        }
        <Dialog
          title="Thank you"
          ref="thankYouDialog"
          actions={[{text: 'Close', onClick: this.closeDialog}]}>
          <p>Thank you for completing the survey! Enjoy your M&Ms.</p>
          <p>
            If you receive two of the same color, take the candy, and wait
            for it to dispense more.
          </p>
        </Dialog>
      </div>
    );
  }

});

module.exports = Answer;
