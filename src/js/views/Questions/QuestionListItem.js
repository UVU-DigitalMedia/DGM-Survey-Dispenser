'use strict';

var React        = require('react');
var Reflux       = require('reflux');
var Router       = require('react-router');
var mui          = require('material-ui');

var QuestionActions = require('../../actions/QuestionActions');

var RaisedButton = mui.RaisedButton;
var FlatButton   = mui.FlatButton;
var FontIcon     = mui.FontIcon;
var Dialog       = mui.Dialog;

var QuestionListItem = React.createClass({
  mixins: [
    Router.Navigation
  ],

  toQuestion: function (questionId) {
    this.transitionTo('question', {questionId: questionId});
  },

  showDialog: function () {
    this.refs.deleteDialog.show();
  },

  hideDialog: function () {
    this.refs.deleteDialog.dismiss();
  },

  handleDelete: function () {
    QuestionActions.delete(this.props.question);
    this.hideDialog();
    this.transitionTo('questions');
  },

  render: function () {
    var actions = [
      <FlatButton
        key={0}
        label="Cancel"
        onTouchTap={this.hideDialog} />,
      <RaisedButton
        key={1}
        primary={true}
        label="Delete"
        onTouchTap={this.handleDelete} />
    ];
    return (
      <div>
        <h5 className="preview">{this.props.question.label}</h5>
        <div className="actions">
          <RaisedButton label="View" onClick={this.toQuestion.bind(this, this.props.question.id)} />
          { this.props.question.active ?
            <RaisedButton label="Deactivate" onClick={QuestionActions.deactivate.bind(null, this.props.question)}/>
            :
            <RaisedButton secondary={true} label="Activate" onClick={QuestionActions.activate.bind(null, this.props.question)}/>
          }
          <RaisedButton primary={true} label="Delete" onClick={this.showDialog}/>
        </div>
        <Dialog title={'Delete ' + this.props.question.label} actions={actions} ref="deleteDialog">
          <p>Are you sure you want to delete {this.props.question.label}?</p>
        </Dialog>
      </div>
    );
  }
});


module.exports = QuestionListItem;
