'use strict';

var React        = require('react');
var Reflux       = require('reflux');
var Router       = require('react-router');
var mui          = require('material-ui');

var UserActions  = require('../../actions/UserActions');

var RaisedButton = mui.RaisedButton;
var FlatButton   = mui.FlatButton;
var FontIcon     = mui.FontIcon;
var Dialog       = mui.Dialog;

var UserListItem = React.createClass({
  mixins: [
    Router.Navigation
  ],

  goToUser: function (userId) {
    this.transitionTo('user', {userId: userId});
  },

  showDialog: function () {
    this.refs.deleteDialog.show();
  },

  hideDialog: function () {
    this.refs.deleteDialog.dismiss();
  },

  handleDelete: function () {
    UserActions.delete(this.props.user);
    this.hideDialog();
    this.transitionTo('users');
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
        <h5 className="preview">{this.props.user.email}</h5>
        <div className="actions">
          <RaisedButton label="Edit" onClick={this.goToUser.bind(this, this.props.user.id)} />
          <RaisedButton primary={true} label="Delete" onClick={this.showDialog}/>
        </div>
        <Dialog title={'Delete ' + this.props.user.email} actions={actions} ref="deleteDialog">
          <p>Are you sure you want to delete {this.props.user.email}?</p>
        </Dialog>
      </div>
    );
  }
});


module.exports = UserListItem;
