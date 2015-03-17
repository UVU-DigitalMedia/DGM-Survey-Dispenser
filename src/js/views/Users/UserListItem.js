'use strict';

var React        = require('react');
var Reflux       = require('reflux');
var Router       = require('react-router');
var mui          = require('material-ui');

var RaisedButton = mui.RaisedButton;
var FlatButton   = mui.FlatButton;
var FontIcon     = mui.FontIcon;

var Link         = Router.Link;

var UserListItem = React.createClass({
  render: function () {
    return (
      <div>
        <h5 className="preview">{this.props.user.email}</h5>
        <div className="actions">
          <Link to="user" params={{userId: this.props.user.id}}>
            Edit
          </Link>
          <RaisedButton primary={true} label="Delete"/>
        </div>
      </div>
    );
  }
});


module.exports = UserListItem;
