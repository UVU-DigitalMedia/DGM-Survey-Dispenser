'use strict';

var React  = require('react');
var Reflux = require('reflux');
var mui    = require('material-ui');

var UserListItem = require('./UserListItem');

var UserList = React.createClass({
  getUsers: function () {
    return this.props.users.map(function (user, i) {
      var classes = ['users-list-item'];
      classes.push((i % 2) ? 'even' : 'odd');
      return (
        <li key={i} className={classes.join(' ')}>
          <UserListItem user={user} />
        </li>
      );
    });
  },

  render: function () {
    return (
      <ul className="users-list">
        {this.getUsers()}
      </ul>
    );
  }
});

module.exports = UserList;
