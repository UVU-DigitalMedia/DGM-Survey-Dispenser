'use strict';

var React        = require('react');
var Reflux       = require('reflux');
var Router       = require('react-router');
var mui          = require('material-ui');

var RaisedButton = mui.RaisedButton;
var FontIcon     = mui.FontIcon;

var UserListItem = React.createClass({
  mixins: [
    Router.Navigation
  ],
  goToUser: function (userId) {
    this.transitionTo('user', {userId: userId});
  },
  render: function () {
    return (
      <div>
        <h5 className="preview">{this.props.user.email}</h5>
        <div className="actions">
          <RaisedButton label="Edit" onClick={this.goToUser.bind(this, this.props.user.id)} />
          <RaisedButton primary={true} label="Delete" />
        </div>
      </div>
    );
  }
});


module.exports = UserListItem;
